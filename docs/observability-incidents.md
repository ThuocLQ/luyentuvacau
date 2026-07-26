# Observability, Testing & Production Incidents

## Quick Summary

Khi checkout lỗi, log dài không tự cho biết khách nào bị ảnh hưởng hay deploy nào gây ra. Observability là khả năng trả lời từ dữ liệu: chuyện gì đang hỏng, hỏng ở đâu, từ khi nào và làm sao giảm tác động an toàn.

## Terms to Know

- [[Metrics]]: số đo theo thời gian, ví dụ error rate và p99.
- [[Tracing]]: đường đi của một request qua các service/dependency.
- [[SLO]]: mục tiêu dịch vụ đo được mà người dùng cần.

::: production-trap
Restart hàng loạt trước khi xem version, metric và trace có thể xóa bằng chứng rồi tạo thêm tải cold start (chi phí khởi động lại instance).
:::

## Bài toán backend thực tế

Sau deploy, p99 tăng gấp đôi. Nếu team chỉ nhìn CPU, họ có thể bỏ lỡ query mới hoặc dependency timeout. Nếu rollback mọi thứ mà không ghi lại version/timeline, lỗi có thể quay lại ở lần sau. Cần ổn định người dùng trước, sau đó điều tra bằng evidence.

## Mental model

Metrics cho biết “bao nhiêu và khi nào”, log có context chi tiết “đã xảy ra gì”, trace cho biết request chờ ở đâu. Không công cụ nào thay thế công cụ khác. Gắn correlation ID, version deploy, tenant/an toàn dữ liệu và outcome để nối chúng lại.

## Invariants phải giữ

Không log secret, token hay PII (dữ liệu nhận diện cá nhân); log phải có cấu trúc và retention phù hợp. Alert phải gắn user impact/SLO, không phải mỗi dòng exception. Test phải bảo vệ behavior quan trọng: authorization, idempotency, migration compatibility, retry và invariant dữ liệu.

## Cách ra quyết định

Khi incident xảy ra:

1. Xác nhận impact: endpoint, region/tenant, error/latency, thời điểm bắt đầu.
2. Ổn định: rollback, tắt feature flag, rate limit hoặc giảm traffic theo runbook ít rủi ro.
3. Giữ evidence: deploy diff, dashboard, trace exemplar (một trace đại diện của request lỗi/chậm), queue/database saturation và thay đổi config.
4. Cập nhật stakeholder bằng impact, mitigation và thời điểm cập nhật tiếp theo.
5. Sau ổn định, tìm nguyên nhân và tạo action có owner, deadline, test/alert/runbook để ngăn lặp lại.

Chọn rollback khi artifact cũ còn tương thích schema/state. Nếu migration đã đổi semantic dữ liệu, roll-forward hoặc feature flag có thể an toàn hơn.

## Production traps

- Alert theo CPU nhưng không alert theo checkout fail/p99/SLO.
- Log exception không có request ID, version hoặc business ID.
- Test unit nhiều nhưng không có integration/contract test cho boundary quan trọng.
- Postmortem kết thúc bằng “cẩn thận hơn” thay vì thay đổi kiểm chứng được.

## Kiểm chứng ở production

Dashboard nên cho golden signals (bốn tín hiệu: latency, traffic, errors, saturation); cùng business signal như order created/paid, duplicate rejection, outbox age. Drill failure nhỏ có kiểm soát để kiểm runbook/alert. Sau deploy so sánh theo version/canary, không chỉ nhìn toàn hệ thống.

## Mẫu trả lời 30–45 giây

“Tôi dùng metrics để phát hiện tác động, trace để tìm request chờ ở đâu và structured log để có context. Khi p99 tăng sau deploy, tôi ổn định bằng rollback/flag nếu an toàn, giữ deploy diff và trace trước khi đào sâu. Alert gắn SLO; sau incident có action owner và test hoặc guardrail cụ thể.”

## Mẫu trả lời Senior 2 phút

Với checkout chậm sau deploy, tôi xác nhận phạm vi theo version/region rồi xem p99, error rate, saturation và trace của request chậm. Nếu change tương quan mạnh và rollback compatible, tôi rollback hoặc tắt flag để bảo vệ khách. Tôi không restart bừa. Sau khi ổn định, tôi so query/config/code diff, tái hiện bằng test và thêm canary guardrail/dashboard theo version. Nếu cần migration không rollback được, tôi roll-forward với phạm vi nhỏ và monitoring chặt.

## Câu hỏi follow-up và red flags

### Bạn làm gì khi p99 tăng gấp đôi sau deploy?

Xác nhận impact, giảm tác động bằng đường thoát an toàn, giữ evidence theo version rồi mới khoanh nguyên nhân. Không kết luận CPU thấp nghĩa là hệ thống khỏe.

### Metrics, logs và traces khác nhau thế nào?

Metrics phát hiện xu hướng/alert, logs cho context chi tiết, traces nối latency qua boundary. Dùng cùng correlation/version để đi từ alert đến request cụ thể.

## Final recall

- Phát hiện impact bằng metric, điều tra bằng trace/log có context.
- Ổn định người dùng trước khi tối ưu root cause.
- Incident chỉ hoàn tất khi có guardrail kiểm chứng được.
