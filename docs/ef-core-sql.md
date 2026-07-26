# EF Core & Data Access

## Quick Summary

Endpoint chậm vì SQL đọc/join/sort quá nhiều dòng, không phải chỉ vì EF Core. Lấy SQL thật và execution plan (cách database chạy query) trước; sửa query shape rồi mới thêm index.

## Terms to Know

- [[Query shape]]: filter, join, sort và cột response cần.
- [[Execution plan]]: đường database chọn để đọc/join dữ liệu.
- [[N+1 query]]: query danh sách rồi query thêm cho từng item.

::: definition
`AsNoTracking()` giảm chi phí tracking cho đọc, nhưng không cứu query lấy quá nhiều dòng hoặc table scan.
:::

## Mental model

API list phải filter tenant sớm, sort ổn định, project sang DTO, phân trang rồi mới materialize. Index chỉ hữu ích khi phục vụ predicate/order của query; nó cũng làm write tốn hơn.

## Cách chẩn đoán một endpoint chậm

1. Lấy p95/p99, input và số dòng thực tế.
2. Xem SQL, số round trip, N+1 và actual plan.
3. Sửa query shape/projection/page.
4. Tạo index theo filter/sort và đo lại dưới tải gần production.

## Bẫy production

- `Include` mọi quan hệ nhân số dòng join.
- Trả `IQueryable` khỏi use case làm query mất ownership.
- Transaction bao HTTP/email giữ lock lâu.
- Retry `SaveChanges` mù khi lost update có ý nghĩa nghiệp vụ.

## Final recall

- EF tạo SQL; plan và dữ liệu thật quyết định chi phí.
- Projection/page thường quan trọng hơn micro-optimization.
- Dùng concurrency token/constraint khi cần giữ invariant.
