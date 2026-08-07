#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DOCKER_DIR="$ROOT/docker"

cd "$DOCKER_DIR"

if [[ ! -f .env ]]; then
  echo "Creating docker/.env from .env.example"
  cp .env.example .env
fi

mkdir -p data/upload data/postgres

echo "==> Starting Immich stack (photo-gallery-dev)"
docker compose -f docker-compose.dev.yml up -d

echo ""
echo "Waiting for Immich API..."
for i in $(seq 1 60); do
  if curl -sf http://localhost:2283/api/server/ping >/dev/null 2>&1; then
    echo "Immich ready: http://localhost:2283"
    exit 0
  fi
  sleep 2
done

echo "Immich chưa phản hồi sau 120s. Kiểm tra: docker compose -f docker/docker-compose.dev.yml logs -f"
exit 1
