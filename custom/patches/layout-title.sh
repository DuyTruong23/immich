#!/usr/bin/env bash
# Patch document title suffix after upstream sync (idempotent).
apply_layout_title_patch() {
  local layout="$1"
  [ -f "$layout" ] || return 0
  if grep -q "iCloud Photos</title>" "$layout"; then
    return 0
  fi
  sed -i 's| - Gallery</title>| · iCloud Photos</title>|g' "$layout" 2>/dev/null \
    || sed -i '' 's| - Gallery</title>| · iCloud Photos</title>|g' "$layout"
}
