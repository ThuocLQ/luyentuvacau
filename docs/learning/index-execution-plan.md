# Learning Lab: Database Index & Execution Plan

## Engineering Problem

Trang lịch sử đơn hàng chậm khi `orders` có nhiều row. Query lọc `tenant_id`, `status`, lấy 20 đơn mới nhất. Mục tiêu không phải “thêm index”, mà là tìm access path ít tốn hơn cho đúng query shape.

## Learning Goal

Bạn có thể chạy reproduction PostgreSQL local, đọc `EXPLAIN (ANALYZE, BUFFERS)`, giải thích index theo equality filter → ordering → `LIMIT`, rồi dùng evidence để quyết định thay vì tin index luôn được chọn.

## Mental Model

```text
Without suitable index                 Suitable composite index

Orders                                 B-tree
  ↓                                      ↓
scan many rows                         Tenant 42 + Paid range
  ↓                                      ↓
filter                                  already ordered by created_at, id
  ↓                                      ↓
sort                                    read first 20
  ↓                                      ↓
LIMIT 20                               LIMIT 20
```

B-tree giữ key có thứ tự. Với query này, `tenant_id` và `status` khoanh vùng candidate range; `created_at DESC, id DESC` cho đúng thứ tự để database có thể dừng sớm ở 20 row. Index vẫn có storage/write overhead; optimizer chỉ dùng nó khi statistics, distribution, cache state, version/config khiến đường đó được ước lượng rẻ hơn.

## Worked Example

Query cần đo:

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, created_at, total
FROM orders
WHERE tenant_id = 42 AND status = 'Paid'
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

Trước index, plan có thể scan nhiều row rồi sort. Sau index phù hợp, plan có thể đi vào range đã có thứ tự. Không hứa plan giống nhau trên mọi laptop: ghi lại **scan type, estimated rows, actual rows, execution time, buffers, sort presence**. Đây là observation; kết luận về index là engineering judgment dựa trên observation đó.

## Hands-on Lab: setup sạch bằng Docker + PostgreSQL

**Prerequisite:** Docker Desktop chạy được, cổng `5432` chưa bị dùng; dùng `psql` local hoặc SQL client kết nối `postgresql://postgres:postgres@localhost:5432/quannet_lab`.

```bash
docker run --name quannet-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=quannet_lab \
  -p 5432:5432 \
  -d postgres:17

# Chờ container healthy, rồi mở psql từ chính container:
docker exec -it quannet-postgres psql -U postgres -d quannet_lab
```

PostgreSQL 17 image dùng major tag cố định để lab lặp lại được. Khi kết thúc: `docker stop quannet-postgres`; chỉ dùng `docker rm -f quannet-postgres` khi muốn bỏ toàn bộ lab data.

### 1. Tạo schema và dataset laptop-friendly

Chạy nguyên block này trong `psql`. 300k row đủ để plan có dữ liệu thật nhưng vẫn phù hợp máy phổ thông; thời gian tuyệt đối sẽ khác nhau.

```sql
CREATE TABLE orders (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  tenant_id integer NOT NULL,
  customer_id integer NOT NULL,
  status text NOT NULL,
  created_at timestamptz NOT NULL,
  total numeric(12,2) NOT NULL
);

INSERT INTO orders (tenant_id, customer_id, status, created_at, total)
SELECT
  ((g - 1) % 200) + 1,
  ((g - 1) % 50000) + 1,
  CASE WHEN g % 20 = 0 THEN 'Pending' WHEN g % 5 = 0 THEN 'Shipped' ELSE 'Paid' END,
  now() - (g * interval '1 second'),
  (g % 5000)::numeric / 10
FROM generate_series(1, 300000) AS g;

ANALYZE orders;
```

### 2. Baseline: predict, run, record

Trước khi chạy, dự đoán: database phải inspect bao nhiêu row, có sort không, và vì sao `LIMIT 20` chưa giúp nhiều nếu result chưa ordered.

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, created_at, total
FROM orders
WHERE tenant_id = 42 AND status = 'Paid'
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

Ghi evidence vào note: scan type; estimated/actual rows; execution time; shared buffers; có `Sort` hay không. Exact timing/plan khác nhau theo statistics, distribution, table size, cache state, PostgreSQL version/config — relative change và plan shape mới là dữ liệu học.

### 3. Index experiment: cùng query, một access path mới

```sql
CREATE INDEX ix_orders_tenant_status_created
ON orders (tenant_id, status, created_at DESC, id DESC);

ANALYZE orders;
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, created_at, total
FROM orders
WHERE tenant_id = 42 AND status = 'Paid'
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

Column order khớp **equality filters** trước (`tenant_id`, `status`), rồi **ordering** (`created_at`, `id`), rồi `LIMIT` có thể dừng khi đã đủ row. Đừng gọi đây chỉ là “left-most rule”: hãy nhìn query đang lọc gì và thứ tự nào cần được duy trì.

## Guided Practice

- So sánh baseline/index bằng sáu evidence đã ghi, không chỉ bằng một keyword `Index Scan`.
- Viết một câu mechanism: “Index có thể giảm vùng candidate và tránh sort cho query shape này.”
- Viết một câu trade-off: “Mỗi write có thêm index maintenance và storage.”

## Break It A: poor selectivity

Dự đoán trước: nếu gần như toàn bộ tenant 42 là `Paid`, planner có còn chọn index không?

```sql
UPDATE orders SET status = 'Paid' WHERE tenant_id = 42;
ANALYZE orders;
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, created_at, total
FROM orders
WHERE tenant_id = 42 AND status = 'Paid'
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

Không có plan “đúng bắt buộc”. Quan sát scan type/rows/buffers rồi giải thích estimate và cost. Nếu index vẫn được dùng, đó không phủ định bài học; `ORDER BY ... LIMIT` vẫn có thể làm access path có ích.

## Break It B: wrong query shape

Dùng index hiện có nhưng bỏ useful prefix. Trước khi chạy, dự đoán index `(tenant_id, status, created_at, id)` có còn dẫn database tới một range nhỏ không.

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, created_at, total
FROM orders
WHERE created_at > now() - interval '1 day'
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

## Debug reasoning

```text
Observation → plan scan/sort/buffers khác dự đoán
Hypothesis  → selectivity, statistics hoặc query shape không khớp
Evidence    → estimated vs actual rows; buffers; index/seq scan; sort
Experiment  → ANALYZE, thay predicate, chạy cùng query trên test data
Conclusion  → giữ/thay/bỏ index theo evidence; không ép plan ở production
```

Optional write-cost observation: đo `EXPLAIN (ANALYZE, BUFFERS) INSERT ...` trước/sau **một index phụ trên test clone**, chỉ ghi relative work/buffers; đừng tạo benchmark số tuyệt đối.

## Explain It

**Vietnamese (60–120s):** giải thích index là access path, query shape quyết định index candidate, và execution plan là evidence.

**English vocabulary:** `access path`, `B-tree`, `selectivity`, `cardinality estimate`, `composite index`, `execution plan`, `sequential scan`, `write overhead`, `actual rows`.

- The main reason is that the index matches the equality filters and ordering.
- One way to verify this is to compare estimated rows, actual rows and buffers.
- The planner may choose a scan when it estimates that path is cheaper.
- The trade-off is write overhead and storage.

**Speaking challenge:** In 60 seconds, explain why an existing index may not be chosen.

## Transfer Challenge

`orders` có 30M row; query lọc `customer_id`, `status IN ('Paid','Shipped')`, sort newest, lấy 20. Bạn chưa biết data distribution, write volume hay current plan. Nêu evidence cần lấy trước, candidate index bạn sẽ test, và vì sao page 50,000 có thể cần keyset pagination thay vì chỉ thêm index. “Chưa đủ thông tin, hãy inspect X/Y/Z” là câu trả lời hợp lệ.

## Recall Questions

1. Predicate nào tạo candidate range trong lab?
2. Vì sao execution time một mình không đủ để kết luận?
3. Index column order khớp query shape này ra sao?
4. Poor selectivity có bắt buộc dẫn tới sequential scan không? Vì sao?
5. Khi plan không như dự đoán, evidence nào phân biệt statistics với query-shape problem?

## Continue

- Reference: [SQL, index, transaction và locking](/docs/sql-index-locking)
- Quiz: [Tình huống execution plan](/quiz?topic=SQL%20v%C3%A0%20EF%20Core)
- Interview: [Lost update và database boundary](/interview?question=sql-lost-update)