# Finance / Securities Domain Cheatsheet

## Quick Summary

> **Nói đơn giản:** trong hệ thống tài chính, “đã gửi yêu cầu” chưa chắc là “đã khớp” hay “đã thanh toán”. Mỗi bước có trạng thái và bằng chứng riêng; không được xóa hoặc ghi đè lịch sử chỉ để màn hình trông đơn giản.

Domain tài chính ưu tiên correctness, audit và reconciliation hơn trả lời “nhanh ngay”. Tách execution facts, order state và ledger để replay, correction và đối soát không làm mất lịch sử.

## Terms to Know

- [[Idempotency]]: replay execution không tạo effect trùng.
- [[Reconciliation]]: đối chiếu state nội bộ với venue/source có thẩm quyền.
- [[Source of truth]]: nơi quyết định order, execution hoặc ledger state.

::: must-remember
Cancellation chỉ đóng quantity còn lại; không được xóa execution facts đã xảy ra.
:::

## Bài toán backend thực tế

Khách đặt mua 1.000 cổ phiếu, venue khớp 400, khách huỷ phần còn lại và sau đó venue gửi lại message fill 400 vì retry. Nếu hệ thống chỉ có một trường `status` và `filledQuantity`, retry có thể cộng thêm 400 lần nữa; nếu cancel xoá order, không còn audit trail; nếu release buying power toàn bộ, khách có thể đặt vượt hạn mức.

Trong finance, công nghệ phục vụ business invariant. Hãy mô tả lifecycle, source of truth và reconciliation boundary trước khi nói Kafka, lock hay retry.

## Mental model

Hãy tách **ý định** (người dùng muốn đặt lệnh), **sự kiện đã xảy ra** (khớp lệnh, hủy, điều chỉnh) và **sổ cái** (bản ghi tài chính để đối soát). Ba thứ này liên quan nhưng không phải một. Tách chúng ra giúp hệ thống xử lý replay, partial fill và correction mà không mất lịch sử.

Order là instruction của khách; execution là fact từ thị trường; allocation gán execution cho account; settlement là trao đổi cash/securities ở thời điểm sau; ledger ghi movement có thể audit. Các state machine liên quan nhưng không cùng xảy ra trong một transaction hay cùng một thời điểm.

Balance là derived view. Ledger/movement và immutable fact là nguồn giải thích vì sao balance có giá trị hiện tại. Sai sót được sửa bằng correction/reversal entry, không âm thầm overwrite lịch sử.

## Invariants phải giữ

Invariant là quy tắc dữ liệu không được phép sai, ví dụ số lượng đã khớp không thể lớn hơn số lượng mở, hoặc một execution không được ghi hai lần. Đặt các quy tắc này gần nơi ghi dữ liệu nhất bằng constraint, transition có điều kiện hoặc transaction; đừng chỉ dựa vào kiểm tra trong UI.

- Client order ID và execution/venue ID là stable business identifier để deduplicate/replay.
- Cancel chỉ đóng **open quantity**; execution đã xác nhận không bị xoá hoặc đảo ngược bằng việc đổi status order.
- `executed + open + cancelled` phải nhất quán với quantity và lifecycle policy; mọi transition hợp lệ, có timestamp/source/actor.
- Buying power là risk reservation, không đồng nhất với cash balance. Reserve trước risk-increasing order; release/adjust theo execution, cancel và policy rõ.
- Tiền dùng decimal/minor unit cùng currency/rule rounding rõ ràng; không dùng floating point.
- Mọi monetary/position change có audit trail append-only và correlation đến business event.

## Cách ra quyết định

| Khái niệm | Mục đích | Sai lầm thường gặp |
|---|---|---|
| Order | Ý định/ủy quyền giao dịch | Coi accepted là đã executed |
| Execution | Fact fill tại venue | Overwrite history của partial fill |
| Allocation | Phân bổ execution cho account | Gộp allocation với execution rồi không trace được nguồn |
| Ledger | Movement cash/securities audit được | Chỉ lưu mutable balance |
| Settlement | Delivery/payment sau trade | Đồng nhất trade date với settlement date |
| Reconciliation | Phát hiện/sửa disagreement với external record | Đợi EOD rồi im lặng khi thiếu dữ liệu |

## Production traps

- Timeout submit order không đồng nghĩa thất bại: venue có thể đã nhận. Cần queryable outcome theo client order ID, không blind retry.
- Duplicate/late execution message có thể double position/ledger nếu không dedup bằng execution identity và sequence/business rule.
- EOD job bỏ sót account, currency hoặc file rồi vẫn đánh dấu hoàn tất tạo incident vào ngày sau. Cần checkpoint, count/control total và exception workflow.
- Rounding khác nhau ở UI, risk engine và ledger tạo discrepancy nhỏ nhưng tích lũy. Rule phải tập trung và test bằng ví dụ biên.
- Correction overwrite record cũ làm mất audit trail và không giải thích được balance tại thời điểm lịch sử.

## Kiểm chứng ở production

- Monitor order acceptance/rejection, venue acknowledgement lag, duplicate rate, unmatched execution, reservation leakage và settlement fail theo business date.
- Reconcile theo control totals: số lượng execution, notional, cash, positions và record count giữa internal ledger với venue/custodian.
- Có exception queue/workflow với owner; reconciliation mismatch không chỉ là log warning.
- Audit truy vết được từ UI order → execution → allocation → ledger → settlement instruction và ngược lại.
- Test property/invariant: replay cùng execution không đổi ledger; partial fill rồi cancel không release phần đã execute; correction giữ được lịch sử.

## Mẫu trả lời 30–45 giây

"Tôi model order, execution, allocation, settlement và ledger là các state/fact riêng. Invariant quan trọng là không duplicate execution, cancel chỉ ảnh hưởng open quantity, buying power được reserve/release theo policy và mọi balance giải thích được bằng ledger. Retry dựa trên stable business ID và outcome queryable; reconciliation với venue/custodian phát hiện disagreement thay vì tin rằng message luôn đúng một lần."

## Mẫu trả lời Senior 2 phút

"Với partial fill rồi cancel, tôi lưu order quantity và execution facts riêng. Khi khớp 400/1.000, order còn 600 open; cancel chỉ đóng 600. Execution 400 có ID venue ổn định, nên replay cùng ID bị dedup và không tạo ledger/position lần hai. Buying power đã reserve lúc accept sẽ được điều chỉnh cho quantity execute và phần cancel theo rule risk, không release bừa toàn bộ.

Local transaction persist state transition, ledger effect và outbox intent cùng source of truth. Downstream allocation/settlement có thể eventual, nhưng status hiển thị cho user phải nói rõ pending/confirmed. Mỗi ngày và intraday, tôi reconcile control totals với venue/custodian; mismatch vào exception workflow có owner. Nếu có sai, tôi tạo correction entry liên kết với entry gốc thay vì sửa lịch sử. Như vậy retry, late event và audit đều có hành vi xác định."

## Câu hỏi follow-up và red flags

### Làm sao xử lý partial fill, cancel và late replay?

**Ý chính:** Tách execution fact khỏi order state; cancel phần open, dedup replay theo execution identity, allocation/settlement dựa trên executed quantity, ledger không bị ghi hai lần.

**Follow-up:** Khi nào release buying power? Correction entry giữ audit thế nào? Nếu venue gửi event out-of-order thì policy gì?

**Red flags:** "Cancel xoá order", "overwrite fill total", "broker không resend".

### Vì sao ledger append-only quan trọng?

**Ý chính:** Nó cho phép audit, reconstruct balance, correction minh bạch và reconciliation. Balance là projection có thể rebuild, không là bằng chứng duy nhất.

## Final recall

- Modeling lifecycle và invariant trước công nghệ.
- Order khác execution; execution khác allocation; settlement không đồng thời với trade.
- Money cần precision, audit movement và correction rõ ràng.
- Reconciliation là control sản phẩm liên tục, không phải batch phụ sau EOD.
