# C# & .NET Backend Core

## 1. async/await

`async` không tự tạo thread mới. Nó giúp thread không bị giữ khi đang chờ I/O.

```csharp
public async Task<Order?> GetOrderAsync(Guid id, CancellationToken cancellationToken)
{
    return await dbContext.Orders
        .AsNoTracking()
        .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
}
```

### Sai lầm thường gặp

- Gọi `.Result` hoặc `.Wait()` trong request pipeline.
- Không truyền `CancellationToken`.
- Dùng `Task.Run` để bọc I/O async.
- Fire-and-forget mà không có hàng đợi hoặc worker quản lý.

## 2. Dependency Injection

DI giúp đảo chiều phụ thuộc, nhưng không có nghĩa là mọi class đều phải có interface.

```csharp
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddSingleton<ISystemClock, SystemClock>();
```

## 3. API contract

API production cần contract ổn định, error format nhất quán và backward compatibility.

```json
{
  "code": "INSUFFICIENT_BUYING_POWER",
  "message": "Buying power is insufficient.",
  "traceId": "00-..."
}
```

## 4. Resilience

Retry chỉ phù hợp với lỗi tạm thời và operation phải idempotent.

## Câu trả lời phỏng vấn 30 giây

Tôi phân biệt lỗi transient và permanent trước khi retry. Tôi thêm timeout, jitter, circuit breaker và idempotency để retry không tạo tác dụng phụ trùng lặp.
