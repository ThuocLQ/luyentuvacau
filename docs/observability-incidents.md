# Observability, Testing & Production Incidents

## Quick Summary

> **Nói đơn giản:** observability giúp trả lời “đang hỏng ở đâu và ảnh hưởng ai” dựa trên dữ liệu. Khi incident xảy ra, ưu tiên giảm ảnh hưởng trước; tìm nguyên nhân sâu và rút kinh nghiệm sau khi hệ thống ổn định.

Observability giúp trả lời hệ thống đang ảnh hưởng ai, tại boundary nào và từ khi nào. Khi incident xảy ra, ổn định user impact trước rồi mới điều tra root cause dựa trên evidence.

## Terms to Know

- [[p99 latency]]: tail latency mà average dễ che mất.
- [[Golden signals]]: latency, traffic, errors, saturation.
- [[Correlation ID]]: nối request qua log, trace và async flow.
- [[Blast radius]]: phạm vi cần ưu tiên ổn định.

::: production-trap
Restart mọi service hoặc đọc toàn bộ log trước khi giảm impact thường làm mất evidence và kéo dài incident.
:::

## Bài toán backend thực tế

Mười phút sau deploy, p99 của checkout tăng gấp đôi. Một người mở log toàn bộ cluster, người khác restart service và người thứ ba sửa nóng. Cả ba hành động đều có thể làm mất evidence hoặc tăng blast radius. Cách Senior làm là xác nhận user impact, ổn định hệ thống bằng rollback/feature flag nếu phù hợp, rồi dùng metrics, traces và logs để thu hẹp nguyên nhân.

Observability là khả năng trả lời câu hỏi mới từ evidence production; incident response là bảo vệ người dùng trước khi thỏa mãn tò mò kỹ thuật.

## Mental model

Logs kể chi tiết từng sự kiện, metrics cho thấy xu hướng bằng số, còn traces nối các bước của một request đi qua nhiều service. Ba loại signal này bổ sung nhau. Đừng chỉ thêm dashboard: mỗi signal phải hỗ trợ một quyết định hoặc cảnh báo có hành động rõ.

Metrics cho biết phạm vi và xu hướng; logs có structured context cho một sự kiện; traces chỉ ra đường đi và dependency nào tiêu thời gian. Ba tín hiệu bổ sung nhau, không thay thế nhau.

Testing là bằng chứng trước release; telemetry và release guard là bằng chứng sau release. Một thay đổi an toàn cần cả contract, rollout, rollback và khả năng quan sát tác động.

## Invariants phải giữ

- Mỗi request/message có correlation hoặc trace ID được propagate qua HTTP, queue và background worker.
- Logs có field cấu trúc cho operation, tenant an toàn, outcome, duration và error; không log password, token, request body nhạy cảm hay PII không cần thiết.
- Alert theo SLO/user impact và sustained burn rate, không alert mỗi exception lẻ.
- Release phải có owner, dashboard, feature flag/canary hoặc rollback path đã biết trước.
- Test đúng boundary: unit cho business rules, integration cho persistence/transaction, contract cho interface, end-to-end cho flow quan trọng.

## Cách ra quyết định

| Công cụ / hành động | Dùng khi | Trade-off / cảnh báo |
|---|---|---|
| Metrics | Nhìn broad impact: latency, traffic, error, saturation | Label cardinality quá cao làm telemetry đắt và chậm |
| Trace | So sánh request chậm với bình thường, tìm hop/downstream | Sampling phải đủ để thấy failure path |
| Structured log | Điều tra event/exception cụ thể | Không dùng log như metrics; phải redaction dữ liệu nhạy cảm |
| Rollback / flag off | Deploy mới tương quan với user impact, fix chưa chắc chắn | Cần migration backward-compatible và feature flag có owner |
| Hotfix | Nguyên nhân đã rõ, scope nhỏ, rollback không đủ | Không hotfix trong mù mờ hoặc bỏ qua verification |

## Production traps

- Restart mọi service làm mất memory evidence, tạo cold cache/retry burst và che nguyên nhân.
- Dashboard chỉ có CPU/RAM mà không có p99, error rate, queue age và dependency health thì không phản ánh user impact.
- Log request body để debug làm rò credentials/PII và tăng chi phí; dùng trace ID, event fields và redaction.
- Alert từng 5xx gây alert fatigue; incident thật bị chìm trong tiếng ồn.
- Schema migration không backward-compatible khiến rollback application không còn an toàn.

## Kiểm chứng ở production

- Đặt SLI/SLO cho journey quan trọng: success rate, p95/p99, freshness/queue age; dùng error budget hoặc burn rate làm alert.
- Trước release, kiểm tra dashboard theo version, error budget, dependency baseline và rollback procedure.
- Canary theo phần traffic có guardrail tự động; so version mới/cũ theo latency, error, saturation và business outcome.
- Diễn tập incident: ai incident commander, kênh giao tiếp, decision rollback, nơi lưu evidence và action items có owner/deadline.
- Test migration theo thứ tự expand → deploy compatible code → backfill → contract, để rollback vẫn chạy được.

## Mẫu trả lời 30–45 giây

"Nếu p99 tăng sau deploy, tôi xác nhận scope và user impact bằng golden signals, so sánh theo version và traces. Nếu deploy là nghi phạm mạnh và rollback/flag off an toàn, tôi ổn định trước; không restart hàng loạt. Sau đó tôi giữ evidence, kiểm tra dependency và change window, cập nhật stakeholders rồi mới RCA. Prevention phải là một guard cụ thể như SLO alert, load test, canary guardrail hay migration rule."

## Mẫu trả lời Senior 2 phút

"Tôi mở dashboard journey bị ảnh hưởng, xem p99, success rate, traffic và saturation theo version/region để xác nhận không phải traffic anomaly. Tôi so trace của request chậm với baseline để biết thời gian nằm ở app, DB hay dependency. Nếu thay đổi vừa deploy gây impact và có rollback compatible, tôi rollback hoặc tắt flag ngay; mục tiêu là khôi phục SLO, không chờ hiểu hết nguyên nhân.

Trong khi ổn định, tôi ghi timeline, preserve trace/log/query plan và cử một người giao tiếp tình trạng. Sau incident, RCA phân biệt trigger, root cause và contributing factors. Action item phải đo được: thêm span cho query X, canary guardrail error rate, index/load test, hoặc migrate expand-contract. Tôi kiểm tra action có owner và review release plan để lần sau phát hiện sớm hơn."

## Câu hỏi follow-up và red flags

### Bạn làm gì khi p99 tăng gấp đôi sau deploy?

**Ý chính:** Xác nhận impact, so deploy/version và golden signals, inspect trace/dependency, rollback hoặc flag off nếu an toàn, giữ evidence và communicate. RCA sau khi ổn định.

**Follow-up:** Dashboard đầu tiên xem gì? Điều kiện rollback? Làm sao rollback khi đã có DB migration?

**Red flags:** "Đọc tất cả log trước", "restart mọi service", "CPU thấp thì không phải incident".

### Metrics, logs và traces khác nhau thế nào?

**Ý chính:** Metrics trả lời mức độ/range; logs trả lời sự kiện; trace trả lời đường đi/latency. Correlation ID liên kết chúng.

## Final recall

- Alert theo user impact; trace qua boundary; log có cấu trúc và redaction.
- Stabilize trước, điều tra bằng evidence, prevention có owner.
- Release safety gồm rollout, rollback, migration compatibility và observability.
