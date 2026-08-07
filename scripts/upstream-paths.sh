#!/usr/bin/env bash
# Danh sách path Immich cần thiết cho Photo Gallery UI (không lấy full monorepo)
set -euo pipefail

UPSTREAM_PATHS=(
  upstream/web
  upstream/packages/sdk
  upstream/i18n
  upstream/pnpm-lock.yaml
  upstream/pnpm-workspace.yaml
  upstream/package.monorepo.json
  upstream/.nvmrc
  upstream/mise.toml
  upstream/mise.lock
)

echo "Required upstream paths:"
printf '  - %s\n' "${UPSTREAM_PATHS[@]}"
