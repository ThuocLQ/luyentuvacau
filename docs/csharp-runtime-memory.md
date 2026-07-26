# C# Runtime & Memory

## Bài toán backend thực tế

Một API tải báo cáo 30 MB cho từng khách hàng. Ban đầu endpoint trả lời nhanh ở môi trường test, nhưng khi lưu lượng tăng, p99 tăng vọt, Gen2 GC xuất hiện dày hơn và process đôi lúc bị `OutOfMemoryException`. Vấn đề không phải là "C# có GC nên không cần lo bộ nhớ"; vấn đề là mỗi request đang tạo nhiều mảng lớn, giữ chúng lâu hơn cần thiết và ép runtime làm việc nhiều hơn khả năng của máy.

Khi trả lời interview, hãy nối **tốc độ cấp phát**, **vòng đời object** và **ảnh hưởng đến latency**. Đừng chỉ liệt kê Gen0, Gen1, Gen2.

## Mental model

Managed memory loại bỏ việc gọi `free`, không loại bỏ trách nhiệm ownership. GC chỉ thu hồi object không còn reachable; một object vẫn sống nếu còn bị giữ bởi cache tĩnh, event handler, closure, queue hoặc object graph khác.

`IDisposable` giải phóng tài nguyên khan hiếm như socket, file handle, database reader hoặc buffer native. Nó không có nghĩa managed memory được thu hồi ngay. Dùng `using` hoặc `await using` để thể hiện rõ điểm kết thúc ownership.

## Invariants phải giữ

- Chỉ dispose object mà code tạo ra, hoặc contract nói rõ caller sở hữu nó.
- Không để dữ liệu theo request đi vào singleton/static state.
- Cache, queue và buffer luôn có giới hạn kích thước, TTL và chính sách loại bỏ.
- Với `ArrayPool<T>`, mọi `Rent` phải có đúng một `Return` trong `finally`; không giữ reference sau khi trả pool.
- Streaming dữ liệu lớn khi có thể; không materialize toàn bộ chỉ để trả từng phần cho client.

## Cách ra quyết định

| Lựa chọn | Dùng khi | Trade-off / không dùng khi |
|---|---|---|
| `using` / `await using` | Có tài nguyên disposable do code sở hữu | Không dispose dependency do DI container hoặc caller sở hữu |
| Streaming (`Stream`, `IAsyncEnumerable<T>`) | Payload lớn, có thể gửi/xử lý tuần tự | Cần xử lý cancellation, lỗi giữa stream và không được giả định toàn bộ dữ liệu đã có |
| `ArrayPool<T>` | Profiling cho thấy allocation/LOH là hot path lặp lại | Tăng rủi ro double-return, stale data và ownership sai; không pool mọi mảng nhỏ |
| `Span<T>` / `Memory<T>` | Cắt lát, parse buffer trên đường đi nóng | `Span<T>` không vượt qua `await`; ưu tiên readability nếu chưa có bằng chứng performance |
| Cache | Dữ liệu đọc nhiều, có freshness contract | Cache không thay nguồn sự thật; phải bound size, expiry và invalidation |

## Production traps

- `ToList()` một query nhiều triệu dòng trước khi export làm object graph và LOH phình lên. Hãy phân trang/stream hoặc tạo file bất đồng bộ.
- Singleton giữ `HttpContext`, DTO request hoặc closure bắt biến lớn gây retention chéo request, lộ tenant/user data và leak bộ nhớ.
- Event subscription không được unsubscribe khiến subscriber sống mãi theo publisher dài hạn.
- Dùng `ArrayPool<T>` rồi trả buffer trước khi async I/O dùng xong tạo dữ liệu lẫn lộn; quên `Return` thì pool không còn lợi ích.
- Finalizer không phải cơ chế đóng tài nguyên thường ngày: nó trì hoãn reclamation và chịu áp lực finalizer queue. Dùng API disposable/SafeHandle đúng cách.

## Kiểm chứng ở production

Đừng tối ưu bằng trực giác. Bắt đầu bằng workload cụ thể: request rate, kích thước payload, p95/p99, allocation rate và memory limit của container.

- Theo dõi allocation rate, heap size, Gen2/LOH collection, working set và GC pause qua runtime counters/APM.
- Chụp dump khi heap tăng không giảm; xem retaining path để phân biệt cache/leak với traffic growth hợp lệ.
- So sánh trước/sau theo throughput và p99 dưới cùng load; giảm allocation nhưng làm tăng contention hoặc lỗi ownership không phải cải tiến.
- Đặt alert theo dấu hiệu người dùng thấy được: restart do OOM, p99, queue backlog; không chỉ theo % memory.

## Mẫu trả lời 30–45 giây

"Ứng dụng .NET vẫn có thể hết bộ nhớ vì GC chỉ thu hồi object không còn reference. Tôi sẽ xem allocation rate, Gen2/LOH và retaining path để biết đó là burst hợp lệ, cache không giới hạn hay leak. Với endpoint payload lớn, tôi ưu tiên streaming và ownership rõ bằng `using`; chỉ cân nhắc pooling khi profiling chứng minh allocation là nút thắt, vì pool cũng tạo rủi ro lifetime và dữ liệu cũ."

## Mẫu trả lời Senior 2 phút

"Tôi không bắt đầu bằng việc bật `ArrayPool`. Trước hết tôi xác định loại workload: bao nhiêu request/giây, kích thước payload, giới hạn memory container và p99 bị ảnh hưởng thế nào. Tôi kiểm tra allocation rate, Gen2/LOH và dump để biết object nào còn bị giữ. Nếu export đang `ToList()` toàn bộ dữ liệu, tôi đổi sang stream hoặc xử lý batch để hạ peak memory; đồng thời truyền `CancellationToken` để client huỷ thì pipeline dừng.

Với resource như stream hay database reader, điểm ownership phải rõ: object do method tạo thì `using`/`await using`; object từ DI hoặc caller thì không dispose tuỳ tiện. Nếu profiling cho thấy một buffer lớn được tạo lặp lại ở hot path, tôi có thể dùng `ArrayPool<T>` với `try/finally`, không giữ reference sau `Return` và clear dữ liệu nhạy cảm. Sau thay đổi tôi load test cùng điều kiện, so p99, GC pauses, allocation và error rate. Mục tiêu là giảm user impact, không phải chỉ làm chỉ số allocation đẹp hơn."

## Câu hỏi follow-up và red flags

### Vì sao managed application vẫn `OutOfMemoryException`?

**Ý chính:** Object còn reachable, tốc độ cấp phát vượt khả năng GC, LOH/fragmentation, cache/queue không giới hạn hoặc process/container có memory limit thấp đều có thể gây OOM.

**Follow-up:** Làm sao tìm retaining path? Khi nào `MemoryCache` là leak hợp lệ hay cache hợp lệ? Vì sao `Dispose` không buộc GC chạy ngay?

**Red flags:** "GC luôn giải phóng bộ nhớ ngay", "cứ gọi `GC.Collect()`", "pool luôn nhanh hơn".

### Khi nào bạn dùng `ArrayPool<T>`?

**Ý chính:** Chỉ sau khi đo được repeated allocation lớn/đường đi nóng. Phải có ownership, `Return` trong `finally`, không dùng buffer sau khi trả và xử lý dữ liệu nhạy cảm.

**Follow-up:** Vì sao pool có thể làm bug khó tái hiện? Vì sao không pool mọi `byte[]`?

**Red flags:** "Rent xong không cần trả", "pool giải quyết memory leak".

## Code / flow

```csharp
await using var stream = await blob.OpenReadAsync(ct);
await stream.CopyToAsync(response.Body, ct); // stream thay vì buffer toàn bộ blob
```

## Final recall

- Reachability quyết định GC có thể thu hồi gì; ownership quyết định ai đóng resource.
- Bound cache, queue và payload; stream trước khi pool.
- Profiling và retaining path dẫn đường cho tối ưu.
- Chứng minh cải tiến bằng p99, throughput, allocation và độ ổn định dưới load.
