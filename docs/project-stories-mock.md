# Câu chuyện dự án và Mock Interview

## Quick Summary

Một story tốt không phải danh sách công nghệ. Nó nói rõ vấn đề, phần bạn sở hữu, thay đổi đã làm, kết quả có bằng chứng và điều bạn học được.

## Terms to Know

- [[Trade-off]]: điều được và rủi ro phải chấp nhận.
- [[SLO]]: mục tiêu dịch vụ có thể đo, như p99 hoặc tỉ lệ lỗi.

## Bài toán interview thực tế

Interviewer có thể hỏi “kể một incident” để biết bạn có nhận ownership không. Đừng nhận công của cả team, cũng đừng đổ lỗi. Nói đúng phạm vi của mình và cách phối hợp.

## Mental model: O-M-T-E-R

- **Ownership:** bạn chịu trách nhiệm phần nào.
- **Mechanism:** cơ chế hoặc quy trình đã đổi.
- **Trade-off:** đổi lại điều gì.
- **Evidence:** metric, trace, ticket hoặc phản hồi chứng minh kết quả.
- **Reflection:** lần sau làm gì sớm hơn.

## Story 1: p99 API tăng

Nêu endpoint nào chậm, người dùng bị ảnh hưởng ra sao và dữ liệu bạn xem. Ví dụ trace cho thấy N+1 query; bạn đổi sang projection/pagination, đo lại cùng tải và thêm slow-query alert. Đừng nói “tối ưu database” mà không có cơ chế.

## Story 2: duplicate order/payment

Nêu retry hoặc message trùng đã gây rủi ro gì. Giải pháp có thể là idempotency key, unique effect và reconcile. Nói rõ retry được phép ở đâu và bằng chứng nào quyết định không charge lại.

## Story 3: incident sau release

Nêu impact trước, việc ổn định như rollback/tắt flag, evidence đã giữ, rồi root cause và action phòng ngừa. Postmortem chỉ hữu ích khi có owner/hạn và thay đổi kiểm chứng được.

## Mock follow-up

- Nếu tải gấp mười, điều gì là bottleneck đầu tiên?
- Nếu metric chưa cải thiện, bạn kiểm chứng giả thuyết nào tiếp?
- Nếu teammate không đồng ý, bạn dùng evidence nào để quyết định?

## Red flags

- Chỉ kể việc team làm, không có ownership.
- Bịa metric hoặc nói “đã tối ưu” không có bằng chứng.
- Có root cause nhưng không có guard chống tái diễn.

## Final recall

Vấn đề → ownership → cơ chế → trade-off → evidence → reflection.
