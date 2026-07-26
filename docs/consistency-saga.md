# Retry, Ordering, Saga & Consistency

## Quick Summary

> **Nói đơn giản:** saga dùng khi một quy trình qua nhiều hệ thống không thể rollback như một transaction database. Thay vì giả vờ mọi thứ xảy ra cùng lúc, nó ghi rõ từng trạng thái, retry có giới hạn và hành động bù trừ khi cần.

Saga phối hợp local transaction có state, timeout và recovery; nó không phải database rollback xuyên service. Retry cần scope, budget và idempotency boundary rõ để không nhân side effect.

## Terms to Know

- [[Saga]]: workflow nhiều local transaction.
- [[Retry budget]]: ranh giới retry tránh storm.
- [[Reconciliation]]: cơ chế tìm flow không hội tụ.
- [[Poison message]]: lỗi permanent cần quarantine/DLQ.

::: definition
Compensation là một business action mới. Nó có thể không đảo hoàn toàn effect mà người dùng hoặc external system đã thấy.
:::

## Tình huống phỏng vấn

"Payment đã authorize, reserve inventory thành công, nhưng tạo shipment lỗi. Nếu message bị gửi lại hoặc đến sai thứ tự thì em giữ trạng thái order đúng bằng cách nào?"

Đây không phải bài toán "retry cho đến khi hết lỗi". Hãy nói rõ state machine, invariant, phạm vi idempotency, ordering thực sự được broker bảo đảm, compensation và reconciliation khi thế giới thực không còn khớp với workflow.

## Mental model

Compensation (hành động bù trừ) không phải nút “undo” hoàn hảo. Ví dụ hoàn tiền có thể là một giao dịch mới, không xóa được việc đã charge. Vì vậy workflow cần trạng thái rõ, bằng chứng để reconcile và cách để operator can thiệp.

Trong distributed system, mỗi service chỉ commit transaction cục bộ của nó. Không có ACID xuyên service miễn phí. Một workflow phải chấp nhận trạng thái trung gian như `PendingPayment`, `Reserved`, `AwaitingShipment` và có người/tiến trình sở hữu việc đưa nó tới terminal state hoặc reconcile.

Consistency là lựa chọn theo invariant. "User thấy email chậm" và "không được capture tiền hai lần" có mức độ khác nhau; đừng dùng cùng một cơ chế cho cả hai.

## Retry đúng phạm vi

Retry chỉ dành cho lỗi transient đã được phân loại: timeout tạm thời, connection reset, throttling có `Retry-After`... Nó cần deadline/budget, backoff exponential có jitter, số lần tối đa và telemetry. Lỗi validation, schema không tương thích, quyền truy cập hoặc invariant bị vi phạm không được retry mù quáng; đưa vào DLQ/quarantine hoặc trả lỗi cho owner.

Trước retry, hỏi: operation có idempotent không? Có thể dùng idempotency key, unique effect, conditional update hoặc message dedup record không? Nếu một external provider đã nhận request nhưng response timeout, phải query/reconcile theo provider reference hoặc dùng provider key, không được giả định "chưa chạy".

## Ordering và stale message

Ordering thường có scope theo partition/key. Đặt mọi event của một `OrderId` cùng key chỉ có ý nghĩa nếu producer, broker và consumer-group giữ được contract đó; nó không tạo global order giữa Order, Payment và Inventory hay giữa hai topic.

Khi domain cần thứ tự, event nên mang aggregate version/sequence và consumer xử lý explicit:

- event có version đã xử lý: duplicate, bỏ qua an toàn;
- event nhảy version: tạm dừng/buffer trong giới hạn hoặc lấy state authoritative để reconcile;
- event cũ nhưng mang correction hợp lệ: áp dụng theo business rule/audit trail, không chỉ so số thứ tự.

Đừng retry vô hạn để chờ order tự đúng; backlog vô hạn là một incident.

## Saga: orchestration hay choreography

Saga là chuỗi local transaction có compensation, không phải transaction phân tán.

| Cách làm | Phù hợp khi | Rủi ro cần quản lý |
|---|---|---|
| Orchestration | workflow dài, nhiều nhánh, cần visibility/owner rõ | orchestrator thành boundary quan trọng, cần HA/state durable |
| Choreography | ít bước, event flow đơn giản, ownership tự nhiên | luồng khó nhìn, coupling ngầm khi consumer tăng |

Compensation là action nghiệp vụ mới: `ReleaseInventoryReservation`, `VoidAuthorization`; không phải rollback vật lý. Có action không đảo được hoàn toàn, ví dụ shipment đã giao hoặc tỷ giá đã chốt. Thiết kế state machine, timeout, semantic lock/pending state và escalation cho các case đó.

## Reconciliation là một phần của thiết kế

Retry không giải quyết mọi unknown outcome. Cần job/luồng reconciliation so sánh nguồn authoritative: payment provider, venue, warehouse, ledger hay database nội bộ. Nó tìm mismatch, tạo correction idempotent, giữ audit trail và đưa case không tự sửa được cho operator.

Ví dụ order thành công nội bộ nhưng payment callback mất: reconcile theo provider transaction reference, cập nhật state theo transition hợp lệ và publish fact/correction mới qua outbox. Không overwrite lịch sử để "cho đẹp dữ liệu".

## Bẫy production

- Bắt mọi exception và retry làm duplicate payment, che lỗi mapping và tăng load lúc dependency đang yếu.
- Xóa state saga khi "thất bại" làm mất khả năng audit/retry/reconcile. Terminal failure vẫn là state có giá trị.
- Assumption rằng broker ordering đủ thay cho version/invariant làm out-of-order event ghi đè state mới.
- Compensation gửi lại cũng có thể duplicate hoặc fail; nó cần idempotency và observability như forward action.

## Mẫu trả lời Senior

"Em model checkout như state machine với terminal state rõ, không coi nhiều service là một transaction. Mỗi command có idempotency key và mỗi consumer ghi dedup/effect cùng local transaction. Event mang `OrderId` và version; ordering chỉ được kỳ vọng trong scope partition, event gap sẽ trigger reconcile thay vì retry vô hạn. Nếu shipment không tạo được sau authorize/reserve, saga owner quyết định retry trong budget hoặc phát compensation idempotent để release reservation/void authorization. Một reconciliation job so khớp provider và state nội bộ, tạo correction có audit trail. Em đo age của pending saga, retry/DLQ, mismatch và compensation failure."

## Câu hỏi ôn phỏng vấn

### Khi nào retry trở thành nguy hiểm?

**Trả lời ngắn:** Khi outcome chưa biết nhưng action không idempotent, hoặc lỗi là permanent. Retry payment/email/command không có durable key có thể nhân side effect. Em chỉ retry error transient trong budget, với idempotency/reconciliation cho external boundary.

**Follow-up:** Timeout sau khi gọi provider thì kiểm tra gì trước retry? TTL của idempotency record dựa vào đâu?

**Red flags:** "Retry tất cả exception ba lần"; "timeout nghĩa là server chưa làm gì".

### Saga có rollback như database transaction không?

**Trả lời ngắn:** Không. Saga commit các bước cục bộ rồi dùng compensation theo nghiệp vụ khi cần. Compensation có thể không đảo tuyệt đối và cũng có thể fail/duplicate, nên state machine, audit, timeout và escalation là bắt buộc.

**Follow-up:** Khi nào chọn orchestration thay choreography? Làm sao reconcile event đến sai thứ tự?

**Red flags:** "Gọi compensation là dữ liệu chắc chắn quay về như cũ".

## Final recall

- Retry cần classification, budget và idempotent boundary.
- Ordering chỉ có scope; version và reconciliation bảo vệ domain.
- Saga là workflow local transaction + compensation, không phải distributed ACID.
- Unknown outcome cần audit và reconcile, không phải đoán.
