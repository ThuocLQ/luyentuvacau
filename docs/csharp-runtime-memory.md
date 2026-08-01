# C# runtime và bộ nhớ: giảm áp lực RAM trước khi tối ưu

## Trong 30 giây

- GC (bộ dọn bộ nhớ của .NET) chỉ thu hồi object không còn đường tham chiếu; nó không dọn cache, queue hay closure còn giữ dữ liệu.
- Với export hoặc upload lớn, giảm lượng dữ liệu cùng lúc trong RAM bằng stream, batch hoặc phân trang trước khi dùng pool.
- `Dispose` đóng tài nguyên khan hiếm như file, socket và data reader; nó không buộc GC chạy.
- Chỉ dùng `ArrayPool<T>` sau khi đo allocation/heap. Trả buffer quá sớm có thể làm dữ liệu của request này lẫn sang request khác.

## Gặp ở đâu ngoài đời?

API export 200.000 dòng chạy ổn khi ít người dùng, nhưng dưới tải p99 tăng, container bị restart vì hết memory và khách tải file thất bại. Nguyên nhân thường không phải “.NET không có GC”; code đã đọc cả tập dữ liệu vào `List<T>`, tạo nhiều `byte[]` lớn hoặc giữ DTO của request trong cache không giới hạn.

Mục tiêu đầu tiên là giảm **peak memory** (lượng RAM cao nhất cùng lúc), không phải gọi `GC.Collect()` hay thay mọi mảng bằng pool.

## Hiểu đơn giản trước

Managed object sống chừng nào còn một tham chiếu đi tới nó. Một singleton giữ DTO, một event handler chưa unsubscribe, hoặc một queue không giới hạn đều có thể giữ object sau khi request đã kết thúc. GC không được phép xóa chúng vì application vẫn còn dùng được chúng.

`IDisposable` giải quyết chuyện khác: ai đóng tài nguyên ngoài managed heap. Method tự mở `FileStream`, HTTP response stream hoặc database reader thì đóng bằng `using`/`await using`; object do DI hoặc caller tạo thì caller/DI sở hữu lifecycle. Đóng stream giải phóng handle đúng lúc, nhưng không nói rằng mọi object managed liên quan biến mất ngay.

## Terms to Know

- [[Garbage collection]] (GC): runtime thu hồi object managed không còn reachable (còn đường tham chiếu tới).
- [[Large Object Heap (LOH)]]: vùng heap thường nhận allocation lớn; hãy xem đây là tín hiệu cần đo allocation và fragmentation, không phải nguyên nhân mặc định.
- [[ArrayPool]]: pool cho mượn buffer để giảm allocation lặp lại. Buffer mượn có thể dài hơn số byte cần dùng.
- **Đường tham chiếu giữ object còn sống (retaining path)**: chuỗi tham chiếu khiến GC chưa thể dọn object; memory dump giúp tìm chuỗi này.

## Cách quyết định, từng bước

1. Xác định ảnh hưởng: endpoint nào, payload bao nhiêu, bao nhiêu request cùng lúc, memory limit container và p95/p99 ra sao.
2. Đo trước khi sửa: allocation rate, managed heap, Gen2/LOH, GC pause, working set; lấy dump khi memory tăng để xem đường tham chiếu giữ object còn sống.
3. Giảm dữ liệu đồng thời: project đúng cột, phân trang/batch, hoặc stream kết quả thay vì `ToList()` cả tập dữ liệu. Kiểm thử cancellation khi client ngắt giữa stream.
4. Rà ownership: stream/reader tạo ở đâu phải được đóng ở đó; không giữ `HttpContext`, entity đang tracking hoặc DTO request trong singleton.
5. Chỉ khi profiler cho thấy hot path cấp phát buffer lớn lặp lại, thử `ArrayPool<T>`, đo lại cùng workload và kiểm ownership bằng test.

## Chọn A hay B?

| Cách làm | Dùng khi | Được gì | Đổi lại / không dùng khi |
|---|---|---|---|
| Stream hoặc `IAsyncEnumerable<T>` | payload lớn, consumer có thể nhận dần | hạ peak memory và thời gian đến byte đầu | phải xử lý cancellation/lỗi giữa luồng; không phù hợp khi cần toàn bộ dữ liệu để quyết định trước |
| Batch/pagination | có thể chia dữ liệu và resume | giới hạn RAM, dễ retry từng phần | cần sort/key ổn định và contract rõ |
| `using` / `await using` | code tự mở disposable resource | đóng resource theo scope rõ ràng | không dispose dependency do DI/caller sở hữu |
| `ArrayPool<T>` | profiling chứng minh allocation buffer là bottleneck | giảm allocation lặp lại | tăng rủi ro ownership, không chữa memory leak |
| Cache có TTL/size limit | đọc lặp lại, chấp nhận dữ liệu cũ có giới hạn | giảm tải nguồn dữ liệu | không giữ dữ liệu nhạy cảm hoặc tenant lẫn key |

## Nếu có lỗi thì sao?

Một lỗi hay gặp là `Return` buffer ngay sau khi bắt đầu async I/O. I/O chưa đọc xong nhưng pool đã giao buffer đó cho request khác; response có thể sai hoặc lộ dữ liệu. Chỉ trả buffer trong `finally` sau khi mọi consumer dùng xong, và xóa buffer nhạy cảm trước/trong lúc trả nếu policy yêu cầu.

OOM cũng không tự chứng minh “leak”. Có thể mỗi request materialize quá nhiều dữ liệu hoặc concurrency quá cao. Dump/đường tham chiếu giữ object còn sống phân biệt object bị giữ lâu với peak ngắn nhưng vượt memory limit; cách sửa hai trường hợp khác nhau.

## Chứng minh mình làm đúng

So sánh cùng traffic trước/sau: allocation rate, heap/working set, Gen2/LOH, GC pause, OOM restart và p99. Với export, kiểm số byte/dòng phát ra, cancellation và memory khi nhiều request chạy đồng thời. Một tối ưu giảm allocation nhưng tăng contention hoặc làm hỏng ownership chưa phải cải thiện.

## Nói trong phỏng vấn

“Với endpoint dùng nhiều RAM, em không bắt đầu bằng ép GC. Em đo allocation, heap và dump để biết object nào còn bị giữ. Export lớn thì em stream hoặc batch để giảm peak memory; resource do code mở được đóng bằng `await using`. Nếu profiler cho thấy buffer lớn được tạo lặp lại, em mới dùng `ArrayPool` với `try/finally` và kiểm dữ liệu không bị dùng sau `Return`. Em xác nhận bằng allocation, GC pause, OOM và p99 dưới cùng tải.”

## Interviewer thường hỏi tiếp

- Vì sao `Dispose` không có nghĩa object được GC ngay? Ai phải dispose `DbContext` lấy từ DI?
- Khi nào pooling làm hệ thống rủi ro hơn là nhanh hơn? Bạn tìm đường tham chiếu giữ object còn sống bằng evidence nào?

## Tự kiểm trước khi qua bài

- Tôi có phân biệt được object còn reachable với resource cần dispose không?
- Với export lớn, bước nào hạ peak memory trước khi nghĩ đến pool?
- Nếu buffer chứa dữ liệu nhạy cảm, ownership và thời điểm trả pool của tôi là gì?

## Nhớ một phút

- GC chỉ dọn object không còn reachable; cache/queue không giới hạn vẫn gây OOM.
- Stream hoặc batch trước, pool sau khi có số đo.
- Ownership rõ và `Return` đúng lúc quan trọng hơn một micro-optimization.
