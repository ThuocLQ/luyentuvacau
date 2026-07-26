# Ngân hàng câu hỏi nền tảng

## Quick Summary

Đáp án chỉ có ích sau khi bạn đã tự nói. Mỗi câu trả lời nên nêu vấn đề, cơ chế, rủi ro và cách kiểm chứng; định nghĩa một khái niệm không đủ cho vòng Senior.

## Terms to Know

- [[Invariant]]: quy tắc dữ liệu không được sai.
- [[Idempotency boundary]]: nơi retry không tạo thêm side effect.

## Khi nào dùng

Dùng khi cần luyện 30–60 giây cho một chủ đề hoặc phát hiện lỗ hổng trước interview. Chọn câu theo phần đang yếu, không chọn chỉ vì quen.

## Cách trả lời 60–90 giây

1. Nêu kết luận và context.
2. Giải thích cơ chế bằng một ví dụ.
3. Nêu failure mode và trade-off.
4. Nói metric, test hoặc runbook để kiểm chứng.

## Rubric tự đánh giá

| Mức | Dấu hiệu | Việc làm |
|---|---|---|
| Chưa biết | Chỉ nêu keyword | Đọc mental model rồi trả lời lại |
| Lưỡng lự | Thiếu điều kiện/rủi ro | Ôn decision và production trap |
| Tự tin | Có context, trade-off, evidence | Làm follow-up đổi constraint |

## Bẫy chung cần tránh

- “Dùng Redis/Kafka” mà không nói dữ liệu gốc hay duplicate.
- Gọi retry mọi lỗi dù kết quả trước đó chưa rõ.
- Nêu metric đẹp nhưng không liên hệ tác động người dùng.

## Final recall

- Nói trước, reveal sau.
- Đánh dấu câu lưỡng lự vào Review Queue.
- Một câu tốt cho thấy cách ra quyết định, không chỉ trí nhớ.
