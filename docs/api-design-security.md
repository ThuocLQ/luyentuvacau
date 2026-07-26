# API Design, Validation & Security

## Quick Summary

API tốt có contract rõ, validation ở server và boundary cho retry/side effect. Authentication chỉ xác minh danh tính; authorization phải kiểm tra quyền trên đúng resource và tenant.

> **Nói đơn giản:** API không tin client. Client có thể gửi lại request, gửi dữ liệu thiếu hoặc cố truy cập dữ liệu của người khác. Server phải kiểm tra dữ liệu, quyền và việc request lặp lại có tạo thêm tác dụng phụ hay không.

Nói đơn giản: server không được tin dữ liệu từ client. Server phải kiểm tra dữ liệu có hợp lệ, người gọi là ai, người đó được làm gì, và retry có tạo thêm tác động hay không.

## Terms to Know

- [[Idempotency boundary]]: nơi replay được nhận diện an toàn.
- [[Rate limit]]: bảo vệ capacity theo caller hoặc resource.
- [[Tenant isolation]]: không cho request vượt ranh giới tenant.

::: must-remember
Một POST có side effect không tự an toàn khi client retry. Hãy xác định idempotency key, payload fingerprint và response được lưu ở đâu.
:::

## Khi nào gặp

Áp dụng khi thiết kế API tạo giao dịch, thanh toán, thay đổi trạng thái, public API cho đối tác, hoặc khi cần giải thích vì sao một request retry không được tạo dữ liệu trùng. Ở cấp Senior, câu trả lời phải nối contract HTTP với authorization, invariant dữ liệu, audit và vận hành.

## Mental model

Contract (cam kết giữa API và client) cần nói rõ dữ liệu nào hợp lệ, lỗi nào trả về và client có thể retry hay không. Validation là kiểm tra dữ liệu đầu vào; authorization là kiểm tra người dùng này có quyền làm hành động đó trên đúng resource hay không.

API là boundary không tin cậy: client có thể gửi dữ liệu sai, gửi lại request, gọi vượt quyền, hoặc bị timeout sau khi server đã hoàn tất. Validation kiểm tra dữ liệu đầu vào có hợp lệ về hình thức; authorization quyết định principal hiện tại được làm hành động nào trên resource nào; business invariant xác định trạng thái có được phép chuyển hay không.

**Validation** kiểm tra dữ liệu như thiếu trường, sai định dạng hoặc vượt giới hạn. **Authorization** kiểm tra quyền của người đã đăng nhập. **Business invariant (bất biến nghiệp vụ)** là quy tắc luôn phải đúng, ví dụ đơn đã hủy không được thanh toán lại.

Không lớp nào thay thế lớp khác. JWT hợp lệ không có nghĩa người dùng được sửa order của tenant khác. Unique constraint không tự trả lại cùng response cho retry HTTP. Response `200` cũng không tự chứng minh side effect ở hệ thống khác đã hoàn tất.

## Câu trả lời 60 giây

“Tôi bắt đầu bằng contract: resource, command, status code và lỗi có cấu trúc. Ở boundary, tôi validate shape và giới hạn input; sau đó authenticate, authorize theo action và resource/tenant, rồi kiểm invariant trong transaction. Với command có side effect, tôi dùng idempotency key theo caller và operation, lưu fingerprint request, trạng thái xử lý và response cuối cùng cùng transaction với business effect. Retry cùng key trả lại kết quả đã ghi; cùng key nhưng payload khác trả lỗi conflict. Tôi không đưa thông tin nhạy cảm vào lỗi/log, và dùng audit/tracing để điều tra quyết định authorization.”

## Must remember

- `401 Unauthorized` nghĩa là chưa xác thực/credential không hợp lệ; `403 Forbidden` nghĩa đã xác thực nhưng không có quyền.
- `400` phù hợp request sai cú pháp/shape; `422` có thể dùng cho validation nghiệp vụ theo convention nhất quán; `409 Conflict` cho xung đột state hoặc idempotency key dùng với payload khác.
- Model validation không đủ cho invariant cần query database, ví dụ quota tenant, trạng thái order, hoặc uniqueness theo business key.
- Authorization phải kiểm tenant/resource ownership ở server; không tin `tenantId`, role hoặc price do client gửi.
- Log correlation ID, subject/tenant (đã giảm nhạy cảm), authorization outcome và reason code; không log token, password, full PII hoặc secret.

## Idempotency cho command có side effect

Idempotency key cần được scope theo caller hoặc tenant, operation/route và thời gian sống phù hợp. Bản ghi thường có: key, request fingerprint, trạng thái `InProgress`/`Completed`, response status/body đã được lọc, thời điểm hết hạn và correlation ID. Lưu bản ghi này trong cùng transaction với business state hoặc dùng một cơ chế atomically equivalent.

Luồng an toàn:

1. Client gửi key ngẫu nhiên cùng command.
2. Server atomically claim hoặc đọc bản ghi key.
3. Nếu completed và fingerprint giống nhau, trả response đã ghi; nếu khác, trả `409`.
4. Nếu owner của key thực hiện command thành công, persist business effect và completed response rồi commit.
5. Nếu process chết, request sau cần biết state là pending/retryable hay đã effect; không đơn giản chạy lại external side effect.

Idempotency HTTP không thay thế deduplication ở consumer message hoặc idempotency với payment provider. Mỗi boundary cần khóa/identity riêng.

## Authorization theo resource và tenant

Kiểm role thô như `CanApprovePayment` có thể là bước đầu, nhưng thường thiếu ownership và phạm vi dữ liệu. Load resource qua query đã filter tenant, hoặc dùng authorization handler nhận resource thật; sau đó kiểm policy, owner, state và separation of duties. Với endpoint list/search, áp tenant filter ở query layer, không lọc sau khi đã đọc dữ liệu.

Thiết kế permission nhỏ và có tên theo capability, ví dụ `orders:cancel`, thay vì chỉ dựa vào role lớn như `Admin`. Quyết định policy cần có audit khi thao tác nhạy cảm, và token claims phải có expiry/audience/issuer được validate.

## Quyết định và trade-off

| Quyết định | Giá trị | Rủi ro cần kiểm soát |
|---|---|---|
| PUT idempotent theo resource URI | Contract đơn giản khi client sở hữu identifier | Cần định nghĩa rõ replace/merge và concurrency |
| POST + idempotency key | Tạo command/server-generated ID, retry qua network | Cần storage, TTL, fingerprint và replay response |
| Optimistic concurrency (ETag/version) | Tránh ghi đè im lặng | Client phải xử lý `409`/precondition failed |
| Policy/resource authorization | Bảo vệ tenant và ownership | Cần test matrix quyền và query filter |
| Rate limit/WAF | Giảm abuse | Không thay authorization hay validation |

## Bẫy production

- Chỉ check role ở controller nhưng query resource không filter tenant: IDOR, lộ dữ liệu qua ID đoán được.
- Idempotency key chỉ cache in-memory: deploy/restart hoặc nhiều instance tạo transaction trùng.
- Tái sử dụng key với payload khác mà vẫn trả response cũ: che lỗi client và có thể sai business effect.
- Retry toàn bộ command chứa gọi payment/email trong transaction: tạo charge hoặc email trùng.
- Trả exception detail/stack trace cho client hoặc log toàn bộ request header: rò secret.
- Dùng `GET` cho action thay đổi state hoặc `DELETE` xóa audit history thay vì transition/soft state theo yêu cầu domain.

## Ví dụ

```csharp
// Pseudocode: persistence must be transactional with the order effect.
var fingerprint = RequestFingerprint.Create(command);
var existing = await idempotencyStore.FindAsync(user.Id, "orders:create", key, ct);

if (existing is { Status: Completed } && existing.Fingerprint == fingerprint)
    return Results.Json(existing.Response, statusCode: existing.StatusCode);
if (existing is not null && existing.Fingerprint != fingerprint)
    return Results.Conflict(new { code = "idempotency_key_reused" });

await authorization.AuthorizeAsync(user, tenant, "orders:create");
// Validate invariant, write order and idempotency completion in one transaction.
```

Ví dụ không cho phép client quyết định tenant từ body. Tenant đến từ identity hoặc host đã được boundary tin cậy xác định.

## Câu hỏi phỏng vấn

### Idempotency key cần lưu gì?

**Ý chính:** Caller/tenant scope, operation, key, fingerprint payload, lifecycle, response cuối, expiry và correlation/audit reference. Nó phải được persist atomically với business effect. Replay giống nhau trả lại kết quả; payload khác bị từ chối.

**Follow-up:** Xử lý request đang `InProgress` thế nào? TTL bao lâu là đủ? Provider payment có idempotency boundary riêng không?

**Red flags:** “Cache header trong memory”; “unique constraint là đủ cho mọi retry”.

### Authentication và authorization khác nhau thế nào?

**Ý chính:** Authentication xác định principal; authorization kiểm liệu principal có quyền action trên resource/tenant cụ thể. Cả hai đều không thay validation và business invariant.

## Tự kiểm

- Tôi có thể phân biệt validation, authorization và invariant bằng một ví dụ cancel order không?
- Tôi có thể mô tả replay an toàn khi client timeout sau khi server commit không?
- Tôi có thể chứng minh list endpoint không rò tenant khác bằng query và test không?
- Tôi có thể chọn status code và error code nhất quán cho conflict, validation, authentication, authorization không?
