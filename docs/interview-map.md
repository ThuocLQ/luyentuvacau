# Bản đồ ôn phỏng vấn Senior Backend .NET

## Trong 30 giây

- Đừng đọc hết tài liệu rồi mới luyện; hãy chọn một lỗ hổng, nói trước, rồi ôn đúng phần thiếu.
- Một câu trả lời Senior cần có: bối cảnh, quyết định, cái giá phải trả và bằng chứng đã kiểm tra.
- Không biết một khái niệm thì học mental model; nói thiếu rủi ro thì học phần lỗi và trade-off.
- Mục tiêu là giải thích được quyết định, không phải nhớ tên pattern.

## Gặp ở đâu ngoài đời?

Ngày mai bạn có vòng Senior Backend. Bạn biết Redis, Kafka và `async`, nhưng khi được hỏi “partner payment timeout thì làm gì?” lại không biết bắt đầu từ đâu. Lỗi không nằm ở việc thiếu thêm tài liệu; bạn cần một cách biến kiến thức thành câu trả lời có điều kiện.

## Hiểu đơn giản trước

Ôn phỏng vấn giống debug hơn là đọc giáo trình. Một câu trả lời lưỡng lự là triệu chứng. Hãy xác định nó thiếu **cơ chế** (chưa hiểu chuyện gì xảy ra), thiếu **quyết định** (không biết chọn gì), hay thiếu **evidence (bằng chứng kiểm tra)**.

## Terms to Know

- [[Trade-off]] (điều được và cái giá phải trả): lý do một lựa chọn không đúng cho mọi tình huống.
- [[SLO]] (mục tiêu mức dịch vụ): con số hoặc ngưỡng nói rõ “đủ nhanh/ổn định” nghĩa là gì.
- [[Invariant]] (quy tắc không được sai): ví dụ một payment không được ghi nhận hai lần.

## Cách quyết định, từng bước

1. Chọn một câu bạn chưa trả lời trôi chảy. Nói tối đa một phút trước khi xem gợi ý; đây là cách lộ phần thiếu thật.
2. Ghi một lỗi cụ thể, như “chưa biết timeout payment có thể đã được xử lý”. Ôn bài liên quan, không mở nhiều tab mới.
3. Nói lại theo khung: kết luận → ràng buộc/invariant → cơ chế → trade-off → cách kiểm chứng.
4. Đổi một ràng buộc: tải tăng, downstream chậm, hoặc dữ liệu nhạy cảm hơn. Nếu quyết định không đổi, nói rõ vì sao.

## Chọn A hay B?

| Khi bạn cần | Cách ôn | Không nên làm |
|---|---|---|
| Chuẩn bị nhanh trước vòng đầu | Chọn Async, API, EF/SQL và một case distributed | Đọc toàn bộ theo thứ tự sidebar |
| Trả lời được nhưng thiếu chiều sâu | Làm follow-up và nêu failure/evidence | Thêm thuật ngữ vào câu trả lời |
| Vòng system design | Bắt đầu user journey, ownership, invariant | Vẽ microservice hoặc Kafka trước yêu cầu |

## Nếu có lỗi thì sao?

Nếu bạn chọn sai độ sâu, hậu quả thường là trả lời dài nhưng rỗng. Dấu hiệu là câu có nhiều công nghệ nhưng không nói được dữ liệu gốc ở đâu hoặc ai chịu trách nhiệm khi timeout. Khôi phục bằng cách quay về một case nhỏ và nói lại chỉ với các thành phần cần thiết.

## Chứng minh mình làm đúng

Ghi lại câu bạn đã đánh dấu “lưỡng lự”, rồi sau một lượt ôn tự nói lại mà không nhìn đáp án. Với case production, nêu metric, trace, constraint hoặc runbook bạn sẽ dùng; “em sẽ monitor” chưa là bằng chứng.

## Nói trong phỏng vấn

“Em sẽ bắt đầu từ điều không được sai và đường đi của request. Ví dụ payment timeout là kết quả chưa biết, nên em đối soát theo reference trước retry thay vì gửi lại. Cách này chậm hơn một chút ở nhánh lỗi, nhưng tránh charge trùng; em theo dõi số unknown outcome và mismatch khi đối soát.”

## Interviewer thường hỏi tiếp

- Nếu partner không có API tra trạng thái, bạn chặn hành động rủi ro và đối soát thế nào?
- Bạn biết câu trả lời này đúng trong môi trường hiện tại bằng signal nào?

## Tự kiểm trước khi qua bài

- Tôi có nói được một invariant của case mình đang ôn không?
- Tôi biết một điều giải pháp của mình chưa giải quyết không?
- Tôi sẽ xem bằng chứng nào trước khi kết luận có incident?

## Nhớ một phút

- Nói trước, xem sau.
- Ôn đúng lỗ hổng đã gọi tên.
- Câu Senior luôn có điều kiện, rủi ro và bằng chứng.
