import type { QuizOption, QuizQuestion } from '../types/quiz'

type Draft = Omit<QuizQuestion, 'topic' | 'explanation' | 'productionConsequence' | 'explanationDetail'> & {
  explanation: {
    decision: string
    mechanism: string
    tradeOff: string
    failureMode: string
    evidence: string
  }
}

const option = (id: string, text: string, verdict: QuizOption['verdict'], rationale: string): QuizOption => ({ id, text, verdict, rationale })

const topicByDoc: Record<string, string> = {
  'async-concurrency': 'Async và background work',
  'background-resilience': 'Async và background work',
  'api-security': 'API và bảo mật',
  'ef-sql': 'EF Core và SQL',
  'sql-index-locking': 'EF Core và SQL',
  'distributed-systems': 'Outbox và Saga',
  'consistency-saga': 'Outbox và Saga',
  'observability-incidents': 'Theo dõi hệ thống và phát hành',
  'docker-cicd': 'Theo dõi hệ thống và phát hành',
  'performance-scale': 'Performance và system design',
  'system-design-framework': 'Performance và system design'
}

const drafts: Draft[] = [
  {
    id: 'async-fanout-bound', version: 3, type: 'decision', learningObjective: 'Biết giới hạn số request đang chờ đối tác, thay vì tạo quá nhiều task hoặc retry dồn dập.', difficulty: 'Senior', relatedDoc: 'async-concurrency', relatedSection: 'cach-quyet-dinh-tung-buoc',
    scenario: 'Tool nội bộ đồng bộ 2.000 đơn sang đối tác vận chuyển. Đối tác quy định mỗi app instance chỉ được có tối đa 40 request đang chờ response cùng lúc.',
    facts: ['Code dùng `Task.WhenAll` nên khởi động cả 2.000 HTTP request gần như cùng lúc.', 'Khi vượt ngưỡng, đối tác trả `429 Too Many Requests`.', 'Mỗi đơn có thể xử lý độc lập và retry sau.'],
    constraints: ['Không được vượt giới hạn 40 yêu cầu đồng thời.', 'Không làm mất đơn chưa đồng bộ.'],
    prompt: 'Thay đổi đầu tiên nào giải quyết đúng nguyên nhân?',
    options: [
      option('a', 'Chỉ cho tối đa 40 request cùng chờ response; xong một request mới lấy đơn tiếp theo.', 'best', 'Đúng vì giới hạn số call đang cùng đi tới đối tác. Đây là giới hạn theo capacity của đối tác, không phải theo số thread của app.'),
      option('b', 'Giữ 2.000 request cùng lúc, nhưng retry ngay khi nhận 429.', 'unsafe', 'Retry ngay làm lượng request dồn vào đối tác tăng thêm. Chỉ retry sau khi đã giới hạn tải và có backoff phù hợp.'),
      option('c', 'Tăng số luồng nền để nhiều việc chạy hơn.', 'incomplete', 'Thêm luồng chỉ giúp máy mình chạy thêm việc; nó không làm đối tác nhận được nhiều hơn 40 yêu cầu cùng lúc.'),
      option('d', 'Tách luồng này thành một dịch vụ riêng trước, rồi mới đo lại.', 'overengineered', 'Một dịch vụ mới không tự tạo thêm giới hạn cho đối tác. Hãy chặn ngay chỗ tạo yêu cầu trước; chỉ tách khi có lý do vận hành riêng.'),
    ], correctOptionId: 'a',
    explanation: { decision: 'Giới hạn số request đồng thời theo capacity mà đối tác công bố.', mechanism: '`Task.WhenAll` khởi động mọi Task đã tạo; `await` chỉ giúp app không block thread trong lúc chờ, chứ không tăng capacity của đối tác.', tradeOff: 'Toàn bộ đơn có thể hoàn thành lâu hơn, đổi lại ít request bị từ chối và hệ thống ổn định hơn.', failureMode: 'Nếu tiếp tục dồn request hoặc retry ngay, lỗi 429 và queue sẽ tăng nhanh hơn.', evidence: 'Theo dõi số request đang chạy, lỗi 429, thời gian chờ connection và tuổi của đơn chưa đồng bộ.' },
    recall: ['Chạy bất đồng bộ không làm đối tác có thêm sức chứa.', 'Muốn bảo vệ đối tác, hãy giới hạn số yêu cầu cùng chờ phản hồi.'],
    followUp: { changedConstraint: 'Không được mất đơn khi process restart.', prompt: 'Bạn bổ sung gì?', expectedDirection: 'Persist job vào database hoặc durable queue; worker đọc lại và vẫn giữ giới hạn 40 request.' }, tags: ['async', 'backpressure']
  },
  {
    id: 'async-cancel-after-send', version: 3, type: 'unknown-outcome', learningObjective: 'Nhận ra hủy chờ sau khi gửi không cho biết đối tác đã làm hay chưa.', difficulty: 'Senior', relatedDoc: 'async-concurrency', relatedSection: 'neu-co-loi-thi-sao',
    scenario: 'Khách bấm tạo vận đơn. App đã gửi request sang đối tác rồi khách đóng màn hình. `CancellationToken` bị cancel trước khi app nhận response.',
    facts: ['Đối tác nhận một mã yêu cầu cố định do ứng dụng tạo.', 'Tạo vận đơn là hành động có thể tạo dữ liệu thật.', 'Đối tác có API tra cứu theo mã yêu cầu.'], constraints: ['Không tạo hai vận đơn cho một đơn.', 'Khi khách quay lại phải biết kết quả.'],
    prompt: 'App nên xử lý kết quả này thế nào?',
    options: [
      option('a', 'Lưu trạng thái “đang chờ xác nhận”, tra cứu đối tác theo mã yêu cầu trước khi gửi lại.', 'best', 'Đúng vì ứng dụng chưa biết đối tác đã tạo vận đơn hay chưa. Tra cứu theo mã cố định giúp xác nhận kết quả thay vì đoán.'),
      option('b', 'Đánh dấu tạo vận đơn thất bại vì CancellationToken đã bị hủy.', 'unsafe', 'Tín hiệu dừng chỉ nói ứng dụng không chờ tiếp; nó không thu hồi yêu cầu đã tới đối tác.'),
      option('c', 'Retry ngay khi khách mở app lần sau.', 'unsafe', 'Retry khi chưa tra cứu có thể tạo vận đơn thứ hai. Đây là lỗi thường gặp với timeout hoặc mất kết nối.'),
      option('d', 'Không truyền CancellationToken để yêu cầu nào cũng chờ đến cùng.', 'incomplete', 'Ứng dụng vẫn cần dừng phần việc không còn giá trị. Bỏ tín hiệu dừng không giải quyết việc đối tác có thể đã xử lý yêu cầu.'),
    ], correctOptionId: 'a',
    explanation: { decision: 'Coi đây là `unknown outcome`, giữ trạng thái pending và tra cứu trước.', mechanism: 'Cancel việc chờ ở app không rollback side effect đã gửi qua network.', tradeOff: 'UI có thêm trạng thái pending; đổi lại hệ thống không phải đoán và không tạo vận đơn trùng.', failureMode: 'Kết luận thất bại hoặc retry khi chưa kiểm tra có thể tạo hai vận đơn.', evidence: 'Theo dõi request pending quá lâu, số lần tra cứu và số vận đơn bị trùng.' },
    recall: ['Mất response không có nghĩa là đối tác chưa làm.', 'Tra cứu trước, retry sau.'], followUp: { changedConstraint: 'Đối tác không cho tra cứu.', prompt: 'Bạn cần hỏi hoặc thiết kế thêm gì?', expectedDirection: 'Hỏi đối tác có idempotency key hoặc báo cáo reconciliation hay không; nếu không có, phải có manual review thay vì hứa retry an toàn.' }, tags: ['cancellation', 'idempotency']
  },
  {
    id: 'background-durability', version: 3, type: 'boundary', learningObjective: 'Hiểu durable handoff và phân biệt email provider nhận request với người dùng nhận được email.', difficulty: 'Senior', relatedDoc: 'background-resilience', relatedSection: 'cach-quyet-dinh-tung-buoc',
    scenario: 'Sau khi tạo order, hệ thống phải gửi email hóa đơn. API có thể trả response ngay, nhưng pod có thể restart bất kỳ lúc nào.',
    facts: ['Email hóa đơn không cần gửi xong trong lần gọi HTTP.', 'Không được làm mất yêu cầu gửi email.', 'Cùng một việc gửi có thể được giao lại cho tiến trình xử lý.'], constraints: ['Không dùng đối tượng chỉ sống trong lần gọi HTTP sau khi lần gọi đã kết thúc.', 'Bộ phận hỗ trợ cần biết email nào đang lỗi.'], prompt: 'Thiết kế nào đáng tin cậy nhất?',
    options: [
      option('a', 'Persist job gửi email vào database hoặc durable queue; worker chỉ đánh dấu đã gửi sau khi email provider xác nhận đã nhận request.', 'best', 'Đúng vì job vẫn còn sau khi process restart. “Provider đã nhận request” chưa có nghĩa email đã tới inbox; nếu cần biết bước đó, hệ thống phải theo dõi trạng thái riêng.'),
      option('b', 'Gọi Task.Run để gửi email ngay sau khi trả mã 200.', 'unsafe', 'Việc chỉ nằm trong bộ nhớ sẽ mất khi bản ứng dụng khởi động lại. Nó cũng dễ dùng nhầm thành phần đã hết vòng đời của lần gọi HTTP.'),
      option('c', 'Giữ HTTP request mở đến khi SMTP trả thành công.', 'incomplete', 'Có thể cần cho một luồng rất đặc biệt, nhưng ở đây email được phép trễ. Giữ request mở làm trải nghiệm và độ sẵn sàng phụ thuộc SMTP.'),
      option('d', 'Cho API ghi trạng thái order là “đã gửi email” trước, còn worker gửi sau.', 'incomplete', 'Trạng thái “đã gửi” sẽ sai nếu job chưa được persist hoặc provider chưa nhận. Cần tách rõ “đã enqueue” và “provider đã nhận”.'),
    ], correctOptionId: 'a',
    explanation: { decision: 'Dùng durable handoff rồi để worker xử lý.', mechanism: 'RAM mất khi process restart, nhưng job trong database hoặc durable queue vẫn còn để worker khác làm tiếp.', tradeOff: 'Phải quản lý state, retry và duplicate email; đổi lại không mất job.', failureMode: 'Background Task chỉ nằm trong RAM có thể biến mất ngay sau khi API trả 200; đánh dấu “đã gửi” quá sớm khiến support hiểu sai.', evidence: 'Theo dõi job age, số lần gửi lỗi, job bị kẹt, duplicate email và trạng thái provider nhận request.' }, recall: ['Job không được mất phải được persist trước.', 'Provider nhận request chưa chắc người dùng đã thấy email.'], followUp: { changedConstraint: 'Email quảng cáo có thể bỏ khi quá tải.', prompt: 'Có nên xử lý cùng cách với hóa đơn không?', expectedDirection: 'Không nên mặc định. Phân loại durability/priority và cho phép drop hoặc hạ ưu tiên email quảng cáo.' }, tags: ['background', 'durability']
  },
  {
    id: 'api-tenant-resource', version: 3, type: 'boundary', learningObjective: 'Phân biệt đăng nhập hợp lệ với quyền xem đúng đơn hàng.', difficulty: 'Senior', relatedDoc: 'api-security', relatedSection: 'cach-quyet-dinh-tung-buoc',
    scenario: 'Người dùng của công ty A đã đăng nhập hợp lệ. Họ sửa URL để mở mã đơn hàng của công ty B.', facts: ['Trang web không hiển thị mã đơn của B, nhưng URL có thể sửa bằng tay.', 'Token đăng nhập của người dùng A là hợp lệ.'], constraints: ['Không lộ dữ liệu giữa hai công ty.', 'API còn được gọi từ mobile và công cụ nội bộ.'], prompt: 'API cần kiểm tra gì trước khi trả đơn hàng?',
    options: [
      option('a', 'Lấy người đã đăng nhập từ token (mã đăng nhập) và chỉ tìm đơn thuộc công ty/quyền của người đó.', 'best', 'Đúng vì máy chủ phải kiểm tra quyền trên chính đơn đang xin xem. Token hợp lệ chỉ xác nhận người gọi là ai, chưa nói họ được xem đơn nào.'),
      option('b', 'Ẩn nút xem đơn của công ty khác trên giao diện.', 'unsafe', 'Giao diện chỉ là lớp tiện dụng. Người gọi vẫn có thể tự gửi HTTP request thẳng tới API.'),
      option('c', 'Tin mã công ty mà thiết bị người dùng gửi trong nội dung yêu cầu.', 'unsafe', 'Dữ liệu từ thiết bị người dùng có thể bị sửa. Công ty và quyền phải được máy chủ suy ra từ danh tính đã xác thực.'),
      option('d', 'Chỉ cho phép CORS từ website của công ty.', 'incomplete', 'CORS chỉ cho trình duyệt biết website nào được đọc phản hồi; nó không thay thế việc API kiểm tra quyền.'),
    ], correctOptionId: 'a',
    explanation: { decision: 'Máy chủ kiểm tra quyền xem chính đơn hàng đang được yêu cầu.', mechanism: 'Xác thực trả lời “ai gọi”; phân quyền trả lời “người này được làm gì với đơn này”.', tradeOff: 'Mọi câu lấy đơn đều phải giới hạn theo công ty hoặc quyền của người gọi; đổi lại chặn được việc đoán hay sửa mã đơn.', failureMode: 'Nếu chỉ ẩn trên giao diện hoặc tin dữ liệu do thiết bị gửi lên, người dùng A có thể đọc đơn của công ty B.', evidence: 'Viết bài kiểm tra cho trường hợp mã đăng nhập của A truy cập đơn của B và theo dõi các lần máy chủ từ chối quyền.' }, recall: ['Đăng nhập đúng chưa đủ để xem mọi dữ liệu.', 'Quyền xem đơn phải được kiểm tra ở máy chủ.'], followUp: { changedConstraint: 'Nhân viên hỗ trợ được xem nhiều công ty.', prompt: 'Bạn mở quyền thế nào?', expectedDirection: 'Tạo quyền riêng, giới hạn rõ và lưu lịch sử ai đã xem gì; không bỏ toàn bộ bộ lọc công ty.' }, tags: ['security', 'tenant']
  },
  {
    id: 'api-idempotency-payload', version: 3, type: 'unknown-outcome', learningObjective: 'Biết một idempotency key chỉ đại diện cho một lần thanh toán có payload không đổi.', difficulty: 'Senior', relatedDoc: 'api-security', relatedSection: 'cach-quyet-dinh-tung-buoc',
    scenario: 'App thanh toán retry request `POST` do mất mạng. Lần thứ hai dùng cùng `idempotency key` nhưng gửi số tiền khác lần đầu.', facts: ['Idempotency key được lưu theo đúng người gọi và loại thao tác.', 'Lần đầu đã xử lý xong.'], constraints: ['Không thu tiền theo payload đã bị đổi.', 'Client cần nhận lỗi rõ để sửa.'], prompt: 'API nên trả về gì?',
    options: [
      option('a', 'Trả lỗi conflict: key cũ đang gắn với một request có payload khác.', 'best', 'Đúng vì cùng một key chỉ đại diện cho một lần thanh toán. Payload khác phải bị từ chối thay vì đoán client muốn sửa hay retry.'),
      option('b', 'Thu thêm tiền theo số tiền mới.', 'unsafe', 'Cùng key mà tạo thêm giao dịch sẽ phá idempotency và có thể thu tiền hai lần.'),
      option('c', 'Trả lại kết quả lần đầu mà không báo payload đã khác.', 'incomplete', 'Không thu thêm tiền là đúng, nhưng im lặng sẽ che mất bug ở client.'),
      option('d', 'Xóa key cũ để client gửi lại từ đầu.', 'unsafe', 'Xóa lịch sử khiến server không còn nhận ra đây là lần retry và có thể tạo giao dịch trùng.'),
    ], correctOptionId: 'a',
    explanation: { decision: 'Một idempotency key chỉ dùng cho một request có payload không đổi.', mechanism: 'Server lưu key cùng request fingerprint — dấu rút gọn của payload. Retry đúng payload thì nhận kết quả cũ; payload khác bị báo conflict.', tradeOff: 'Phải giữ key đủ lâu và có response rõ khi lần gọi đầu vẫn đang chạy.', failureMode: 'Bỏ qua payload đã đổi có thể thu sai tiền hoặc che bug của client.', evidence: 'Test ba trường hợp: cùng key và cùng payload, cùng key nhưng khác payload, và lần gọi đầu vẫn đang chạy.' }, recall: ['Idempotency key đại diện cho một lần thanh toán, không phải nút “làm lại từ đầu”.'], followUp: { changedConstraint: 'Lần đầu vẫn đang xử lý.', prompt: 'Lần retry nên nhận gì?', expectedDirection: 'Trả trạng thái đang xử lý hoặc hướng dẫn retry sau; không chạy thêm một lần thanh toán.' }, tags: ['api', 'idempotency']
  },
  {
    id: 'api-cors-threat', version: 3, type: 'decision', learningObjective: 'Phân biệt CORS của trình duyệt với việc máy chủ kiểm tra danh tính và quyền.', difficulty: 'Senior', relatedDoc: 'api-security', relatedSection: 'neu-co-loi-thi-sao',
    scenario: 'Team thấy một website lạ gọi API từ trình duyệt và muốn “bảo vệ API bằng CORS”. API này cũng có app mobile gọi trực tiếp.', facts: ['Endpoint trả dữ liệu theo từng công ty.', 'API dùng token để nhận diện người gọi.'], constraints: ['Chặn người không có quyền ở mọi loại client.', 'Website hợp lệ vẫn phải dùng được API.'], prompt: 'Cách làm đúng là gì?',
    options: [
      option('a', 'Chỉ cho website hợp lệ gọi từ trình duyệt bằng CORS, đồng thời để máy chủ kiểm tra mã đăng nhập và quyền xem dữ liệu.', 'best', 'Đúng vì hai việc này giải quyết hai rủi ro khác nhau: CORS dành cho mã chạy trong trình duyệt, còn máy chủ kiểm tra danh tính và quyền.'),
      option('b', 'Cấu hình CORS chặt và kiểm tra token hợp lệ ở API gateway, nhưng không kiểm tra quyền trên từng đơn trong service.', 'incomplete', 'Token hợp lệ cho biết ai gọi, còn quyền xem một đơn phụ thuộc công ty/quyền của người đó. Gateway có thể xác thực chung, nhưng vẫn cần policy kiểm tra tài nguyên.'),
      option('c', 'Tin Origin header là bằng chứng người gọi có quyền.', 'unsafe', 'Origin không phải danh tính đã xác thực và có thể không có ở nhiều loại request.'),
      option('d', 'Đặt CORS allow-list ở API gateway và để service bên trong tin rằng gateway đã kiểm tra quyền.', 'incomplete', 'Gateway có thể làm lớp kiểm tra chung, nhưng CORS vẫn không phải kiểm tra quyền tài nguyên. Service hoặc policy chung phải biết người gọi được xem dữ liệu nào.'),
    ], correctOptionId: 'a',
    explanation: { decision: 'Dùng CORS cho trải nghiệm browser, nhưng đặt kiểm tra quyền ở server.', mechanism: 'CORS cho browser biết script ở đâu được đọc response; token và policy ở server mới quyết định ai được lấy dữ liệu.', tradeOff: 'Phải cấu hình cả hai lớp, nhưng không nhầm vai trò của chúng.', failureMode: 'Chỉ dựa CORS sẽ để mobile hoặc HTTP client gọi API mà không bị kiểm tra quyền đúng cách.', evidence: 'Test cùng endpoint bằng browser, mobile-like client và token không có quyền xem dữ liệu.' }, recall: ['CORS không phải khóa cửa API.', 'Khóa cửa nằm ở xác thực và phân quyền server.'], followUp: { changedConstraint: 'Browser dùng cookie đăng nhập.', prompt: 'Cần xét thêm rủi ro nào?', expectedDirection: 'Xét CSRF và chính sách cookie, nhưng vẫn phải kiểm tra quyền tài nguyên ở server.' }, tags: ['security', 'cors']
  },
  {
    id: 'ef-list-shape', version: 3, type: 'diagnosis', learningObjective: 'Sửa việc lấy thừa dữ liệu trước khi thêm index hoặc cache; phân trang phải có thứ tự ổn định.', difficulty: 'Senior', relatedDoc: 'ef-sql', relatedSection: 'cach-quyet-dinh-tung-buoc',
    scenario: 'Trang danh sách đơn chỉ hiện 20 dòng nhưng chậm khi dữ liệu tăng. Log SQL cho thấy app lấy nhiều cột không hiển thị, tải nhiều danh sách con và chỉ cắt trang sau khi đã đọc hết.', facts: ['Đây là màn hình chỉ đọc.', 'Người dùng chỉ cần 20 dòng và vài cột cho mỗi trang.', 'UI có thể sắp xếp ổn định theo CreatedAt rồi ID để thứ tự không nhảy khi thời điểm trùng nhau.'], constraints: ['Không đổi dữ liệu trả về cho UI.', 'Chưa có bằng chứng database thiếu index.'], prompt: 'Việc sửa đầu tiên nên là gì?',
    options: [
      option('a', 'Chỉ lấy cột màn hình cần, sắp xếp ổn định theo CreatedAt rồi ID, và cắt trang trước khi đưa dữ liệu về ứng dụng.', 'best', 'Đúng vì giảm số hàng và số cột cần đọc. ID làm mốc giúp trang không nhảy; sau đó mới xem SQL thực tế để biết có cần chỉ mục (index) hay không.'),
      option('b', 'Thêm AsNoTracking (EF không giữ object để theo dõi sửa đổi) nhưng vẫn lấy toàn bộ dữ liệu như cũ.', 'incomplete', 'AsNoTracking giảm việc EF theo dõi object, nhưng không ngăn database trả quá nhiều hàng, cột hoặc join.'),
      option('c', 'Thêm một index cho cột CreatedAt ngay vì UI đang sắp xếp theo cột này.', 'incomplete', 'Index có thể hữu ích sau khi query đã chỉ lấy đúng dữ liệu, nhưng chưa biết filter, thứ tự cột và execution plan (kế hoạch database thực thi query) có khớp hay không.'),
      option('d', 'Đưa toàn bộ danh sách vào cache ngay.', 'overengineered', 'Cache có thể che triệu chứng nhưng vẫn giữ query sai và thêm bài toán dữ liệu cũ. Hãy giảm dữ liệu cần đọc trước.'),
    ], correctOptionId: 'a',
    explanation: { decision: 'Chỉ lấy đúng dữ liệu màn hình cần và chia trang ngay trong database.', mechanism: 'Database lọc, sắp xếp và giới hạn số hàng trước; ứng dụng không phải nhận rồi bỏ phần lớn dữ liệu.', tradeOff: 'Phải xác định rõ màn hình cần cột nào và dùng thứ tự sắp xếp không bị thay đổi giữa các trang.', failureMode: 'Lấy hết rồi mới chia trang khiến lượng dữ liệu và thời gian chờ tăng theo kích thước bảng.', evidence: 'So sánh số hàng, số cột, câu SQL, kế hoạch database đã dùng và nhóm truy vấn chậm trước với sau.' }, recall: ['Danh sách chậm: lấy ít dữ liệu hơn trước, tinh chỉnh EF sau.', 'Index chỉ có ý nghĩa khi biết truy vấn đang làm gì.'], followUp: { changedConstraint: 'Màn hình cần nhảy thẳng đến trang rất sâu.', prompt: 'Bạn trao đổi gì?', expectedDirection: 'Nói rõ cách bỏ qua nhiều hàng sẽ ngày càng chậm; cân nhắc phân trang theo mốc cuối cùng đã đọc và thay đổi cách chuyển trang trên giao diện.' }, tags: ['efcore', 'sql']
  },
  {
    id: 'ef-lost-update', version: 3, type: 'sequence', learningObjective: 'Phát hiện ghi đè mất dữ liệu bằng số phiên bản thay vì khóa database khi người dùng mở form.', difficulty: 'Senior', relatedDoc: 'ef-sql', relatedSection: 'neu-co-loi-thi-sao',
    scenario: 'Hai nhân viên mở cùng một ticket. Cả hai sửa và bấm lưu; lần lưu sau không được âm thầm xóa thay đổi của người trước.', facts: ['Mỗi ticket có cột version tăng sau khi lưu.', 'Người dùng có thể mở form vài phút.'], constraints: ['Không giữ khóa database trong suốt thời gian mở form.', 'Người dùng cần biết có xung đột.'], prompt: 'Cách lưu nào phù hợp nhất?',
    options: [
      option('a', 'Khi lưu, kiểm tra số phiên bản trong database vẫn bằng lúc mở form; nếu khác thì báo xung đột để tải lại hoặc gộp.', 'best', 'Đúng vì phát hiện có người đã sửa giữa lúc người dùng mở form, nhưng không giữ khóa database quá lâu.'),
      option('b', 'Nếu lưu lỗi thì tự thử lại đến khi ghi đè được.', 'unsafe', 'Tự thử lại có thể biến mất thay đổi của người khác. Xung đột ở đây là điều người dùng cần quyết định.'),
      option('c', 'Dùng một DbContext dùng chung cho tất cả người dùng.', 'unsafe', 'DbContext không phải nơi chia sẻ trạng thái giữa người dùng và không giải quyết việc hai người cùng sửa dữ liệu.'),
      option('d', 'Dùng mức cô lập database cao nhất cho mọi yêu cầu.', 'overengineered', 'Mức cô lập cao làm các lần ghi dễ phải chờ nhau hơn nhưng vẫn không cho người dùng biết họ vừa sửa trên dữ liệu cũ.'),
    ], correctOptionId: 'a',
    explanation: { decision: 'Dùng mã phiên bản để phát hiện nguy cơ ghi đè, rồi báo xung đột rõ ràng.', mechanism: 'Câu lệnh cập nhật chỉ thành công khi mã phiên bản còn giống lúc đọc; mã đã đổi nghĩa là có người khác lưu trước.', tradeOff: 'Phải thiết kế màn hình cho phép tải lại hoặc gộp thay đổi; đổi lại không cần khóa database suốt lúc người dùng mở form.', failureMode: 'Tự thử lại mà không hỏi người dùng có thể làm mất thay đổi của người lưu trước.', evidence: 'Kiểm tra hai lần cập nhật diễn ra gần như cùng lúc và xác nhận API báo xung đột cho lần dùng dữ liệu cũ.' }, recall: ['Không muốn ghi đè im lặng: lưu kèm mã phiên bản.', 'Xung đột là kết quả người dùng cần xử lý, không chỉ là lỗi kỹ thuật.'], followUp: { changedConstraint: 'Đây là trừ tồn kho và số lượng không được âm.', prompt: 'Cần thêm gì ở nơi ghi database?', expectedDirection: 'Dùng câu lệnh cập nhật có điều kiện, luật database hoặc một giao dịch ngắn để bảo vệ số lượng; không chỉ dựa vào form.' }, tags: ['efcore', 'concurrency']
  },
  {
    id: 'sql-deadlock-evidence', version: 3, type: 'diagnosis', learningObjective: 'Dùng deadlock graph để sửa vòng chờ và chỉ retry phần không tạo side effect ngoài database.', difficulty: 'Senior', relatedDoc: 'sql-index-locking', relatedSection: 'neu-co-loi-thi-sao',
    scenario: 'Sau một lần phát hành, lỗi deadlock (hai lần cập nhật chờ khóa của nhau theo vòng) tăng. Một luồng cập nhật Order rồi Inventory; luồng khác cập nhật Inventory rồi Order. Email chỉ được gửi sau khi lần ghi database đã xong.', facts: ['Database đã hủy một lần ghi để phá vòng chờ.', 'Có thể chỉ thử lại phần cập nhật database.'], constraints: ['Giảm deadlock.', 'Không gửi email hai lần.'], prompt: 'Bước xử lý hợp lý nhất là gì?',
    options: [
      option('a', 'Xem deadlock graph, thống nhất thứ tự update và rút ngắn transaction; chỉ retry phần database với số lần giới hạn.', 'best', 'Đúng vì hai thứ tự giữ lock ngược nhau tạo vòng chờ. Phần retry không bao gồm email hay external call.'),
      option('b', 'Tăng thời gian chờ tối đa rồi thử lại cả luồng, gồm cả gửi email.', 'unsafe', 'Chờ lâu hơn không phá được vòng deadlock. Chạy lại cả luồng có thể gửi email lần hai.'),
      option('c', 'Dùng mức cô lập cao nhất cho mọi yêu cầu ngay.', 'overengineered', 'Mức cô lập cao hơn có thể làm các lần ghi phải chờ nhau nhiều hơn và vẫn không sửa được thứ tự cập nhật ngược nhau.'),
      option('d', 'Thêm index ngay mà chưa xem sơ đồ vòng chờ.', 'incomplete', 'Index đôi khi giúp giữ khóa ngắn hơn, nhưng phải xem vòng chờ và kế hoạch chạy thật mới biết nó có liên quan hay không.'),
    ], correctOptionId: 'a',
    explanation: { decision: 'Dùng deadlock graph để sửa vòng chờ, rồi retry một transaction nhỏ với số lần giới hạn.', mechanism: 'Hai transaction giữ hai lock khác nhau và cùng chờ lock còn lại. Update theo cùng một thứ tự giúp tránh vòng này.', tradeOff: 'Các flow phải thống nhất thứ tự ghi và giữ transaction ngắn.', failureMode: 'Retry cả workflow có thể lặp email hoặc HTTP side effect.', evidence: 'Theo dõi deadlock graph, lock wait, retry count và duplicate email.' }, recall: ['Deadlock: tìm vòng chờ trước.', 'Không retry qua transaction boundary có external side effect.'], followUp: { changedConstraint: 'Xung đột hiếm nhưng người dùng cần gộp thay đổi.', prompt: 'Cơ chế nào hợp hơn?', expectedDirection: 'Dùng version token hoặc conditional update để báo conflict, thay vì giữ lock trong lúc chờ người dùng.' }, tags: ['sql', 'deadlock']
  },
  {
    id: 'outbox-crash-after-publish', version: 3, type: 'sequence', learningObjective: 'Chặn xử lý trùng tại consumer vì message có thể được giao lại sau khi process crash.', difficulty: 'Senior', relatedDoc: 'distributed-systems', relatedSection: 'neu-co-loi-thi-sao',
    scenario: 'Outbox worker publish event `OrderCreated` lên message broker thành công, rồi process crash trước khi đánh dấu Outbox record đã gửi.', facts: ['Khi chạy lại, worker có thể publish cùng event thêm lần nữa.', 'Inventory service tạo bản ghi giữ hàng trong database của mình.'], constraints: ['Một order chỉ được giữ hàng một lần.', 'Inventory không kiểm soát được broker có giao lại message hay không.'], prompt: 'Inventory service nên bảo vệ việc giữ hàng thế nào?',
    options: [
      option('a', 'Lưu event ID hoặc Order ID trong cùng transaction với bản ghi giữ hàng để lần nhận lại không ghi thêm.', 'best', 'Đúng vì dấu vết đã xử lý và bản ghi giữ hàng cùng commit hoặc cùng rollback.'),
      option('b', 'Tin broker sẽ chỉ giao event đúng một lần.', 'unsafe', 'Event có thể được giao lại khi consumer crash hoặc mất kết nối. Consumer phải xử lý idempotent, nghĩa là nhận lại vẫn không tạo kết quả mới.'),
      option('c', 'Chỉ ghi nhật ký rằng thông báo bị trùng rồi vẫn tạo thêm bản ghi giữ hàng.', 'unsafe', 'Nhận ra trùng nhưng vẫn ghi dữ liệu lần nữa không bảo vệ quy tắc một đơn chỉ giữ hàng một lần.'),
      option('d', 'Đánh dấu outbox đã gửi trước khi thực sự gửi thông báo.', 'unsafe', 'Nếu tiến trình dừng sau khi đánh dấu nhưng trước khi gửi, thông báo sẽ bị mất. Bên nhận vẫn phải chịu được trường hợp giao lại.'),
    ], correctOptionId: 'a',
    explanation: { decision: 'Consumer phải tự chặn trùng ngay nơi tạo bản ghi giữ hàng.', mechanism: 'Outbox lưu trạng thái nghiệp vụ và ý định publish trong cùng local transaction, nhưng worker vẫn có thể publish lại sau crash.', tradeOff: 'Phải giữ event ID hoặc business key đủ lâu để nhận ra message được giao lại.', failureMode: 'Nếu tin event chỉ đến một lần, hệ thống có thể giữ hàng hai lần cho cùng order.', evidence: 'Cho worker crash ngay sau khi publish, chạy lại và kiểm tra vẫn chỉ có một bản ghi giữ hàng.' }, recall: ['Outbox không tự chặn trùng cho consumer.', 'Nơi tạo side effect phải xử lý idempotent.'], followUp: { changedConstraint: 'Consumer gọi payment API bên ngoài.', prompt: 'Dấu vết trong Inventory database đã đủ chưa?', expectedDirection: 'Chưa. Cần idempotency key với payment provider và reconciliation vì HTTP call không nằm trong cùng local transaction.' }, tags: ['outbox', 'idempotency']
  },
  {
    id: 'saga-timeout', version: 3, type: 'unknown-outcome', learningObjective: 'Giữ trạng thái pending và tra cứu khi payment timeout tạo unknown outcome.', difficulty: 'Senior', relatedDoc: 'consistency-saga', relatedSection: 'neu-co-loi-thi-sao',
    scenario: 'Đơn hàng đã được giữ hàng. Khi gọi cổng thanh toán, request bị timeout; cổng có API tra cứu theo mã giao dịch.', facts: ['Dịch vụ kho đã ghi việc giữ hàng thành công.', '`Unknown outcome` nghĩa là app chưa biết tiền đã bị trừ hay chưa.'], constraints: ['Không thu tiền hai lần.', 'Không giữ hàng mãi mãi.'], prompt: 'Đơn hàng nên chuyển sang trạng thái nào?',
    options: [
      option('a', 'Chuyển sang “đang chờ xác nhận thanh toán”, tra cứu theo mã rồi mới quyết định giữ hay nhả hàng.', 'best', 'Đúng vì chưa biết tiền đã bị trừ hay chưa. Trạng thái rõ ràng giúp màn hình và người vận hành biết đơn nào đang chờ kiểm tra.'),
      option('b', 'Đánh dấu thất bại ngay và nhả hàng.', 'unsafe', 'Tiền có thể đã bị trừ. Nhả hàng ngay tạo chênh lệch giữa tiền và đơn hàng.'),
      option('c', 'Thử lại một lần bằng cùng mã giao dịch, nhưng đồng thời nhả hàng để khách không phải chờ.', 'incomplete', 'Dùng cùng mã giúp cổng thanh toán nhận ra lần gửi lại, nhưng nhả hàng khi kết quả cũ chưa rõ vẫn có thể tạo lệch: tiền đã bị trừ còn đơn không có hàng.'),
      option('d', 'Giữ hàng mãi và để từng dịch vụ tự thử lại không giới hạn.', 'unsafe', 'Không có thời hạn và người chịu trách nhiệm khiến hàng bị kẹt, còn hệ thống không biết ai phải quyết định khi lỗi kéo dài.'),
    ], correctOptionId: 'a',
    explanation: { decision: 'Giữ payment ở trạng thái pending khi kết quả chưa rõ, rồi tra cứu provider trước khi nhả hàng.', mechanism: 'Mỗi service chỉ rollback được local transaction của mình; không có một transaction chung đi xuyên qua payment provider.', tradeOff: 'Cần thêm trạng thái pending và luồng xử lý thủ công cho trường hợp không thể tự xác minh.', failureMode: 'Coi timeout là thất bại hoặc retry payment khi chưa tra cứu có thể làm lệch dữ liệu hoặc thu tiền hai lần.', evidence: 'Theo dõi tuổi của order pending, kết quả tra cứu, việc nhả hàng và các giao dịch lệch.' }, recall: ['Payment timeout tạo unknown outcome, không có nghĩa chắc chắn thất bại.', 'Tra provider trước khi retry hoặc nhả hàng.'], followUp: { changedConstraint: 'Provider không hỗ trợ refund tự động.', prompt: 'Khi payment đã thành công nhưng không thể làm bước bù, bạn làm gì?', expectedDirection: 'Đưa vào manual review, chỉ định owner và lưu audit log; không gọi đó là rollback tự động.' }, tags: ['saga', 'payment']
  },
  {
    id: 'outbox-dlq-owner', version: 3, type: 'decision', learningObjective: 'Phân biệt message lỗi dữ liệu cần cách ly với lỗi tạm thời có thể retry.', difficulty: 'Senior', relatedDoc: 'distributed-systems', relatedSection: 'cach-quyet-dinh-tung-buoc',
    scenario: 'Consumer không đọc được một event vì một field trong payload sai kiểu. Đã retry nhiều lần và lần nào cũng lỗi giống nhau.', facts: ['Đây không phải timeout hay rate limit.', 'Các message sau đang bị chậm vì phải chờ message lỗi này.'], constraints: ['Không làm mất message và lý do lỗi.', 'Không retry vô hạn.'], prompt: 'Cách xử lý nào đúng trọng tâm?',
    options: [
      option('a', 'Đưa event vào dead-letter queue (DLQ), lưu lý do lỗi và owner; sửa xong thì replay có kiểm soát.', 'best', 'Đúng vì payload sai không tự hết lỗi khi retry. DLQ giữ event để team có thể sửa và replay.'),
      option('b', 'Retry nhanh hơn để broker tự hồi phục.', 'unsafe', 'Broker không thể biến payload sai kiểu thành đúng. Retry nhanh còn làm consumer bị kẹt nặng hơn.'),
      option('c', 'Bỏ event sau khi ghi log lỗi để luồng chính tiếp tục.', 'unsafe', 'Luồng chính có thể tiếp tục, nhưng chỉ ghi log không tạo nơi để sửa và replay; các service có thể lệch dữ liệu mà không ai chịu trách nhiệm.'),
      option('d', 'Tạm dừng consumer và rollback producer release ngay.', 'incomplete', 'Có thể cần khi lỗi mới xuất hiện trên diện rộng, nhưng event hỏng đã nhận vẫn cần được giữ, phân loại và có đường replay.'),
    ], correctOptionId: 'a',
    explanation: { decision: 'Cách ly event hỏng trong DLQ, giao owner xử lý và chỉ replay sau khi đã sửa, kiểm tra.', mechanism: 'Retry hợp với lỗi tạm thời; payload sai hoặc vi phạm rule nghiệp vụ cần sửa dữ liệu hoặc sửa code.', tradeOff: 'Cần dashboard, alert và quy trình replay rõ ràng.', failureMode: 'Retry vô hạn làm consumer bị kẹt; bỏ event làm mất dữ liệu và khiến các service lệch nhau.', evidence: 'Theo dõi số message trong DLQ, message cũ nhất đã nằm đó bao lâu, lý do lỗi, owner và tỷ lệ replay thành công.' }, recall: ['Payload sai không tự đúng sau nhiều lần retry.', 'DLQ chỉ có ích khi có owner và đường replay rõ ràng.'], followUp: { changedConstraint: 'Cần publish event version mới khi consumer cũ vẫn chạy.', prompt: 'Bạn thay đổi payload thế nào?', expectedDirection: 'Ưu tiên thêm field không bắt buộc, giữ backward compatibility và test replay với dữ liệu thật trước khi bỏ field cũ.' }, tags: ['outbox', 'dlq']
  },
  {
    id: 'incident-after-deploy', version: 3, type: 'diagnosis', learningObjective: 'Khi release mới gây incident, giảm blast radius — phạm vi người dùng bị ảnh hưởng — trước rồi mới tìm root cause.', difficulty: 'Senior', relatedDoc: 'observability-incidents', relatedSection: 'cach-quyet-dinh-tung-buoc',
    scenario: 'Sau khi mở canary (bản mới chỉ nhận một phần nhỏ lượt truy cập), checkout chậm gấp đôi và tỷ lệ thanh toán thành công giảm ở một cụm hạ tầng theo địa lý.', facts: ['Thời điểm lỗi trùng với bản phát hành mới.', 'Cấu trúc dữ liệu hiện vẫn chạy được với phiên bản cũ.'], constraints: ['Giảm ảnh hưởng khách hàng trước khi tìm nguyên nhân sâu.', 'Không làm mất dữ liệu điều tra.'], prompt: 'Việc đầu tiên nên làm là gì?',
    options: [
      option('a', 'Dừng canary hoặc chuyển traffic về version cũ; giữ lại dashboard, trace và phần thay đổi của release để điều tra.', 'best', 'Đúng vì blast radius còn nhỏ và version cũ vẫn tương thích. Rollback giúp giảm tác động nhanh mà vẫn giữ được dữ liệu điều tra.'),
      option('b', 'Giảm mạnh lượt truy cập vào bản thử nhưng vẫn giữ nó chạy để thu thêm dữ liệu trước khi quay về bản cũ.', 'incomplete', 'Cách này có thể dùng nếu tác động rất nhỏ. Ở đây tỷ lệ thanh toán thành công đã giảm, nên dừng bản thử bảo vệ khách hàng nhanh hơn.'),
      option('c', 'Đọc hết nhật ký trước khi thay đổi luồng truy cập.', 'incomplete', 'Điều tra là cần thiết, nhưng khi khách đang thanh toán lỗi thì giảm tác động phải được làm trước.'),
      option('d', 'Tăng số máy cho cả cụm hạ tầng ngay.', 'overengineered', 'Chưa có bằng chứng thiếu CPU hay sức chứa. Thêm máy có thể tốn tiền và che mất mối liên hệ với phiên bản mới.'),
    ], correctOptionId: 'a',
    explanation: { decision: 'Giảm blast radius trước, sau đó điều tra bằng dữ liệu đã giữ lại.', mechanism: 'Canary chỉ nhận một phần nhỏ traffic; version cũ còn tương thích nên có thể nhận lại traffic an toàn.', tradeOff: 'Tạm dừng feature mới, đổi lại bảo vệ checkout và tỷ lệ thanh toán thành công.', failureMode: 'Điều tra quá lâu hoặc scale khi chưa biết nguyên nhân sẽ kéo dài incident.', evidence: 'Theo dõi p99, tỷ lệ thanh toán thành công, traffic theo version và kết quả rollback.' }, recall: ['Incident: giảm ảnh hưởng trước, tìm root cause sau.', 'Canary chỉ có ích khi có tiêu chí dừng rõ ràng.'], followUp: { changedConstraint: 'Schema mới khiến version cũ không đọc được dữ liệu.', prompt: 'Có rollback ngay không?', expectedDirection: 'Không mặc định. Tắt feature mới hoặc roll-forward một bản tương thích; quyết định phải dựa trên trạng thái dữ liệu hiện có.' }, tags: ['incident', 'deploy']
  },
  {
    id: 'deploy-migration-compatibility', version: 3, type: 'trade-off', learningObjective: 'Thay đổi schema theo nhiều bước khi code cũ và mới còn chạy cùng lúc.', difficulty: 'Senior', relatedDoc: 'docker-cicd', relatedSection: 'cach-quyet-dinh-tung-buoc',
    scenario: 'Release mới cần đổi tên một column. Trong lúc rolling deploy thay từng pod, code cũ và mới sẽ cùng truy cập database.', facts: ['Pod cũ và mới chạy song song một thời gian.', 'Có thể cần rollback app.'], constraints: ['Không để cùng một request lúc thành công, lúc thất bại tùy pod nhận nó.', 'Không mặc định dừng production.'], prompt: 'Kế hoạch release nào đáng tin cậy nhất?',
    options: [
      option('a', 'Thêm column mới, cho code cũ và mới cùng đọc ghi, migrate dữ liệu có kiểm soát; chỉ xóa column cũ ở release sau.', 'best', 'Đúng vì trong lúc rolling deploy, cả hai version đều hiểu schema. Chỉ xóa column cũ sau khi version cũ đã ngừng chạy.'),
      option('b', 'Đổi tên hoặc xóa cột trong cùng lần phát hành code mới.', 'unsafe', 'Bản ứng dụng cũ còn chạy sẽ tìm một cột không còn tồn tại, khiến lỗi xuất hiện tùy máy nhận yêu cầu.'),
      option('c', 'Luôn dùng nhãn image `latest` để quay lại nhanh.', 'unsafe', 'Nhãn `latest` không cho biết chính xác bản build nào đang chạy. Muốn quay lại an toàn phải dùng image có phiên bản cố định.'),
      option('d', 'Dừng toàn bộ production cho mọi thay đổi cấu trúc database.', 'overengineered', 'Một số thay đổi đặc biệt có thể cần thời gian dừng, nhưng không nên dùng làm mặc định khi có thể phát hành theo các bước tương thích.'),
    ], correctOptionId: 'a',
    explanation: { decision: 'Thay đổi schema theo nhiều bước để code cũ và mới cùng chạy được.', mechanism: 'Quy trình thêm column → backfill data → xóa column cũ giữ schema tương thích trong suốt rolling deploy.', tradeOff: 'Cần thêm release và phải theo dõi backfill; đổi lại vẫn có thể rollback app.', failureMode: 'Rename hoặc drop column ngay làm pod cũ lỗi khi vẫn đang nhận request.', evidence: 'Test code cũ và mới với schema trung gian; theo dõi lỗi theo version và tiến độ backfill.' }, recall: ['Khi hai version cùng chạy, schema phải tương thích với cả hai.'], followUp: { changedConstraint: 'Ý nghĩa dữ liệu đã đổi khiến code cũ đọc sai.', prompt: 'Rollback thế nào?', expectedDirection: 'Tắt feature mới hoặc roll-forward bản sửa tương thích; không ép code cũ đọc dữ liệu mang ý nghĩa mới.' }, tags: ['cicd', 'migration']
  },
  {
    id: 'observability-evidence', version: 3, type: 'evidence', learningObjective: 'Chứng minh thay đổi tốt hơn bằng metric kỹ thuật và kết quả người dùng, không dựa vào một số đo riêng lẻ.', difficulty: 'Senior', relatedDoc: 'observability-incidents', relatedSection: 'chung-minh-minh-lam-dung',
    scenario: 'Team sửa query ở bước thanh toán và nói hệ thống “nhanh hơn”. Họ mới chỉ đo trên máy cá nhân với bộ dữ liệu nhỏ.', facts: ['Bản phát hành cũng đổi một cấu hình khác.', 'Mục tiêu là người dùng hoàn tất thanh toán nhanh và thành công hơn.', 'Canary là nhóm nhỏ chạy version mới; baseline là nhóm đối chiếu vẫn chạy version cũ.'], constraints: ['Phải phân biệt cải thiện thật với thay đổi về traffic hoặc cấu hình.', 'Không bỏ sót việc tỷ lệ thanh toán thành công bị giảm.'], prompt: 'Bằng chứng nào thuyết phục nhất?',
    options: [
      option('a', 'So sánh canary với baseline: p95/p99, error rate, database wait và tỷ lệ checkout hoàn tất.', 'best', 'Đúng vì cách đo này nối thay đổi với trải nghiệm người dùng và chỉ ra dependency nào đang gây chờ.'),
      option('b', 'Chỉ chụp CPU trung bình sau khi phát hành.', 'incomplete', 'CPU có thể thấp khi request đang chờ database. Một số đo riêng lẻ không chứng minh người dùng thanh toán nhanh hơn.'),
      option('c', 'Đọc một dòng nhật ký của request thành công.', 'unsafe', 'Một request không đại diện cho nhóm chậm hoặc tỷ lệ lỗi của toàn bộ khách hàng.'),
      option('d', 'Chỉ cảnh báo theo thời gian phản hồi trong lúc thử bản mới.', 'incomplete', 'Tốc độ có thể tốt hơn trong khi tỷ lệ thanh toán thành công lại giảm. Tiêu chí dừng phải gồm cả lỗi và kết quả thanh toán.'),
    ], correctOptionId: 'a',
    explanation: { decision: 'So sánh từng version bằng cả metric kỹ thuật và kết quả thanh toán.', mechanism: 'p95/p99 cho thấy nhóm request chậm; trace và thời gian chờ database giải thích nguyên nhân; tỷ lệ checkout hoàn tất cho biết người dùng có thật sự được lợi không.', tradeOff: 'Dashboard cần gắn nhãn version và phân biệt rõ canary với baseline.', failureMode: 'Chỉ nhìn CPU hoặc một log thành công có thể dẫn tới kết luận sai.', evidence: 'Theo dõi latency, error rate, thời gian chờ database và tỷ lệ checkout hoàn tất theo version.' }, recall: ['“Nhanh hơn” phải nhìn từ người dùng, không chỉ một metric máy chủ.'], followUp: { changedConstraint: 'p99 tốt hơn nhưng tỷ lệ thanh toán thành công giảm.', prompt: 'Release có thành công không?', expectedDirection: 'Không. Ưu tiên kết quả người dùng và điều tra regression trước.' }, tags: ['observability', 'evidence']
  },
  {
    id: 'performance-cpu-low-p99-high', version: 3, type: 'diagnosis', learningObjective: 'Tìm chỗ đang gây chờ trước khi scale-out app hoặc tăng connection pool.', difficulty: 'Senior', relatedDoc: 'performance-scale', relatedSection: 'cach-quyet-dinh-tung-buoc',
    scenario: 'Mốc p99 — 99% request nhanh hơn mốc này — tăng từ 300 ms lên 4 giây sau release, nhưng CPU API chỉ 30%. Trace cho thấy nhiều request đang chờ lấy connection từ pool để gọi database.', facts: ['Connection pool là nhóm kết nối database được app tái sử dụng.', 'Số request chờ connection tăng sau release.', 'Database đã gần dùng hết số connection cho phép.'], constraints: ['Không đẩy thêm tải vô ích vào database.', 'Giảm ảnh hưởng trước khi đổi cấu hình theo phỏng đoán.'], prompt: 'Hành động đầu tiên nên là gì?',
    options: [
      option('a', 'Tìm query hoặc thay đổi trong release đang giữ connection lâu; giảm tải hoặc rollback trước khi tăng pool.', 'best', 'Đúng vì trace đã chỉ ra request đang chờ connection. Scale-out API có thể mở thêm connection và làm database quá tải hơn.'),
      option('b', 'Thêm máy chạy API vì CPU còn thấp.', 'unsafe', 'CPU thấp không có nghĩa database còn chỗ. Máy mới thường tạo thêm kết nối tới database đang gần đầy.'),
      option('c', 'Tăng vừa phải số kết nối cho mỗi máy, đồng thời đặt giới hạn cho toàn hệ thống.', 'incomplete', 'Đây có thể là bước sau khi biết database còn sức chứa. Hiện database đã gần đầy và kết nối bị giữ lâu, nên phải tìm truy vấn hoặc thay đổi gây ra trước.'),
      option('d', 'Đưa mọi API vào cache, kể cả API đọc số dư.', 'overengineered', 'Số dư trong cache có thể cũ, trong khi nguyên nhân giữ connection lâu vẫn chưa được sửa.'),
    ], correctOptionId: 'a',
    explanation: { decision: 'Tìm vì sao connection bị giữ lâu và giảm tải ở đó trước.', mechanism: 'Request có thể chờ database dù CPU app đang rảnh. Connection pool chỉ quản lý connection; nó không làm database có thêm capacity.', tradeOff: 'Có thể phải rollback hoặc tắt bớt feature tạm thời; đổi lại tránh database quá tải lan rộng.', failureMode: 'Scale-out hoặc tăng pool khi chưa biết root cause có thể kéo dài incident.', evidence: 'Theo dõi thời gian chờ pool, số connection database, query plan, p99 và error theo version.' }, recall: ['CPU rảnh vẫn có thể đang tắc ở database.', 'Tìm chỗ chờ trước khi scale-out.'], followUp: { changedConstraint: 'Query đã ổn nhưng một tenant chiếm phần lớn tải.', prompt: 'Bạn xem tiếp gì?', expectedDirection: 'Xem tải theo tenant hoặc key, rồi đặt giới hạn riêng để một tenant không chiếm hết tài nguyên.' }, tags: ['performance', 'database']
  },
  {
    id: 'cache-freshness', version: 3, type: 'trade-off', learningObjective: 'Chọn mức dữ liệu cũ chấp nhận được khi dùng cache, nhưng không dùng cache làm source of truth lúc chốt tiền.', difficulty: 'Senior', relatedDoc: 'performance-scale', relatedSection: 'chon-a-hay-b',
    scenario: 'Catalog được đọc rất nhiều. Giá hiển thị ở catalog có thể chậm cập nhật tối đa 30 giây, nhưng lúc checkout thì giá và số dư phải là dữ liệu mới nhất.', facts: ['Cache là bản sao để đọc nhanh và đôi lúc không truy cập được.', 'Database là source of truth — nơi quyết định giá cuối và số dư.'], constraints: ['Không thu tiền theo giá hoặc số dư cũ.', 'Không đẩy tải không cần thiết vào database cho catalog.'], prompt: 'Dùng cache thế nào hợp lý nhất?',
    options: [
      option('a', 'Cache catalog với TTL 30 giây; khi cache lỗi chỉ cho một lượng request có giới hạn đọc thẳng database. Checkout luôn đọc source of truth.', 'best', 'Đúng vì catalog chấp nhận dữ liệu cũ 30 giây, còn checkout thì không. Cache giúp đọc nhanh; database vẫn quyết định số tiền.'),
      option('b', 'Cache giá và số dư trong 24 giờ cho mọi luồng.', 'unsafe', 'Dữ liệu cũ ở checkout có thể khiến hệ thống thu sai tiền hoặc cho phép chi quá số dư.'),
      option('c', 'Cache catalog như trên, nhưng nếu cache lỗi thì trả lỗi ngay cho mọi request.', 'incomplete', 'Có thể cho một lượng request giới hạn đọc database nếu database còn capacity. Không cần từ chối toàn bộ người dùng.'),
      option('d', 'Dùng distributed lock cho mọi lần đọc cache.', 'overengineered', 'Lock mọi lần đọc làm hệ thống phức tạp và chậm hơn. Chỉ cần ngăn quá nhiều request cùng nạp lại một key vừa hết hạn.'),
    ], correctOptionId: 'a',
    explanation: { decision: 'Cache dữ liệu được phép chậm cập nhật; checkout vẫn đọc source of truth.', mechanism: 'Cache là bản sao đọc nhanh. Database giữ rule và dữ liệu dùng để chốt giá, số dư.', tradeOff: 'Catalog có thể chậm cập nhật tối đa 30 giây và cần giới hạn lượng request đọc database khi cache lỗi.', failureMode: 'Dùng dữ liệu cũ ở checkout có thể tạo quyết định tài chính sai.', evidence: 'Theo dõi cache hit rate, tuổi dữ liệu trong cache, tải fallback vào database và tỷ lệ checkout thành công.' }, recall: ['Cache để đọc nhanh; nơi chốt tiền phải đọc source of truth.', 'Dữ liệu được phép cũ bao lâu phụ thuộc từng use case.'], followUp: { changedConstraint: 'Nhiều request cùng cache miss và đổ về database.', prompt: 'Bạn thêm gì?', expectedDirection: 'Gộp các request cùng nạp một key, giới hạn lượng refresh và theo dõi tải database.' }, tags: ['cache', 'consistency']
  },
  {
    id: 'system-design-baseline', version: 3, type: 'decision', learningObjective: 'Mở đầu system design từ rule nghiệp vụ, nơi sở hữu dữ liệu và cách xử lý lỗi trước khi chọn công nghệ.', difficulty: 'Senior', relatedDoc: 'system-design-framework', relatedSection: 'cach-quyet-dinh-tung-buoc',
    scenario: 'Đề bài yêu cầu thiết kế hệ thống đặt hàng: một đơn không được xác nhận hai lần; email có thể đến trễ; cổng thanh toán có thể hết thời gian chờ.', facts: ['Chưa có bằng chứng phải tách thành nhiều dịch vụ nhỏ.', 'Database của đơn hàng hỗ trợ giao dịch và luật không cho dữ liệu trùng.'], constraints: ['Phải nói rõ màn hình hiển thị gì khi chưa biết kết quả thanh toán.', 'Có cách xử lý khi ứng dụng không nhận được phản hồi từ cổng thanh toán.'], prompt: 'Bạn nên mở đầu thiết kế ra sao?',
    options: [
      option('a', 'Nêu rule “một order chỉ được xác nhận một lần”, chốt nơi giữ trạng thái Order và idempotency key; email xử lý async, payment timeout thì để pending và tra cứu.', 'best', 'Đúng vì bắt đầu từ rule và trạng thái cần bảo vệ, rồi mới chọn cách xử lý nhỏ nhất cho email và payment.'),
      option('b', 'Vẽ Kafka, Redis và nhiều dịch vụ nhỏ trước để chứng minh hệ thống có thể mở rộng.', 'overengineered', 'Tên công nghệ không trả lời ai quyết định trạng thái đơn hoặc xử lý thanh toán chưa rõ. Chưa có dữ kiện về tải hay đội ngũ buộc phải tách.'),
      option('c', 'Gọi cổng thanh toán và gửi email bên trong giao dịch database để mọi thứ cùng được hoàn tác.', 'unsafe', 'Giao dịch database không thể quay ngược việc đã xảy ra ở cổng thanh toán hay hệ thống email. Giữ kết nối database trong lúc gọi mạng còn làm giao dịch kéo dài.'),
      option('d', 'Chỉ mô tả các bảng vì lỗi có thể xử lý sau.', 'incomplete', 'Cấu trúc bảng quan trọng nhưng chưa trả lời màn hình hiển thị gì, yêu cầu gửi lặp ra sao và hệ thống phục hồi thế nào.'),
    ], correctOptionId: 'a',
    explanation: { decision: 'Bắt đầu từ luồng người dùng, business invariant và data ownership; sau đó mới thêm component.', mechanism: 'Unique constraint và idempotency key bảo vệ Order. Email được đưa sang worker; payment timeout cần trạng thái pending và bước đối soát.', tradeOff: 'Có thêm trạng thái và quy trình vận hành, đổi lại không hứa một global rollback vốn không tồn tại.', failureMode: 'Chọn công nghệ trước dễ bỏ quên order trùng, unknown outcome của payment và trạng thái cần hiển thị trên UI.', evidence: 'Test request trùng và timeout; theo dõi order pending quá lâu, tuổi Outbox record và giao dịch payment bị lệch.' }, recall: ['System design: luồng → rule → nơi sở hữu dữ liệu → lỗi → công nghệ.'], followUp: { changedConstraint: 'Email bắt buộc hoàn tất trước response.', prompt: 'Bạn cần hỏi lại điều gì?', expectedDirection: 'Làm rõ lý do nghiệp vụ, SLO và màn hình sẽ hiển thị gì khi email provider lỗi; chưa cần đổi công nghệ ngay.' }, tags: ['system-design', 'order']
  },
]

export const quizQuestions: QuizQuestion[] = drafts.map(question => ({
  ...question,
  topic: topicByDoc[question.relatedDoc],
  explanation: question.explanation.decision,
  productionConsequence: question.explanation.failureMode,
  explanationDetail: question.explanation,
}))

export const quizzes = quizQuestions
