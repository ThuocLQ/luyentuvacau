# Bản đồ ôn Senior Backend .NET

## Quick Summary

Mục tiêu ôn không phải đọc hết: xác định gap critical (lỗ hổng ở chủ đề trọng yếu), nói câu trả lời thành tiếng và gắn kiến thức với story thật. Chọn lộ trình theo thời gian còn lại và role (loại vị trí) đang phỏng vấn.

> **Nói đơn giản:** một buổi ôn tốt không cố nhồi thêm kiến thức. Nó giúp bạn phát hiện phần chưa giải thích được, luyện nói rõ phần đó, rồi quay lại đúng tài liệu cần thiết.

## Terms to Know

- [[SLO]]: biến “nhanh/ổn định” thành tiêu chí có thể nói và đo.
- [[Trade-off]]: giá trị đổi lấy cost/rủi ro cụ thể.
- [[Data ownership]]: điểm Senior cần nhắc khi mô tả architecture.

::: final-recall
Khi trả lời: kết luận trước, nêu điều kiện, mechanism, failure mode, trade-off và evidence. Đừng kể khái niệm rời rạc.
:::

## Mục tiêu của bản đồ này

Đây không phải danh sách để đọc từ đầu đến cuối. Mục tiêu là biến thời gian ôn hạn chế thành câu trả lời có cấu trúc: bạn nêu đúng problem, invariant, lựa chọn, trade-off và bằng chứng production. Nếu chỉ nhớ API hoặc pattern nhưng không nói được khi nào **không** dùng, bạn chưa sẵn sàng cho vòng Senior.

## Diagnostic trước khi ôn

“Lưỡng lự” không có nghĩa là bạn không biết gì. Thường bạn biết định nghĩa, nhưng chưa giải thích được khi nào dùng, đánh đổi gì và nếu lỗi thì sao. Đây là nhóm nên ưu tiên ôn lại nhất.

Với từng chủ đề, tự trả lời một câu trong 60 giây mà không mở tài liệu. Tự chấm:

| Mức | Dấu hiệu | Việc tiếp theo |
|---|---|---|
| Chưa biết | Không nêu được problem hoặc trả lời bằng keyword | Đọc mental model và final recall, trả lời lại ngay |
| Lưỡng lự | Biết khái niệm nhưng thiếu invariant/trade-off | Đọc decision table và production traps, ghi một ví dụ của chính mình |
| Tự tin | Nêu được context → decision → trade-off → evidence | Làm follow-up hoặc đổi constraint để kiểm tra độ sâu |

Ưu tiên những câu "chưa biết" và "lưỡng lự" vào Review Queue. Không dành phần lớn thời gian cho topic bạn đã nói trôi chảy.

## Lộ trình 30 phút: cứu nguy trước interview

Mục tiêu là có một khung câu trả lời đáng tin, không phải học thuộc mọi chi tiết.

1. **5 phút — chọn scope.** Chọn role/job description và 3 kinh nghiệm thật của bạn. Chọn một track chính: Core .NET, Web/API, Data Correctness, Distributed Reliability hoặc Finance.
2. **10 phút — core correctness.** Ôn `Async, Threading & Concurrency`, `EF Core & Data Access`, `SQL, Index, Transactions & Locking`. Trả lời được: async không tăng capacity; transaction/invariant nằm ở đâu; index/plan được kiểm chứng thế nào.
3. **10 phút — production.** Ôn `API Design, Validation & Security`, `Messaging, Idempotency & Outbox`, `Observability, Testing & Production Incidents`. Trả lời được retry có an toàn không, duplicate xử lý ra sao, deploy gây p99 tăng thì làm gì trước.
4. **5 phút — nói thành tiếng.** Lấy hai câu random. Mỗi câu: context → decision → trade-off → metric/evidence. Chấm bản thân, không reveal trước.

Kết quả đạt: bạn có thể nói "tôi sẽ đo gì, giới hạn gì, rollback khi nào" thay vì chỉ nói "dùng Redis/Kafka/async".

## Lộ trình 60 phút: vòng kỹ thuật Senior

| Thời lượng | Mục tiêu | Tài liệu / bài tập |
|---|---|---|
| 0–10 phút | Runtime và load | C# Runtime & Memory; Async. Nêu ownership, cancellation, bounded concurrency |
| 10–25 phút | Request và data | Request Pipeline/DI; EF Core; SQL/Locking. Nêu lifetime, query plan, transaction/deadlock |
| 25–40 phút | Correctness xuyên boundary | API Design; Background/Resilience; Outbox. Nêu idempotency, timeout, ack point, retry budget |
| 40–50 phút | Architecture/operations | Architecture & DDD; Observability. Nêu data owner, rollback, SLO/traces |
| 50–60 phút | Practice | Một câu Senior + một câu Lead, tự đánh giá rồi đưa phần lưỡng lự vào review |

Trong 60 phút, ưu tiên **decision** hơn coverage. Ví dụ với cache phải nói được source of truth, freshness, invalidation và stampede; với service boundary phải nói được owner, invariant và failure mode.

## Lộ trình 90 phút: mock interview hoàn chỉnh

1. **0–15 phút — warm-up core.** Làm ba câu: `.Result` trong request, `DbContext` lifetime, index chậm. Mỗi câu 60 giây + 60 giây follow-up.
2. **15–35 phút — thiết kế một flow.** Chọn Place Order, Payment hoặc File Import. Vẽ request, source of truth, transaction boundary, event/outbox, retry/idempotency, states và observability.
3. **35–50 phút — failure drill.** Thay đổi một constraint: partner timeout, duplicate message, DB deadlock, deploy làm p99 tăng. Nói cách stabilize, evidence cần lấy và guard để không lặp lại.
4. **50–70 phút — project story.** Kể hai story bằng khung ở `Project Stories & Mock Interview`: một cải tiến, một incident/decision khó. Luôn nói phạm vi ownership và metrics.
5. **70–85 phút — follow-up khó.** Tự hỏi "tại sao không chọn cách kia?", "nếu volume gấp 10 thì sao?", "nếu retry tạo duplicate thì sao?".
6. **85–90 phút — debrief.** Chọn ba lỗ hổng cụ thể cho phiên sau; không ghi "học thêm microservices" mà ghi "nêu rõ idempotency record gồm gì".

## Track theo loại vị trí

### Core .NET / platform

Ưu tiên Runtime & Memory, Async/Concurrency, Pipeline/DI, Background/Resilience. Dùng ví dụ thread starvation, scoped lifetime, queue bounded và graceful shutdown.

### API / product backend

Ưu tiên Pipeline/DI, API Design & Security, EF Core, SQL/Locking, Observability. Dùng ví dụ contract versioning, validation, pagination, authorization, query plan và release safety.

### Data correctness / distributed systems

Ưu tiên SQL/Locking, Architecture, Outbox, Background/Resilience, Observability. Dùng ngôn ngữ invariant, local transaction, idempotency, ordering scope, reconciliation và operational evidence.

### Finance / securities

Ôn Core/Data/Distributed trước, sau đó Finance. Bạn phải tách order, execution, allocation, settlement và ledger; không trả lời finance chỉ bằng "dùng distributed lock".

## Cách trả lời mặc định

Khung này không bắt bạn biết hết mọi công nghệ. Khi chưa gặp case đó, hãy nói assumption của mình, chọn phương án đơn giản và nêu thông tin nào sẽ khiến bạn đổi lựa chọn. Cách trả lời thành thật nhưng có cấu trúc tốt hơn cố đoán một “đáp án phỏng vấn”.

Khi gặp câu chưa từng luyện, dùng khung này:

1. **Làm rõ context:** tải, SLA, correctness nào, ai là owner.
2. **Nêu invariant/boundary:** điều gì không được sai và transaction/contract nào giữ nó.
3. **Chọn giải pháp:** nói vì sao phù hợp constraint, không chỉ nêu tên pattern.
4. **Nêu trade-off/failure:** consistency, latency, cost, retry/duplicate, vận hành.
5. **Chứng minh:** metric, trace, test, rollout/rollback hoặc reconciliation.

## Red flags khi ôn

- Đọc cheatsheet mà không tự nói thành tiếng.
- Trả lời "phụ thuộc" nhưng không nêu dependency nào và quyết định thay đổi theo điều kiện nào.
- Gọi mọi async work là background job, mọi retry là resilience, mọi service là microservice.
- Không có metric, owner hoặc rollback trong câu chuyện production.
- Tuyên bố "exactly once", "cache luôn nhanh", "index luôn tốt", "GC tự lo hết".

## Final recall

- 30 phút: ưu tiên correctness và production answers.
- 60 phút: đi qua core → data → distributed → operations.
- 90 phút: thêm design, failure drill và project story.
- Câu trả lời tốt luôn có context, invariant, trade-off và evidence.
