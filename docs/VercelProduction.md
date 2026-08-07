# Production — Vercel + Cloudflare Tunnel (gallery-app.pp.ua)

## Kiến trúc (same-origin)

```
Browser → gallery-app.pp.ua/api/*       → Vercel Edge Function → immich.gallery-app.pp.ua (PC tunnel)
Browser → gallery-app.pp.ua/api/socket.io → Vercel rewrite → tunnel (WebSocket)
Browser → gallery-app.pp.ua/*           → Vercel static (custom UI)
```

**Không dùng cross-origin** — tránh CORS (Immich không hỗ trợ CORS native).

## Vercel Environment Variables

```env
# ĐỂ TRỐNG — SDK dùng relative /api (cùng origin)
PUBLIC_IMMICH_SERVER_URL=

# Server-side — Edge Function proxy (không PUBLIC)
IMMICH_SERVER_URL=https://immich.gallery-app.pp.ua

PUBLIC_APP_NAME=Photo Gallery
PUBLIC_DEFAULT_LANGUAGE=vi
PUBLIC_THEME=system
PUBLIC_DEFAULT_THEME=dark
```

> **Quan trọng:** Xóa hoặc để trống `PUBLIC_IMMICH_SERVER_URL`, thêm `IMMICH_SERVER_URL`, rồi **Redeploy**.

## Proxy API

- `middleware.ts` (root) — Edge Middleware proxy `/api/*` → tunnel (**chạy trước** SPA fallback)
- `api/[...path].ts` — backup Edge Function (nếu middleware không deploy)
- SPA fallback **không** match `/api`

Xem thêm [VercelMCP.md](./VercelMCP.md) để debug deploy qua MCP.

## Immich PC (.env)

```env
IMMICH_SERVER_URL=https://immich.gallery-app.pp.ua
```

## Kiểm tra

```bash
curl -sS https://gallery-app.pp.ua/api/server/ping
# → {"res":"pong"}  (Content-Type: application/json — KHÔNG phải HTML)

curl -sS https://gallery-app.pp.ua/api/server/config | head -c 80
# → JSON config

curl -sS https://immich.gallery-app.pp.ua/api/server/ping
# → {"res":"pong"}
```

## Lỗi "Failed to fetch"

| Nguyên nhân | Fix |
|---|---|
| `PUBLIC_IMMICH_SERVER_URL` set → cross-origin CORS | Để **trống** trên Vercel |
| `/api/*` trả HTML (SPA fallback) | Deploy bản mới có `api/[...path].ts` + vercel.json đã sửa |
| Chưa redeploy sau đổi env | Redeploy |
| Tunnel/Immich down | `docker compose ps` trên PC |
| Thiếu `IMMICH_SERVER_URL` | Set trên Vercel (server env) |
