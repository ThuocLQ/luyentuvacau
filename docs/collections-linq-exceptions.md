# Collections, LINQ & Exceptions

## Quick Summary

API danh sách chậm khi kéo cả triệu dòng về rồi mới lọc. Chọn collection theo cách truy cập; với LINQ, lọc và phân trang trước khi lấy dữ liệu về bộ nhớ; exception chỉ dành cho lỗi bất thường.

## Terms to Know

- [[Query shape]]: filter, sort và cột response thực sự cần.
- [[N+1 query]]: mỗi item lại tạo thêm một query.

::: concept
`IQueryable` là mô tả query để database chạy; `IEnumerable` là dữ liệu đang được duyệt trong app. Đừng để `IQueryable` đi qua nhiều tầng không ai kiểm soát.
:::

## Mental model

`List` phù hợp duyệt theo thứ tự; `Dictionary` tìm theo key; `HashSet` kiểm tra có/không và loại trùng. LINQ chỉ chạy khi enumerate hoặc gọi `ToList`; đó là execution boundary cần đặt sau filter, projection và page.

Ví dụ import 10.000 mã sản phẩm cần phát hiện mã trùng. Nếu mỗi mã lại quét cả `List`, thời gian tăng rất nhanh khi dữ liệu lớn. Dùng `HashSet<string>` để kiểm tra mã đã thấy; dùng `Dictionary<string, Product>` khi cần lấy luôn product theo mã. Chọn collection theo thao tác chính, không phải theo thói quen.

## LINQ và data boundary

Một endpoint cần bắt đầu bằng tenant scope, filter, sort ổn định, chọn đúng DTO, phân trang rồi mới materialize. Không trả `IQueryable` khỏi use case vì caller có thể thêm query, bỏ filter hoặc kéo dữ liệu quá lớn.

Với `GET /orders/123`, không tìm thấy order là outcome dự đoán được: use case trả `NotFound`, HTTP boundary đổi thành `404`. Ngược lại lỗi database hoặc bug mapping là lỗi bất ngờ: ghi log có context, trả lỗi an toàn và để alert phát hiện. Đừng catch mọi exception rồi trả `400`, vì client sẽ hiểu sai và có thể retry sai.

## Bẫy production

- `ToList()` trước filter/page gây tốn memory và OOM.
- Loop gọi repository tạo N+1; batch theo key hoặc projection.
- Catch mọi lỗi rồi trả `400` che bug và làm client retry sai.

## Final recall

- Chọn collection theo access pattern.
- Query phải có owner và boundary rõ.
- Outcome dự đoán được trả result; lỗi bất ngờ map/log tại HTTP boundary.
