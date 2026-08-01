# Chuẩn biên tập cheatsheet Senior .NET

> Mục tiêu: người mới đọc có thể kể lại vấn đề bằng lời thường; người phỏng vấn Senior thấy rõ điều kiện, cơ chế, đánh đổi, lỗi có thể xảy ra và cách kiểm chứng.

## Mỗi bài phải trả lời một quyết định

Không viết kiểu “tổng quan về X”. Tiêu đề và phần mở đầu phải dẫn về một việc người đọc cần xử lý, ví dụ: “Khi request chậm vì đang chờ I/O, giới hạn số việc chạy cùng lúc ở đâu?”.

Bắt đầu bằng phương án nhỏ nhất vẫn giữ đúng dữ liệu và vận hành được. Chỉ thêm cache, queue, Outbox, CQRS, microservice, lock hoặc pool khi bài nêu rõ: vấn đề nào cần giải quyết, ai sở hữu, chi phí vận hành mới, lỗi mới và dấu hiệu cần theo dõi.

## Format chuẩn của một bài

1. **Trong 30 giây** — 3–5 ý: vấn đề, quyết định, lý do, một điều không nên làm và cách nhận biết đang đúng. Đây là dữ liệu cho chế độ Ôn nhanh.
2. **Gặp ở đâu ngoài đời?** — một tình huống có người dùng, triệu chứng, ràng buộc và hậu quả nếu làm sai.
3. **Hiểu đơn giản trước** — giải thích theo chuỗi “chuyện gì xảy ra → vì sao → nếu bỏ qua thì hỏng gì”.
4. **Từ cần biết** — 3–6 thuật ngữ thật sự cần cho case; giải thích ngắn ngay lần đầu xuất hiện.
5. **Cách quyết định, từng bước** — mỗi bước phải có: làm gì, vì sao và kiểm tra bằng gì.
6. **Chọn A hay B?** — bảng ngắn: điều kiện dùng, được gì, mất gì và khi nào không dùng.
7. **Nếu có lỗi thì sao?** — ít nhất một đường lỗi thật: timeout, trùng lặp, race, rollback hay vận hành; nêu cách phát hiện và khôi phục.
8. **Chứng minh mình làm đúng** — metric, log, trace, test, constraint hoặc runbook cụ thể.
9. **Nói trong phỏng vấn** — 45–90 giây theo: kết luận → bối cảnh/invariant → cơ chế → đánh đổi → bằng chứng.
10. **Interviewer thường hỏi tiếp** — hai câu đổi ràng buộc hoặc đào vào failure mode.
11. **Tự kiểm trước khi qua bài** — ba câu không hiện đáp án ngay.
12. **Nhớ một phút** — tối đa 3–5 ý theo: tình huống → quyết định → bẫy → bằng chứng.

Các bài system design phải bổ sung: giả định/NFR, owner của dữ liệu, state/luồng chính, API hoặc contract tối thiểu, unknown outcome/retry/duplicate, trạng thái UI pending/fail, observability và reconciliation.

## Quy tắc câu chữ Việt-first

- Viết như đang giải thích cho dev có 1–3 năm kinh nghiệm: câu chủ động, một ý chính mỗi câu, một ý chính mỗi đoạn.
- Dùng tiếng Việt cho tiêu đề và câu dẫn. Giữ tên chuẩn kỹ thuật như `DbContext`, `rowversion`, `ArrayPool`; lần đầu ghi thêm nghĩa ngắn: `idempotency (gọi lại không tạo thêm hiệu ứng nghiệp vụ)`.
- Glossary chỉ là nơi tra cứu, không thay cho giải thích ngay trong câu đầu tiên có thuật ngữ.
- Tránh danh từ hoá: viết “Worker chỉ đánh dấu xong sau khi lưu kết quả”, không viết “durability cần được bảo đảm”.
- Không dùng “đơn giản”, “tối ưu”, “an toàn”, “scale tốt”, “phù hợp” nếu không nói rõ theo tiêu chí nào.
- Không dùng “luôn”, “không bao giờ”, “tự động bảo đảm” cho nhận định phụ thuộc bối cảnh. Ngoại lệ là invariant nghiệp vụ hoặc guarantee đã nêu rõ boundary.
- Không nhồi acronym. Một đoạn chỉ giới thiệu tối đa 1–2 thuật ngữ mới. Một đoạn không quá 3 câu; một danh sách không quá 5 ý trước khi cần nhóm lại.
- Code chỉ xuất hiện khi nó làm rõ ownership, lifecycle hoặc race. Đặt “điểm cần nhìn” trước code và “vì sao” sau code.

## Quy tắc chính xác

Mỗi claim phải thuộc một trong năm loại và được viết đúng phạm vi:

1. **Invariant/guarantee:** nêu owner và boundary, ví dụ unique constraint chặn trùng trong database đó, không đảm bảo cả workflow.
2. **Cơ chế framework/runtime:** đối chiếu tài liệu chính thức của phiên bản đang dùng.
3. **Phụ thuộc provider:** nêu SQL Server/PostgreSQL/broker/cloud nếu hành vi isolation, index, locking khác nhau.
4. **Kinh nghiệm vận hành:** ghi là giả thuyết cần đo và nêu signal xác nhận.
5. **Security/compliance:** kiểm ở server theo resource/tenant; không tin client hoặc coi CORS là authentication.

Trước khi publish, kiểm: actor/boundary là ai; điều kiện/version/provider nào; failure nào vẫn còn; bằng chứng chính thức hoặc test nào xác nhận; và có đang hứa exactly-once, rollback toàn cục, cache consistency hay async tăng capacity không.

## Rubric nghiệm thu

| Trục | Pass | Block publish |
|---|---|---|
| Đúng và có scope | Claim có boundary/điều kiện; không hứa quá phạm vi | Sai security, correctness hoặc hành vi framework |
| Dễ hiểu | Người mới kể lại được case; term mới được giải thích tại chỗ | Cơ chế cốt lõi chỉ là jargon/glossary |
| Đúng trọng tâm Senior | Có quyết định, failure, trade-off, evidence và điều không dùng | Chỉ định nghĩa hoặc liệt kê pattern |
| Đủ đúng phạm vi | Case đi từ bắt đầu đến recovery; mô tả không overpromise | Bỏ thiếu boundary quan trọng của chủ đề |
| Nhớ được | Có self-check, câu trả lời nói được và takeaway độc lập | Không biết học tiếp hay tự kiểm thế nào |

## Hai vòng review bắt buộc

**Vòng 1 — Factual và anti-overengineering:** tác giả tự fact-check, reviewer độc lập kiểm boundary/version/provider, claim tuyệt đối và pattern không có lý do. Mọi lỗi Block phải sửa.

**Vòng 2 — Learner và interview red-team:** đọc như người học mới để tìm jargon/câu mơ hồ; sau đó thử trả lời 60–90 giây không nhìn bài và đổi một ràng buộc. Nếu không kể lại được case, không biết chọn/không chọn gì hoặc không nói được failure/evidence thì viết lại.

Mỗi bài chỉ được coi là hoàn tất khi qua cả hai vòng, có review factual và clarity độc lập, cập nhật glossary/câu hỏi liên quan cùng đợt thay đổi.
