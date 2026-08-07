# Cập nhật Upstream — Photo Gallery UI

## Tổng quan

Immich phát hành thường xuyên. Quy trình này giữ tương thích API và giảm thiểu mất custom code.

## Remote

```bash
git remote -v
# upstream  https://github.com/immich-app/immich.git (fetch)
# origin    <your-fork-url> (fetch/push)
```

## Quy trình đồng bộ

```
upstream/main  ──fetch──►  upstream-sync  ──merge──►  develop  ──merge──►  main
```

### Bước 1 — Fetch upstream

```bash
git fetch upstream main
```

Đảm bảo lấy đủ: `upstream/web/`, `upstream/packages/sdk/`, `upstream/i18n/`.

Hoặc dùng script:

```bash
pnpm sync:upstream
```

### Bước 2 — Merge vào upstream-sync

```bash
git checkout upstream-sync
git merge upstream/main
```

### Bước 3 — Giải quyết conflict

Conflict thường gặp tại:
- `upstream/web/` — file upstream thay đổi
- `upstream/packages/sdk/` — API types mới
- `pnpm-lock.yaml`

**Quy tắc giải quyết:**

| File | Hành động |
|---|---|
| `upstream/web/**` | Giữ upstream, re-apply patches |
| `upstream/packages/sdk/**` | Giữ upstream |
| `custom/`, `branding/`, `overrides/` | Giữ custom (ours) |
| `patches/*.patch` | Re-generate nếu context thay đổi |

### Bước 4 — Re-apply patches

```bash
bash scripts/apply-patches.sh
```

Nếu patch fail:
```bash
git apply --check patches/001-something.patch
git diff upstream/web/path/to/file > patches/001-something.patch
```

### Bước 5 — Rebuild & test

```bash
pnpm install
pnpm --filter @immich/sdk build
pnpm build
pnpm check
```

### Bước 6 — Merge vào develop

```bash
git checkout develop
git merge upstream-sync
```

### Bước 7 — Release

```bash
git checkout main
git merge develop
git tag v0.x.x-upstream-y.y.y
git push origin main --tags
```

## Tạo patch mới

```bash
git diff upstream/web/ > patches/NNN-mo-ta-ngan.patch
git checkout -- upstream/web/
bash scripts/apply-patches.sh
```
