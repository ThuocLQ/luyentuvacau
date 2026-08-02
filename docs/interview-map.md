# Bản đồ ôn phỏng vấn Senior Backend .NET

## Trong 30 giây

- Ôn theo lỗ hổng ảnh hưởng lớn, không đọc lần lượt từ bài 1 đến bài cuối.
- Một chủ đề chỉ được coi là biết khi bạn giải thích được bằng lời thường, đưa ví dụ và nói được cái giá của lựa chọn.
- Ưu tiên nền tảng chạy xuyên suốt: async, database, API/security, hệ thống phân tán và vận hành production.
- Mỗi buổi nên có ba phần: học một ý, trả lời thành tiếng, rồi sửa câu trả lời.
- Số bài đã đọc không quan trọng bằng khả năng xử lý một tình huống mới.

## Gặp ở đâu ngoài đời?

Bạn còn một tuần nhưng tài liệu có hơn hai mươi bài. Đọc hết dễ tạo cảm giác quen mắt, đến lúc bị hỏi “vì sao” hoặc “hỏng thì sao” lại không nói được. Bản đồ này giúp chọn đúng phần cần luyện trước.

## Hiểu đơn giản trước

Senior không chỉ nhớ API. Người phỏng vấn muốn thấy bạn nối được: vấn đề → cơ chế → quyết định → rủi ro → bằng chứng.

Hãy tự chẩn đoán bằng một câu hỏi tình huống. Nếu trả lời được định nghĩa nhưng không giải thích được cơ chế hoặc failure mode, chủ đề đó vẫn đang yếu. Nếu nói được quyết định nhưng không có cách đo, câu trả lời chưa lên mức Senior.

## Từ cần biết

- **Recall** (tự nhớ lại): trả lời khi không nhìn tài liệu.
- **Trade-off** (đánh đổi): lợi ích nhận được và cái giá phải chịu khi chọn một phương án.
- **Failure mode** (cách hệ thống hỏng): tình huống lỗi cụ thể và hậu quả của nó.
- **Bằng chứng**: số đo, trace, query plan, test hoặc sự kiện chứng minh nhận định.
- **Mock interview** (phỏng vấn thử): luyện trong thời gian và cách hỏi giống buổi thật.

## Cách quyết định, từng bước

1. Làm một vòng quiz ngắn không xem tài liệu và ghi chủ đề khiến bạn phải đoán.
2. Với mỗi chủ đề yếu, đọc phần “Hiểu đơn giản”, tự vẽ lại cơ chế và nói một ví dụ của chính bạn.
3. Trả lời thành tiếng trong 60–90 giây theo khung: kết luận, cơ chế, đánh đổi, một lỗi có thể xảy ra và cách đo.
4. Nghe lại và bỏ câu dài, thuật ngữ chưa giải thích hoặc tuyên bố “luôn luôn”.
5. Luyện câu hỏi đào sâu: “Nếu tải tăng?”, “Nếu dependency timeout?”, “Vì sao không chọn cách khác?”.
6. Trong lúc ôn, xen một câu chuyện dự án có số liệu thật và phần bạn trực tiếp sở hữu.

## Chọn A hay B?

| Nếu bạn đang... | Làm trước |
|---|---|
| Không giải thích được khái niệm | Đọc bài nền và tự nói lại bằng ví dụ nhỏ |
| Biết khái niệm nhưng trả lời lan man | Luyện câu 60–90 giây, kết luận trước |
| Trả lời lý thuyết tốt nhưng thiếu thực tế | Gắn với incident hoặc quyết định trong dự án |
| Sắp phỏng vấn trong 1–2 ngày | Ôn lỗi yếu nhất, mock và project story; không mở rộng thêm chủ đề |

## Nếu có lỗi thì sao?

Nếu câu trả lời bị bí, đừng học thuộc nguyên đoạn mẫu. Ghi đúng điểm đứt: thiếu định nghĩa, không hiểu cơ chế, không có ví dụ hay không biết failure mode. Quay lại đúng phần đó rồi trả lời lại ngay.

Nếu chưa từng làm công nghệ được hỏi, nói rõ phạm vi kinh nghiệm và suy luận từ nguyên tắc đã biết. Không bịa số liệu hoặc nhận việc của team thành việc cá nhân.

## Chứng minh mình làm đúng

- Có thể giải thích một chủ đề cho người không cùng chuyên môn mà không mất ý chính.
- Trả lời được câu “vì sao không chọn X?” bằng điều kiện cụ thể.
- Mỗi câu có ít nhất một failure mode và một cách đo.
- Sau một tuần, tỷ lệ câu phải đoán giảm và câu trả lời ngắn, rõ hơn.

## Nói trong phỏng vấn

“Em thường nêu quyết định trước, rồi giải thích vì sao nó phù hợp với tình huống đang có. Em nói rõ điều kiện áp dụng, rủi ro còn lại và cách kiểm chứng bằng số liệu hoặc bài kiểm tra. Nếu thiếu dữ kiện, em sẽ hỏi thêm hoặc nói rõ giả định thay vì coi một giải pháp là đúng cho mọi trường hợp.”

## Interviewer thường hỏi tiếp

### Học sâu hay học rộng trước?

Đạt mức tối thiểu ở các chủ đề nền trước, rồi đào sâu vào phần gần công việc và mô tả tuyển dụng. Một Senior backend không cần biết mọi thư viện nhưng phải giữ được tính đúng đắn, hiệu năng và khả năng vận hành ở các ranh giới chính.

### Dùng quiz thế nào cho hiệu quả?

Chọn đáp án trước khi xem giải thích. Sau đó nói lại vì sao từng phương án sai trong đúng bối cảnh. Cuối cùng đổi một dữ kiện và xem quyết định có thay đổi không.

## Tự kiểm trước khi qua bài

- Ba chủ đề yếu nhất của bạn là gì và bằng chứng nào cho thấy điều đó?
- Bạn có thể trả lời một câu trong 90 giây mà không đọc note không?
- Project story nào chứng minh cách bạn xử lý rủi ro production?

## Nhớ một phút

- Ôn theo lỗ hổng, không theo số trang.
- Hiểu là nói lại được cơ chế và giới hạn bằng lời của mình.
- Luyện trả lời thành tiếng mới biến kiến thức thành kỹ năng phỏng vấn.
