# Cheatsheet domain tài chính và chứng khoán

## Quick Summary

Một lệnh được gửi chưa chắc đã khớp hay thanh toán. Hệ thống phải giữ lịch sử từng sự kiện và đối soát với venue; không xóa hoặc ghi đè dữ liệu chỉ để trạng thái nhìn đơn giản.

## Terms to Know

- [[Ledger]]: sổ cái lưu thay đổi tài chính có thể kiểm toán.
- [[Reconciliation]]: so sánh dữ liệu nội bộ với venue/bank để tìm và sửa sai lệch.
- [[Idempotency boundary]]: điểm chạy lại không ghi thêm cùng một effect.
- **Venue**: sàn hoặc đối tác nhận lệnh giao dịch.
- **Partial fill**: lệnh chỉ được khớp một phần; phần chưa khớp vẫn còn mở để chờ hoặc hủy.
- **Open quantity**: số lượng của lệnh chưa được khớp hoặc chưa bị hủy.
- **Buying power**: hạn mức tiền còn được phép dùng để đặt lệnh.
- **Unknown outcome**: đã gửi yêu cầu nhưng timeout nên chưa biết đối tác đã thực hiện hay chưa.

## Bài toán backend thực tế

Venue timeout sau khi nhận lệnh. Nếu app retry ngay, khách hàng có thể bị gửi hai lệnh. Vì vậy timeout là trạng thái “chưa biết kết quả”; cần query/reconcile bằng execution identity trước khi tạo lệnh mới.

## Mental model

Tách **ý định** (đặt lệnh), **fact** (khớp/hủy/điều chỉnh đã xảy ra) và **ledger** (bản ghi tài chính). Partial fill chỉ thay đổi số lượng còn mở; cancellation đóng phần còn lại chứ không xóa fact đã khớp.

## Invariants phải giữ

- Một execution identity chỉ ghi một lần.
- Filled quantity không vượt open quantity.
- Mọi correction là record mới có audit, không ghi đè lịch sử.
- Allocation/settlement dựa trên quantity đã khớp, không dựa trên quantity đã hủy.

## Cách ra quyết định

Lưu state transition có điều kiện và unique constraint gần dữ liệu. Event có thể đến trùng/muộn nên consumer dedup theo execution identity. Khi vendor không cho idempotency key, lưu request/reference rồi hỏi lại trạng thái trước retry.

## Production traps

- Coi timeout là failed và gửi lại lệnh.
- Xóa order khi cancel nên mất audit/fact đã khớp.
- Dùng cache stale để quyết định buying power hoặc tồn kho.
- Chạy reconcile bằng script không audit và không có owner.

## Kiểm chứng ở production

Theo dõi unknown outcome, duplicate suppression, lag giữa venue và hệ thống, mismatch reconciliation và tuổi của state pending. Alert cần dẫn tới runbook: query, khóa hành động rủi ro, reconcile và ghi correction.

## Final recall

- Tách intent, fact và ledger.
- Timeout cần đối soát, không retry mù.
- Giữ audit history và invariant gần dữ liệu.
