# Vercel MCP + Cursor

## Cách 1 — Qua UI Cursor (khuyến nghị, không cần link one-click)

1. Mở **Cursor Settings**: `Ctrl + Shift + J` hoặc **File → Preferences → Cursor Settings**
2. Vào tab **MCP** (hoặc search "MCP")
3. Click **Add new global MCP server** (hoặc **Edit MCP config**)
4. Thêm block sau (nếu file đã có server khác, merge vào `mcpServers`):

```json
{
  "mcpServers": {
    "vercel": {
      "url": "https://mcp.vercel.com"
    }
  }
}
```

5. **Save** → click **Reload** (icon refresh cạnh MCP)
6. Server `vercel` hiện trạng thái **Needs login** → click → đăng nhập Vercel OAuth

## Cách 2 — Sửa file trực tiếp

**Global** (áp dụng mọi project):

```
C:\Users\LENOVO\.cursor\mcp.json
```

**Project** (chỉ repo này):

```
.cursor/mcp.json
```

Nội dung:

```json
{
  "mcpServers": {
    "vercel": {
      "url": "https://mcp.vercel.com"
    }
  }
}
```

Sau đó **restart Cursor** hoặc MCP → Reload.

## Cách 3 — Vercel CLI

```bash
npx vercel login
cd D:/Personal/Coding/poga-v2
npx vercel link
npx vercel mcp --clients Cursor
```

## Scope theo project (tuỳ chọn)

Sau `vercel link`, có thể dùng URL scoped:

```
https://mcp.vercel.com/<team-slug>/<project-slug>
```

Ví dụ project `photo-gallery-silk-alpha` — lấy team/project slug từ Vercel Dashboard → Project → Settings.

## Kiểm tra đã hoạt động

- Settings → MCP → `vercel` = **Connected** (xanh)
- Chat: *"List my Vercel deployments"*

## Link one-click không click được?

Link `cursor://...` thường **không hoạt động** khi:

- Mở từ chat/web thay vì terminal Cursor
- Windows chưa gán protocol `cursor://`
- Cursor chưa chạy

→ Dùng **Cách 1** hoặc **Cách 2** ở trên.

## Env Vercel (deploy gallery-app)

```env
PUBLIC_IMMICH_SERVER_URL=
IMMICH_SERVER_URL=https://immich.gallery-app.pp.ua
```

Proxy API: `middleware.ts` ở repo root.
