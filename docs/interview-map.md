# Bản đồ ôn Senior Backend .NET

## Quick Summary

Đọc nhiều nhưng không nói được là chưa sẵn sàng phỏng vấn. Hãy chọn phần chưa giải thích được, tự trả lời thành tiếng, rồi ôn lại đúng lỗ hổng thay vì đọc lại toàn bộ.

## Terms to Know

- [[SLO]]: tiêu chí đo “nhanh/ổn định”.
- [[Trade-off]]: điều được và chi phí/rủi ro phải chấp nhận.

## Diagnostic trước khi ôn

Tự trả lời một câu trong 60 giây. Nếu chỉ nêu keyword, đọc mental model. Nếu biết khái niệm nhưng không nói được failure/trade-off, đọc decision table và làm lại. Nếu nói được context → quyết định → bằng chứng, chuyển sang follow-up.

## Lộ trình 30 phút

Ôn Async, EF/SQL và API/Outbox. Mỗi phần trả lời một câu: vì sao `.Result` nguy hiểm, query chậm đo ở đâu, retry payment an toàn thế nào. Kết thúc bằng hai câu nói thành tiếng.

## Lộ trình 60 phút

Core/runtime → request/data → distributed correctness → production. Mỗi chủ đề chỉ giữ một quyết định thật: giới hạn concurrency theo downstream, transaction giữ invariant nào, event duplicate được xử lý ở đâu, p99 tăng sau deploy làm gì trước.

## Lộ trình 90 phút

Thêm một design flow và hai project story: một cải tiến, một incident. Sau mỗi phần ghi đúng lỗi cần ôn, ví dụ “chưa giải thích được idempotency record”, không ghi chung chung “ôn microservices”.

## Cách trả lời mặc định

Nói context và điều không được sai; chọn giải pháp; nêu điều nó đánh đổi; cuối cùng nói metric/test/rollback chứng minh quyết định. Nếu chưa có kinh nghiệm trực tiếp, nêu giả định và cách sẽ kiểm chứng.

## Final recall

- Ưu tiên phần lưỡng lự, không ưu tiên phần quen.
- Nói trước, xem đáp án sau.
- Một câu tốt luôn có điều kiện, rủi ro và bằng chứng.
