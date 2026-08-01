# Thiết kế API và bảo mật: server phải giữ đúng dữ liệu khi client retry hoặc gửi input xấu

## Trong 30 giây

- Validation kiểm dữ liệu; authentication biết ai gọi; authorization kiểm người đó được làm gì với **resource** nào. Ba việc không thay nhau.
- Command có side effect và có thể bị retry cần stable operation identity; đó có thể là idempotency key, resource ID do client tạo hoặc unique business key, không nhất thiết mọi `POST` đều giống nhau.
- Timeout với payment/external write là unknown outcome: hỏi lại hoặc đối soát trước khi gửi lại.
- CORS không phải authentication/authorization. Tenant, ownership, rate limit và secret phải được kiểm ở server.

## Gặp ở đâu ngoài đời?

Khách bấm “Đặt hàng”, mạng timeout rồi app mobile gửi lại. Một user tenant A đổi `orderId` thành ID của tenant B. Một endpoint nhận JSON có field nội bộ mà frontend không hề hiển thị. Nếu server chỉ tin token hợp lệ hoặc chỉ validate model, hệ thống có thể tạo đơn trùng/lộ dữ liệu.

## Hiểu đơn giản trước

API contract nói client gửi gì, nhận outcome nào và được retry ra sao. **Validation** trả lời dữ liệu có đúng format/range không. **Authentication** xác thực caller. **Authorization** kiểm caller có quyền trên order/tenant cụ thể không. **Invariant** (quy tắc không được sai) bảo vệ state: ví dụ một request thanh toán không tạo hai payment attempt.

JWT hợp lệ chỉ chứng minh token qua kiểm tra chữ ký/claim theo cấu hình; nó không chứng minh caller sở hữu order đang xin đọc. Server lấy tenant/caller từ identity đã xác thực, scope query theo đó, rồi authorize trên resource. Không lấy `tenantId`, role hoặc price do client gửi làm nguồn quyết định.

## Terms to Know

- [[Idempotency boundary]]: ranh giới nhận diện duplicate để cùng thao tác chạy lại không tạo effect mới.
- [[Tenant isolation]]: tenant chỉ đọc/sửa state của mình; phải enforced ở server/data boundary.
- **Request fingerprint**: phần canonical của request dùng để phát hiện cùng key nhưng payload khác.
- **Unknown outcome**: timeout/lỗi mạng nhưng downstream có thể đã thực hiện effect.

## Cách quyết định, từng bước

1. Viết contract trước: resource/command, input/output DTO, status/outcome, pagination/sort, lỗi client có thể sửa và retry semantics. Không bind entity nội bộ trực tiếp từ JSON.
2. Validate shape/range/business input ở boundary; invariant quan trọng được đặt gần source of truth bằng transaction/constraint/state transition có điều kiện.
3. Authenticate token theo issuer, audience, signature/algorithm, expiry và key rotation theo identity provider của hệ thống. Không tự parse token rồi tin claim.
4. Authorize theo resource/tenant trên server; query được scope theo tenant/caller trước khi trả dữ liệu. Chọn `404` hay `403` theo policy tránh lộ sự tồn tại resource, và áp dụng nhất quán.
5. Với command retryable không naturally idempotent, lưu operation identity theo caller + operation, fingerprint, trạng thái và outcome bền. Cùng identity/cùng payload trả outcome cũ; cùng identity/payload khác trả conflict.
6. Đặt rate limit/request-size/timeouts theo endpoint và tenant/caller để bảo vệ capacity. Log correlation ID/outcome, không log token, password hay payload nhạy cảm.

## Chọn A hay B?

| Lựa chọn | Dùng khi | Được gì | Đổi lại / không dùng khi |
|---|---|---|---|
| `PUT` với resource ID ổn định | client biết identity và replace semantics phù hợp | retry có identity rõ | vẫn cần authorization, version/concurrency và contract rõ |
| Idempotency key cho command | create/charge/send có thể retry | trả lại outcome cũ, chặn duplicate effect | cần TTL/retention, fingerprint và xử lý request đang chạy |
| Unique business constraint | duplicate có invariant rõ trong một database | guard cuối cùng gần data | không tự dedup external effect/cả workflow |
| Async `202 Accepted` + status | work dài, UI không cần xong ngay | giảm request timeout | UI phải hiểu pending/failed và có status/recovery |

## Nếu có lỗi thì sao?

Payment provider timeout sau khi đã nhận request không đồng nghĩa payment failed. Record operation ở boundary, query/reconcile bằng provider reference nếu có, rồi mới retry operation an toàn. Đừng giữ transaction database mở khi gọi HTTP: lock kéo dài nhưng vẫn không có transaction toàn cục với provider.

CORS chỉ là policy browser cho phép script origin khác đọc response; caller ngoài browser không bị CORS chặn. CSRF, SSRF, mass assignment, token leak và tenant escape là threat khác, cần design/validation/authorization/egress policy riêng theo endpoint. Đừng hứa một middleware giải quyết mọi loại bảo mật.

## Chứng minh mình làm đúng

Integration test: tenant A không đọc/sửa resource B; same idempotency identity replay đúng outcome; same identity/payload khác bị conflict; process crash giữa operation có recovery; token sai issuer/audience bị từ chối. Theo dõi auth failure theo route, duplicate suppression, conflict, unknown outcome age, rate-limit reject và không có sensitive fields trong log sample.

## Nói trong phỏng vấn

“Em tách validation, authentication, authorization và invariant. Token hợp lệ chưa đủ: query và policy đều scope theo tenant/resource ở server. Với command có thể retry và tạo side effect, em chọn stable operation identity, lưu fingerprint và outcome bền; replay cùng payload trả kết quả cũ, payload khác conflict. Timeout với provider là unknown outcome nên em query/reconcile trước retry. Em kiểm bằng integration test cross-tenant, replay/crash và metric duplicate/unknown outcome.”

## Interviewer thường hỏi tiếp

- Idempotency record hết hạn lúc nào? Request đầu còn đang chạy thì request cùng key thứ hai nhận gì?
- Khi nào `404` tốt hơn `403`, và quyết định đó có thể lộ thông tin gì?

## Tự kiểm trước khi qua bài

- Caller, tenant và resource nào là nguồn quyết định ở server?
- Command nào có thể retry; duplicate nào phải bị chặn ở boundary nào?
- Timeout của external write có đường query/reconciliation chưa?

## Nhớ một phút

- Contract và authorization bảo vệ resource; validation không thay authorization.
- Stable identity + outcome bền làm retry an toàn hơn cache memory.
- CORS không bảo vệ API khỏi caller; luôn xét threat cụ thể.
