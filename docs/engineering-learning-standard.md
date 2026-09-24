# Engineering Learning Standard

## Mục đích

QuanNet dùng tài liệu để giúp người học **hiểu, làm, debug, suy luận và giải thích**. Không xem số bài đã đọc hay phần trăm hoàn thành là mastery.

`content-editorial-standard.md` quy định **cách viết** một tài liệu rõ, chính xác và tự nhiên. Tài liệu này quy định **cách thiết kế trải nghiệm học**: problem → mental model → quan sát → thực hành → failure → debug → giải thích → transfer → recall.

## Nguyên tắc

- Ưu tiên principle trước tool: caching, persistence, consistency, failure, security và observability là gốc; Redis, Kafka hay framework là implementation.
- Bắt đầu từ một vấn đề thật khi phù hợp để người học biết vì sao concept tồn tại.
- Ví dụ cần cho thấy context, input, execution, observable result và cách verify — không chỉ code compile.
- Mọi concept production quan trọng phải nhắc failure mode, evidence và recovery phù hợp.
- Guidance giảm dần: worked example → guided practice → independent/transfer case.
- Không cho đáp án debug ngay: quan sát → hypothesis → evidence → experiment → conclusion.
- Mastery là self-assessed, tách Tech Level (L1–L4) và English Level (E1–E4).

## Learning loop

```text
Problem → Visualize → Understand → Worked example → Do
→ Break → Debug → Explain (VN + EN) → Transfer → Recall
```

Không phải lesson nào cũng cần cùng độ dài. Chỉ giữ bước nào làm người học hiểu sâu hơn trong thời gian gần.

## Dấu hiệu một topic đã khá vững

- Giải thích được mechanism, không chỉ định nghĩa.
- Áp dụng được vào case quen thuộc.
- Biết tạo/điều tra failure và dùng evidence.
- Suy luận được khi context thay đổi, nêu rõ assumption và trade-off.
- Recall lại sau một khoảng nghỉ.
- Diễn đạt ngắn, chính xác bằng tiếng Việt và tiếng Anh đơn giản.

## Quy tắc giao diện

QuanNet là lightweight dashboard: chỉ hiển thị roadmap, lesson tiếp theo, self-assessment và nội dung cần review. Không thêm gamification hay analytics phức tạp khi chưa cải thiện learning loop.
