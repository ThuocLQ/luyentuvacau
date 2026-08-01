# Trả lời câu hỏi đào sâu ở vòng Senior

## Trong 30 giây

- Follow-up thay đổi một ràng buộc; đừng phản xạ thay công nghệ ngay.
- Nêu điều gì đổi, invariant nào bị ảnh hưởng và signal nào quyết định bước tiếp.
- `async` không tạo capacity; queue không tự loại duplicate; cache không thành nguồn dữ liệu gốc.
- Một câu tốt luôn nói điều còn rủi ro.

## Gặp ở đâu ngoài đời?

Bạn vừa nói dùng queue để gửi email. Interviewer hỏi: “Nếu backlog tăng mười lần và user cần biết kết quả ngay thì sao?” Đây không phải câu đố về Kafka. Họ muốn nghe bạn cân bằng trải nghiệm user, capacity downstream và khả năng khôi phục.

## Hiểu đơn giản trước

Follow-up là kiểm tra độ bền của quyết định. Hãy giữ nguyên problem, thay một constraint, rồi xem baseline còn đúng không. Nếu đổi, nói chính xác thành phần nào đổi và chi phí vận hành mới là gì.

## Terms to Know

- [[Trade-off]] (điều được đổi lấy chi phí/rủi ro): không có lựa chọn tốt tuyệt đối.
- [[Failure mode]] (cách hỏng): điều kiện lỗi phải được nêu trước khi chọn guard.
- [[Backpressure]] (giảm tốc đầu vào khi đầu ra quá tải): bảo vệ downstream thay vì nhận vô hạn.

## Cách quyết định, từng bước

1. Nhắc lại assumption ban đầu và quyết định ban đầu.
2. Nói constraint mới ảnh hưởng latency, correctness, cost hay operations ở đâu.
3. Chỉ đổi thành phần tối thiểu: thêm concurrency limit, idempotency record, queue hoặc cache khi nó giải quyết đúng vấn đề.
4. Kết bằng metric và điều kiện rollback/giảm rủi ro.

## Chọn A hay B?

| Constraint mới | Quyết định có thể đổi | Trade-off |
|---|---|---|
| Downstream bị quá tải | Giới hạn concurrency và backpressure | Một số request chờ/lỗi sớm |
| User cần kết quả ngay | Sync ở critical path, async phần phụ | Phụ thuộc availability của downstream |
| Request timeout, kết quả chưa biết | Query/đối soát trước retry | Nhánh lỗi chậm hơn |
| Đọc nhiều, dữ liệu cũ chấp nhận được | Cache-aside có TTL/fallback | Có stale data và invalidation |

## Nếu có lỗi thì sao?

Một lỗi hay gặp là “scale bằng `Task.Run`”. Công việc sẽ mất khi process restart và làm downstream quá tải. Nếu công việc phải tồn tại qua restart, lưu job bền vững; worker chỉ đánh dấu xong sau khi lưu kết quả, và retry có budget/DLQ cho lỗi không tự hết.

## Chứng minh mình làm đúng

Nêu signal đúng với thay đổi: queue depth và age cho backlog; saturation/timeout của downstream cho concurrency; duplicate suppression cho retry; p95/p99 và error rate cho sync path. Có signal nhưng không có ngưỡng hành động vẫn chưa là vận hành được.

## Nói trong phỏng vấn

“Với tải hiện tại em giữ gửi email bất đồng bộ để request đặt hàng không chờ provider. Nếu queue age tăng và SLO thông báo bị vi phạm, em không chỉ tăng worker; em kiểm capacity provider, giới hạn concurrency và ưu tiên loại job. Đổi lại một số notification chậm, nên UI phải hiện pending và alert đi kèm runbook.”

## Interviewer thường hỏi tiếp

- Nếu queue broker mất một thời gian ngắn, business fact nào phải được giữ ở đâu?
- Khi nào cache làm sai quyết định thay vì chỉ làm kết quả đọc cũ?

## Tự kiểm trước khi qua bài

- Tôi có nói constraint mới thay đổi điều gì không?
- Tôi có nêu chi phí vận hành của giải pháp mới không?
- Tôi biết signal nào buộc mình đổi/rollback không?

## Nhớ một phút

- Constraint đổi → kiểm tra baseline.
- Chỉ thêm thành phần có lý do.
- Signal biến nhận định thành quyết định.
