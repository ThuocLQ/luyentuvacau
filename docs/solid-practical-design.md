# SOLID: Thiết kế code dễ thay đổi trong Backend .NET

## Quick Summary

- SOLID giúp thay đổi một phần code mà không buộc sửa hoặc hiểu hết phần còn lại. Nó không có nghĩa mỗi class phải có interface hay mỗi method phải bị tách nhỏ.
- Bắt đầu từ **reason to change**: rule pricing đổi khác với cách gọi payment provider, cách persist database hay format response.
- Interface có giá trị ở boundary biến động hoặc external dependency thật. Code nội bộ ổn định, chỉ có một cách làm rõ ràng, có thể giữ concrete class.
- DI container chỉ wire object. Có constructor injection không tự chứng minh bạn đã áp dụng Dependency Inversion Principle (DIP) đúng.

## Scenario: CheckoutService ôm mọi việc

`CheckoutService` validate request, tính discount, gọi payment provider, ghi order, publish event và gửi email. Khi thêm payment provider hoặc đổi luật discount, cùng class lại đổi. Unit test phải mock gần như mọi thứ, còn lỗi database/SQL vẫn không được kiểm.

Mục tiêu không phải tách thành mười class. Mục tiêu là tách những phần có nhịp thay đổi, ownership hoặc failure mode khác nhau: pricing policy, payment gateway, persistence và notification sau khi state đã an toàn.

## Mental Model: SOLID là giữ contract có ích

| Principle | Hiểu đơn giản | Dấu hiệu trong code .NET |
|---|---|---|
| SRP | một module chịu trách nhiệm cho một outcome/nhịp thay đổi | service có 9 dependency là tín hiệu phải xem lại, không phải kết luận phải tạo 9 interface |
| OCP | có điểm mở rộng khi biến thể đã thật sự tồn tại | thêm `IDiscountPolicy` khi nhiều rule discount, không dự đoán mọi tương lai |
| LSP | implementation giữ được hành vi caller đã tin | không để implementation hợp lệ ném `NotSupportedException` cho method bắt buộc |
| ISP | consumer chỉ phụ thuộc capability nó dùng | tách read/write hoặc refund capability, không tạo interface một method hàng loạt |
| DIP | business flow biết capability, không biết chi tiết provider | application layer dùng `IPaymentGateway`; adapter Stripe/bank nằm ở infrastructure |

## Practical Example: port ở external boundary

```csharp
public interface IPaymentGateway
{
    Task<PaymentResult> ChargeAsync(PaymentRequest request, CancellationToken ct);
}

public sealed class CheckoutHandler(
    IPaymentGateway payments,
    IOrderRepository orders)
{
    public async Task<PaymentResult> HandleAsync(Order order, CancellationToken ct)
    {
        var result = await payments.ChargeAsync(order.ToPaymentRequest(), ct);
        if (result.IsApproved) await orders.SaveAsync(order.MarkPaid(), ct);
        return result;
    }
}
```

`CheckoutHandler` biết cần charge và lưu order, không biết HTTP endpoint/SDK của Stripe hay bank. `StripePaymentGateway` là adapter ở infrastructure. Đó là DIP có ích vì provider là external boundary có failure mode và có thể thay đổi. Đừng tạo `ICheckoutHandler` chỉ để mock class này nếu chưa có consumer/biến thể thật.

Repository trong ví dụ không nên biến thành `IRepository<T>` trả `IQueryable` khắp app. Port nên phản ánh capability cần thiết, ví dụ `GetForCheckoutAsync` hay `SaveAsync`, để query shape và transaction boundary vẫn thuộc data layer.

## Chọn concrete class hay abstraction?

| Tình huống | Chọn | Lý do |
|---|---|---|
| Helper nội bộ, logic ổn định, một implementation | concrete class hoặc function | ít navigation và ít ceremony |
| Payment, email, object storage, clock | port/interface nhỏ ở application boundary | external behavior đổi/lỗi độc lập; test fake được đúng scope |
| Nhiều pricing/shipping rule thật | strategy/policy | thêm rule không phình `switch` trung tâm |
| `IReadWriteStore` nhưng consumer chỉ đọc | read capability riêng | không ép consumer phụ thuộc operation không dùng |
| Test SQL, EF translation, transaction | integration test | mock repository không chứng minh database chạy đúng |

## Failure Cases thường bị hỏi

**SRP không phải “một class chỉ vài dòng”.** `OrderPricingService` có thể dài nhưng vẫn có một responsibility nếu nó sở hữu quyết định pricing. Một controller ngắn nhưng vừa check quyền, gọi HTTP, map database và publish event vẫn có nhiều reason to change.

**OCP không phải “không được sửa code”.** Khi chỉ có một discount rule, `if` rõ ràng có thể tốt hơn framework strategy. Extract extension point khi variation đã xuất hiện hoặc sắp được thêm với evidence cụ thể.

**LSP là contract hành vi.** Nếu `IBankTransfer.RefundAsync()` ném `NotSupportedException` cho transfer không hoàn tiền được, caller đã nhận một contract sai. Tách capability như `IRefundablePayment` hoặc thiết kế flow khác; đừng che bằng exception runtime.

**DI không phải DIP.** Một service inject concrete `StripeClient`, `DbContext`, `HttpContext` và config khắp nơi vẫn có thể coupling chặt. Composition root được phép biết concrete adapter; business flow không nên biết chi tiết external provider.

## Testing và evidence

Unit test pricing policy hoặc checkout decision với fake `IPaymentGateway`. Integration test vẫn cần cho EF query, transaction, DI wiring và adapter HTTP quan trọng. Khi refactor theo SOLID, đo điều thực tế: số nơi phải sửa khi thêm provider, contract test của gateway, dependency graph của handler và tỉ lệ regression — không chấm chất lượng bằng số interface.

## Interview Answer

“Em dùng SOLID để giữ thay đổi cục bộ, không dùng như checklist tạo class/interface. Em nhìn reason to change và external boundary trước. Checkout flow phụ thuộc `IPaymentGateway` vì provider là capability biến động, còn helper nội bộ ổn định có thể giữ concrete để code dễ đọc. Nếu implementation ném `NotSupportedException` cho method mà interface hứa, em tách capability để giữ contract của caller. DI chỉ là cách wire object; phần business không nên biết SDK/provider cụ thể. Những behavior EF/SQL hoặc transaction thì em vẫn dùng integration test, không mock repository để tự tin giả.”

## Follow-up

- Khi nào 9 dependency của một service là tín hiệu SRP bị vỡ, khi nào vẫn hợp lý?
- Bạn thêm payment provider thứ hai mà không tạo abstraction quá sớm thế nào?
- Vì sao `IQueryable` đi qua repository thường làm boundary yếu đi?

## Final Recall

- SOLID là cách giữ contract và thay đổi cục bộ, không phải công thức tạo interface.
- Abstraction đặt ở boundary biến động có evidence; concrete code đơn giản vẫn tốt.
- DI wiring, unit test và integration test có vai trò khác nhau.
