# ASP.NET Core Pipeline và Dependency Injection

## Quick Summary

- Một request đi qua các **middleware** (những bước xử lý xếp thành hàng). Đặt sai thứ tự thì bước sau có thể thiếu dữ liệu cần dùng.
- DI (cơ chế để ứng dụng tạo và quản lý object phụ thuộc) cần chọn đúng thời gian sống của object. `DbContext` thường chỉ nên sống trong một request hoặc một job.
- Cấu hình production cũng là dữ liệu đầu vào. Cấu hình bắt buộc để app phục vụ cần được phát hiện sớm; cấu hình động còn cần validation, fallback và health signal khi nó được tải lại.
- Header do proxy thêm chỉ đáng tin khi request thật sự đi qua proxy mà ta đã cho phép.

## Scenario: middleware order và scoped service

Khách gửi `POST /orders`. Ứng dụng cần biết URL nào được gọi, người gọi là ai, người đó có quyền tạo order không, rồi mới chạy code tạo order. Nếu kiểm quyền trước khi nhận diện người gọi, request hợp lệ cũng có thể bị từ chối.

Ở một lỗi khác, worker lấy `DbContext` từ request cũ để xử lý tiếp. Request đã kết thúc nên object này đã bị dọn. Worker sẽ lỗi hoặc tệ hơn là dùng dữ liệu theo dõi từ việc khác.

## Mental Model: request đi qua pipeline

Hãy coi pipeline như cổng vào sân bay. Mỗi cổng làm một việc và cổng sau được dùng kết quả của cổng trước. Ví dụ: xử lý lỗi bao quanh toàn bộ chuyến đi; routing chọn endpoint; authentication (xác thực danh tính) tạo thông tin người gọi; authorization (kiểm tra quyền trên việc cụ thể) mới dùng thông tin đó.

DI không quyết định kiến trúc thay bạn. Nó chỉ là nơi tạo object và dọn object khi hết việc. **Lifetime** (thời gian sống) sai sẽ tạo lỗi: object sống lâu giữ object sống ngắn, hoặc nhiều request vô tình dùng chung state.

## Terms

- [[Middleware]]: một bước nhận request, có thể làm việc trước và sau bước kế tiếp.
- **Scoped**: một object dùng trong một scope; với web, scope thường là một request.
- **Singleton**: một object dùng chung cho toàn bộ thời gian ứng dụng chạy. Nó phải không giữ state của từng request và phải an toàn khi nhiều luồng cùng gọi.
- **Forwarded header**: header proxy thêm để báo IP hoặc giao thức gốc. Client có thể tự bịa header này nếu app tin tất cả mọi nơi.

## Pipeline và Lifetime Checklist

1. Viết đường đi của một request quan trọng. Nó cần bắt lỗi ở đâu, cần URL nào, cần identity nào và cần policy nào?
2. Đặt xử lý forwarded headers thật sớm, nhưng chỉ cho các proxy hoặc dải mạng đã cấu hình. Như vậy rate limit và audit mới không tin IP giả.
3. Đặt routing trước các middleware cần metadata của endpoint. Đặt authentication trước authorization vì bước kiểm quyền cần biết người gọi là ai.
4. Dùng scoped cho `DbContext` và các service mang state của request. Không chạy nhiều thao tác song song trên cùng `DbContext`, vì nó không được thiết kế để dùng đồng thời.
5. Worker cần database thì tạo scope mới cho từng job bằng `IServiceScopeFactory`, hoặc tạo context ngắn bằng `IDbContextFactory`. Worker không được giữ service scoped từ request cũ.
6. Bind cấu hình vào Options. Giá trị bắt buộc để app phục vụ thì kiểm tra lúc khởi động; cấu hình có thể đổi lúc chạy thì kiểm tra ở lần tải, giữ fallback hoặc hạ readiness theo policy. Không in secret ra log.

## Code: middleware order và DI registration

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(); // scoped mặc định
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddTransient<IEmailFormatter, EmailFormatter>();
builder.Services.AddSingleton(TimeProvider.System);
builder.Services.AddAuthentication().AddJwtBearer();
builder.Services.AddAuthorization();

var app = builder.Build();
app.UseForwardedHeaders(); // chỉ sau khi cấu hình trusted proxies
app.UseExceptionHandler();
app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("frontend");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
```

`UseAuthentication()` phải đứng trước `UseAuthorization()` vì authorization cần identity đã được tạo. `UseRouting()` có thể bỏ trong nhiều Minimal API app; ví dụ giữ nó để order của các middleware cần endpoint metadata được nhìn rõ. Lifetime trong code chỉ là điểm bắt đầu: singleton không được giữ `DbContext`, `HttpContext` hoặc state của từng request.

## Lifetime Decision Table

| Lựa chọn | Nên dùng khi | Được gì | Cần nhớ |
|---|---|---|---|
| Scoped `DbContext` | xử lý một request hoặc một job | ranh giới dữ liệu và dọn tài nguyên rõ | không chia sẻ cho các task chạy cùng lúc |
| `IDbContextFactory` | worker xử lý nhiều việc độc lập | mỗi việc có context riêng | vẫn phải dispose và vẫn cần transaction đúng chỗ |
| Singleton | cấu hình không đổi, HTTP client hoặc cache đã thread-safe | dùng chung tài nguyên hợp lý | không cầm `DbContext`, `HttpContext` hay state request |
| Validate cấu hình lúc startup | app không thể phục vụ nếu thiếu cấu hình đó | fail sớm, dễ sửa deploy | không áp dụng máy móc cho config động; đừng đưa secret vào lỗi |

## Failure Cases

Giả sử proxy không nằm trong danh sách tin cậy nhưng app vẫn đọc `X-Forwarded-For`. Kẻ gọi trực tiếp có thể giả IP để vượt rate limit hoặc làm audit sai. Cách sửa không phải “tin header cẩn thận hơn”; app phải chỉ nhận header này từ proxy đã biết.

Nếu singleton giữ `DbContext`, lỗi có thể xuất hiện sau khi request đã xong hoặc khi hai request dùng chung tracked entity. Hãy bỏ dependency đó khỏi singleton, tạo scope/context mới tại lúc xử lý và thêm test cho worker.

## Integration Test cần có

Gửi integration test qua pipeline thật: request không token, token hợp lệ nhưng thiếu quyền, request qua proxy được phép và request giả forwarded header. Sau deploy, xem tỉ lệ `401`/`403` theo route, lỗi object đã dispose, readiness và version cấu hình không nhạy cảm.

## Interview Answer

“Em xem request pipeline theo dependency giữa các middleware: forwarded headers chạy sớm khi app ở sau trusted proxy, authentication đứng trước authorization, rồi endpoint mới xử lý business logic. Với DI lifetime, `DbContext` và service mang state của request là scoped; singleton chỉ giữ shared state thread-safe và không được capture scoped dependency. Worker cần database thì tạo scope riêng cho từng job. Cấu hình bắt buộc được validate lúc startup; cấu hình reload lúc runtime cần validation và fallback rõ.”

## Follow-up

- Vì sao không nên để hai task cùng dùng một `DbContext`?
- Khi nào health check nên báo app chưa sẵn sàng nhận traffic?

## Self-check

- Middleware này cần dữ liệu do bước nào tạo ra?
- Object nào của tôi đang sống lâu hơn state mà nó giữ?
- App đang tin IP và giao thức gốc từ ai?

## Final Recall

- Pipeline là thứ tự phụ thuộc, không phải thứ tự cho đẹp.
- Object sống lâu không giữ object sống ngắn.
- Tin cấu hình và forwarded header như dữ liệu đầu vào có thể sai.
