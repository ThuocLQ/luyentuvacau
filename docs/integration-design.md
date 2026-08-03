# REST, gRPC và Event-Driven Integration

## Quick Summary

- Chọn cách giao tiếp từ điều bên gọi cần biết ngay, ai sở hữu dữ liệu và điều gì xảy ra khi bên nhận chậm hoặc lỗi.
- REST là cách thiết kế API, thường dùng HTTP; nó hợp khi client cần gửi yêu cầu và nhận phản hồi rõ ràng. gRPC hợp với service nội bộ đã cùng quy ước dữ liệu và có lợi ích thật từ kiểu dữ liệu hoặc truyền dòng; nó không thay cho phân quyền hay xử lý lỗi.
- Event phù hợp khi bên gửi chỉ cần ghi nhận “đã xảy ra việc này”, không cần bên nhận trả lời ngay.
- Event có thể đến trễ hoặc đến lại. Bên nhận phải tự giữ dữ liệu của mình đúng.

## Integration Scenario

Sau khi khách đặt hàng, màn hình cần biết order có được tạo không. Kho cần giữ hàng, email cần gửi biên nhận và analytics muốn ghi số liệu. Nếu API chờ cả kho, email và analytics trả lời, một lỗi email có thể làm khách không đặt được order.

Order service nên trả kết quả tạo order cho màn hình. Sau đó nó có thể phát event để email và analytics làm việc riêng. Kho thì tùy luật: nếu phải xác nhận còn hàng trước khi nhận order, Order cần gọi kho đồng bộ hoặc thiết kế trạng thái `pending` (đang chờ xác nhận) rõ ràng.

## Mental Model: caller, contract và ownership

REST là một style thiết kế API, thường được triển khai qua HTTP; không phải HTTP API nào cũng tự là REST. Nó hợp với app web/mobile và API công khai khi contract tài nguyên, method và response rõ ràng.

gRPC dùng contract có kiểu dữ liệu chặt hơn. Một RPC dạng unary là một lời gọi request/response; gRPC còn hỗ trợ client streaming, server streaming và hai chiều. Với mọi cuộc gọi trực tiếp, bên gọi vẫn cần quyết định có chờ kết quả ngay không và timeout/cancellation được xử lý ra sao.

Event là thông báo một sự việc đã xảy ra, ví dụ `OrderCreated`. Bên gửi không đợi email hay analytics xong. Đổi lại, bên nhận có thể thấy dữ liệu muộn, nhận trùng hoặc bỏ lỡ nếu hệ thống phát event không bền.

## Terms

- **Synchronous call**: bên gọi chờ phản hồi ngay trong request hiện tại.
- **Event**: bản ghi nói sự việc đã xảy ra; không phải câu lệnh bắt service khác phải làm gì.
- **Contract version**: quy tắc để phiên bản cũ và mới hiểu dữ liệu của nhau trong lúc deploy.
- **CQRS**: tách đường ghi dữ liệu và đường đọc khi hai nhu cầu này thật sự khác nhau; không phải yêu cầu mặc định cho mọi CRUD.

## Protocol Selection Checklist

1. Hỏi người dùng cần biết kết quả nào ngay. Nếu không có kết quả đó thì request có được coi là thành công không?
2. Chọn phần chịu trách nhiệm dữ liệu. Service khác không được sửa trực tiếp database của phần đó chỉ vì đọc nhanh hơn.
3. Dùng REST khi client đa dạng hoặc API cần dễ quan sát/debug. Dùng gRPC khi tất cả caller là nội bộ, tổ chức có cách quản lý proto và lợi ích thật từ streaming/contract có kiểu.
4. Dùng event cho việc độc lập về thời gian, như gửi email hoặc cập nhật read model. Ghi event bền cùng thay đổi local nếu event không được mất.
5. Thiết kế contract theo hướng thêm field mới trước, consumer bỏ qua field chưa biết nếu hợp lệ. Có version, correlation ID và thời hạn hỗ trợ rõ.
6. Test timeout, event trùng, consumer chậm và phiên bản cũ/mới cùng chạy; đây là lỗi chính của integration, không phải chi tiết phụ.

## Contract Decision Table

| Lựa chọn | Nên dùng khi | Được gì | Đổi lại |
|---|---|---|---|
| REST | web/mobile hoặc API nhiều client | contract HTTP quen thuộc, dễ quan sát | nếu request cần kết quả ngay, caller phải xử lý timeout |
| gRPC | service nội bộ kiểm soát được contract | kiểu dữ liệu rõ, hỗ trợ streaming | cần quản lý proto, gateway và observability phù hợp |
| Event | bên gửi không cần kết quả ngay | giảm phụ thuộc thời điểm | dữ liệu trễ, nhận trùng, cần replay/đối soát |
| CQRS | đọc và ghi có mô hình/tải khác rõ rệt | tối ưu mỗi đường theo nhu cầu | thêm đồng bộ dữ liệu và độ phức tạp |

## Failure Matrix

Consumer email bị hỏng không được làm Order rollback nếu email là việc sau đó. Giữ event, retry có giới hạn và đưa event lỗi vào hàng đợi riêng. Khi email hoạt động lại, consumer xử lý tiếp bằng event ID để không gửi trùng.

Ngược lại, nếu kho phải chặn bán vượt tồn, đừng phát event rồi trả “đã đặt thành công” khi chưa có quy tắc cho trạng thái chờ. Hoặc gọi kho để lấy quyết định trước, hoặc trả `pending` và nói rõ khi nào order được xác nhận.

## Contract Tests và Signals

Contract test giữa producer và consumer, test event trùng/đến muộn, test timeout của call trực tiếp. Theo dõi thời gian phản hồi của call, độ trễ event, số message lỗi, version đang dùng và số order kẹt ở `pending`.

## Interview Answer

“Em không chọn REST, gRPC hay event chỉ vì công nghệ đó mới. Em hỏi caller cần kết quả nào ngay và `data ownership` nằm ở đâu. REST hoặc gRPC phù hợp khi caller cần response trong request hiện tại; event phù hợp với việc có thể hoàn thành sau. Khi dùng event, em chuẩn bị cho eventual consistency, duplicate delivery và contract versioning. Nếu quyết định như giữ tồn kho phải có ngay, em gọi đồng bộ hoặc hiển thị trạng thái pending rõ ràng cho người dùng.”

## Follow-up

- Khi nào event là lựa chọn sai dù hệ thống có broker?
- Vì sao gRPC không tự làm service nhanh hoặc an toàn hơn?

## Self-check

- Caller cần câu trả lời nào ngay để tiếp tục?
- Ai là owner của dữ liệu đang thay đổi?
- Nếu bên nhận event chậm hoặc nhận trùng, kết quả có còn đúng không?

## Final Recall

- Call trực tiếp để lấy quyết định ngay; event để báo việc đã xảy ra.
- Contract và lỗi mạng quan trọng hơn tên giao thức.
- Dữ liệu đến sau phải có trạng thái và đường xử lý rõ.
