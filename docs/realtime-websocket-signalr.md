# WebSocket và SignalR: Realtime, Scale-out và Reliability

## Quick Summary

- **WebSocket** là kết nối hai chiều, giữ lâu giữa client và server. **SignalR** là framework .NET đặt Hub, protocol, connection management và fallback transport lên trên nhu cầu realtime thường gặp.
- SignalR phù hợp để push trạng thái gần thời gian thực: dashboard, notification, chat hoặc order status. Nó không phải durable queue, không thay database và không bảo đảm client nhận mọi message.
- Business state phải được persist ở API/worker. Realtime message nên báo “order này đã lên version mới”; client đọc lại source of truth khi cần dữ liệu đầy đủ.
- Hub là boundary giao tiếp, không phải nơi chứa workflow tạo order, ghi database hay gọi payment provider.

## Terms

- [[WebSocket]]: connection hai chiều, thường là transport ưu tiên cho realtime.
- [[SignalR Hub]]: endpoint nơi client và server gọi method của nhau theo protocol SignalR.
- **Group**: nhãn để route message đến một nhóm connection; nó không tự chứng minh người trong group còn quyền xem dữ liệu.
- **Reconnect**: client nối lại sau khi connection mất. Hãy coi đây là một connection mới cần đồng bộ lại state, trừ khi contract của bạn nói rõ khác.
- [[Backplane]]: cơ chế đưa message đến connection đang nằm ở instance khác khi app scale-out.

## Mental Model: notification không phải source of truth

```
Command → database + Outbox → relay/worker → IHubContext
       → SignalR service/backplane → client nhận { orderId, version }
       → client gọi API đọc trạng thái mới nhất nếu cần
```

Order đã `Shipped` phải được commit và có audit trước. SignalR chỉ giúp màn hình biết nên refresh. Nếu tab đang offline hoặc rollout làm connection rớt, tab vẫn có thể gọi `GET /orders/{id}` để lấy trạng thái đúng.

## Chọn đúng công cụ

| Lựa chọn | Hợp khi | Cần nhớ |
|---|---|---|
| Polling | dữ liệu đổi ít, chấp nhận chậm vài giây | đơn giản, dễ cache và retry |
| SSE | server chỉ push một chiều tới browser | client không gửi command trên cùng channel |
| WebSocket thuần | cần protocol riêng hoặc client không dùng SignalR | tự lo reconnect, routing và message contract |
| SignalR | app .NET cần Hub, user/group targeting, nhiều client SDK | không biến Hub thành business service |
| Durable queue/broker | event/job không được mất | không thay bằng SignalR message |

## Practical Example: order status cho nhiều tab

```csharp
builder.Services.AddSignalR(options =>
{
    options.MaximumReceiveMessageSize = 32 * 1024;
    options.MaximumParallelInvocationsPerClient = 1;
});

var app = builder.Build();
app.UseAuthentication();
app.UseAuthorization();
app.MapHub<OrderHub>("/hubs/orders").RequireAuthorization();
```

Các limit là điểm bắt đầu, không phải con số thần kỳ. Payload lớn nên đi qua API/blob storage; Hub chỉ nhận command nhỏ, validate và gọi application service. Đừng mở parallel invocation chỉ để “nhanh hơn” trước khi hiểu state của client/hub method có an toàn khi chạy đồng thời không.

```csharp
public sealed class OrderHub(IOrderAccess access) : Hub
{
    public async Task JoinOrder(string orderId)
    {
        if (!await access.CanViewAsync(Context.User!, orderId, Context.ConnectionAborted))
            throw new HubException("Không có quyền xem order này.");

        await Groups.AddToGroupAsync(Context.ConnectionId, $"order:{orderId}");
    }
}

// Trong handler/worker, không phải Hub:
await hubContext.Clients.Group($"order:{orderId}")
    .SendAsync("OrderStatusChanged", orderId, version, ct);
```

Hub được tạo theo invocation; không giữ state trong property của Hub và không `new OrderHub()` từ code khác. Khi business handler cần push, inject `IHubContext<OrderHub>` hoặc typed hub context. Một user có thể mở nhiều tab nên `Clients.User(userId)` có thể gửi tới nhiều connection.

## Authorization, group và reconnect

Đặt `[Authorize]` hoặc `RequireAuthorization()` trên Hub, nhưng đó mới kiểm người gọi đã đăng nhập. Khi user join group của một order, server vẫn phải kiểm tenant/resource hiện tại rồi mới `AddToGroupAsync`. Group là routing tiện lợi, không phải security boundary vĩnh viễn.

Đừng dùng `ConnectionId` làm user ID hay lưu nó như identity bền. Connection có thể mất khi mạng đổi, app restart hoặc deploy. Client cần subscribe/rejoin từ quyền dữ liệu đã persist, rồi fetch snapshot theo `orderId`/`version`. `withAutomaticReconnect()` cần được bật rõ ràng ở client; nó không xử lý lần `Start` đầu thất bại và không tạo durable delivery guarantee.

Browser dùng token hoặc cookie vẫn cần HTTPS. CORS chỉ cấu hình origin tin cậy cho browser; riêng WebSocket cần kiểm origin đúng cách ở proxy/server. Đừng log query string/token access token của connection.

## Scale-out và tải chậm

Một instance chỉ biết các connection của chính nó. Khi có nhiều pod/instance, broadcast local sẽ làm khách ở instance khác không nhận được message. Chọn một trong các hướng sau:

- Azure SignalR Service: service quản lý client connection; trên Azure đây thường là lựa chọn vận hành đơn giản hơn khi nhiều connection.
- Redis backplane: các instance publish message qua Redis; vẫn phải vận hành Redis và connection capacity.
- Một instance: chỉ phù hợp khi tải/availability cho phép, không phải giải pháp production mặc định.

Với server farm, sticky session vẫn cần trong nhiều cấu hình; Azure SignalR Service loại phần client affinity đó vì client kết nối vào service. Proxy/load balancer cũng phải cho phép WebSocket upgrade và idle timeout phù hợp.

Client chậm là một failure mode: coalesce update (chỉ giữ status/version mới nhất), giới hạn kích thước/tần suất payload và có drop policy cho dữ liệu UI không quan trọng. Không tạo queue outbound vô hạn trong RAM. Nếu một update bắt buộc được xử lý, lưu nó vào durable workflow/broker; realtime chỉ là kênh thông báo.

## Evidence cần theo dõi

- số connection hiện tại, reconnect rate và connection drop theo version/release;
- hub error, thời gian hub method, outbound bytes và số update bị coalesce/drop;
- client fetch snapshot sau reconnect, mismatch version và authorization failure;
- connection/socket saturation ở pod hoặc Azure SignalR, cùng trace ID của flow tạo order.

## Interview Answer

“Em tách durable state với realtime notification. Order status được commit vào database và đi qua Outbox nếu cần; SignalR chỉ push `orderId` và version để màn hình refresh. Hub giữ mỏng, authorize user trước khi join group của resource và dùng `IHubContext` từ handler/worker để broadcast sau khi state đã an toàn. Khi scale-out, message local không đủ nên em chọn Azure SignalR Service hoặc Redis backplane theo môi trường, đồng thời xem sticky session, proxy WebSocket và connection capacity. Reconnect không phải delivery guarantee, nên client luôn có flow resync từ source of truth.”

## Follow-up

- Khi client rớt mạng năm phút rồi quay lại, bạn đồng bộ event nào và theo thứ tự nào?
- Vì sao group không thể thay authorization theo resource?
- Khi nào dùng SignalR, khi nào chỉ dùng polling hoặc message broker?

## Final Recall

- SignalR push notification gần thời gian thực; database/API vẫn là source of truth.
- Hub mỏng, group chỉ để route; authorization kiểm ở lúc join/resource access.
- Reconnect, slow client và scale-out là phần thiết kế, không phải chi tiết để sau.
