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
- Dùng [terminology style guide](./terminology-style-guide.md) làm nguồn chuẩn cho preferred terms.
- Giữ thuật ngữ ngành mà Backend .NET developer Việt Nam dùng hằng ngày; giải thích ngắn bằng tiếng Việt ở lần đầu, sau đó dùng term ngắn và nhất quán.
- Tránh cả hai cực đoan: không viết một chuỗi tiếng Anh để tỏ ra kỹ thuật, cũng không Việt hóa cưỡng ép đến mức người đọc phải dịch ngược mới nhận ra khái niệm.
- Trong phần giải thích, ưu tiên **ai làm gì và kết quả ra sao**. Một câu không giới thiệu quá hai term mới.
- Giữ nguyên tên code và khái niệm chuẩn như `DbContext`, `CancellationToken`, middleware, idempotency, Outbox, Saga; thêm nghĩa khi người mới chưa thể suy ra từ ngữ cảnh.
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

## Năm lớp bắt buộc để giải thích một khái niệm

Đừng mở đầu bằng câu định nghĩa nghe hay nhưng không cho người học biết nó làm gì. Với mọi khái niệm quan trọng, nhất là `Index`, cache, queue, lock, Outbox và retry, bài phải đi lần lượt qua năm lớp sau:

1. **Bản chất (essence):** nó thực sự là gì, gồm những gì và không phải là gì. Ví dụ, index là một cấu trúc dữ liệu phụ do database duy trì từ giá trị cột/biểu thức đến vị trí hàng phù hợp; nó không đơn giản là “công tắc tăng tốc query”.
2. **Cơ chế (mechanism):** khi đọc hoặc ghi, database/runtime thực hiện bước gì. Chỉ mô tả cơ chế cần để giải thích quyết định; nêu provider nếu cơ chế thay đổi theo SQL Server/PostgreSQL.
3. **Phạm vi (scope):** nó giúp phần nào, không hứa giúp phần nào, và điều kiện nào phải đúng. Ví dụ index có thể giúp một access path hoặc tránh sort trong một query cụ thể; plan, dữ liệu, predicate và thứ tự cột quyết định hiệu quả.
4. **Hiểu nhầm thường gặp (misconception):** viết rõ một suy nghĩ “nghe hợp lý nhưng sai”, hậu quả của nó và cách sửa. Ví dụ “thêm index cho mọi cột” làm chi phí ghi/tài nguyên tăng nhưng vẫn không sửa query đang lấy thừa dữ liệu.
5. **Ví dụ nhỏ (example):** có actor, dữ liệu, tín hiệu và một quyết định. Không dùng ví dụ giả tạo chỉ để nhét tên pattern.

Không được dùng một câu khẩu hiệu thay cho năm lớp này. Câu tóm tắt chỉ xuất hiện sau khi người học đã hiểu bản chất và phạm vi.

## Chuẩn riêng cho quiz

Quiz là bài tập ra quyết định, không phải bài kiểm tra ai quen jargon hơn.

- Mỗi câu có **một mục tiêu học** và một quyết định chính. Không gộp nhiều tối ưu hóa không phụ thuộc nhau vào đáp án đúng.
- Bối cảnh phải đủ dữ kiện để chọn: actor, hành động đang xảy ra, tín hiệu quan sát được, ranh giới sở hữu dữ liệu/tác động bên ngoài và ràng buộc. Nếu thiếu dữ kiện, hỏi lại hoặc nêu giả định thay vì bịa đáp án.
- Bốn đáp án phải đều nghe hợp lý trong một bối cảnh khác. Tránh đáp án châm biếm, cực đoan hoặc sai hiển nhiên; một phương án sai tốt phải chỉ thiếu một điều kiện, sai phạm vi hoặc xử lý nhầm thứ tự.
- Mỗi đáp án có lý do viết riêng: nó đúng/sai **ở tình huống này** như thế nào, hậu quả gì và khi nào có thể dùng. Không sinh lời giải từ nhãn “unsafe”, “incomplete” hay “overengineered”.
- Giải thích sau khi chấm theo thứ tự: **chọn gì → vì sao → phương án đã chọn thiếu gì → từ mới nghĩa là gì → câu nhớ nhanh**. Phần “cơ chế”, “đánh đổi” và “bằng chứng” chỉ dùng câu ngắn, không lặp lại cùng một jargon.
- Thuật ngữ lần đầu phải kèm nghĩa đời thường ngay trong câu: “deduplicate (chặn cùng một việc bị xử lý hai lần)”, “unknown outcome (request timeout nhưng chưa biết phía sau đã làm hay chưa)”. Glossary chỉ là nơi đọc thêm.
- Một câu Senior vẫn dùng tiếng Việt bình thường. Độ khó nằm ở điều kiện, đánh đổi và cách kiểm chứng; không nằm ở việc nhồi acronym.

### Vòng nghiệm thu quiz

**Factual review:** kiểm tra đáp án tốt nhất thật sự được suy ra từ dữ kiện; kiểm tra ranh giới transaction/network, provider/version và mọi claim tuyệt đối. Nếu hai đáp án cùng đúng mà không có điều kiện phân biệt, câu bị block.

**Learner red-team:** một reviewer đọc bối cảnh mà không xem bài gốc, nói lại được vấn đề bằng lời thường, giải thích vì sao từng lựa chọn chưa đúng và rút ra một câu nhớ. Bất kỳ câu nào khiến reviewer phải tra thuật ngữ để hiểu đề đều phải viết lại.
