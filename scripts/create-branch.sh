#!/usr/bin/env bash
set -euo pipefail

TYPE="${1:-feature}"
NAME="${2:-}"

if [[ -z "$NAME" ]]; then
  echo "Usage: $0 [feature|hotfix] <name>"
  exit 1
fi

BASE="develop"
if [[ "$TYPE" == "hotfix" ]]; then
  BASE="main"
fi

BRANCH="${TYPE}/${NAME}"

git checkout "$BASE"
git pull origin "$BASE" 2>/dev/null || true
git checkout -b "$BRANCH"

echo "Created branch: $BRANCH from $BASE"
