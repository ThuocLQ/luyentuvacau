# Learning Lab: Database Index & Execution Plan

## Engineering Problem

Trang lịch sử đơn hàng của một tenant mất 2–4 giây khi bảng đã có 20 triệu row. Query hiện tại lọc theo `TenantId`, `Status`, sắp xếp mới nhất rồi lấy 20 row. Đừng thêm index theo cảm giác: trước hết cần biết database đang đi đường nào để tìm dữ liệu.

## Learning Goal

Sau lab này, bạn có thể đọc một access path đơn giản, đề xuất composite index dựa trên query shape, và dùng execution plan để kiểm chứng thay vì hứa index luôn nhanh hơn.

## Mental Model: index là đường đi, không phải bản sao phép màu

```text
Query: TenantId = 42, Status = 'Paid', newest 20

Table pages:      [rất nhiều row của mọi tenant]
Index pages:      [(42, Paid, 2026-09-24, OrderId) -> row location]
                                      ↓
                    đi tới đúng vùng nhỏ, đọc 20 row cần thiết
```

Ở mức practical, B-tree giữ key theo thứ tự để database đi từ root xuống vùng key phù hợp, thay vì đọc toàn bảng. Index chỉ hữu ích nếu optimizer ước lượng đường đó rẻ hơn scan. Giá phải trả là storage và write overhead: mỗi insert/update/delete có thể phải cập nhật index.

**Selectivity** là mức độ filter làm nhỏ tập dữ liệu. `Status = 'Paid'` có thể vẫn trả về hàng triệu row; `TenantId = 42` thường chọn lọc hơn. Với composite index, thứ tự cột phải phục vụ cách query filter/sort — không phải cứ gom tất cả cột vào là tốt.

## Worked Example: nhìn query shape trước

**Context.** PostgreSQL có bảng `orders(tenant_id, status, created_at, id, total)`.

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, created_at, total
FROM orders
WHERE tenant_id = 42 AND status = 'Paid'
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

**Trace cần quan sát.** Trước index, plan có thể là `Seq Scan` → lọc nhiều row → `Sort` → `Limit`. Tạo index theo đúng filter rồi sort:

```sql
CREATE INDEX CONCURRENTLY ix_orders_tenant_status_created
ON orders (tenant_id, status, created_at DESC, id DESC);
```

Sau đó chạy lại `EXPLAIN (ANALYZE, BUFFERS)`. Kết quả mong đợi không phải một keyword cố định; hãy so actual rows, execution time, shared buffers và xem plan có dùng `Index Scan`/`Index Only Scan` hay không. Nếu PostgreSQL vẫn scan, đó là evidence để điều tra statistics, selectivity, query shape hoặc cost — không phải bug cần ép index.

## Guided Practice

1. Đổi `status` thành giá trị xuất hiện ở 90% row. Dự đoán optimizer có còn dùng index không.
2. Bỏ `tenant_id` khỏi filter, chỉ giữ `created_at`. Dự đoán composite index trên có còn là access path tốt không.
3. Chỉ sau dự đoán mới chạy `EXPLAIN (ANALYZE, BUFFERS)` và ghi observation: plan, actual rows, buffers.

## Hands-on Lab

Chạy trong database local/sandbox có dữ liệu đủ lớn để thấy khác biệt. Nếu chưa có PostgreSQL, đọc câu lệnh như mini reproduction và so plan từ một bảng test; **evidence cần có là execution plan**, không phải chỉ “lệnh chạy thành công”.

```sql
-- Tạo query baseline, lưu output EXPLAIN ANALYZE.
-- Tạo index, chạy lại cùng query và cùng parameter.
-- Ghi: actual time, actual rows, buffers, index/seq scan, write time của một INSERT test.
INSERT INTO orders (tenant_id, status, created_at, id, total)
VALUES (42, 'Paid', now(), gen_random_uuid(), 100);
```

## Break It: index tồn tại nhưng query vẫn chậm

Tạo index trên `created_at` một mình, rồi chạy query filter theo `tenant_id` + `status`. Bạn có thể thấy index không được dùng hoặc vẫn phải đọc/sort nhiều row.

```text
Observation → query chậm, index đã tồn tại
Hypothesis  → index không khớp filter/sort hoặc filter kém selectivity
Evidence    → EXPLAIN ANALYZE: scan type, actual rows, sort, buffers
Experiment  → thử query shape/index phù hợp trên test environment
Conclusion  → giữ, thay, hoặc bỏ index dựa trên cost đo được
```

Không dùng `SET enable_seqscan = off` như “sửa lỗi”; nó chỉ hữu ích để khám phá giả thuyết, không chứng minh plan production nên bị ép.

## Explain It

**Tiếng Việt, 60–120 giây:** Giải thích vì sao index là access path và tại sao phải xem actual execution plan trước khi thêm index. Nhắc một read/write trade-off.

**English vocabulary:** `access path`, `B-tree`, `selectivity`, `cardinality estimate`, `composite index`, `execution plan`, `full table scan`, `write overhead`, `actual rows`.

**Sentence patterns:**

- The main reason is that the index matches the filter and sort order.
- One way to verify this is to compare the actual execution plan before and after.
- The trade-off is additional write overhead and storage.
- The optimizer may choose a scan when the filter is not selective enough.

**Speaking challenge (English, 60 seconds):** Explain why an index can exist but still not be chosen by the optimizer.

## Transfer Challenge

Một bảng `orders` 30M row có query:

```sql
WHERE customer_id = $1 AND status IN ('Paid', 'Shipped')
ORDER BY created_at DESC
LIMIT 20
```

Bạn chưa biết tỷ lệ status, số customer, query khác ghi vào bảng hay plan hiện tại. Đừng chốt index ngay. Nêu dữ liệu cần lấy, candidate index bạn sẽ thử, và rủi ro write overhead. Sau đó đổi condition: dashboard cần page 50,000 — giải thích vì sao có thể cần keyset pagination thay vì chỉ thêm index.

## Recall Questions

1. Index giải quyết bước nào trong access path của database?
2. Actual rows và estimated rows khác nhau nói gì về plan?
3. Vì sao composite index `(tenant_id, status, created_at)` không tự tối ưu query chỉ có `created_at`?
4. Khi nào optimizer chọn scan dù index có tồn tại?
5. Bạn verify read benefit và write cost bằng evidence nào?

## Continue

- Reference: [SQL, index, transaction và locking](/docs/sql-index-locking)
- Quiz: [Tình huống execution plan](/quiz?topic=SQL%20v%C3%A0%20EF%20Core)
- Interview: [Lost update và database boundary](/interview?question=sql-lost-update)
