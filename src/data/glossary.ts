import type { GlossaryTerm } from '../types/content'

export const glossary: GlossaryTerm[] = [
  ['threadpool-starvation', 'ThreadPool starvation', 'ThreadPool không còn thread rảnh để chạy continuation hay request mới.', 'Thường là hệ quả của blocking I/O, .Result/.Wait() hoặc CPU work không được giới hạn.', 'async-concurrency'],
  ['backpressure', 'Backpressure', 'Tín hiệu làm producer chậm lại khi consumer hoặc downstream đã đầy.', 'Queue bounded giúp buộc hệ thống chờ, từ chối hoặc lưu bền thay vì nhận vô hạn.', 'async-concurrency'],
  ['bounded-concurrency', 'Bounded concurrency', 'Giới hạn số công việc được chạy đồng thời.', 'Đặt theo capacity thật của database, HTTP partner hoặc CPU; không theo một con số ngẫu nhiên.', 'async-concurrency'],
  ['durable-queue', 'Durable queue', 'Hàng đợi lưu công việc qua restart hoặc scale-out.', 'Ack chỉ nên diễn ra sau khi effect cần thiết đã được ghi bền.', 'async-concurrency'],
  ['idempotency', 'Idempotency', 'Gọi lại cùng một thao tác cho cùng kết quả nghiệp vụ, không tạo side effect trùng.', 'Cần key ổn định, scope đúng và record bền; retry không tự tạo idempotency.', 'distributed-systems'],
  ['idempotency-boundary', 'Idempotency boundary', 'Ranh giới nơi duplicate được nhận diện và chặn an toàn.', 'Ví dụ: API command, consumer transaction hoặc payment provider.', 'distributed-systems'],
  ['retry-budget', 'Retry budget', 'Ngân sách giới hạn thời gian và số lần retry của một thao tác.', 'Hết budget thì trả lỗi, đưa DLQ hoặc reconcile; không retry mãi.', 'consistency-saga'],
  ['unknown-outcome', 'Unknown outcome', 'Không biết downstream đã thực hiện effect hay chưa sau timeout/lỗi kết nối.', 'Không retry mù payment; dùng idempotency key và query/reconciliation.', 'background-resilience'],
  ['ack-point', 'Ack point', 'Thời điểm xác nhận message/job đã xử lý an toàn.', 'Ack trước persistence có thể mất work khi process chết.', 'distributed-systems'],
  ['reconciliation', 'Reconciliation', 'Đối chiếu state nội bộ với nguồn có thẩm quyền để phát hiện và sửa lệch.', 'Đây là cơ chế bình thường của flow có external boundary, không chỉ là xử lý sự cố.', 'consistency-saga'],
  ['data-ownership', 'Data ownership', 'Quyền quyết định và ghi state của một dữ liệu thuộc về một boundary rõ ràng.', 'Owner đặt invariant gần data; service khác tích hợp qua contract thay vì ghi thẳng.', 'architecture'],
  ['eventual-consistency', 'Eventual consistency', 'Các read model/boundary hội tụ sau một khoảng trễ thay vì cùng lúc.', 'Cần nêu trạng thái pending, UX, retry, replay và cách phát hiện không hội tụ.', 'distributed-systems'],
  ['poison-message', 'Poison message', 'Message luôn lỗi vì payload/schema/business rule nên retry không tự sửa được.', 'Đưa vào DLQ/quarantine cùng lý do và runbook replay sau khi sửa.', 'distributed-systems'],
  ['p99', 'p99 latency', '99% request nhanh hơn hoặc bằng giá trị này; 1% chậm nhất nằm ngoài.', 'p99 bộc lộ queueing và tail latency mà average dễ che mất.', 'performance-scale'],
  ['blast-radius', 'Blast radius', 'Phạm vi người dùng/hệ thống bị ảnh hưởng khi một thay đổi hay lỗi xảy ra.', 'Canary, feature flag và bulkhead giúp giảm blast radius.', 'observability-incidents'],
  ['outbox', 'Transactional outbox', 'Ghi business state và ý định phát event trong cùng local transaction.', 'Nó loại dual-write gap, nhưng consumer vẫn phải idempotent vì publish có thể trùng.', 'distributed-systems'],
  ['dead-letter-queue', 'DLQ', 'Nơi cách ly message không thể xử lý bình thường.', 'DLQ phải có owner, lý do lỗi, alert và quy trình sửa/replay.', 'distributed-systems'],
  ['circuit-breaker', 'Circuit breaker', 'Tạm ngừng gọi dependency đang lỗi để tránh dồn thêm tải.', 'Không thay thế timeout, retry budget hay fallback có semantics đúng.', 'background-resilience'],
  ['bulkhead', 'Bulkhead', 'Tách resource pool để một dependency chậm không làm cạn toàn hệ thống.', 'Ví dụ: limit concurrency riêng cho từng partner.', 'background-resilience'],
  ['cache-aside', 'Cache-aside', 'App đọc cache trước, miss thì đọc source of truth rồi tự ghi cache.', 'Phải quyết định stale data, TTL, invalidation và stampede.', 'background-resilience'],
  ['source-of-truth', 'Source of truth', 'Nơi state được xem là chuẩn để quyết định nghiệp vụ.', 'Cache, index và read model không tự thành source of truth.', 'system-design-framework'],
  ['slo', 'SLO', 'Mục tiêu mức dịch vụ có thể đo, ví dụ p99 hoặc availability.', 'SLO giúp biến “nhanh, ổn định” thành quyết định capacity và alert cụ thể.', 'system-design-framework'],
  ['golden-signals', 'Golden signals', 'Latency, traffic, errors và saturation để nhìn sức khỏe service.', 'Dùng cùng trace và business metric để điều tra user impact.', 'observability-incidents'],
  ['correlation-id', 'Correlation ID', 'ID nối một request qua log, trace, outbox và consumer.', 'Không chứa dữ liệu nhạy cảm; truyền nhất quán qua boundary.', 'observability-incidents'],
  ['n-plus-one', 'N+1 query', 'Một query lấy danh sách rồi phát sinh thêm query cho từng item.', 'Đo số command/SQL; dùng projection hoặc batch thay vì Include theo phản xạ.', 'ef-sql'],
  ['query-shape', 'Query shape', 'Dạng dữ liệu, filter, join, sort và số hàng mà query thực sự cần.', 'Query shape quyết định SQL/index tốt hơn việc chỉ tối ưu LINQ syntax.', 'ef-sql'],
  ['execution-plan', 'Execution plan', 'Kế hoạch database dùng để đọc/join/sort dữ liệu.', 'Xem actual plan với parameter thật trước khi thêm index hay hint.', 'ef-sql'],
  ['optimistic-concurrency', 'Optimistic concurrency', 'Chỉ update khi version vẫn khớp, phát hiện lost update thay vì lock sớm.', 'Conflict cần được use case quyết định reload, merge hay báo người dùng.', 'ef-sql'],
  ['isolation-level', 'Isolation level', 'Quy tắc một transaction thấy dữ liệu concurrent đến mức nào.', 'Chọn theo invariant và contention, không phải cứ cao nhất là tốt nhất.', 'sql-index-locking'],
  ['deadlock', 'Deadlock', 'Các transaction chờ lock của nhau theo vòng tròn.', 'Đọc deadlock graph, giảm thời gian transaction và thống nhất thứ tự update.', 'sql-index-locking'],
  ['dependency-injection', 'Dependency Injection', 'Container tạo dependency theo lifetime và ranh giới request.', 'Singleton không giữ scoped state; dùng factory/scope tại operation boundary.', 'aspnet-pipeline'],
  ['middleware', 'Middleware', 'Thành phần xử lý request/response theo thứ tự trong pipeline.', 'Vị trí quyết định nó có thấy identity, route metadata hay exception hay không.', 'aspnet-pipeline'],
  ['cancellation-token', 'CancellationToken', 'Tín hiệu yêu cầu dừng công việc khi client/host hủy.', 'Phải truyền xuống HTTP, EF, delay và worker; không đảm bảo external effect được đảo.', 'async-concurrency'],
  ['garbage-collection', 'Garbage collection', 'Runtime thu hồi managed object không còn reachable.', 'GC không thay ownership/dispose và không giải phóng object còn bị cache/closure giữ.', 'runtime-memory'],
  ['large-object-heap', 'Large Object Heap (LOH)', 'Vùng heap cho allocation lớn, dễ tạo áp lực GC/fragmentation khi workload không phù hợp.', 'Đo allocation và heap trước khi dùng pooling.', 'runtime-memory'],
  ['array-pool', 'ArrayPool', 'Pool tái sử dụng buffer để giảm allocation lặp lại.', 'Rent/Return phải có ownership nghiêm; không dùng buffer sau Return.', 'runtime-memory'],
  ['bounded-context', 'Bounded context', 'Ranh giới nơi model và thuật ngữ domain có ý nghĩa nhất quán.', 'Giúp tránh một model khổng lồ bị nhiều team ghi tự do.', 'architecture'],
  ['saga', 'Saga', 'Chuỗi local transaction có state, timeout và compensation/reconciliation.', 'Compensation là business action mới, không phải rollback ACID xuyên service.', 'consistency-saga'],
  ['schema-evolution', 'Schema evolution', 'Thay đổi event/API/database sao cho bản cũ và mới cùng hoạt động trong rollout.', 'Ưu tiên additive change, expand–migrate–contract và replay test.', 'docker-cicd'],
  ['rate-limit', 'Rate limit', 'Giới hạn request/work theo caller hoặc resource để bảo vệ capacity.', 'Chọn response/queue policy và key tránh làm tenant khác ảnh hưởng nhau.', 'api-security'],
  ['tenant-isolation', 'Tenant isolation', 'Bảo đảm tenant chỉ thấy và tác động dữ liệu của chính họ.', 'Authorization theo resource/tenant phải ở server, không chỉ filter UI.', 'api-security'],
  ['load-shedding', 'Load shedding', 'Chủ động từ chối hoặc hạ cấp một phần tải để bảo toàn phần quan trọng.', 'Tốt hơn là để queue/thread/socket cạn toàn hệ thống.', 'performance-scale'],
  ['hot-partition', 'Hot partition', 'Một key/partition nhận tải vượt xa các partition khác.', 'Chọn partition key theo distribution và cách xử lý một tenant/order quá nóng.', 'system-design-framework'],
  ['feature-flag', 'Feature flag', 'Công tắc tách release code khỏi việc bật behavior.', 'Cần owner, expiry, observability và kế hoạch xóa flag.', 'docker-cicd']
  ,['trade-off', 'Trade-off', 'Giá trị nhận được và cost/rủi ro phải chấp nhận khi chọn một giải pháp.', 'Một câu trả lời Senior nêu điều kiện làm trade-off đổi khác, thay vì nói một pattern luôn đúng.', 'senior-followups']
].map(([id, term, shortDefinition, explanation, doc]) => ({ id, term, shortDefinition, explanation, relatedDocs: [doc] }))

export const glossaryById = new Map(glossary.map(term => [term.id, term]))
export const findGlossaryTerm = (reference: string) => {
  const normalized = reference.trim().toLowerCase()
  return glossary.find(term => term.id === normalized || term.term.toLowerCase() === normalized || term.aliases?.some(alias => alias.toLowerCase() === normalized))
}
