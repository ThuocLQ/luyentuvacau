# ASP.NET Core pipeline, DI và cấu hình: request đi qua đâu, object sống bao lâu?

## Trong 30 giây

- Middleware chạy theo thứ tự; bước cần route, user hay policy phải đứng sau bước tạo dữ liệu đó.
- `DbContext` thường scoped theo request và không thread-safe; singleton không được giữ nó hoặc state request.
- Cấu hình là input production: bind, validate lúc startup và không log secret.
- Sau proxy, chỉ tin forwarded headers từ proxy/network đã khai báo tin cậy.

## Gặp ở đâu ngoài đời?

`POST /orders` đôi lúc trả `403` dù token hợp lệ; background worker đôi lúc dùng `DbContext` đã dispose. Sau deploy qua reverse proxy, rate limit ghi IP giả vì app tin `X-Forwarded-For` do client tự gửi.

Đây không phải ba lỗi rời rạc: pipeline quyết định request thấy gì, DI quyết định object còn sống tới đâu, và config/proxy quyết định app tin input nào.

## Hiểu đơn giản trước

Middleware là các cổng request đi qua theo thứ tự. Exception handling nên bao phần cần bắt; routing chọn endpoint; authentication tạo identity; authorization đánh giá policy dựa trên identity/endpoint. Một middleware đặt trước dữ liệu nó cần sẽ làm sai hoặc không có tác dụng.

DI lifetime là ownership theo thời gian: transient tạo mỗi lần resolve, scoped sống trong scope (web thường là request), singleton sống đến khi application dừng. Object sống lâu không được giữ object sống ngắn, vì nó có thể dùng state đã dispose hoặc lẫn state giữa request.

## Terms to Know

- [[Middleware]]: bước xử lý request/response, thứ tự là một phần correctness.
- [[Dependency Injection]] (DI): container tạo dependency và quản lý lifetime.
- **Scoped**: một instance trong request/scope; `DbContext` thường là scoped.
- **Forwarded header**: header proxy thêm để nói scheme/IP gốc; client không đáng tin tự gửi nó.

## Cách quyết định, từng bước

1. Vẽ requirement của từng middleware: có cần exception boundary, scheme/IP thật, route metadata, identity hay policy không.
2. Đặt forwarded-header handling sớm và cấu hình known proxies/networks. Đặt exception handler đủ bao request path cần bắt.
3. Với endpoint routing, bảo đảm routing trước middleware cần endpoint metadata; authentication trước authorization; rate limiting/endpoint middleware đặt theo policy của app và test route cụ thể.
4. Đăng ký lifetime từ state/ownership: singleton chỉ giữ immutable/thread-safe state; scoped cho unit-of-work request; transient cho service nhẹ không giữ state.
5. Worker singleton cần DB tạo scope cho từng job qua `IServiceScopeFactory`, hoặc dùng `IDbContextFactory` khi mỗi operation cần context ngắn. Không lưu scoped service để dùng sau request.
6. Bind Options, validate field/range/URL bắt buộc ở startup (ví dụ `ValidateOnStart`), và readiness/health theo khả năng service phục vụ traffic chứ không tùy tiện phụ thuộc mọi service xa.

## Chọn A hay B?

| Lựa chọn | Dùng khi | Được gì | Đổi lại / không dùng khi |
|---|---|---|---|
| Scoped `DbContext` | một unit-of-work request/job | change tracking và transaction boundary rõ | không chạy nhiều operation concurrent trên cùng context |
| `IDbContextFactory` | worker/operation độc lập, cần context ngắn | lifecycle rõ, tạo theo operation | vẫn phải dispose và không thay transaction design |
| Singleton | config immutable, client thread-safe, cache có policy | ít allocation, shared resource | không giữ scoped/request state; phải thread-safe |
| Options validate startup | config bắt buộc cho service chạy | fail sớm, deploy dễ điều tra | không log secret hoặc coi config runtime luôn bất biến |

## Nếu có lỗi thì sao?

Authorization trước authentication có thể đánh policy khi chưa có user. Singleton giữ `DbContext` có thể nổ sau dispose hoặc share tracked entity giữa request. Tin forwarded header từ mọi client cho phép giả IP/scheme, làm sai audit, redirect và rate limit.

Khi có lỗi, structured log cần route, status, trace ID và deployment version, không chứa token/header nhạy cảm. Test pipeline bằng request có/không token, tenant/quyền khác nhau và request đi qua proxy mô phỏng; unit test registration không thay được test thứ tự thật.

## Chứng minh mình làm đúng

Tạo integration test cho thứ tự authn/authz, exception mapping, forwarded headers từ proxy tin cậy và client lạ. Trong production theo dõi 401/403 theo route, startup validation failure, scoped-service disposed error, health/readiness và config version không nhạy cảm. Khi deploy, canary route quan trọng trước khi mở toàn bộ traffic.

## Nói trong phỏng vấn

“Em xem middleware như dependency graph. Routing phải tạo endpoint trước middleware cần metadata; authentication tạo identity trước authorization. Về DI, singleton không giữ `DbContext` scoped vì lifetime và thread safety khác nhau; worker tạo scope/context cho từng job. Config được validate lúc startup, còn forwarded headers chỉ tin từ proxy đã cấu hình. Em xác nhận bằng integration test request thật và metric 401/403, startup/health sau deploy.”

## Interviewer thường hỏi tiếp

- Vì sao `DbContext` không nên dùng concurrent, và khi nào `IDbContextFactory` hợp lý?
- Readiness và liveness khác nhau thế nào trong deployment của bạn?

## Tự kiểm trước khi qua bài

- Middleware của tôi đang cần identity/route trước hay sau bước nào?
- Object nào sống lâu đang giữ state request/scoped?
- App tin forwarded header/config nào, và ai được phép gửi chúng?

## Nhớ một phút

- Pipeline order là correctness, không phải format.
- Lifetime là ownership; singleton cần thread-safe và không giữ scoped state.
- Validate config sớm, tin proxy/header theo allow-list.
