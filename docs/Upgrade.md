# Upgrade — Photo Gallery UI

Quy trình nâng cấp Immich upstream. Chi tiết merge: [Update-Upstream.md](./Update-Upstream.md).

## Checklist

1. `git fetch upstream main`
2. `git checkout upstream-sync && git merge upstream/main`
3. `bash scripts/apply-patches.sh` (nếu có patches)
4. `bash scripts/prepare-custom.sh`
5. `pnpm install && pnpm --filter @immich/sdk build`
6. `pnpm build && pnpm check`
7. Test manual: login, timeline, upload, dashboard, feature flags
8. `git checkout develop && git merge upstream-sync`
9. Release: `develop` → `main`

## Sau khi upgrade Immich major

- Kiểm tra `@immich/sdk` breaking changes
- Rebuild API wrappers trong `custom/src/api/`
- Verify feature flag routes vẫn khớp upstream routes
- Re-test UserSidebar override

## Rollback

```bash
git checkout main
git revert <merge-commit>
pnpm install && pnpm build
```

Hoặc redeploy Vercel commit trước đó (frontend rollback instant).
