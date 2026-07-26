# Modular Monolith, Microservices & DDD

## Bài toán backend thực tế

Một đội muốn tách hệ thống order thành năm microservice vì "dễ scale". Sau khi tách, mỗi thay đổi phải phối hợp nhiều team, dữ liệu vẫn dùng chung một database, một request đi qua bốn HTTP hop và lỗi một service làm toàn bộ checkout thất bại. Kiến trúc đã phân tán deployment nhưng chưa phân tán ownership; đó là distributed monolith.

Mục tiêu kiến trúc không phải nhiều box trên sơ đồ. Mục tiêu là tạo boundary để thay đổi, deploy và xử lý sự cố an toàn với chi phí vận hành tương xứng.

## Mental model

DDD là cách làm rõ ngôn ngữ nghiệp vụ, ownership và invariant. Bounded context sở hữu model, data và rule của một capability; nó không nhất thiết là một microservice. Modular monolith có thể giữ boundary đó trong cùng process và vẫn hưởng local transaction, debug/deploy đơn giản.

Microservice chỉ đáng giá khi có lý do vận hành rõ: ownership độc lập, cadence deploy khác nhau, nhu cầu scale/availability khác nhau, hoặc isolation bắt buộc. Đổi lại là network latency, partial failure, versioning, eventual consistency và on-call cost.

## Invariants phải giữ

- Boundary theo business capability và owner chịu trách nhiệm, không theo controller/service/repository layer.
- Mỗi data store có một owner ghi; service khác lấy dữ liệu qua contract/event, không ghi trực tiếp bảng của owner.
- Invariant mạnh nằm trong transaction boundary của owner; không giả định network call có atomicity xuyên service.
- Command yêu cầu thực hiện việc; event mô tả fact đã xảy ra. Cả hai cần schema/versioning và consumer contract.
- Module có API rõ, dependency một chiều và test boundary; không import implementation nội bộ của module khác.

## Cách ra quyết định

| Lựa chọn | Phù hợp khi | Chi phí / điều kiện |
|---|---|---|
| Modular monolith | Team/cadence chung, cần local transaction, boundary chưa ổn định | Phải cưỡng chế module dependency và ownership, không chỉ chia folder |
| Microservices | Owner độc lập, scale/reliability khác biệt đã đo được | Network failure, observability, release coordination, data consistency và on-call tăng |
| CQRS | Read/write model có nhu cầu khác biệt rõ hoặc read rất nặng | Duplicated model, lag eventual consistency, vận hành projection |
| Event-driven | Consumer độc lập, workflow bất đồng bộ, audit/replay hữu ích | Idempotency, ordering scope, schema evolution và dead-letter handling |

## Production traps

- Shared database khiến release không độc lập và bypass invariant của owner.
- Chuỗi synchronous call dài biến một dependency chậm thành outage toàn flow; timeout không thay thế isolation.
- Tách service theo technical layer (`UserService`, `RepositoryService`) tạo chatty network, không phải bounded context.
- "DDD entities" nhiều class nhưng rule vẫn nằm rải rác ở controller là ceremony, không bảo vệ business rule.
- Event không versioned hoặc không có owner biến consumer thành phụ thuộc ngầm, khó migration.

## Kiểm chứng ở production

- Map ownership: ai deploy, ai on-call, ai ghi data, SLO nào và dependency nào cross boundary.
- Đo deploy lead time, change failure rate, synchronous call latency/error, số incident do coupling và nhu cầu scale thật.
- Contract test producer/consumer; theo dõi event lag, DLQ, version adoption và reconciliation mismatch.
- Diễn tập service unavailable: flow nào fail fast, flow nào degrade, trạng thái nào được hiển thị "đang xử lý" thay vì trả kết quả sai.

## Mẫu trả lời 30–45 giây

"Tôi không chọn microservices chỉ vì quy mô code. Tôi bắt đầu từ business capability, data owner và invariant. Nếu team còn chung ownership và cần local transaction, modular monolith với boundary được test thường là lựa chọn tốt hơn. Tôi chỉ extract khi có bằng chứng về deploy/scale/reliability độc lập, đồng thời chấp nhận cost của versioning, observability và eventual consistency."

## Mẫu trả lời Senior 2 phút

"Khi xem xét tách service, tôi lập bản đồ capability, owner, data write path và invariant. Ví dụ order acceptance và risk reservation có invariant tức thời, nên ban đầu tôi giữ chúng trong cùng transaction boundary. Reporting có thể nhận event bất đồng bộ vì lag vài giây chấp nhận được. Nếu module order gây bottleneck hoặc có team vận hành riêng, tôi chuẩn bị seam: public contract, không truy cập bảng nội bộ, outbox event và dashboard cho lag/failure.

Sau đó tôi extract từng boundary có thể đảo ngược, chạy song song hoặc migrate read path trước, đo latency/error/cost và có rollback. Tôi không dùng shared DB để "đỡ migration" vì nó giữ coupling mãi. Quyết định cuối cùng nêu rõ consistency nào synchronous, consistency nào eventual và người dùng thấy gì trong từng trạng thái."

## Câu hỏi follow-up và red flags

### Khi nào không chọn microservices?

**Ý chính:** Khi boundary/owner chưa rõ, independent scale/deploy chưa có bằng chứng, local transaction và tốc độ thay đổi quan trọng hơn, hoặc đội chưa có observability/on-call maturity.

**Follow-up:** Dấu hiệu nào đủ để extract? Làm sao migrate an toàn? Làm sao tránh distributed monolith?

**Red flags:** "Microservices tự động scale tốt hơn", "tách theo technical layer", "dùng chung DB vẫn độc lập".

### Bounded context bảo vệ invariant thế nào?

**Ý chính:** Context sở hữu model, data write và transaction cho rule của mình. Context khác chỉ dùng contract/event; invariant xuyên context phải được thiết kế eventual/compensation rõ ràng.

**Follow-up:** Command khác event thế nào? Schema event thay đổi ra sao?

## Final recall

- Boundary là ownership + data + invariant + vận hành, không phải folder hay network hop.
- Ưu tiên kiến trúc đơn giản nhất đáp ứng constraint hiện tại.
- Distribution thêm failure modes; extract dựa trên evidence và migration reversible.
