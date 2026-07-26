# Docker, CI/CD & Production Incidents

## Khi nào gặp

Đây là nhóm câu hỏi để phân biệt người “đẩy được container” với người vận hành an toàn: image chạy local nhưng fail ở Kubernetes/host khác, deployment làm p99 tăng, rollback không an toàn với migration, secret lọt vào image, hoặc incident cần ra quyết định trước khi biết root cause.

## Mental model

Artifact triển khai phải bất biến, có thể truy vết và chạy giống nhau giữa các môi trường; configuration và secret là dữ liệu runtime, không bake vào image. Delivery pipeline là chuỗi quality gate có mục tiêu rõ: build một lần, kiểm dependency/test/security, publish image có digest, deploy theo chiến lược, quan sát health và rollback/roll-forward theo khả năng tương thích.

Incident response ưu tiên giảm tác động người dùng, không phải chứng minh ai đúng hoặc truy sâu log ngay lập tức. Mỗi thay đổi phải có đường thoát, telemetry và owner. Migration database, message schema và API contract đều là deployment dependency; version ứng dụng mới/chũ có thể cùng chạy trong một khoảng thời gian.

## Câu trả lời 60 giây

“Tôi build một artifact bất biến từ source đã kiểm tra, gắn commit SHA/digest và promote cùng artifact qua môi trường. Image chạy bằng non-root, multi-stage, không chứa secret và có health endpoint phản ánh đúng khả năng phục vụ. Pipeline chạy test/lint, dependency scan và kiểm compatibility migration trước deploy. Tôi dùng expand–migrate–contract: schema mới tương thích với app cũ, deploy app đọc/ghi cả hai khi cần, backfill, rồi mới bỏ schema cũ. Khi p99 tăng sau deploy, tôi ổn định tác động trước bằng rollback hoặc feature flag, so sánh golden signals/traces với version mới, giữ bằng chứng, truyền thông trạng thái và viết action phòng ngừa sau incident.”

## Must remember

- Build once, promote many: không rebuild khác source cho staging và production.
- Tag dễ bị thay đổi; digest hoặc commit SHA là identity triển khai đáng tin để rollback/điều tra.
- Container nên chạy non-root, filesystem read-only nếu phù hợp, base image tối thiểu và process nhận signal để shutdown graceful.
- Liveness chỉ trả lời process còn sống; readiness trả lời instance có thể nhận traffic. Đừng để readiness phụ thuộc mọi downstream không cần thiết nếu điều đó gây outage dây chuyền.
- Secret đến qua secret manager/runtime injection; không commit, không `ARG`/`ENV` trong layer image, không log khi config dump.
- Deployment phải tương thích phiên bản chồng lấp của app, database schema, event schema và cache format.

## Thiết kế Docker an toàn

Multi-stage build tách SDK/build tools khỏi runtime. Pin base image theo version/digest theo policy, cập nhật có kiểm soát và quét CVE; đừng tự động nâng bản major mà không test. Dùng `.dockerignore` để tránh copy `.git`, `node_modules`, file local, secret hoặc test artifact vào build context.

Image chỉ chứa runtime và application publish output. Expose port là metadata, không phải firewall. Đặt user không phải root, biến môi trường non-secret có default an toàn, và log ra stdout dưới dạng structured logs để platform thu thập. App cần xử lý `SIGTERM`: ngừng nhận request mới, hoàn tất request/job trong grace period, rồi thoát.

## CI/CD và compatibility

Quality gate không phải càng nhiều càng tốt; mỗi gate phải bắt một failure mode: compile/type check, unit/integration/contract test, lint, secret/dependency/container scan, migration validation và smoke test sau deploy. Artifact manifest nên chứa version, source SHA, build time, SBOM/provenance nếu hệ thống yêu cầu.

Với database, không deploy migration destructively cùng lúc với code đang chạy. Expand thêm column/table/index trước; app mới đọc fallback và ghi tương thích; migrate/backfill có throttling; quan sát; cuối cùng contract xóa code/schema cũ ở release sau. Cùng nguyên tắc cho event consumer: add field là optional, không đổi semantic cũ im lặng, và giữ consumer cũ trong thời gian rollout.

## Incident response

1. Xác nhận ảnh hưởng: lỗi, latency, tenant/region nào, từ lúc nào.
2. Ổn định: rollback, disable feature, rate-limit hoặc chuyển traffic theo runbook có rủi ro thấp.
3. Thu thập evidence: deploy diff, dashboard golden signals, trace exemplar, queue/database saturation; không restart hàng loạt làm mất bằng chứng.
4. Cập nhật người liên quan với impact, mitigation, thời điểm update tiếp theo; không suy đoán root cause là fact.
5. Sau ổn định: phân tích nguyên nhân/hệ thống, action owner+deadline, test/alert/runbook để ngăn tái diễn.

## Quyết định và trade-off

| Quyết định | Dùng khi | Điều kiện an toàn |
|---|---|---|
| Rolling deploy | App stateless, backward compatible | Readiness, drain, schema compatibility |
| Canary/blue-green | Rủi ro lớn hoặc metric rõ | Phân phối traffic, rollback nhanh, quan sát đủ |
| Feature flag | Tách release khỏi enablement | Owner, expiry, audit, fallback đã test |
| Rollback | Artifact cũ tương thích state/schema hiện tại | Không rollback qua migration phá vỡ dữ liệu |
| Roll-forward | State mới không còn tương thích bản cũ | Hotfix nhỏ, kiểm soát blast radius |

## Bẫy production

- Tag image là `latest`: không biết chính xác đang chạy gì và rollback không quyết định được.
- Health check chỉ gọi dependency xa: một outage Redis làm tất cả app instance unready dù endpoint degrade được.
- Migrate drop/rename column trước khi toàn bộ app cũ biến mất: lỗi runtime theo từng pod.
- Chạy container root hoặc copy secret vào image: tăng blast radius của RCE/image leak.
- Auto-retry deploy mà không dừng khi error budget/metric xấu: biến lỗi nhỏ thành outage lớn.
- Restart mọi service khi chưa xem trace/deploy diff: mất evidence và tạo cold-start storm.
- Postmortem chỉ ghi “cẩn thận hơn”: không có thay đổi hệ thống kiểm chứng được.

## Ví dụ

```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY *.sln ./
COPY src/MyApi/MyApi.csproj src/MyApi/
RUN dotnet restore
COPY . .
RUN dotnet publish src/MyApi/MyApi.csproj -c Release -o /out /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
RUN adduser --disabled-password --gecos "" appuser
COPY --from=build /out .
USER appuser
ENTRYPOINT ["dotnet", "MyApi.dll"]
```

Thực tế vẫn cần pin image theo policy, `.dockerignore`, runtime secret injection và cấu hình platform cho read-only filesystem/capability. Dockerfile không tự tạo security boundary hoàn chỉnh.

## Câu hỏi phỏng vấn

### Bạn rollback thế nào nếu deploy mới kèm database migration?

**Ý chính:** Tôi chỉ rollback an toàn khi migration theo expand–migrate–contract và app cũ vẫn đọc/ghi schema mới. Nếu dữ liệu đã chuyển semantic không tương thích, dùng roll-forward/feature flag, không ép artifact cũ chạy trên state mới.

**Follow-up:** Bạn kiểm migration trên dữ liệu lớn thế nào? Làm sao deploy event schema không phá consumer cũ?

**Red flags:** “Rollback image là đủ”; “chạy migration trong startup của mọi pod”.

### Bạn làm gì đầu tiên khi p99 tăng sau deploy?

**Ý chính:** Xác định impact rồi giảm tác động bằng rollback/disable an toàn; so sánh version, golden signals và traces để giữ evidence. Không restart bừa hoặc đào toàn bộ log trước khi ổn định khách hàng.

## Tự kiểm

- Tôi có thể truy từ request lỗi về đúng image digest, source SHA và deploy không?
- Tôi có thể mô tả migration tương thích với app cũ/app mới chạy đồng thời không?
- Tôi có thể phân biệt liveness, readiness và startup probe bằng hậu quả production không?
- Tôi có thể nêu bước ổn định, evidence và truyền thông của một incident không?
