# Git Workflow — Photo Gallery UI

## Remotes

| Remote | URL | Mục đích |
|---|---|---|
| `upstream` | `https://github.com/immich-app/immich.git` | Immich monorepo chính thức |
| `origin` | `<your-fork-url>` | Fork/repo của bạn |

```bash
git remote add upstream https://github.com/immich-app/immich.git
git remote add origin git@github.com:your-org/photo-gallery-ui.git
```

## Branch Strategy

```
main                 Production releases
  ↑
upstream-sync        Merge point cho Immich upstream
  ↑
develop              Integration branch
  ↑
feature/*            Tính năng mới
hotfix/*             Sửa lỗi khẩn từ main
```

### Quy tắc

1. **Không commit trực tiếp lên `main`.**
2. Mọi feature từ `develop` → `feature/<tên>`.
3. Upstream sync chỉ trên `upstream-sync`.
4. Hotfix từ `main` → `hotfix/<tên>` → merge back `main` + `develop`.

## Workflow hàng ngày

```bash
git checkout develop
git pull origin develop
git checkout -b feature/custom-dashboard

# ... code trong custom/, branding/, overrides/ ...

git add custom/ branding/
git commit -m "feat(dashboard): add custom dashboard page"
git push origin feature/custom-dashboard
# → Create PR vào develop
```

## Upstream sync workflow

```bash
git fetch upstream main
git checkout upstream-sync
git merge upstream/main
# resolve conflicts
bash scripts/apply-patches.sh
pnpm install && pnpm build && pnpm check

git checkout develop
git merge upstream-sync
```

## Commit message convention

```
feat(scope): mô tả ngắn
fix(scope): mô tả ngắn
chore(upstream): sync immich vX.Y.Z
docs(scope): cập nhật tài liệu
```

Scope gợi ý: `branding`, `custom`, `override`, `patch`, `upstream`, `config`
