# Trả lời câu hỏi đào sâu ở vòng Senior

## Trong 30 giây

- Câu hỏi đào sâu kiểm tra điều kiện và giới hạn trong quyết định của bạn.
- Tránh “X luôn tốt hơn Y”. Hãy nói X phù hợp vì dữ kiện nào.
- Một câu trả lời Senior nối được cơ chế với hậu quả production.
- Khi interviewer đổi dữ kiện, sẵn sàng đổi quyết định nếu tiêu chí đã đổi.
- Không cần biết mọi thứ; cần phân biệt điều biết chắc, giả định và cách kiểm chứng.

## Gặp ở đâu ngoài đời?

Bạn đề xuất cache cho catalog vì khách đọc sản phẩm nhiều và chấp nhận tên/mô tả cũ trong 30 giây. Interviewer hỏi tiếp: “Giá checkout có được cũ không?”, “Cache chết có làm database sập không?”. Họ không phủ nhận cache; họ đang kiểm tra bạn có nhìn thấy toàn bộ vòng đời của lựa chọn hay không.

## Hiểu đơn giản trước

Câu hỏi “vì sao không chọn X?” thường cần bốn ý:

1. Dữ kiện đang quyết định lựa chọn.
2. Cơ chế khiến phương án hiện tại phù hợp.
3. Cái giá và rủi ro còn lại.
4. Điều kiện nào sẽ khiến bạn đổi sang X.

Nếu chưa đủ dữ kiện, hỏi thêm hoặc nêu giả định. Đây không phải né câu hỏi; đó là cách tránh đưa ra kết luận tuyệt đối.

## Từ cần biết

- **Constraint** (ràng buộc): giới hạn phải chấp nhận, như ngân sách, thời gian phản hồi hoặc quy định.
- **Trade-off** (đánh đổi): lợi ích và chi phí cùng xuất hiện khi chọn một phương án.
- **Reversibility** (khả năng đổi lại): mức dễ hay khó khi muốn đảo quyết định.
- **Blast radius** (phạm vi ảnh hưởng): số người dùng hoặc hệ thống bị tác động khi lỗi.
- **Leading indicator** (tín hiệu báo sớm): số đo cho thấy vấn đề đang hình thành trước khi sự cố xảy ra.

## Cách quyết định, từng bước

1. Nhắc lại ngắn dữ kiện quan trọng: tải, độ trễ, tính đúng, owner hoặc deadline.
2. Nêu kết luận bằng một câu, không vòng vo.
3. Giải thích cơ chế: vì sao lựa chọn tạo ra kết quả mong muốn.
4. Thừa nhận một cái giá thật và cách giảm rủi ro.
5. Nói tín hiệu sẽ theo dõi sau khi triển khai.
6. Chốt điều kiện khiến quyết định thay đổi.

## Chọn A hay B?

| Câu hỏi | Cách trả lời hữu ích |
|---|---|
| “Vì sao không dùng microservice?” | Nói ranh giới/ownership chưa đủ rõ và chi phí phân tán; nêu tín hiệu khi nên tách |
| “Vì sao không cache?” | Nói độ mới dữ liệu, hit rate dự kiến và cách cache miss tác động database |
| “Vì sao không retry?” | Nói lỗi có tạm thời không, kết quả đã có thể xảy ra chưa và thao tác có chống trùng không |
| “Nếu tải tăng 10 lần?” | Xác định nút thắt đầu tiên, cách đo và thay đổi nhỏ nhất cần làm |

## Nếu có lỗi thì sao?

Nếu phát hiện giả định ban đầu sai, nói thẳng và cập nhật kết luận: “Với dữ kiện mới là…, em sẽ đổi sang… vì…”. Bám vào quyết định cũ chỉ để tỏ ra nhất quán là một dấu hiệu xấu.

Nếu chưa từng trực tiếp vận hành giải pháp, phân biệt kinh nghiệm và suy luận: “Em chưa chạy mô hình này ở quy mô đó. Dựa trên cơ chế…, rủi ro em kiểm tra trước là…”.

## Chứng minh mình làm đúng

- Câu trả lời có một điều kiện cụ thể, không chỉ có tên pattern.
- Có ít nhất một rủi ro và một số đo sau triển khai.
- Biết khi nào giải pháp không còn phù hợp.
- Có thể nói ngắn lại trong 30 giây mà vẫn giữ logic chính.

## Nói trong phỏng vấn

“Với catalog được đọc nhiều, em cache tên và mô tả trong 30 giây để giảm số lần đọc database. Checkout vẫn đọc giá từ source of truth vì không chấp nhận giá cũ. Nếu cache lỗi, em giới hạn số request fallback về database và theo dõi tải. Nếu catalog phải cập nhật ngay, em sẽ bỏ cache này hoặc đổi chiến lược cache invalidation.”

## Interviewer thường hỏi tiếp

### Nếu interviewer không đồng ý thì sao?

Hỏi xem họ đang ưu tiên tiêu chí nào khác, rồi so sánh trên cùng tiêu chí. Có thể họ đang đưa thêm dữ kiện. Mục tiêu là làm rõ quyết định, không phải thắng tranh luận.

### Có cần nêu mọi trade-off không?

Không. Chọn một hoặc hai đánh đổi có ảnh hưởng lớn nhất tới bài toán. Danh sách dài nhưng không gắn bối cảnh làm câu trả lời loãng.

## Tự kiểm trước khi qua bài

- Dữ kiện nào đang quyết định lựa chọn?
- Rủi ro lớn nhất còn lại là gì?
- Tín hiệu nào sẽ khiến bạn đổi phương án?

## Nhớ một phút

- Điều kiện trước, lựa chọn sau.
- Giải thích cơ chế, cái giá và cách đo.
- Dữ kiện đổi thì quyết định được phép đổi.
