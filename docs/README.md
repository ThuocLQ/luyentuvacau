# Quy ước nội dung

Các bài được hiển thị trên website được đăng ký trong `src/data/docs.ts`. Đây là nguồn nội dung chuẩn để biên tập, kiểm tra link và đưa vào lộ trình ôn.

Các file cũ `csharp.md`, `oracle.md`, `system-design.md` và `backend-finance.md` chỉ được giữ làm ghi chú tham khảo lịch sử. Chúng không phải nội dung xuất bản và không nên được copy trực tiếp vào cheatsheet mới. Khi cần dùng lại một ý, hãy kiểm chứng nguồn, viết lại theo `content-editorial-standard.md` và đặt vào bài canonical phù hợp.

## Learning Lab visuals

Golden Lessons may use a small lesson-specific React component under `src/components/learning/<topic>/`, rendered explicitly by the Learning Lab document renderer. Keep the Markdown narrative as the source of teaching flow; build only the visual interaction that the topic needs, not a generic diagram engine.