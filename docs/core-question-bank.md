# Core Question Bank: Playbook luyện phỏng vấn Senior .NET Backend

## Quick Summary

> **Nói đơn giản:** đừng đọc đáp án rồi gật đầu. Hãy che đáp án, tự nói trước, sau đó mới so sánh. Nếu câu trả lời thiếu điều kiện, rủi ro hoặc cách kiểm chứng, đánh dấu để ôn lại.

Question bank là bài tập trả lời có feedback (phản hồi), không phải danh sách để học thuộc. Mỗi câu nên có kết luận, cơ chế, failure mode (cách nó có thể hỏng), trade-off (được gì và đổi lại gì) và evidence (bằng chứng) từ dự án thật.

## Terms to Know

- [[p99 latency]]: ví dụ metric giúp câu trả lời bớt chung chung.
- [[Idempotency]]: chủ đề correctness phổ biến.
- [[Backpressure]]: cách nói về overload có vận hành.

::: interview-answer
Một câu trả lời 60–90 giây tốt nên để interviewer thấy bạn biết khi nào không dùng giải pháp đó, không chỉ biết định nghĩa.
:::

## Khi nào dùng

Dùng tài liệu này sau khi đã đọc một cheatsheet hoặc trước mock interview. Đây không phải danh sách để học thuộc đáp án. Mục tiêu là biến kiến thức thành phản xạ trả lời có cấu trúc: hiểu bối cảnh, nêu quyết định, chỉ ra trade-off, và chứng minh cách bạn vận hành nó ở production.

## Mental model

Mỗi câu hỏi là một lần kiểm tra cách suy nghĩ, không phải bài kiểm tra trí nhớ. Trước hết nói kết luận ngắn. Sau đó giải thích cơ chế: hệ thống làm gì và vì sao. Cuối cùng nói giới hạn, rủi ro và cách bạn kiểm chứng ở production.

Một câu trả lời Senior không bắt đầu bằng tên framework. Nó bắt đầu bằng điều cần bảo vệ: latency, correctness, bảo mật, chi phí hoặc khả năng vận hành. Sau đó mới đến cơ chế, failure mode và bằng chứng. Interviewer thường đặt follow-up để kiểm tra bạn có phân biệt được “biết khái niệm” và “đã đưa quyết định vào production” hay không.

Mỗi câu hỏi trong bank này nên được luyện theo hai nhịp:

1. Tự trả lời thành tiếng trước, không nhìn gợi ý.
2. So với rubric, ghi lại một lỗ hổng cụ thể vào hàng đợi ôn: ví dụ “chưa giải thích unknown outcome khi timeout”, thay vì chỉ ghi “yếu distributed systems”.

## Cách trả lời 60–90 giây

Dùng khung **Bối cảnh → Quyết định → Trade-off → Bằng chứng**:

- **Bối cảnh:** workload, action, invariant hoặc failure mode nào đang quan trọng?
- **Quyết định:** chọn cơ chế nào và boundary nằm ở đâu?
- **Trade-off:** điều gì không được đảm bảo, chi phí/vấn đề mới là gì?
- **Bằng chứng:** metric, trace, query plan, test, audit hoặc runbook nào xác nhận quyết định đúng?

Ví dụ thay vì nói “dùng Redis để nhanh hơn”, hãy nói: “Với màn hình danh mục đọc nhiều và cho phép stale trong 30 giây, tôi dùng cache-aside theo tenant. Giá phải checkout vẫn đọc source of truth. Tôi theo dõi hit ratio, source latency và stale mismatch; cache miss storm có request coalescing.”

## Bẫy chung cần tránh

- Trả lời bằng slogan: “microservices scalable”, “async tạo thread”, “Kafka exactly-once”, “index luôn nhanh”.
- Không nói scope: một quyết định đúng cho read model có thể sai cho payment/balance.
- Chỉ nêu happy path; không nói retry, duplicate, timeout, rollback hoặc deploy version chồng lấp.
- Nêu công nghệ nhưng không nói data owner, boundary transaction và metric quan sát.
- Kể project quá dài nhưng không có vai trò cá nhân, quyết định, kết quả và bài học.

## Rubric tự đánh giá

Nếu chỉ thiếu một tên API hay một con số, bạn có thể tra lại sau. Nếu không nói được dữ liệu nào là nguồn sự thật, retry có an toàn không hoặc lỗi sẽ được phát hiện thế nào, hãy đánh dấu câu đó là cần ôn lại.

Sau mỗi câu, tự chấm từng tiêu chí 0–2. Tổng 8 điểm là mục tiêu, không phải điểm thuộc lòng.

| Tiêu chí | 0 điểm | 1 điểm | 2 điểm |
|---|---|---|---|
| Bối cảnh | Nói định nghĩa chung | Có ví dụ mơ hồ | Nêu workload/invariant cụ thể |
| Quyết định | Liệt kê công nghệ | Chọn cơ chế nhưng thiếu boundary | Cơ chế và boundary rõ ràng |
| Trade-off | Không nêu | Nêu rủi ro chung | Nêu failure mode và mitigation |
| Bằng chứng | “Tôi sẽ monitor” | Nêu metric/log chung | Nêu metric/test/audit gắn quyết định |

**7–8:** Tự tin, đưa vào lịch ôn thưa hơn. **4–6:** Lưỡng lự, ôn lại cheatsheet liên quan trong 1–2 ngày. **0–3:** Chưa trả lời được, viết lại câu trả lời 4 dòng và luyện lại ngay cuối phiên.

## Phiên luyện 30 phút

### Phút 0–3: chọn scope

Chọn một track hoặc hai topic có liên quan, ví dụ Data Correctness + Distributed Reliability. Không random toàn bộ bank nếu bạn đang có lỗ hổng cụ thể. Chuẩn bị đồng hồ, giấy ghi takeaway và tắt đáp án.

### Phút 3–18: năm câu trả lời thành tiếng

Mỗi câu có 60 giây trả lời, 60 giây xem rubric/follow-up, 60 giây ghi một takeaway. Nếu bị bí quá 20 giây, nói rõ assumption rồi trình bày baseline nhỏ nhất; đây là kỹ năng system design tốt hơn im lặng.

### Phút 18–25: follow-up sâu

Chọn hai câu điểm thấp nhất. Trả lời follow-up: failure xảy ra ở đâu, dữ liệu nào là source of truth, retry có tạo duplicate không, và quan sát bằng gì. Liên kết mỗi lỗ hổng tới một cheatsheet.

### Phút 25–30: chốt queue và kể chuyện

Đưa tối đa ba item vào Review Queue, ghi theo concept. Kết thúc bằng một project story 90 giây: tình huống, trách nhiệm của bạn, quyết định, kết quả có số liệu và điều bạn thay đổi sau đó. Không đưa mười item vào queue; queue quá lớn làm bạn không biết bắt đầu từ đâu.

## Câu hỏi mẫu theo track

### 1. C# Runtime & Memory

**Câu hỏi:** Khi nào bạn dùng `ArrayPool<T>`, và làm sao biết nó không gây lỗi dữ liệu?

**Điểm cần có:** Chỉ dùng sau profiling cho allocation/LOH pressure; ownership rõ; `try/finally` trả buffer; không retain/reference sau khi trả; clear dữ liệu nhạy cảm. So sánh p99, allocation rate, Gen2/LOH và error rate trước/sau.

**Follow-up:** Vì sao không pool mọi mảng? `Span<T>` không thể đi qua `await` có ý nghĩa gì?

**Red flags:** “GC không xử lý được mảng lớn”; “pool luôn nhanh hơn”.

### 2. Async, Threading & Concurrency

**Câu hỏi:** Vì sao `.Result` hoặc `.Wait()` trong request ASP.NET Core nguy hiểm khi có tải?

**Điểm cần có:** Nó block ThreadPool thread lúc I/O đang chờ; continuation bị trì hoãn, throughput giảm và starvation tăng. Dùng `await` end-to-end, propagate cancellation, giới hạn fan-out bằng bounded concurrency. Không khẳng định deadlock xảy ra trong mọi trường hợp ASP.NET Core.

**Follow-up:** Timeout khác cancellation thế nào? Khi nào cần `SemaphoreSlim`?

### 3. Pipeline, DI & Proxy

**Câu hỏi:** Vì sao một singleton không nên inject trực tiếp `DbContext` scoped?

**Điểm cần có:** Lifetime singleton vượt request scope; `DbContext` không thread-safe, có thể dispose hoặc giữ state cross-request. Dùng `IDbContextFactory`/scope tại operation boundary. Kể cách test lifetime và quan sát lỗi production.

**Follow-up:** Forwarded headers có thể gây vấn đề security gì sau ingress?

### 4. API, Authorization & Idempotency

**Câu hỏi:** Thiết kế idempotency key cho endpoint tạo order thế nào?

**Điểm cần có:** Scope caller/tenant + operation, fingerprint request, trạng thái xử lý, response cuối, TTL/correlation; persist atomically với business effect. Cùng key/payload replay response; key/payload khác trả conflict. Nêu unknown outcome và idempotency boundary của payment provider.

**Follow-up:** Vì sao role check ở controller chưa đủ để chống IDOR/tenant leak?

### 5. EF Core & SQL

**Câu hỏi:** Bạn debug endpoint EF Core chậm như thế nào?

**Điểm cần có:** Bắt đầu từ p95/p99, số hàng và trace; xem generated SQL/execution plan; kiểm N+1, over-fetch, tracking, index filter/order. Sửa query shape trước khi thêm index; chứng minh ảnh hưởng write/storage của index.

**Follow-up:** `Include` có thể làm query tệ hơn thế nào? Khi nào dùng keyset pagination?

### 6. Transaction, Locking & Data Correctness

**Câu hỏi:** Xử lý deadlock mà không tạo side effect trùng như thế nào?

**Điểm cần có:** Xem deadlock graph, rút ngắn và thống nhất thứ tự lock, index đúng; retry bounded+jitter chỉ local idempotent database unit. External call ở ngoài transaction, có idempotency riêng. Không tăng timeout một cách mù quáng.

**Follow-up:** Invariant nào phải là unique constraint thay vì app check?

### 7. Background Jobs, Cache & Resilience

**Câu hỏi:** Vì sao `BackgroundService` không đủ cho email/payment workflow?

**Điểm cần có:** In-memory work mất khi restart/deploy; cần durable job/broker, claim/lease, acknowledge sau persistence an toàn, idempotent handler và DLQ. Retry theo phân loại lỗi, timeout/budget, backoff+jitter, metric queue age và retry rate.

**Follow-up:** Timeout có nghĩa downstream chưa làm side effect không? Cache key cần chứa gì trong multi-tenant?

### 8. Architecture & Distributed Systems

**Câu hỏi:** Transactional outbox giải quyết gì và không giải quyết gì?

**Điểm cần có:** Atomically ghi business state + event intent, loại dual-write gap. Relay có thể retry; consumer phải dedup/idempotent. Nó không tạo exactly-once end-to-end, nên cần replay, observability và reconciliation.

**Follow-up:** Khi nào giữ modular monolith thay vì microservice? Làm sao xử lý event đến muộn/out-of-order?

### 9. Observability & Incident

**Câu hỏi:** Bạn làm gì khi p99 tăng gấp đôi sau deploy?

**Điểm cần có:** Xác định user impact và time window; giảm tác động qua rollback/flag/rate limit an toàn; so sánh deploy diff, golden signals, trace và saturation; truyền thông định kỳ; sau đó postmortem có action owner/deadline. Không restart hàng loạt trước khi giữ evidence.

**Follow-up:** Khi nào rollback nguy hiểm vì migration? Alert nào hướng tới user impact hơn CPU?

### 10. System Design

**Câu hỏi:** Thiết kế order creation chịu retry và có payment bất đồng bộ.

**Điểm cần có:** Làm rõ invariant và SLO; API idempotency; transaction ghi order/outbox; worker idempotent với provider; status lifecycle/audit; eventual consistency client-facing; timeout/retry/DLQ/reconciliation; tenant authorization và metric outbox age/transition failure.

**Follow-up:** Tại sao không đợi payment synchronously? Khi nào phải dùng strong consistency thay vì eventual?

## Luyện project story

Chuẩn bị ít nhất ba story thật, mỗi story khoảng 90 giây: một cải thiện hiệu năng/reliability, một sự cố hoặc sai lầm, và một quyết định kiến trúc/đồng thuận liên phòng ban. Dùng cấu trúc:

- **Tình huống:** hệ thống, ảnh hưởng, constraint.
- **Vai trò:** bạn sở hữu quyết định nào, không nhận công của cả team.
- **Hành động:** options đã cân nhắc, quyết định và cách rollout.
- **Kết quả:** số liệu hoặc evidence; điều gì không đạt như dự đoán.
- **Bài học:** guardrail, metric, test hoặc runbook đã thêm.

Tránh kể “chúng tôi tối ưu hệ thống rất nhiều”. Hãy nói “tôi phát hiện N+1 qua trace, đổi projection/index, canary 10%, p99 giảm từ X xuống Y và thêm query-count test”. Nếu không được tiết lộ số thật, dùng mức tương đối và nói rõ lý do.

## Tự kiểm cuối buổi

- Tôi có trả lời được ít nhất một câu ở mỗi track mà không dùng slogan không?
- Tôi có nêu được invariant, boundary và failure mode cho những câu về correctness không?
- Tôi có nói được metric/test/audit để kiểm chứng mỗi quyết định không?
- Review Queue của tôi có tối đa ba concept rõ ràng và một thời điểm luyện lại không?
- Tôi có một story thể hiện vai trò cá nhân, trade-off và bài học không?
