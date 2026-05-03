#!/usr/bin/env bash
set -euo pipefail

APP_ROOT="${APP_ROOT:-$(pwd)}"
BACKEND_PORT="${PORT:-4000}"

mkdir -p "$APP_ROOT/backend/logs"
mkdir -p "$APP_ROOT/frontend/dist"

cd "$APP_ROOT/frontend"
npm ci
npm run build

cd "$APP_ROOT/backend"
npm ci --omit=dev

if command -v pm2 >/dev/null 2>&1; then
  pm2 describe carlo-backend >/dev/null 2>&1 \
    && pm2 restart carlo-backend --update-env \
    || pm2 start src/server.js --name carlo-backend --update-env
  pm2 save
else
  PORT="$BACKEND_PORT" npm start
fi
