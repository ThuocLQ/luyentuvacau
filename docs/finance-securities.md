# Thiết kế backend cho tài chính và chứng khoán

## Trong 30 giây

- Lệnh gửi đi chưa chắc khớp; timeout là kết quả chưa biết, không phải thất bại để gửi lại.
- Giữ intent, fact và ledger tách nhau để audit/đối soát được.
- Không ghi đè lịch sử tài chính; correction là record mới có dấu vết.
- Quyết định tiền, position và hạn mức phải dựa trên nguồn dữ liệu gốc, không dựa cache cũ.

## Gặp ở đâu ngoài đời?

Khách đặt lệnh mua, hệ thống gửi sang venue (sàn/đối tác giao dịch) rồi timeout. Nếu API retry ngay, một lệnh có thể được gửi hai lần. Nếu bạn xóa order khi khách hủy, audit không còn cho thấy phần nào đã khớp. Đây là nơi một workflow web bình thường trở thành rủi ro tài chính.

> Phạm vi bài này là mẫu thiết kế cho order/venue/execution. Nó không thay thế rule của sàn, policy kế toán, retention hay yêu cầu pháp lý; các rule đó phải được xác nhận với domain và compliance.

## Hiểu đơn giản trước

Tách ba việc khác nhau. **Intent (ý định)** là yêu cầu đặt lệnh. **Fact (sự việc đã xảy ra)** là execution hoặc cancellation do venue xác nhận. **Ledger (sổ cái)** ghi biến động tài chính có thể kiểm toán. Intent có thể pending; fact không được sửa để câu chuyện trông đơn giản hơn; ledger correction thường là record mới theo policy/accounting model áp dụng.

## Terms to Know

- [[Ledger]] (sổ cái): lịch sử biến động tài chính có thể audit.
- [[Reconciliation]] (đối soát): so sánh dữ liệu nội bộ với venue/bank để tìm lệch và tạo correction có audit.
- [[Idempotency boundary]] (ranh giới gọi lại không tạo thêm effect): chặn request/event cũ ghi thêm execution.
- **Partial fill (khớp một phần)**: một phần lượng lệnh đã khớp; phần còn lại vẫn mở hoặc bị hủy sau đó.
- **Unknown outcome (kết quả chưa biết)**: request đã gửi nhưng timeout nên chưa biết đối tác đã thực hiện hay chưa.

## Cách quyết định, từng bước

1. Tạo request identity và lưu intent `Pending` trước khi gọi venue. Identity này phải liên hệ được caller, payload và reference gửi đi.
2. Khi venue trả fact, ghi transition có điều kiện và deduplicate theo execution identity. Unique constraint chỉ bảo vệ boundary database đó; consumer bên ngoài vẫn phải chịu duplicate.
3. Nếu timeout, chuyển sang `Unknown`, query venue theo reference hoặc đưa vào reconciliation. Không tạo intent mới cho cùng ý định trước khi có evidence.
4. Với partial fill, cập nhật lượng đã khớp và lượng còn mở theo transition hợp lệ. Hủy chỉ đóng phần mở; không xóa fact đã khớp.
5. Ghi ledger/correction bằng record bất biến có audit actor/thời gian/reason. Phân quyền và kiểm tra tenant/account ở server.

## Chọn A hay B?

| Tình huống | Chọn | Không chọn vì |
|---|---|---|
| Venue timeout | Đối soát theo reference trước retry | Retry mù có thể tạo lệnh/charge trùng |
| Cần lịch sử sửa sai | Append correction có audit | Update/xóa record làm mất bằng chứng |
| Đọc portfolio nhanh | Cache cho hiển thị có timestamp | Cache stale quyết định buying power |
| Event giao trùng | Consumer dedup và transition có điều kiện | Tin broker ‘exactly once’ cho toàn workflow |

## Nếu có lỗi thì sao?

**Case unknown outcome:** venue có thể đã khớp nhưng callback chưa đến. Alert record `Unknown` quá tuổi. Operator dùng reference query venue, khóa hành động tạo rủi ro trên account nếu policy yêu cầu, chạy reconciliation và tạo correction; mọi bước để lại audit. Không dùng script trực tiếp sửa số dư không dấu vết.

**Case event muộn:** cancellation có thể đến sau partial fill. State machine phải chấp nhận fact theo thứ tự business hợp lệ hoặc đưa conflict vào hàng xử lý; không suy luận “đến sau là sai” chỉ từ timestamp mạng.

## Chứng minh mình làm đúng

Theo dõi số unknown outcome, duplicate bị chặn, latency callback, mismatch reconciliation, tuổi state pending và ledger imbalance theo phạm vi. Test integration cần có duplicate, timeout sau send, partial fill/cancel và restart worker. Với yêu cầu compliance cụ thể, xác nhận policy/retention với bộ phận pháp lý/compliance thay vì suy đoán từ pattern kỹ thuật.

## Nói trong phỏng vấn

“Với order trading, em không coi timeout là failed vì venue có thể đã nhận lệnh. Em lưu intent với reference, tách execution fact và ledger, rồi đối soát trước retry. Partial fill chỉ giảm open quantity; cancel không xóa phần đã khớp. Đổi lại workflow có pending/unknown và vận hành phức tạp hơn, nên em theo dõi record quá tuổi, mismatch và có runbook correction có audit.”

## Interviewer thường hỏi tiếp

- Khi nào bạn chặn khách đặt lệnh tiếp, và ai có quyền gỡ chặn?
- Unique constraint trong DB bảo vệ được gì, còn callback/venue duplicate cần gì thêm?

## Tự kiểm trước khi qua bài

- Tôi có tách intent, fact và ledger trong lời giải thích không?
- Tôi xử lý timeout như unknown outcome chưa?
- Mọi correction có audit và boundary rõ chưa?

## Nhớ một phút

- Timeout → đối soát, không retry mù.
- Fact và ledger cần lịch sử bất biến.
- Quyết định tiền dựa nguồn dữ liệu gốc.
