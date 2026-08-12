# Kubernetes cho Backend .NET: Deploy, Scale và Debug

## Quick Summary

- Kubernetes giữ **desired state**: bạn khai báo API cần bao nhiêu bản chạy và controller cố đưa trạng thái thực tế về đó. Nó không tự làm app đúng hay tự xử lý side effect.
- Với API stateless, `Deployment` quản lý nhiều Pod; `Service` cho địa chỉ ổn định; chỉ Pod `Ready` mới nên nhận traffic.
- `readinessProbe` trả lời “Pod có nhận request được chưa?”; `livenessProbe` trả lời “container có nên restart không?”. Đừng dùng liveness để check SQL hay Redis.
- `requests` giúp scheduler đặt Pod vào node; `limits` chặn mức dùng runtime. HPA chỉ scale Pod, không làm database hay downstream có thêm capacity.

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

“Với ASP.NET Core API stateless, em dùng `Deployment` để chạy nhiều Pod và `Service` để có địa chỉ ổn định. Em tách readiness với liveness: readiness quyết định Pod có nhận traffic không, còn liveness chỉ restart process bị kẹt; em không check database trong liveness. Em đặt requests/limits dựa trên load test và production metrics, rồi dùng HPA như một phần của capacity plan. Khi API lỗi, em xem events, log của container trước đó, readiness và Service endpoint trước khi restart hay scale thêm Pod.”

## Follow-up

- HPA tăng Pod nhưng RDS gần hết connection: bạn chặn và đo ở đâu trước?
- `PodDisruptionBudget` bảo vệ loại gián đoạn nào, và không bảo vệ node crash như thế nào?
- Consumer nhận SIGTERM khi đang xử lý message: ack và shutdown cần thiết kế ra sao?

## Final Recall

- Deployment quản lý replica; Service giữ đường vào ổn định; readiness quyết định có nhận traffic không.
- Requests/limits phải dựa trên số đo. HPA không sửa bottleneck ở database hoặc downstream.
- Debug theo events → logs → readiness/endpoint → telemetry, không restart theo phản xạ.
