# ASP.NET Core: Request Pipeline, DI & Configuration

## Quick Summary

Pipeline là thứ tự các boundary của một request; DI là ownership/lifetime của object trong các boundary đó. Sai thứ tự middleware hoặc để singleton giữ scoped state đều có thể thành lỗi correctness, không chỉ là lỗi cấu hình.

> **Nói đơn giản:** request đi qua nhiều “trạm”. Mỗi trạm chỉ làm đúng việc của mình và phải đứng đúng thứ tự. DI quyết định object nào sống cùng request, object nào sống lâu hơn; nhầm lifetime rất dễ tạo lỗi ngẫu nhiên khi có tải.

Nói đơn giản: request đi qua từng “trạm” theo thứ tự. DI quyết định object nào dùng riêng cho request, object nào dùng chung lâu dài; dùng sai vòng đời dễ tạo lỗi khó tái hiện.

## Terms to Know

- [[Middleware]]: bước xử lý request/response theo thứ tự đăng ký.
- [[Dependency Injection]]: container tạo dependency theo lifetime.
- [[Tenant isolation]]: server bảo đảm tenant chỉ truy cập tài nguyên của họ.

::: must-remember
Authentication phải chạy trước authorization. `DbContext` scoped, không thread-safe và không được singleton giữ trực tiếp.
:::

## Khi nào gặp

Chủ đề này xuất hiện khi API trả sai mã lỗi, xác thực không chạy, URL redirect sai sau khi đặt sau reverse proxy, hoặc một service hoạt động bình thường ở máy local nhưng lỗi ngẫu nhiên khi có tải. Người phỏng vấn muốn biết bạn có nhìn request như một chuỗi các boundary rõ ràng hay chỉ nhớ vài lệnh `Use...`.

## Mental model

Middleware (một bước xử lý request/response) có thể chạy trước endpoint, sau endpoint, hoặc dừng request sớm. Vì vậy không có một thứ tự “cho đẹp”: middleware cần biết người dùng là ai phải đứng sau authentication; middleware cần biết route nào được gọi phải đứng sau routing.

Mỗi HTTP request đi qua một pipeline theo đúng thứ tự đăng ký. Middleware có thể làm việc trước và sau phần kế tiếp, hoặc kết thúc request sớm. Dependency Injection (DI) tạo object theo lifetime; request scope là boundary sở hữu của các dependency scoped như `DbContext`.

**Lifetime (vòng đời)** là thời gian một object được giữ lại: transient tạo mới khi cần, scoped dùng trong một request hoặc scope, singleton sống đến khi ứng dụng dừng. `DbContext` thường là scoped vì nó mang trạng thái của một đơn vị xử lý và không an toàn khi nhiều thread dùng cùng lúc.

Vì vậy, thứ tự middleware và lifetime không phải chi tiết cấu hình. Chúng là một phần của tính đúng đắn. Middleware đọc identity phải chạy sau authentication. Middleware cần endpoint metadata phải chạy sau routing. Service sống lâu không được giữ state thuộc về một request.

## Câu trả lời 60 giây

“Tôi thiết kế pipeline theo boundary của request: trước hết chuẩn hóa thông tin request từ proxy đáng tin cậy, sau đó xử lý exception và HTTPS, routing, authentication, authorization, rồi mới tới endpoint. Thứ tự này quyết định middleware có thấy route metadata và `HttpContext.User` hay không. Với DI, `DbContext` và các service mang ngữ cảnh request là scoped; singleton chỉ phụ thuộc singleton hoặc primitive configuration bất biến. Nếu singleton cần thao tác dữ liệu, tôi inject factory hoặc tạo scope ngay tại operation boundary. Tôi validate cấu hình khi khởi động và quan sát status code, latency, trace để phát hiện sai pipeline ở production.”

## Must remember

- Middleware chạy theo thứ tự đăng ký; code sau `await next()` chạy khi response quay ngược ra.
- `UseRouting` phải có trước middleware cần endpoint metadata. `UseAuthentication` có trước `UseAuthorization`.
- `DbContext` không thread-safe và thường scoped. Không inject nó trực tiếp vào singleton.
- `IOptions<T>` phù hợp singleton/bất biến; `IOptionsSnapshot<T>` scoped theo request; `IOptionsMonitor<T>` dùng khi cần nhận thay đổi cấu hình có kiểm soát.
- Validate option lúc startup bằng `ValidateOnStart()` đối với secret endpoint, giới hạn, hoặc cấu hình sai sẽ gây lỗi toàn hệ thống.

## Proxy, HTTPS và forwarded headers

Khi chạy sau load balancer hoặc ingress, kết nối giữa proxy và app có thể là HTTP dù client dùng HTTPS. Proxy gửi `X-Forwarded-For`, `X-Forwarded-Proto`, `X-Forwarded-Host`; app chỉ được tin các header này nếu request đến từ proxy/network đã khai báo rõ.

Đặt `UseForwardedHeaders()` thật sớm, trước redirect HTTPS, tạo URL tuyệt đối, rate limit theo IP hoặc logging client address. Cấu hình `KnownProxies`/`KnownNetworks`, số lượng forwarder và header được phép. Không tin bừa `X-Forwarded-For`: client có thể tự gửi header để giả IP, bypass allow-list hoặc làm log điều tra sai.

Nếu app sinh callback URL/OAuth redirect, chỉ dùng host được allow-list hoặc cấu hình canonical public URL. Không ghép redirect từ `Host` header không được kiểm soát.

## Quyết định và trade-off

| Quyết định | Dùng khi | Đổi lại |
|---|---|---|
| Middleware tự viết | Cross-cutting concern đơn giản, cần kiểm soát thứ tự | Phải có test thứ tự và không nuốt exception |
| Endpoint filter | Logic gần Minimal API endpoint | Không thay thế auth/exception policy toàn cục |
| Scoped service | State theo request hoặc transaction unit-of-work | Không được giữ sang background thread |
| Singleton + factory | Cache/worker dài hạn cần tạo dependency theo operation | Cần tạo và dispose scope đúng chỗ |
| Forwarded headers allow-list | Có proxy/ingress xác định | Cần cập nhật khi topology thay đổi |

## Bẫy production

::: production-trap
Không tin `X-Forwarded-For` từ mọi request. Chỉ trust header từ proxy/network đã khai báo, nếu không log IP và rate limit có thể bị giả mạo.
:::

- Đặt authorization trước authentication: policy luôn thấy anonymous user hoặc cho kết quả khó hiểu.
- Redirect HTTPS trước forwarded headers: vòng lặp redirect sau ingress TLS termination.
- Đăng ký exception middleware quá muộn: lỗi từ middleware trước đó không được chuẩn hóa thành `ProblemDetails`.
- Singleton giữ `HttpContext`, `DbContext`, hoặc entity tracking: rò dữ liệu request, dùng object đã dispose, race condition.
- Gọi `Task.Run` rồi dùng scoped service của request: request kết thúc và dependency đã dispose trước khi task chạy.
- Dùng `IOptionsMonitor` để đổi connection string/secret tùy tiện giữa operation: khó tái lập lỗi và có thể làm một workflow dùng hai cấu hình.

## Ví dụ

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddOptions<PaymentsOptions>()
    .BindConfiguration("Payments")
    .ValidateDataAnnotations()
    .ValidateOnStart();

builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders = ForwardedHeaders.XForwardedFor |
                               ForwardedHeaders.XForwardedProto;
    options.KnownProxies.Add(IPAddress.Parse("10.0.0.10"));
});

var app = builder.Build();
app.UseForwardedHeaders();
app.UseExceptionHandler();
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
```

Trong thực tế, IP proxy không nên hard-code nếu platform có dải mạng thay đổi; lấy từ hạ tầng đã được quản trị và có kiểm thử cấu hình deploy.

## Câu hỏi phỏng vấn

### Vì sao singleton không được phụ thuộc trực tiếp vào `DbContext` scoped?

**Ý chính:** Singleton sống lâu hơn request scope, còn `DbContext` vừa không thread-safe vừa có thể đã dispose. Inject `IDbContextFactory<TContext>` hoặc tạo scope ở boundary của một operation độc lập, và dispose scope ngay sau operation.

**Follow-up:** Khi nào `IDbContextFactory` hữu ích cho background worker? Làm sao tránh một singleton trở thành service locator?

**Red flags:** “Đổi mọi service thành singleton cho nhanh”; “DbContext tự đồng bộ thread”.

### Vì sao forwarded headers là vấn đề bảo mật?

**Ý chính:** Chúng ảnh hưởng client IP, scheme và host mà app tin tưởng. Nếu tin header từ client bất kỳ, attacker có thể giả IP hoặc tạo redirect/link sai. Chỉ xử lý header từ proxy/network đã xác minh và đặt middleware sớm.

## Tự kiểm

- Tôi có thể vẽ thứ tự pipeline và giải thích middleware nào cần identity/endpoint metadata không?
- Tôi có thể chỉ ra lifetime của từng dependency trong một endpoint và ownership của nó không?
- Tôi có thể mô tả một cấu hình proxy an toàn thay vì chỉ nói “bật forwarded headers” không?
- Tôi có thể nêu metric/trace nào chứng minh pipeline hoặc DI đang gây lỗi production không?
