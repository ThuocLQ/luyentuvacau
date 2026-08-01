# EF Core và truy cập dữ liệu: nhìn SQL thật trước khi tối ưu ORM

## Trong 30 giây

- EF Core tạo SQL; dữ liệu, query shape và execution plan quyết định phần lớn chi phí, không phải tên LINQ method.
- List API thường cần tenant scope → filter → sort ổn định → projection DTO → page → materialize.
- `AsNoTracking()` giảm chi phí theo dõi entity cho read-only, nhưng không cứu query đọc quá nhiều row/join sai.
- `DbContext` là unit-of-work scoped, không thread-safe; concurrency và transaction phải xuất phát từ invariant.

## Gặp ở đâu ngoài đời?

`GET /orders` tăng từ 100 ms lên vài giây khi dữ liệu lớn. Code dùng `Include` nhiều relation, materialize toàn bộ rồi map DTO; một vòng lặp lại đọc thêm navigation. Team thêm index nhưng p99 không đổi vì query vẫn sort/page sai và connection đang chờ lock.

## Hiểu đơn giản trước

**Query shape** là cột nào, filter nào, join nào, sort nào và bao nhiêu dòng endpoint thật sự cần. EF Core chỉ dịch shape đó; database mới quyết định plan đọc/join/sort. Vì vậy cần lấy SQL và actual execution plan với tham số/workload gần thật trước khi kết luận index hay ORM là nguyên nhân.

Tracking giúp EF nhận biết entity thay đổi để `SaveChanges`; nó hữu ích cho read-modify-write trong cùng unit-of-work. Read-only list thường project DTO trực tiếp và no-tracking để tránh giữ graph entity không cần thiết. Hai lựa chọn không thay constraint hoặc concurrency control.

## Terms to Know

- [[Query shape]]: filter, join, sort và cột cần cho response.
- [[Execution plan]]: cách database chọn đọc/join/sort; phụ thuộc provider, statistics và parameter.
- [[N+1 query]]: list query rồi thêm query từng item.
- [[Optimistic concurrency]]: chỉ update khi version còn khớp để phát hiện lost update.

## Cách quyết định, từng bước

1. Chốt symptom: route/input/tenant, rows trả về, p95/p99, DB waits/connection wait và release gần nhất.
2. Lấy SQL thật, số command/request và actual plan với parameter đại diện. Tìm N+1, table scan không mong muốn, join nhân dòng, sort lớn, over-fetching hoặc blocking.
3. Sửa shape: tenant filter sớm, projection chỉ field cần, sort deterministic, keyset/offset pagination phù hợp contract; materialize sau page.
4. Chọn tracking theo intent. Read-only: projection/no-tracking thường rõ. Update: load tối thiểu hoặc conditional update, đặt concurrency token/constraint khi use case cần phát hiện conflict.
5. Thêm/chỉnh index sau khi hiểu filter/order và đo read/write cost. Kiểm timeout/cancellation, transaction boundary và rollout dưới tải gần production.

## Chọn A hay B?

| Lựa chọn | Dùng khi | Được gì | Đổi lại / không dùng khi |
|---|---|---|---|
| Projection DTO + no-tracking | endpoint read-only/list | payload/tracking nhỏ | không có entity graph để sửa rồi `SaveChanges` |
| `Include` có chủ đích | graph nhỏ thật sự cần trong một response | tránh query bổ sung | nhiều collection có thể nhân row; không dùng như mặc định |
| Keyset pagination | bảng lớn, người dùng đi tiếp theo sort key | tránh offset sâu | không nhảy tự do tới trang N; cần sort/key cursor rõ |
| Offset pagination | UI cần page số nhỏ/nhảy trang | contract quen thuộc | offset lớn có thể chậm, dữ liệu thay đổi làm page dịch |
| Concurrency token/conditional update | lost update có ý nghĩa nghiệp vụ | phát hiện conflict | use case phải chọn reload/merge/409, không retry mù |

## Nếu có lỗi thì sao?

`Include` không luôn sai, nhưng include nhiều collection có thể tạo cartesian explosion (join làm lặp dữ liệu), còn lazy loading/vòng lặp có thể tạo N+1. Chọn projection/batch/split query theo SQL và payload đo được, rồi test số command.

Đừng bọc HTTP/email trong transaction database: lock có thể kéo dài mà external call vẫn không rollback cùng DB. `SaveChanges` failure cũng không cho phép retry mù nếu trước đó đã tạo external side effect; retry chỉ bao local unit idempotent và conflict/lost update cần outcome nghiệp vụ rõ.

## Chứng minh mình làm đúng

Integration test SQL/query count cho use case quan trọng, tenant filter, sort/page boundary và concurrency conflict. Quan sát command count, rows/read, database wait, pool wait, p95/p99 và write overhead của index. Khi possible, compare actual plan trước/sau với parameter thật thay vì benchmark local nhỏ.

## Nói trong phỏng vấn

“Em không tối ưu EF bằng cảm giác. Em lấy p99, SQL, command count và actual plan để biết chi phí ở shape, N+1, join hay wait. List API filter tenant, project DTO, sort/page trước materialize; `AsNoTracking` chỉ là tối ưu cho read-only. Khi update có lost-update risk, em dùng token hoặc conditional update và trả conflict theo use case. Index chỉ thêm theo filter/sort đã đo và kiểm write cost sau deploy.”

## Interviewer thường hỏi tiếp

- Khi nào offset pagination không còn phù hợp? Cursor phải mang sort/key nào?
- `rowversion`/concurrency token phát hiện conflict xong, API cho client outcome gì?

## Tự kiểm trước khi qua bài

- Tôi có SQL/plan/parameter thật hay chỉ suy đoán từ LINQ?
- Endpoint có materialize trước filter/page hay có N+1 không?
- Invariant update cần constraint, token hay conditional transition nào?

## Nhớ một phút

- EF không che được query shape xấu; SQL/plan mới là evidence.
- Projection/page thường quan trọng hơn no-tracking hoặc thêm index sớm.
- Transaction/concurrency phải bảo vệ invariant có owner rõ.
