#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

copy_merge() {
  local src="$1"
  local dest="$2"
  mkdir -p "$dest"
  if command -v rsync >/dev/null 2>&1; then
    rsync -a "$src" "$dest"
  else
    cp -r "$src"/. "$dest"
  fi
}

echo "==> Merge custom routes (non-destructive)"
mkdir -p upstream/web/src/routes
copy_merge "custom/src/routes/" "upstream/web/src/routes/"

echo "==> Merge component overrides into upstream lib"
mkdir -p upstream/web/src/lib
copy_merge "overrides/lib/" "upstream/web/src/lib/"

echo "==> Copy branding assets and design system"
mkdir -p upstream/web/static/branding
copy_merge "branding/assets/" "upstream/web/static/branding/"
copy_merge "branding/src/" "upstream/web/static/branding/"
cp branding/assets/manifest.json upstream/web/static/manifest.json
sed -e 's|@photo-gallery/branding/|/branding/|g' \
  -e "s|@import '../../../branding/src/|@import '/branding/|g" \
  custom/src/styles/custom.css > upstream/web/static/custom.css

if [ -f custom/src/hooks.server.ts ]; then
  echo "==> Apply custom hooks.server.ts"
  cp custom/src/hooks.server.ts upstream/web/src/hooks.server.ts
fi

echo "Custom layer prepared."
