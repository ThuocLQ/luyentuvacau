# Cách luyện ngân hàng câu hỏi nền tảng

## Trong 30 giây

- Câu hỏi nền tảng kiểm tra cách ra quyết định, không chỉ kiểm tra định nghĩa.
- Trả lời theo: kết luận → cơ chế → rủi ro → bằng chứng.
- Đúng nhưng không nêu boundary vẫn chưa đủ cho vòng Senior.
- Đánh dấu câu lưỡng lự để quay lại, thay vì làm lại những câu quen.

## Gặp ở đâu ngoài đời?

Interviewer hỏi: “Vì sao không gọi `.Result` trong API?” Nếu bạn chỉ đáp “vì deadlock” thì người nghe vẫn chưa biết điều gì bị block, khi nào nó thực sự xảy ra, và bạn sẽ xử lý tải cao ra sao.

## Hiểu đơn giản trước

Một câu tốt là một mini decision record: bạn cho biết mình đang bảo vệ điều gì, chọn cách nào, và làm sao biết nó đang hỏng. Người phỏng vấn có thể đổi điều kiện để xem bạn có hiểu nguyên lý hay chỉ nhớ một câu mẫu.

## Terms to Know

- [[Invariant]] (quy tắc dữ liệu không được sai): giới hạn mà code và database phải cùng giữ.
- [[Idempotency boundary]] (ranh giới gọi lại không tạo thêm hiệu ứng): nơi bạn nhận diện một request hoặc event cũ.
- [[Failure mode]] (cách hệ thống có thể hỏng): timeout, duplicate, race hoặc dữ liệu cũ.

## Cách quyết định, từng bước

1. Rút một câu theo chủ đề đang yếu và đặt đồng hồ. Trả lời thành tiếng trước; đừng viết keyword.
2. Mở bằng kết luận có điều kiện: “Với API chờ I/O, em dùng async; với CPU-bound em giới hạn worker.”
3. Giải thích một cơ chế bằng case nhỏ, rồi nêu một failure còn lại.
4. Kết bằng thứ bạn sẽ đo/test/constraint để kiểm chứng. Tự chấm và lưu câu lưỡng lự.

## Chọn A hay B?

| Kiểu câu | Điều interviewer cần nghe | Tránh |
|---|---|---|
| Runtime/async | Chỗ nào chờ, capacity ở đâu, cancellation ra sao | “async luôn nhanh hơn” |
| Data | Invariant nằm ở đâu, race được chặn bằng gì | Chỉ tin kiểm tra ở application |
| Distributed | Timeout/duplicate/unknown outcome xử lý thế nào | Hứa exactly-once toàn workflow |
| Security | Server kiểm resource, tenant, quyền nào | Coi JWT hợp lệ là đủ quyền |

## Nếu có lỗi thì sao?

Câu trả lời có thể sai vì thiếu bối cảnh. Ví dụ retry một request có external side effect trước khi biết kết quả cũ có thể tạo charge trùng. Hãy nói rõ khi nào không retry và cần query hoặc reconciliation (đối soát) trước.

## Chứng minh mình làm đúng

Với mỗi câu, chọn một evidence cụ thể: integration test cho retry, unique constraint cho duplicate trong một database, trace cho latency, hoặc audit record cho payment. Evidence phải đúng boundary; cache hit rate không chứng minh ledger đúng.

## Nói trong phỏng vấn

“Em không xem retry là mặc định. Trước hết em xem thao tác có side effect nào và kết quả cũ có thể chưa biết không. Nếu có, em dùng idempotency key hoặc đối soát theo reference trước khi thử lại. Em theo dõi duplicate suppression và các request ở trạng thái unknown để biết quy tắc có đang bảo vệ đúng không.”

## Interviewer thường hỏi tiếp

- Nếu downstream chỉ trả timeout mà không có API tra cứu, bạn làm gì với người dùng?
- Constraint này chỉ bảo vệ trong database nào; phần bên ngoài được bảo vệ bằng gì?

## Tự kiểm trước khi qua bài

- Tôi có giải thích được cơ chế mà không dùng acronym không?
- Tôi có nêu một trường hợp không dùng giải pháp này không?
- Evidence của tôi có thật sự kiểm tra claim vừa nói không?

## Nhớ một phút

- Kết luận trước, keyword sau.
- Boundary quan trọng hơn tên pattern.
- Lưỡng lự là dữ liệu để ôn tiếp.
