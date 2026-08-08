#!/usr/bin/env bash
# Regenerate PNG/ICO favicons from branding/assets/icloud-photos-icon.svg
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ASSETS="$ROOT/branding/assets"
SVG="$ASSETS/icloud-photos-icon.svg"

if [ ! -f "$SVG" ]; then
  echo "Missing source SVG: $SVG" >&2
  exit 1
fi

cd "$ASSETS"

render_png() {
  local size="$1"
  local out="$2"
  npx --yes @resvg/resvg-js-cli --fit-width "$size" --fit-height "$size" "$SVG" "$out"
}

echo "==> Render PNG icons from icloud-photos-icon.svg"
for size in 16 32 48 96 144 180 192 512; do
  render_png "$size" "favicon-${size}.png.tmp"
done

mv favicon-16.png.tmp favicon-16.png
mv favicon-32.png.tmp favicon-32.png
mv favicon-48.png.tmp favicon-48.png
mv favicon-96.png.tmp favicon-96.png
mv favicon-144.png.tmp favicon-144.png
mv favicon-180.png.tmp apple-icon-180.png
mv favicon-192.png.tmp icon-192.png
mv favicon-512.png.tmp icon-512.png

cp icon-192.png favicon.png
cp icon-192.png manifest-icon-192.maskable.png
cp icon-512.png manifest-icon-512.maskable.png

echo "==> Build favicon.ico"
npx --yes png-to-ico favicon-16.png favicon-32.png favicon-48.png > favicon.ico

echo "Branding icons generated in $ASSETS"
