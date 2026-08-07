#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT/docker"

echo "==> Stopping Immich stack"
docker compose -f docker-compose.dev.yml down

echo "Done."
