# Biến môi trường — Photo Gallery UI

Tài liệu chi tiết cho mọi biến trong `.env.example`.

## Backend (dev)

| Biến | Bắt buộc | Mô tả |
|---|---|---|
| `IMMICH_SERVER_URL` | Dev | Target Vite proxy. Mặc định `http://localhost:2283` |
| `VITE_IMMICH_API_URL` | Không | Alias tương thích spec; fallback nếu `IMMICH_SERVER_URL` trống |

## Public (build-time)

SvelteKit inject `PUBLIC_*` vào bundle lúc build. Thay đổi trên Vercel yêu cầu rebuild.

| Biến | Mặc định | Mô tả |
|---|---|---|
| `PUBLIC_IMMICH_SERVER_URL` | `""` | URL API production khi frontend/API khác origin |
| `PUBLIC_APP_NAME` | `Photo Gallery` | Tên app (title, dashboard) |
| `PUBLIC_COMPANY_NAME` | `""` | Tên công ty |
| `PUBLIC_THEME` | `system` | `light` \| `dark` \| `system` |
| `PUBLIC_DEFAULT_THEME` | `dark` | Fallback theme |
| `PUBLIC_DEFAULT_LANGUAGE` | `en` | Ngôn ngữ mặc định |
| `PUBLIC_ENABLE_ANALYTICS` | `false` | Analytics |
| `PUBLIC_ENABLE_ADMIN` | `true` | Route `/admin/*` |
| `PUBLIC_ENABLE_EXPERIMENTAL` | `false` | Tính năng thử nghiệm |

## Feature flags

Khi `false`, route **biến mất hoàn toàn** (sidebar + redirect).

| Biến | Route ảnh hưởng |
|---|---|
| `PUBLIC_ENABLE_MEMORIES` | `/memory` |
| `PUBLIC_ENABLE_PARTNER` | `/partners` |
| `PUBLIC_ENABLE_SHARING` | `/sharing` |
| `PUBLIC_ENABLE_MAP` | `/map` |
| `PUBLIC_ENABLE_PEOPLE` | `/people` |
| `PUBLIC_ENABLE_SEARCH` | `/search`, `/explore` |
| `PUBLIC_ENABLE_TRASH` | `/trash` |
| `PUBLIC_ENABLE_UTILITIES` | `/utilities` |
| `PUBLIC_ENABLE_WORKFLOWS` | `/workflows` |
| `PUBLIC_ENABLE_SHARED_LINKS` | `/shared-links`, `/share`, `/s` |
| `PUBLIC_ENABLE_FOLDERS` | `/folders` |
| `PUBLIC_ENABLE_TAGS` | `/tags` |
| `PUBLIC_ENABLE_ARCHIVE` | `/archive` |
| `PUBLIC_ENABLE_DASHBOARD` | `/dashboard` |

## Production tối thiểu (Vercel)

Chỉ cần:

```env
PUBLIC_IMMICH_SERVER_URL=https://immich.example.com
PUBLIC_APP_NAME=My Gallery
```

Khuyến nghị dùng reverse proxy cùng origin để tránh CORS.
