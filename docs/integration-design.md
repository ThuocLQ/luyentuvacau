# Chọn REST, gRPC hay event theo việc người dùng cần biết

## Trong 30 giây

- Chọn cách giao tiếp từ câu hỏi: ai chờ kết quả, dữ liệu thuộc ai và lỗi nào chấp nhận được.
- REST phù hợp public/client API; gRPC có thể phù hợp call nội bộ khi lợi ích contract sinh code hoặc streaming rõ; event hợp việc có thể hoàn thành sau.
- Event không làm hệ thống “tự decouple”: consumer vẫn nhận trùng, nhận muộn và phải tự vận hành.
- CQRS chỉ tách khi cách đọc thật sự khác cách ghi.
- Mỗi đường giao tiếp phải có deadline hoặc trạng thái chờ, owner và cách biết nó hỏng.

## Gặp ở đâu ngoài đời?

Checkout cần báo ngay order đã được nhận. Gửi email xác nhận có thể xong sau. Nếu API chờ Email Service trả lời, sự cố email sẽ làm khách không đặt hàng được. Nhưng nếu Payment cũng chỉ nhận event, UI không biết khách đã bị charge hay chưa.

Vậy Order nhận command đồng bộ để tạo order `Pending`; Payment có một boundary rõ để trả outcome; email nhận event sau khi order được tạo. Cùng một luồng có thể dùng nhiều kiểu giao tiếp, vì nhu cầu mỗi bước khác nhau.

## Hiểu đơn giản trước

- Call **đồng bộ** nghĩa là người gọi chờ: nó phụ thuộc cả độ trễ lẫn khả năng sẵn sàng của bên nhận.
- **Event** là thông báo “một fact đã xảy ra”; bên nhận xử lý lúc phù hợp, đổi lại dữ liệu có thể trễ.
- **CQRS (tách đường ghi khỏi đường đọc)** chỉ cần khi dashboard/search cần dạng dữ liệu khác source để ra quyết định.
- Không kiểu nào loại bỏ lỗi; nó chỉ dời lỗi sang chỗ khác.

## Từ cần biết

- **REST** (HTTP resource dễ debug) — thường cho browser/public client.
- **gRPC** (RPC có contract kiểu rõ) — hay dùng nội bộ khi streaming/overhead quan trọng.
- [[Idempotency]] (gọi lại không tạo effect mới) — cần ở command/event boundary.
- **CQRS** (ghi và đọc tối ưu theo mục đích khác nhau) — không phải mặc định cho CRUD.

## Cách quyết định, từng bước

1. **Xác định điểm trả lời cho người dùng.** Nếu cần outcome ngay, dùng REST/gRPC với deadline rõ; nếu chỉ nhận yêu cầu, trả trạng thái `Pending` thật.
2. **Xác định owner.** API không được biến thành đường tắt để service khác ghi dữ liệu không thuộc mình.
3. **Chọn baseline đơn giản.** REST trước cho public API; chỉ chọn gRPC khi contract nội bộ/streaming chứng minh lợi ích.
4. **Chỉ đưa event cho side effect có thể trễ.** Ghi event qua outbox, đặt event ID/version, consumer idempotent và có DLQ.
5. **Nói rõ freshness.** Read model CQRS phải cho biết dữ liệu có thể trễ bao lâu và người dùng làm gì lúc chưa cập nhật.

## Chọn A hay B?

| Chọn | Khi dùng | Được gì | Không dùng khi |
|---|---|---|---|
| REST | Browser/public API, cần debug/cache đơn giản | Contract dễ tiếp cận | Call nội bộ dày, streaming hoặc typed contract là nút thắt |
| gRPC | Service nội bộ được kiểm soát, cần contract sinh code/streaming hoặc overhead đã đo là nút thắt | Contract chặt, payload gọn | Consumer là browser/public gateway chưa hỗ trợ tốt; deadline vẫn đặt theo SLO/dependency như REST |
| Event | Nhiều phản ứng độc lập, không nằm critical path | Tách thời gian, hấp thụ burst | UI cần kết quả chắc ngay |
| CQRS | Mẫu đọc khác hẳn mẫu ghi | Read model nhanh, rõ | CRUD đơn giản không có read pressure |

## Nếu có lỗi thì sao?

Event `OrderCreated` có thể bị phát hai lần hoặc Email consumer chết giữa chừng. Email handler cần delivery ID/idempotency key; ack chỉ sau khi ghi outcome bền. Nếu payload sai vĩnh viễn, đưa DLQ kèm correlation ID và owner để sửa/replay. Không retry vô hạn rồi làm backlog che mất lỗi.

::: production-trap
Trả `200 OK` sau khi chỉ đẩy command vào queue mà không nói rõ “đã nhận” hay “đã hoàn tất” làm client hiểu sai và retry sai.
:::

## Chứng minh mình làm đúng

- Có deadline, timeout/error budget cho call đồng bộ.
- Có publish lag, consumer lag, duplicate và DLQ dashboard cho event.
- Contract test theo version trước khi release producer/consumer.
- Đo thời gian read model hội tụ và số lần UI thấy `Pending`.

## Nói trong phỏng vấn

“Em chọn giao tiếp theo critical path. Order cần phản hồi ngay nên API trả kết quả hoặc trạng thái pending rõ ràng với deadline; email là side effect nên nhận event qua outbox. Với event, em mặc định delivery có thể trùng và trễ, nên consumer có ID ổn định, retry có giới hạn và DLQ có owner. REST là baseline cho client; gRPC chỉ khi nội bộ có lợi ích contract hoặc streaming rõ. CQRS chỉ tách nếu dashboard cần model đọc khác source of truth.”

## Interviewer thường hỏi tiếp

### Khi nào event không phù hợp?

Khi caller cần quyết định outcome ngay, hoặc chưa có owner cho retry, dedup, DLQ và trạng thái trễ. Event không thay thế contract nghiệp vụ.

### CQRS có bắt buộc event sourcing không?

Không. CQRS chỉ tách read/write. Event sourcing dùng event làm lịch sử chính và có chi phí model/replay riêng.

## Tự kiểm trước khi qua bài

- Bước nào trong checkout cần kết quả trước khi trả UI?
- Nếu một event tới hai lần, effect nào bị nhân đôi nếu không có guard?
- Read model của bạn trễ được bao lâu và UI nói gì trong lúc đó?

## Nhớ một phút

- Sync để quyết định ngay; event cho việc có thể trễ.
- Event cần ID, version, dedup và visibility.
- CQRS là tối ưu có điều kiện, không phải nghi thức kiến trúc.
