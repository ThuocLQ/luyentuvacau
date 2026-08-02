# Khung trả lời System Design: đi từ yêu cầu đến một thiết kế có lý do

## Trong 30 giây

- System Design không phải cuộc thi kể tên công nghệ. Mục tiêu là biến yêu cầu còn mơ hồ thành một hệ thống có thể giải thích và vận hành.
- Bắt đầu bằng người dùng, luồng chính, quy mô và điều gì tuyệt đối không được sai.
- Vẽ đường đi của dữ liệu trước, rồi mới chọn database, cache, queue (hàng đợi) hay broker (nơi chuyển message).
- Mỗi lựa chọn phải trả lời được: giải quyết vấn đề gì, đổi lại điều gì và hỏng thì xử lý ra sao.
- Nói rõ giả định. Interviewer đánh giá cách bạn suy nghĩ nhiều hơn một sơ đồ “đúng duy nhất”.

## Gặp ở đâu ngoài đời?

Đề bài chỉ nói: “Thiết kế hệ thống đặt hàng”. Nếu vẽ ngay mười microservice, ta vẫn chưa biết một ngày có bao nhiêu đơn, có được bán quá tồn kho không, thanh toán chậm thì người dùng thấy gì, hay dữ liệu cần giữ bao lâu.

## Hiểu đơn giản trước

Một thiết kế tốt trả lời được bốn câu:

1. Hệ thống phục vụ ai và làm việc gì?
2. Điều gì phải luôn đúng?
3. Dữ liệu đi qua những bước nào và ai sở hữu nó?
4. Khi một bước chậm hoặc hỏng, hệ thống và người dùng sẽ thấy gì?

Sau đó mới tính đến quy mô và công nghệ. Ví dụ, “không được trừ tiền hai lần” là yêu cầu nghiệp vụ; mã thao tác ổn định để lần gọi lại không tạo payment thứ hai là một cách thực hiện. Đừng đảo ngược hai thứ này.

## Từ cần biết

- **Functional requirement** (yêu cầu chức năng): người dùng cần làm được gì.
- **SLO – service level objective** (mục tiêu chất lượng): mốc đo như 99,9% request thành công hoặc p95 dưới 300 ms.
- **Business invariant** (quy tắc nghiệp vụ không được sai): ví dụ tổng tiền trong ledger phải cân bằng.
- **Source of truth** (nguồn dữ liệu được coi là chính): nơi có quyền quyết định trạng thái cuối.
- **Data ownership** (quyền quyết định và ghi dữ liệu): ví dụ Order service là nơi duy nhất được đổi trạng thái đơn hàng.
- **Bottleneck** (nút thắt): thành phần giới hạn năng lực của toàn luồng.

## Cách quyết định, từng bước

1. Hỏi actor, luồng chính, luồng ngoài phạm vi và trải nghiệm khi hệ thống chậm.
2. Ước lượng đơn giản: request mỗi giây, kích thước dữ liệu, tỷ lệ đọc/ghi và đỉnh tải. Nói rõ giả định.
3. Chốt 2–3 business invariant quan trọng nhất và mức nhất quán cần có.
4. Vẽ luồng từ client đến nơi lưu dữ liệu và các hệ thống ngoài; ghi phần nào chịu trách nhiệm dữ liệu ở mỗi bước.
5. Chọn mô hình dữ liệu và API dựa trên cách đọc/ghi, không dựa trên tên công nghệ đang nổi.
6. Đi từng chỗ giao giữa các hệ thống bằng một ví dụ. Payment timeout thì Order ở `PaymentPending` (đang chờ xác minh), UI hiện “đang xác minh”, worker tra mã giao dịch rồi mới gửi lại khi an toàn. Sau đó mới tìm các điểm khác có thể chậm, trùng hoặc quá tải và chọn timeout, hàng đợi hay đối soát đúng nơi.
7. Cuối cùng mới nói về cache, partition, scale-out, cách theo dõi và kế hoạch tăng trưởng.

## Chọn A hay B?

| Lựa chọn | Hợp khi | Đổi lại |
|---|---|---|
| Xử lý đồng bộ | Người dùng cần kết quả ngay, chuỗi phụ thuộc ngắn | Lỗi và độ trễ truyền ngược về request |
| Xử lý bất đồng bộ qua queue | Việc có thể hoàn thành sau, cần hấp thụ tải đỉnh | Có trạng thái chờ, message trùng và độ trễ hội tụ |
| Một database | Cùng owner, cần transaction đơn giản | Khó scale hoặc tách ownership độc lập về sau |
| Tách database/service | Có ranh giới và nhu cầu vận hành độc lập rõ | Mất transaction chung, tăng chi phí theo dõi và đối soát |

## Nếu có lỗi thì sao?

Với mỗi mũi tên trên sơ đồ, hỏi: timeout thì sao, gửi lại có trùng không, queue đầy thì sao, dữ liệu cũ bao lâu thì chấp nhận được? Chọn một hoặc hai failure mode quan trọng để đào sâu thay vì liệt kê mọi mẫu thiết kế.

Ví dụ payment timeout: order ở trạng thái `PaymentPending`, người dùng được báo đang kiểm tra, worker tra cứu theo mã giao dịch và đối soát. Đây là thiết kế trải nghiệm cùng với thiết kế kỹ thuật.

## Chứng minh mình làm đúng

- Mỗi yêu cầu quan trọng nối được tới một thành phần và một cách đo.
- Ước lượng tải nhất quán với capacity được đề xuất.
- Business invariant có nơi thực thi rõ: constraint, transaction, idempotency hoặc đối soát.
- Có cách phát hiện hệ thống đang chậm, sai lệch hoặc mắc kẹt.

## Nói trong phỏng vấn

“Em làm rõ luồng chính, quy mô, SLO và các quy tắc nghiệp vụ không được sai (`business invariant`) trước. Sau đó em vẽ đường đi của dữ liệu, chốt service nào có quyền ghi dữ liệu và chọn storage theo cách đọc/ghi thực tế. Cache hoặc queue chỉ được thêm khi có lý do. Ở mỗi `transaction boundary` — phạm vi có thể commit hoặc rollback cùng nhau — em nói rõ timeout đưa hệ thống vào trạng thái nào, có được retry không và idempotency key nào ngăn tạo side effect lần nữa. Cuối cùng em chỉ ra bottleneck đầu tiên và khi nào cần scale-out.”

## Interviewer thường hỏi tiếp

### Cần ước lượng chính xác đến đâu?

Không cần đoán đúng từng request. Cần đủ để phân biệt 10 request/giây với 100.000 request/giây và phát hiện thiết kế vô lý. Nêu công thức, giả định và làm tròn để interviewer theo dõi được.

### Khi nào mới nên thêm Kafka hoặc cache?

Khi một yêu cầu cụ thể cần chúng: hấp thụ tải đỉnh, tách thời gian xử lý, phát cho nhiều consumer, hoặc giảm số lần đọc nguồn dữ liệu chậm. Nếu chưa nêu được vấn đề, chưa có cơ sở để thêm.

## Tự kiểm trước khi qua bài

- Ba business invariant quan trọng nhất là gì?
- Ai sở hữu trạng thái cuối ở mỗi bước?
- Khi dependency timeout, người dùng thấy trạng thái nào?

## Nhớ một phút

- Yêu cầu và business invariant đi trước công nghệ.
- Vẽ đường đi dữ liệu và chốt data ownership trước khi chia service.
- Mỗi lựa chọn cần có lý do, cái giá và cách xử lý khi hỏng.
