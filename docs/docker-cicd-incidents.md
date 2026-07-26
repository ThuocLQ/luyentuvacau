# Docker, CI/CD & Production Incidents

## Quick Summary

Một deploy làm p99 tăng và lỗi 5xx vì image mới dùng cột database mà pod cũ chưa biết. Vấn đề không nằm ở Docker; vấn đề là code, schema và cấu hình đổi không cùng nhịp. Build một artifact, triển khai theo bước tương thích và quan sát trước khi mở rộng traffic.

## Terms to Know

- [[Schema evolution]]: đổi cấu trúc dữ liệu nhưng bản cũ và mới vẫn chạy được một thời gian.
- [[Feature flag]]: công tắc bật/tắt hành vi mới mà không phải deploy lại.
- [[Blast radius]]: phạm vi người dùng bị ảnh hưởng khi thay đổi lỗi.
- **Pod**: một bản sao ứng dụng đang chạy trong Kubernetes; lúc rolling deploy có thể có pod cũ và pod mới cùng tồn tại.
- **Readiness**: kiểm tra xem bản app đã sẵn sàng nhận traffic hay chưa, không phải kiểm tra mọi hệ thống xa đều hoàn hảo.

::: must-remember
Với database, dùng **expand → migrate → contract**: thêm phần mới tương thích, chuyển dữ liệu có kiểm soát, rồi chỉ xóa phần cũ khi không còn code nào dùng.
:::

## Khi nào gặp

Gặp khi image chạy local nhưng fail ở production, migration khiến rollback hỏng, hoặc deploy vừa xong thì latency tăng. Câu trả lời cần nói được: đang chạy bản nào, người dùng bị ảnh hưởng thế nào và đường thoát an toàn là gì.

## Mental model

**Artifact bất biến** là image đã build xong và được định danh bằng commit SHA hoặc digest. Staging và production dùng đúng artifact đó; secret và URL môi trường chỉ được truyền lúc chạy. Nhờ vậy có thể so sánh hoặc rollback chính xác.

Một lần deploy có nhiều phần phụ thuộc: app, schema, event và cache. Nếu app cũ còn chạy, bản mới phải đọc/ghi được dữ liệu cũ; nếu không, rolling deploy sẽ tạo lỗi ngẫu nhiên theo pod.

## CI/CD và compatibility

Pipeline nên bắt lỗi theo từng nguyên nhân: build/type check, test, quét dependency/secret, kiểm migration và smoke test. Không thêm gate chỉ để “đủ quy trình”. Mỗi gate phải trả lời: nó chặn lỗi nào?

Migration an toàn thường thêm column hoặc bảng trước; app đọc được cả format cũ/mới; backfill theo batch; quan sát; sau một release mới bỏ field cũ. Không drop/rename cột ngay khi còn pod cũ hoặc consumer cũ.

## Incident response

1. Xác nhận ảnh hưởng: lỗi nào, từ khi nào, tenant/region nào.
2. Giảm tác động: tắt flag, giảm traffic hoặc rollback nếu artifact cũ còn tương thích.
3. Giữ bằng chứng: deploy diff, trace, metric, queue/database saturation. Đừng restart hàng loạt.
4. Cập nhật trạng thái rõ: impact, việc đang làm, mốc cập nhật tiếp theo.
5. Sau khi ổn định, tạo action có owner và hạn; thêm test, alert hoặc runbook để ngăn tái diễn.

## Quyết định và trade-off

| Chọn | Khi phù hợp | Đổi lại |
|---|---|---|
| Rolling deploy | App stateless, tương thích ngược | Cần readiness và schema an toàn |
| Canary | Rủi ro cao, có metric tốt | Phức tạp chia traffic |
| Feature flag | Muốn tách deploy khỏi bật tính năng | Cần owner, ngày hết hạn, fallback |
| Roll-forward | State mới không chạy được với code cũ | Cần hotfix nhỏ và kiểm soát phạm vi |

## Bẫy production

- Dùng `latest`: không biết chính xác image nào đang chạy.
- Cho readiness phụ thuộc mọi dịch vụ xa: một dependency lỗi làm cả app mất traffic dù còn degrade được.
- Đưa secret vào image hoặc log config: rò dữ liệu khi image/log bị lộ.
- Retry deploy vô hạn khi metric xấu: mở rộng outage.

## Câu hỏi phỏng vấn

### Rollback thế nào khi deploy kèm migration?

**Trả lời ngắn:** Chỉ rollback khi code cũ còn đọc/ghi được schema hiện tại. Nếu migration đã đổi ý nghĩa dữ liệu, tắt feature hoặc roll-forward bằng bản sửa tương thích; không ép image cũ chạy trên state mới.

## Tự kiểm

- Tôi có truy từ lỗi về image digest và commit được không?
- App cũ/mới có chạy cùng schema/event trong thời gian rollout không?
- Tôi biết bước giảm impact trước khi tìm root cause không?
