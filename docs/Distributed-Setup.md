# Chạy local + Vercel — Immich Docker & poga-v2

> **poga-v2** = frontend (local dev). **Immich Docker** = backend media (bất kỳ folder compose nào).  
> Không bắt buộc dùng repo `photo-gallery-v1` — chỉ cần Immich chạy được và poga-v2 trỏ đúng URL API.

---

## Hai chế độ vận hành

```
┌─ LOCAL DEV (máy bạn) ─────────────────────────────────────────────────┐
│                                                                         │
│   Immich Docker :2283          Vite dev :3030                          │
│   (compose bất kỳ)      ←──→   poga-v2                                 │
│   localhost:2283               IMMICH_SERVER_URL=localhost:2283       │
│                                hoặc tunnel URL                          │
└─────────────────────────────────────────────────────────────────────────┘

┌─ VERCEL PRODUCTION (internet) ────────────────────────────────────────┐
│                                                                         │
│   gallery-app.pp.ua (static CDN)                                       │
│        /api/*  ──rewrite──►  https://immich.gallery-app.pp.ua (tunnel)│
│                                                                         │
│   ⚠ Không chạy Docker trên Vercel — Immich phải online ở máy/tunnel  │
└─────────────────────────────────────────────────────────────────────────┘
```

| | **Local dev** | **Vercel (production)** |
|---|---|---|
| poga-v2 | `pnpm dev` → `:3030` | Build static, host CDN |
| Immich | Docker **trên máy bạn** (hoặc máy khác qua tunnel) | Docker **máy nhà/VPS** + tunnel/proxy |
| Ảnh lưu ở đâu | Máy chạy Immich | Máy chạy Immich (không phải Vercel) |
| Tắt Immich thì sao | Frontend load, API lỗi | Website mở được, **login/xem ảnh lỗi** |

---

## Phần 1 — Chạy local (poga-v2 + Immich Docker)

### Bước 1: Immich Docker (backend)

Immich có thể nằm ở **bất kỳ đâu**, ví dụ:

- `D:\Personal\Coding\photo-gallery-v1\immich`
- `D:\immich\`
- `poga-v2/docker/` (compose dev của repo)

**Yêu cầu:** container `immich-server` lắng nghe **port 2283**.

```bash
# Ví dụ — vào folder có docker-compose.yml
cd /path/to/immich
docker compose up -d

curl http://localhost:2283/api/server/ping   # → pong
```

#### External library (ảnh có sẵn trên ổ/NAS khác)

Trong `docker-compose.yml` của Immich, mount read-only:

```yaml
volumes:
  - ${UPLOAD_LOCATION:-./library}:/data
  - ${EXTERNAL_LIBRARY_PATH}:/external-library:ro
```

`.env` trên **máy chạy Docker** (path **host**, không phải path Windows nếu dùng WSL):

```env
UPLOAD_LOCATION=./library
EXTERNAL_LIBRARY_PATH=/mnt/f/Project/Photo_Gallery   # ví dụ WSL
# hoặc /mnt/nas/photos trên Linux/NAS
```

Sau khi `docker up`:

1. Immich UI → **Administration → External Libraries**
2. Add folder **`/external-library`** (path trong container)
3. **Scan New Library Files**

> Nếu dùng WSL + ổ F:, xem script `verify-mount.sh` trong folder immich bạn đang dùng.

---

### Bước 2: poga-v2 (frontend local)

```bash
cd poga-v2
pnpm install
cp .env.example .env
cp .env.example upstream/web/.env
```

Chỉnh **`.env`** và **`upstream/web/.env`**:

#### Cách A — Immich cùng máy (phổ biến khi dev)

```env
IMMICH_SERVER_URL=http://localhost:2283
VITE_IMMICH_API_URL=http://localhost:2283
PUBLIC_IMMICH_SERVER_URL=
```

#### Cách B — Immich qua tunnel (PC tắt local, dùng server remote)

```env
IMMICH_SERVER_URL=https://immich.gallery-app.pp.ua
VITE_IMMICH_API_URL=https://immich.gallery-app.pp.ua
PUBLIC_IMMICH_SERVER_URL=
```

Chạy:

```bash
pnpm prepare:custom
pnpm dev
```

Mở **http://localhost:3030** — Vite proxy `/api` → `IMMICH_SERVER_URL`.

**Không cần** `pnpm docker:up` trong poga-v2 nếu Immich đã chạy ở folder compose riêng.

---

### Bước 3: Kiểm tra local

| Kiểm tra | Kỳ vọng |
|---|---|
| `curl localhost:2283/api/server/ping` | `pong` |
| http://localhost:3030 | Trang login / gallery |
| Login | Vào được timeline |
| Tắt Docker Immich + F5 | Login/API lỗi (frontend vẫn mở shell) |

---

## Phần 2 — Vercel khi **không** chạy Docker Immich

Vercel **chỉ host file tĩnh** (HTML, JS, CSS). **Không** chạy Immich, Postgres, ML.

### Luồng production

```
User → gallery-app.pp.ua (Vercel CDN)
         ├── /, /photos, …     → index.html + JS (luôn có nếu Vercel up)
         └── /api/*            → rewrite → immich.gallery-app.pp.ua (máy bạn)
```

Cấu hình hiện tại: `vercel.json` rewrite `/api/(.*)` → `https://immich.gallery-app.pp.ua/api/$1`.

### Khi Immich Docker **đang tắt** (PC sleep, tunnel down, …)

| Thành phần | Hành vi |
|---|---|
| Trang web (UI shell) | **Vẫn mở** — HTML/JS tải từ Vercel |
| Login | **Thất bại** — `/api/auth/login` lỗi 502/504/timeout |
| Timeline / ảnh | **Không load** — mọi `/api/*` fail |
| Upload | **Không được** |
| WebSocket (notifications) | **Không kết nối** |

User thường thấy: màn hình login, spinner mãi, hoặc thông báo lỗi mạng — **không mất website**, chỉ mất backend.

### Khi Immich **bật** + tunnel **chạy**

Mọi thứ hoạt động bình thường — Vercel không cần redeploy.

### Điều kiện để Vercel hoạt động

1. **Máy chạy Immich** bật 24/7 (hoặc giờ dùng) **hoặc** VPS riêng.
2. **Cloudflare Tunnel** (hoặc reverse proxy) trỏ `immich.gallery-app.pp.ua` → `:2283`.
3. Vercel env: `IMMICH_SERVER_URL=https://immich.gallery-app.pp.ua` (cho middleware nếu dùng).

> **Tóm lại:** Vercel = mặt tiền cửa hàng. Immich = kho + máy chủ. Cửa mở nhưng kho đóng cửa → vào được sảnh, không lấy được hàng.

---

## So sánh nhanh: Local vs Vercel

| Câu hỏi | Local dev | Vercel |
|---|---|---|
| Cần Docker Immich? | Có (hoặc tunnel tới Immich remote) | **Không trên Vercel** — Immich chạy nơi khác |
| poga-v2 chạy đâu? | `pnpm dev` máy bạn | CDN Vercel |
| Tắt PC chạy Immich? | Local dev mất API | **Production mất API** |
| External library? | Cấu hình trên máy Docker | Cùng máy Docker (Vercel không đụng) |
| Repo photo-gallery-v1? | **Không bắt buộc** — chỉ cần compose Immich |

---

## External library — path ở vị trí khác

External library **không** liên quan poga-v2 hay Vercel. Chỉ cấu hình trên **máy chạy Immich Docker**:

```
NAS / ổ F: / SMB share
       ↓ mount trên host
EXTERNAL_LIBRARY_PATH trong .env
       ↓ docker bind
/external-library trong container
       ↓ Immich UI scan
Ảnh hiện trên gallery (local hoặc Vercel — cùng API)
```

| Bạn có | Ghi vào `.env` Immich |
|---|---|
| `F:\Project\Photo_Gallery` (WSL) | `EXTERNAL_LIBRARY_PATH=/mnt/f/Project/Photo_Gallery` |
| `/mnt/nas/photos` (Linux) | `EXTERNAL_LIBRARY_PATH=/mnt/nas/photos` |
| Immich UI add folder | Luôn là **`/external-library`** |

---

## Lệnh tóm tắt

**Immich (folder compose bất kỳ):**

```bash
cd /path/to/immich
docker compose up -d
curl http://localhost:2283/api/server/ping
```

**poga-v2 local:**

```bash
cd poga-v2
# .env: IMMICH_SERVER_URL=http://localhost:2283
pnpm prepare:custom && pnpm dev
# → http://localhost:3030
```

**Vercel:** push git → auto deploy. Immich + tunnel phải **online** riêng.

---

## Tài liệu liên quan

| File | Nội dung |
|---|---|
| [Development.md](./Development.md) | Dev workflow poga-v2 |
| [Deployment.md](./Deployment.md) | Vercel + env production |
| [Environment.md](./Environment.md) | Biến môi trường |
