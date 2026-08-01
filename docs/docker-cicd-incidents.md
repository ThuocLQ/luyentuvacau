# Deploy an toàn: code, schema và traffic không đổi cùng một nhịp

## Trong 30 giây

- Một deploy an toàn là đưa đúng artifact đã kiểm tra qua từng môi trường và giới hạn blast radius.
- Bản app cũ/mới thường chạy cùng lúc; schema và event phải tương thích trong giai đoạn đó.
- Database đổi theo expand → migrate → contract, không drop/rename ngay.
- Readiness chỉ kiểm tra app có nhận traffic được; đừng phụ thuộc mọi service xa đều khỏe.
- Rollback chỉ an toàn nếu code cũ vẫn hiểu state/schema hiện tại.

## Gặp ở đâu ngoài đời?

Release mới đổi tên cột `status` thành `state`. Rolling deploy khiến pod mới ghi `state`, pod cũ vẫn đọc `status`; một phần request lỗi ngẫu nhiên. Rollback cũng không cứu được nếu migration đã xóa cột cũ. Lỗi không phải Docker — lỗi là app và dữ liệu đổi không tương thích.

## Hiểu đơn giản trước

**Artifact bất biến** là image được gắn digest/commit cụ thể; staging và production chạy cùng đúng image đó. Config/secret được đưa vào lúc chạy, không nhét vào image. Trong rollout có nhiều version app/consumer cùng tồn tại, nên database/event cần “nói được cả tiếng cũ và tiếng mới” tạm thời.

## Từ cần biết

- [[Schema evolution]] (đổi schema mà bản cũ/mới cùng chạy) — nền của rollback an toàn.
- [[Feature flag]] (bật/tắt behavior không cần deploy lại) — giảm blast radius.
- [[Blast radius]] (phạm vi người dùng bị ảnh hưởng) — lý do dùng canary.
- **Readiness** (app đã sẵn sàng nhận traffic) — không phải health check mọi dependency xa.

## Cách quyết định, từng bước

1. Build một image theo commit/digest; chạy type check, test, scan secret/dependency và test contract liên quan.
2. **Expand:** thêm cột/bảng/field optional, code mới vẫn đọc được dữ liệu cũ.
3. **Migrate:** backfill theo batch có checkpoint, đo lỗi/lag; bật behavior bằng flag hoặc canary nhỏ.
4. **Contract:** chỉ xóa field cũ sau khi không còn app/consumer dùng, đã quan sát qua ít nhất một release ổn định.
5. Nếu metric xấu, chọn tắt flag, rollback hoặc roll-forward dựa trên compatibility, không theo phản xạ.

## Chọn A hay B?

| Chọn | Khi phù hợp | Đổi lại |
|---|---|---|
| Rolling deploy | App stateless, schema tương thích | Có nhiều version cùng chạy |
| Canary | Rủi ro cao, có metric theo version | Cần route traffic/quan sát tốt |
| Feature flag | Muốn tách deploy khỏi bật behavior | Nợ flag, cần owner và expiry |
| Roll-forward | Code cũ không hiểu state mới | Cần hotfix nhanh, phạm vi nhỏ |

## Nếu có lỗi thì sao?

Canary báo 5xx/p99 xấu: dừng mở traffic, giữ version/diff/trace. Nếu artifact cũ tương thích schema thì rollback; nếu migration đã đổi meaning dữ liệu thì tắt feature hoặc release bản tương thích để roll-forward. Không retry deploy vô hạn vì mỗi lần có thể làm outage rộng hơn.

::: production-trap
Tag `latest` khiến bạn không trả lời được pod đang chạy image nào. Không truy được artifact thì cũng không kiểm chứng, rollback hoặc điều tra chính xác.
:::

## Chứng minh mình làm đúng

- Từ incident truy được image digest, commit, config version và migration version.
- Dashboard canary theo p99, error, business outcome và saturation, không chỉ toàn hệ thống.
- Smoke/contract test dùng artifact thật; migration có metric tiến độ và checkpoint.
- Feature flag có owner, expiry, fallback và test đường tắt.

## Nói trong phỏng vấn

“Em build một artifact bất biến rồi promote đúng artifact đó, không build lại theo môi trường. Với database em dùng expand–migrate–contract vì pod cũ và mới có thể chạy cùng lúc. Em canary hoặc flag behavior mới và theo dõi metric theo version. Khi lỗi, em chỉ rollback nếu code cũ còn tương thích state hiện tại; nếu không thì tắt feature hoặc roll-forward bản sửa. Nhờ digest, migration version và trace, em điều tra được đúng change gây ảnh hưởng.”

## Interviewer thường hỏi tiếp

### Rollback deploy kèm migration thế nào?

Chỉ rollback app khi schema mới vẫn tương thích code cũ. Migration phá hủy hoặc đổi nghĩa dữ liệu cần chiến lược expand/flag/roll-forward, không ép app cũ chạy trên state lạ.

### Readiness có nên gọi mọi dependency không?

Không mặc định. Một dependency xa lỗi có thể làm mọi pod mất traffic dù app còn phục vụ phần degrade được. Readiness kiểm tra khả năng phục vụ của chính app theo policy rõ.

## Tự kiểm trước khi qua bài

- Trong rollout nào app cũ và mới có thể chạy song song?
- Có thể truy image digest và migration version từ một alert không?
- Điều kiện nào khiến rollback nguy hiểm hơn roll-forward?

## Nhớ một phút

- Artifact xác định được, schema tương thích, traffic mở dần.
- Expand → migrate → contract.
- Rollback là quyết định compatibility, không phải nút bấm mặc định.
