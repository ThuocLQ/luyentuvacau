# Index & Execution Plan Learning Lab — Source Map

Research date: 2026-09-26. Lab runs `postgres:17`; PostgreSQL 17 documentation is the factual boundary for learner-facing lab claims. Đây là traceability cho author, không phải route learner phải đọc trước lesson.

| Source | Type / role | Fact hoặc teaching insight đã xác minh | QuanNet dùng như thế nào |
|---|---|---|---|
| [PostgreSQL 17: Index Types](https://www.postgresql.org/docs/17/indexes-types.html) | Primary fact | PostgreSQL có nhiều index type; `CREATE INDEX` mặc định tạo B-tree. B-tree hỗ trợ equality/range trên data có thể sort và có thể hỗ trợ output có thứ tự. | Sửa ranh giới: Index là abstraction “thêm cách định vị data”; B-tree là concrete ordered strategy của lab. Các type khác chỉ được nhắc là ngoài scope. |
| [PostgreSQL 17: B-Tree Indexes](https://www.postgresql.org/docs/17/btree.html) | Primary fact | PostgreSQL B-tree là multi-way balanced tree; internal page dẫn xuống và leaf page chứa entry trỏ tới table row. | Cross-check mental model ordered keys → routing nhiều tầng → leaf candidate; visual giữ disclaimer là mô hình đơn giản hóa. |
| [PostgreSQL 17: Multicolumn Indexes](https://www.postgresql.org/docs/17/indexes-multicolumn.html) | Primary fact | B-tree multicolumn hiệu quả nhất khi có constraint ở leading column; condition bên phải có thể được check nhưng không nhất thiết giảm phần index phải scan. | Query tenant/status/order → tuple ordering → composite B-tree. Wording giới hạn vào PG17 lab, không biến thành slogan timeless. |
| [PostgreSQL 17: Using EXPLAIN](https://www.postgresql.org/docs/17/using-explain.html) | Primary fact | `rows` của plan node là rows output, không phải toàn bộ rows processed; `Filter` gắn với scan; `LIMIT` có thể khiến parent dừng child trước khi child chạy hết. `EXPLAIN ANALYZE`/`BUFFERS` cần đọc theo node context. | Sửa Seq Scan lab sang `Rows Removed by Filter` + actual rows emitted; tách estimate experiment khỏi `LIMIT`; giữ `Filter`/`Index Cond` là scan metadata. |
| [PostgreSQL 17: ANALYZE](https://www.postgresql.org/docs/17/sql-analyze.html) | Primary fact | `ANALYZE` thu thập statistics cho planner; table lớn dùng sample nên estimate có thể chỉ gần đúng. | Planner → expected rows → statistics; mismatch là hypothesis điều tra, không phải kết luận planner hỏng. |
| [Use The Index, Luke!: The Search Tree](https://use-the-index-luke.com/sql/anatomy/the-tree) | Teaching source | Leaf entry có logical order, nhưng cần tree routing để tìm đúng leaf nhanh; dùng phone-book/page intuition một cách có boundary. Facts được cross-check với PostgreSQL docs. | Teaching pattern: ordered leaf idea trước, hierarchy xuất hiện như lời giải cho “không thể lướt flat list lớn”; không copy prose hay diagram. |
| [PostgreSQL Indexes and B-Trees / EXPLAIN](https://www.youtube.com/watch?v=YZSHpDn7GP4) | Teaching video | Video đặt B-tree traversal và `EXPLAIN` trong một sequence trực quan; không là source-of-truth. | Giữ một learner-facing reinforcement link cho visual/temporal explanation; không dùng transcript, timestamp, screenshot hay animation. |

## Version boundary: PostgreSQL 18 skip scan

PostgreSQL 18 documentation mô tả B-tree skip scan cho một số multicolumn condition không có equality ở leading column. Tính năng này được **cố ý loại khỏi** core lesson vì lab chạy PostgreSQL 17. Vì vậy lesson chỉ nói thiếu leading tenant/status không còn cho *cùng direct contiguous starting range* trong mental model PG17, thay vì khẳng định index không bao giờ dùng được.

## Claims intentionally kept out

Lesson không mở rộng sang Hash/GiST/GIN/BRIN behavior, skip scan mechanics, partial/expression/covering index, VACUUM/HOT internals, B+ tree on-disk implementation, planner source code hoặc monitoring course. Chúng không cần để learner hiểu causal chain của Index, B-tree, planner và EXPLAIN cơ bản.