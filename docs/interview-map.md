# Bản đồ ôn phỏng vấn Senior Backend .NET

## Quick Summary

Đừng đọc 33 cheatsheet theo số thứ tự. Ưu tiên theo hai câu hỏi: topic này xuất hiện thường xuyên đến đâu, và interviewer mong bạn sâu tới mức nào? Dashboard dùng dữ liệu recall của bạn để gợi ý thứ tự; bản đồ này giúp bạn tự override theo JD cụ thể.

## Tier A — Core Backend: phải chắc

Async/concurrency, Collections/LINQ, SOLID practical design, ASP.NET Core pipeline/DI, API/authentication/authorization/idempotency, EF Core/SQL, index/transaction/locking và Testing.

Mục tiêu: không cần mở note để trả lời decision, mechanism, trade-off, failure mode và evidence cho phần lớn các câu Tier A.

## Tier B — Production Backend: thường gặp

Background jobs/resilience, Cache/Redis, performance/scalability, observability/incident, Docker/CI-CD, messaging fundamentals và System Design.

Mục tiêu: biết vận hành, đo và xử lý failure mode; không chỉ kể tên tool.

## Tier C — Distributed và Platform: tùy role, là strong signal

Outbox, Saga, event contracts, Kafka/RabbitMQ, Kubernetes, AWS, Realtime/SignalR, modular monolith/microservices và DDD boundary.

Mục tiêu: nói rõ điều kiện nào khiến complexity này đáng đổi lấy.

## Tier D — Specialized: học khi JD hoặc domain cần

Event Sourcing, EKS internals, Finance/Securities và các chi tiết vendor/domain đặc thù.

## Chọn plan theo thời gian

| Thời gian | Làm gì |
|---|---|
| 30 phút | Làm các item Due, sau đó 1 oral Tier A và 1 project story. |
| 60 phút | Due → 2 topic Tier A yếu → 1 quiz tình huống → tự nói lại 60 giây. |
| 1 ngày | Buổi sáng Tier A; chiều Tier B; tối mock oral + story. Không mở Tier D nếu JD không cần. |
| 3 ngày | Ngày 1 Core Backend; ngày 2 Production + SQL/Testing; ngày 3 distributed/platform đúng JD, rồi mock. |
| 7 ngày | Luân phiên Due mỗi ngày; củng cố Tier A/B trước, dành 1–2 buổi cho Tier C theo role và 1 buổi cho project stories. |

## JD override priority

JD không thay thế nền tảng, nhưng thay thứ tự sau Tier A. Ví dụ JD ghi `.NET 8, Redis, RabbitMQ, Kubernetes, AWS, SQL Server` thì sau Async/API/SQL/Testing, ưu tiên Cache/Redis, Messaging, Kubernetes và AWS. Nếu JD là Finance, nâng Finance/Securities từ Tier D lên ngay sau Core Backend.

Không có kinh nghiệm trực tiếp vẫn có thể trả lời tốt: nêu phạm vi thật, suy luận từ invariant/boundary đã biết, nói rõ điều cần kiểm chứng và không bịa số liệu.

## Cách tự đánh giá

- **Almost always / Deep**: phải tự giải thích được ngay và xử lý follow-up đổi constraint.
- **Common / Strong**: phải quyết định được khi có scenario production rõ.
- **Role dependent**: nắm mental model, failure mode và điều kiện áp dụng.
- **Specialized**: biết khi nào cần đào sâu hoặc hỏi thêm dữ kiện.

## Final Recall

- Due và weakness quan trọng hơn document order.
- Tier A trước; JD override thứ tự phần còn lại.
- Completion chỉ là tín hiệu coverage, không phải xác suất pass interview.