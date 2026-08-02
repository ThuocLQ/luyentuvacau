# Kiến trúc và DDD: chia hệ thống theo việc cần giữ đúng

## Trong 30 giây

- Bắt đầu từ quy tắc nghiệp vụ và nhóm người cùng thay đổi dữ liệu, không bắt đầu từ tên công nghệ.
- Modular monolith là một ứng dụng nhưng có ranh giới code rõ; nó thường là điểm bắt đầu tốt khi team chưa có lý do vận hành nhiều service.
- Tách service khi ranh giới dữ liệu, tốc độ thay đổi hoặc cách vận hành thật sự khác nhau và team gánh được chi phí mới.
- DDD giúp gọi đúng khái niệm và đặt luật gần dữ liệu sở hữu nó; không bắt buộc phải dùng mọi pattern DDD.

## Gặp ở đâu ngoài đời?

Một sản phẩm có Order, Payment và Email. Team định tách ba microservice vì nghe nói “dễ scale”. Nhưng một nút đặt hàng phải đổi cả order và payment trong cùng màn hình; team chưa có tracing, deploy độc lập hay người trực xử lý message lỗi.

Nếu tách ngay, các lời gọi trong code trở thành gọi mạng, lỗi một phần xuất hiện và việc debug dài hơn. Trong khi đó, một ứng dụng duy nhất có module rõ ràng vẫn có thể giải quyết vấn đề hiện tại.

## Hiểu đơn giản trước

**Modular monolith** là một chương trình deploy cùng nhau, nhưng code được chia theo nghiệp vụ và có ranh giới rõ. Đây là cách tổ chức, không tự chặn truy cập chéo. Team cần quy định module nào được gọi module nào và module nào được sửa dữ liệu nào, rồi kiểm bằng API nội bộ, package, schema và test. Vì cùng một process, một số luồng và transaction trong một database có thể đơn giản hơn; điều đó vẫn phụ thuộc cách dữ liệu được tổ chức.

**Microservice** là một chương trình deploy độc lập, thường sở hữu dữ liệu của mình. Nó chỉ đáng giá khi sự độc lập đó giải quyết một nhu cầu thật: ví dụ Payment có team riêng, nhịp release riêng hoặc tải rất khác Order. Đổi lại, network timeout, dữ liệu trễ, theo dõi và deploy đều khó hơn.

## Từ cần biết

- **Bounded context**: phần nghiệp vụ dùng cùng nghĩa của từ và cùng luật. Ví dụ “Order” trong bán hàng có thể khác “Order” ở kho.
- **Aggregate**: nhóm dữ liệu có một điểm vào để giữ các luật phải đúng cùng nhau. Không phải cứ mỗi bảng là một aggregate.
- **Phần chịu trách nhiệm dữ liệu** (ownership): module nào được thay đổi và bảo vệ dữ liệu đó.
- **Quy ước giao tiếp** (contract): cách hai module thống nhất gọi nhau hoặc gửi event, gồm dữ liệu và phiên bản.

## Cách quyết định, từng bước

1. Viết các luật không được sai và ai sở hữu chúng. Ví dụ Payment sở hữu trạng thái charge; Order không tự sửa payment row.
2. Nhìn lịch sử thay đổi: phần nào thường đổi cùng nhau, phần nào có team, SLA hoặc tải khác hẳn?
3. Đặt ranh giới module trước: API nội bộ, phần chịu trách nhiệm dữ liệu và cách kiểm tra phù hợp; test theo quy ước giao tiếp thay vì chỉ tin vào lời hứa.
4. Giữ modular monolith nếu việc thay đổi cùng nhịp và transaction local giúp giảm rủi ro. Tách service chỉ khi lợi ích độc lập lớn hơn chi phí network, dữ liệu không đồng bộ, observability và on-call.
5. Khi tách, chuyển quyền sửa dữ liệu theo từng bước. Không để hai service cùng ghi một bảng rồi gọi đó là độc lập.
6. Sau mỗi lựa chọn, đo lead time, lỗi deploy, failure giữa service và số việc phải đối soát; kiến trúc phải giải quyết signal thật.

## Chọn A hay B?

| Lựa chọn | Nên dùng khi | Được gì | Đổi lại |
|---|---|---|---|
| Modular monolith | domain còn đang học, thay đổi cùng nhau | ít lỗi mạng, debug và transaction local dễ | phải giữ ranh giới code nghiêm túc |
| Microservice | ownership/team/release/tải thật sự độc lập | deploy và scale từng phần | thêm timeout, contract version, vận hành message và on-call |
| Event giữa module | bên nhận không cần trả lời ngay | giảm phụ thuộc thời điểm | dữ liệu đến trễ, cần xử lý trùng và lỗi |
| Gọi đồng bộ | cần kết quả ngay để quyết định request | flow dễ hiểu | phụ thuộc availability/latency của bên kia |

## Nếu có lỗi thì sao?

Hai service cùng ghi số dư của một account. Khi một service retry hoặc deploy chậm, số dư có thể sai mà không biết ai sửa. Cách sửa là chọn một owner duy nhất, để service còn lại gọi contract hoặc nhận event; không giải quyết bằng thêm cache hay lock xuyên service.

Nếu event không tới hoặc tới hai lần, bên nhận phải có mã event/business key để xử lý lại an toàn và có hàng đợi lỗi để đối soát. Tách service không tự tạo tính đúng dữ liệu.

## Chứng minh mình làm đúng

Review một thay đổi Order-to-Payment: module nào sửa gì, contract nào đổi và có rollback được không. Theo dõi lỗi contract, độ trễ event, công việc đối soát, thời gian khôi phục incident và số lần phải deploy nhiều service cho một thay đổi nhỏ.

## Nói trong phỏng vấn

“Em bắt đầu từ luật nghiệp vụ và phần nào có quyền quyết định từng loại dữ liệu. Nếu các phần vẫn thường xuyên thay đổi cùng nhau, em ưu tiên một ứng dụng được chia thành module rõ ràng để giữ việc gọi và giao dịch đơn giản. Em chỉ tách thành dịch vụ riêng khi đội ngũ, nhịp phát hành, tải hoặc yêu cầu dữ liệu thật sự độc lập, đồng thời chấp nhận chi phí của lỗi mạng và thông báo đến trùng. Khi tách, mỗi loại dữ liệu vẫn chỉ có một nơi quyết định và nội dung trao đổi phải tương thích giữa phiên bản cũ với mới.”

## Interviewer thường hỏi tiếp

- Dấu hiệu nào khiến bạn tách Payment khỏi Order thay vì giữ module nội bộ?
- Hai module cần dữ liệu của nhau nhưng không được dùng chung database thì làm gì?

## Tự kiểm trước khi qua bài

- Luật nào phải đúng cùng nhau và ai giữ luật đó?
- Lợi ích tách service đang giải quyết vấn đề nào có thật?
- Nếu network lỗi giữa hai phần, người dùng thấy trạng thái gì và ai xử lý?

## Nhớ một phút

- Chia theo ownership và luật nghiệp vụ trước.
- Một ứng dụng có module rõ thường tốt hơn nhiều service mơ hồ.
- Service độc lập luôn đi kèm chi phí dữ liệu và vận hành độc lập.
