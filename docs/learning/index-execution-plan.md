# Index & Execution Plan

:::learning-goal
Bạn đã biết `SELECT`, `WHERE` và `ORDER BY`. Sau bài này, bạn có thể tự giải thích: vì sao database không thể cứ kiểm từng row mãi; shortcut có thứ tự giúp giảm work ra sao; vì sao query nhiều điều kiện cần một thứ tự rõ ràng; và evidence nào cần nhìn trước khi đề xuất thay đổi cho query.
:::

## Câu hỏi đầu tiên: tìm vài đơn hàng trong rất nhiều đơn thế nào?

Giả sử API cần trả về các đơn `Paid` mới nhất của tenant 42. Database có table `orders`; mỗi **row** là một đơn hàng.

Lúc table chỉ có 12 row, cách đơn giản nhất rất ổn: đọc từng row, kiểm `tenant_id`, kiểm `status`, rồi giữ những row đúng. Chưa có shortcut nào cả.

```text
row 01 → không phải tenant 42 → bỏ
row 02 → tenant 42, Paid → giữ
row 03 → không phải tenant 42 → bỏ
…
row 12 → kiểm tiếp
```

Hãy đoán trước: với 12 row, có đáng xây thêm cấu trúc phụ chỉ để tìm vài row không? Thường là không. **Quét lần lượt** dễ hiểu, ít overhead và có thể là lựa chọn rẻ nhất.

PostgreSQL gọi kiểu quét này là `Seq Scan` (sequential scan). Cái tên quan trọng ít hơn cơ chế: không có lối tắt, nên database kiểm row theo thứ tự table.

## Khi cách đơn giản bắt đầu đắt


Cùng cách quét đó hoạt động thế nào khi số row tăng?

| Số row trong `orders` | Nếu chưa có shortcut, database có thể phải làm gì để tìm row ở gần cuối? |
|---|---|
| 12 | kiểm một ít row, thường không đáng lo |
| 1,000 | kiểm rất nhiều row dù chỉ trả vài row |
| 1,000,000 | có thể xét gần như cả table chỉ để tìm một nhóm nhỏ |

Điều làm ta khó chịu không phải “table lớn” một cách mơ hồ. Đó là **work không cần thiết**: nhiều row chắc chắn không liên quan vẫn bị đem ra kiểm.

Vậy property mới ta cần là gì? Ta cần biết **nên bắt đầu tìm ở vùng nào**, thay vì luôn đi từ row đầu tiên.

## Tự tạo ra ý tưởng của Index

Nếu tự thiết kế shortcut cho một cuốn sổ đơn hàng, bạn có thể tách riêng `tenant_id` ra một danh sách. Danh sách đó không thay nội dung đơn hàng; nó chỉ nói “key này có đơn ở khu vực nào”. Nếu giữ danh sách **theo thứ tự**, ta có thể bỏ qua cả khoảng không thể chứa key cần tìm.

Đây là lúc tên kỹ thuật xuất hiện: **Index** là cấu trúc phụ mà database duy trì, giữ key theo thứ tự và thông tin để đi tới những row có khả năng khớp. Row có khả năng khớp được gọi ngắn là *candidate row*.

Ví dụ sách có mục lục “Index → trang”; database có “key → candidate row/location”. Ví dụ sách giúp thấy điểm bắt đầu, nhưng không thay cơ chế database: database vẫn có thể phải kiểm thêm điều kiện hoặc đọc row thật sau khi đi qua Index.

Một **access path** là đường database dùng để lấy row. `Seq Scan` là một access path; đi qua Index là một access path khác. Index mở thêm một đường, chứ không hứa database luôn dùng đường đó.

{{INDEX_VISUAL:scan}}

Quay lại 12 row trong visual. So sánh hai đường: quét table xét cả 12 row; shortcut theo tenant đi thẳng tới nhóm tenant 42, nhưng vẫn phải kiểm `status`. Visual chỉ đếm work trên row, không giả lập page hay I/O production.

:::must-remember
Index không phải nút “làm query nhanh”. Nó đổi câu hỏi từ “đọc mọi row?” thành “có thể đi gần đúng vùng row cần tìm không?”, đổi lại database phải duy trì thêm cấu trúc đó khi dữ liệu thay đổi.
:::

## Thứ tự loại range như thế nào?

Với key đã sắp 1–90, muốn tìm 42, ta không cần kiểm các range 1–30 và 61–90. Chỉ range 31–60 còn khả năng đúng. Đây là **range elimination**: dùng thứ tự để loại phần không thể khớp trước khi đọc candidate entry.

Nhưng một danh sách sắp thứ tự chứa hàng triệu key vẫn không nên bị xem như một mảnh nhỏ trong memory. Database lưu/đọc dữ liệu thành các khối; ở PostgreSQL, khối như vậy gọi là **page**. Ta chưa cần học storage internals — chỉ cần thấy một page chứa nhiều entry, và database muốn tránh mở quá nhiều page vô ích.

Ta lại có một nhu cầu mới: thay vì lướt một danh sách key khổng lồ, cần vài tầng chỉ đường để chọn đúng vùng lớn trước, rồi thu hẹp dần.

## Vì sao B-tree xuất hiện ở đây?

**B-tree** là cách phổ biến để tổ chức index có thứ tự thành nhiều tầng. Nó không phải binary tree hai nhánh. Trong mental model này:

- **root** là điểm chỉ đường đầu tiên;
- node ở giữa tiếp tục chia range;
- **leaf** là tầng cuối chứa các entry đã sắp, từ đó database xét candidate entry/row.

B-tree tồn tại để trả lời một câu cụ thể: *làm sao loại rất nhiều range mà không quét một danh sách key lớn từ đầu đến cuối?*

{{INDEX_VISUAL:btree}}

Trước khi bấm reveal, chọn range có thể chứa 42. Sau trace, tự trả lời: **những range nào ta chưa hề cần inspect?** Đó là lợi ích cần nhớ. SVG là mô hình dạy học, không phải layout byte-level của PostgreSQL; connector biểu diễn đường đi qua range.

## Một query thật đặt ra vấn đề mới

Shortcut theo một key là chưa đủ cho nhiều API. Endpoint của chúng ta cần:

```sql
SELECT id, created_at, total
FROM orders
WHERE tenant_id = 42
  AND status = 'Paid'
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

Ta không chỉ cần tenant 42. Ta cần các đơn `Paid`, theo thứ tự mới nhất trước, và dừng khi đủ 20 row.

Nếu một index giữ nhiều field, nên sắp chúng thế nào để câu query này không phải quay lại sort quá nhiều? Câu trả lời có tên là **composite index** (hay multicolumn index): index có nhiều key column, ví dụ:

```sql
CREATE INDEX ix_orders_tenant_status_created
ON orders (tenant_id, status, created_at DESC, id DESC);
```

Đừng học thuộc tên “left-most prefix” ở đây. Hãy đọc tuple theo thứ tự thật:

```text
tenant_id trước
→ bên trong mỗi tenant, status
→ bên trong tenant/status, created_at mới nhất trước
→ nếu thời gian trùng, id mới hơn trước
```

{{INDEX_VISUAL:composite}}

Với `tenant_id = 42` và `status = 'Paid'`, các tuple đúng nằm cạnh nhau; phần `created_at DESC, id DESC` trong vùng đó đã có thứ tự nên `LIMIT 20` có thể dừng sớm. Chuyển visual sang “created_at only”: vì dữ liệu được nhóm theo tenant rồi status trước, `created_at` của toàn bộ table không tạo một vùng liên tiếp trực tiếp trong index này.

:::comparison
Câu hỏi quyết định: index này có khớp **query shape** không? `(tenant_id, status, created_at, id)` có thể rất hợp cho query ở trên, nhưng không tự là index tốt cho mọi query nhắc một trong bốn cột. PostgreSQL có quy tắc chi tiết cho multicolumn B-tree; điểm khởi đầu an toàn là hiểu thứ tự tuple và kiểm plan thật.
:::

## Có Index rồi, database nên luôn dùng nó chứ?

Chưa chắc. Nếu query cần gần hết table, việc đi qua Index rồi quay lại lấy rất nhiều row có thể không đáng hơn đọc table tuần tự. Với query khác, `ORDER BY` + `LIMIT` có thể làm Index path đáng giá dù điều kiện lọc không hẹp. Database có ít nhất các lựa chọn gần nhau:

| Cùng trả lời câu hỏi “lấy row bằng đường nào?” | Trực giác dùng trong bài này |
|---|---|
| `Seq Scan` | đọc table lần lượt; thường hợp khi table nhỏ hoặc cần phần lớn row |
| `Index Scan` | dùng key có thứ tự để đi vào một vùng candidate |
| Bitmap path | gom match từ Index trước, rồi đọc table theo nhóm; đọc plan thấy thì nhận ra đây là một lựa chọn khác, chưa cần tối ưu nó trong bài này |

Vì không có lựa chọn nào luôn thắng, database phải chọn đường **trước khi** chạy query. Nó so sánh lượng work mà mỗi đường *có khả năng* cần làm. Bộ phận làm việc đó có tên **planner** (cũng hay gọi optimizer).

## Planner cần đoán điều gì trước khi chạy?

Planner không thể chạy toàn bộ query chỉ để chọn plan. Nó cần ước lượng: “sau điều kiện này, khoảng bao nhiêu row còn lại?” Đây là **row estimate**, hay `cardinality estimate` trong tài liệu kỹ thuật.

Ví dụ 1,000 đơn:

```text
status = 'Paid'  → khớp 820 đơn
order_id = 123   → khớp 1 đơn
```

Điều kiện nào thu hẹp dữ liệu hơn? `order_id = 123`. Property “điều kiện giữ lại ít hay nhiều phần dữ liệu” được gọi là **selectivity**. Selectivity mô tả query so với data; nó không nói planner đã đoán đúng hay sai.

Nhưng planner biết 820 hay 1 bằng cách nào khi chưa chạy query? Nó dùng **statistics**: phần tóm tắt về cách dữ liệu phân bố. PostgreSQL thu thập/cập nhật statistics bằng `ANALYZE`. Với table lớn, statistics dựa trên sample, nên estimate vẫn có thể lệch; đó là lý do để điều tra, không phải lời hứa rằng planner “biết chính xác”.

{{INDEX_VISUAL:planner}}

Visual tách hai câu hỏi để không bị lẫn:

1. `Paid = 82%` hay `Paid = 0.1%` — predicate giữ lại bao nhiêu row? Đó là selectivity.
2. 4,000 row dự đoán nhưng 82,000 row thực tế — planner đoán gần đúng đến đâu? Đó là estimate accuracy.

Label và số nằm ngoài bar; bar chỉ biểu diễn độ lớn tương đối. Khi estimate/actual lệch, bắt đầu bằng hypothesis về statistics và xem data/parameter thực tế có khác assumption không; chưa vội kết luận index hay planner sai.

## Bây giờ mới cần `EXPLAIN`

Ta đã có câu hỏi đúng: *database đã chọn access path nào, và vì sao?* `EXPLAIN` cho xem plan mà planner dự định dùng. Nó chưa chạy query để lấy actual result.

Khi cần biết điều gì thực sự xảy ra, dùng `EXPLAIN ANALYZE`: database chạy query và trả thêm actual rows/timing. Sau đó, nếu cần biết các khối dữ liệu database đã chạm, thêm `BUFFERS`. `BUFFERS` là evidence về page/buffer activity như `shared hit`/`read`; không phải thước đo tự động kết luận plan tốt hay xấu.

Đọc plan theo từng lớp, không mở tất cả field cùng lúc:

1. **Access path:** `Seq Scan`, `Index Scan` hay bitmap path?
2. **Điều kiện ở scan:** `Index Cond` là điều kiện dùng để đi vào range của Index; `Filter` là điều kiện còn kiểm khi row đã tới scan. Chúng là metadata/evidence gắn với scan node, không phải operator riêng.
3. **Thứ tự:** có `Sort` không? Nếu có, output từ access path chưa tự đúng thứ tự cần trả.
4. **Ước lượng và thực tế:** estimate khác actual rows bao xa?
5. **Đến cuối mới đọc thêm:** `BUFFERS`, rồi time, luôn đặt cạnh plan shape và workload.

{{INDEX_VISUAL:plan}}

Visual cho thấy row/data flow qua operator thật. `Filter`/`Index Cond` nằm trong scan node; `Sort`/`Limit` mới là operator trong flow. Hãy đổi Baseline/After Index và reveal từng layer trước khi tự giải thích plan.

## Lab: kiểm chứng từng lớp, không học mọi field cùng lúc

:::hands-on
Lab này là **local simulation**: PostgreSQL chạy trong Docker trên máy bạn, không kết nối production. Version, cache state và dữ liệu có thể làm plan khác nhau. Ghi observation trước khi kết luận.
:::

### Setup

Bạn cần Docker Desktop và cổng `5432` còn trống.

```powershell
docker run --name quannet-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=quannet_lab -p 5432:5432 -d postgres:17
docker exec quannet-postgres pg_isready -U postgres -d quannet_lab
docker exec -it quannet-postgres psql -U postgres -d quannet_lab
```

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

### Experiment 1 — chưa có shortcut

**Question:** chưa có index khớp query, database đang chọn đường nào? Nó có phải sắp lại kết quả không?

**Predict:** có thể thấy `Seq Scan → Sort → Limit`, vì database phải tìm tenant/status rồi mới có 20 đơn mới nhất.

```sql
EXPLAIN (ANALYZE)
SELECT id, created_at, total
FROM orders
WHERE tenant_id = 42 AND status = 'Paid'
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

**Inspect:** chỉ nhìn ba thứ đầu tiên: scan type, có `Sort` hay không, và actual rows qua scan. **Interpret:** outcome có thể khác theo máy; mục tiêu là mô tả access path và work, không săn một plan “đúng duy nhất”.

### Experiment 2 — thêm đúng thứ tự tuple

**Question:** composite index có tạo một range tenant/status và có sẵn order cho `LIMIT` không?

**Predict:** `Index Cond` có thể dùng tenant/status; `Sort` có thể biến mất.

```sql
CREATE INDEX ix_orders_tenant_status_created
ON orders (tenant_id, status, created_at DESC, id DESC);
ANALYZE orders;

EXPLAIN (ANALYZE)
SELECT id, created_at, total
FROM orders
WHERE tenant_id = 42 AND status = 'Paid'
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

**Inspect:** access path, `Index Cond`, `Sort`, actual rows. **Why:** đây là evidence cho tuple ordering và `LIMIT`, không phải bằng chứng rằng mọi index đều tốt.

### Experiment 3 — hỏi planner đã đoán gần chưa

**Question:** sau khi đã biết shape của plan, planner dự đoán số row có gần actual không?

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, created_at, total
FROM orders
WHERE tenant_id = 42 AND status = 'Paid'
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

**Inspect:** estimated rows so với actual rows; sau đó mới nhìn `shared hit/read` trong `BUFFERS`. **Why:** `ANALYZE` tạo statistics cho planner; buffer numbers chỉ có nghĩa khi đọc cùng access path, row count và cache state.

### Experiment 4 — phá query shape

**Question:** nếu chỉ có `created_at`, index tenant/status/created_at còn cho điểm bắt đầu trực tiếp không?

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, created_at, total FROM orders
WHERE created_at > now() - interval '1 day'
ORDER BY created_at DESC, id DESC LIMIT 20;
```

**Predict:** leading key không có, nên index hiện tại có thể không hợp query shape. **Learn:** không thêm index mới trước khi biết query frequency, write volume và plan hiện tại.

## Production story: vì sao cuối cùng mới nhắc p95?

Sau khi hiểu database work, ta mới đo tác động lên user. Câu hỏi là: **user chờ API bao lâu?** Ta đo response time của nhiều request, không chỉ một request.

Một **average** là tổng thời gian chia số request. Nó hữu ích để nhìn mức chung, nhưng có thể che phần request chậm. Sắp response time từ nhanh tới chậm, **percentile** trả lời: “bao nhiêu phần trăm request hoàn thành không chậm hơn mốc này?”

| Câu hỏi | Metric gần nhất |
|---|---|
| request điển hình ở giữa mất bao lâu? | `p50` (50% request không chậm hơn mốc này) |
| phần lớn traffic có còn chậm không? | `p95` (95% request không chậm hơn mốc này) |
| phần đuôi rất chậm ra sao? | `p99` |
| có request chậm nhất bất thường không? | max |

Không metric nào thay metric khác. Production case chọn `p95` vì muốn thấy trải nghiệm của phần lớn request, đồng thời không để một average đẹp che đi tail chậm.

**Symptom:** Orders API trả 20 row; `p95` tăng từ 80 ms lên 1.8 s. `p95` ở đây nghĩa là 95% request không chậm hơn mốc đo được. Đây là symptom, chưa phải kết luận “cần Redis”.

**Evidence cần lấy:** SQL và parameter thật, `EXPLAIN (ANALYZE, BUFFERS)`, estimate/actual rows, `Sort`, phân bố tenant/status, query frequency, write rate và storage. **Hypothesis cạnh tranh:** query shape thiếu access path; statistics không phản ánh data; hoặc bottleneck nằm ngoài database read. **Decision:** thử candidate index trên data gần workload, đo read benefit cùng write/storage impact rồi mới rollout có kiểm soát.

## Trade-off và câu trả lời interview

Index giúp read path có thể làm ít work hơn, nhưng mỗi `INSERT`, `UPDATE`, `DELETE` liên quan phải duy trì thêm index entry. Index cũng tốn storage. Vì vậy câu trả lời trưởng thành không phải “thêm index”, mà là “index này phục vụ query nào, xuất hiện bao nhiêu, giảm work nào, và write cost có chấp nhận được không?”

:::interview-answer
“Với query lấy 20 đơn mới nhất của một tenant/status, em bắt đầu từ query shape chứ không mặc định thêm index. Composite index có thể xếp `tenant_id`, `status`, rồi `created_at/id` để database đi vào một vùng nhỏ, có sẵn order và dừng ở `LIMIT`. Em xác minh bằng plan: access path, `Index Cond` hoặc `Filter`, `Sort`, estimate so với actual rows, sau đó mới đọc buffers/time. Em cũng kiểm write rate và storage vì index được cập nhật khi dữ liệu đổi.”
:::

## Explain it back

Hãy tự nói trong 60–120 giây, theo chuỗi này: scan → work tăng → cần key có thứ tự → loại range → cần nhiều tầng routing → B-tree → query nhiều field → tuple order → nhiều access path → planner/estimate/statistics → `EXPLAIN` evidence.

Nếu bị kẹt, đừng quay về định nghĩa. Hỏi lại: *cách đơn giản trước đó làm gì, và nó bắt đầu thiếu ở đâu?*

## Final recall

1. Vì sao scan vẫn là lựa chọn hợp lý trong vài query?
2. Index tạo shortcut bằng property nào?
3. B-tree giải quyết giới hạn nào của danh sách key lớn có thứ tự?
4. Vì sao composite index phải đọc theo tuple order?
5. Planner cần estimate trước khi chạy query để làm gì?
6. `EXPLAIN`, `EXPLAIN ANALYZE` và `BUFFERS` lần lượt trả lời câu hỏi nào?
7. Vì sao production case chọn p95 thay vì chỉ nhìn average?

:::final-recall
Index không hứa “nhanh hơn”. Nó đưa database tới vùng candidate bằng key có thứ tự. B-tree giúp loại range trên dữ liệu lớn; composite index theo thứ tự tuple; planner chọn giữa các access path nhờ estimate/statistics; `EXPLAIN` biến quyết định đó thành evidence; write/storage cost quyết định có nên giữ index hay không.
:::

## Further learning

- [B+ Trees Explained](https://www.iknowdatabase.com/articles/b-plus-trees-explained) — trực giác scan, ordered lookup và tree.
- [PostgreSQL: Multicolumn Indexes](https://www.postgresql.org/docs/18/indexes-multicolumn.html) — semantics chính xác khi cần thiết kế key nhiều cột.
- [PostgreSQL: Using EXPLAIN](https://www.postgresql.org/docs/18/using-explain.html) — đọc plan và `BUFFERS` sâu hơn sau lab.

## Continue

- Reference: [SQL, Index, transaction và locking](/docs/sql-index-locking)
- Quiz: [Tình huống execution plan](/quiz?topic=EF%20Core%20v%C3%A0%20SQL)
- Interview: [Lost update và database boundary](/interview?question=sql-lost-update)