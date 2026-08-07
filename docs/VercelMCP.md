# Vercel MCP + Cursor

## Cấu hình (đã thêm trong repo)

File [`.cursor/mcp.json`](../.cursor/mcp.json):

```json
{
  "mcpServers": {
    "vercel": {
      "url": "https://mcp.vercel.com"
    }
  }
}
```

## Kích hoạt

1. **Reload MCP** trong Cursor: Settings → MCP → Reload (hoặc restart Cursor)
2. Click **"Needs login"** trên server `vercel` → đăng nhập OAuth Vercel
3. (Tuỳ chọn) Scope theo project — thay URL bằng:
   `https://mcp.vercel.com/<team>/<project>`

Hoặc one-click: [Install Vercel MCP in Cursor](cursor://anysphere.cursor-deeplink/mcp/install?name=vercel&config=eyJ1cmwiOiJodHRwczovL21jcC52ZXJjZWwuY29tIn0%3D)

## CLI (nếu có Vercel CLI)

```bash
npx vercel login
npx vercel link
npx vercel mcp --clients Cursor
```

## Dùng MCP để debug deploy

Sau khi login, hỏi agent:

- "List Vercel deployments for photo-gallery"
- "Show logs for latest failed deployment"
- "What routes/functions are deployed?"

## Env bắt buộc trên Vercel

```env
PUBLIC_IMMICH_SERVER_URL=
IMMICH_SERVER_URL=https://immich.gallery-app.pp.ua
```

Proxy API qua `middleware.ts` (root) — chạy **trước** SPA fallback.
