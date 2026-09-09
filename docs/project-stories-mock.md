# Project Stories và Mock Interview

## Story Checklist

- Một project story tốt cho thấy bạn đã nhìn ra vấn đề, ra quyết định và chịu trách nhiệm đến kết quả.
- Dùng số liệu thật hoặc phạm vi cụ thể; không cần phóng đại.
- Nói rõ phần bạn làm và phần của cả team.
- Giải thích cơ chế kỹ thuật vừa đủ để người nghe hiểu vì sao thay đổi có tác dụng.
- Kết thúc bằng điều đã học và cách ngăn vấn đề quay lại.

## Chọn câu chuyện đáng kể

Câu hỏi “Hãy kể một incident khó” thường nhận câu trả lời dài về kiến trúc nhưng không rõ ứng viên làm gì, tác động bao nhiêu và hệ thống tốt hơn ra sao. Người phỏng vấn cần bằng chứng về ownership, không cần một bài giới thiệu dự án.

## Story Skeleton

Dùng khung **Bối cảnh → Trách nhiệm → Quyết định → Kết quả → Bài học**.

Bối cảnh chỉ cần đủ để hiểu vấn đề. Trách nhiệm làm rõ phạm vi bạn sở hữu. Quyết định gồm các lựa chọn đã cân nhắc và vì sao chọn. Kết quả dùng số liệu hoặc hành vi quan sát được. Bài học cho thấy bạn cải thiện hệ thống, quy trình và chính mình.

## Terms

- **Ownership** (tinh thần sở hữu): theo vấn đề đến khi tác động được xử lý và nguyên nhân được ngăn lặp lại.
- **Mitigation** (giảm tác động): hành động nhanh để người dùng bớt bị ảnh hưởng, chưa nhất thiết sửa tận gốc.
- **Root cause** (nguyên nhân gốc đã có bằng chứng): cơ chế thực sự tạo ra sự cố.
- **Contributing factor** (yếu tố góp phần): điều làm sự cố dễ xảy ra hoặc nặng hơn nhưng không phải nguyên nhân duy nhất.
- **Reflection** (tự nhìn lại): điều sẽ làm khác đi nếu gặp lại.

## Worksheet chuẩn bị câu chuyện

1. Chọn 3 câu chuyện: một incident, một quyết định thiết kế và một lần cải thiện teamwork/process.
2. Viết một câu cho tác động: ai bị ảnh hưởng, bao lâu, chức năng nào.
3. Ghi phần bạn trực tiếp quyết định hoặc thực hiện; dùng “team” cho phần làm chung.
4. Chọn 1–2 quyết định quan trọng, nêu phương án khác và lý do không chọn.
5. Mô tả bằng chứng tìm ra nguyên nhân: metric, trace, log, query plan hoặc thử nghiệm.
6. Kết bằng kết quả và thay đổi phòng ngừa: alert, test, giới hạn, runbook hay review rule.
7. Luyện bản 2 phút; chuẩn bị chi tiết để trả lời follow-up, không nhồi hết vào phần mở đầu.

## Chọn mức chi tiết

| Nên nói | Tránh nói |
|---|---|
| “Em phụ trách điều tra database; team platform rollback” | “Em xử lý toàn bộ” khi thực tế nhiều người cùng làm |
| “p99 giảm từ mốc đo thật của dashboard” | Bịa phần trăm đẹp nhưng không nhớ cách đo |
| “Giả thuyết đầu sai; trace chỉ ra…” | Kể mình biết đúng ngay từ đầu |
| “Em đã thêm kiểm tra để lỗi không lặp lại” | Dừng câu chuyện ở lúc service chạy lại |

## Khi interviewer đào sâu

Nếu kết quả không có con số, dùng bằng chứng định tính cụ thể: loại bỏ một bước thao tác, không còn alert cùng loại trong ba tháng, hoặc rollback time giảm nhờ runbook. Đừng tự tạo số.

Nếu quyết định từng gây hậu quả, nói cách bạn phát hiện, sửa và thay đổi quy trình. Một câu chuyện có sai lầm nhưng học được thường đáng tin hơn câu chuyện hoàn hảo.

## Evidence cần mang vào story

- Người nghe biết vấn đề, phần bạn sở hữu và kết quả sau hai phút.
- Mọi số liệu đều trả lời được “đo ở đâu, trong khoảng nào”.
- Có ít nhất một trade-off và một bài học cụ thể.
- Đồng đội trong câu chuyện được ghi nhận đúng vai trò.

## Story mẫu

“Sau release, p99 của checkout tăng và một số user gặp timeout. Em chịu trách nhiệm khoanh vùng phía API. Em ưu tiên rollback để giảm blast radius, rồi so sánh trace trước và sau release. Trace cho thấy endpoint chạy thêm một query cho từng order trong danh sách, tức lỗi N+1. Team sửa bằng projection chỉ lấy cột cần thiết và batch query; em bổ sung test giới hạn query count cùng dashboard theo dõi. Latency sau đó trở về mức cũ. Điều em sẽ làm sớm hơn là thêm performance gate để chặn release khi luồng quan trọng vượt ngưỡng đã thống nhất.”

## Mock Follow-up

### Nếu quyết định là của team thì nói “em” thế nào?

Nói đúng ranh giới: bạn đã đề xuất, phân tích, triển khai hay điều phối phần nào. “Team quyết định X; em cung cấp số liệu Y và triển khai Z” vừa trung thực vừa cho thấy đóng góp.

### Nên kể bao nhiêu chi tiết kỹ thuật?

Đủ để chứng minh cơ chế và quyết định. Để interviewer hỏi sâu phần họ quan tâm. Nếu mở đầu bằng mọi class, bảng và dashboard, câu chuyện sẽ mất trọng tâm.

## Self-check

- Tác động và phần bạn sở hữu đã rõ chưa?
- Bằng chứng nào dẫn tới quyết định?
- Thay đổi nào ngăn sự cố lặp lại?

## Final Recall

- Behavioral Senior vẫn cần mechanism và evidence, không chỉ STAR chung chung.
- Nói rõ phần bạn sở hữu; không nhận công cả team.
- Reflection tốt nhất là thay đổi guardrail/process cụ thể ở lần sau.
