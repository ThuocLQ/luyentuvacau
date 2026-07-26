# Collections, LINQ & Exceptions

## Quick Summary

Chọn collection theo access pattern và invariant, không theo thói quen. LINQ cần có execution boundary rõ; exception là contract lỗi bất thường chứ không phải luồng điều khiển thông thường.

## Terms to Know

- [[Query shape]]: dữ liệu/filter/sort query thật sự cần.
- [[N+1 query]]: query phát sinh theo từng item.
- [[Data ownership]]: tầng nào được quyết định execution của query.

::: concept
`IQueryable` tiện nhưng mang theo deferred execution và provider semantics. Đừng để nó trôi qua nhiều layer mà không ai sở hữu query cuối.
:::

## Khi nào gặp

Chủ đề này thường xuất hiện dưới dạng một endpoint chậm dần khi dữ liệu lớn, memory tăng vì materialize quá sớm, lookup có độ phức tạp sai, hoặc một lớp `catch (Exception)` làm API trả lỗi không nhất quán. Ở cấp Senior, điều cần chứng minh là bạn chọn cấu trúc dữ liệu và boundary xử lý lỗi theo workload, không chỉ thuộc API của .NET.

## Mental model

Collection biểu diễn cách dữ liệu được truy cập và sở hữu trong memory; LINQ biểu diễn một pipeline thực thi có thể deferred hoặc đã materialized. `IEnumerable<T>` chạy trong memory; `IQueryable<T>` là mô tả query để provider như EF Core dịch xuống database. Chuyển từ `IQueryable` sang `IEnumerable` quá sớm có thể kéo dữ liệu khổng lồ về process.

Exception là tín hiệu cho đường đi bất thường mà caller không thể xử lý bình thường ở điểm hiện tại. Nó không phải cơ chế điều khiển luồng cho validation dự đoán được, cũng không phải lý do để trả mọi lỗi là `500`. Hãy đặt boundary: domain/application trả kết quả lỗi có cấu trúc cho tình huống mong đợi; middleware ở ngoài cùng chuẩn hóa exception không mong đợi, log cùng trace và trả `ProblemDetails` an toàn.

## Câu trả lời 60 giây

“Tôi chọn collection từ pattern truy cập và giới hạn dữ liệu: `Dictionary` cho lookup theo key, `HashSet` cho membership, `List` khi cần thứ tự và duyệt tuần tự. Với LINQ/EF, tôi giữ query ở database, filter/project/page trước khi materialize, rồi kiểm generated SQL và execution plan khi endpoint chậm. Tôi tránh `ToList()` chỉ để ‘dễ viết’. Về exception, validation và business rejection đi theo result/error code rõ ràng; exception bất ngờ được map một lần ở boundary, có correlation ID và không lộ chi tiết nội bộ. Tôi không bắt rồi nuốt exception, và không dùng exception để thay thế pagination hoặc lookup.”

## Must remember

- `List<T>` tối ưu duyệt tuần tự và index; tìm một phần tử theo điều kiện vẫn là O(n).
- `Dictionary<TKey,TValue>`/`HashSet<T>` lookup trung bình O(1), nhưng cần equality/comparer đúng và có chi phí memory.
- `IEnumerable<T>` có thể deferred; enumerate nhiều lần có thể chạy lại computation hoặc query nguồn.
- `IQueryable<T>` chỉ an toàn khi expression được provider hiểu; gọi method .NET tùy ý có thể không dịch được hoặc gây client evaluation ngoài ý muốn.
- `ToListAsync`/`FirstOrDefaultAsync` là execution boundary. Project sang DTO và page trước boundary đó.
- `throw;` giữ stack trace; `throw ex;` làm mất phần stack có ích cho điều tra.

## LINQ và data boundary

Với EF Core, query dành cho màn hình danh sách nên bắt đầu từ tenant/resource scope, sau đó filter, sort ổn định, projection chỉ các cột cần, cursor/offset pagination có giới hạn, rồi mới materialize. `Include` không phải thuốc chữa N+1: nó có thể tạo join lớn hoặc graph không cần thiết. Dùng projection khi response không cần entity tracking; cân nhắc `AsNoTracking` cho read-only query sau khi đo.

Đừng trả `IQueryable` ra khỏi application boundary. Nó làm tầng gọi sau có thể thêm query không kiểm soát, khó áp authorization và khó dự báo hiệu năng. Trả DTO, specification có giới hạn, hoặc một query handler rõ ràng.

## Quyết định và trade-off

| Quyết định | Dùng khi | Đổi lại |
|---|---|---|
| `Dictionary` | Lookup nhiều lần theo ID/key | Tốn memory; key equality phải đúng |
| `HashSet` | Deduplicate/membership | Không giữ thứ tự; comparer ảnh hưởng correctness |
| `List` + sort | Duyệt/hiển thị theo thứ tự | Lookup lặp lại có thể thành O(n²) |
| Streaming `IAsyncEnumerable` | Payload lớn, consumer xử lý tuần tự | Cần cancellation, connection/lifetime rõ |
| Result/error code | Validation, state conflict dự đoán được | Caller phải xử lý nhánh rõ ràng |
| Exception | I/O, invariant bị phá vỡ, lỗi bất ngờ | Tốn chi phí; phải map/log đúng boundary |

## Bẫy production

- Gọi `ToList()` rồi filter/page trong memory: database và process cùng chịu tải, có thể OOM.
- Loop qua danh sách và gọi repository từng item: N+1 query; batch query theo key hoặc project join phù hợp.
- Dùng `List.Contains` trong nested loop cho tập lớn: O(n²); tạo `HashSet` nếu semantics phù hợp.
- Multiple enumeration trên lazy sequence có I/O: query/call downstream chạy lại, kết quả có thể khác.
- Catch tất cả rồi trả `400`: che bug hệ thống và làm client retry sai.
- Bắt exception, log, rồi ném cùng exception ở mọi layer: log trùng, signal-to-noise thấp. Log có ngữ cảnh tại boundary xử lý thực sự.
- Dùng exception cho “không tìm thấy” trong đường hot path: khó đọc và tốn chi phí; trả result `NotFound` khi đó là outcome bình thường.

## Ví dụ

```csharp
var allowedIds = request.ProductIds.ToHashSet();

var products = await db.Products
    .Where(p => p.TenantId == tenantId && allowedIds.Contains(p.Id))
    .OrderBy(p => p.Name)
    .Select(p => new ProductSummary(p.Id, p.Name, p.Price))
    .AsNoTracking()
    .ToListAsync(ct);

if (products.Count != allowedIds.Count)
    return Result.Invalid("Một hoặc nhiều sản phẩm không thuộc tenant hoặc không tồn tại.");
```

Ở đây `HashSet` dùng để kiểm membership ở application; EF vẫn dịch `Contains` thành query phù hợp. Khi danh sách ID rất lớn, cần một strategy khác như table-valued parameter/bulk staging tùy database, thay vì gửi một `IN` vô hạn.

## Câu hỏi phỏng vấn

### Khi nào `IQueryable` trở thành rủi ro?

**Ý chính:** Khi nó đi qua boundary khiến tầng khác sửa query không kiểm soát, hoặc materialize sau khi mất tenant filter/pagination. Giữ expression ở data/query handler, project/page trước execution và quan sát SQL thực tế.

**Follow-up:** Vì sao `AsNoTracking` không tự làm mọi query nhanh? Khi nào keyset pagination tốt hơn offset?

**Red flags:** “LINQ luôn chạy trong database”; “cứ `Include` tất cả”.

### Bạn xử lý exception ở đâu?

**Ý chính:** Xử lý outcome dự đoán được gần business boundary bằng result/error code. Ở HTTP boundary, middleware map exception không mong đợi sang response an toàn, log một lần với trace/correlation ID và giữ chi tiết cho server logs.

## Tự kiểm

- Tôi có thể chọn collection bằng pattern lookup, kích thước và ownership thay vì thói quen không?
- Tôi có thể chỉ ra execution boundary trong một LINQ query và SQL/metric để kiểm chứng không?
- Tôi có phân biệt lỗi client dự đoán được với exception cần alert không?
- Tôi có thể giải thích một cách tránh N+1 mà không over-fetch dữ liệu không?
