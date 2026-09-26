# Race Condition & Concurrency

:::learning-goal
Sau bài này, bạn có thể nhìn một shared state, nêu invariant cần giữ, trace một interleaving làm invariant vỡ, chạy reproduction C# nhỏ và chọn đúng correctness boundary. Mục tiêu không phải nhớ nhiều primitive.
:::

## Prerequisites

Bạn cần biết variable, method, C# cơ bản và đã từng thấy `async`/`await`.

Bạn **không** cần biết trước race condition, atomicity, critical section, `lock`, `Interlocked`, memory visibility hay thread safety. Bài này chỉ xây những phần cần để reasoning về lỗi.

## Engineering Problem

`balance = 100`. Request A muốn rút 80; request B muốn rút 30.

Nếu xử lý tuần tự, A thành công và balance còn 20; B phải bị từ chối. Rule nghiệp vụ (invariant) là: **tổng withdrawal được chấp nhận không được vượt số dư đang có**.

Mỗi request riêng lẻ đều có đoạn code dễ hiểu:

```csharp
var current = balance;       // READ
if (current >= amount)       // CHECK
    balance = current - amount; // WRITE
```

Vấn đề xuất hiện khi hai request đang cùng tiến triển. Đừng đặt tên lỗi vội; trước hết hãy trace điều gì thực sự xảy ra.

## Learning Goal

Bạn sẽ đi từ “hai thread chạy cùng lúc” tới câu chính xác hơn: correctness phụ thuộc vào execution ordering không được kiểm soát giữa các operation dùng chung state. Bạn phải chỉ ra được state, invariant, candidate interleaving, evidence và boundary của giải pháp.

## Mental Model

### Shared state là gì?

`balance` là **shared mutable state**: nhiều operation có thể đọc và thay đổi cùng một giá trị. Shared state không tự sai. Nó trở thành nguy hiểm khi rule đúng/sai của operation phụ thuộc vào giá trị đó và các bước không được phối hợp.

### Thấy failure trước khi học thuật ngữ

Dưới đây là một **simplified execution model**. Nó cố ý cho A/B xen kẽ để nhìn rõ mechanism; scheduler production không hứa đi đúng thứ tự này. Hãy đi Next từng bước.

{{RACE_VISUAL:interleaving}}

Sau hai `READ`, A và B đều có local snapshot là 100. Sau hai `CHECK`, hệ thống đã cho phép tổng 110. `WRITE` cuối chỉ làm triệu chứng lộ ra: balance 70 che write 20 của A. Evidence cần nhìn không chỉ là final balance mà còn là **2 successful withdrawals / 100 available**.

Bây giờ mới gọi tên lỗi: **race condition** xảy ra khi correctness phụ thuộc vào operation concurrent nào được chạy trước. Nó không đồng nghĩa “cứ hai thread là có race”; cần shared state + invariant + một interleaving cho outcome sai. Bài này không đi sâu vào khái niệm low-level *data race*, vì nó không cần để giải thích boundary này.

### Một logical action có thể không atomic

`READ → CHECK → WRITE` nhìn như “rút tiền” là một action, nhưng trace cho thấy nó là nhiều bước có thể bị xen vào. **Atomic operation** nghĩa là operation được xử lý như một đơn vị không bị chen ngang theo boundary đang nói tới.

Không suy ra “mỗi C# statement là atomic”. Điều cần hỏi là: *toàn bộ rule READ/CHECK/WRITE có được bảo vệ như một đơn vị không?*

Phần phải không bị interleave sai được gọi là **critical section**. Từ invariant, ta mới chọn property cần có: mutual exclusion cho multi-step shared memory, hay simple atomic update cho một counter, hay database concurrency rule cho state ở database.

## Same requests, different execution boundary

{{RACE_VISUAL:protection}}

Với một process, `lock` cho mutual exclusion: một execution giữ cùng lock object, execution khác phải chờ đến khi release. Đây là reason A hoàn tất check/write trước khi B đọc giá trị mới. `lock` không “làm class thread-safe” một cách thần kỳ; nó bảo vệ **vùng state mà mọi caller liên quan thực sự đi qua cùng lock**.

```csharp
private readonly object _balanceGate = new(); // C#/.NET version-neutral sample
private int _balance = 100;

public bool Withdraw(int amount)
{
    lock (_balanceGate)
    {
        if (_balance < amount) return false;
        _balance -= amount;
        return true;
    }
}
```

Giữ critical section ngắn. Không đặt I/O hoặc `await` vào body `lock`; `lock` chặn execution khác muốn lấy cùng lock. Với C# 13/.NET 9+, docs khuyến nghị dedicated `System.Threading.Lock`; sample dùng `object` để vẫn chạy trên runtime cũ hơn.

### `Interlocked` giải quyết đúng bài toán nào?

Nếu chỉ cần tăng một counter shared, `Interlocked.Increment(ref count)` là atomic operation phù hợp hơn một critical section lớn.

```csharp
var count = 0;
Parallel.For(0, 1_000, _ => Interlocked.Increment(ref count));
Console.WriteLine(count); // 1000
```

Nhưng `Interlocked.Increment` không tự bảo vệ invariant “chỉ rút khi balance đủ”, vì invariant đó gồm check và update phụ thuộc nhau. Đừng thay multi-step business rule bằng một primitive chỉ đúng cho numeric update đơn giản.

### `async` không loại race

`async`/`await` không tự tạo thread cho mỗi async method; `await` nhả thread trong lúc chờ incomplete task. Nhưng hai logical request vẫn có thể overlap và cùng đọc state trước khi một request write. Vì vậy async I/O không làm shared mutable state tự thread-safe. Xem Reference Async/Concurrency nếu cần sâu hơn về Task/Thread.

`SemaphoreSlim` cũng không phải “lock thay thế” theo mặc định. Nó hợp khi cần permit limit, ví dụ tối đa 5 I/O call đắt tiền cùng lúc. Giới hạn concurrency không tự đặt atomicity cho inventory/database state.

## Hands-on Lab

:::hands-on
Đây là **local simulation**: console app chạy trên máy bạn, không dùng production database. Barrier/delay trong experiment chỉ là teaching instrumentation để tạo interleaving có kiểm soát; không phải cách debug production chính.
:::

Tạo console app:

```powershell
dotnet new console -n RaceLab
cd RaceLab
```

Thay `Program.cs` bằng code sau rồi chạy `dotnet run`.

```csharp
using System.Threading;

var balance = 100;
var start = new Barrier(2);
var release = new Barrier(2);

Task<bool> UnsafeWithdraw(int amount) => Task.Run(() =>
{
    var current = balance;       // READ
    start.SignalAndWait();       // cả hai đã đọc cùng snapshot
    var allowed = current >= amount; // CHECK
    release.SignalAndWait();     // teaching gate, cho WRITE xen kẽ
    if (allowed) balance = current - amount; // WRITE
    return allowed;
});

var results = await Task.WhenAll(UnsafeWithdraw(80), UnsafeWithdraw(30));
Console.WriteLine($"approved={results.Count(x => x)}, balance={balance}");
```

### Experiment 1 — sequential baseline

**Question:** nếu gọi withdraw 80 rồi withdraw 30 theo thứ tự, output nào giữ invariant?

**Predict:** chỉ một success, balance 20.
**Run:** thay hai `Task` bằng hai method call tuần tự.
**Inspect:** số operation thành công và balance cuối.
**Observation / Why:** B đọc state sau write của A. Không có interleaving vào logical operation.
**Learn:** sequential success chưa chứng minh code concurrent-safe; nó chỉ là baseline cho invariant.

### Experiment 2 — concurrent unsafe version

**Question:** code có thể accept bao nhiêu withdrawal khi cả hai cùng đọc 100?

**Predict:** cả hai `true`, dù final balance có thể là 20 hoặc 70 tùy execution order.
**Run:** chạy code Barrier ở trên.
**Inspect:** `approved=2` và `balance`.
**Observation:** final balance không nhất thiết tái hiện giống nhau; approved total 110 mới là evidence invariant violation.
**Why:** current là local snapshot; `WRITE` sau không biết request khác đã thay đổi state.
**Learn:** “chạy một lần không lỗi” không phải proof of thread safety. Reasoning phải bao phủ interleaving được phép.

### Experiment 3 — reproduce có kiểm soát

**Question:** tại sao không chỉ chạy 1.000 lần rồi chờ bug?

**Predict:** Barrier làm cả hai READ trước CHECK/WRITE nên failure mechanism xuất hiện có chủ đích.
**Run:** giữ hai `Barrier` và log `current`, `amount`, result.
**Inspect:** hai `current=100`, hai accepted result.
**Why:** timing gate là evidence aid trong lab; nó không phải production fix.
**Learn:** debug race bằng candidate timeline, boundary và evidence, không bằng random `Thread.Sleep`.

### Experiment 4 — protect the multi-step rule

**Question:** nếu toàn bộ check/update đi qua một shared `lock`, B sẽ thấy gì?

```csharp
var gate = new object();
var balance = 100;
bool SafeWithdraw(int amount)
{
    lock (gate)
    {
        if (balance < amount) return false;
        balance -= amount;
        return true;
    }
}

var results = await Task.WhenAll(
    Task.Run(() => SafeWithdraw(80)),
    Task.Run(() => SafeWithdraw(30)));
Console.WriteLine($"approved={results.Count(x => x)}, balance={balance}");
```

**Inspect:** một `true`, balance 20.
**Why:** B only enters the critical section after A releases the same gate, then reads 20.
**Learn:** lock placement must cover the invariant’s read/check/write boundary, not just the final assignment.

### Experiment 5 — observe contention and scope

**Question:** cost mới của protection là gì?

**Run:** trong `SafeWithdraw`, đo thời gian wait trước khi vào lock (chỉ trong lab) và tăng số concurrent call.
**Inspect:** throughput/wait time, nhưng đừng kết luận từ laptop benchmark nhỏ.
**Learn:** correctness trước; sau đó đo contention để chọn granularity. Lock quá rộng làm request chờ lâu, lock quá hẹp có thể lại lọt invariant.

## Debug from evidence

Khi production có duplicate reservation, missing update hoặc final count bất thường, dùng loop này:

1. **Observation:** record final value, successful operation count, operation/correlation ID và instance ID.
2. **Shared state + invariant:** state nào bị cùng đọc/ghi; rule nào bị vỡ?
3. **Hypothesis:** viết một candidate interleaving như A read → B read → A/B check → writes.
4. **Evidence:** log structured theo operation, database affected-row count/version, trace timeline; thread/task ID chỉ thêm khi thực sự giúp phân biệt work.
5. **Experiment:** reproduce trong test/local simulation bằng controllable gate; không lấy random sleep làm primary technique.
6. **Fix boundary:** bảo vệ đúng source of truth, rồi viết regression test cho invariant.

## Break It: process-local protection không phải multi-instance protection

{{RACE_VISUAL:boundary}}

Nếu state thật nằm ở database, local `lock` chỉ serialize request tới **một** process. Với inventory, candidate solution thường là conditional update, optimistic concurrency/version hoặc transaction/locking theo workflow. Unique constraint phù hợp với uniqueness rule. Distributed coordination chỉ là một option khi evidence cho thấy boundary cần nó.

Ví dụ PostgreSQL-style conditional update:

```sql
UPDATE inventory
SET quantity = quantity - 1
WHERE sku = 'A-1' AND quantity > 0
RETURNING quantity;
```

**Evidence:** affected row/`RETURNING` nói request nào giữ item. Nhưng đây không tự bảo vệ external side effect sau update: nếu còn payment/reservation cross-system, cần state/recovery design riêng.

## Production case: inventory = 1, checkout chạy nhiều instance

**Symptom:** hai checkout cùng báo success cho SKU chỉ còn 1.
**Known facts:** app có 4 instance; mỗi instance có local `lock`; database log cho hai order.
**Invariant:** không accept quá 1 reservation.
**Unknown:** state nào là source of truth, SQL update condition/version có tồn tại không, payment đã charge chưa, duplicate có tới từ retry hay interleaving?
**Candidate interleaving:** request A/B vào instance khác nhau; gate A/gate B không phối hợp; cả hai đọc availability cũ.
**Evidence:** query affected-row count, order/reservation rows, instance/correlation IDs, provider operation IDs.
**Correctness boundary:** đặt reservation rule ở database transaction/concurrency boundary; local lock chỉ có thể giảm contention trong từng process.
**Trade-off:** conditional update giữ invariant sát data nhưng caller phải xử lý 0 row/conflict; serializing rộng hơn có thể giảm throughput; external side effect cần idempotency/recovery riêng.

Không chọn “use lock” trước khi biết state sống ở đâu. Không chọn distributed lock chỉ vì app scale-out.

## Senior reasoning: chọn property trước tool

| Bạn cần bảo vệ gì? | Câu hỏi boundary | Candidate mechanism |
|---|---|---|
| Tăng một counter trong cùng process | Một numeric update có đủ không? | `Interlocked.Increment` |
| READ/CHECK/WRITE trên in-memory state | Mọi caller có dùng cùng gate/process không? | `lock` ngắn, đúng scope |
| Tối đa 5 I/O call đang chạy | Đây là capacity limit, không phải invariant state? | `SemaphoreSlim` / bounded concurrency |
| Inventory/order ở database | Source of truth có thể atomically enforce rule không? | conditional update, transaction, optimistic concurrency |
| Nhiều system/external side effect | Điều gì atomic, điều gì unknown outcome? | idempotency, state machine, reconciliation theo case |

## Transfer Challenge

Coupon `WELCOME-10` chỉ được dùng một lần, app nay chạy 4 instance sau load balancer. Team đề xuất copy `lock(gate)` từ console lab.

Trước khi xem model, trả lời:

- shared state sống ở memory hay database?
- previous lock còn phối hợp tất cả request không? Vì sao?
- invariant nào cần giữ?
- bạn thiếu evidence gì, evidence đó ảnh hưởng decision nào và sẽ kiểm ở đâu?

Checklist: có coupon usage record/unique rule hay chưa; retry/idempotency có thể tạo duplicate không; affected-row count/constraint violation cho evidence gì; external discount side effect cần recovery gì.

Model direction: local lock không đủ qua 4 instance. Nếu database sở hữu “một coupon chỉ dùng một lần”, unique/conditional database operation là candidate gần rule hơn. Nhưng cần biết transaction boundary và retry behavior trước khi kết luận final design.

## Explain It

Đừng xem model answer ngay. Trong 60–120 giây, giải thích: vì sao hai request riêng lẻ đúng vẫn tạo kết quả sai; invariant nằm đâu; READ/CHECK/WRITE xen kẽ ra sao; và vì sao fix phụ thuộc state boundary.

Sau khi tự nói, check xem bạn có đủ: shared mutable state, invariant, local snapshot, interleaving, non-atomic logical operation, critical section/correctness boundary và evidence.

Model answer: “Race condition không chỉ là hai thread. Nó xảy ra khi correctness của shared state phụ thuộc vào thứ tự execution không được kiểm soát. Với balance 100, A và B cùng READ 100 rồi cùng CHECK nên đều được accept; các WRITE sau dùng snapshot cũ, tổng withdrawal đã vượt invariant. Trong một process, em có thể dùng cùng `lock` cho cả read/check/write. Nếu state ở database hoặc có nhiều instance, local lock không phối hợp được; em đặt rule ở database boundary và nhìn affected rows/version để verify.”

**Technical English:** `shared mutable state`, `race condition`, `interleaving`, `atomic operation`, `critical section`, `mutual exclusion`, `contention`, `process-local lock`.

## Recall Questions

1. Điều gì biến hai operation concurrent thành race condition, thay vì chỉ “chạy cùng lúc”?
2. Invariant của withdrawal example là gì và evidence nào chứng minh nó vỡ?
3. Vì sao `READ → CHECK → WRITE` vulnerable?
4. Khi nào `Interlocked` đủ, và khi nào không đủ?
5. Vì sao code chạy pass nhiều lần vẫn chưa chứng minh thread-safe?
6. Vì sao local `lock` fail khi app có nhiều instance?
7. Trước khi chọn fix, bạn cần evidence gì về source of truth và boundary?

Tóm tắt: trace state trước, đặt tên race sau; bảo vệ invariant chứ không sưu tập tool; local lock có local scope; source of truth quyết định correctness boundary.

## Further Learning

- [Official `lock` reference](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/lock) — semantics, current C# guidance và giới hạn `await` trong `lock`.
- [Official `Interlocked` reference](https://learn.microsoft.com/en-us/dotnet/api/system.threading.interlocked) — phạm vi atomic update đơn giản.
- [TAP with async/await](https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/task-asynchronous-programming-model) — hiểu `await` không đồng nghĩa tạo thread.
- [Visual race-condition explanation](https://www.youtube.com/watch?v=zMzo0xcS37o) — reinforcement cho interleaving/critical section; technical claims trong QuanNet đã cross-check bằng official docs.
- [Source map for this lesson](/docs/research/race-condition-source-map) — traceability cho author/reviewer, không phải prerequisite.

## Continue

- Reference: [Async, Threading và Concurrency](/docs/async-threading-concurrency)
- Quiz: [Quiz Async và background work](/quiz?topic=Async%20v%C3%A0%20background%20work)
- Interview: [Fan-out và bounded concurrency](/interview?question=async-fanout)
