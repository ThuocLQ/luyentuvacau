# Docker, CI/CD và Safe Deployment

## Quick Summary

- Một release tốt không chỉ build được; nó còn phải chạy an toàn khi pod (một bản app đang chạy) cũ và mới cùng tồn tại.
- Image nên có version cố định để biết chính xác đang chạy gì và có thể quay lại bản đã biết.
- Đổi schema theo nhịp mở rộng → chuyển dữ liệu → dọn phần cũ, không đổi phá huỷ trong cùng lần deploy.
- Rollback là một lựa chọn kỹ thuật có điều kiện, không phải nút bấm luôn an toàn.

## Release Scenario

Team đổi tên cột `customer_name` thành `display_name`. Trong rolling deploy, một số pod cũ vẫn đọc cột cũ trong khi pod mới đã chạy. Nếu migration xoá cột cũ ngay, lỗi chỉ xảy ra ngẫu nhiên tuỳ request vào pod nào.

Thay vì rename trực tiếp, thêm cột mới trước. Code trong giai đoạn chuyển tiếp đọc được cả hai, ghi theo kế hoạch rõ ràng. Backfill dữ liệu xong và không còn pod cũ thì mới bỏ cột cũ ở release sau.

## Mental Model: artifact, schema và traffic

**Artifact** là gói code đã build, ví dụ Docker image. Artifact bất biến nghĩa là tag đó luôn chỉ một nội dung; `latest` thay đổi theo thời gian nên không cho biết rollback sẽ chạy code nào.

Schema database là hợp đồng giữa code và dữ liệu. Trong lúc deploy từng phần, phải coi code cũ và code mới cùng là client của schema. Migration phá huỷ như drop/rename cột có thể làm client cũ hỏng dù image mới hoàn toàn đúng.

## Terms

- **Rolling deploy**: thay pod cũ bằng pod mới dần dần, vì vậy hai version cùng chạy trong một khoảng thời gian.
- **Backward compatible**: bản mới vẫn hiểu dữ liệu/contract mà bản cũ đang tạo.
- **Backfill**: điền dữ liệu cũ sang field mới theo job có thể theo dõi và chạy lại.
- **Readiness check**: kiểm tra pod đã sẵn sàng nhận traffic hay chưa; khác với việc process còn sống.

## Cách quyết định, từng bước

1. Build một artifact có version từ commit/release, scan dependency và chạy test trước khi publish. Deploy phải chọn đúng version này, không kéo `latest`.
2. Với schema change, liệt kê app version nào sẽ đọc/ghi field nào trong thời gian rollout. Nếu còn version cũ, migration phải tương thích.
3. Làm theo expand → migrate → contract: thêm field/index mới; deploy code đọc/ghi tương thích; backfill/quan sát; chỉ sau đó bỏ field cũ trong release sau.
4. Chạy migration như công việc có owner, log, lock/timeout và khả năng chạy lại. Không để mọi pod cùng cố migrate lúc khởi động.
5. Đưa bản mới qua canary hoặc phần nhỏ traffic, kiểm readiness, error rate, latency và outcome nghiệp vụ theo version.
6. Viết trước điều kiện rollback. Nếu data đã đổi nghĩa hoặc contract cũ không còn đọc được, tắt feature hay roll-forward bằng hotfix tương thích thay vì ép image cũ chạy.

## Deployment Decision Table

| Lựa chọn | Nên dùng khi | Được gì | Đổi lại |
|---|---|---|---|
| Image có tag cố định | mọi production release | biết chính xác code, rollback được | cần quy trình chọn/pin version |
| Rolling deploy | cần giảm downtime | giảm blast radius từng pod | bắt buộc tương thích giữa version |
| Expand-migrate-contract | đổi schema/contract có người dùng thật | giữ app cũ/mới cùng chạy được | mất nhiều release và cần theo dõi backfill |
| Canary | thay đổi có rủi ro | phát hiện sớm trên traffic thật | cần metric theo version và cách tắt nhanh |

## Rollback và Roll-forward

Canary tăng lỗi checkout. Nếu schema vẫn tương thích, dừng canary hoặc rollback image để giảm ảnh hưởng. Giữ version, config và trace để tìm nguyên nhân sau đó.

Nếu migration đã chuyển dữ liệu sang nghĩa mới, rollback image có thể làm app cũ đọc sai. Khi đó feature flag tắt hành vi mới hoặc hotfix tương thích là an toàn hơn. Không có chiến lược nào bỏ qua việc hiểu dữ liệu đang ở trạng thái nào.

## Release Evidence

Test app version cũ và mới với schema đang rollout. Diễn tập deploy rồi rollback trên môi trường gần production; kiểm readiness, migration log và backfill có dừng/chạy lại được không. Trong production, dashboard theo version cho error rate, latency, retry, số pod ready và tiến độ backfill.

## Interview Answer

“Em deploy image đã build với tag cố định, vì phải biết chính xác code nào đang chạy và có thể rollback về bản nào. Với database, em giả định app cũ và mới sẽ cùng chạy một lúc, nên dùng chuỗi expand → migrate data → contract: thêm cột, chuyển dữ liệu rồi chỉ bỏ cột cũ ở release sau. Em cho bản mới nhận một phần nhỏ traffic và so sánh business outcome theo version. Chỉ rollback khi schema và config còn tương thích; nếu dữ liệu đã đổi nghĩa, em tắt feature hoặc roll-forward một bản sửa tương thích.”

## Follow-up

- Vì sao `latest` làm incident khó điều tra hơn?
- Migration nào khiến rollback image trở nên nguy hiểm?

## Self-check

- Có version nào của app còn đọc schema/contract cũ không?
- Nếu deploy dừng giữa backfill, tôi tiếp tục hoặc quay lại ra sao?
- Metric nào nói bản mới làm khách bị ảnh hưởng?

## Final Recall

- Artifact cố định để biết đang chạy gì.
- Deploy từng phần đòi code và schema tương thích.
- Mở rộng trước, chuyển dữ liệu, rồi mới dọn phần cũ.
