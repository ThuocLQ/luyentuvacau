# Khi production lỗi: biết ai bị ảnh hưởng trước khi đoán nguyên nhân

## Trong 30 giây

- Observability là trả lời được: lỗi gì, ai bị ảnh hưởng, từ khi nào và giảm impact thế nào.
- Metrics báo quy mô/xu hướng; trace chỉ ra request chờ ở đâu; log có context chi tiết.
- Incident ưu tiên ổn định người dùng, giữ evidence, rồi mới root cause.
- Alert phải gắn SLO và outcome người dùng, không chỉ CPU hoặc số exception.
- Incident hoàn tất khi có guardrail có owner, không chỉ khi service chạy lại.

## Gặp ở đâu ngoài đời?

Ngay sau deploy, checkout p99 tăng gấp đôi. CPU vẫn thấp nên team định restart tất cả pod. Nhưng trace cho thấy một query mới chờ lock; restart vừa xóa bớt evidence vừa tạo cold start. Việc đúng là xác định phạm vi theo version/region, giảm traffic hoặc rollback an toàn, sau đó giữ trace và deploy diff để điều tra.

## Hiểu đơn giản trước

- **Metrics** cho biết “bao nhiêu và từ khi nào”: p99, error rate, queue depth.
- **Trace** cho biết một request đi qua đâu và chờ ở đâu.
- **Structured log** cho biết ngữ cảnh: order ID đã được che an toàn, version, outcome và lỗi.
- Ba thứ nối được với nhau qua correlation ID và deploy version mới tạo thành bằng chứng.

## Từ cần biết

- [[SLO]] (mục tiêu dịch vụ đo được) — ví dụ checkout p99 dưới 500 ms.
- [[Golden signals]] (latency, traffic, errors, saturation) — khung nhìn sức khỏe.
- [[Correlation ID]] (ID nối log/trace qua boundary) — không chứa secret/PII.
- **Blast radius** (phạm vi bị ảnh hưởng) — quyết định rollback/canary/flag.

## Cách quyết định, từng bước

1. **Xác nhận impact:** endpoint, tenant/region, error/latency, thời điểm bắt đầu và version liên quan.
2. **Giảm impact:** tắt flag, canary về 0%, rate limit hoặc rollback nếu schema/state còn tương thích.
3. **Giữ evidence:** dashboard, trace chậm/lỗi, config và deploy diff, queue/database saturation.
4. **Cập nhật rõ ràng:** impact hiện tại, mitigation, thời điểm cập nhật tiếp theo; không đoán root cause như fact.
5. **Ngăn lặp lại:** tái hiện, thêm test/alert/guardrail/runbook có owner và hạn.

## Chọn A hay B?

| Chọn | Khi phù hợp | Đổi lại |
|---|---|---|
| Rollback | Artifact cũ chạy được với state/schema hiện tại | Có thể mất change mới |
| Tắt feature flag | Hành vi mới tách được khỏi deploy | Cần flag có owner/fallback |
| Roll-forward | Migration semantic không thể chạy với code cũ | Cần hotfix nhỏ, quan sát chặt |
| Restart | Process thực sự hỏng/leak đã xác minh | Có thể xóa evidence, cold start |

## Nếu có lỗi thì sao?

Alert p99 tăng nhưng business order vẫn thành công: giảm mức khẩn cấp, vẫn điều tra trend. Ngược lại, CPU bình thường nhưng `payment_success` giảm: đó là incident theo outcome. Dashboard phải tách theo version/canary để phát hiện release gây lỗi trước khi lan toàn traffic.

::: production-trap
Restart hàng loạt hoặc “đọc hết log trước” đều không phải phản ứng mặc định. Có thể kéo dài outage và làm mất dấu vết cần để chứng minh nguyên nhân.
:::

## Chứng minh mình làm đúng

- Alert SLO/error budget và business outcomes: checkout completed, payment confirmed, duplicate rejected.
- Trace có version, correlation ID, dependency timing; log không chứa token/PII.
- Diễn tập failure nhỏ để kiểm tra alert, ownership và runbook.
- Post-incident action có test/guardrail và ngày kiểm tra lại.

## Nói trong phỏng vấn

“Khi p99 tăng sau deploy, em xác nhận ai bị ảnh hưởng theo version và region trước. Em giảm impact bằng rollback hoặc flag nếu tương thích, đồng thời giữ dashboard, trace và deploy diff. Metrics cho em biết quy mô, trace tìm chỗ chờ, log có context để kiểm chứng. Em không restart đại trà. Sau khi ổn định, action phải có owner và guardrail như canary metric, test hay alert theo outcome để lỗi không chỉ được ‘nhắc nhở cẩn thận’.”

## Interviewer thường hỏi tiếp

### Metrics, logs và traces khác nhau thế nào?

Metrics phát hiện và đo trend; trace nối latency qua boundary; log giải thích context của một event. Cần correlation/version để đi từ alert đến request cụ thể.

### Khi nào không rollback?

Khi migration/state mới không còn tương thích với code cũ. Khi đó tắt behavior hoặc roll-forward an toàn có thể ít rủi ro hơn.

## Tự kiểm trước khi qua bài

- Alert nào của bạn phản ánh người dùng không hoàn tất được việc?
- Bạn cần giữ evidence nào trước khi restart?
- Change nào có thể tắt bằng flag thay vì rollback toàn bộ?

## Nhớ một phút

- Impact trước, mitigation trước, root cause sau.
- Metrics thấy quy mô; trace thấy đường đi; log thấy context.
- Chỉ xong incident khi có guardrail kiểm chứng được.
