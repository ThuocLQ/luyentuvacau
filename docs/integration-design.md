# REST, gRPC, CQRS & Event-Driven Design

## Quick Summary

Chọn giao tiếp từ việc người gọi có cần kết quả ngay, dữ liệu thuộc ai và lỗi nào chịu được. REST/gRPC phù hợp hỏi–đáp trực tiếp; event phù hợp khi bên nhận có thể xử lý sau và phải tự chịu retry/duplicate.

## Terms to Know

- [[REST]]: API HTTP có resource/contract rõ cho client hoặc service.
- [[gRPC]]: giao tiếp RPC dùng contract có kiểu, thường hợp nội bộ cần latency thấp.
- [[CQRS]]: tách đường ghi thay đổi dữ liệu khỏi đường đọc tối ưu cho hiển thị.

::: senior-signal
Đừng chọn event chỉ để “decouple”; nói rõ độ trễ, duplicate và ownership mà bạn chấp nhận.
:::

## Tình huống phỏng vấn

Checkout cần trả kết quả cho người dùng, nhưng gửi email không cần chờ. Nếu API gọi email đồng bộ, email chậm làm checkout chậm. Nếu phát event cho payment mà UI cần biết payment ngay, người dùng lại thấy trạng thái khó hiểu. Mỗi bước cần chọn đường giao tiếp khác nhau.

## Mental model

Call synchronous tạo coupling về latency và availability: bên gọi chờ bên nhận. Event tách thời gian nhưng đổi lại at-least-once delivery (cùng event có thể đến hơn một lần), trạng thái chậm hội tụ và cần quan sát. CQRS chỉ hữu ích khi read/write có nhu cầu khác nhau; không phải mặc định cho mọi CRUD.

## Chọn kiểu giao tiếp

Chọn REST khi client/public API cần URL, cache, debug và compatibility dễ hiểu. Chọn gRPC cho call nội bộ có contract chặt, streaming hoặc overhead HTTP/JSON đáng kể; vẫn cần timeout, auth và versioning. Chọn event khi một fact đã xảy ra cần nhiều bên phản ứng độc lập, hoặc công việc không nằm trên critical path (chuỗi việc phải xong trước khi trả lời người dùng).

Trước khi dùng event, trả lời: ai sở hữu event, consumer deduplicate bằng gì, xử lý poison message (message lỗi dữ liệu nên retry cũng không tự khỏi) ra sao và khi nào UI được coi là xong.

## Thiết kế REST có thể vận hành

Đặt tên resource theo domain, validate input, authorize theo tenant/resource và dùng status code nhất quán. Với command tạo side effect, dùng idempotency key và outcome queryable để client retry không tạo bản ghi trùng. Pagination cần sort ổn định; API version thay đổi theo cách consumer cũ vẫn chạy được trong giai đoạn chuyển đổi.

## gRPC khi có lý do rõ ràng

gRPC không tự làm hệ thống nhanh. Nó tốt khi contract sinh code giảm lỗi mapping và call nội bộ nhiều/nhạy latency. Nhưng browser/public client, debugging đơn giản hoặc proxy support có thể làm REST phù hợp hơn. Luôn đặt deadline và giới hạn fan-out; một call nhanh vẫn có thể kéo p99 nếu chờ nhiều dependency.

## CQRS và event: phân tách đúng chỗ

Ví dụ ghi order cần transaction/constraint, còn dashboard đọc tổng hợp nhiều trạng thái. Giữ write model (dữ liệu dùng để ghi và quyết định nghiệp vụ) là source of truth; tạo read model (bản dữ liệu tối ưu để đọc) bất đồng bộ khi dashboard cần query khác. Người dùng phải biết dữ liệu có thể trễ bao lâu và hệ thống phải replay/rebuild được read model.

## Bẫy production

- Gọi sync qua nhiều service chỉ vì “dễ code”, rồi timeout lan truyền.
- Event không có ID/version/owner nên consumer không replay an toàn.
- Trả `200 OK` khi command mới vào queue nhưng UI hiểu là nghiệp vụ đã hoàn tất.
- Tạo CQRS/event sourcing cho CRUD đơn giản mà không có read/write pressure.

## Mẫu trả lời Senior

“Tôi chọn từ critical path và ownership. Request cần phản hồi ngay dùng REST/gRPC với deadline; work có thể trễ dùng event qua outbox. Event nghĩa là consumer idempotent, schema versioned và UI thể hiện pending. CQRS chỉ tách khi read model thực sự khác write model.”

## Câu hỏi ôn phỏng vấn

### Khi nào chọn event thay vì gọi synchronous?

Khi bên nhận không cần quyết định response ngay, có thể xử lý độc lập và chấp nhận trạng thái trễ. Bù lại phải có retry, dedup, DLQ và monitoring.

### CQRS có bắt buộc event sourcing không?

Không. CQRS chỉ là tách read/write. Event sourcing là lưu event như nguồn lịch sử chính, có cost mô hình hóa và replay riêng.

## Final recall

- Giao tiếp là quyết định về thời gian, ownership và failure.
- Synchronous cần deadline; event cần idempotency và visibility.
- Chỉ thêm CQRS khi access pattern chứng minh cần nó.
