# C# runtime và bộ nhớ: biết cái gì còn sống trước khi tối ưu

## Trong 30 giây

- GC là bộ dọn object managed (object do .NET quản lý) mà chương trình không còn tham chiếu tới. Nó không dọn thứ app vẫn giữ trong cache, queue hay singleton.
- `Dispose` trả tài nguyên như file handle, socket hoặc data reader đúng lúc; nó không bắt GC chạy ngay.
- Với dữ liệu lớn, giảm lượng dữ liệu cùng nằm trong RAM bằng stream hoặc batch trước khi nghĩ tới pool.

## Gặp ở đâu ngoài đời?

API export vài trăm nghìn dòng. Lúc ít người dùng thì ổn, lúc nhiều request cùng chạy thì container hết RAM và restart. Team gọi `GC.Collect()` nhưng lỗi vẫn quay lại.

Điểm cần tìm là: object nào đang còn được giữ, mỗi request tạo bao nhiêu dữ liệu, và bao nhiêu request chạy đồng thời.

## Hiểu đơn giản trước

**Bản chất.** Managed heap là vùng .NET tạo object như `string`, `List<T>` và class. GC đi từ các tham chiếu gốc của chương trình để tìm object còn reachable (còn đường tham chiếu tới). Object không còn reachable mới có thể được thu hồi.

**Cơ chế.** Một singleton giữ danh sách, queue không giới hạn, event handler chưa bỏ đăng ký hoặc closure giữ DTO đều giữ object sống lâu hơn dự tính. GC làm việc sau đó không thể tự xóa chúng vì app vẫn có thể dùng chúng.

**Phạm vi.** GC chỉ quản lý managed memory. File, socket, database reader và một số tài nguyên native cần được đóng đúng ownership. `using`/`await using` gọi `Dispose` khi scope xong; DI container thường dispose dependency mà nó tạo.

**Đừng hiểu nhầm.** OOM không tự chứng minh memory leak. Có thể mỗi request đang materialize quá nhiều dữ liệu hoặc concurrency quá cao. Large Object Heap (LOH) là vùng thường nhận allocation lớn, là tín hiệu để đo chứ không phải thủ phạm mặc định.

**Ví dụ nhỏ.** Export 200.000 dòng: thay vì `ToList()` toàn bộ, đọc từng batch rồi ghi ra response/file. Peak memory giảm vì cùng lúc chỉ giữ một batch. Chỉ dùng `ArrayPool<byte>` nếu profiler cho thấy cấp phát buffer lặp là điểm nóng.

## Từ cần biết

- **GC**: runtime thu hồi object managed không còn reachable.
- **Peak memory**: lượng RAM cao nhất cùng lúc.
- **LOH**: vùng heap cho allocation lớn; cần xem allocation và fragmentation thực tế.
- **ArrayPool**: nơi mượn/trả buffer để giảm cấp phát lặp lại.

## Cách quyết định, từng bước

1. Ghi rõ endpoint, kích thước payload, concurrency và memory limit của process/container.
2. Đo allocation rate, managed heap, Gen2/LOH, GC pause và working set. Lấy dump khi memory tăng để xem retaining path.
3. Giảm dữ liệu cùng lúc bằng projection, stream, batch hoặc pagination.
4. Rà ownership: code tự mở stream/reader thì tự đóng; không dispose object do caller hoặc DI sở hữu.
5. Nếu profiling cho thấy buffer hot, thử pool với `try/finally`, đo lại và test ownership.

## Chọn A hay B?

| Lựa chọn | Dùng khi | Đổi lại |
|---|---|---|
| Stream | consumer nhận dần được | cần xử lý lỗi/cancellation giữa luồng |
| Batch/pagination | dữ liệu chia được theo key/sort ổn định | cần contract resume rõ |
| `using`/`await using` | code sở hữu disposable resource | không dispose dependency của caller/DI |
| `ArrayPool<T>` | profiler cho thấy buffer allocation lặp là bottleneck | tăng rủi ro dùng buffer sai ownership |
| Cache có giới hạn | đọc lặp và chấp nhận dữ liệu cũ theo policy | cần TTL/size/tenant key rõ |

## Nếu có lỗi thì sao?

Trả buffer về pool trước khi async I/O dùng xong có thể làm request khác ghi đè dữ liệu; với dữ liệu nhạy cảm còn có nguy cơ lộ dữ liệu. Chỉ `Return` sau consumer cuối cùng, trong `finally`; cân nhắc xóa buffer theo policy.

Nếu memory tăng liên tục, dump cho biết object nào còn reachable. Nếu chỉ tăng theo số request đang chạy rồi hạ xuống, hãy giảm batch/concurrency thay vì gọi GC cưỡng bức.

## Chứng minh mình làm đúng

So sánh cùng traffic trước/sau: allocation rate, heap, GC pause, OOM restart và p95/p99. Với export, test số dòng/byte, cancellation và nhiều export đồng thời.

## Nói trong phỏng vấn

“Em tách hai việc: bộ nhớ do .NET tự quản lý và tài nguyên ứng dụng phải chủ động đóng. Một đối tượng còn được code giữ tham chiếu thì bộ gom rác chưa thể thu hồi; còn file hoặc kết nối do ứng dụng mở phải được đóng bằng `Dispose`. Khi API dùng nhiều RAM, em đo lượng bộ nhớ được cấp phát và xem ảnh chụp bộ nhớ để biết ứng dụng chỉ có một đỉnh dùng RAM hay đang giữ đối tượng quá lâu. Em ưu tiên đọc dữ liệu từng phần hoặc theo lô. Chỉ tái sử dụng vùng nhớ sau khi số liệu chứng minh việc cấp phát đang là nút thắt, và phải trả vùng nhớ sau người dùng cuối cùng.”

## Interviewer thường hỏi tiếp

- Vì sao `Dispose` không có nghĩa object biến mất ngay?
- OOM do peak và object bị giữ lâu khác nhau ở evidence nào?

## Tự kiểm trước khi qua bài

- Ai đang giữ object này sống?
- Ai sở hữu và đóng resource này?
- Có cách giảm dữ liệu cùng lúc trước khi dùng pool không?

## Nhớ một phút

- GC chỉ dọn thứ không còn reachable.
- Stream/batch giảm peak memory; pool không sửa ownership sai.
- Đo và xem retaining path trước khi kết luận leak.
