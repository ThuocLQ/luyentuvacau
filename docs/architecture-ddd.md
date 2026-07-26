# Modular Monolith, Microservices & DDD

## Quick Summary

Nếu một team còn cùng deploy, cùng database và cùng thay đổi nghiệp vụ, modular monolith thường an toàn hơn microservices. Tách service chỉ có ích khi có ownership, nhịp thay đổi hoặc nhu cầu scale độc lập rõ ràng.

## Terms to Know

- [[Bounded context]]: phạm vi mà một từ và một rule nghiệp vụ có nghĩa nhất quán.
- [[Data ownership]]: service/module chịu trách nhiệm ghi và bảo vệ dữ liệu của mình.
- [[Modular monolith]]: một ứng dụng deploy cùng nhau nhưng chia module có ranh giới rõ.

::: senior-signal
Nêu bằng chứng khiến bạn tách service, thay vì nói microservices luôn scale tốt hơn.
:::

## Bài toán backend thực tế

Ví dụ Order, Payment và Catalog dùng chung bảng và gọi lẫn nhau. Tách thành ba service ngay khiến một thay đổi checkout phải đi qua mạng, có timeout và dữ liệu chậm đồng bộ. Nếu chưa có owner/team độc lập, độ phức tạp tăng nhưng giá trị chưa tăng.

## Mental model

Architecture là cách đặt ranh giới cho thay đổi và lỗi. Module tốt có API nội bộ rõ, không đọc trực tiếp database của module khác và có rule riêng. Khi ranh giới đủ ổn định, tách deployment sau sẽ ít đau hơn.

## Invariants phải giữ

Xác định dữ liệu nào phải đúng cùng lúc. Ví dụ tạo order và giữ tồn kho có thể cần một transaction khi còn chung owner. Nếu tách owner, phải chấp nhận trạng thái `Pending`, event/reconciliation và cách giải quyết khi một bước thất bại. Đừng giả vờ mạng có transaction giống database local.

## Cách ra quyết định

Giữ modular monolith khi domain còn thay đổi nhanh, team nhỏ, transaction chung quan trọng hoặc không có tải độc lập. Tách service khi có boundary nghiệp vụ rõ, owner vận hành riêng, cần deploy/scale/cách ly lỗi riêng và có khả năng vận hành broker, tracing, contract version.

DDD không bắt bạn tạo nhiều service. Nó giúp gọi đúng tên, gom rule liên quan và tránh module này sửa state của module khác. Bắt đầu bằng module, test ranh giới và event nội bộ; chỉ phân tán khi lợi ích lớn hơn chi phí mạng và vận hành.

## Production traps

- Tách theo technical layer như “user service”, “database service” thay vì ownership nghiệp vụ.
- Service nào cũng đọc database service khác, tạo distributed monolith.
- Đồng bộ RPC dây chuyền trên checkout làm một dependency chậm kéo toàn flow chậm.
- Không có owner cho event schema, retry, DLQ và reconciliation.

## Kiểm chứng ở production

Theo dõi deploy dependency, lỗi cross-boundary, latency của call sync, backlog event và thời gian xử lý mismatch. Nếu một module luôn phải deploy cùng module khác, boundary có thể chưa đủ độc lập. Nếu service tách ra nhưng không có SLO/owner riêng, nó mới chỉ là chi phí.

## Mẫu trả lời 30–45 giây

“Tôi bắt đầu bằng bounded context và data ownership. Với domain chưa ổn định, modular monolith giữ transaction và debug đơn giản. Tôi chỉ tách khi một boundary có owner, thay đổi hoặc tải độc lập rõ; khi đó thiết kế contract, idempotency, observability và reconciliation ngay từ đầu.”

## Mẫu trả lời Senior 2 phút

Khi cần tách Payment, tôi chỉ rõ Payment sở hữu payment attempt và outcome; Order không ghi bảng payment. Order phát command/event với ID ổn định, Payment xử lý idempotent và trả trạng thái để Order hiển thị `Pending` khi cần. Tôi đo timeout, duplicate, backlog và reconciliation thay vì hứa consistency tức thì.

## Câu hỏi follow-up và red flags

### Khi nào không chọn microservices?

Khi boundary/team/scale độc lập chưa được chứng minh hoặc transaction chung quan trọng. Khi đó microservices thêm network failure, versioning và vận hành nhưng không giải quyết vấn đề thật.

### Bounded context bảo vệ invariant thế nào?

Nó chỉ rõ ai được thay đổi state và rule nào thuộc cùng mô hình. Invariant local đặt gần owner; invariant xuyên context cần workflow, trạng thái trung gian và reconciliation.

## Final recall

- Module trước, service sau.
- Ownership rõ quan trọng hơn sơ đồ nhiều box.
- Tách boundary phải đi kèm contract, recovery và vận hành.
