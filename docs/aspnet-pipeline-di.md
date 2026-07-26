# ASP.NET Core: Pipeline, DI & Configuration

## Quick Summary

API có thể xác thực sai hoặc lỗi ngẫu nhiên khi middleware sai thứ tự hay singleton giữ `DbContext` của request. Pipeline là đường request đi qua; DI quyết định object sống bao lâu.

## Terms to Know

- [[Middleware]]: bước xử lý request/response theo thứ tự.
- [[Dependency Injection]]: container tạo dependency theo vòng đời.

::: must-remember
Authentication chạy trước authorization. `DbContext` là scoped, không thread-safe và không được singleton giữ trực tiếp.
:::

## Mental model

Middleware cần user phải đứng sau authentication; middleware cần route/policy phải đứng sau routing. Transient tạo khi dùng, scoped sống trong request, singleton sống đến khi app dừng. Object sống lâu không được giữ state theo request.

Ví dụ request `POST /orders`: routing chọn endpoint, authentication đọc token để tạo user, authorization kiểm policy/resource rồi endpoint mới tạo order. Nếu authorization chạy trước authentication, user chưa tồn tại nên policy cho kết quả sai. Giữ thứ tự theo dependency của bước trước, rồi test endpoint bằng cả request có và không có quyền.

Một background singleton cần ghi database không được giữ `DbContext` từ lúc khởi động. Nó tạo scope cho từng job qua `IServiceScopeFactory`, lấy `DbContext` trong scope, xử lý xong thì scope dispose. Khi chỉ cần tạo context ngắn cho mỗi operation, `IDbContextFactory` cũng phù hợp. Nhờ vậy state không bị dùng lại giữa job hoặc sau khi đã dispose.

Configuration là input của ứng dụng: bind Options, validate giá trị bắt buộc/range ngay lúc startup và fail sớm nếu thiếu secret/URL quan trọng. Sau deploy, kiểm readiness, log version cấu hình không nhạy cảm và trace request để biết config mới có tác động gì.

## Proxy, HTTPS và forwarded headers

Sau reverse proxy, app chỉ tin `X-Forwarded-*` từ IP/network proxy đã khai báo. Nếu tin header do client tự gửi, IP logging/rate limit và redirect có thể bị giả.

## Bẫy production

- Authorization trước authentication.
- Singleton giữ `HttpContext`/`DbContext`.
- `Task.Run` dùng scoped service sau khi request kết thúc.
- Trust forwarded header từ mọi client.

## Final recall

- Thứ tự middleware là correctness.
- Lifetime là ownership.
- Validate config lúc startup và quan sát status/trace sau deploy.
