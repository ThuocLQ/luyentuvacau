# Performance và Scalability

## Quick Summary

- **Hiệu năng** trả lời một request nhanh đến đâu; **khả năng mở rộng** trả lời hệ thống giữ được mức phục vụ khi tải tăng hay không.
- Một request chậm có thể đang đợi database, API ngoài, lock, connection pool (nhóm kết nối dùng chung) hoặc hàng đợi; CPU thấp không có nghĩa là hệ thống còn khỏe.
- Đo theo từng chặng của request rồi sửa chỗ tạo ra phần lớn thời gian chờ.
- p95/p99 (mốc của nhóm request chậm) cho biết trải nghiệm của nhóm request chậm; số trung bình có thể che mất vấn đề.
- Scale-out chỉ giúp khi bottleneck có thể chia đều cho nhiều instance.

## Scenario: CPU thấp nhưng p99 cao

Endpoint `/orders` có thời gian trung bình 180 ms nhưng p99 là 4 giây. CPU chỉ 25%, nên team định tăng số máy. Trace (đường đi của một request) cho thấy phần lớn request nhanh, còn một nhóm phải chờ connection tới database vì pool đã đầy. Thêm máy có thể mở thêm connection và làm database quá tải hơn.

## Mental Model: latency budget và bottleneck

Thời gian của một request là tổng thời gian chạy và thời gian chờ. Máy có thể không bận tính toán nhưng request vẫn xếp hàng vì thiếu một tài nguyên khác.

Hãy chia đường đi thành các đoạn: chờ vào ứng dụng, chạy code, lấy connection, chạy SQL, gọi dịch vụ ngoài và ghi response. Đoạn nào chiếm nhiều thời gian nhất mới là ứng viên cần sửa trước.

Tối ưu là một vòng lặp: đo → nêu giả thuyết → thay đổi một việc → đo lại. Không có số liệu trước và sau thì chưa thể biết thay đổi có giúp thật hay chỉ chuyển nút thắt sang nơi khác.

## Terms

- **Latency** (độ trễ): thời gian hoàn thành một request.
- **Throughput** (thông lượng): số việc hoàn thành trong một khoảng thời gian.
- **Percentile p99**: 99% request nhanh hơn hoặc bằng mốc này; 1% còn lại chậm hơn.
- **SLI**: con số đang đo, ví dụ tỷ lệ checkout thành công hoặc p99. **SLO**: mục tiêu team đặt cho SLI đó, ví dụ p99 checkout dưới 500 ms.
- **Saturation** (bão hòa): một tài nguyên đã gần hết khả năng phục vụ, như connection pool kín.
- **Backpressure** (hãm đầu vào): giảm hoặc từ chối việc mới để hệ thống không bị ngập.

## Cách quyết định, từng bước

1. Chốt điều người dùng đang thấy: endpoint nào, thời gian nào, p95/p99 và tỷ lệ lỗi ra sao.
2. So sánh theo phiên bản deploy, vùng, tenant, loại request hoặc dependency để thu hẹp phạm vi.
3. Dùng trace để tách thời gian ở ứng dụng, database, cache, API ngoài và hàng đợi.
4. Kiểm tra mức bão hòa: CPU, bộ nhớ, thread pool, database connections, queue length và rate limit.
5. Sửa nguyên nhân nhỏ nhất có tác động lớn nhất: query, giới hạn số call một request được bắn cùng lúc, cache dữ liệu phù hợp hoặc tăng capacity đúng tầng.
6. Load test với mẫu request gần production, rồi so sánh cùng bộ chỉ số trước và sau.
7. Đặt giới hạn đầu vào và timeout để khi quá tải hệ thống chậm có kiểm soát thay vì sập dây chuyền.

## Chọn A hay B?

| Phương án | Hợp khi | Không giúp khi |
|---|---|---|
| Tối ưu code/query | Trace chỉ ra một đoạn xử lý chiếm phần lớn thời gian | Nút thắt là giới hạn của dịch vụ ngoài |
| Scale-out ứng dụng | CPU/app worker bão hòa và tải chia đều được | Database hoặc một lock chung đang là bottleneck |
| Cache | Dữ liệu đọc nhiều, chấp nhận cũ trong thời gian rõ ràng | Dữ liệu phải mới tuyệt đối hoặc mỗi request tạo key riêng khiến cache khó trúng |
| Giới hạn đồng thời | Phải bảo vệ database/API ngoài khỏi bị dồn việc | Được đặt quá thấp mà không đo nhu cầu thực tế |

## Overload và Backpressure

Khi một dịch vụ ngoài chậm, request trong ứng dụng tích lại, dùng hết connection hoặc memory rồi kéo theo endpoint khác. Timeout cắt thời gian chờ; giới hạn đồng thời chặn số request đang bay; circuit breaker (tạm ngừng gọi dependency đang liên tục lỗi) giúp app không tiếp tục dồn tải vào chỗ đang hỏng.

Khi hàng đợi tăng liên tục, chỉ tăng consumer mà không kiểm tra database có thể làm nơi ghi cuối cùng nghẽn hơn. Cần so sánh tốc độ việc đi vào và tốc độ hoàn thành, rồi tăng capacity tại đúng chỗ.

## Load Test và Production Signals

- Có biểu đồ request rate, error rate, p50/p95/p99 và saturation cùng một khoảng thời gian.
- Trace cho thấy đoạn chờ chính giảm sau thay đổi.
- Load test giữ nguyên workload và so sánh trước/sau.
- Có ngưỡng cảnh báo sớm cho queue, pool và dependency latency.

## Interview Answer

“Em bắt đầu từ SLO và metric hiện có để biết nhóm người dùng nào bị ảnh hưởng. Sau đó em xem trace để tách latency ở app, database và external dependency. CPU thấp không có nghĩa hệ thống không nghẽn, vì request có thể đang chờ connection pool hoặc lock. Em sửa bottleneck có bằng chứng, đo lại với cùng workload và thêm backpressure để hệ thống vẫn phục vụ có kiểm soát khi tải tăng.”

## Follow-up

### Vì sao p99 tăng mà số trung bình ít đổi?

Vì chỉ một nhóm nhỏ request bị chậm. Ví dụ 99 request mất 100 ms và một request mất 10 giây thì trung bình vẫn có vẻ chấp nhận được, nhưng người rơi vào nhóm chậm có trải nghiệm rất tệ.

### Khi nào scale-out không giúp?

Khi mọi instance cùng chờ một tài nguyên chung như database, lock, partition nóng hoặc API bị giới hạn tốc độ. Thêm instance còn có thể tạo thêm cạnh tranh ở nút thắt đó.

## Self-check

- Request đang chạy hay đang chờ ở đâu?
- Tài nguyên nào đã gần đầy?
- Bạn sẽ dùng số liệu nào để chứng minh thay đổi có hiệu quả?

## Final Recall

- Chậm không đồng nghĩa với thiếu CPU.
- Dùng trace để tìm đoạn request chờ lâu nhất, sửa đúng đoạn đó rồi đo lại.
- Scale-out chỉ giúp khi bottleneck có thể chia đều cho nhiều instance.
