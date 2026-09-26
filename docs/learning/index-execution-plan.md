# Index & Execution Plan

:::learning-goal
Sau bài này, bạn sẽ giải thích được Index giúp database bớt làm work gì; đọc evidence trong `EXPLAIN (ANALYZE, BUFFERS)`; và biết khi nào chưa đủ dữ kiện để đề xuất một index.
:::

## Trước khi bắt đầu

Bạn chỉ cần biết table, row, column, `SELECT`, `WHERE`, `ORDER BY`. Bài này sẽ xây lần lượt Index, page, buffer, B-tree, composite index, planner và execution plan. Bạn không cần biết chúng trước khi bắt đầu.

## Một vấn đề thật

Endpoint lịch sử đơn hàng trả 20 đơn mới nhất của một tenant. Khi table lớn, p95 tăng từ 80 ms lên 1.8 s dù DB CPU chỉ 35%. Có người đề nghị thêm Redis.

Chưa chọn giải pháp. Câu hỏi đầu tiên là: **database đang phải đọc, lọc và sắp bao nhiêu dữ liệu để trả 20 row?** Cache không thay thế việc hiểu work gốc đó.

## Table scan: đường đi đơn giản nhất

Nếu chưa có đường đi tốt hơn, database có thể đọc lần lượt table, kiểm từng row với `tenant_id = 42`, giữ row đúng và bỏ row sai. Đó là **table scan** (trong PostgreSQL plan thường thấy `Seq Scan`).

Table scan không phải lỗi. Với table nhỏ, hoặc query cần phần lớn row, scan có thể rẻ hơn index. Vấn đề là khi database xét rất nhiều row để trả rất ít row.

{{INDEX_VISUAL:scan}}

Visual là mô hình toy: counter nói row/candidate work đã **consider**, **eliminate** và **return**. Nó không đo page hay I/O production; mục tiêu là thấy phần work nào Index có thể giảm.

## Index là access path, không phải nút tăng tốc

**Index** là cấu trúc dữ liệu phụ mà database duy trì: nó giữ key theo thứ tự và giữ thông tin để đi tới candidate row. Nó giống mục lục sách: không thay nội dung sách, nhưng cho ta điểm bắt đầu tốt hơn.

Một query có thể lấy dữ liệu bằng nhiều đường. **Access path** là đường database chọn để lấy row: ví dụ scan toàn table, đi qua Index, hoặc (trong một số plan) bitmap path. Index chỉ mở thêm access path; nó không bắt database luôn dùng nó.

## Page và buffer: database thực sự chạm gì?

Database thường đọc dữ liệu theo **page**: một block chứa nhiều row/entry, không phải cứ một điều kiện là một lần đọc đúng một row. **Buffer** là vùng memory database dùng để giữ page đã chạm. Khi `EXPLAIN ... BUFFERS` báo `shared hit` hoặc `read`, đó là evidence về page/buffer đã dùng; nó không tự kết luận query tốt hay xấu.

Mental model cần giữ là: Index có thể đưa database tới **vùng page có khả năng phù hợp** trước, rồi database vẫn có thể đọc candidate entry/row để kiểm điều kiện còn lại.

## Key có thứ tự giúp loại work thế nào?

Danh sách lộn xộn buộc ta kiểm từng chỗ. Danh sách được giữ theo thứ tự cho phép loại một khoảng: nếu nhánh là 1–30 thì key 42 không thể ở đó. Đây là lý do B-tree hữu ích.

**B-tree** là cấu trúc Index phổ biến. Mô hình dưới đây đơn giản hóa layout nội bộ PostgreSQL nhưng trung thực ở cơ chế: root hướng đến range, node dưới thu hẹp range, leaf chứa candidate entry đã sắp theo key.

{{INDEX_VISUAL:btree}}

Trước khi reveal, hãy chọn range chứa 42. Sau đó đi từng bước: visual đánh dấu nhánh bị loại, focus vào edge còn lại, rồi tới leaf. Điều cần nhớ không phải hình cây mà là: **thứ tự key loại range không thể đúng trước khi đọc candidate entries**.

## Composite index: thứ tự của cả tuple

Query thật thường vừa lọc vừa sắp:

```sql
WHERE tenant_id = 42
  AND status = 'Paid'
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

Một **composite index** (Index ghép) có thể là:

```sql
(tenant_id, status, created_at DESC, id DESC)
```

Nó được sắp theo tuple, không phải mỗi cột được sắp độc lập. Hãy đọc như: tenant trước; trong tenant là status; trong cặp tenant/status là `created_at` mới nhất; cuối cùng là `id`. Vì vậy equality ở `tenant_id` và `status` có thể đưa database vào một vùng liên tiếp, phần sau đã đúng thứ tự để `LIMIT 20` dừng sớm.

{{INDEX_VISUAL:composite}}

Chuyển sang query chỉ có `created_at`. Khi thiếu leading key `tenant_id`, database không có điểm bắt đầu trực tiếp cho một range liên tiếp theo thứ tự tuple trên. Đây là reason, không phải câu thần chú “left-most prefix”.

:::must-remember
Index `(tenant_id, status, created_at, id)` có thể tốt cho đúng query shape trên. Nó không tự là Index tốt cho mọi query có nhắc một trong bốn cột.
:::

## Planner dự đoán trước, database quan sát sau

Trước khi query chạy, **planner** (còn gọi optimizer) so sánh các access path. Nó chưa biết kết quả thật, nên phải estimate số row và cost.

**Cardinality estimate** là số row planner dự đoán một bước sẽ tạo ra. **Selectivity** nói predicate loại được bao nhiêu row: `order_id = 123` thường thu hẹp mạnh; `status = 'Paid'` có thể giữ lại rất nhiều row. Đây là input cho cost, không phải luật “selectivity cao thì luôn dùng Index”.

Planner dùng **statistics**: bản tóm tắt distribution dữ liệu, được PostgreSQL cập nhật qua `ANALYZE`. Statistics không chứa từng row và không ép planner chọn Index. Sau bulk load hoặc distribution đổi mạnh, `ANALYZE` cho planner một estimate tốt hơn.

{{INDEX_VISUAL:planner}}

Visual này tách hai câu hỏi: selectivity là predicate giữ lại bao nhiêu data; estimate accuracy là planner đoán row count gần actual đến đâu. Chỉ sau đó mới dùng estimate để so cost/candidate plan. Khi estimate và actual lệch lớn, đó là hypothesis cần điều tra statistics/correlation/data shape, chưa phải kết luận “planner sai”.

## Execution plan: đọc theo data flow

`EXPLAIN` cho biết strategy planner dự định dùng. `EXPLAIN (ANALYZE, BUFFERS)` chạy query thật, cho actual rows/timing và buffer activity.

Đừng đọc mọi field một lúc. Đọc theo thứ tự:

1. **Scan:** `Seq Scan` là đọc table lần lượt; `Index Scan` đi từ Index tới candidate range.
2. **Điều kiện:** `Index Cond` và `Filter` là qualifier/evidence nằm trên scan node: `Index Cond` dùng để vào range; `Filter` kiểm sau khi row đã tới scan node. Chúng không phải plan node độc lập.
3. **Rows:** estimate là dự đoán; actual là quan sát. Mismatch là điểm bắt đầu debug.
4. **Sort:** xuất hiện khi access path chưa cho output đúng thứ tự.
5. **Buffers:** page/buffer database đã chạm; diễn giải cùng scan type và rows.
6. **Time:** nhìn sau cùng; timing đổi theo cache và load, plan shape/relative change thường dễ so hơn.

`Bitmap Index Scan`/`Bitmap Heap Scan` là note senior: planner có thể gom nhiều Index match rồi đọc table theo nhóm page. Nó là một access path khác, không tự tốt hoặc xấu.

{{INDEX_VISUAL:plan}}

Visual cho phép đổi baseline và index flow, rồi reveal từng lớp: scan, condition, estimate, actual, sort, buffers, time. Nó cho thấy **row/data flow** thay vì chỉ xếp các box của plan.

## Lab PostgreSQL: predict → run → inspect → learn

:::hands-on
Đây là **local simulation**. Docker/PostgreSQL chạy trên máy bạn, không kết nối production. Version, cache state và cost model có thể làm outcome khác nhau; ghi evidence trước khi kết luận.
:::

### Setup Windows-friendly

Bạn cần Docker Desktop và cổng `5432` còn trống.

```powershell
docker run --name quannet-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=quannet_lab -p 5432:5432 -d postgres:17
docker exec quannet-postgres pg_isready -U postgres -d quannet_lab
docker exec -it quannet-postgres psql -U postgres -d quannet_lab
```

Dừng lab bằng `docker stop quannet-postgres`. Chỉ dùng `docker rm -f quannet-postgres` khi muốn xóa container và lab data.

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
SELECT ((g - 1) % 200) + 1, ((g * 37) % 50000) + 1,
  CASE WHEN ((g / 200) % 20) = 0 THEN 'Pending'
       WHEN ((g / 200) % 5) = 0 THEN 'Shipped' ELSE 'Paid' END,
  now() - ((g * 53 % 300000) * interval '1 second'),
  (g % 5000)::numeric / 10
FROM generate_series(1, 300000) AS g;
ANALYZE orders;
```

### Experiment 1 — baseline

**Question:** chưa có secondary Index, database làm gì để lấy 20 đơn của tenant 42/Paid mới nhất?

**Predict:** tenant 42 chỉ là một phần table, nhưng output cần newest-first nên plan có thể `Seq Scan → Sort → Limit`.

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, created_at, total
FROM orders
WHERE tenant_id = 42 AND status = 'Paid'
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

**Inspect:** scan type; `Filter`; `Sort`; estimated/actual rows; buffers; total time.

**Outcome:** `Seq Scan` + `Sort` là một outcome hợp lý, không phải đáp án bắt buộc trên mọi máy.

**Why / Learn:** không có access path khớp query shape, database có thể phải inspect nhiều row rồi sort. Ghi output vào worksheet trước khi nhận xét.

### Experiment 2 — chỉ đổi access path

**Question:** Index ghép có tạo candidate range và giữ order không?

**Predict:** `Index Cond` dùng tenant/status, `Sort` có thể biến mất.

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

**Inspect:** `Index Scan` hay bitmap/seq path? `Index Cond`? `Sort`? rows/buffers/time so với baseline?

**Learn:** Index path và không Sort khớp mental model. Bitmap hoặc Seq Scan vẫn có thể hợp lý; nhìn total cost, rows, pages và distribution trước khi ép plan.

### Experiment 3 — Break A: phá selectivity

**Question:** nếu mọi row tenant 42 là Paid, predicate `status` còn thu hẹp được gì?

**Predict:** status không giảm range bên trong tenant 42; `ORDER BY ... LIMIT` vẫn có thể làm Index path đáng giá.

```sql
UPDATE orders SET status = 'Paid' WHERE tenant_id = 42;
ANALYZE orders;
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, created_at, total FROM orders
WHERE tenant_id = 42 AND status = 'Paid'
ORDER BY created_at DESC, id DESC LIMIT 20;
```

**Why / Learn:** không dùng shortcut “selectivity thấp thì chắc Seq Scan”. Planner so tổng work, gồm range, order, `LIMIT`, page cost và estimate.

### Experiment 4 — Break B: phá query shape

**Question:** bỏ `tenant_id`/`status`, Index hiện tại còn cho điểm bắt đầu trực tiếp không?

**Predict:** không; leading key bị thiếu nên `created_at` không tạo contiguous range theo tuple đó.

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, created_at, total FROM orders
WHERE created_at > now() - interval '1 day'
ORDER BY created_at DESC, id DESC LIMIT 20;
```

**Why / Learn:** Index vẫn tồn tại nhưng có thể không phù hợp query shape. Đừng thêm Index mới trước khi biết frequency, write volume, plan hiện tại và SLO.

### Evidence worksheet

| Experiment | Prediction | Actual plan shape | Estimate vs actual | Buffers/time | What changed? |
|---|---|---|---|---|---|
| Baseline |  |  |  |  |  |
| Composite Index |  |  |  |  |  |
| Break A |  |  |  |  |  |
| Break B |  |  |  |  |  |

## Khi plan ngược dự đoán

**Observation:** plan/rows/buffers khác prediction.
**Hypothesis:** query shape, distribution, statistics, cache state hoặc cost model khác assumption.
**Evidence:** `Index Cond`, `Filter`, estimate/actual, `Sort`, buffers, distribution query.
**Experiment:** `ANALYZE`, đổi một predicate trên test data, chạy lại.
**Conclusion:** giữ, sửa hoặc bỏ candidate Index; không ép plan trong production chỉ để thắng benchmark.

## Production case: điều tra theo staged disclosure

**Symptom:** Orders API trả 20 row, p95 tăng 80 ms → 1.8 s.
**Known facts:** DB CPU 35%; plan hiện tại `Seq Scan → Sort`; khoảng 1.8M row considered, 20 row returned.
**Unknown:** frequency, tenant/status distribution, write rate, buffers/cache state, estimate accuracy và SLO.
**Hypotheses:** query shape thiếu access path; data distribution làm estimate sai; hoặc bottleneck không nằm ở DB read.
**Evidence cần lấy:** SQL/parameter thật, `EXPLAIN (ANALYZE, BUFFERS)`, p95 (95% request không chậm hơn mốc này), rows, buffers, write rate.
**Decision:** thử candidate Index trên data gần production, đo read benefit và write impact.

Nếu rollout: **canary** là chỉ áp dụng cho một phần traffic/workload để quan sát trước; **rollback** là đường quay về release/schema an toàn nếu metric xấu. Không thêm Redis chỉ vì endpoint chậm: cache là candidate sau khi đã hiểu access path và correctness/invalidation requirement.

## Senior trade-off

Mỗi `INSERT`, `UPDATE`, `DELETE` liên quan phải cập nhật Index; đó là write overhead cụ thể. Index cũng dùng storage và có thể tăng cache pressure. Covering Index hoặc thêm cột chỉ đáng cân nhắc khi evidence read benefit bù được write/storage cost.

Không dùng Index khi chưa có query shape/evidence; không giữ duplicate Index không còn traffic; không nói “Index luôn nhanh hơn”; không ép planner bằng hint workaround thay cho điều tra cause.

## Transfer challenge

Table `orders` có 30M row. Query lọc `customer_id`, `status IN ('Paid','Shipped')`, sort newest, lấy 20 row. Bạn chưa biết distribution, frequency, write volume hay plan.

Trả lời trước: **Bạn cần biết gì, vì sao nó ảnh hưởng decision, và sẽ lấy evidence ở đâu?**

Checklist sau khi bạn trả lời:

- có SQL/parameter và `EXPLAIN (ANALYZE, BUFFERS)` trên data representative;
- biết estimated/actual rows, distribution và query frequency;
- biết write rate/storage budget/SLO;
- có candidate Index để test nhưng chưa hứa deploy;
- xem keyset pagination nếu page rất sâu.

Model answer: “Em cần estimate/actual rows và distribution vì candidate range phụ thuộc selectivity thực. Em lấy plan có buffers với parameter representative, đối chiếu query frequency và write rate, rồi thử Index candidate trên data gần production trước khi canary.”

## Explain it back

Hãy tự trả lời trong 60–120 giây: Index là gì, mechanism nào giảm work, evidence nào bạn đọc trong plan, và trade-off nào bạn phải đo?

Sau khi nói xong, tự check: có nhắc access path, ordered candidate range, estimate/actual rows, `Sort`/buffers, write/storage cost và điều kiện “không luôn dùng Index” chưa?

Model answer: “Index là cấu trúc phụ có key theo thứ tự để database có thêm access path, đi gần candidate range thay vì luôn scan cả table. Với query tenant/status lấy 20 row mới nhất, Index ghép có thể vừa thu hẹp range vừa có sẵn order nên bớt sort và dừng sớm. Em xem scan type, `Index Cond`/`Filter`, estimate so với actual rows, buffers và timing. Em cũng đo write rate/storage vì Index phải được cập nhật khi dữ liệu đổi.”

## Final recall

1. Khi nào table scan lại hợp lý hơn Index path?
2. Index giảm work gì, và nó không hứa điều gì?
3. Vì sao `(tenant_id, status, created_at, id)` không cho direct range khi chỉ có `created_at`?
4. `Index Cond` khác `Filter` thế nào?
5. Estimate/actual mismatch dẫn bạn tới hypothesis nào?
6. Write overhead của Index đến từ đâu?

Tóm tắt: ordered key giúp loại range; composite Index theo tuple; planner dự đoán từ statistics; plan là evidence; quyết định Index là read benefit đổi lấy write/storage cost.

## Continue

- Reference: [SQL, Index, transaction và locking](/docs/sql-index-locking)
- Quiz: [Tình huống execution plan](/quiz?topic=EF%20Core%20v%C3%A0%20SQL)
- Interview: [Lost update và database boundary](/interview?question=sql-lost-update)
