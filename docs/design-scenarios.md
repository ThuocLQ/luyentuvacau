# Giải tình huống System Design: bốn mẫu thường gặp

## Trong 30 giây

- Đừng học thuộc một sơ đồ. Hãy nhận ra loại công việc: cần kết quả ngay, xử lý nền, phát thông báo hay tìm kiếm dữ liệu.
- Mỗi tình huống dưới đây bắt đầu từ trạng thái nghiệp vụ và điều không được sai.
- Queue (hàng đợi), cache hay search engine chỉ được thêm khi có một nhu cầu rõ.
- Luôn nói người dùng thấy gì khi công việc chưa xong hoặc kết quả chưa biết.
- Một câu trả lời Senior có cả đường thành công, đường lỗi và cách vận hành.

## Gặp ở đâu ngoài đời?

Interviewer thường đổi tên bài toán nhưng giữ nguyên cấu trúc: đặt hàng có payment, gửi notification, xử lý file lớn, hoặc tìm kiếm catalog. Nếu hiểu dòng dữ liệu và đường lỗi, bạn có thể thích nghi thay vì cố nhớ hình vẽ.

## Hiểu đơn giản trước

Hãy dùng cùng bốn câu hỏi cho mọi đề:

1. Việc nào phải xong trước khi trả lời người dùng?
2. Trạng thái nào là nguồn chính, trạng thái nào chỉ là bản sao để đọc nhanh?
3. Một yêu cầu đến hai lần có tạo hậu quả không?
4. Ai phát hiện và sửa công việc bị mắc kẹt?

Sau đó chọn một mẫu gần nhất và điều chỉnh theo dữ kiện của đề.

## Từ cần biết

- **Command** (lệnh): yêu cầu một hệ thống thực hiện việc gì đó, như `ChargePayment`.
- **Event** (sự kiện): thông báo một việc đã xảy ra, như `PaymentSucceeded`.
- **Projection** (bản dữ liệu phục vụ đọc): dữ liệu được sắp lại để một màn hình truy vấn nhanh.
- **Signed URL** (đường dẫn có chữ ký và hạn dùng): cho phép tải file trực tiếp trong thời gian giới hạn.
- **Backfill** (bổ sung dữ liệu cũ): chạy lại để tạo phần dữ liệu còn thiếu sau khi đổi schema hoặc logic.

## Cách quyết định, từng bước

1. **Order/Payment:** khách bấm trả tiền cho order `O-12`. API lưu order `Pending` và mã giao dịch ổn định. Provider timeout thì UI hiện “đang xác minh”; worker tra mã đó trước khi charge lại.
2. **Notification:** order đã xác nhận tạo một yêu cầu gửi bền. Worker gửi email, lưu kết quả theo người nhận + mẫu + sự kiện để lần giao lại không gửi trùng; khách có thể tắt loại email không bắt buộc.
3. **File processing:** người dùng tải file thẳng vào nơi chứa file qua signed URL. App tạo job; worker quét virus, kiểm tra định dạng, xử lý từng phần và lưu mốc đã xong để restart vẫn làm tiếp được.
4. **Catalog/Search:** người bán đổi tên sản phẩm trong database nghiệp vụ; đây là `source of truth`, tức nơi quyết định tên sản phẩm cuối cùng. Event cập nhật search index — bản sao tối ưu cho việc tìm kiếm — theo cách async; trong lúc chờ, kết quả tìm có thể cũ trong thời gian đã công bố.
5. Với mẫu đã chọn, thêm SLO, quy mô, quyền truy cập, retention và cách quan sát phù hợp đề bài.

## Chọn A hay B?

| Tình huống | Chọn trước | Chỉ đổi khi |
|---|---|---|
| File lớn | Upload thẳng vào object storage bằng signed URL | File nhỏ và tải rất thấp, proxy qua app vẫn đủ |
| Notification | Queue + worker | Người dùng thật sự cần kết quả gửi ngay trong request |
| Search | Database trước, thêm search index khi cần truy vấn phức tạp | Database đã không đáp ứng tìm kiếm/độ trễ |
| Payment | Mã giao dịch ổn định + trạng thái pending | Provider có hợp đồng khác được chứng minh rõ |

## Nếu có lỗi thì sao?

- **Order/Payment:** timeout chuyển sang “đang xác minh”; đối soát provider trước khi gửi lại.
- **Notification:** lỗi tạm thời được thử lại có giới hạn; địa chỉ sai được đánh dấu, không thử mãi.
- **File:** job lưu checkpoint (mốc đã xử lý) để tiếp tục; file độc hại bị cách ly.
- **Search:** event cập nhật bị kẹt sẽ làm kết quả cũ; theo dõi độ trễ index và có job backfill. Không dùng search index để quyết định giá, tồn kho hay quyền truy cập đang cần chính xác ngay.

## Chứng minh mình làm đúng

- Có test yêu cầu trùng và crash giữa các bước.
- Dashboard cho biết job đang chờ, thất bại và già nhất bao lâu.
- Quyền tải file và dữ liệu nhạy cảm được kiểm tra ở server, có hạn dùng.
- Có số đo độ trễ giữa source of truth và search index.

## Nói trong phỏng vấn

“Em xác định đây là loại quy trình nào, chốt source of truth và các rule không được phép sai (`business invariant`). Em tách phần phải trả lời người dùng ngay khỏi phần có thể làm sau. Request có thể retry thì dùng idempotency key; timeout chưa biết phía sau đã xử lý hay chưa thì lưu trạng thái pending. Sau đó em nói rõ người dùng nhìn thấy gì, người vận hành theo dõi gì và hệ thống tiếp tục từ đâu nếu bị dừng giữa chừng.”

## Interviewer thường hỏi tiếp

### Vì sao search index không nên là source of truth?

Nó được tối ưu cho tìm kiếm và thường cập nhật trễ từ database nghiệp vụ. Có thể rebuild index từ nguồn chính; chiều ngược lại thường không giữ đủ lịch sử và invariant.

### Làm sao xử lý file 20 GB?

Không đọc toàn bộ vào memory. Upload theo phần, xử lý dạng stream hoặc chunk, lưu checkpoint và giới hạn số job chạy đồng thời để bảo vệ CPU, memory và storage.

## Tự kiểm trước khi qua bài

- Việc nào cần đồng bộ, việc nào có thể chờ?
- Source of truth ở đâu?
- Nếu request hoặc message đến hai lần, kết quả có bị nhân đôi không?

## Nhớ một phút

- Nhận ra dạng workflow, đừng học thuộc sơ đồ.
- Trạng thái nghiệp vụ và source of truth phải rõ.
- Thiết kế luôn cả lúc chờ, lúc trùng và lúc hỏng.
