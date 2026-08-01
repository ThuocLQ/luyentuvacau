# Kể câu chuyện dự án ở vòng Senior

## Trong 30 giây

- Story tốt kể một quyết định thật: vấn đề, phần bạn sở hữu, cơ chế, trade-off và evidence.
- Đừng nhận công của cả team hoặc bịa con số; nói scope và cách phối hợp rõ ràng.
- Với incident: ổn định trước, giữ evidence, tìm nguyên nhân, rồi thêm guard có owner.
- Kết bằng điều bạn sẽ làm khác đi lần sau.

## Gặp ở đâu ngoài đời?

Interviewer hỏi “Kể một incident bạn xử lý.” Nếu bạn trả lời “team em tối ưu database” thì họ không biết bạn đã quan sát gì, quyết định gì và kết quả được kiểm chứng ra sao. Một story rõ giúp họ đánh giá ownership (phần bạn chịu trách nhiệm), không phải trí nhớ công nghệ.

## Hiểu đơn giản trước

Story Senior là một incident report ngắn bằng lời thường. Người nghe cần theo được: ai bị ảnh hưởng, bạn có quyền thay đổi gì, vì sao chọn cách đó, và điều gì chứng minh kết quả. Công thức hữu ích là **O-M-T-E-R**: Ownership, Mechanism, Trade-off, Evidence, Reflection.

## Terms to Know

- [[SLO]] (mục tiêu mức dịch vụ): ngưỡng như p99 hoặc tỉ lệ lỗi gắn với trải nghiệm user.
- [[Trade-off]] (điều được và cái giá): ví dụ rollback nhanh nhưng tạm mất tính năng mới.
- [[Postmortem]] (bản phân tích sau incident): tài liệu học từ lỗi với action có owner, không phải tìm người để trách.

## Cách quyết định, từng bước

1. Chọn một case bạn thật sự tham gia và bỏ thông tin nhạy cảm. Mở đầu bằng impact: ai bị ảnh hưởng, trong bao lâu, nguy cơ gì.
2. Nêu ownership: bạn làm trực tiếp phần nào, ai phê duyệt hoặc phối hợp phần nào.
3. Mô tả evidence đã dẫn tới giả thuyết, rồi thay đổi nhỏ nhất để ổn định.
4. Nêu trade-off và kết quả đo được; nếu không có số chính xác, nói evidence có thật thay vì ước lượng.
5. Kết bằng guard chống tái diễn, owner và cách biết guard hoạt động.

## Chọn A hay B?

| Tình huống | Ưu tiên | Không nên làm |
|---|---|---|
| Incident đang ảnh hưởng user | Rollback, tắt flag, giảm tải trước | Tranh luận root cause khi hệ thống còn cháy |
| API p99 tăng | Trace/query plan và scope hẹp | Nói “tối ưu DB” không có cơ chế |
| Duplicate order | Chặn effect mới, đối soát record | Retry/compensate mù khi outcome chưa rõ |

## Nếu có lỗi thì sao?

Kể cả rollback cũng có rủi ro: dữ liệu tạo bởi version mới có thể không đọc được ở version cũ. Vì vậy story tốt nói luôn guard: migration tương thích ngược, feature flag, hay runbook đối soát. Nếu chưa có guard ở lúc đó, nói điều bạn đã bổ sung sau incident.

## Chứng minh mình làm đúng

Evidence có thể là trace trước/sau, query count, dashboard SLO, ticket đối soát hoặc test tái hiện lỗi. Nêu khoảng thời gian và scope nếu nhớ; “cải thiện nhiều” không đủ để người nghe kiểm tra quyết định.

## Nói trong phỏng vấn

“Một lần p99 của endpoint tìm đơn tăng sau release và ảnh hưởng người dùng giờ cao điểm. Em phụ trách API nên em rollback flag để ổn định, giữ trace và thấy một nhánh tạo N+1 query. Em chuyển sang projection có phân trang; đổi lại query phức tạp hơn, nên em thêm integration test query count và alert slow query. Sau đó p99 trở lại ngưỡng SLO trong cùng điều kiện tải.”

## Interviewer thường hỏi tiếp

- Nếu metric không hồi phục sau rollback, giả thuyết tiếp theo của bạn là gì?
- Teammate không đồng ý với giải pháp, bạn dùng evidence nào để quyết định?

## Tự kiểm trước khi qua bài

- Người nghe có phân biệt được việc tôi làm và việc team làm không?
- Tôi có nói impact trước giải pháp không?
- Guard sau incident có owner và cách kiểm chứng chưa?

## Nhớ một phút

- Impact → ownership → mechanism → trade-off → evidence → reflection.
- Ổn định trước, học sau.
- Không bịa metric.
