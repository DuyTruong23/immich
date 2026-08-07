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

echo "==> Copy branding assets"
mkdir -p upstream/web/static/branding
copy_merge "branding/assets/" "upstream/web/static/branding/"
cp branding/src/theme-light.css upstream/web/static/branding/theme-light.css
cp branding/src/theme-dark.css upstream/web/static/branding/theme-dark.css
cp branding/src/loading.css upstream/web/static/branding/loading.css
cp branding/assets/manifest.json upstream/web/static/manifest.json
sed 's|@photo-gallery/branding/|/branding/|g' custom/src/styles/custom.css > upstream/web/static/custom.css

echo "Custom layer prepared."
