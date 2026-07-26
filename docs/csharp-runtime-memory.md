# C# Runtime & Memory

## Quick Summary

Một API export 200.000 dòng thường chậm hoặc bị OOM không phải vì C# “không có GC”, mà vì nó tạo và giữ quá nhiều dữ liệu cùng lúc. Hãy xem object nào còn bị giữ, giảm lượng dữ liệu đồng thời trong bộ nhớ, rồi mới cân nhắc tối ưu sâu.

::: must-remember
Nói đơn giản: GC chỉ dọn object khi không còn ai tham chiếu đến nó. Cache, queue, singleton hoặc biến closure còn giữ object thì GC không được phép xóa.
:::

## Terms to Know

- [[Garbage collection]]: cơ chế runtime thu hồi object không còn được dùng.
- [[Large Object Heap (LOH)]]: vùng dành cho object lớn; nhiều buffer lớn dễ làm bộ nhớ tăng đột biến.
- [[ArrayPool]]: nơi mượn và trả lại buffer để giảm cấp phát lặp lại.

## Khi nào gặp

Endpoint tải file chạy ổn ở máy local, nhưng khi nhiều người tải cùng lúc thì p99 tăng, Gen2 GC xuất hiện nhiều và container bị restart. Nguyên nhân thường là code `ToList()` toàn bộ dữ liệu, tạo `byte[]` lớn, hoặc cache không có giới hạn.

Đừng bắt đầu bằng `GC.Collect()` hay `ArrayPool`. Trước hết phải biết request tạo bao nhiêu dữ liệu, giữ bao lâu và người dùng bị ảnh hưởng thế nào.

## Mental model

Managed memory giúp bạn không phải tự gọi `free`. Nó không tự quyết định ai sở hữu stream, socket hay buffer native. **Ownership (quyền sở hữu)** nghĩa là ai phải đóng hoặc trả tài nguyên sau khi dùng xong.

`IDisposable` dùng để giải phóng tài nguyên khan hiếm như file handle, socket, database reader hoặc vùng nhớ native. `using`/`await using` cho thấy rõ nơi ownership kết thúc. Dispose không ép GC chạy ngay; nó chỉ đóng tài nguyên đúng lúc.

Một object còn sống khi còn đường tham chiếu đến nó. Ví dụ, một singleton giữ DTO của request sẽ khiến DTO đó sống sau khi request kết thúc. Đó vừa tốn bộ nhớ vừa có thể rò dữ liệu giữa người dùng.

## Cách xử lý theo thứ tự

1. Xác định request nào chậm hoặc bị OOM: payload, số request đồng thời, p95/p99 và memory limit của container.
2. Kiểm tra allocation rate, heap, Gen2/LOH và dump. Dump cho biết object nào đang giữ dữ liệu qua retaining path.
3. Giảm peak memory trước: phân trang, batch hoặc stream thay vì nạp toàn bộ vào `List<T>`.
4. Rà ownership: stream/reader do method tạo phải được dispose; dependency do DI hoặc caller tạo thì không tự dispose.
5. Chỉ dùng pool khi profiling cho thấy một buffer lớn được cấp phát lặp lại ở hot path.

## Quyết định và trade-off

| Lựa chọn | Khi nào dùng | Điều cần chú ý |
|---|---|---|
| Streaming (`Stream`, `IAsyncEnumerable<T>`) | File/payload lớn, có thể gửi dần | xử lý cancellation và lỗi giữa luồng |
| Batch/pagination | Có thể chia dữ liệu thành phần nhỏ | cần contract rõ về thứ tự và resume |
| `using` / `await using` | Code tạo resource disposable | không dispose object thuộc DI/caller |
| `ArrayPool<T>` | Buffer lớn lặp lại đã được đo là nút thắt | `Rent` một lần phải `Return` một lần trong `finally` |
| Cache | Dữ liệu đọc nhiều, chấp nhận dữ liệu cũ trong thời gian ngắn | phải có TTL, size limit và tenant-safe key |

## Bẫy production

::: production-trap
Trả buffer về `ArrayPool<T>` trước khi async I/O dùng xong có thể làm dữ liệu request này lẫn vào request khác. Pool không chữa được memory leak.
:::

- `ToList()` trước khi export làm cả database và app phải giữ tập dữ liệu lớn.
- Queue hoặc cache không có giới hạn biến traffic tăng thành OOM.
- Event handler không unsubscribe có thể giữ subscriber sống mãi.
- Singleton không được giữ `HttpContext`, DTO request hay entity đang tracking.

## Kiểm chứng ở production

Theo dõi allocation rate, heap size, Gen2/LOH collection, GC pause, working set, OOM restart và p99. So sánh trước/sau dưới cùng tải. Giảm allocation nhưng làm tăng contention hoặc lỗi ownership không phải là cải thiện.

## Mẫu trả lời 45 giây

“Nếu endpoint dùng nhiều bộ nhớ, em xem lượng allocation, object còn bị giữ và p99 trước. Với export lớn, em ưu tiên stream hoặc batch để giảm peak memory. Resource do code tạo được đóng bằng `using`; resource từ DI thì không tự dispose. Chỉ khi profiling cho thấy buffer lớn được tạo lặp lại, em mới dùng `ArrayPool` với `try/finally`, vì dùng pool sai có thể gây lẫn dữ liệu hoặc leak.”

## Câu hỏi phỏng vấn

### Vì sao ứng dụng có GC vẫn `OutOfMemoryException`?

**Trả lời ngắn:** GC không xóa object còn reachable. OOM có thể do cache/queue không giới hạn, payload lớn materialize cùng lúc, tốc độ cấp phát quá cao, LOH hoặc memory limit của container.

**Follow-up:** Làm sao tìm retaining path? Vì sao `Dispose` không buộc GC chạy?

**Red flags:** “Cứ gọi `GC.Collect()`”; “pool luôn nhanh hơn”.

## Final recall

- Reachability quyết định GC có thể dọn gì; ownership quyết định ai đóng resource.
- Giảm dữ liệu cùng lúc trong RAM trước khi dùng pooling.
- Tối ưu theo allocation, p99 và dump, không theo cảm giác.
