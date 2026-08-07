#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [[ ! -d patches ]] || [[ -z "$(ls -A patches 2>/dev/null | grep -v .gitkeep || true)" ]]; then
  echo "No patches to apply."
  exit 0
fi

for patch in patches/*.patch; do
  [[ -f "$patch" ]] || continue
  echo "Applying $(basename "$patch")"
  git apply --check "$patch"
  git apply "$patch"
done

echo "All patches applied."
