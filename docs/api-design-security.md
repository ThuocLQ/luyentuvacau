# API Design, Authorization và Idempotency

## Quick Summary

- API phải tự kiểm dữ liệu, danh tính và quyền; giao diện web không phải lớp bảo vệ.
- Request có thể được retry cần `idempotency key` ổn định để không tạo thêm side effect.
- Timeout khi gọi payment hay đối tác không có nghĩa thao tác thất bại. Có thể phía bên kia đã làm xong.
- CORS chỉ là quy tắc của trình duyệt, không phải đăng nhập hay phân quyền cho API.

## Scenario: retry payment và truy cập chéo tenant

Khách bấm thanh toán. Mạng chập chờn nên app mobile không nhận được phản hồi và gửi lại cùng thao tác. Nếu server tạo payment mới mỗi lần nhận request, khách có thể bị charge hai lần.

Một user của công ty A đổi `orderId` trên URL thành ID của công ty B. Frontend không hề có nút để làm việc này, nhưng server vẫn phải chặn vì bất kỳ client nào cũng có thể tự gửi HTTP request.

## Mental Model: bốn boundary khác nhau

**Validation** (kiểm dữ liệu) hỏi: số tiền có đúng định dạng và trong khoảng cho phép không? **Authentication** (xác thực) hỏi: ai đang gọi? **Authorization** (phân quyền) hỏi: người đó có được đọc hoặc sửa order này không? Ba câu hỏi khác nhau; làm tốt câu đầu không thay được hai câu sau.

Với thao tác tạo side effect như charge tiền hoặc tạo order, server cần biết request retry có phải chính thao tác cũ không. **Idempotency** ở đây nghĩa là xử lý lại cùng request vẫn không tạo thêm payment hay order. Nó không có nghĩa mọi `POST` tự nhiên an toàn khi retry.

## Terms

- **Resource**: dữ liệu cụ thể đang được tác động, ví dụ order `123`, không chỉ là route `/orders`.
- [[Tenant isolation]]: dữ liệu của công ty này không được đọc hoặc sửa bởi công ty khác.
- [[Idempotency boundary]]: ranh giới nơi server nhận diện một thao tác cũ để không tạo tác động lần nữa.
- **Unknown outcome**: request bị timeout nhưng app chưa biết hệ thống bên ngoài đã tạo side effect hay chưa.

## Cách quyết định, từng bước

1. Viết rõ API nhận gì, trả gì và client được gửi lại khi nào. Dùng DTO cho input thay vì bind thẳng entity database để client không tự ghi các field nội bộ.
2. Validate format, range và điều kiện của request tại API. Quy tắc dữ liệu không được phép sai khi nhiều request cùng chạy, như “một payment attempt chỉ có một”, cần lớp chặn gần nguồn dữ liệu như unique constraint hoặc cập nhật có điều kiện.
3. Kiểm token theo issuer, audience, chữ ký, hạn dùng và khoá của hệ thống cấp danh tính. Đừng tự đọc JWT rồi tin các claim chưa được xác minh.
4. Lấy tenant và caller từ identity đã xác thực. Ngay trong query, chỉ lấy resource thuộc tenant đó; sau đó mới kiểm policy của resource.
5. Với command có thể retry, persist `idempotency key`, request fingerprint, status và response vào database. Scope của key gồm caller và loại operation. Cùng key nhưng khác payload trả conflict; cùng key và cùng payload thì replay response cũ hoặc trả trạng thái đang xử lý theo contract — không chạy operation lần hai.
6. Đặt giới hạn kích thước request, timeout và rate limit theo endpoint. Log trace ID và outcome, nhưng không log token, mật khẩu hay dữ liệu nhạy cảm.

## Chọn A hay B?

| Lựa chọn | Nên dùng khi | Được gì | Không thay thế cho |
|---|---|---|---|
| `PUT` có resource ID ổn định | client đã có ID và thật sự thay thế resource | retry có identity rõ | kiểm quyền và xử lý update tranh chấp |
| Idempotency key | create, charge hoặc send có thể bị retry | nhận ra thao tác cũ và tránh tạo side effect thứ hai | đối soát side effect ở hệ thống ngoài; policy cho request đang chạy |
| Unique business constraint | luật trùng lặp nằm trong một database | database chặn kể cả nhiều app instance | toàn bộ workflow qua payment/broker |
| `202 Accepted` + status endpoint | việc dài, không cần xong ngay | không giữ request quá lâu | trạng thái pending/fail và recovery hoặc reconciliation flow |

## Code: idempotency record cho `POST /orders`

```csharp
var fingerprint = HashPayload(request);
var claim = await idempotency.TryClaimAsync(
    callerId, "CreateOrder", idempotencyKey, fingerprint, ct);

// TryClaimAsync insert record Pending dưới unique constraint.
// Request thua race load lại record đã có, không được chạy CreateOrder.
if (!claim.IsOwner)
{
    if (claim.Record.Fingerprint != fingerprint)
        return Results.Conflict();
    if (claim.Record.Status == "Completed")
        return Results.Content(claim.Record.ResponseJson,
            "application/json", statusCode: claim.Record.StatusCode);
    return Results.Accepted($"/operations/{claim.Record.Id}");
}

await using var tx = await db.Database.BeginTransactionAsync(ct);
var response = CreateOrder(request, db);
claim.Record.Complete(response);
await db.SaveChangesAsync(ct);
await tx.CommitAsync(ct);
return Results.Ok(response);
```

`TryClaimAsync` là abstraction minh họa: bên trong phải dùng unique constraint trên `(CallerId, Operation, Key)` để chỉ một request tạo được record `Pending`; request thua race bắt unique violation rồi load lại record hiện có. Transaction quanh `CreateOrder` không tự ngăn được race ở bước claim. Ví dụ chỉ bao transaction local. Nếu operation gọi payment provider, truyền idempotency key mà provider hiểu, lưu trạng thái `Pending` khi timeout và query status trước khi retry.

## Nếu có lỗi thì sao?

Payment provider timeout sau khi app gửi request. Không được kết luận là payment failed, cũng không retry ngay. Persist trạng thái `pending`, dùng operation ID hoặc transaction reference để query payment provider; nếu vẫn chưa xác định được thì đưa vào reconciliation flow có owner rõ.

Đừng dùng CORS để “chặn hacker”. CORS chỉ khiến trình duyệt không cho script từ một origin đọc response. App mobile, service khác hoặc công cụ HTTP vẫn gọi API được, nên authentication và authorization luôn phải ở server.

## Test Matrix

Viết integration test để tenant A không đọc/sửa order của tenant B; cùng idempotency key và cùng payload sau khi hoàn tất trả kết quả theo contract; cùng key nhưng payload khác bị conflict; request thứ hai khi request đầu còn chạy không tạo side effect mới. Test crash ở giữa thao tác và test token sai issuer/audience. Theo dõi số request bị từ chối, request trùng bị chặn và các payment pending quá lâu.

## Interview Answer

“Em tách ba việc: validate payload, authentication và authorization trên đúng đơn hàng. Token hợp lệ chưa chứng minh người dùng được xem mọi đơn, nên server chỉ query dữ liệu thuộc tenant và quyền của họ. Với thao tác có thể được retry, em lưu `idempotency key` cùng request fingerprint và kết quả xử lý để không tạo thêm order hoặc payment. Nếu payment request bị timeout, em coi đó là `unknown outcome` rồi tra cứu hoặc đối soát trước khi retry.”

## Follow-up

- Request đầu còn chạy thì request cùng idempotency key thứ hai nên nhận gì?
- Khi nào trả `404` thay vì `403` để không lộ resource tồn tại?

## Self-check

- Server lấy tenant và quyền từ đâu?
- Command nào có thể tạo side effect hai lần khi client retry?
- Khi external call timeout, tôi biết kết quả bằng cách nào?

## Final Recall

- Validation, authentication và authorization là ba việc riêng.
- Retry an toàn cần idempotency key, request fingerprint và response đã persist.
- CORS không phải hàng rào bảo vệ API.
