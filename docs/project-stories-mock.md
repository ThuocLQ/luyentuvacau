# Project Stories & Mock Interview

## Quick Summary

Project story mạnh cho thấy ownership và evidence: bạn phát hiện gì, quyết định gì, đổi lấy gì và kết quả được đo ra sao. Đừng chỉ kể stack hoặc trách nhiệm chung của cả team.

## Terms to Know

- [[p99 latency]]: một evidence tốt cho story performance.
- [[Blast radius]]: diễn đạt tác động của incident/release.
- [[Reconciliation]]: ví dụ recovery trong story correctness.

::: interview-answer
Kể theo bối cảnh → trách nhiệm của bạn → cơ chế/quyết định → trade-off → kết quả → điều sẽ làm khác. Giữ số liệu trung thực và giải thích được cách đo.
:::

## Bài toán interview thực tế

Ở vòng Senior, interviewer không chỉ hỏi bạn biết pattern nào. Họ muốn biết bạn đã ownership một kết quả khó như thế nào: bạn nhìn thấy vấn đề bằng evidence gì, quyết định trong constraint nào, phối hợp với ai, đo kết quả ra sao và học được gì khi quyết định chưa hoàn hảo.

Project story không phải bản tường thuật "team em làm". Đó là bằng chứng về judgement của bạn. Không bịa số liệu: nếu không có số chính xác, nói rõ range, proxy metric hoặc cách bạn sẽ kiểm chứng.

## Mental model: O-M-T-E-R

Dùng khung **Ownership → Mechanism → Trade-off → Evidence → Reflection**.

- **Ownership:** Phạm vi bạn chịu trách nhiệm, stakeholder, constraint, baseline.
- **Mechanism:** Bạn đã điều tra, thiết kế, triển khai và rollout thế nào.
- **Trade-off:** Những lựa chọn đã cân nhắc và vì sao bỏ/chọn.
- **Evidence:** Metric, test, trace, incident timeline, customer outcome hoặc audit artifact.
- **Reflection:** Điều bạn thay đổi ở process/design để lần sau tốt hơn.

Khung này chặt hơn STAR vì nó bắt buộc evidence và trade-off — hai phần phân biệt Senior với kể việc.

## Invariants khi kể story

- Dùng "tôi" cho phần quyết định/ownership của bạn và "chúng tôi" cho phần hợp tác; không nhận công của team, cũng không mơ hồ hóa vai trò.
- Nêu baseline trước thay đổi và cách đo sau thay đổi.
- Không tiết lộ secrets, PII, thông tin khách hàng hay chi tiết NDA. Dùng số đã làm tròn hoặc mô tả range.
- Nếu kết quả chưa tốt, nói thẳng impact, mitigation và lesson. Interviewer đánh giá judgement, không đòi dự án không bao giờ lỗi.
- Mọi claim kỹ thuật phải liên kết tới business/user impact: latency, reliability, correctness, delivery speed, cost hoặc risk.

## Story 1: giảm p99 của API đang chịu tải

### Bối cảnh và ownership

"Tôi ownership endpoint export báo cáo cho khách hàng enterprise. Khi traffic theo giờ tăng, p99 tăng từ khoảng vài giây lên mức timeout, đồng thời worker restart vì memory pressure. SLO là hoàn thành export trong giới hạn đã cam kết mà không ảnh hưởng traffic giao dịch."

### Cơ chế và quyết định

"Tôi dùng metrics để tách latency app/DB, trace để xác định đoạn materialize dữ liệu và runtime counters để thấy allocation/Gen2. Query đang `ToList()` toàn bộ record rồi build file trong request. Tôi đổi flow sang tạo job bền vững, stream/batch dữ liệu, lưu artifact và trả trạng thái cho client. Tôi giới hạn worker theo DB capacity và thêm cancellation/shutdown handling."

### Trade-off và evidence

"Tôi không cache toàn bộ export vì payload theo tenant lớn và freshness/chi phí invalidation không phù hợp. Trade-off là user nhận kết quả bất đồng bộ; chúng tôi hiển thị trạng thái và notification rõ. Tôi so canary với baseline qua p99, job queue age, GC pauses, DB load và failure rate trước khi rollout dần."

### Reflection

"Sau incident, tôi thêm load test payload lớn, dashboard allocation/queue age và guardrail để endpoint mới không materialize collection không giới hạn."

## Story 2: xử lý duplicate trong order/payment workflow

### Bối cảnh và ownership

"Tôi phụ trách phần backend nhận request tạo order. Một số client retry sau timeout, còn downstream broker có at-least-once delivery. Rủi ro là duplicate order hoặc duplicate side effect, không chỉ là lỗi kỹ thuật."

### Cơ chế và quyết định

"Tôi xác định local source of truth và invariant: cùng client order ID không được tạo business effect hai lần. Chúng tôi persist idempotency key có caller scope, request fingerprint, processing/final state và response cùng transaction với order. Event được ghi qua outbox; consumer dedup theo stable event/business ID."

### Trade-off và evidence

"Tôi không dùng distributed lock cho mọi request vì tăng availability dependency và không giải quyết replay ở consumer. Trade-off của idempotency store là TTL, storage và policy khi payload cùng key khác nhau; chúng tôi reject mismatch và giữ record theo cửa sổ retry. Evidence gồm duplicate rejection rate, outbox lag, reconciliation và test crash giữa persist/publish."

### Reflection

"Tôi bổ sung runbook cho support: tra outcome bằng client order ID, thay vì bảo khách thử lại mù."

## Story 3: incident sau release

### Bối cảnh và ownership

"Sau deploy, p99 checkout tăng rõ và error budget bị đốt nhanh. Tôi là người điều phối technical response cho service đó, không phải người tự sửa tất cả."

### Cơ chế và quyết định

"Tôi xác nhận impact theo version/region, chỉ định một người lấy traces và một người cập nhật stakeholder. Vì change window tương quan mạnh và migration backward-compatible, tôi tắt feature flag/rollback trước. Sau khi SLO hồi phục, chúng tôi đối chiếu trace, query plan và config diff để tìm nguyên nhân."

### Trade-off và evidence

"Tôi không restart toàn bộ cluster vì có thể xoá evidence và làm cold-cache burst. Tôi cũng không hotfix khi root cause chưa rõ. Timeline incident, p99/error rate theo version và rollback timestamp là evidence."

### Reflection

"Kết quả là canary guardrail, dashboard theo version và checklist migration/rollback có owner."

## Cách chuẩn bị story của chính bạn

Lập một bảng cho 3–5 story, mỗi story khác loại: performance/reliability, correctness/security, architecture/migration, incident, leadership/collaboration.

| Trường | Ghi gì |
|---|---|
| Situation | User/business impact, baseline, constraint |
| Ownership | Bạn quyết định gì, team/stakeholder nào tham gia |
| Mechanism | Evidence, design, rollout, test |
| Trade-off | Ít nhất một phương án không chọn và lý do |
| Result | Metric/range/proxy, impact và thời điểm đo |
| Reflection | Guardrail, process hoặc technical debt tiếp theo |

Luyện bản 90 giây trước. Khi interviewer đào sâu, mở rộng từng phần thay vì kể mọi detail ngay từ đầu.

## Mock follow-up

### "Số liệu đó do bạn đo hay team khác đo?"

Nói rõ nguồn: dashboard, query plan, trace, support tickets, finance reconciliation hoặc business analytics. Nếu chỉ có estimate, nói đó là estimate và cách xác nhận nếu làm lại.

### "Tại sao không chọn giải pháp đơn giản hơn?"

Nêu constraint đã loại nó: local cache không đủ durability, synchronous chain vượt latency budget, shared DB phá ownership, retry không an toàn cho side effect. Kết thúc bằng cost của giải pháp đã chọn.

### "Nếu traffic tăng 10 lần hoặc dependency lỗi thì sao?"

Nêu bound, overload policy, timeout/cancellation, idempotency, queue/partition, metric và scaling hypothesis. Không cần hứa hệ thống vô hạn.

### "Bạn đã làm gì sai hoặc sẽ làm khác?"

Chọn một trade-off thật, không tự khen trá hình. Nêu detection gap, mitigation ngay lúc đó và guardrail dài hạn.

## Red flags

- "Team em dùng Kafka/Redis/microservices" nhưng không nói problem, ownership hay outcome.
- Claim "giảm 90%" mà không có baseline, metric hoặc khoảng thời gian.
- Kể incident như lỗi của người khác; không nêu hành động ổn định user impact.
- Nói rollout nhưng không có rollback, migration compatibility hay monitoring.
- Chỉ nói thành công, không có trade-off hoặc lesson.

## Final recall

- Story Senior = ownership + mechanism + trade-off + evidence + reflection.
- Hai story mạnh hơn mười project liệt kê hời hợt.
- Evidence phải nối technical decision với user/business impact.
- Hãy nói thật phạm vi của bạn và chuẩn bị follow-up về failure, scale, rollback.
