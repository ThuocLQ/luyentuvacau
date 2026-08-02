# Backend tài chính và chứng khoán: ưu tiên tính đúng và dấu vết kiểm tra

## Trong 30 giây

- Với sản phẩm có yêu cầu kiểm toán hoặc quy định, hệ thống cần giữ lịch sử sự kiện và trạng thái; ghi đè dễ làm mất dấu vết.
- Lệnh đặt, khớp lệnh, số dư tiền/chứng khoán và thanh toán là các khái niệm khác nhau.
- Một lệnh có thể khớp nhiều lần; yêu cầu hủy chỉ nhắm phần còn mở, nhưng có hiệu lực theo xác nhận và quy tắc của venue.
- Mọi message từ sàn hoặc đối tác có thể đến trùng, muộn hoặc sai thứ tự.
- Với luồng có nguồn ngoài như sàn hoặc ngân hàng, đối soát là bước vận hành cần thiết để phát hiện chênh lệch, không phải việc dọn dẹp tùy chọn.

## Gặp ở đâu ngoài đời?

Khách đặt mua 1.000 cổ phiếu. Sàn báo khớp 300, sau đó khách hủy. Một message khớp thêm 200 đến muộn. Nếu hệ thống coi “đã hủy” là xóa cả lệnh, số lượng sở hữu và tiền sẽ sai. Cần giữ từng execution (lần khớp) và tính phần còn mở từ các sự kiện đã xác nhận.

## Hiểu đơn giản trước

**Order** là ý định mua hoặc bán. **Execution/fill** là bằng chứng một phần lệnh đã thực sự khớp. **Settlement** là quá trình hoàn tất chuyển tiền và tài sản sau giao dịch.

Không nên chỉ giữ một con số `filledQuantity` rồi ghi đè. Hãy lưu từng execution có mã duy nhất, sau đó tính tổng đã khớp. Hủy lệnh đóng phần chưa khớp; nó không xóa các execution đã xảy ra.

Ledger (sổ cái) nên ghi các bút toán mới để điều chỉnh thay vì sửa mất bút toán cũ. Nhờ vậy hệ thống có thể giải thích số dư được tạo ra từ đâu.

## Từ cần biết

- **Order** (lệnh): yêu cầu mua hoặc bán với điều kiện cụ thể.
- **Execution/fill** (lần khớp): phần giao dịch đã được sàn xác nhận.
- **Open quantity** (khối lượng còn mở): phần lệnh chưa khớp và chưa hủy.
- **Sơ đồ trạng thái**: danh sách trạng thái hợp lệ của lệnh và điều kiện để đi từ trạng thái này sang trạng thái khác.
- **Settlement** (thanh toán giao dịch): hoàn tất chuyển tiền và chứng khoán giữa các bên.
- **Ledger** (sổ cái): chuỗi bút toán làm căn cứ tính số dư và kiểm tra lịch sử.
- **Reconciliation** (đối soát): so sánh dữ liệu nội bộ với sàn, ngân hàng hoặc đơn vị lưu ký.

## Cách quyết định, từng bước

1. Vẽ sơ đồ trạng thái của Order và quy tắc chuyển trạng thái; không dùng một cờ `isDone` cho mọi kết quả.
2. Lưu mỗi execution theo mã từ venue (sàn/đối tác). Unique constraint là luật database không cho hai dòng có cùng venue + execution ID, nên một fill đến lại không được ghi hai lần.
3. Không dùng một công thức `open quantity` cho mọi venue. Tính phần còn mở theo quy tắc trạng thái, thời điểm có hiệu lực và thứ tự sequence do venue cung cấp; phải xử lý cả cancel/replace/fill đến muộn theo hợp đồng của venue đó.
4. Ghi tiền và chứng khoán bằng bút toán có tham chiếu tới nghiệp vụ; sửa sai bằng bút toán đảo/điều chỉnh có lịch sử.
5. Tách trạng thái giao dịch khỏi trạng thái settlement vì thời điểm và `data ownership` (nơi có quyền quyết định, ghi dữ liệu) khác nhau.
6. Chạy đối soát định kỳ và theo sự kiện; chênh lệch phải có hàng xử lý, mức độ ưu tiên và người chịu trách nhiệm.
7. Mọi thay đổi nhạy cảm cần audit: ai, lúc nào, dữ liệu trước/sau và lý do.

## Chọn A hay B?

| Cách lưu | Hợp khi | Rủi ro |
|---|---|---|
| Ghi đè số tổng | Dữ liệu không cần audit và có thể tái tạo dễ | Mất dấu vết, khó xử lý message muộn hoặc correction |
| Lưu từng sự kiện/bút toán | Tiền, tài sản và lịch sử phải giải thích được | Nhiều dữ liệu hơn, cần projection (bản dữ liệu đọc nhanh) |
| Tính số dư trực tiếp từ mọi event | Quy mô nhỏ hoặc dùng để kiểm tra | Chậm khi dữ liệu lớn |
| Giữ snapshot/projection | Cần đọc nhanh | Phải chứng minh snapshot khớp với ledger nguồn |

## Nếu có lỗi thì sao?

Nếu execution đến trùng, unique key theo venue + execution ID khiến lần ghi thứ hai không tạo thêm khối lượng. Nếu execution đến sau cancellation, không suy luận chỉ từ thứ tự message đến. Lưu message, sequence/thời điểm có hiệu lực của venue rồi áp dụng quy tắc venue để biết fill đó hợp lệ trước hay sau cancel; trường hợp không quyết được phải vào hàng đối soát.

Nếu số dư nội bộ lệch với đối tác, không tự động “chỉnh cho bằng” mà không lưu lý do. Tạo case đối soát, giữ bằng chứng hai phía và dùng bút toán điều chỉnh được phê duyệt.

::: warning
Quy tắc thật về trạng thái lệnh, settlement, làm tròn, ngày giao dịch và báo cáo phụ thuộc thị trường, sản phẩm và quy định. Cần xác nhận với chuyên gia domain/compliance trước khi triển khai production.
:::

## Chứng minh mình làm đúng

- Test partial fill, duplicate fill, fill đến muộn, cancel và correction.
- Kiểm tra tổng debit và credit theo quy tắc ledger luôn cân bằng.
- Có báo cáo chênh lệch và thời gian xử lý đối soát.
- Có thể truy từ số dư về từng bút toán và nguồn sự kiện.

## Nói trong phỏng vấn

“Em tách lệnh đặt khỏi lần khớp: lệnh là ý định mua hoặc bán, còn mỗi lần khớp là một việc đã xảy ra và có mã riêng. Yêu cầu hủy chỉ nhắm phần còn mở và có hiệu lực theo xác nhận của sàn. Tiền và tài sản được ghi vào sổ cái không mất lịch sử; sửa sai thì thêm bút toán điều chỉnh mới. Thông báo từ sàn có thể đến trùng hoặc đến muộn, nên database không cho cùng một mã lần khớp được ghi hai lần. Sau đó hệ thống áp dụng trạng thái theo thứ tự và thời điểm có hiệu lực mà sàn cung cấp, rồi đối chiếu dữ liệu với nguồn bên ngoài.”

## Interviewer thường hỏi tiếp

### Khi nào trả lại buying power (sức mua còn có thể dùng)?

Phụ thuộc quy tắc sản phẩm và thị trường. Về mô hình, chỉ giải phóng phần đã hủy hoặc không còn bị giữ theo trạng thái được xác nhận; không lấy “order cancelled” để xóa cả phần đã khớp.

### Vì sao cần cả ledger và đối soát?

Ledger giữ lịch sử nội bộ có thể kiểm toán. Đối soát phát hiện khi dữ liệu nội bộ khác bằng chứng của hệ thống ngoài do message mất, mapping sai, correction hoặc lỗi vận hành.

## Tự kiểm trước khi qua bài

- Order, execution và settlement khác nhau ở điểm nào?
- Message fill trùng bị chặn bởi khóa nào?
- Khi hai nguồn lệch nhau, ai xử lý và lịch sử được giữ ra sao?

## Nhớ một phút

- Lệnh là ý định; execution là việc đã xảy ra.
- Hủy không xóa phần đã khớp.
- Tiền và tài sản cần lịch sử không mất dấu cùng quy trình đối soát.
