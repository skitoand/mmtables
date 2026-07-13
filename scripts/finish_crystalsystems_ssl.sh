#!/usr/bin/env bash
set -euo pipefail

DOMAIN="mmtable.crystalsystems.ru"
LEGACY_DOMAIN="mmtable.skitovich.ru"
SERVER_IP="95.163.226.145"
NGINX_SITE="/etc/nginx/sites-available/mmtable"

resolve_ip() {
  dig +short "$DOMAIN" A @8.8.8.8 | head -1
}

echo "Waiting for DNS: $DOMAIN -> $SERVER_IP"
for attempt in $(seq 1 30); do
  ip="$(resolve_ip || true)"
  if [[ "$ip" == "$SERVER_IP" ]]; then
    echo "DNS OK on attempt $attempt"
    break
  fi
  if (( attempt == 30 )); then
    echo "DNS not ready after 30 attempts. Last result: ${ip:-empty}" >&2
    exit 1
  fi
  sleep 20
done

echo "Requesting certificate..."
certbot certonly --nginx -d "$DOMAIN" --non-interactive --agree-tos --register-unsafely-without-email

cat > "$NGINX_SITE" <<NGINX
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name ${DOMAIN};

    client_max_body_size 20m;

    ssl_certificate /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location /static/ {
        alias /opt/apps/mmtable/static/;
        expires 7d;
        add_header Cache-Control "public, max-age=604800";
    }

    location / {
        proxy_pass http://127.0.0.1:4173;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name ${LEGACY_DOMAIN};

    ssl_certificate /etc/letsencrypt/live/${LEGACY_DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${LEGACY_DOMAIN}/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    return 301 https://${DOMAIN}\$request_uri;
}

server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN} ${LEGACY_DOMAIN} ${SERVER_IP};

    return 301 https://${DOMAIN}\$request_uri;
}
NGINX

nginx -t
systemctl reload nginx

echo "Done."
curl -I --max-time 10 "https://${DOMAIN}/" | sed -n '1,8p'
curl -I --max-time 10 "https://${LEGACY_DOMAIN}/" | sed -n '1,8p'
