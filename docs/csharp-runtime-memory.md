# C# Runtime, GC và Memory

## Quick Summary

- GC thu hồi managed object mà chương trình không còn retaining path tới. Nó không thu hồi object app vẫn giữ qua cache, queue, singleton hoặc event handler.
- `Dispose` trả tài nguyên như file handle, socket hoặc data reader đúng lúc; nó không bắt GC chạy ngay.
- Với dữ liệu lớn, giảm lượng dữ liệu cùng nằm trong RAM bằng stream hoặc batch trước khi nghĩ tới pool.

## Scenario: export làm process hết RAM

API export vài trăm nghìn dòng. Lúc ít người dùng thì ổn, lúc nhiều request cùng chạy thì container hết RAM và restart. Team gọi `GC.Collect()` nhưng lỗi vẫn quay lại.

Điểm cần tìm là: object nào đang còn được giữ, mỗi request tạo bao nhiêu dữ liệu, và bao nhiêu request chạy đồng thời.

## Mental Model: object sống vì còn retaining path

**Bản chất.** Managed heap là vùng .NET tạo object như `string`, `List<T>` và class. GC đi từ các tham chiếu gốc của chương trình để tìm object còn reachable (còn đường tham chiếu tới). Object không còn reachable mới có thể được thu hồi.

**Cơ chế.** Một singleton giữ danh sách, queue không giới hạn, event handler chưa bỏ đăng ký hoặc closure giữ DTO đều giữ object sống lâu hơn dự tính. GC làm việc sau đó không thể tự xóa chúng vì app vẫn có thể dùng chúng.

**Phạm vi.** GC chỉ quản lý managed memory. File, socket, database reader và một số tài nguyên native cần được đóng đúng ownership. `using`/`await using` gọi `Dispose` khi scope xong; DI container thường dispose dependency mà nó tạo.

**Đừng hiểu nhầm.** OOM không tự chứng minh memory leak. Có thể mỗi request đang materialize quá nhiều dữ liệu hoặc concurrency quá cao. Large Object Heap (LOH) là vùng thường nhận allocation lớn, là tín hiệu để đo chứ không phải thủ phạm mặc định.

**Ví dụ nhỏ.** Export 200.000 dòng: thay vì `ToList()` toàn bộ, đọc từng batch rồi ghi ra response/file. Peak memory giảm vì cùng lúc chỉ giữ một batch. Chỉ dùng `ArrayPool<byte>` nếu profiler cho thấy cấp phát buffer lặp là điểm nóng.

## Terms

- **GC**: runtime thu hồi object managed không còn reachable.
- **Peak memory**: lượng RAM cao nhất cùng lúc.
- **LOH**: vùng heap cho allocation lớn; cần xem allocation và fragmentation thực tế.
- **ArrayPool**: nơi mượn/trả buffer để giảm cấp phát lặp lại.

## Diagnostic Workflow

1. Ghi rõ endpoint, kích thước payload, concurrency và memory limit của process/container.
2. Đo allocation rate, managed heap, Gen2/LOH, GC pause và working set. Lấy dump khi memory tăng để xem retaining path.
3. Giảm dữ liệu cùng lúc bằng projection, stream, batch hoặc pagination.
4. Rà ownership: code tự mở stream/reader thì tự đóng; không dispose object do caller hoặc DI sở hữu.
5. Nếu profiling cho thấy buffer hot, thử pool với `try/finally`, đo lại và test ownership.

## Code: stream dưới dạng NDJSON trước, pooling sau

Ví dụ minh họa dưới đây ghi mỗi row thành một JSON object trên một dòng, tức định dạng NDJSON/JSON Lines chứ không phải JSON array. Endpoint dùng contract này nên trả `Content-Type: application/x-ndjson`. Method sở hữu `DbDataReader` nên dùng `await using`; stream `output` do caller truyền vào nên method không được dispose.

```csharp
private static readonly byte[] NewLine = [(byte)'\n'];

static async Task ExportAsync(
    DbCommand command,
    Stream output,
    CancellationToken cancellationToken)
{
    await using var reader = await command.ExecuteReaderAsync(cancellationToken);

    while (await reader.ReadAsync(cancellationToken))
    {
        var row = MapExportRow(reader);
        await JsonSerializer.SerializeAsync(
            output, row, cancellationToken: cancellationToken);
        await output.WriteAsync(NewLine, cancellationToken);
    }
}
```

Đây là streaming ở tầng app; database provider vẫn có thể buffer một phần dữ liệu. Cần đo memory và cancellation với đúng provider. Chỉ dùng `ArrayPool<T>` khi profiler chỉ ra buffer allocation là bottleneck; khi đó luôn `Return` trong `finally` và chỉ sau consumer cuối cùng của buffer.

## Decision Table

| Lựa chọn | Dùng khi | Đổi lại |
|---|---|---|
| Stream | consumer nhận dần được | cần xử lý lỗi/cancellation giữa luồng |
| Batch/pagination | dữ liệu chia được theo key/sort ổn định | cần contract resume rõ |
| `using`/`await using` | code sở hữu disposable resource | không dispose dependency của caller/DI |
| `ArrayPool<T>` | profiler cho thấy buffer allocation lặp là bottleneck | tăng rủi ro dùng buffer sai ownership |
| Cache có giới hạn | đọc lặp và chấp nhận dữ liệu cũ theo policy | cần TTL/size/tenant key rõ |

## Failure Modes

Trả buffer về `ArrayPool` trước khi async I/O dùng xong có thể làm request khác ghi đè dữ liệu; với dữ liệu nhạy cảm còn có nguy cơ lộ dữ liệu. Chỉ `Return` trong `finally`, sau consumer cuối cùng của buffer; cân nhắc xóa buffer theo policy.

Nếu memory tăng liên tục, dump cho biết object nào còn reachable. Nếu chỉ tăng theo số request đang chạy rồi hạ xuống, hãy giảm batch/concurrency thay vì gọi GC cưỡng bức.

## Evidence cần đo

So sánh cùng traffic trước/sau: allocation rate, heap, GC pause, OOM restart và p95/p99. Với export, test số dòng/byte, cancellation và nhiều export đồng thời.

## Interview Answer

“Em tách managed memory do GC quản lý khỏi resource mà app phải `Dispose`. Khi memory tăng, em kiểm tra allocation rate, managed heap và memory dump để xem object bị giữ bởi retaining path nào. Với export lớn, em ưu tiên streaming hoặc batch trước khi cân nhắc `ArrayPool<T>`. Nếu dùng pooled buffer, ownership phải rõ và chỉ `Return` sau consumer cuối cùng.”

## Follow-up

- Vì sao `Dispose` không có nghĩa object biến mất ngay?
- OOM do peak và object bị giữ lâu khác nhau ở evidence nào?

## Self-check

- Ai đang giữ object này sống?
- Ai sở hữu và đóng resource này?
- Có cách giảm dữ liệu cùng lúc trước khi dùng pool không?

## Final Recall

- GC chỉ dọn thứ không còn reachable.
- Streaming hoặc batch giảm peak memory; `ArrayPool<T>` không sửa ownership sai.
- Đo và xem retaining path trước khi kết luận leak.
