# Learning Lab: Outbox & Idempotency

## Engineering Problem

Order API phải lưu Order và báo Inventory giữ hàng. Nếu commit Order xong process chết trước khi publish event, Inventory không biết. Nếu publish trước rồi database rollback, Inventory lại giữ hàng cho Order không tồn tại. Đây là DB/broker boundary: hai bên không tự trở thành một transaction chung.

## Learning Goal

Bạn có thể mô tả Outbox bảo vệ điều gì, nhìn crash point để hiểu duplicate delivery, thiết kế consumer idempotent, và xử lý external side effect/unknown outcome bằng evidence và reconciliation.

## Mental Model: lưu ý định cùng business state

```text
Order API
  └─ local DB transaction
       ├─ Order = Created
       └─ Outbox(eventId, OrderCreated, Pending)

Relay → broker → Inventory consumer
                    └─ local transaction: Processed(eventId) + Reservation
```

Outbox chỉ bảo đảm sau khi Order commit thì ý định publish cũng đã được persist trong **cùng database**. Nó không bảo đảm broker nhận đúng một lần, consumer chạy đúng một lần, hay payment provider không bị gọi trùng.

## Worked Example: publish rồi crash

```text
1. Relay đọc Outbox #E17 (Pending)
2. publish OrderCreated #E17 ✓
3. process crash
4. mark sent ✗

restart
→ Relay publish #E17 lại
→ consumer nhận duplicate
```

Consumer cần persist `eventId` đã xử lý cùng transaction với Reservation. Khi #E17 đến lại, consumer thấy `Processed(eventId)` đã tồn tại và không tạo thêm Reservation. Đây là idempotent processing ở boundary tạo side effect.

```csharp
await using var tx = await db.Database.BeginTransactionAsync(ct);
if (await db.ProcessedEvents.AnyAsync(x => x.EventId == message.EventId, ct)) return;

db.Reservations.Add(Reservation.For(message.OrderId));
db.ProcessedEvents.Add(new ProcessedEvent(message.EventId));
await db.SaveChangesAsync(ct);
await tx.CommitAsync(ct);
```

Trong production, unique constraint trên `ProcessedEvents.EventId` và xử lý race/unique violation vẫn cần thiết; `AnyAsync` một mình không chặn hai consumer cùng thấy “chưa có”.

## Guided Practice

1. Đánh dấu fail ở ba điểm: trước DB commit, sau commit trước publish, sau publish trước mark sent.
2. Với mỗi điểm, viết: dữ liệu còn ở đâu, event có thể được publish chưa, và recovery nào an toàn.
3. Gửi cùng `eventId` hai lần vào consumer. Trước khi xem code, dự đoán database state cuối cùng.

## Hands-on Lab

Trong mini reproduction hoặc MicroShop, tạo `OutboxMessages` và `ProcessedEvents` có unique key. Chạy relay, dừng process sau publish trước khi mark sent, rồi chạy lại.

**Evidence cần thu:** broker/log có #E17 bao nhiêu lần; `Reservation` có bao nhiêu row; `ProcessedEvents` có row #E17 không; tuổi outbox row cũ nhất. Lab đạt khi bạn quan sát duplicate delivery nhưng side effect local chỉ xảy ra một lần.

## Break It: external side effect và unknown outcome

```text
Consumer → payment provider
provider may charge ✓
HTTP response lost / timeout ✗

App không biết charge đã xảy ra chưa
→ unknown outcome, không retry mù
```

**Observation:** timeout không nói provider chưa xử lý.  
**Hypothesis:** payment có thể đã thành công nhưng response bị mất.  
**Evidence:** operation ID, provider query/status callback, provider idempotency key, reconciliation report.  
**Experiment:** inject timeout sau provider xử lý; query trước retry.  
**Conclusion:** persist `Pending`, query/reconcile theo contract; nếu provider không hỗ trợ tra cứu, cần recovery/manual path thay vì hứa retry an toàn.

## Explain It

**Tiếng Việt, 60–120 giây:** Phân biệt “Outbox giữ ý định publish” với “consumer không tạo side effect hai lần”. Dùng crash trace để nói vì sao duplicate delivery là expected failure mode.

**English vocabulary:** `transaction boundary`, `outbox record`, `relay`, `duplicate delivery`, `idempotent consumer`, `external side effect`, `unknown outcome`, `reconciliation`, `operation ID`, `publisher confirm`.

**Sentence patterns:**

- The transaction boundary ends at the local database.
- The relay can publish again after a crash, so the consumer must be idempotent.
- The problem happens when the external provider may have completed the side effect but the response is unknown.
- One way to verify this is to reconcile by operation ID before retrying.

**Speaking challenge (English, 90 seconds):** Explain the crash after publish and why Outbox is not end-to-end exactly-once delivery.

## Transfer Challenge

Email provider accepts no idempotency key, has no status query, and a timeout can happen after it sends the email. What can your consumer guarantee locally? What cannot it honestly guarantee? Propose evidence, customer/support experience and a reconciliation/manual policy instead of inventing an automatic retry rule.

## Recall Questions

1. Outbox record phải commit cùng dữ liệu nào, và trong boundary nào?
2. Tại sao publish rồi crash trước mark sent tạo duplicate?
3. Consumer cần persist gì cùng side effect local?
4. Vì sao unique constraint vẫn quan trọng khi code đã check `AnyAsync`?
5. Unknown outcome của payment được verify thế nào trước retry?

## Continue

- Reference: [Messaging, idempotency và Outbox](/docs/distributed-systems)
- Quiz: [Outbox crash after publish](/quiz/play?question=outbox-crash-after-publish)
- Interview: [Pending idempotency record](/interview?question=api-idempotency-pending)
