# Golden Learning Lab: Database Index & Execution Plan

:::learning-goal
Sau bài này, bạn không chỉ nói “index làm query nhanh hơn”. Bạn sẽ mô tả được database đã bớt làm công việc gì, đọc evidence trong `EXPLAIN`, và biết lúc nào chưa đủ dữ kiện để đề xuất index.
:::

## Trước khi bắt đầu: bạn cần biết gì?

Bạn chỉ cần biết table, row, column, `SELECT`, `WHERE` và `ORDER BY`. Bạn **không** cần biết trước B-tree, optimizer, execution plan, selectivity hay cardinality. Các khái niệm đó được xây lần lượt trong bài này.

## Một vấn đề thật: 20 đơn hàng nhưng endpoint chậm

Trang lịch sử đơn hàng chỉ trả 20 đơn mới nhất của một tenant. Khi `orders` còn nhỏ, query ổn. Khi table lớn, p95 tăng từ 80 ms lên 1.8 s dù DB CPU chưa bão hòa. Có người đề nghị thêm Redis ngay.

Khoan chọn giải pháp. Câu hỏi đầu tiên là: **database đang phải làm bao nhiêu work để tìm 20 row đó?** Nếu nó đọc rất nhiều row rồi mới lọc và sort, cache không giải thích được cơ chế gốc.

## Bắt đầu bằng table scan nhỏ

Giả sử có 12 row đơn hàng. Để tìm `tenant_id = 42`, cách đơn giản nhất là nhìn từng row, giữ lại row đúng rồi bỏ phần còn lại. Đó là **table scan**: database đi lần lượt qua table vì chưa có đường đi tốt hơn.

Table scan không phải lỗi. Nếu table rất nhỏ, hoặc query cần phần lớn row, đi thẳng qua table có thể rẻ hơn việc vòng qua một cấu trúc khác. Nhưng nếu table có hàng triệu row mà ta chỉ cần một nhóm nhỏ, kiểm tra từng row là nhiều work không cần thiết.

{{INDEX_VISUAL:scan}}

Visual trên dùng dữ liệu nhỏ để bạn thấy điều bị loại: index không làm row biến mất; nó giúp database đến gần nhóm row cần xét trước.

## Index là gì, và không phải là gì?

Index là một cấu trúc dữ liệu phụ do database duy trì. Nó giữ giá trị của một hay nhiều cột theo thứ tự, kèm thông tin để database tìm row phù hợp. Nó giống mục lục của sách: mục lục không thay nội dung sách, nhưng giúp bạn không phải lật từ trang 1.

Vì sao index tồn tại? Một query có thể lấy cùng dữ liệu bằng nhiều cách. Có thể đọc cả table rồi lọc, hoặc dùng một cấu trúc đã sắp để đi vào vùng có khả năng chứa dữ liệu cần tìm. Con đường database chọn để lấy dữ liệu gọi là **access path**.

Index không phải công tắc “bật lên là nhanh”. Nó chỉ tạo thêm một access path. Planner sẽ chọn nó khi dự đoán tổng cost của đường đó hợp lý hơn scan table.

### Dừng lại và tự nói

Không nhìn lại đoạn trên, hãy nói một câu: index giúp database bớt làm work gì? Nếu câu trả lời chỉ là “nhanh hơn”, hãy quay lại visual scan-vs-lookup và chỉ ra các row bị loại.

## Vì sao key có thứ tự lại giúp tìm nhanh hơn?

Nếu danh sách tenant được xếp lộn xộn, thấy số 42 ở đâu ta phải kiểm tra từng chỗ. Nếu danh sách được giữ theo thứ tự, một mốc như “1–30” cho phép kết luận ngay 42 không ở trong đó. Thứ tự cho phép **loại bỏ** phần không thể đúng.

Một B-tree là cấu trúc index phổ biến dùng ý tưởng này. Nó tổ chức key thành nhiều node. Node trên cho biết mỗi nhánh bao phủ khoảng key nào; node dưới thu hẹp dần; leaf chứa entry theo thứ tự. Đây là mental model đơn giản hóa, không phải sơ đồ nội bộ chính xác từng byte của PostgreSQL.

{{INDEX_VISUAL:btree}}

Trong visual, trước khi chọn đáp án hãy dự đoán 42 thuộc khoảng nào. Sau đó dùng `Next step`. Mỗi bước trả lời ba câu: database biết gì, nhánh nào bị loại, vì sao theo nhánh còn lại. Điều quan trọng không phải nhớ hình cây mà là hiểu: **thứ tự key cho phép loại work trước khi đọc candidate entries**.

## Từ một cột đến composite index

Query thật không chỉ có tenant. Nó cần:

```sql
WHERE tenant_id = 42
  AND status = 'Paid'
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

Ta có thể tạo **composite index** (index ghép) gồm nhiều cột:

```sql
(tenant_id, status, created_at DESC, id DESC)
```

Nó không được sắp độc lập theo từng cột. Thứ tự khái niệm là: tất cả tenant trước; bên trong một tenant là status; bên trong một cặp tenant/status là thời gian mới nhất trước, rồi id. Vì vậy query trên có thể vào vùng `42 → Paid`, đọc row đã theo newest-first, rồi dừng khi đủ 20 row.

Đó là **query shape**: những điều kiện lọc, thứ tự trả về và số row cần lấy cùng nhau quyết định access path có ích hay không.

{{INDEX_VISUAL:composite}}

Không nên học thành câu thần chú “left-most prefix”; trong visual composite, đổi sang query chỉ lọc `created_at`. Database không còn biết tenant/status ở đầu key là gì, nên không thể vào tree theo cách targeted cũ.

:::must-remember
Index `(tenant_id, status, created_at, id)` có thể hợp với query lọc tenant + status, sort newest và có `LIMIT`. Nó không tự trở thành index tốt cho mọi query có nhắc đến một trong bốn cột.
:::

## Database quyết định bằng gì?

Trước khi chạy query, PostgreSQL phải chọn strategy. Thành phần làm việc này thường được gọi là **planner** hoặc **optimizer**. Nó không biết kết quả thật trước khi query chạy, nên phải dự đoán row mỗi bước sẽ tạo ra bao nhiêu và cost của mỗi access path.

Dự đoán số row đó là **cardinality estimate**. Ví dụ: planner có thể đoán filter còn 100 row, nhưng thực tế còn 100,000. Sai lệch lớn làm cost của scan, sort hoặc index path bị so sánh trên giả định sai.

Planner dùng **statistics**: bản tóm tắt về distribution dữ liệu mà PostgreSQL thu thập khi `ANALYZE`. Statistics không phải dữ liệu thật từng row; nó là dữ liệu để estimate. Sau khi bulk load hoặc distribution đổi mạnh, chạy `ANALYZE` giúp planner có thông tin mới. Nó không bắt buộc index phải được chọn.

**Selectivity** trả lời filter loại được bao nhiêu row. Với 1,000,000 orders, `status = 'Paid'` trả 800,000 row thì selectivity thấp: filter bỏ được ít. `order_id = 123` trả 1 row thì selectivity cao: filter bỏ được gần hết. Điều này ảnh hưởng cost, nhưng không phải luật duy nhất; `ORDER BY`, `LIMIT`, cache state và cost settings cũng góp phần.

## Execution plan: xem database thực sự đã làm gì

Ta cần evidence thay vì đoán. PostgreSQL có `EXPLAIN` để cho biết strategy dự định dùng. Thêm `ANALYZE` để query chạy thật và hiển thị actual rows/timing. Thêm `BUFFERS` để thấy các buffer database đã chạm.

Đừng đọc tất cả field một lúc. Mở visual execution plan phía trên và chọn từng node theo thứ tự sau:

1. **Scan type:** `Seq Scan` nghĩa là đọc table lần lượt; `Index Scan` nghĩa là đi qua index. `Bitmap Scan` có thể xuất hiện khi planner gom nhiều index match rồi đọc table theo nhóm page; đây không tự tốt hay xấu.
2. **Filter / Index Cond:** `Filter` là điều kiện kiểm sau khi row đã tới node. `Index Cond` là điều kiện dùng để vào candidate range trong index.
3. **estimated rows / actual rows:** estimate là dự đoán trước khi chạy; actual là quan sát khi chạy. Mismatch lớn là một hypothesis về statistics hoặc correlation dữ liệu, không phải kết luận ngay.
4. **Sort:** xuất hiện khi access path không đã có thứ tự output cần thiết.
5. **Buffers:** cho biết lượng buffer được đọc/hit. Đây là dấu hiệu work; diễn giải cùng scan type và rows.
6. **execution time:** nhìn cuối cùng. Timing khác theo laptop, cache và load; plan shape và relative change thường đáng tin hơn một con số.

| Mental model | Evidence thật trong plan |
|---|---|
| candidate range | `Index Cond` |
| row trả ra khỏi một bước | `actual rows` |
| phải sắp lại | `Sort` node |
| dữ liệu database chạm | `Buffers` |

{{INDEX_VISUAL:plan}}

## Lab PostgreSQL: hỏi trước, chạy sau

:::hands-on
Đây là **local simulation**. Docker/PostgreSQL chỉ chạy trên máy bạn, không kết nối production. Lab có nhiều outcome hợp lệ; mục tiêu là reasoning từ evidence.
:::

### Setup Windows-friendly

Bạn cần Docker Desktop chạy được và cổng `5432` chưa bị dùng. Lệnh này dùng Docker Official Image `postgres:17` theo major tag; patch version có thể thay đổi theo thời gian.

```powershell
docker run --name quannet-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=quannet_lab -p 5432:5432 -d postgres:17
docker exec quannet-postgres pg_isready -U postgres -d quannet_lab
docker exec -it quannet-postgres psql -U postgres -d quannet_lab
```

Khi xong, dừng bằng `docker stop quannet-postgres`. Chỉ dùng `docker rm -f quannet-postgres` khi muốn xóa cả container và lab data.

### Experiment 1 — baseline: database đang làm gì?

**Question:** chưa có secondary index, query phải đọc/sort phần nào?
**Predict:** tenant 42 có khoảng 1/200 row; `status` giữ lại phần `Paid`. Nhưng row result chưa tự có newest-first, nên có thể có `Sort`.

Chạy block này trong `psql`:

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
  ((g * 37) % 50000) + 1,
  CASE
    WHEN ((g / 200) % 20) = 0 THEN 'Pending'
    WHEN ((g / 200) % 5) = 0 THEN 'Shipped'
    ELSE 'Paid'
  END,
  now() - ((g * 53 % 300000) * interval '1 second'),
  (g % 5000)::numeric / 10
FROM generate_series(1, 300000) AS g;

ANALYZE orders;

SELECT tenant_id, status, count(*)
FROM orders
WHERE tenant_id = 42
GROUP BY tenant_id, status
ORDER BY status;
```

Dataset deterministic nhưng tạo `tenant_id`, `customer_id`, `status`, `created_at` bằng biểu thức khác nhau. Tenant 42 phải có nhiều status trước experiment selectivity.

Chạy query đo:

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, created_at, total
FROM orders
WHERE tenant_id = 42 AND status = 'Paid'
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

**Inspect theo thứ tự:** node trên cùng → `Seq Scan` hay `Index Scan` → `Filter` → có `Sort` không → estimated/actual rows → buffers → timing.
**Interpret:** baseline thường có scan và sort. Nếu laptop cho plan khác, ghi plan shape và tiếp tục; đó là observation để giải thích, không phải lab fail.
**Next question:** nếu có index khớp cả filter lẫn order, work nào có thể biến mất?

### Experiment 2 — thay đúng một thứ: access path

**Question:** index ghép có cho candidate range và order phù hợp không?
**Predict:** `Index Cond` có thể dùng tenant/status; `Sort` có thể biến mất vì `created_at DESC, id DESC` nằm sau equality filters.

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

**Inspect:** so với baseline, scan type là gì? `Index Cond` có xuất hiện không? `Sort` còn không? estimated/actual rows và buffers đổi thế nào?
**Interpret case A:** `Index Scan` và không `Sort` khớp mental model candidate range + ordered read.
**Interpret case B:** `Bitmap Scan` có thể hợp lý nếu planner muốn gom nhiều match theo page rồi đọc table hiệu quả.
**Interpret case C:** `Seq Scan` vẫn có thể đúng nếu estimate/cost cho thấy scan rẻ hơn trong environment đó. So statistics, row count, distribution và buffers trước khi ép plan.

### Experiment 3 — phá assumption selectivity

**Question:** nếu mọi row của tenant 42 đều là `Paid`, status còn thu hẹp range bên trong tenant này không?
**Predict:** nó không còn loại được row trong tenant 42; nhưng `ORDER BY ... LIMIT` vẫn có thể khiến index path hữu ích.

```sql
UPDATE orders SET status = 'Paid' WHERE tenant_id = 42;
ANALYZE orders;

SELECT tenant_id, status, count(*)
FROM orders
WHERE tenant_id = 42
GROUP BY tenant_id, status;

EXPLAIN (ANALYZE, BUFFERS)
SELECT id, created_at, total
FROM orders
WHERE tenant_id = 42 AND status = 'Paid'
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

**Interpret:** đừng kết luận “selectivity thấp thì chắc Seq Scan”. So candidate range, order và limit. Planner đang so tổng cost, không chấm điểm riêng cho một điều kiện.

### Experiment 4 — phá query shape

:::example
**Stop & Predict:** bỏ `tenant_id` và `status` khỏi query, index hiện tại còn đưa database vào một range nhỏ theo cách cũ không? Hãy trả lời trước khi chạy.
:::

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, created_at, total
FROM orders
WHERE created_at > now() - interval '1 day'
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

**Interpret:** index vẫn tồn tại, nhưng không có useful prefix cho query này. Nếu xuất hiện scan/sort, nối lại visual composite: database không bắt đầu được từ `created_at` trong key ghép kia. Đừng vội thêm index mới; hỏi write volume, frequency, current plan và SLO trước.

## Khi plan ngược dự đoán: debug như một engineer

:::debug
**Observation** → plan/rows/buffers khác prediction.
**Hypothesis** → query shape, selectivity, estimate hoặc cache/cost đang khác điều bạn giả định.
**Evidence** → `Index Cond`, `Filter`, estimated vs actual rows, `Sort`, buffers, distribution query.
**Experiment** → `ANALYZE`, đổi một predicate, chạy lại trên test data; không ép plan trong production chỉ để “thắng” benchmark.
**Conclusion** → giữ, sửa hoặc bỏ candidate index theo evidence và write cost.
:::

## Senior layer: index đổi trade-off nào?

Index có thể giảm read work cho một query shape. Đổi lại, mỗi `INSERT`, `UPDATE` hoặc `DELETE` liên quan phải duy trì index; index chiếm storage và có thể tăng cache pressure. Một index covering hoặc thêm cột chỉ đáng cân nhắc khi plan/evidence cho thấy lợi ích read bù được write/storage cost.

Production validation nên bắt đầu bằng symptom và evidence: p95/p99 endpoint, query frequency, rows/buffers, DB CPU/IO, plan shape, write rate và rollback path. “Add Redis” chỉ là candidate sau khi biết bottleneck có phải database read hay không.

## Production investigation

Orders API trả 20 row, p95 tăng 80 ms → 1.8 s. DB CPU 35%. Team đề xuất Redis. Plan cho thấy `Seq Scan → Sort`, 1.8M row inspected và 20 row returned.

Trước khi xem gợi ý, hãy viết: symptom nào đã chứng minh, query shape nào cần lấy, và evidence nào sẽ làm bạn **không** thêm index.

Một investigation hợp lý: lấy SQL/parameter thật, so estimate/actual rows và buffers, kiểm distribution theo tenant/status, thử index candidate trên production-like data, đo write impact, canary và giữ rollback. Cache có thể giảm read sau đó, nhưng không thay việc hiểu access path đang tốn work ở đâu.

## Transfer challenge: được phép nói “chưa đủ thông tin”

Table `orders` có 30M row. Query lọc `customer_id`, `status IN ('Paid','Shipped')`, sort newest và lấy 20. Bạn chưa biết distribution, frequency, write volume hay plan hiện tại.

Trả lời theo mẫu: **“Tôi cần X, vì X ảnh hưởng Y; tôi sẽ kiểm tra Z.”** Ví dụ: cần estimate/actual rows, vì candidate index phụ thuộc selectivity thực; sẽ lấy `EXPLAIN (ANALYZE, BUFFERS)` trên dữ liệu representative. Nêu thêm một candidate index để test, nhưng không khẳng định deploy trước evidence. Nếu page 50,000 chậm, giải thích vì sao keyset pagination là hypothesis cần kiểm hơn là chỉ thêm index.

## Explain it back

### Vietnamese, 60–120 giây

“Index là cấu trúc phụ được database giữ theo thứ tự để có thể đi tới vùng row có khả năng phù hợp, thay vì luôn scan cả table. Với query lọc tenant và status rồi lấy 20 đơn mới nhất, index ghép có thể vừa tạo candidate range vừa giữ sẵn thứ tự, nên bớt sort và dừng sớm. Em không giả định index luôn được chọn; em xem execution plan, estimate/actual rows và buffers. Đổi lại index có write/storage cost, nên em đo query frequency, write rate và canary trước khi rollout.”

### Technical English

- An index gives the database another access path; it is not a guaranteed speed switch.
- Ordered keys let the engine eliminate ranges that cannot contain the target.
- I compare the estimated rows, actual rows, scan type, sort and buffers before judging a plan.
- The trade-off is write maintenance, storage and possible cache pressure.

## Final recall

:::final-recall
1. Index helps by eliminating impossible ranges; it does not make data disappear.
2. Composite key order must match the query shape you need to support.
3. `EXPLAIN` is evidence: scan type → conditions → rows → sort → buffers → timing.
4. Different plan is a question to investigate, not proof that the lab or index failed.
5. A senior answer includes read benefit **and** write/storage trade-off.
:::

## Continue

- Reference: [SQL, index, transaction và locking](/docs/sql-index-locking)
- Quiz: [Tình huống execution plan](/quiz?topic=SQL%20v%C3%A0%20EF%20Core)
- Interview: [Lost update và database boundary](/interview?question=sql-lost-update)
