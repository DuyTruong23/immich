# Patches

Git patches cho thay đổi upstream **bắt buộc** sau mỗi lần sync.

## Active patches

| Patch | Mô tả |
|---|---|
| `001-custom-integration.patch` | Wire aliases, layout, env types |

## Sau upstream sync

```bash
bash scripts/apply-patches.sh
bash scripts/prepare-custom.sh
pnpm install && pnpm build
```

## Tạo patch mới

```bash
git diff upstream/web/ > patches/NNN-mo-ta.patch
```

## Files touched by 001

- `upstream/web/vite.config.ts` — custom aliases + proxy URL
- `upstream/web/svelte.config.js` — SvelteKit aliases
- `upstream/web/src/routes/+layout.ts` — bootstrap config + feature guard
- `upstream/web/src/routes/+layout.svelte` — import custom CSS
- `upstream/web/src/app.d.ts` — PUBLIC_* env types
- `upstream/web/package.json` — workspace dependencies
