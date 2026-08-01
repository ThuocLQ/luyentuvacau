import type { QuizQuestion } from '../types/quiz'

const makeOptions = (best: string, unsafe: string, incomplete: string, overengineered: string) => [
  { id: 'a', text: best, verdict: 'best' as const, rationale: `“${best}” giữ đúng ràng buộc đã nêu và tạo được evidence để vận hành.` },
  { id: 'b', text: unsafe, verdict: 'unsafe' as const, rationale: `“${unsafe}” bỏ qua failure mode hoặc boundary quan trọng trong tình huống này.` },
  { id: 'c', text: incomplete, verdict: 'incomplete' as const, rationale: `“${incomplete}” có phần đúng nhưng chưa bảo vệ đủ boundary hoặc chưa xử lý outcome.` },
  { id: 'd', text: overengineered, verdict: 'overengineered' as const, rationale: `“${overengineered}” thêm cơ chế lớn hơn requirement hiện có mà không giải quyết nguyên nhân đã biết.` }
]

const explain = (decision: string, mechanism: string, tradeOff: string, failureMode: string, evidence: string) => ({ decision, mechanism, tradeOff, failureMode, evidence })

type QuizDraft = Omit<QuizQuestion, 'topic' | 'explanation' | 'productionConsequence' | 'explanationDetail'> & { explanation: ReturnType<typeof explain> }

const topicByDoc: Record<string, string> = {
  'async-concurrency': 'Async và background work',
  'background-resilience': 'Async và background work',
  'api-security': 'API và bảo mật',
  'ef-sql': 'EF Core và SQL',
  'sql-index-locking': 'EF Core và SQL',
  'distributed-systems': 'Outbox và Saga',
  'consistency-saga': 'Outbox và Saga',
  'observability-incidents': 'Observability và deploy',
  'docker-cicd': 'Observability và deploy',
  'performance-scale': 'Performance và system design',
  'system-design-framework': 'Performance và system design'
}

const quizDrafts: QuizDraft[] = [
  {
    id: 'async-fanout-bound', version: 1, type: 'decision', difficulty: 'Senior', relatedDoc: 'async-concurrency', relatedSection: 'cach-quyet-dinh-tung-buoc',
    scenario: 'Endpoint đồng bộ 2.000 đơn hàng với một partner. Partner trả 429 khi quá 40 request đồng thời.', facts: ['Code hiện dùng Task.WhenAll cho toàn bộ danh sách.', 'Connection wait và timeout tăng.', 'Quota 40 được tính cho riêng instance này.'], constraints: ['Không được làm partner quá tải.', 'Mỗi order có thể xử lý độc lập.'], prompt: 'Thay đổi đầu tiên tốt nhất là gì?',
    options: makeOptions('Đặt bounded concurrency gần nơi tạo call, bắt đầu từ quota 40 rồi load test/điều chỉnh.', 'Retry ngay mọi timeout để request cuối cùng thành công.', 'Tăng ThreadPool để có nhiều task chạy hơn.', 'Đưa toàn bộ flow sang microservice trước khi đo lại.'), correctOptionId: 'a',
    explanation: explain('Giới hạn fan-out theo capacity downstream.', 'await không tăng socket hay quota; Task.WhenAll không tự throttle.', 'Hoàn thành chậm hơn lúc đầu nhưng tránh queue/retry storm.', 'Burst và retry mù làm cạn pool, 429 nhiều hơn.', 'Theo dõi active calls, 429, connection wait, queue age và p99.'), recall: ['Async nhả thread, không tăng capacity partner.', 'Limit phải có signal để điều chỉnh.'], followUp: { changedConstraint: 'Work không được mất khi service restart.', prompt: 'Bạn đổi thiết kế chỗ nào?', expectedDirection: 'Persist job vào broker/job table; worker idempotent và ack sau persistence.' }, tags: ['async', 'backpressure']
  },
  {
    id: 'async-cancel-after-send', version: 1, type: 'unknown-outcome', difficulty: 'Senior', relatedDoc: 'async-concurrency', relatedSection: 'neu-co-loi-thi-sao',
    scenario: 'Client hủy request ngay sau khi app gửi lệnh tạo shipment sang partner. HTTP client nhận cancellation.', facts: ['Partner nhận stable request ID.', 'Shipment có side effect.'], constraints: ['Không tạo shipment trùng.', 'Client cần biết outcome sau đó.'], prompt: 'App nên làm gì?',
    options: makeOptions('Lưu/giữ trạng thái pending và tra cứu partner theo request ID trước khi gửi lại.', 'Kết luận shipment thất bại vì CancellationToken đã bị hủy.', 'Gửi lại ngay khi client mở app lần nữa.', 'Bỏ CancellationToken để chắc chắn mọi call luôn xong.'), correctOptionId: 'a',
    explanation: explain('Coi cancellation sau send là unknown outcome.', 'Cancellation dừng việc chờ của app chứ không đảo effect đã tới partner.', 'UI có trạng thái pending và cần tra cứu.', 'Retry mù tạo shipment trùng.', 'Đo pending quá tuổi, lookup outcome và duplicate suppression.'), recall: ['Cancellation không rollback external effect.'], followUp: { changedConstraint: 'Partner không có API tra cứu.', prompt: 'Bạn thay đổi gì?', expectedDirection: 'Dùng partner idempotency/reference nếu có; nếu không, thiết kế exception/reconciliation thay vì hứa retry an toàn.' }, tags: ['cancellation', 'idempotency']
  },
  {
    id: 'background-durability', version: 1, type: 'boundary', difficulty: 'Senior', relatedDoc: 'background-resilience', relatedSection: 'cach-quyet-dinh-tung-buoc',
    scenario: 'Sau khi tạo order, API cần gửi email receipt; pod có thể restart bất kỳ lúc nào.', facts: ['Email không cần hoàn thành trong response.', 'Receipt không được mất.'], constraints: ['Không dùng scoped service sau request.', 'Delivery có thể lặp.'], prompt: 'Thiết kế nào phù hợp nhất?',
    options: makeOptions('Persist job/outbox trước, worker xử lý idempotent và chỉ ack sau khi outcome bền.', 'Task.Run gửi email ngay sau khi trả 200.', 'Giữ request mở đến khi SMTP trả thành công.', 'Tăng số BackgroundService để giảm nguy cơ restart.'), correctOptionId: 'a',
    explanation: explain('Dùng durable handoff cho work không được mất.', 'Memory task mất khi process chết; persisted record cho phép worker nhận lại.', 'Cần queue state, retry policy và UI/support visibility.', 'Ack trước persistence hoặc Task.Run làm mất receipt.', 'Theo dõi job/outbox age, retry exhausted, duplicate delivery.'), recall: ['Durable work cần persistence, không chỉ thread nền.'], followUp: { changedConstraint: 'Email marketing có thể bỏ khi quá tải.', prompt: 'Có dùng cùng path với receipt không?', expectedDirection: 'Phân loại criticality; marketing có thể shed, receipt vẫn durable.' }, tags: ['background', 'durability']
  },
  {
    id: 'api-tenant-resource', version: 1, type: 'boundary', difficulty: 'Senior', relatedDoc: 'api-security', relatedSection: 'cach-quyet-dinh-tung-buoc',
    scenario: 'JWT của user tenant A hợp lệ nhưng URL chứa order ID thuộc tenant B.', facts: ['Frontend không hiển thị ID của B.', 'Client có thể tự sửa URL.'], constraints: ['Không lộ dữ liệu cross-tenant.'], prompt: 'Guard đáng tin cậy nhất là gì?',
    options: makeOptions('Scope query/policy theo identity server và resource trước khi trả response.', 'Ẩn order tenant khác ở frontend.', 'Tin tenantId trong request body.', 'Chỉ bật CORS allow-list.'), correctOptionId: 'a',
    explanation: explain('Authorization phải ở server theo resource.', 'JWT hợp lệ không chứng minh ownership của order.', 'Cần policy/404-vs-403 nhất quán theo threat model.', 'UI, body client và CORS không bảo vệ caller trực tiếp.', 'Integration test tenant A truy cập ID của B; theo dõi authorization deny.'), recall: ['Authentication khác authorization.', 'CORS không phải access control API.'], followUp: { changedConstraint: 'Support admin có quyền đọc nhiều tenant.', prompt: 'Bạn tránh bypass rule thế nào?', expectedDirection: 'Policy/role rõ, audit access và scope tối thiểu; không bỏ tenant filter toàn cục.' }, tags: ['security', 'tenant']
  },
  {
    id: 'api-idempotency-payload', version: 1, type: 'unknown-outcome', difficulty: 'Senior', relatedDoc: 'api-security', relatedSection: 'cach-quyet-dinh-tung-buoc',
    scenario: 'Client gửi cùng idempotency key cho POST payment hai lần, lần hai có amount khác.', facts: ['Key được scope theo caller và operation.', 'Request đầu đã hoàn tất.'], constraints: ['Không charge theo payload bị thay.', 'Client cần outcome rõ.'], prompt: 'Response đúng nhất?',
    options: makeOptions('Trả conflict vì cùng key nhưng fingerprint payload khác.', 'Charge lần hai vì payload mới hơn.', 'Trả cached response đầu dù payload khác.', 'Xóa record key ngay để client thử lại từ đầu.'), correctOptionId: 'a',
    explanation: explain('Key phải gắn với semantic request/fingerprint.', 'Replay cùng payload trả outcome cũ; payload khác là ambiguity/tampering cần conflict.', 'Cần retention window và xử lý key đang in-flight.', 'Charge hoặc im lặng trả response cũ đều che conflict.', 'Test same key/same payload, changed payload và crash recovery.'), recall: ['Idempotency key không chỉ là cache header.'], followUp: { changedConstraint: 'Request đầu còn đang xử lý.', prompt: 'Request thứ hai nên nhận gì?', expectedDirection: 'Trạng thái in-progress/retry guidance hoặc chờ bounded; không chạy effect thứ hai.' }, tags: ['api', 'idempotency']
  },
  {
    id: 'api-cors-threat', version: 1, type: 'decision', difficulty: 'Senior', relatedDoc: 'api-security', relatedSection: 'neu-co-loi-thi-sao',
    scenario: 'Team muốn “bảo vệ API” bằng CORS allow-list sau khi thấy script từ domain lạ gọi endpoint.', facts: ['API còn có mobile client và service-to-service caller.', 'Endpoint trả dữ liệu tenant.'], constraints: ['Chặn truy cập trái phép ở server.'], prompt: 'Quyết định đúng nhất?',
    options: makeOptions('Giữ CORS cho browser policy nhưng enforce authentication, resource authorization và rate limit ở server.', 'Chỉ cấu hình CORS vì browser sẽ chặn mọi caller lạ.', 'Tin Origin header như bằng chứng identity.', 'Chuyển endpoint sang gRPC để không cần authorization.'), correctOptionId: 'a',
    explanation: explain('CORS và authorization là threat khác nhau.', 'CORS quyết định browser script có đọc response, không xác thực caller.', 'Cần vẫn có CORS đúng cho UX browser.', 'Origin có thể không tồn tại/không phải identity; protocol không thay auth.', 'Test caller không phải browser và cross-tenant access.'), recall: ['CORS không phải authentication.'], followUp: { changedConstraint: 'API dùng cookie session trên browser.', prompt: 'Threat nào cần xét thêm?', expectedDirection: 'CSRF và cookie policy; vẫn authorize resource server-side.' }, tags: ['security', 'cors']
  },
  {
    id: 'ef-list-shape', version: 1, type: 'diagnosis', difficulty: 'Senior', relatedDoc: 'ef-sql', relatedSection: 'cach-quyet-dinh-tung-buoc',
    scenario: 'GET /orders chậm khi dữ liệu tăng. SQL trả nhiều cột, Include nhiều collection và ToListAsync chạy trước pagination.', facts: ['Endpoint chỉ hiển thị 20 dòng/page.', 'Read-only.'], constraints: ['Không đổi response contract.'], prompt: 'Sửa đầu tiên tốt nhất?',
    options: makeOptions('Scope tenant, filter/sort ổn định, project DTO và page trước materialize; xem SQL/plan.', 'Thêm AsNoTracking và giữ nguyên query.', 'Thêm index cho mọi cột trong entity.', 'Đưa toàn bộ list vào Redis ngay.'), correctOptionId: 'a',
    explanation: explain('Sửa query shape trước micro-optimization.', 'Projection/page giảm rows/payload; plan cho biết join/sort/index cần gì.', 'No-tracking vẫn có thể đọc quá nhiều data.', 'Index/cache không tự sửa over-fetching hoặc freshness contract.', 'Đo command count, rows, plan, DB wait và p99.'), recall: ['AsNoTracking không cứu query shape xấu.'], followUp: { changedConstraint: 'UI cần nhảy tới trang 10.000.', prompt: 'Bạn bàn về pagination gì?', expectedDirection: 'Đánh đổi offset sâu với keyset/cursor và contract UI.' }, tags: ['efcore', 'sql']
  },
  {
    id: 'ef-lost-update', version: 1, type: 'sequence', difficulty: 'Senior', relatedDoc: 'ef-sql', relatedSection: 'neu-co-loi-thi-sao',
    scenario: 'Hai user cùng sửa trạng thái ticket. Lần lưu sau không được âm thầm ghi đè lần trước.', facts: ['Ticket có version/concurrency token.', 'Conflict có ý nghĩa cho người dùng.'], constraints: ['Không giữ DB lock suốt thời gian user mở form.'], prompt: 'Cách xử lý phù hợp nhất?',
    options: makeOptions('Update kèm version, khi conflict trả outcome để reload/merge theo use case.', 'Retry SaveChanges đến khi một lần thành công.', 'Dùng singleton DbContext để mọi user cùng thấy state.', 'Nâng isolation cao nhất cho mọi request.'), correctOptionId: 'a',
    explanation: explain('Optimistic concurrency phát hiện lost update mà không lock lâu.', 'Conditional version chỉ cho update khi state vẫn như lúc đọc.', 'Cần UX/merge policy cho conflict.', 'Retry mù ghi đè; singleton context/isolation toàn cục không giải quyết đúng scope.', 'Integration test hai update concurrent và assert conflict/outcome.'), recall: ['Conflict là outcome nghiệp vụ, không chỉ exception để retry.'], followUp: { changedConstraint: 'Update là decrement stock không được âm.', prompt: 'Guard nào cần gần database?', expectedDirection: 'Conditional update/constraint/transaction local theo invariant, không chỉ token UI.' }, tags: ['efcore', 'concurrency']
  },
  {
    id: 'sql-deadlock-evidence', version: 1, type: 'diagnosis', difficulty: 'Senior', relatedDoc: 'sql-index-locking', relatedSection: 'neu-co-loi-thi-sao',
    scenario: 'Deadlock rate tăng sau release cập nhật Order rồi Inventory, trong khi job khác cập nhật Inventory rồi Order.', facts: ['DB đã chọn victim.', 'Có external email sau transaction.'], constraints: ['Không gửi email trùng.', 'Cần giảm deadlock.'], prompt: 'Bước đúng nhất?',
    options: makeOptions('Đọc deadlock graph, thống nhất lock order/rút transaction; retry bounded chỉ local DB unit idempotent.', 'Tăng command timeout và retry cả workflow gồm email.', 'Chuyển mọi update sang serializable ngay.', 'Thêm một index ngẫu nhiên và bỏ qua graph.'), correctOptionId: 'a',
    explanation: explain('Deadlock cần evidence về vòng lock và scope retry.', 'Lock order nhất quán/rút transaction phá vòng; email ngoài unit retry.', 'Có thể vẫn cần index sau khi plan/evidence cho thấy lock dài.', 'Timeout/retry workflow có thể nhân external effect; isolation/index mù là overreaction.', 'Theo dõi deadlock graph, lock wait, retry rate và duplicate email.'), recall: ['Retry không được vượt boundary idempotent.'], followUp: { changedConstraint: 'Conflict hiếm nhưng user cần merge.', prompt: 'Bạn nghiêng về cơ chế nào?', expectedDirection: 'Optimistic token/conditional update, kèm outcome conflict rõ.' }, tags: ['sql', 'deadlock']
  },
  {
    id: 'outbox-crash-after-publish', version: 1, type: 'sequence', difficulty: 'Senior', relatedDoc: 'distributed-systems', relatedSection: 'neu-co-loi-thi-sao',
    scenario: 'Outbox relay publish OrderCreated thành công rồi crash trước khi đánh dấu row đã phát.', facts: ['Broker có thể giao lại event.', 'Consumer tạo reservation trong database riêng.'], constraints: ['Không reserve hai lần.'], prompt: 'Consumer cần làm gì?',
    options: makeOptions('Deduplicate event ID hoặc unique business key trong cùng local transaction với reservation.', 'Tin broker sẽ không giao lại event.', 'Chỉ log duplicate rồi vẫn tạo reservation.', 'Tăng số partition để tránh replay.'), correctOptionId: 'a',
    explanation: explain('Outbox cho phép publish lặp; effect local phải idempotent.', 'Dedup record/unique key và reservation cùng commit chặn duplicate local.', 'Cần retention theo replay window.', 'Broker/partition không tạo exactly-once cho database effect.', 'Crash test sau publish; đo duplicate rejection và reservation mismatch.'), recall: ['Outbox bảo vệ commit local, không bảo vệ effect consumer tự động.'], followUp: { changedConstraint: 'Consumer gọi HTTP payment provider.', prompt: 'Local dedup đã đủ chưa?', expectedDirection: 'Chưa; cần provider idempotency/reference và reconciliation vì HTTP effect không atomic với DB.' }, tags: ['outbox', 'idempotency']
  },
  {
    id: 'saga-timeout', version: 1, type: 'unknown-outcome', difficulty: 'Senior', relatedDoc: 'consistency-saga', relatedSection: 'neu-co-loi-thi-sao',
    scenario: 'Order reserve inventory xong, payment timeout. Provider có API lookup theo reference.', facts: ['Reservation là local fact ở service khác.', 'Payment outcome chưa biết.'], constraints: ['Không charge hai lần.', 'Không giữ reservation vô hạn.'], prompt: 'Saga nên chuyển thế nào?',
    options: makeOptions('Giữ state Pending/Unknown, lookup/reconcile payment; timeout policy rồi release reservation theo rule có audit.', 'Charge lại ngay và rollback toàn bộ như một DB transaction.', 'Đánh dấu Order Failed ngay khi timeout.', 'Bỏ state machine, để từng service retry vô hạn.'), correctOptionId: 'a',
    explanation: explain('Saga cần state, timeout và reconciliation.', 'Mỗi owner đã commit local; compensation là action mới, không phải rollback global.', 'UI phải thấy pending và operator cần exception path.', 'Retry/failed mù gây double charge hoặc stale reserve.', 'Theo dõi pending age, lookup outcome, reservation release và mismatch.'), recall: ['Saga không có ACID rollback xuyên service.'], followUp: { changedConstraint: 'Provider không thể refund tự động.', prompt: 'Compensation thay đổi thế nào?', expectedDirection: 'Dùng exception/reconciliation có owner và audit; không hứa đảo effect được.' }, tags: ['saga', 'payment']
  },
  {
    id: 'outbox-dlq-owner', version: 1, type: 'decision', difficulty: 'Senior', relatedDoc: 'distributed-systems', relatedSection: 'cach-quyet-dinh-tung-buoc',
    scenario: 'Consumer nhận event payload sai schema; retry 30 lần vẫn fail.', facts: ['Lỗi không phải timeout/429.', 'Các message sau cùng key bị chậm.'], constraints: ['Không mất evidence.', 'Không retry vô hạn.'], prompt: 'Cách xử lý phù hợp?',
    options: makeOptions('Đưa vào DLQ có reason/correlation/owner, sửa rồi replay có kiểm soát.', 'Retry nhanh hơn để broker tự hồi phục.', 'Bỏ message không log để giải phóng queue.', 'Tạo thêm Saga cho mọi schema error.'), correctOptionId: 'a',
    explanation: explain('Poison message cần cách ly và ownership.', 'Schema/business invalid không tự thành transient khi retry.', 'Replay cần compatibility và dedup.', 'Retry storm, drop evidence hay Saga không sửa payload sai.', 'Đo DLQ age/count, replay success và owner acknowledgement.'), recall: ['DLQ không hữu ích nếu không có owner và replay path.'], followUp: { changedConstraint: 'Schema mới cần rollout consumer cũ/mới.', prompt: 'Bạn phát hành field thế nào?', expectedDirection: 'Ưu tiên additive/optional, version contract và test replay/compatibility.' }, tags: ['outbox', 'dlq']
  },
  {
    id: 'incident-after-deploy', version: 1, type: 'diagnosis', difficulty: 'Senior', relatedDoc: 'observability-incidents', relatedSection: 'cach-quyet-dinh-tung-buoc',
    scenario: 'Sau canary, checkout p99 tăng gấp đôi và payment success giảm ở một region.', facts: ['Deploy version tương quan thời điểm lỗi.', 'Schema vẫn compatible với artifact cũ.'], constraints: ['Giảm impact trước khi tìm root cause.'], prompt: 'Việc đầu tiên tốt nhất?',
    options: makeOptions('Dừng/tắt canary hoặc rollback, giữ dashboard/trace/deploy diff rồi điều tra.', 'Restart mọi pod để latency về 0.', 'Đọc toàn bộ log trước khi thay đổi traffic.', 'Scale out toàn region ngay.'), correctOptionId: 'a',
    explanation: explain('Mitigation an toàn theo blast radius đi trước root cause.', 'Version/region cho phép rollback có kiểm soát và giữ evidence.', 'Cần sau đó điều tra query/config/dependency.', 'Restart/log-first/scale-out có thể kéo dài impact và xóa evidence.', 'Theo dõi p99, payment success, canary version, saturation và rollback result.'), recall: ['Impact → mitigation → evidence → root cause.'], followUp: { changedConstraint: 'Migration đã đổi semantic data, app cũ không tương thích.', prompt: 'Có rollback image ngay không?', expectedDirection: 'Không; tắt behavior hoặc roll-forward compatible với quan sát chặt.' }, tags: ['incident', 'deploy']
  },
  {
    id: 'deploy-migration-compatibility', version: 1, type: 'trade-off', difficulty: 'Senior', relatedDoc: 'docker-cicd', relatedSection: 'cicd-va-compatibility',
    scenario: 'Release mới cần đổi tên cột đang được pod cũ đọc trong rolling deploy.', facts: ['Pod cũ/mới cùng chạy một thời gian.', 'Rollback có thể cần.'], constraints: ['Không làm lỗi ngẫu nhiên theo pod.'], prompt: 'Kế hoạch tốt nhất?',
    options: makeOptions('Expand field mới, code đọc/ghi tương thích, migrate/backfill có kiểm soát rồi contract ở release sau.', 'Rename/drop cột trong cùng migration với deploy.', 'Dùng image latest để rollback nhanh.', 'Dừng toàn bộ production trước mỗi schema change.'), correctOptionId: 'a',
    explanation: explain('Schema evolution cần compatibility trong thời gian rollout.', 'Expand-migrate-contract cho cả version cũ/mới đường chạy.', 'Tốn nhiều release/backfill monitoring.', 'Destructive migration/latest/downtime mặc định tăng blast radius.', 'Test old/new app với schema, theo dõi migration/backfill và readiness/error theo version.'), recall: ['Artifact immutable và schema compatible làm rollback có ý nghĩa.'], followUp: { changedConstraint: 'Dữ liệu đã đổi semantic không thể đọc bằng code cũ.', prompt: 'Rollback strategy?', expectedDirection: 'Tắt feature hoặc roll-forward bằng hotfix compatible, không ép artifact cũ chạy.' }, tags: ['cicd', 'migration']
  },
  {
    id: 'observability-evidence', version: 1, type: 'evidence', difficulty: 'Senior', relatedDoc: 'observability-incidents', relatedSection: 'chung-minh-minh-lam-dung',
    scenario: 'Team vừa sửa query checkout và nói “đã nhanh hơn”.', facts: ['Chỉ benchmark local payload nhỏ.', 'Có thể release kèm config change.'], constraints: ['Cần biết người dùng có thực sự tốt hơn.'], prompt: 'Evidence nào mạnh nhất?',
    options: makeOptions('So canary/baseline theo version: p95/p99, error, DB wait/trace và checkout completed.', 'Chỉ chụp CPU trung bình sau deploy.', 'Chỉ đọc một log request thành công.', 'Tắt mọi alert để dashboard bớt nhiễu.'), correctOptionId: 'a',
    explanation: explain('Evidence phải nối change với user outcome và dependency.', 'Percentile/version/trace phân biệt cải thiện thật với biến động traffic/config.', 'Cần guardrail nếu regression.', 'CPU/log đơn lẻ không chứng minh; tắt alert che signal.', 'Dashboard theo version, trace exemplar và business outcome.'), recall: ['Metric kỹ thuật cần nối với outcome người dùng.'], followUp: { changedConstraint: 'p99 tốt hơn nhưng payment success giảm.', prompt: 'Release có thành công không?', expectedDirection: 'Không kết luận từ latency; ưu tiên business/error outcome và investigate regression.' }, tags: ['observability', 'evidence']
  },
  {
    id: 'performance-cpu-low-p99-high', version: 1, type: 'diagnosis', difficulty: 'Senior', relatedDoc: 'performance-scale', relatedSection: 'bat-dau-tu-bang-chung',
    scenario: 'p99 tăng 300 ms lên 4 s, CPU API 30%; trace cho thấy nhiều request chờ DB connection.', facts: ['Pool wait tăng sau release.', 'DB gần giới hạn connection.'], constraints: ['Không làm DB quá tải hơn.'], prompt: 'Hành động đầu tiên tốt nhất?',
    options: makeOptions('Khoanh release/query và DB saturation; giảm work hoặc rollback compatible trước khi đổi pool/scale.', 'Scale API instance để có thêm CPU.', 'Tăng pool limit không giới hạn.', 'Cache mọi endpoint kể cả balance.'), correctOptionId: 'a',
    explanation: explain('CPU thấp không loại queueing/pool/downstream bottleneck.', 'Trace + pool wait chỉ chỗ cần điều tra; thêm instance có thể thêm connections.', 'Sau evidence có thể tune pool/query/capacity.', 'Scale/pool/cache mù tăng pressure hoặc stale-risk.', 'Đo pool wait, DB connections/waits, query plan, p99 và error.'), recall: ['Tìm nơi chờ trước khi scale.'], followUp: { changedConstraint: 'Query đã tối ưu nhưng một tenant hot chiếm tải.', prompt: 'Bạn xem gì?', expectedDirection: 'Phân phối key/partition, rate limit/bulkhead và fairness trước global scale.' }, tags: ['performance', 'database']
  },
  {
    id: 'cache-freshness', version: 1, type: 'trade-off', difficulty: 'Senior', relatedDoc: 'performance-scale', relatedSection: 'cache-la-trade-off-consistency',
    scenario: 'Catalog được đọc nhiều, giá checkout và buying power phải đúng tại thời điểm quyết định.', facts: ['Catalog có thể cũ 30 giây.', 'Cache đôi lúc down.'], constraints: ['Không quyết định tiền từ dữ liệu stale.'], prompt: 'Dùng cache thế nào?',
    options: makeOptions('Cache-aside cho catalog với TTL/key/fallback; checkout đọc source of truth.', 'Cache mọi giá và balance trong 24 giờ.', 'Tắt cache toàn bộ vì stale luôn nguy hiểm.', 'Dùng distributed lock cho mọi cache read.'), correctOptionId: 'a',
    explanation: explain('Freshness contract khác nhau theo use case.', 'Cache phục vụ read chấp nhận stale, không thay owner của invariant.', 'Cần stampede/cache-down policy theo capacity source.', 'Cache balance sai; bỏ cache/lock mọi read là cực đoan.', 'Đo hit/miss, stale age, fallback load và checkout correctness.'), recall: ['Cache là bản sao đọc, không phải source of truth.'], followUp: { changedConstraint: 'Cache miss storm làm source quá tải.', prompt: 'Bạn thêm guard nào?', expectedDirection: 'Request coalescing/refresh limit/bounded fallback, rồi đo nguồn dữ liệu.' }, tags: ['cache', 'consistency']
  },
  {
    id: 'system-design-baseline', version: 1, type: 'decision', difficulty: 'Senior', relatedDoc: 'system-design-framework', relatedSection: 'cach-quyet-dinh-tung-buoc',
    scenario: 'Đề thiết kế order: order không confirm hai lần; email có thể trễ; payment provider có thể timeout.', facts: ['Chưa có evidence cần microservices.', 'Order DB hỗ trợ transaction/constraint.'], constraints: ['Phải giải thích UI pending và recovery.'], prompt: 'Bạn mở đầu thiết kế thế nào?',
    options: makeOptions('Nêu invariant/owner, baseline Order DB + idempotent command, async email qua outbox; payment timeout giữ pending và reconcile.', 'Vẽ Kafka, Redis và microservices trước để chứng minh scale.', 'Gọi payment/email sync trong transaction để mọi thứ cùng rollback.', 'Chỉ nêu database và bỏ qua trạng thái UI/failure.'), correctOptionId: 'a',
    explanation: explain('Baseline nhỏ nhất giữ invariant trước, rồi tách async hợp lý.', 'Transaction local không rollback provider; pending/reconciliation xử lý unknown outcome.', 'Cần sau đó nêu capacity/observability.', 'Technology-first, transaction HTTP hay bỏ failure đều thiếu boundary.', 'Test duplicate/timeout, theo dõi pending age, outbox lag, mismatch.'), recall: ['Journey → invariant/owner → baseline → failure → scale.'], followUp: { changedConstraint: 'Email giờ phải hoàn thành trước response.', prompt: 'Bạn hỏi lại gì?', expectedDirection: 'Làm rõ business need/SLO; chấp nhận sync availability hoặc thiết kế receipt status thay vì tự đổi technology.' }, tags: ['system-design', 'order']
  }
]

export const quizQuestions: QuizQuestion[] = quizDrafts.map((question) => ({
  ...question,
  topic: topicByDoc[question.relatedDoc],
  explanation: question.explanation.decision,
  productionConsequence: question.explanation.failureMode,
  explanationDetail: question.explanation,
  options: question.options.map(option => ({
    ...option,
    rationale: option.verdict === 'best'
      ? question.explanation.decision
      : option.verdict === 'unsafe'
        ? question.explanation.failureMode
        : option.verdict === 'incomplete'
          ? question.explanation.mechanism
          : question.explanation.tradeOff
  }))
}))

export const quizzes = quizQuestions
