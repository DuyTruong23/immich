# Docker — Photo Gallery UI

## Local development stack

```
Immich Docker (port 2283)
        ↓ REST + WebSocket
Custom Frontend (pnpm dev, port 3000, hot reload)
```

### Quick start

```bash
pnpm docker:up      # Start Immich backend
pnpm dev            # Start frontend (terminal khác)
# hoặc
pnpm dev:full       # Cả hai (blocking)
```

### Thư mục

| Path | Mô tả |
|---|---|
| `docker-compose.dev.yml` | Immich stack cho dev |
| `.env.example` | Biến môi trường Immich |
| `data/` | Upload + Postgres (gitignored) |
| `caddy/Caddyfile.example` | Reverse proxy production |
| `docker-compose.prod.example.yml` | Backend production reference |

### Lệnh thủ công

```bash
cd docker
cp .env.example .env
docker compose -f docker-compose.dev.yml up -d
docker compose -f docker-compose.dev.yml logs -f immich-server
curl http://localhost:2283/api/server/ping
```

### Dừng stack

```bash
pnpm docker:down
```

## Production backend

1. Copy `docker-compose.prod.example.yml` lên VPS
2. Tạo `.env` với password mạnh, `UPLOAD_LOCATION` trỏ storage thật
3. Pin `IMMICH_VERSION=release` (hoặc tag cụ thể)
4. Bind `127.0.0.1:2283` — expose qua reverse proxy only
5. Cấu hình Caddy/Nginx theo `caddy/Caddyfile.example`

## Yêu cầu tài nguyên

| Component | RAM tối thiểu |
|---|---|
| Immich Server | 2 GB |
| ML service | 1 GB |
| Postgres | 512 MB |
| **Tổng khuyến nghị** | **8 GB** |
