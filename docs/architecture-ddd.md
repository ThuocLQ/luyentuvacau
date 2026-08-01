# Khi nào nên giữ modular monolith, khi nào mới tách service?

## Trong 30 giây

- Một ứng dụng chưa cần nhiều service chỉ vì nó lớn.
- Giữ **modular monolith (một ứng dụng deploy cùng nhau nhưng chia ranh giới rõ)** khi team và dữ liệu vẫn cần đổi cùng nhau.
- Chỉ tách service khi một phần có owner, nhịp thay đổi, nhu cầu scale hoặc yêu cầu cách ly lỗi riêng.
- Tách service đổi lời gọi trong bộ nhớ thành mạng: có timeout, dữ liệu trễ, version contract và vận hành nhiều hơn.
- Bằng chứng tách đúng là phần đó deploy/scale/vận hành độc lập thật, không phải sơ đồ có nhiều ô.

## Gặp ở đâu ngoài đời?

Team có một web bán hàng gồm Order, Payment và Catalog. Mỗi lần sửa checkout, ba phần đều phải sửa bảng và deploy cùng nhau. Có người đề xuất tách ngay thành ba microservice để “dễ scale”. Nhưng Payment chưa có team riêng, traffic không lớn và Order vẫn phải biết kết quả thanh toán trước khi xác nhận.

Nếu tách vội, một thao tác đặt hàng phải qua mạng nhiều lần. Payment chậm thì checkout chậm; Order và Payment có thể nhìn thấy dữ liệu khác thời điểm. Trong lúc đó, vấn đề thật — ranh giới trách nhiệm và rule nghiệp vụ — vẫn chưa được giải quyết.

## Hiểu đơn giản trước

Kiến trúc là cách đặt ranh giới để một thay đổi hoặc lỗi không làm lan rộng vô ích.

- **Module** là một khu vực mã có API nội bộ và rule riêng; module khác không sửa thẳng dữ liệu của nó.
- **Bounded context (phạm vi mà từ ngữ và rule có một nghĩa thống nhất)** giúp “Order” ở checkout không bị lẫn với “Order” ở kho.
- **Data ownership (quyền quyết định và ghi dữ liệu)** trả lời ai được đổi trạng thái cuối cùng.
- Microservice chỉ là cách triển khai ranh giới đó qua deploy độc lập. Nó không tự tạo ra ranh giới tốt.

## Từ cần biết

- [[Bounded context]] (phạm vi nghĩa thống nhất) — nơi đặt model và rule cùng nói về một việc.
- [[Data ownership]] (ai có quyền ghi quyết định cuối) — Order không nên sửa thẳng bảng Payment.
- **Modular monolith** (một app, nhiều module kín) — điểm bắt đầu tốt khi boundary còn đang học.
- **Invariant (quy tắc không được sai)** — ví dụ một order chỉ được xác nhận một lần.

## Cách quyết định, từng bước

1. **Vẽ luồng thay đổi thật.** Hỏi phần nào luôn sửa và deploy cùng nhau. Nếu luôn đi cùng nhau, tách lúc này chỉ thêm đường mạng.
2. **Chốt owner và invariant.** Payment sở hữu payment attempt; Order sở hữu trạng thái order. Rule cần đúng ngay nên ở gần owner, thường là transaction/constraint local.
3. **Làm ranh giới trong monolith trước.** Chỉ gọi qua interface/module API; cấm đọc hoặc ghi chéo bảng. Việc này kiểm tra boundary với chi phí thấp.
4. **Đo bằng chứng độc lập.** Một boundary đáng tách khi có owner vận hành riêng, tải riêng hoặc release riêng liên tục gây cản trở.
5. **Nếu tách, thiết kế failure trước.** Contract version, timeout, idempotency, trạng thái `Pending` và reconciliation phải có trước khi chuyển traffic.

## Chọn A hay B?

| Chọn | Phù hợp khi | Được gì | Đổi lại |
|---|---|---|---|
| Modular monolith | Domain còn đổi nhanh, team nhỏ, cần transaction chung | Debug, test và deploy đơn giản | Không scale/deploy riêng từng phần |
| Microservice | Owner, SLO hoặc tải độc lập đã rõ | Cách ly release và lỗi tốt hơn | Network failure, contract, tracing, on-call |
| Không tách | Lý do chỉ là “trông hiện đại hơn” | Tránh chi phí không cần thiết | Phải tiếp tục giữ module kín |

## Nếu có lỗi thì sao?

Khi Order gửi yêu cầu sang Payment, timeout không chứng minh Payment chưa charge. Order không được tự chuyển thành `Failed` hoặc gửi charge lại mù. Giữ order ở `Pending`, dùng một ID ổn định để Payment nhận ra lần gọi lặp, rồi hỏi/đối soát outcome từ Payment. Người sở hữu Payment chịu trách nhiệm trả outcome; Order chịu trách nhiệm hiển thị trạng thái cho khách.

::: production-trap
Một service đọc/ghi trực tiếp database của service khác trông nhanh lúc đầu, nhưng làm mọi migration và incident thành thay đổi liên service. Đó là distributed monolith, không phải microservices.
:::

## Chứng minh mình làm đúng

- Xem dependency deploy: module/service có thực sự phải release cùng nhau không?
- Theo dõi timeout, p99 call sync, backlog event và số mismatch cần đối soát.
- Có contract test cho boundary và dashboard theo owner/version.
- Định kỳ kiểm tra dữ liệu chéo để biết workflow có hội tụ hay không.

## Nói trong phỏng vấn

“Em không chọn microservice chỉ theo kích thước code. Em bắt đầu bằng bounded context và data ownership: phần nào sở hữu rule, phần nào thật sự cần deploy hoặc scale độc lập. Khi domain còn đổi nhanh, modular monolith giúp giữ transaction và debug đơn giản, miễn module không ghi chéo dữ liệu. Nếu tách Payment, em chấp nhận timeout và trạng thái pending; vì vậy contract, idempotency, trace và reconciliation phải đi cùng việc tách. Em đo dependency deploy và lỗi cross-boundary để kiểm tra quyết định đó còn đúng.”

## Interviewer thường hỏi tiếp

### Khi nào không chọn microservices?

Khi chưa chứng minh được owner, tải hoặc nhịp release độc lập; hoặc invariant cần transaction chung thường xuyên. Khi đó chi phí mạng và vận hành lớn hơn lợi ích.

### Boundary có bảo vệ invariant xuyên service không?

Nó bảo vệ ownership local. Invariant xuyên owner cần workflow có trạng thái trung gian, idempotency và reconciliation; không giả vờ có một transaction database toàn cục.

## Tự kiểm trước khi qua bài

- Với hệ thống của bạn, boundary nào có owner và SLO riêng thật sự?
- Nếu Payment timeout sau khi charge, màn hình Order nói gì?
- Bạn đo tín hiệu nào để biết tách service đang giúp hay đang làm phức tạp?

## Nhớ một phút

- Ranh giới trước, service sau.
- Owner rõ thì invariant local rõ.
- Tách service nghĩa là nhận thêm lỗi mạng và dữ liệu trễ.
- Quyết định đúng phải có bằng chứng deploy, tải hoặc vận hành độc lập.
