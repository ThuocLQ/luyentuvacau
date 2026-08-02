# Luyện câu hỏi nền tảng: biến “biết” thành “nói được”

## Trong 30 giây

- Ngân hàng câu hỏi là công cụ luyện nhớ và suy luận, không phải danh sách đáp án để học thuộc.
- Một câu trả lời tốt bắt đầu bằng kết luận rõ, sau đó mới giải thích cơ chế và điều kiện.
- Mỗi lần luyện chỉ tập trung một ý chính; câu đào sâu dùng để kiểm tra giới hạn hiểu biết.
- Trả lời sai là dữ liệu để biết mình thiếu ở đâu.
- Ôn lại theo khoảng cách thời gian giúp nhớ lâu hơn đọc đi đọc lại.

## Gặp ở đâu ngoài đời?

Bạn đọc bài về `async/await` và thấy rất quen. Nhưng khi được hỏi “await thực sự làm gì khi Task chưa hoàn thành?”, câu trả lời lại thành “nó chạy async và nhả thread”. Cảm giác quen không đồng nghĩa với hiểu đúng.

## Hiểu đơn giản trước

Một câu hỏi tốt buộc bạn lấy kiến thức ra khỏi trí nhớ và dùng nó trong bối cảnh. Sau khi trả lời, bạn cần biết chính xác phần nào đúng, phần nào thiếu và câu nào gây hiểu sai.

Dùng khung ngắn: **kết luận → cơ chế → khi dùng → cái giá → cách kiểm tra**. Không phải câu nào cũng cần đủ năm phần, nhưng khung này ngăn câu trả lời chỉ còn định nghĩa.

## Từ cần biết

- **Tự nhớ lại** (active recall): tự trả lời trước khi xem đáp án.
- **Ôn cách quãng** (spaced repetition): xem lại sau những khoảng thời gian tăng dần.
- **Phương án nhiễu**: đáp án sai nhưng đủ hợp lý để kiểm tra hiểu biết thật.
- **Câu hỏi đào sâu**: thay dữ kiện hoặc hỏi giới hạn của câu trả lời.
- **Thang chấm**: tiêu chí rõ để biết câu trả lời đang thiếu gì.

## Cách quyết định, từng bước

1. Chọn 5–10 câu theo một chủ đề, không xem note.
2. Trả lời thành tiếng trong tối đa 90 giây và ghi mức tự tin trước khi xem đáp án.
3. So với lời giải theo từng mục: kết luận, cơ chế, điều kiện, lỗi có thể xảy ra và cách kiểm tra.
4. Viết lại đúng một câu khiến bạn sai; tránh chép toàn bộ đáp án.
5. Trả lời ngay một câu đào sâu có đổi dữ kiện.
6. Đưa câu sai vào lịch ôn của web (mặc định 1, 3 và 7 ngày); câu đúng chắc có thể ôn thưa hơn.

## Chọn A hay B?

| Cách luyện | Tác dụng |
|---|---|
| Đọc lại đáp án | Tạo sự quen mắt, hữu ích khi mới học nhưng khó đo khả năng nhớ |
| Tự trả lời trước | Cho thấy đúng lỗ hổng và luyện cách diễn đạt |
| Học nguyên câu mẫu | Nhanh nhưng dễ vỡ khi interviewer đổi dữ kiện |
| Tự tạo ví dụ | Chứng minh bạn hiểu cơ chế và áp dụng được |

## Nếu có lỗi thì sao?

Nếu chọn đúng nhưng lý do sai, vẫn đánh dấu câu đó là chưa chắc. Có thể bạn đoán theo độ dài hoặc từ khóa của đáp án.

Nếu câu hỏi thiếu dữ kiện, hãy nêu dữ kiện cần thêm và trả lời theo giả định rõ ràng. Đây chính là kỹ năng tốt trong phỏng vấn System Design.

Nếu đáp án dùng thuật ngữ bạn không giải thích được, mở bài liên quan và viết lại bằng lời đời thường trước khi học tiếp.

## Chứng minh mình làm đúng

- Sau vài ngày vẫn trả lời được mà không nhìn tài liệu.
- Khi đổi một dữ kiện, bạn biết quyết định có đổi hay không.
- Câu trả lời bớt từ mơ hồ như “tối ưu hơn”, “scale tốt” và có cơ chế cụ thể.
- Có thể chỉ ra chính xác vì sao từng đáp án gần đúng vẫn chưa phù hợp.

## Nói trong phỏng vấn

“Với catalog được đọc nhiều, em chấp nhận tên và mô tả cũ tối đa 30 giây nên dùng cache để giảm số lần đọc database. Đến checkout, em vẫn đọc giá từ source of truth vì giá phải đúng tại lúc mua. Nếu cache lỗi, em chỉ cho một lượng request giới hạn fallback về database để tránh quá tải. Sau deploy, em theo dõi cache hit rate, tải database và latency. Nếu catalog phải hiện thay đổi ngay, em sẽ bỏ cache này hoặc đổi chiến lược cache invalidation.”

## Interviewer thường hỏi tiếp

### Câu trả lời 90 giây cần có gì?

Một kết luận trực tiếp, hai hoặc ba bước cơ chế, điều kiện áp dụng và một rủi ro đáng kể. Nếu còn thời gian, nói cách đo. Không cần đọc cả chương sách.

### Khi không biết câu trả lời thì làm sao?

Nói phần mình biết chắc, tách điều đang suy luận và hỏi thêm bối cảnh. Trình bày cách sẽ kiểm chứng. Sự trung thực có cấu trúc tốt hơn một câu khẳng định tự tin nhưng sai.

## Tự kiểm trước khi qua bài

- Bạn đang nhớ lại hay chỉ nhận ra câu chữ quen?
- Bạn có giải thích được vì sao phương án sai là sai trong bối cảnh này không?
- Câu nào cần ôn lại ngày mai?

## Nhớ một phút

- Trả lời trước, xem đáp án sau.
- Chấm cả lý do, không chỉ chấm đáp án.
- Học cơ chế để vẫn trả lời được khi dữ kiện thay đổi.
