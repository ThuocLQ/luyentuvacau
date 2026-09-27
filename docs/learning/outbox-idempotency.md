# Outbox & Idempotency

:::learning-goal
Sau bài này, bạn có thể lần theo một Order từ lúc ghi database đến khi thông báo service khác, chỉ ra crash window nào còn lại, và chọn evidence/recovery đúng thay vì hứa “exactly once”.
:::

## Prerequisites và phạm vi

Bạn cần biết một API có thể ghi dữ liệu vào database. **Transaction** là nhóm thay đổi database: khi `commit`, cả nhóm được ghi; khi rollback, cả nhóm không được ghi. Bài này sẽ tự giải thích broker, publish, retry, side effect, idempotency và reconciliation.

Bài không dạy cấu hình Kafka/RabbitMQ, distributed transaction/2PC hay exactly-once của một broker cụ thể. Mục tiêu là reasoning ở database/broker boundary.

## Câu hỏi đầu tiên: tạo Order rồi báo Inventory thế nào?

Một request tạo Order có hai việc cần làm:

1. lưu `Order = Created` vào database;
2. báo Inventory để bắt đầu giữ hàng.

Cách đơn giản là lưu Order trước, rồi gọi broker — nơi nhận message để chuyển cho service khác.

```text
save Order → commit ✓ → process chết ✗ → publish không chạy
```

Order đã tồn tại nhưng Inventory không biết. Nếu retry request một cách ngây thơ, ta còn có nguy cơ tạo Order thứ hai.

Đảo thứ tự cũng không giải quyết được:

```text
publish OrderCreated ✓ → database rollback ✗
```

Inventory có thể xử lý một Order mà database không hề lưu. Hai bên là hai hệ thống độc lập; transaction của database không tự bao trùm lần publish sang broker.

Điều ta cần không phải là “gọi publish nhanh hơn”, mà là: **khi Order được commit, ý định thông báo cũng phải còn lại để có thể làm tiếp sau restart.**

## Đặt tên cho cách giải: Transactional Outbox

`Transactional outbox` lưu một outbox record — dòng ghi “cần publish event này” — cùng business state trong **một local database transaction**. `Persist` ở đây chỉ là ghi vào storage bền, để process restart dữ liệu vẫn còn.

```text
Order API
  └─ local transaction
       ├─ Order #O42 = Created
       └─ Outbox #E17 = OrderCreated / Pending
  └─ commit cả hai, hoặc rollback cả hai
```

Chỉ sau commit, một **relay** (worker đọc outbox rồi publish) mới gửi `#E17` tới broker. Đây không phải “Index của event”, cũng không biến DB + broker thành một transaction chung. Nó bảo đảm cặp `Order + intent to publish` cùng tồn tại hoặc cùng không tồn tại.

```csharp
await using var tx = await db.Database.BeginTransactionAsync(ct);

var order = Order.Create(command.CustomerId);
db.Orders.Add(order);
db.OutboxMessages.Add(OutboxMessage.For("OrderCreated", order.Id));

await db.SaveChangesAsync(ct);
await tx.CommitAsync(ct);
```

Theo EF Core, nhiều thay đổi trong một `SaveChanges` được bọc transaction nếu provider hỗ trợ; sample mở transaction rõ ràng để nhấn boundary. Trong production, còn phải chọn schema, isolation và retry strategy theo provider/workload.

## Crash không biến mất; nó chuyển thành duplicate có kiểm soát

Relay phải làm hai việc độc lập: publish `#E17`, rồi persist mốc đã xử lý của relay. Nếu process chết sau publish nhưng trước mốc đó, restart không thể biết broker đã nhận hay chưa. Cách an toàn là publish lại. Vì vậy **duplicate delivery** là một khả năng cần thiết kế, không phải lỗi relay luôn có thể tránh.

{{OUTBOX_VISUAL:crash}}

Visual là **local simulation** của durable state, không phải Kafka/RabbitMQ thật. Chọn crash point, dự đoán state còn lại, rồi reveal restart behavior. Nó trả lời một câu: *tại thời điểm crash này, dữ liệu durable nào còn tồn tại?*

## Consumer phải chịu được message đến lại

Inventory có thể nhận `#E17` nhiều lần. `Idempotent processing` nghĩa là xử lý lại cùng event không tạo thêm business side effect. Ở đây, side effect local là tạo Reservation.

Cách đáng tin hơn `AnyAsync` rồi insert là để database enforce unique `EventId`, đồng thời ghi `ProcessedEvent` và Reservation trong cùng transaction. Hai consumer có thể cùng thấy “chưa xử lý”; unique constraint mới là mốc cuối cùng chặn cả hai commit.

```csharp
await using var tx = await db.Database.BeginTransactionAsync(ct);
try
{
    db.Reservations.Add(Reservation.For(message.OrderId));
    db.ProcessedEvents.Add(new ProcessedEvent(message.EventId));
    await db.SaveChangesAsync(ct); // unique EventId is enforced by the database
    await tx.CommitAsync(ct);
}
catch (DbUpdateException ex) when (IsUniqueViolation(ex))
{
    await tx.RollbackAsync(ct); // another consumer already committed this event
}
```

`IsUniqueViolation` phụ thuộc database provider. Điều cần giữ trong mọi implementation là: unique rule nằm ở database, và duplicate path không tạo Reservation thứ hai. Nếu business side effect xảy ra **ngoài** transaction này, chỉ dedupe local là chưa đủ.

## Lab: nhìn state trước rồi kết luận

:::hands-on
Đây là **local simulation** chạy ngay trong trang học; không có broker hay database production. Mục tiêu là quan sát crash window, không benchmark hay verify broker semantics.
:::

### Experiment 1 — commit trước publish

**Question:** process chết ngay sau khi `Order + Outbox` commit thì restart còn làm được gì?

**Predict:** Order và Outbox `Pending` còn; broker chưa có message.

**Run:** trong visual, chọn `Sau DB commit`, bật reveal.

**Inspect:** `Order`, `Outbox`, `Broker deliveries`, `ProcessedEvent`, `Reservation count`.

**Observation:** chỉ Order và Outbox còn. Relay có thể đọc `Pending` và publish sau restart.

**Interpret / Why:** intent to publish nằm trong cùng transaction với Order, nên không bị mất ở khoảng trống sau commit.

**Learn:** Outbox bảo vệ dual write ở database boundary; nó không publish đồng bộ trong request.

### Experiment 2 — publish rồi chết

**Question:** relay publish xong rồi chết trước khi persist mốc `Sent`; restart có được phép thử publish lại không, và local Reservation có bị nhân đôi không?

**Predict:** chọn `Sau publish`, rồi chọn dự đoán `1 lần` hoặc `2 lần` trước reveal.

**Run:** bấm `Reveal state`. Visual cho `Broker deliveries = 1`, `Outbox = #E17 Pending`, `ProcessedEvent = Không có`, `Reservation count = 0`. Bấm `Restart relay`, sau đó bấm `Deliver duplicate to consumer`; cuối cùng bấm `Deliver same event again`.

**Inspect:** sau restart, `Broker deliveries = 2`; sau lần consume đầu, `ProcessedEvent = #E17` và `Reservation count = 1`; sau lần duplicate tiếp theo, hai state local này vẫn không đổi.

**Observation:** publish/delivery có thể lặp, nhưng local business effect trong simulation chỉ xảy ra một lần.

**Interpret / Why:** relay không có bằng chứng durable cho publish trước crash nên retry publish là một lựa chọn an toàn để tránh bỏ mất intent. Consumer đặt event identity cùng business change trong local transaction, nên cùng event không nhân Reservation.

**Learn:** thiết kế này chấp nhận publish/delivery có thể lặp khi retry. Consumer dùng event identity để cùng event không nhân business effect local. Delivery guarantee cụ thể vẫn phụ thuộc broker/client confirm/ack contract; Outbox không tự tạo exactly-once end-to-end.

### Experiment 3 — external provider timeout

**Question:** consumer gọi payment provider, provider có thể đã charge nhưng HTTP timeout. Có retry ngay được không?

**Predict:** không biết; timeout chỉ nói client chưa nhận response.

**Run:** đọc trace bên dưới và giả lập response bị mất sau provider xử lý.

```text
Payment consumer → provider charge(operationId=P91) ✓
provider response → timeout ở client ✗
```

**Inspect:** `operation ID`, provider status query/callback, local `Pending` state, số lần provider thấy cùng idempotency key.

**Observation:** có một **unknown outcome**: external side effect có thể đã xảy ra, nhưng app chưa thể kết luận.

**Interpret / Why:** retry mù có thể charge hai lần. Khi provider có status query, callback hoặc idempotency contract, persist `Pending` rồi query bằng `operation ID` trước khi quyết định retry. Khi có hai nguồn state để đối chiếu, reconciliation là job so sánh state của mình với nguồn bên ngoài có thẩm quyền. Nếu provider không có status/query/callback/evidence, outcome có thể vẫn không kết luận được.

**Learn:** timeout không đồng nghĩa thất bại. Idempotency boundary phải nằm ở nơi thực sự tạo side effect; không có external evidence thì không thể hứa retry an toàn.

## Debug và production reasoning

**Symptom:** Inventory có duplicate log hoặc Order ở `Created` quá lâu.

**Known facts:** Order row đã commit; Outbox `#E17` còn `Pending`; broker log có thể có một hoặc nhiều publish; Inventory có thể đã có `ProcessedEvent`.

**Unknowns:** relay đã crash trước hay sau publish; broker/client delivery contract có publisher confirm/acknowledgement phù hợp không; consumer state và Reservation có cùng transaction không; external provider đã xử lý operation chưa.

**Candidate hypotheses:** relay chưa publish; relay publish rồi crash; consumer retry do ack muộn; unique rule thiếu hoặc transaction split; provider response bị mất.

**Evidence:** outbox `CreatedAt/UpdatedAt/AttemptCount/LastError`, event ID, broker delivery metadata, `ProcessedEvent`, Reservation, provider `operation ID`, reconciliation report. Nếu client/broker hỗ trợ publisher confirm hoặc acknowledgement phù hợp, chỉ đánh dấu delivery theo mốc confirm đã chọn trong delivery contract — không coi mọi broker có cùng semantics.

**Decision boundary:** retry relay theo retry policy có giới hạn; consumer phải duplicate-safe; external side effect chỉ có status/recovery policy đáng tin khi provider contract cho evidence. Đo tuổi outbox `Pending`, publish failures và — khi có nguồn ngoài để đối chiếu — reconciliation mismatch để biết thiết kế có đang hoạt động.

**Trade-off:** outbox thêm table, relay latency và vận hành retry/cleanup. Đổi lại, Order không bị mất intent to notify giữa database commit và process crash. Ordering cũng phải được định nghĩa theo scope cần thiết (ví dụ per Order), không suy ra global order chỉ từ việc có Outbox.

## Transfer challenge

Email provider không có idempotency key và không cho query status. Timeout có thể đến sau khi email đã gửi.

Trước khi xem hướng trả lời, nêu rõ:

- local database có thể guarantee điều gì;
- điều gì về email **không** thể guarantee;
- support cần xem evidence nào;
- recovery policy nào trung thực với user.

Model direction: local state vẫn có thể giữ event identity, attempt history, `Pending`/`Uncertain`, retry budget, timestamp/error và evidence cho operator. Nhưng nó không chứng minh email đã được provider gửi.

- Mark `Processed` rồi crash trước khi gửi email: email có thể bị mất.
- Gửi email rồi crash trước khi mark `Processed`: retry có thể gửi trùng.

Không có provider idempotency key, status query, callback hay nguồn ngoài có thẩm quyền thì không thể đồng thời guarantee **không mất** và **không trùng** email. Chọn policy theo business cost: retry thì chấp nhận rủi ro trùng; không retry thì chấp nhận rủi ro mất; manual handling chỉ hữu ích khi còn evidence để người vận hành kiểm. Không gọi đó là reconciliation nếu không có nguồn ngoài để đối chiếu, và không gọi đó là exactly-once.

## Explain it back

Trong 60–120 giây, nói theo chuỗi: hai writes độc lập → cả hai thứ tự naive đều có crash window → commit Order + outbox record cùng local transaction → relay publish → crash sau publish tạo duplicate → consumer persist dedupe state + business change cùng transaction → external provider timeout tạo unknown outcome → query/reconciliation trước retry.

:::interview-answer
“Em dùng Transactional Outbox khi một thay đổi database cần phát event cho service khác. Trong local transaction, em ghi business state và outbox record; relay đọc record rồi publish. Relay có thể chết sau publish trước khi lưu progress nên delivery có thể lặp. Vì vậy consumer dùng event ID/unique constraint và persist processed-event state cùng business side effect local. Với payment hay provider bên ngoài, timeout là unknown outcome; em không retry mù mà query theo operation ID hoặc reconciliation theo contract.”
:::

## Final recall

1. Hai thứ tự `save → publish` và `publish → save` lần lượt hỏng ở crash window nào?
2. Outbox record phải commit cùng state nào, trong boundary nào?
3. Vì sao crash sau publish dẫn tới duplicate delivery hợp lý?
4. Unique constraint sửa race nào mà `AnyAsync` một mình không sửa được?
5. Khi nào dedupe local vẫn chưa đủ?
6. Evidence nào giúp phân biệt timeout với external side effect chưa xảy ra?

:::final-recall
Outbox không làm hai hệ thống thành một transaction. Nó giữ `business state + intent to publish` cùng local transaction. Publish/delivery có thể lặp tùy broker/client contract, nên consumer phải idempotent tại boundary tạo side effect local. Với external provider, chỉ query/reconcile trước retry khi có operation identity và nguồn evidence; nếu không, design phải nói rõ rủi ro mất hoặc trùng.
:::

## Further learning

- [EF Core transactions](https://learn.microsoft.com/en-us/ef/core/saving/transactions) — semantics transaction của EF Core.
- [AWS Transactional Outbox pattern](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/transactional-outbox.html) — dual write, duplicate message và ordering considerations.
- [PostgreSQL unique constraints](https://www.postgresql.org/docs/current/ddl-constraints.html) — database-enforced uniqueness.

## Continue

- Reference: [Messaging, idempotency và Outbox](/docs/distributed-systems)
- Quiz: [Outbox crash after publish](/quiz/play?question=outbox-crash-after-publish)
- Interview: [Pending idempotency record](/interview?question=api-idempotency-pending)