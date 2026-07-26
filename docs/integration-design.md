# REST, gRPC, CQRS & Event-Driven Design

## Quick Summary

Chọn REST, gRPC hay event theo coupling, latency, ownership và failure mode. Event tách thời gian nhưng đổi lại duplicate, eventual consistency và vận hành backlog.

## Terms to Know

- [[Eventual consistency]]: boundary hội tụ sau độ trễ được chấp nhận.
- [[Data ownership]]: service nào sở hữu state/event.
- [[Schema evolution]]: contract cũ/mới cùng sống được khi rollout.

::: senior-signal
Đừng chọn protocol theo độ “hiện đại”. Hãy nói request cần kết quả ngay hay fact đã commit có thể được xử lý sau.
:::

## Tình huống phỏng vấn

"Một service Order cần kiểm tra tồn kho, tạo payment và thông báo cho nhiều hệ thống. Em dùng REST, gRPC hay event? Có cần CQRS không?"

Không chọn theo độ mới của công nghệ. Bắt đầu bằng câu hỏi: ai sở hữu dữ liệu, người gọi có cần kết quả ngay không, latency/failure budget là bao nhiêu, dữ liệu có được phép thấy trễ không, và ai sẽ vận hành contract này.

## Mental model

Integration là một **contract giữa các boundary**, không chỉ là một HTTP endpoint hay topic. Một contract tốt nêu được ownership, input/output, lỗi, versioning, idempotency, bảo mật và cách quan sát.

Tách command và query khi nhu cầu đọc/ghi, mô hình dữ liệu hoặc khả năng scale của chúng thật sự khác nhau. CQRS không đồng nghĩa phải có event sourcing hay microservices; có thể chỉ là hai code path rõ ràng trong modular monolith.

## Chọn kiểu giao tiếp

| Nhu cầu | Hướng phù hợp | Cái giá phải trả |
|---|---|---|
| Client/public API, tương thích web | REST/HTTP, resource contract rõ | payload lớn hơn, contract phải version và cache đúng |
| Gọi nội bộ cần schema chặt, latency thấp | gRPC | client/tooling/browser support và observability cần chuẩn hóa |
| User phải biết quyết định ngay | synchronous request với timeout budget | coupling về availability và latency |
| Phát fact đã commit, fan-out, xử lý có thể trễ | event bất đồng bộ | duplicate, ordering scope, backlog và eventual consistency |
| Read model rất khác write model | CQRS có chủ đích | thêm projection, lag và vận hành nhất quán |

REST hay gRPC không làm service bớt phụ thuộc nếu caller phải biết quá nhiều internal detail. Event cũng không tự làm hệ thống loose coupling nếu consumer phụ thuộc ngầm vào schema và timing không được quản lý.

## Thiết kế REST có thể vận hành

- Dùng resource và HTTP semantics nhất quán; `POST` cho command tạo mới, `PUT`/`PATCH` chỉ khi semantics được làm rõ.
- Validation phân tầng: request shape ở edge, invariant nghiệp vụ trong use case/domain, constraint ở database. Trả lỗi có code ổn định và correlation ID, không lộ stack trace hay data nhạy cảm.
- Command có tác dụng phụ cần idempotency key. Lưu key, request fingerprint và response theo scope caller; replay cùng payload trả kết quả trước đó, payload khác bị từ chối.
- Phân trang, filter và sort phải có contract: giới hạn page size, sort allowlist, tie-breaker ổn định. Không cho client biến filter thành query tùy ý.
- Version qua evolution tương thích ngược khi có thể: thêm field optional, deprecate có thời hạn. Version URL/header chỉ là cơ chế; communication và migration plan mới bảo vệ client.

## gRPC khi có lý do rõ ràng

gRPC phù hợp nếu hai bên kiểm soát client/server, cần strongly typed schema, streaming hoặc hiệu quả nội bộ đã đo. Proto là contract cần review như API public: field number không tái sử dụng, field mới phải compatible, deadline/cancellation phải propagate và status/error phải map rõ.

Đừng chọn gRPC chỉ vì binary nhỏ hơn nếu bottleneck là database hoặc remote dependency. Đừng bỏ deadline: một call nội bộ không deadline có thể giữ connection và goroutine/thread/resource tới lúc chain bị nghẽn.

## CQRS và event: phân tách đúng chỗ

Command bảo vệ invariant và tạo fact; query tối ưu cho cách đọc. Khi cùng model còn đơn giản, một database/model vẫn là CQRS ở mức code path. Tách read model chỉ khi read traffic, response shape, permission hoặc latency có nhu cầu độc lập đáng kể.

Event nên mô tả fact quá khứ thuộc ownership của producer, ví dụ `OrderConfirmed`, thay vì mệnh lệnh mơ hồ như `ProcessOrder`. State thay đổi và event intent cần outbox; consumer chịu duplicate và eventual consistency. Với workflow user cần phản hồi tức thì, giữ phần quyết định cốt lõi synchronous rồi phát event cho side effect có thể hội tụ.

## Bẫy production

- Chuỗi synchronous A → B → C khiến availability nhân lên và timeout cascade. Đặt deadline theo end-to-end budget, propagate cancellation, giới hạn fan-out và có fallback khi nghiệp vụ cho phép.
- Dùng shared database để "tích hợp nhanh" phá ownership và làm migration nguy hiểm. Nếu chuyển đổi tạm thời, phải có exit plan.
- Event chứa entity snapshot khổng lồ khóa consumer vào internal schema. Publish contract tối thiểu, stable identity/version và có schema-evolution policy.
- Tách CQRS quá sớm tạo projection lag và hai nguồn sự thật. Hiển thị trạng thái pending hoặc read-your-write strategy thay vì giả vờ dữ liệu đã nhất quán ngay.

## Mẫu trả lời Senior

"Em chốt trước ownership và trải nghiệm cần đồng bộ đến đâu. Nếu checkout cần quyết định tồn kho ngay, em gọi dependency có deadline trong latency budget và trả trạng thái rõ. Sau khi order commit, em ghi outbox rồi phát `OrderConfirmed` để notification/analytics xử lý bất đồng bộ. REST phù hợp client-facing contract; gRPC chỉ dùng nội bộ khi schema/streaming/latency thật sự có lợi. CQRS chỉ được tách read model khi query pattern hoặc scale khác write model; em công khai projection lag, version contract và theo dõi error/latency/lag cho từng boundary."

## Câu hỏi ôn phỏng vấn

### Khi nào chọn event thay vì gọi synchronous?

**Trả lời ngắn:** Chọn event cho fact đã commit và công việc có thể thấy trễ, fan-out hoặc cần retry độc lập. Chọn synchronous khi caller cần quyết định ngay trong latency budget. Event không thích hợp để che một dependency mà user bắt buộc phải chờ kết quả.

**Follow-up:** Làm sao client biết một async command đã hoàn thành? Đâu là ordering guarantee của topic bạn dùng?

**Red flags:** "Event luôn scale hơn"; "chuyển hết thành async thì không còn failure".

### CQRS có bắt buộc event sourcing không?

**Trả lời ngắn:** Không. CQRS là tách trách nhiệm read và write; nó có thể chỉ là hai handler/model trong một ứng dụng. Event sourcing là lưu state như chuỗi event, có chi phí version/replay/audit riêng và chỉ nên dùng khi domain thực sự cần.

**Follow-up:** Read model lag ảnh hưởng UX và authorization như thế nào?

**Red flags:** "CQRS nghĩa là phải có hai database và Kafka".

## Final recall

- Chọn contract từ ownership, consistency và latency budget.
- REST/gRPC là transport; deadline, auth, idempotency và evolution mới làm boundary an toàn.
- CQRS tách read/write khi có lý do; event làm việc có thể hội tụ, không thay thế quyết định đồng bộ.
