# Upstream — Immich Web

Thư mục này chứa mã nguồn **Immich Web** được lấy từ monorepo chính thức.

| Thành phần | Nguồn | Mô tả |
|---|---|---|
| `web/` | [immich-app/immich](https://github.com/immich-app/immich) | SvelteKit frontend |
| `packages/sdk/` | Cùng repo | OpenAPI SDK (`@immich/sdk`) |
| `i18n/` | Cùng repo | Bản dịch UI (bắt buộc cho build) |

## Quy tắc

1. **Không sửa trực tiếp** nếu có thể override qua `overrides/` hoặc `custom/`.
2. Mọi thay đổi bắt buộc phải upstream nằm trong `patches/` dưới dạng patch file.
3. Đồng bộ qua nhánh `upstream-sync` — xem [docs/Update-Upstream.md](../docs/Update-Upstream.md).

## Phiên bản upstream hiện tại

Được track qua commit trên nhánh `upstream-sync`. Chạy:

```bash
git log -1 --oneline upstream/main
```
