#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPO_SLUG="${GITHUB_REPO:-skitoand/mmtables}"

echo "Configuring GitHub deploy secrets for ${REPO_SLUG}"

if ! command -v gh >/dev/null 2>&1; then
  echo "gh CLI is required. Install: https://cli.github.com/" >&2
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "Run: gh auth login" >&2
  exit 1
fi

SSH_KEY_PATH="${DEPLOY_SSH_KEY:-$HOME/.ssh/lumalms_deploy}"
if [[ ! -f "$SSH_KEY_PATH" ]]; then
  echo "SSH key not found: $SSH_KEY_PATH" >&2
  exit 1
fi

gh secret set DEPLOY_SSH_KEY --repo "$REPO_SLUG" < "$SSH_KEY_PATH"
gh secret set DEPLOY_HOST --repo "$REPO_SLUG" --body "${DEPLOY_HOST:-95.163.226.145}"
gh secret set DEPLOY_USER --repo "$REPO_SLUG" --body "${DEPLOY_USER:-root}"

echo "Secrets configured:"
gh secret list --repo "$REPO_SLUG"

echo
echo "Deploy workflow:"
echo "  1. commit changes locally"
echo "  2. git push origin main"
echo "  3. GitHub Actions runs scripts/deploy_prod.sh"
echo
echo "Manual deploy from GitHub UI: Actions -> Deploy Production -> Run workflow"
