# EF Core & Data Access

## Quick Summary

Endpoint chậm thường nằm ở query shape, execution plan hoặc contention (chờ lock/connection/tài nguyên đang bị request khác giữ) — không phải vì “EF Core chậm”. Đo SQL và số dòng thật trước, rồi mới quyết định projection, index hay concurrency semantics.

> **Nói đơn giản:** EF Core chỉ là lớp tạo SQL. Muốn biết API chậm, hãy xem database đang bị yêu cầu đọc gì, đọc bao nhiêu dòng và có phải chờ transaction khác không; đừng thêm `Include` hoặc index theo cảm tính.

Nói đơn giản: EF Core tạo câu SQL, nhưng database mới là nơi phải đọc, join và sắp xếp dữ liệu. Muốn tối ưu đúng, phải xem câu SQL và cách database chạy nó trước.

## Terms to Know

- [[Query shape]]: filter, join, sort và dữ liệu thực sự cần trả.
- [[Execution plan]]: cách database quyết định đọc và join dữ liệu.
- [[N+1 query]]: query danh sách rồi phát sinh thêm query cho từng item.
- [[Optimistic concurrency]]: update chỉ thành công khi version vẫn khớp.

::: definition
`AsNoTracking()` giảm overhead cho read-only query, nhưng không phải phép tối ưu thay cho projection, index và pagination đúng.
:::

## Tình huống phỏng vấn

"Một endpoint danh sách đơn hàng chậm dần khi dữ liệu tăng. Em xử lý từ đâu?"

Đừng bắt đầu bằng việc thêm `Include` hoặc thêm index. Bắt đầu từ bằng chứng: p95/p99, số dòng trả về, SQL thực tế, execution plan thực tế và mẫu truy cập của endpoint. EF Core tạo SQL; database mới là nơi chọn plan và đọc dữ liệu.

## Mental model

Query shape là dữ liệu API thực sự xin: filter nào, sort thế nào, cần bao nhiêu cột và bao nhiêu dòng. Execution plan là cách database chọn để lấy dữ liệu đó. Hai thứ này quyết định chi phí nhiều hơn câu LINQ trông “đẹp” hay không.

EF Core là lớp làm việc với dữ liệu, không thay thế hiểu biết về SQL. Một truy vấn tốt phải đúng ở ba tầng:

- **Đúng dữ liệu:** lọc, sắp xếp và phân trang ổn định; không vô tình bỏ qua tenant hoặc trạng thái.
- **Đúng hình dạng:** chỉ lấy cột và quan hệ mà response cần.
- **Đúng chi phí:** SQL và plan đọc lượng dữ liệu phù hợp khi bảng đã lớn.

Mọi tối ưu chỉ đáng tin khi đo được trước và sau. `ToQueryString()` cho biết SQL dự kiến. Log command và trace cho biết endpoint thực sự gọi gì. Actual execution plan cho biết database đã thực thi thế nào trên dữ liệu thật.

## Những điều phải nhớ

- Với API đọc, ưu tiên `Select` sang DTO và `AsNoTracking()`. Tracking có ích khi cùng `DbContext` sẽ sửa aggregate đã nạp; nó không phải mặc định cho mọi truy vấn.
- Tránh N+1 bằng cách thiết kế query theo response. Lazy loading dễ che giấu N+1; chỉ dùng khi team có telemetry và hiểu số query phát sinh.
- `Include` không tự động là nhanh hơn. Nhiều collection `Include` trong một join có thể nhân số dòng. So sánh single query với `AsSplitQuery()` trên dữ liệu đại diện, vì split query đổi chi phí từ nhân dòng sang nhiều round trip và snapshot có thể khác nếu không nằm trong transaction phù hợp.
- Không phân trang bằng `Skip` lớn vô điều kiện. Với feed lớn, keyset/seek pagination theo khóa sắp xếp ổn định thường ít tốn hơn. Luôn có tie-breaker, ví dụ `(CreatedAt, Id)`.
- `SaveChanges` không tự giải quyết lost update. Khi cập nhật cạnh tranh quan trọng, dùng concurrency token (`rowversion`/ETag) và trả về xung đột để caller reload, merge hoặc thử lại theo quy tắc nghiệp vụ.
- Transaction chỉ bao bọc thay đổi local cần nguyên tử. Không gọi HTTP, gửi email hay publish broker trong transaction database.

## So sánh nhanh

| Lựa chọn | Khi phù hợp | Đổi lại |
|---|---|---|
| Tracking | Nạp aggregate rồi sửa trong cùng unit of work | tốn bộ nhớ và change detection |
| `AsNoTracking` + projection | Read model, danh sách, báo cáo nhỏ | không thể sửa entity đã trả về trực tiếp |
| `Include` có kiểm soát | Cần graph nhỏ, quan hệ rõ | dễ over-fetch hoặc nhân dòng |
| Projection/batch query | Response có hình dạng riêng | cần thiết kế rõ mapping |
| Raw SQL/Dapper | Hot path đã đo, bulk operation, tính năng SQL đặc thù | mất một phần kiểm tra/compose của EF; phải giữ parameterization và test |

## Cách chẩn đoán một endpoint chậm

1. Xác định endpoint, tenant/đầu vào, p95/p99, số bản ghi và mức tải lúc chậm. Không tối ưu từ cảm giác trên máy local.
2. Lấy SQL có parameter đại diện; kiểm tra số round trip, N+1, `SELECT *`, join và phân trang.
3. Đọc actual plan: scan hay seek, estimated-vs-actual rows có lệch lớn không, sort/hash/spill có tốn không, index nào được dùng.
4. Sửa query shape trước: lọc sớm, projection, phân trang ổn định, bỏ materialize trung gian. Sau đó mới tạo hoặc chỉnh index khớp predicate và order.
5. Đo lại với dữ liệu/tải gần production, theo dõi regression qua tracing, slow-query log hoặc query budget trong integration test.

`AsNoTracking()` không biến table scan thành query nhanh; còn index không cứu được query lấy hàng triệu dòng rồi map ở ứng dụng.

## Bẫy production

::: production-trap
`Include` mọi quan hệ có thể nhân số dòng join và làm payload/query tệ hơn N+1. Hãy bắt đầu từ shape của response.
:::

- Repository trả `IQueryable` ra mọi tầng làm mất ownership của query; controller có thể thêm `Include`, filter hoặc `ToList` ở chỗ khó kiểm soát. Nên giữ query boundary gần use case.
- `ExecuteUpdate`/raw SQL bỏ qua change tracker. Chúng hữu ích cho bulk update nhưng cần cân nhắc concurrency token, audit field, cache invalidation và event/outbox.
- Migration lớn có thể lock bảng hoặc rewrite dữ liệu. Tách thay đổi schema tương thích ngược, backfill theo batch, deploy code đọc được cả schema cũ/mới rồi mới enforce constraint.
- Parameter sniffing, thống kê cũ hoặc phân bố tenant lệch có thể làm plan tốt cho một input nhưng xấu cho input khác. Đừng áp hint mù quáng: kiểm tra statistics, plan cache và workload thật.

## Mẫu trả lời Senior

"Em xem endpoint đang chậm vì **query shape**, **plan** hay **contention**. Em lấy trace và SQL có parameter thật, kiểm tra actual plan cùng số dòng thực tế. Nếu đây là API read-only, em project đúng DTO, bỏ tracking, tránh N+1 và dùng pagination ổn định. Nếu plan cho thấy scan/sort không cần thiết, em tạo index phục vụ đúng predicate và ordering, đồng thời đo write cost. Với update cạnh tranh, em dùng concurrency token hoặc transaction/constraint theo invariant; không để EF che mất semantics. Cuối cùng em thêm telemetry hoặc test để regression không quay lại."

## Câu hỏi ôn phỏng vấn

### Làm sao ngăn N+1 trong EF Core?

**Trả lời ngắn:** Thiết kế query từ shape của response, quan sát SQL và số command. Project dữ liệu cần thiết trong một query có kiểm soát, hoặc batch theo khóa. Không thêm `Include` theo phản xạ vì join nhiều collection có thể nhân dòng.

**Follow-up:** Khi nào `AsSplitQuery()` có lợi? Làm sao chứng minh index hỗ trợ predicate và order của query?

**Red flags:** "Lazy loading ổn vì EF có cache"; "cứ `Include` tất cả quan hệ".

### Khi nào dùng optimistic concurrency?

**Trả lời ngắn:** Khi lost update có ý nghĩa nghiệp vụ và xung đột không quá thường xuyên. Lưu version cùng entity, chỉ update khi version khớp; nếu không khớp thì trả conflict và quyết định reload/merge/retry ở use case. Nó không thay thế unique constraint hay transaction cho invariant nhiều hàng.

**Follow-up:** Nếu cập nhật tồn kho liên quan nhiều bản ghi thì token một hàng có đủ không?

**Red flags:** "Cứ retry `SaveChanges` đến khi thành công".

## Final recall

- EF Core tạo SQL; actual plan và dữ liệu thật quyết định chi phí.
- Projection, query shape và pagination thường quan trọng hơn micro-optimization.
- Dùng tracking khi cần update; dùng concurrency semantics khi lost update quan trọng.
- Transaction local, ngắn và không bao quanh remote I/O.
