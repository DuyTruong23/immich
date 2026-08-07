# Production — Vercel + Cloudflare Tunnel (gallery-app.pp.ua)

## Kiến trúc (same-origin qua Vercel proxy)

```
Browser → gallery-app.pp.ua/api/*  → Vercel rewrite → immich.gallery-app.pp.ua (PC tunnel)
Browser → gallery-app.pp.ua/*      → Vercel static (custom UI)
```

**Không dùng cross-origin** — tránh CORS (Immich không hỗ trợ CORS native).

## Vercel Environment Variables

```env
# ĐỂ TRỐNG — SDK dùng relative /api (cùng origin)
PUBLIC_IMMICH_SERVER_URL=

PUBLIC_APP_NAME=Photo Gallery
PUBLIC_DEFAULT_LANGUAGE=vi
PUBLIC_THEME=system
PUBLIC_DEFAULT_THEME=dark
```

> **Quan trọng:** Xóa hoặc để trống `PUBLIC_IMMICH_SERVER_URL` trên Vercel, rồi **Redeploy**.

## vercel.json

Proxy target trong `rewrites` phải khớp tunnel Immich:

```json
"destination": "https://immich.gallery-app.pp.ua/api/:match*"
```

## Immich PC (.env)

```env
IMMICH_SERVER_URL=https://immich.gallery-app.pp.ua
```

## Kiểm tra

```bash
# Qua Vercel proxy (same-origin)
curl https://gallery-app.pp.ua/api/server/ping
# → {"res":"pong"}

# Tunnel trực tiếp
curl https://immich.gallery-app.pp.ua/api/server/ping
# → {"res":"pong"}
```

## Lỗi "Failed to fetch"

| Nguyên nhân | Fix |
|---|---|
| `PUBLIC_IMMICH_SERVER_URL` set → cross-origin CORS | Để **trống** trên Vercel |
| Chưa redeploy sau đổi env | Redeploy |
| Tunnel/Immich down | `docker compose ps` trên PC |
| Sai URL trong vercel.json rewrites | Khớp `immich.gallery-app.pp.ua` |
