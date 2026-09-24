# Learning Lab: Race Condition & Concurrency

## Engineering Problem

Kho còn đúng 1 món. Hai request mua hàng tới gần như cùng lúc; cả hai đều đọc số lượng `1`, đều thấy đủ, rồi cùng ghi giảm. Làm sao một rule đơn giản lại có thể bị phá khi mỗi đoạn code nhìn riêng đều hợp lý?

## Learning Goal

Sau lab này, bạn có thể nhìn trace để giải thích race condition, phân biệt concurrency với parallelism, chọn atomic database update/lock đúng scope, và nói vì sao `lock` trong một process không bảo vệ nhiều instance.

## Mental Model: shared state bị chen giữa read và write

```text
Shared stock = 100

Thread A              Thread B
READ 100
                      READ 100
CHECK enough
                      CHECK enough
WRITE 99
                      WRITE 99

Kết quả: bán 2 nhưng stock chỉ giảm 1 → lost update
```

Concurrency là nhiều task cùng tiến triển và có thể xen kẽ. Parallelism là nhiều task thực sự chạy cùng lúc trên CPU. Race condition không cần nhiều CPU: chỉ cần thời điểm xen kẽ làm assumption “state chưa đổi” trở nên sai.

## Worked Example: cùng một counter, hai kết quả

```csharp
var balance = 100;
Task withdraw() => Task.Run(() =>
{
    if (balance >= 1) balance -= 1;
});

await Task.WhenAll(Enumerable.Range(0, 200).Select(_ => withdraw()));
Console.WriteLine(balance);
```

**Observable result.** Kết quả có thể khác nhau giữa các lần chạy; không có lời hứa balance giảm đúng 200. `balance -= 1` là read → calculate → write, không phải atomic operation. `lock` có thể bảo vệ shared memory **trong một process**:

```csharp
lock (gate)
{
    if (balance >= 1) balance -= 1;
}
```

Nhưng với web app scale-out, mỗi instance có `gate` riêng. Không có shared lock giữa Pod A và Pod B.

## Guided Practice

1. Trước khi chạy, dự đoán output của 200 withdrawal từ balance 100.
2. Thêm `lock`; chạy lại và giải thích mechanism thay vì chỉ nói “đã đúng”.
3. Đổi sang hai process/instance cùng update một row database. Dự đoán vì sao lock trong app không còn đủ.

## Hands-on Lab

Với database, thử update có điều kiện để database giữ atomic boundary:

```sql
UPDATE inventory
SET quantity = quantity - 1
WHERE sku = 'A-1' AND quantity >= 1
RETURNING quantity;
```

Chạy hai session cùng lúc khi quantity = 1. Evidence cần nhìn là row count/`RETURNING`: chỉ một request có quyền giữ món hàng; request còn lại nhận 0 row. Đây là ví dụ apply, không phải lời khuyên duy nhất cho mọi workflow.

## Break It: process-local lock khi scale-out

```text
Load balancer
   ├─ Instance A: lock(gate A) → READ stock 1
   └─ Instance B: lock(gate B) → READ stock 1

gate A và gate B không biết nhau
→ cả hai vẫn có thể thực hiện external side effect
```

**Observation:** duplicate reservation chỉ xuất hiện sau khi app có hai instance.  
**Hypothesis:** lock đang đúng nhưng scope chỉ là process-local.  
**Evidence:** log instance ID, request/correlation ID, database update count.  
**Experiment:** route request đồng thời tới hai instance; thay bằng database constraint/update condition hoặc distributed coordination khi thật sự cần.  
**Conclusion:** chọn guard gần source of truth; local lock chỉ hợp cho shared memory trong một process.

## Explain It

**Tiếng Việt, 60–120 giây:** Dùng timeline trên để giải thích race condition. Phân biệt “lock này bảo vệ cái gì” và “state thật nằm ở đâu”.

**English vocabulary:** `concurrency`, `parallelism`, `shared mutable state`, `race condition`, `atomic operation`, `critical section`, `process-local lock`, `multi-instance`, `lost update`.

**Sentence patterns:**

- The problem happens when two requests read the same mutable state before either write is visible.
- A lock only protects the state within its scope.
- One way to verify this is to record the instance ID and the affected row count.
- In a multi-instance service, the database can be the atomic boundary for this rule.

**Speaking challenge (English, 60 seconds):** Explain why a normal C# `lock` can fix a test but fail after scale-out.

## Transfer Challenge

Payment provider has no transaction with your database. Two retries use the same `operation ID`, but one timeout occurs after the provider might have charged. What state belongs in your database, what can a unique constraint protect, and what still needs provider query/reconciliation? Say explicitly which evidence is missing before choosing a retry policy.

## Recall Questions

1. Race condition xảy ra ở đoạn nào trong read → check → write?
2. Concurrency khác parallelism thế nào?
3. `lock` bảo vệ scope nào?
4. Vì sao update có condition ở database có thể bảo vệ một invariant tốt hơn local lock?
5. Evidence nào chứng minh race đang qua hai instance?

## Continue

- Reference: [Async, Threading và Concurrency](/docs/async-concurrency)
- Quiz: [Quiz Async và Concurrency](/quiz?topic=Async%20v%C3%A0%20Concurrency)
- Interview: [Fan-out và bounded concurrency](/interview?question=async-fanout)
