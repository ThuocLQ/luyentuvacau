# Luyện Từ Và Câu

Nền tảng học tập cá nhân cho Backend, Finance, Oracle, System Design và Distributed Systems.

## Chạy local

```bash
npm install
npm run dev
```

Mở địa chỉ Vite hiển thị trong terminal, thường là `http://localhost:5173`.

## Build production

```bash
npm run build
npm run preview
```

## Deploy Netlify

Project đã có sẵn `netlify.toml`:

- Build command: `npm run build`
- Publish directory: `dist`
- SPA redirect: `/* -> /index.html`

Các bước:

1. Tạo GitHub repository tên `luyentuvacau`.
2. Push toàn bộ source lên branch `main`.
3. Trong Netlify project `luyentuvacau-vn`, chọn **Add new site / Import an existing project** hoặc **Link repository**.
4. Chọn GitHub repo `luyentuvacau`.
5. Netlify sẽ tự nhận cấu hình và deploy.

## Thêm tài liệu mới

1. Tạo file Markdown trong thư mục `docs`.
2. Import file đó trong `src/data/docs.ts`.
3. Thêm metadata vào mảng `docs`.

## Tính năng

- Responsive desktop/mobile
- Dark mode
- Search toàn bộ tài liệu bằng Fuse.js
- Table of contents tự sinh
- Reading progress
- Bookmark và trạng thái đã học
- Copy code
- Markdown rendering
- Netlify SPA routing
