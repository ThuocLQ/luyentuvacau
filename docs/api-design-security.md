# API Design, Validation & Security

## Quick Summary

Client có thể retry sau timeout, gửi `tenantId` giả hoặc gọi resource của người khác. Server phải validate input, kiểm quyền trên đúng resource và nhận diện request lặp trước khi tạo side effect.

## Terms to Know

- [[Idempotency boundary]]: nơi cùng request chạy lại vẫn cho một kết quả.
- [[Tenant isolation]]: tenant chỉ thấy và sửa dữ liệu của mình.

::: must-remember
POST có side effect cần idempotency key, dấu nhận diện payload và response được lưu bền; cache in-memory không đủ khi restart/scale-out.
:::

## Mental model

Validation kiểm dữ liệu; authentication biết ai gọi; authorization kiểm người đó được làm gì trên resource nào; invariant kiểm trạng thái có hợp lệ không. JWT hợp lệ không thay thế kiểm tenant ownership.

Ví dụ user của tenant A gọi `GET /orders/123` nhưng ID đó thuộc tenant B. Token vẫn hợp lệ, nên chỉ authentication là chưa đủ. Repository/query phải scope theo tenant từ identity, rồi authorization kiểm quyền trên order đã tìm thấy; không tin `tenantId` do client gửi. Kết quả là A nhận `404` hoặc `403` theo policy thay vì dữ liệu của B.

## Idempotency cho command có side effect

Lưu key theo caller/operation, fingerprint payload, trạng thái và response trong cùng transaction với business effect. Cùng key/cùng payload trả kết quả cũ; cùng key/payload khác trả conflict. Timeout với external write cần query/reconcile trước retry.

## Bẫy production

- Query không filter tenant gây lộ dữ liệu.
- Retry payment/email mù tạo duplicate.
- Log token, password hoặc request header.

## Final recall

- Contract nêu rõ lỗi và retry.
- Quyền luôn kiểm ở server theo resource/tenant.
- Mỗi side-effect boundary có identity riêng.
