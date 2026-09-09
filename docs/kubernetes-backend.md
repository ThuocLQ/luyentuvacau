# Kubernetes cho Backend .NET: Deploy, Scale và Debug

## Quick Summary

- Kubernetes giữ **desired state**: bạn khai báo API cần bao nhiêu bản chạy và controller cố đưa trạng thái thực tế về đó. Nó không tự làm app đúng hay tự xử lý side effect.
- Với API stateless, `Deployment` quản lý nhiều Pod; `Service` cho địa chỉ ổn định; chỉ Pod `Ready` mới nên nhận traffic.
- `readinessProbe` trả lời “Pod có nhận request được chưa?”; `livenessProbe` trả lời “container có nên restart không?”. Đừng dùng liveness để check SQL hay Redis.
- `requests` giúp scheduler đặt Pod vào node; `limits` chặn mức dùng runtime. HPA chỉ scale Pod, không làm database hay downstream có thêm capacity. Khi cluster hết chỗ, node autoscaler mới là lớp tăng node.

## Terms

- **Pod**: đơn vị nhỏ nhất để Kubernetes chạy container. Pod có thể bị thay thế, nên không giữ state quan trọng chỉ trong Pod.
- **Deployment**: mô tả một workload stateless, số replica mong muốn và cách rollout version mới.
- **Service**: địa chỉ DNS/IP ổn định để gọi một nhóm Pod; không gọi thẳng Pod IP.
- **readiness probe**: kiểm tra Pod đã sẵn sàng nhận traffic chưa.
- **liveness probe**: kiểm tra container có bị kẹt đến mức nên restart không.
- **requests / limits**: tài nguyên scheduler cần để đặt Pod và trần CPU/memory khi Pod đang chạy.

## Mental Model: request đi qua đâu?

```text
Client → Load Balancer / Ingress → Service → Pod Ready → ASP.NET Core API
                                         └→ Pod chưa Ready: không nhận traffic
```

`Deployment` có thể thay Pod khi rollout, node gặp sự cố hoặc process crash. Vì vậy API phải stateless, shutdown tử tế và đưa job cần giữ lại vào database hoặc broker. `Service` giữ địa chỉ ổn định khi Pod IP thay đổi.

## Practical Example: Checkout API khởi động chậm

Checkout API cần warm up trước khi nhận request. Nếu chỉ có liveness probe, Pod có thể còn đang start nhưng đã nhận traffic. Nếu liveness lại check Redis trong lúc Redis outage, nhiều Pod có thể cùng restart và làm incident nặng hơn.

```yaml
readinessProbe:
  httpGet: { path: /health/ready, port: http }
  periodSeconds: 5
livenessProbe:
  httpGet: { path: /health/live, port: http }
  periodSeconds: 10
startupProbe:
  httpGet: { path: /health/live, port: http }
  failureThreshold: 30
  periodSeconds: 5
```

`/health/live` chỉ nên nói process còn chạy. `/health/ready` có thể kiểm tra dependency tối thiểu để phục vụ checkout. `startupProbe` cho app thời gian start; khi nó chưa pass, Kubernetes chưa áp liveness thường xuyên.

## Capacity: scale không thay thế capacity planning

```yaml
resources:
  requests:
    cpu: 250m
    memory: 512Mi
  limits:
    cpu: "1"
    memory: 1Gi
```

Các số trên chỉ là ví dụ, không copy sang production. Lấy điểm bắt đầu từ load test và metrics: CPU, working set, managed heap, p95/p99, queue depth và connection pool. Memory vượt `limit` có thể thành `OOMKilled`; CPU limit thấp có thể làm request chậm vì throttling.

Khi HPA thấy CPU cao, nó tăng replica nếu cluster còn chỗ. Nhưng 10 Pod thành 30 Pod có thể mở thêm connection tới RDS hoặc dồn request vào payment provider. Trước khi scale, đặt concurrency limit cho downstream và theo dõi saturation ở database/queue.

### HPA khác node autoscaling thế nào?

| Cơ chế | Nó thay đổi gì | Không giải quyết gì |
|---|---|---|
| HPA | số replica của Deployment/worker | node hết capacity, database chậm hoặc connection pool cạn |
| Node autoscaler | số node hoặc capacity của cluster khi Pod không schedule được | query chậm, downstream timeout, code release lỗi |

HPA có thể tạo thêm Pod `Pending` nếu node không còn capacity. Node autoscaler có thể thêm node nếu platform đã cấu hình nó, nhưng Pod mới vẫn phải start kịp và database/downstream vẫn phải chịu được tải. Với HPA dựa trên CPU utilization, `requests.cpu` cần hợp lý thì phần trăm CPU mới có ý nghĩa.

## Graceful Shutdown: Pod bị dừng khi đang có việc

Pod không “biến mất” ngay khi rollout hoặc node drain. Termination bắt đầu quá trình đưa endpoint về terminating/not-ready và routing cần thời gian hội tụ; vì vậy không giả định traffic mới dừng tức thì. Nếu có `preStop`, hook chạy trước `SIGTERM`, nhưng `preStop sleep` không phải cách chữa chung. App vẫn phải xử lý race với request đang bay hoặc connection còn mở.

```text
Termination bắt đầu
  → Pod / Endpoint chuyển sang terminating hoặc not-ready
  → routing bắt đầu hội tụ để ngừng traffic mới (không giả định ngay lập tức bằng 0)
  → preStop (nếu có) → SIGTERM tới process
  → app dừng nhận work mới, drain request/work đang bay
  → persist kết quả → ack ở đúng boundary
  → process exit trước terminationGracePeriodSeconds
```

Với ASP.NET Core, cancellation khi host dừng phải đi tới request và worker. Consumer nên dừng lấy message mới, chờ work đang chạy trong giới hạn grace period, rồi chỉ `ack` sau khi business result đã được persist theo delivery contract. Nếu không kịp hoàn tất, để message được giao lại và handler phải idempotent. Đừng `ack` trước chỉ để Pod tắt nhanh.

## Debug Flow: Pod chạy nhưng API vẫn lỗi

1. Xác định scope: một Pod, một Deployment, namespace hay toàn cluster?
2. Xem events trước: Pod `Pending`, `ImagePullBackOff`, `CrashLoopBackOff` và `OOMKilled` là các lỗi khác nhau.
3. Với container restart, đọc log lần chạy trước; đừng restart liên tục khi chưa có evidence.
4. Nếu Pod `Running` nhưng request không tới, kiểm tra readiness, Service selector và endpoint trước khi kết luận lỗi app.
5. Đối chiếu metric, log và trace với release vừa đổi; rollback chỉ khi image, config và migration còn tương thích.

:::warning
`Pod Running` không có nghĩa API đang phục vụ được. `Running` nói container đã được tạo; readiness mới quyết định Service có route traffic đến Pod hay không.
:::

## Interview Answer

“Với ASP.NET Core API stateless, em dùng `Deployment` để chạy nhiều Pod và `Service` để có địa chỉ ổn định. Em tách readiness với liveness: readiness quyết định Pod có nhận traffic không, còn liveness chỉ restart process bị kẹt; em không check database trong liveness. Em đặt requests/limits dựa trên load test và production metrics. HPA tăng replica, còn khi cluster hết chỗ cần node autoscaling; cả hai không thay thế capacity của database. Khi termination, app dừng nhận work mới, drain phần đang chạy và chỉ ack message sau boundary đã persist.”

## Follow-up

- HPA tăng Pod nhưng RDS gần hết connection: bạn chặn và đo ở đâu trước? Nếu Pod `Pending` vì cluster hết chỗ thì ai thêm node?
- `PodDisruptionBudget` bảo vệ loại gián đoạn nào, và không bảo vệ node crash như thế nào?
- Consumer nhận SIGTERM khi đang xử lý message: ack và shutdown cần thiết kế ra sao?

## Final Recall

- Deployment quản lý replica; Service giữ đường vào ổn định; readiness quyết định có nhận traffic không.
- Requests/limits phải dựa trên số đo. HPA không sửa bottleneck ở database hoặc downstream.
- HPA tăng Pod; node autoscaler tăng capacity cluster. Graceful shutdown giữ request/job không bị cắt hoặc ack sai boundary.
- Debug theo events → logs → readiness/endpoint → telemetry, không restart theo phản xạ.
