# Kafka và RabbitMQ: Delivery, Ordering và Replay

## Quick Summary

- Kafka và RabbitMQ là broker/transport; chúng không tự bảo đảm business side effect chỉ xảy ra một lần.
- Kafka phù hợp event stream giữ lại để nhiều consumer group đọc, replay và scale theo partition. Thứ tự chỉ có trong một partition.
- RabbitMQ phù hợp routed command/job: exchange route vào queue, consumer xử lý với manual ack và prefetch có giới hạn.
- Chọn theo delivery, ordering, replay và vận hành — không theo câu “Kafka enterprise hơn” hay “RabbitMQ đơn giản hơn”.

## Terms

- **partition**: shard có thứ tự của một Kafka topic.
- **consumer group**: một nhóm consumer Kafka cùng chia partition để xử lý; mỗi partition chỉ do một member trong group đọc tại một thời điểm.
- **offset**: vị trí record Kafka mà consumer đã xử lý/commit.
- **lag**: lượng record producer đã ghi nhưng consumer group chưa xử lý kịp.
- **exchange**: RabbitMQ component nhận message rồi route vào queue.
- **manual ack**: consumer báo broker sau khi xử lý thành công; crash trước ack có thể làm message được giao lại.
- **prefetch**: số message chưa ack tối đa broker đẩy tới consumer.

## Mental Model: cùng một flow, hai loại broker

```text
Order + Outbox commit
  → relay publish
    → Kafka topic: nhiều consumer group đọc/replay theo offset
    → RabbitMQ exchange: route vào queue để worker xử lý/ack
```

Outbox nằm trước broker vì source database và broker không có một transaction chung. Broker nằm sau Outbox vì event phải được giao/quan sát/retry. Consumer vẫn phải giữ dedupe marker hoặc business invariant cùng transaction với side effect.

## Chọn Kafka hay RabbitMQ

| Nhu cầu chính | Kafka thường hợp hơn | RabbitMQ thường hợp hơn |
|---|---|---|
| Nhiều service độc lập cùng đọc một lịch sử event | consumer group riêng, retention và replay | có thể fan-out nhưng không mạnh về log/replay dài hạn |
| Đúng thứ tự theo `OrderId` | key `OrderId` vào một partition, xử lý theo partition | queue tuần tự có thể phù hợp nhưng scale/routing khác |
| Work queue, routing command/job | làm được nhưng phải thiết kế consumer/group | exchange + queue + routing key là mental model trực tiếp |
| Bảo vệ worker chậm | pause/backpressure, lag monitoring | manual ack + prefetch giới hạn in-flight |

Đây không phải luật tuyệt đối. Team phải xét kỹ năng vận hành, retention, retry topology, throughput và contract. Không chọn hai broker chỉ vì “phòng khi cần”.

## Kafka: ordering, group và replay

`OrderId` là key nếu cần event của cùng một Order đi vào cùng partition. Kafka không giữ global ordering giữa các partition. Một consumer group có nhiều instance hơn số partition cũng không làm xử lý song song hơn số partition đó.

```text
OrderId=42 → partition 3 → consumer A trong group inventory
OrderId=42 → partition 3 → consumer A xử lý tuần tự
OrderId=99 → partition 7 → consumer B có thể xử lý song song
```

Khi consumer đã gửi email rồi crash trước offset commit, record có thể được đọc lại. Vì thế flow đúng là: persist dedupe/business result → gọi side effect với idempotency key khi cần → commit offset theo boundary đã chọn. Offset commit không thể rollback email đã gửi.

Lag là tín hiệu backlog, không tự nói nguyên nhân. Xem producer rate, partition skew/hot key, processing time, error/retry, downstream saturation và consumer rebalance trước khi chỉ tăng instance.

## RabbitMQ: route, ack và prefetch

```text
publisher → exchange → queue invoice-worker → consumer
                                      ↑              ↓
                                  DLQ/retry      manual ack
```

Publisher confirm và consumer ack là hai việc khác nhau: confirm nói broker đã nhận/route theo contract đã chọn; ack nói consumer xử lý delivery thành công. Với worker gọi email/PDF provider, ack chỉ sau khi trạng thái cần giữ đã persist và external side effect có idempotency/reconciliation policy.

Prefetch quá cao làm worker có nhiều message in-flight, memory tăng và priority/retry kém hiệu quả. Prefetch quá thấp có thể làm throughput chưa tận dụng capacity. Đặt theo thời gian xử lý, RAM, downstream limit và số consumer; đo rồi chỉnh.

## Failure Matrix

| Lỗi | Điều không được kết luận | Hành động |
|---|---|---|
| publish timeout | broker chắc chắn chưa nhận | relay retry có identity/confirm policy |
| consumer crash trước ack/offset | side effect chưa xảy ra | xử lý idempotent khi delivery quay lại |
| poison payload | retry thêm sẽ tự đúng | DLQ có owner, lý do và replay đã kiểm tra |
| Kafka key lệch | thêm consumer là hết lag | xem hot partition/partition key và downstream |
| Rabbit worker chậm | tăng prefetch là an toàn | giữ in-flight bounded, bảo vệ worker/downstream |

## Interview Answer

“Em không xem Kafka hay RabbitMQ là cách đạt exactly-once end-to-end. Nếu cần nhiều subscriber độc lập, retention và replay theo log, em nghiêng Kafka; em key theo aggregate cần ordering và theo dõi lag theo partition/group. Nếu cần route work vào worker, em nghiêng RabbitMQ với exchange, queue, manual ack và prefetch có giới hạn. Trong cả hai, consumer persist dedupe/business result trước rồi mới ack/commit offset; Outbox xử lý gap giữa database và broker, còn DLQ phải có owner và flow replay.”

## Follow-up

- Có 12 consumer Kafka nhưng topic 6 partition: throughput tăng thêm ở đâu?
- RabbitMQ publisher confirm có thay consumer ack không?
- Nếu cùng `OrderId` đi sang partition khác sau khi tăng partition thì lời hứa ordering của bạn là gì?

## Final Recall

- Kafka: partition + consumer group + offset + replay; ordering chỉ trong partition.
- RabbitMQ: exchange + queue + manual ack + prefetch.
- Broker không thay idempotency; ack/offset không rollback external side effect.
- Lag/DLQ là tín hiệu vận hành cần owner và reconciliation.
