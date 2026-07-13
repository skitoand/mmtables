#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

HOST="${DEPLOY_HOST:-95.163.226.145}"
USER_NAME="${DEPLOY_USER:-root}"
SSH_KEY="${DEPLOY_SSH_KEY:-$HOME/.ssh/lumalms_deploy}"
REMOTE_APP_DIR="${DEPLOY_REMOTE_APP_DIR:-/opt/apps/mmtable}"
PUBLIC_BASE_URL="${PUBLIC_BASE_URL:-https://mmtable.crystalsystems.ru}"

GOOGLE_CLIENT_ID="${GOOGLE_CLIENT_ID:-}"
GOOGLE_CLIENT_SECRET="${GOOGLE_CLIENT_SECRET:-}"

if [[ -z "$GOOGLE_CLIENT_ID" || -z "$GOOGLE_CLIENT_SECRET" ]]; then
  echo "Usage:"
  echo "  GOOGLE_CLIENT_ID=... GOOGLE_CLIENT_SECRET=... bash scripts/setup_google_oauth_prod.sh"
  echo
  echo "Google Cloud Console -> Credentials -> OAuth 2.0 Client ID (Web application):"
  echo "  Authorized JavaScript origins: ${PUBLIC_BASE_URL}"
  echo "  Authorized redirect URIs:      ${PUBLIC_BASE_URL}/auth/google/callback"
  exit 1
fi

SSH_OPTS=(
  -oHostKeyAlgorithms=+ssh-rsa
  -oPubkeyAcceptedAlgorithms=+ssh-rsa
  -oBatchMode=yes
  -oConnectTimeout=10
  -oStrictHostKeyChecking=accept-new
  -i "$SSH_KEY"
)

remote_ssh() {
  ssh "${SSH_OPTS[@]}" "${USER_NAME}@${HOST}" "$@"
}

remote_scp() {
  scp "${SSH_OPTS[@]}" "$@"
}

echo "Reading existing SESSION_SECRET from systemd..."
SESSION_SECRET="$(remote_ssh "tr '\\0' '\\n' < /proc/\$(pgrep -f '${REMOTE_APP_DIR}/.venv/bin/gunicorn' | head -1)/environ | sed -n 's/^SESSION_SECRET=//p' | head -1")"
if [[ -z "$SESSION_SECRET" ]]; then
  SESSION_SECRET="$(python3 - <<'PY'
import secrets
print(secrets.token_hex(32))
PY
)"
fi

TMP_ENV="$(mktemp)"
chmod 600 "$TMP_ENV"
cat >"$TMP_ENV" <<EOF
SESSION_SECRET=${SESSION_SECRET}
GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}
PUBLIC_BASE_URL=${PUBLIC_BASE_URL}
SESSION_COOKIE_SECURE=1
EOF

echo "Uploading .env to ${USER_NAME}@${HOST}:${REMOTE_APP_DIR}/.env"
remote_scp "$TMP_ENV" "${USER_NAME}@${HOST}:/tmp/mmtable.env"
rm -f "$TMP_ENV"

remote_ssh "
  install -m 600 /tmp/mmtable.env '${REMOTE_APP_DIR}/.env' &&
  rm -f /tmp/mmtable.env &&
  if grep -q '^EnvironmentFile=' /etc/systemd/system/mmtable.service 2>/dev/null; then
    sed -i 's|^EnvironmentFile=.*|EnvironmentFile=${REMOTE_APP_DIR}/.env|' /etc/systemd/system/mmtable.service
  else
    sed -i '/^\\[Service\\]/a EnvironmentFile=${REMOTE_APP_DIR}/.env' /etc/systemd/system/mmtable.service
  fi &&
  sed -i '/^Environment=SESSION_SECRET=/d' /etc/systemd/system/mmtable.service &&
  systemctl daemon-reload &&
  systemctl restart mmtable &&
  sleep 2 &&
  systemctl is-active --quiet mmtable &&
  echo 'mmtable service: active'
"

echo "Checking /auth/google on server..."
remote_ssh "curl -sI -H 'Host: mmtable.crystalsystems.ru' -H 'X-Forwarded-Proto: https' 'http://127.0.0.1:4173/auth/google' | sed -n '1,5p'"

echo
echo "Done. Open ${PUBLIC_BASE_URL} and try 'Войти через Google'."
