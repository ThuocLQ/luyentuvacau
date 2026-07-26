# Backend Finance & Securities Interview Handbook V2
## Bản học trọng tâm cho Backend .NET trong domain tài chính – chứng khoán

> **Mục tiêu:** giúp học theo một hệ thống xuyên suốt, không học keyword rời rạc.  
> **Xương sống:** Đặt lệnh → Risk → Exchange → Execution → Ledger → Settlement → EOD → Reconciliation.

---

# 0. Cách học tài liệu này

## 0.1 Ba tầng kiến thức

Mỗi chủ đề được chia thành:

- **MUST KNOW** — bắt buộc trả lời được khi phỏng vấn.
- **SENIOR DEPTH** — dùng để xử lý câu hỏi đào sâu và system design.
- **REFERENCE** — biết để tra cứu, không cần học thuộc ngay.

## 0.2 Công thức trả lời interview

```text
Bài toán nghiệp vụ
→ Invariant / Source of truth
→ Transaction boundary
→ Failure scenarios
→ Cơ chế bảo vệ
→ Trade-off
→ Monitoring / Testing
```

## 0.3 Flow xuyên suốt

```text
1. Client gửi lệnh
2. API xác thực và kiểm tra idempotency
3. Order Service validate lệnh
4. Risk Service tính buying power
5. Hệ thống phong tỏa tiền/hạn mức
6. Order được lưu và gửi Exchange
7. Exchange trả ACK / Reject
8. Exchange gửi partial fill / full fill
9. Execution được dedup và ghi nhận
10. Cash/Position ledger được cập nhật
11. Portfolio read model được projection
12. Settlement và EOD hoàn tất
13. Reconciliation phát hiện sai lệch
```

---

# PHẦN I — DOMAIN FLOW CỐT LÕI

# 1. Order Lifecycle

## MUST KNOW

Order không chỉ là một row có field `Status`.

Một Order đúng nghĩa cần:

```text
Identity
Current State
Quantity
Filled Quantity
Remaining Quantity
Price
Side
Instrument
Account
Version
Audit Trail
```

State machine điển hình:

```text
New
→ Validating
→ Accepted
→ SentToExchange
→ PartiallyFilled
→ Filled
```

Nhánh lỗi:

```text
Rejected
CancelPending
Cancelled
ReplacePending
Expired
```

Invariant:

```text
FilledQuantity <= OrderQuantity
RemainingQuantity >= 0
Không cancel phần đã khớp
Không replace order đã kết thúc
Một execution chỉ được ghi nhận một lần
```

## Ví dụ xuyên suốt

```text
Order mua 1,000 cổ phiếu
Fill 1: 300
Fill 2: 200
Remaining: 500
```

Hệ thống phải cập nhật:

```text
Order.FilledQuantity
Order.RemainingQuantity
Cash blocked/used
Position pending receive
Fee/tax
Portfolio read model
```

## SENIOR DEPTH

Không để transition rải trong controller:

```text
Current State + Event + Guard
→ New State + Side Effect
```

Ví dụ:

```text
SentToExchange + ExchangeAccepted
→ Accepted

Accepted + ExecutionReceived
→ PartiallyFilled hoặc Filled

Accepted + CancelAccepted
→ Cancelled
```

Late event:

```text
Order đã Cancelled
Execution đến muộn
```

Không được tự động bỏ hoặc apply bừa; cần policy rõ.

## Câu trả lời 30 giây

> Tôi xem Order là aggregate có state machine và invariant rõ. Place, cancel, replace, ACK, reject và execution đều đi qua transition hợp lệ. Execution được dedup bằng external execution id. State quan trọng được lưu ở source of truth; portfolio chỉ là read model.

## Sai lầm hay gặp

- Dùng enum status nhưng không kiểm soát transition.
- Cho controller update status trực tiếp.
- Tính `RemainingQuantity` ở nhiều nơi.
- Không có version hoặc optimistic concurrency.
- Tin rằng exchange không gửi duplicate.

---

# 2. Risk, Buying Power và Reservation

## MUST KNOW

Buying power không đồng nghĩa với cash balance.

Mô hình:

```text
Buying Power
= Available Cash
+ Eligible Credit
+ Eligible Receivable
- Reserved Amount
- Risk Buffer
```

Flow chuẩn:

```text
Validate order
→ Calculate required amount
→ Reserve cash/limit
→ Persist order
→ Send Exchange
```

Nếu reject:

```text
Release reservation
```

Nếu partial fill:

```text
Consume phần reservation đã dùng
Giữ phần còn lại cho remaining quantity
```

## Invariant

```text
Available Cash không âm ngoài policy cho phép
Reserved Amount không vượt limit
Một order không reserve hai lần
Release không vượt số đã reserve
```

## SENIOR DEPTH

Risk rule cần:

```text
Rule Version
Effective Date
Customer Tier
Instrument Group
Haircut
Concentration Limit
Reason Code
Calculation Inputs
```

Không chỉ trả:

```text
Order rejected
```

Mà nên có:

```text
INSUFFICIENT_BUYING_POWER
ACCOUNT_SUSPENDED
PRICE_OUT_OF_RANGE
MARGIN_LIMIT_EXCEEDED
INSTRUMENT_NOT_TRADABLE
```

## Câu trả lời 30 giây

> Tôi reserve buying power trước khi gửi lệnh ra ngoài. Order, reservation và Outbox nên commit trong cùng local transaction. Khi reject hoặc cancel, reservation được release idempotently. Risk rule cần version và reason code để audit.

---

# 3. Exchange ACK, Reject và Execution

## MUST KNOW

Ba nhóm message khác nhau:

```text
ACK
→ Exchange chấp nhận lệnh

Reject
→ Exchange từ chối

Execution
→ Lệnh đã khớp một phần hoặc toàn bộ
```

ACK không có nghĩa là đã khớp.

Execution cần:

```text
ExternalExecutionId
ExchangeOrderId
OrderId
Quantity
Price
TradeDate
BusinessDate
Sequence
ReceivedAt
```

Unique constraint:

```sql
UNIQUE(exchange, external_execution_id)
```

## Partial fill

```text
Order Quantity: 1,000
Execution A: 300
Execution B: 200
Filled: 500
Remaining: 500
```

Update cần transaction:

```text
Insert Execution
+ Update Order FilledQuantity
+ Insert Ledger/Outbox records
→ Commit
```

## SENIOR DEPTH

Phải nghĩ tới:

- Duplicate execution.
- Out-of-order execution.
- Trade bust/correction.
- Late execution.
- Exchange reconnect.
- Sequence gap.
- Idempotent replay.

## Câu trả lời 30 giây

> Execution là business fact quan trọng và phải immutable hoặc correction bằng record mới. Tôi dedup bằng external execution id, update Order bằng optimistic concurrency và phát event qua Outbox.

---

# 4. Cash và Securities Ledger

## MUST KNOW

Balance là kết quả hiện tại. Ledger là lịch sử biến động.

Không chỉ lưu:

```text
CashBalance = 100,000
```

Mà cần record:

```text
Deposit
Reserve
Release
Execution Debit
Fee
Tax
Settlement
Correction
```

Các dimension tiền:

```text
Available
Blocked
Pending Receive
Pending Pay
Loan
Fee
Tax
```

Các dimension chứng khoán:

```text
Available
Blocked
Pending Receive
Pending Deliver
Pledged
Borrowed
Lent
```

## Nguyên tắc ledger

- Không update record cũ tùy tiện.
- Correction bằng compensating entry.
- Có reference về business event.
- Có business date và created time.
- Có sequence/version.
- Có actor/source.

## SENIOR DEPTH

Tư duy double-entry:

```text
Reserve cash
Debit Available
Credit Blocked
```

Khi khớp:

```text
Debit Blocked
Credit Settlement Payable
```

Không phải hệ nào cũng triển khai accounting đầy đủ, nhưng tư duy “nguồn và đích” giúp tránh tạo/mất tiền vô lý.

## Câu trả lời 30 giây

> Ledger là source of audit; balance là projection để đọc nhanh. Tôi không sửa ledger entry đã ghi mà tạo compensating entry. Balance có thể rebuild từ ledger hoặc ít nhất phải reconciliation với ledger.

---

# 5. Settlement, EOD và Reconciliation

## MUST KNOW

Settlement là hoàn tất nghĩa vụ tiền và chứng khoán.

Các ngày cần tách rõ:

```text
CreatedAt
BusinessDate
TradeDate
SettlementDate
```

EOD flow:

```text
Freeze input
→ Complete pending processing
→ Calculate balances/positions
→ Fee/tax
→ Settlement obligations
→ Reconciliation
→ Snapshot/report
→ Roll business date
```

## Restartable EOD

Không viết một procedure lớn chạy 3 giờ rồi fail ở phút 170.

Chia step:

```text
Prepare
Aggregate
Apply
Reconcile
Publish
Close Day
```

Mỗi step có:

```text
BusinessDate
RunId
Status
StartedAt
CompletedAt
Attempt
Checksum
```

## Reconciliation

Đối chiếu:

```text
Internal Order ↔ Exchange Order
Internal Execution ↔ Exchange Execution
Cash Ledger ↔ Bank/Custodian
Position ↔ Depository
Ledger ↔ Balance
Source of Truth ↔ Read Model
```

## SENIOR DEPTH

Không auto-fix mọi mismatch.

Phân loại:

```text
Safe Auto Repair
Manual Review
Critical Incident
```

## Câu trả lời 30 giây

> Trong tài chính, realtime flow không đủ. EOD phải restartable và idempotent. Reconciliation là safety net độc lập để phát hiện silent mismatch giữa hệ thống nội bộ và exchange, bank hoặc custodian.

---

# PHẦN II — DATA CORRECTNESS

# 6. Idempotency

## MUST KNOW

Idempotency bắt buộc vì:

- Timeout.
- Retry.
- Client bấm lại.
- Message redelivery.
- Exchange callback duplicate.
- Job chạy lại.

API đặt lệnh:

```http
POST /orders
Idempotency-Key: abc-123
```

Lưu:

```text
Key
CustomerId
RequestHash
Response
Status
ExpiresAt
```

Quy tắc:

```text
Cùng key + cùng request
→ trả kết quả cũ

Cùng key + request khác
→ reject conflict
```

## Database guard

```sql
UNIQUE(customer_id, client_order_id)
```

## Consumer guard

```text
Insert ProcessedEventId
+ Apply business update
→ cùng transaction
```

## Câu trả lời 30 giây

> Idempotency bảo vệ business intent khỏi retry và duplicate. Tôi kết hợp idempotency key ở API, unique constraint ở DB và dedup ở consumer.

---

# 7. Transaction Boundary

## MUST KNOW

Ví dụ place order:

```text
Insert Order
+ Insert Reservation
+ Insert Outbox
→ cùng local transaction
```

Không nên:

```text
Insert Order
Commit
Publish broker
```

Vì:

```text
DB commit
Broker fail
→ downstream không nhận event
```

## Quy tắc

- Transaction ngắn.
- Không gọi HTTP bên ngoài trong transaction.
- Không giữ lock khi chờ network.
- Business update và Outbox cùng commit.
- Consumer update và Inbox cùng commit nếu có thể.

## Câu trả lời 30 giây

> Tôi đặt transaction boundary quanh những thay đổi phải nhất quán trong cùng database. Remote calls không nằm trong transaction; consistency xuyên service được xử lý bằng Outbox, idempotency và compensation.

---

# 8. Isolation, Locking và Concurrency

## MUST KNOW

Optimistic concurrency:

```sql
UPDATE orders
SET status = :status,
    version = version + 1
WHERE order_id = :id
  AND version = :expected;
```

Affected rows = 0:

```text
Concurrent update
```

Pessimistic locking:

```sql
SELECT ...
FOR UPDATE;
```

Dùng khi conflict cao và critical section ngắn.

## Deadlock

Ví dụ:

```text
Tx A lock Cash → Position
Tx B lock Position → Cash
```

Giải pháp:

- Lock cùng thứ tự.
- Transaction ngắn.
- Index đúng.
- Retry deadlock victim có giới hạn.

## Câu trả lời 30 giây

> Tôi ưu tiên optimistic concurrency cho Order state khi conflict không quá thường xuyên. Pessimistic lock dùng cho critical section ngắn. Deadlock được giảm bằng lock order nhất quán và transaction ngắn.

---

# PHẦN III — DISTRIBUTED SYSTEMS

# 9. Outbox và Inbox

## MUST KNOW

Outbox giải quyết:

```text
DB đã commit nhưng broker publish fail
```

Flow:

```text
Business data + Outbox
→ Commit
→ Publisher publish
→ Mark Published
```

Publisher có thể publish trùng.

Do đó consumer phải idempotent.

Inbox:

```text
(EventId, ConsumerName)
```

## Câu trả lời 30 giây

> Outbox chống mất event giữa DB và broker, không tạo exactly-once. Publisher vẫn có thể gửi trùng, nên consumer cần Inbox hoặc business idempotency.

---

# 10. Kafka và RabbitMQ

## MUST KNOW

RabbitMQ:

```text
Work queue
Command routing
Task distribution
```

Kafka:

```text
Event stream
Retention
Replay
Consumer group
```

Kafka ordering:

```text
Chỉ trong một partition
```

Nếu cần order theo AccountId:

```text
PartitionKey = AccountId
```

Trade-off:

- Giữ order trong account.
- Account nóng có thể gây skew.
- Không có global ordering.

## Offset

Commit trước process:

```text
Có thể mất xử lý
```

Commit sau process:

```text
Có thể redelivery
→ cần idempotency
```

---

# 11. Timeout, Retry, Circuit Breaker

## MUST KNOW

Timeout:

```text
Giới hạn một call
```

Retry:

```text
Chỉ cho transient error
```

Circuit breaker:

```text
Ngừng gọi dependency lỗi liên tục
```

Không retry:

- Validation.
- Unauthorized.
- Business rejection.
- Poison message.
- Side effect không idempotent.

## Retry storm

```text
Gateway retry
× Service retry
× Client retry
→ tải nhân nhiều lần
```

Cần retry budget.

## Câu trả lời 30 giây

> Timeout cắt chờ, retry xử lý lỗi tạm và circuit breaker tránh cascading failure. Với operation có side effect, retry phải đi kèm idempotency.

---

# 12. Saga và Compensation

## MUST KNOW

Saga dùng cho workflow nhiều local transaction.

Ví dụ:

```text
Create Order
→ Reserve Cash
→ Send Exchange
→ Receive Result
→ Update Ledger
```

Compensation:

```text
Reserve thành công
Exchange reject
→ Release reservation
```

Compensation không phải rollback vật lý.

Nó cũng có thể fail và cần:

- Retry.
- Idempotency.
- Audit.
- Manual review.

---

# PHẦN IV — BACKEND .NET CẦN HỌC

# 13. async/await và ThreadPool

## MUST KNOW

```text
Thread = luồng thực thi
Task = abstraction công việc
await I/O = không giữ thread trong thời gian chờ
```

Tránh:

```csharp
.Result
.Wait()
```

Rủi ro:

- Blocking.
- ThreadPool starvation.
- Latency tăng.

CPU thấp nhưng latency cao có thể do:

- DB wait.
- Network.
- Lock.
- Connection pool.
- Blocking call.

---

# 14. Dependency Injection

## MUST KNOW

| Lifetime | Ý nghĩa |
|---|---|
| Transient | Mỗi lần resolve một instance |
| Scoped | Một instance trong request/scope |
| Singleton | Một instance toàn app |

Không:

- Inject scoped trực tiếp vào singleton.
- Giữ request state mutable trong singleton.
- Dùng singleton cho non-thread-safe collection.

---

# 15. API Design

## MUST KNOW

Command:

```text
POST /orders
POST /orders/{id}/cancel
```

Query:

```text
GET /orders/{id}
GET /accounts/{id}/positions
```

Error format:

```json
{
  "code": "INSUFFICIENT_BUYING_POWER",
  "title": "Order rejected",
  "status": 422,
  "traceId": "..."
}
```

Status quan trọng:

```text
400 input syntax
401 chưa xác thực
403 không đủ quyền
404 không tìm thấy
409 conflict/version/idempotency
422 domain validation
429 rate limit
```

---

# 16. Decimal, Time và Rounding

## MUST KNOW

Không dùng `double` cho tiền.

```csharp
decimal amount = 123.45m;
```

Phân biệt:

```text
UTC timestamp
BusinessDate
TradeDate
SettlementDate
```

Rounding phải có policy:

- Scale.
- Mode.
- Currency.
- Instrument.
- Fee/tax rule version.

Không tự đoán quy tắc thị trường; lấy từ specification chính thức.

---

# PHẦN V — DATABASE VÀ ORACLE

# 17. Index và Query Plan

## MUST KNOW

Index theo query pattern.

Query:

```sql
WHERE account_id = :account
  AND status = :status
ORDER BY created_at DESC
```

Index gợi ý:

```text
(account_id, status, created_at)
```

Không phải càng nhiều index càng tốt.

## N+1

```text
Load Orders
→ query Execution từng Order
```

Giải pháp:

- Join.
- Batch.
- Projection.
- Read model.

## Oracle trọng tâm

Nên ôn:

- Execution plan.
- Index range scan/full scan.
- Nested loop/hash join.
- Bind variable.
- Partition pruning.
- Lock/blocking session.
- Undo/redo ở mức khái niệm.
- Scheduler.
- PL/SQL transaction.
- Advanced Queue nếu dự án dùng.

---

# 18. Pagination và bảng lớn

## MUST KNOW

Offset pagination:

```text
Dễ dùng nhưng chậm ở page sâu
```

Keyset pagination:

```sql
WHERE (created_at, order_id) < (:time, :id)
ORDER BY created_at DESC, order_id DESC
FETCH FIRST 50 ROWS ONLY
```

Phù hợp Order history lớn.

Partition phù hợp:

- Ledger.
- Execution.
- Audit.
- EOD snapshot.

Partition không tự động chữa query xấu.

---

# PHẦN VI — PRODUCTION

# 19. Observability

## MUST KNOW

Logs:

```text
Chi tiết event
```

Metrics:

```text
Xu hướng và alert
```

Traces:

```text
Đường đi xuyên service
```

Technical metrics:

- API p95/p99.
- Error rate.
- DB pool.
- ThreadPool queue.
- Kafka lag.
- Outbox backlog.
- DLQ size.

Business metrics:

- Order rejection rate.
- ACK latency.
- Fill processing lag.
- Stuck Order.
- Reconciliation breaks.
- EOD step duration.
- Stale market data.

---

# 20. Security và Audit

## MUST KNOW

Authentication:

```text
Bạn là ai
```

Authorization:

```text
Bạn được làm gì
```

Finance cần:

- Maker-checker.
- Least privilege.
- Account scope.
- Limit by amount.
- Audit before/after.
- Secret masking.
- TLS.
- Parameterized SQL.

Không log:

- Token.
- Password.
- Private key.
- Full PII.
- Payment secret.

---

# 21. Testing

## MUST KNOW

Unit test:

- State transition.
- Risk rule.
- Fee/rounding.
- Late event policy.

Integration test:

- Unique constraint.
- Transaction rollback.
- Outbox/Inbox.
- Kafka/RabbitMQ.
- API middleware.
- Oracle locking behavior.

Failure-path test:

- Duplicate order.
- Duplicate execution.
- DB fail before commit.
- Broker fail after DB commit.
- Consumer crash after DB commit.
- EOD rerun.
- Late execution.
- Reconciliation mismatch.

---

# 22. Performance Debugging

## MUST KNOW

Golden signals:

```text
Latency
Traffic
Errors
Saturation
```

CPU thấp nhưng latency cao:

- I/O wait.
- Lock.
- Connection pool.
- ThreadPool starvation.
- Queue backlog.

Kafka lag tăng:

- Producer tăng.
- Consumer chậm.
- DB downstream chậm.
- Partition skew.
- Retry/poison message.

Quy trình:

```text
Xác định impact
→ Xem metrics
→ Mở trace
→ Query log
→ Kiểm tra DB/broker
→ Đặt giả thuyết
→ Đo
→ Fix
→ Đo lại
```

---

# PHẦN VII — SYSTEM DESIGN

# 23. Thiết kế Place Order

## Yêu cầu phải nói được

```text
Auth
Account permission
Idempotency
Validation
Risk check
Reservation
Order transaction
Outbox
Exchange connector
State machine
ACK/Reject
Execution
Ledger
Audit
Observability
Reconciliation
```

## Mẫu trả lời

> API xác thực account và idempotency key. Order Service validate lệnh, gọi Risk để tính buying power và reserve. Order, reservation và Outbox commit trong một transaction. Exchange connector gửi lệnh và xử lý ACK/Reject. Execution được dedup bằng external execution id, cập nhật Order và tạo ledger entries. Portfolio là read model eventual consistent. Hệ có reconciliation giữa internal order/execution với exchange.

---

# 24. Thiết kế Execution Processing

```text
Exchange Execution
→ Validate source/sequence
→ Dedup external id
→ Insert Execution
→ Update Order fill
→ Update Ledger
→ Insert Outbox
→ Commit
```

Phải xử lý:

- Partial fill.
- Duplicate.
- Out-of-order.
- Correction/bust.
- Late execution.
- Concurrent event.

---

# 25. Thiết kế EOD

```text
State machine theo step
BusinessDate
RunId
Checkpoint
Idempotent rerun
Dependency graph
Reconciliation
Manual override
Audit
Alert
```

Không dùng một script dài không restart được.

---

# PHẦN VIII — INTERVIEW QUESTIONS

# 26. 20 câu bắt buộc

## 1. Vì sao tài chính cần idempotency?

Vì retry hoặc duplicate có thể tạo lệnh, execution, debit hoặc refund hai lần.

## 2. Outbox giải quyết gì?

Giảm rủi ro DB commit nhưng event bị mất.

## 3. Outbox có exactly-once không?

Không. Consumer vẫn phải idempotent.

## 4. Ledger khác balance?

Ledger là lịch sử; balance là projection hiện tại.

## 5. Vì sao không sửa ledger entry?

Để giữ audit; correction bằng compensating entry.

## 6. ACK và Execution khác gì?

ACK là chấp nhận lệnh; Execution là kết quả khớp.

## 7. Partial fill cập nhật gì?

Order fill, remaining, reservation, cash/position, fee và read model.

## 8. Optimistic concurrency dùng khi nào?

Conflict không quá thường xuyên và có version để phát hiện.

## 9. Vì sao không gọi HTTP trong DB transaction?

Giữ lock lâu và phụ thuộc network.

## 10. Kafka giữ ordering không?

Trong một partition.

## 11. Retry có nguy hiểm không?

Có thể nhân tải và duplicate side effect.

## 12. Reconciliation để làm gì?

Phát hiện silent mismatch giữa internal và external source.

## 13. EOD rerun thế nào?

Mỗi step idempotent, có business date, run id và checkpoint.

## 14. CPU thấp nhưng latency cao?

Có thể do I/O wait, lock, ThreadPool hoặc connection pool.

## 15. Read model có phải source of truth?

Không; thường là derived data.

## 16. Margin rule cần gì?

Version, effective date, reason, inputs và audit.

## 17. Market data stale xử lý sao?

Track sequence/timestamp; reject hoặc fallback nếu vượt threshold.

## 18. `decimal` vì sao dùng cho tiền?

Phù hợp biểu diễn thập phân chính xác hơn `double`.

## 19. Maker-checker là gì?

Tách người tạo và người duyệt.

## 20. Senior answer khác Middle ở đâu?

Senior nói được failure scenarios, transaction boundary, trade-off, monitoring và recovery.

---

# 27. Red Flags

Không nói:

```text
Kafka exactly-once nên không cần dedup
Transaction giải quyết mọi consistency
Retry càng nhiều càng tốt
Redis down thì app phải down
Ledger sai thì update row
Read model là source of truth
EOD fail thì chạy lại nguyên script
Microservices luôn tốt hơn monolith
```

Nên nói:

```text
Tôi cần xác định source of truth
Tôi cần biết transaction boundary
Tôi cần xử lý retry và duplicate
Tôi cần audit và reconciliation
Tôi cần trade-off consistency, latency và throughput
```

---

# 28. Lộ trình học 14 ngày

## Ngày 1–2

- Order lifecycle.
- ACK/Reject/Execution.
- Partial fill.
- Cancel/replace.

## Ngày 3–4

- Risk.
- Buying power.
- Reservation.
- Ledger.

## Ngày 5–6

- Transaction.
- Isolation.
- Lock.
- Idempotency.

## Ngày 7–8

- Outbox/Inbox.
- Kafka/RabbitMQ.
- Retry/Saga.

## Ngày 9–10

- .NET async/await.
- DI.
- API.
- Decimal/time.

## Ngày 11

- Oracle/index/query plan.
- Pagination.
- Partition.

## Ngày 12

- EOD.
- Settlement.
- Reconciliation.

## Ngày 13

- Observability.
- Security.
- Testing.

## Ngày 14

- System design Place Order.
- Execution Processing.
- EOD.
- Mock interview.

---

# 29. Checklist cuối

## Domain

- [ ] Order state machine.
- [ ] Partial fill.
- [ ] Reservation.
- [ ] Execution dedup.
- [ ] Ledger.
- [ ] Settlement.
- [ ] EOD.
- [ ] Reconciliation.

## Correctness

- [ ] Idempotency.
- [ ] Transaction boundary.
- [ ] Lock/concurrency.
- [ ] Outbox/Inbox.
- [ ] Late/duplicate event.

## Backend

- [ ] async/await.
- [ ] DI lifetime.
- [ ] API error format.
- [ ] Decimal/time.
- [ ] Oracle/index/query plan.

## Production

- [ ] Retry/breaker.
- [ ] Observability.
- [ ] Audit/security.
- [ ] Failure-path testing.
- [ ] Performance debugging.

## Interview

- [ ] Trả lời 20 câu bắt buộc.
- [ ] Thiết kế Place Order.
- [ ] Thiết kế Execution.
- [ ] Thiết kế EOD.
- [ ] Có 2 incident stories thực tế.

---

# Kết luận

Backend tài chính – chứng khoán tập trung vào sáu từ:

```text
Correctness
Idempotency
Consistency
Auditability
Recoverability
Reconciliation
```

Khi gặp câu hỏi thiết kế, luôn quay lại:

```text
Source of truth là gì?
Transaction boundary ở đâu?
Nếu retry thì có double side effect không?
Nếu process chết thì recover thế nào?
Nếu dữ liệu lệch thì phát hiện bằng gì?
```

Đó là xương sống của toàn bộ handbook này.
