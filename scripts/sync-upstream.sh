#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

UPSTREAM_REMOTE="${UPSTREAM_REMOTE:-upstream}"
UPSTREAM_BRANCH="${UPSTREAM_BRANCH:-main}"
SYNC_BRANCH="${SYNC_BRANCH:-upstream-sync}"

echo "==> Fetching ${UPSTREAM_REMOTE}/${UPSTREAM_BRANCH}"
git fetch "$UPSTREAM_REMOTE" "$UPSTREAM_BRANCH" --depth=1

CURRENT_BRANCH="$(git branch --show-current)"
if [[ "$CURRENT_BRANCH" != "$SYNC_BRANCH" ]]; then
  echo "==> Switching to ${SYNC_BRANCH}"
  git checkout "$SYNC_BRANCH" 2>/dev/null || git checkout -b "$SYNC_BRANCH"
fi

echo "==> Merging ${UPSTREAM_REMOTE}/${UPSTREAM_BRANCH} into ${SYNC_BRANCH}"
git merge "${UPSTREAM_REMOTE}/${UPSTREAM_BRANCH}" -m "chore(upstream): sync ${UPSTREAM_BRANCH} from ${UPSTREAM_REMOTE}"

echo ""
echo "Done. Next steps:"
echo "  1. Resolve conflicts in upstream/ if any"
echo "  2. pnpm install && pnpm build"
echo "  3. git checkout develop && git merge ${SYNC_BRANCH}"
echo "  4. Test thoroughly before merging to main"
