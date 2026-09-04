# Testing cho Backend .NET: Confidence, Boundary và Release

## Quick Summary

- Test không phải cuộc thi số lượng. Mỗi test cần trả lời: lỗi nào nó chặn, chạy ở đâu và hỏng thì ai xử lý.
- Unit test kiểm logic thuần nhanh. Integration test kiểm database, HTTP pipeline và cấu hình thật. Contract test giữ lời hứa giữa service. Không loại nào thay loại khác.
- Với bug production, ưu tiên thêm test ở boundary đã để lọt bug; đừng chỉ thêm mock để phủ dòng code.
- Test database và broker bằng dependency gần thật khi behavior của chúng quan trọng. Fake chỉ phù hợp khi cần kiểm logic của app, không phải semantics của dependency.

## Terms

- **Unit test**: test một quyết định nhỏ, chạy nhanh, không gọi network/database thật.
- **Integration test**: chạy nhiều thành phần của app cùng nhau, ví dụ HTTP pipeline và database.
- **Contract test**: kiểm payload hoặc hành vi mà producer và consumer đã cam kết.
- **Testcontainer**: container tạm cho database/broker thật trong test, thường khởi động bằng code và bị xóa sau test run.
- **Flaky test**: test lúc pass lúc fail dù code không đổi; nó làm CI mất niềm tin.

## Mental Model: đặt test ở nơi bug có thể lọt qua

Một rule tính phí độc lập có thể unit test. Lỗi tenant A đọc được order tenant B phải đi qua HTTP, identity và query thật nên cần integration test. Event `OrderPlaced` đổi field làm consumer lỗi là contract test. Nếu cả flow đặt hàng chạy qua payment sandbox thì chỉ giữ vài smoke/E2E test, vì chúng chậm và dễ phụ thuộc môi trường.

| Lớp test | Câu hỏi nó trả lời | Nên dùng cho | Không nên kỳ vọng |
|---|---|---|---|
| Unit | Rule này đúng không? | tính giá, state transition, mapping | EF translation, middleware, network |
| Integration | App + dependency có chạy đúng boundary không? | auth, SQL query, transaction, migration | mọi tình huống UI |
| Contract | Hai service còn hiểu nhau không? | API/event schema, error contract | business workflow hoàn chỉnh |
| E2E/smoke | Đường quan trọng có sống không? | login, create order, deploy verification | feedback nhanh cho mọi commit |

## Practical Example: test endpoint tạo order

```csharp
await using var app = new TestAppFactory()
    .WithDatabaseContainer();
var client = app.CreateClient();

var response = await client.PostAsJsonAsync(
    "/orders", new { productId = "p-1", quantity = 2 });

response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
```

Ví dụ chỉ minh họa boundary: test gọi HTTP pipeline thật để biết authentication có đang được bật. Test khác nên dùng token tenant A rồi thử đọc order tenant B; với idempotency, gửi cùng key hai lần và kiểm số side effect trong database. Không cần mock `HttpContext` để chứng minh những behavior đó.

## Test Database, Queue và External API thế nào?

1. Dùng database engine gần production cho query, index, transaction và migration quan trọng. SQLite in-memory có semantics khác SQL Server/PostgreSQL ở nhiều chỗ, nên không chứng minh được concurrency hay SQL translation phức tạp.
2. Mỗi test cần dữ liệu riêng hoặc cleanup chắc chắn. Test không được phụ thuộc thứ tự chạy.
3. Với queue/broker, test handler idempotent theo event ID và test lỗi trước/sau ack. Chỉ dùng broker thật cho những behavior như routing, serialization hay consumer group mà fake không mô phỏng đúng.
4. External payment/email không cần gọi production. Dùng fake server kiểm request contract; staging/sandbox chỉ giữ vài smoke test có quota và cleanup.

## CI và Release Gate

| Gate | Khi chạy | Mục tiêu |
|---|---|---|
| Unit + static checks | mọi pull request | feedback nhanh, chặn rule sai rõ ràng |
| Integration/contract | pull request hoặc pipeline chính | chặn boundary/API/schema hỏng |
| Migration compatibility | trước rollout có schema thay đổi | code cũ và mới cùng chạy được |
| Smoke sau deploy | sau release | xác minh route và dependency quan trọng còn phục vụ |

Không retry một test flaky cho “xanh CI”. Ghi log, seed, version dependency và timing cần thiết để tìm race; nếu môi trường không ổn định, tách nó khỏi gate nhanh và tạo owner sửa rõ ràng.

## Interview Answer

“Em chọn test theo boundary thay vì theo số lượng. Rule nghiệp vụ thuần có unit test nhanh. Những rủi ro như tenant isolation, middleware, generated SQL hay transaction cần integration test với dependency gần thật. API và event công khai cần contract test để service deploy độc lập vẫn hiểu nhau. Em chỉ giữ ít E2E/smoke cho flow quan trọng. Khi production lỗi, em thêm regression test ở đúng boundary đã để lọt lỗi và xử lý flaky test như một bug của pipeline.”

## Follow-up

- Khi nào Testcontainers đáng dùng hơn fake repository?
- Vì sao SQLite in-memory không luôn đại diện cho database production?
- Test nào bắt buộc chạy trước migration destructive hoặc backfill?

## Final Recall

- Test đúng boundary, không chạy theo số lượng.
- Dependency thật cần thiết khi semantics của dependency là điều đang kiểm.
- Contract test giúp service đổi độc lập; smoke test xác minh release thật.
