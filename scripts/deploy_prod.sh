#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

HOST="${DEPLOY_HOST:-95.163.226.145}"
USER_NAME="${DEPLOY_USER:-root}"
SSH_KEY="${DEPLOY_SSH_KEY:-$HOME/.ssh/lumalms_deploy}"
SSH_KEY_TEMP=""

if [[ -n "${DEPLOY_SSH_KEY_CONTENT:-}" ]]; then
  SSH_KEY_TEMP="$(mktemp)"
  printf '%s\n' "$DEPLOY_SSH_KEY_CONTENT" > "$SSH_KEY_TEMP"
  chmod 600 "$SSH_KEY_TEMP"
  SSH_KEY="$SSH_KEY_TEMP"
fi

cleanup() {
  if [[ -n "$SSH_KEY_TEMP" ]]; then
    rm -f "$SSH_KEY_TEMP"
  fi
}
trap cleanup EXIT
REMOTE_APP_DIR="${DEPLOY_REMOTE_APP_DIR:-/opt/apps/mmtable}"
REMOTE_BACKUP_DIR="${DEPLOY_REMOTE_BACKUP_DIR:-/opt/apps/backups}"
PUBLIC_URL="${DEPLOY_PUBLIC_URL:-https://mmtable.crystalsystems.ru/}"
GUNICORN_CMD="${DEPLOY_GUNICORN_CMD:-$REMOTE_APP_DIR/.venv/bin/gunicorn -w 2 -b 127.0.0.1:4173 server:app}"

SSH_OPTS=(
  -oHostKeyAlgorithms=+ssh-rsa
  -oPubkeyAcceptedAlgorithms=+ssh-rsa
  -oBatchMode=yes
  -oConnectTimeout=10
  -oStrictHostKeyChecking=accept-new
  -i "$SSH_KEY"
)

retry() {
  local attempts="$1"
  shift
  local n=1
  until "$@"; do
    if (( n >= attempts )); then
      return 1
    fi
    n=$((n + 1))
    sleep 2
  done
}

remote_ssh() {
  ssh "${SSH_OPTS[@]}" "${USER_NAME}@${HOST}" "$@"
}

remote_scp() {
  scp "${SSH_OPTS[@]}" "$@"
}

require_local_file() {
  local path="$1"
  if [[ ! -f "$path" ]]; then
    echo "Missing required file: $path" >&2
    exit 1
  fi
}

require_local_file "$ROOT_DIR/app.js"
require_local_file "$ROOT_DIR/index.html"
require_local_file "$ROOT_DIR/styles.css"
require_local_file "$ROOT_DIR/server.py"
require_local_file "$ROOT_DIR/api_v1.py"
require_local_file "$ROOT_DIR/mcp_http.py"
require_local_file "$ROOT_DIR/layout_engine/__init__.py"
require_local_file "$ROOT_DIR/layout_engine/constants.py"
require_local_file "$ROOT_DIR/layout_engine/document.py"
require_local_file "$ROOT_DIR/layout_engine/ops.py"
require_local_file "$ROOT_DIR/bitrix-chart.js"
require_local_file "$ROOT_DIR/draw-tools.js"
require_local_file "$ROOT_DIR/vendor/laser-pointer.js"
require_local_file "$ROOT_DIR/vendor/perfect-freehand.js"
require_local_file "$ROOT_DIR/assets/favicon.png"
require_local_file "$ROOT_DIR/assets/apple-touch-icon.png"

TS="$(date +%Y%m%d-%H%M%S)"
BACKUP_NAME="mmtable-PROD-BACKUP-${TS}-before-deploy.tar.gz"

echo "Deploying to ${USER_NAME}@${HOST}:${REMOTE_APP_DIR}"

echo "1/4 Creating server backup"
retry 6 remote_ssh \
  "mkdir -p '${REMOTE_BACKUP_DIR}' && tar -czf '${REMOTE_BACKUP_DIR}/${BACKUP_NAME}' -C '${REMOTE_APP_DIR}' app.js index.html styles.css server.py assets/favicon.png assets/apple-touch-icon.png workspace.db bitrix-chart.js draw-tools.js vendor/perfect-freehand.js vendor/laser-pointer.js 2>/dev/null || tar -czf '${REMOTE_BACKUP_DIR}/${BACKUP_NAME}' -C '${REMOTE_APP_DIR}' app.js index.html styles.css server.py workspace.db 2>/dev/null || tar -czf '${REMOTE_BACKUP_DIR}/${BACKUP_NAME}' -C '${REMOTE_APP_DIR}' app.js index.html styles.css server.py workspace.db && ls -lh '${REMOTE_BACKUP_DIR}/${BACKUP_NAME}'"

echo "2/4 Uploading files to /tmp"
retry 6 remote_scp "$ROOT_DIR/app.js" "${USER_NAME}@${HOST}:/tmp/mmtable_app.js"
retry 6 remote_scp "$ROOT_DIR/bitrix-chart.js" "${USER_NAME}@${HOST}:/tmp/mmtable_bitrix_chart.js"
retry 6 remote_scp "$ROOT_DIR/draw-tools.js" "${USER_NAME}@${HOST}:/tmp/mmtable_draw_tools.js"
retry 6 remote_scp "$ROOT_DIR/vendor/perfect-freehand.js" "${USER_NAME}@${HOST}:/tmp/mmtable_perfect_freehand.js"
retry 6 remote_scp "$ROOT_DIR/vendor/laser-pointer.js" "${USER_NAME}@${HOST}:/tmp/mmtable_laser_pointer.js"
retry 6 remote_scp "$ROOT_DIR/index.html" "${USER_NAME}@${HOST}:/tmp/mmtable_index.html"
retry 6 remote_scp "$ROOT_DIR/styles.css" "${USER_NAME}@${HOST}:/tmp/mmtable_styles.css"
retry 6 remote_scp "$ROOT_DIR/server.py" "${USER_NAME}@${HOST}:/tmp/mmtable_server.py"
retry 6 remote_scp "$ROOT_DIR/api_v1.py" "${USER_NAME}@${HOST}:/tmp/mmtable_api_v1.py"
retry 6 remote_scp "$ROOT_DIR/mcp_http.py" "${USER_NAME}@${HOST}:/tmp/mmtable_mcp_http.py"
retry 6 remote_ssh "rm -rf /tmp/mmtable_layout_engine && mkdir -p /tmp/mmtable_layout_engine"
retry 6 remote_scp \
  "$ROOT_DIR/layout_engine/__init__.py" \
  "$ROOT_DIR/layout_engine/constants.py" \
  "$ROOT_DIR/layout_engine/document.py" \
  "$ROOT_DIR/layout_engine/ops.py" \
  "${USER_NAME}@${HOST}:/tmp/mmtable_layout_engine/"
retry 6 remote_scp "$ROOT_DIR/assets/favicon.png" "${USER_NAME}@${HOST}:/tmp/mmtable_favicon.png"
retry 6 remote_scp "$ROOT_DIR/assets/apple-touch-icon.png" "${USER_NAME}@${HOST}:/tmp/mmtable_apple_touch_icon.png"
retry 6 remote_ssh "rm -rf /tmp/mmtable_whiteboard_icons && mkdir -p /tmp/mmtable_whiteboard_icons"
retry 6 remote_scp "$ROOT_DIR/assets/whiteboard-icons/"*.svg "${USER_NAME}@${HOST}:/tmp/mmtable_whiteboard_icons/"

echo "3/4 Installing files and restarting gunicorn"
retry 6 remote_ssh "
  install -m 644 /tmp/mmtable_app.js '${REMOTE_APP_DIR}/app.js' &&
  install -m 644 /tmp/mmtable_bitrix_chart.js '${REMOTE_APP_DIR}/bitrix-chart.js' &&
  install -m 644 /tmp/mmtable_draw_tools.js '${REMOTE_APP_DIR}/draw-tools.js' &&
  mkdir -p '${REMOTE_APP_DIR}/vendor' &&
  install -m 644 /tmp/mmtable_perfect_freehand.js '${REMOTE_APP_DIR}/vendor/perfect-freehand.js' &&
  install -m 644 /tmp/mmtable_laser_pointer.js '${REMOTE_APP_DIR}/vendor/laser-pointer.js' &&
  install -m 644 /tmp/mmtable_index.html '${REMOTE_APP_DIR}/index.html' &&
  install -m 644 /tmp/mmtable_styles.css '${REMOTE_APP_DIR}/styles.css' &&
  install -m 644 /tmp/mmtable_server.py '${REMOTE_APP_DIR}/server.py' &&
  install -m 644 /tmp/mmtable_api_v1.py '${REMOTE_APP_DIR}/api_v1.py' &&
  install -m 644 /tmp/mmtable_mcp_http.py '${REMOTE_APP_DIR}/mcp_http.py' &&
  rm -rf '${REMOTE_APP_DIR}/layout_engine' &&
  mkdir -p '${REMOTE_APP_DIR}/layout_engine' &&
  install -m 644 /tmp/mmtable_layout_engine/__init__.py '${REMOTE_APP_DIR}/layout_engine/__init__.py' &&
  install -m 644 /tmp/mmtable_layout_engine/constants.py '${REMOTE_APP_DIR}/layout_engine/constants.py' &&
  install -m 644 /tmp/mmtable_layout_engine/document.py '${REMOTE_APP_DIR}/layout_engine/document.py' &&
  install -m 644 /tmp/mmtable_layout_engine/ops.py '${REMOTE_APP_DIR}/layout_engine/ops.py' &&
  mkdir -p '${REMOTE_APP_DIR}/assets' &&
  install -m 644 /tmp/mmtable_favicon.png '${REMOTE_APP_DIR}/assets/favicon.png' &&
  install -m 644 /tmp/mmtable_apple_touch_icon.png '${REMOTE_APP_DIR}/assets/apple-touch-icon.png' &&
  rm -rf '${REMOTE_APP_DIR}/assets/whiteboard-icons' &&
  mkdir -p '${REMOTE_APP_DIR}/assets/whiteboard-icons' &&
  cp -R /tmp/mmtable_whiteboard_icons/. '${REMOTE_APP_DIR}/assets/whiteboard-icons/' &&
  mkdir -p /root/.gunicorn &&
  if systemctl list-unit-files | grep -q '^mmtable.service'; then
    systemctl restart mmtable.service
  else
    pkill -f \"${GUNICORN_CMD}\" || true &&
    cd '${REMOTE_APP_DIR}' &&
    nohup ${GUNICORN_CMD} >/root/.gunicorn/mmtable.log 2>&1 &
  fi
  sleep 2
"

echo "3b/4 Waiting for gunicorn healthcheck"
retry 12 remote_ssh "curl -fsS --max-time 10 http://127.0.0.1:4173/ >/dev/null"

remote_ssh "
  ps -ef | grep -F '${GUNICORN_CMD}' | grep -v grep | head -1 || true
  echo ---
  curl -I --max-time 10 http://127.0.0.1:4173/ | sed -n '1,10p'
  echo ---
  stat -c '%y %n' '${REMOTE_APP_DIR}/app.js' '${REMOTE_APP_DIR}/bitrix-chart.js' '${REMOTE_APP_DIR}/index.html' '${REMOTE_APP_DIR}/styles.css' '${REMOTE_APP_DIR}/server.py' '${REMOTE_APP_DIR}/api_v1.py' '${REMOTE_APP_DIR}/mcp_http.py'
"

echo "4/4 Checking public URL"
env -u ALL_PROXY -u all_proxy -u HTTP_PROXY -u HTTPS_PROXY -u http_proxy -u https_proxy \
  curl -I --max-time 15 "$PUBLIC_URL" | sed -n '1,12p'

echo "Backup: ${REMOTE_BACKUP_DIR}/${BACKUP_NAME}"
echo "Done. Add an entry to REVIEW.md with this backup name and deploy summary."
