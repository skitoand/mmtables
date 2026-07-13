# Deploy to Production

Краткая инструкция для деплоя проекта `MIndMapTable` / `mmtables` на прод.

## Репозиторий

- GitHub: `https://github.com/skitoand/mmtables`
- Основная ветка: `main`
- Локальный remote: `origin` → `git@github.com:skitoand/mmtables.git`

## Production

- URL: `https://mmtable.crystalsystems.ru`
- Legacy URL (redirect): `https://mmtable.skitovich.ru`
- Server IP: `95.163.226.145`
- SSH user: `root`
- SSH key: `~/.ssh/lumalms_deploy`
- Remote app dir: `/opt/apps/mmtable`
- Backup dir: `/opt/apps/backups`
- Internal app bind: `127.0.0.1:4173`

## SSH Access

```bash
ssh -oHostKeyAlgorithms=+ssh-rsa \
    -oPubkeyAcceptedAlgorithms=+ssh-rsa \
    -oBatchMode=yes \
    -oConnectTimeout=10 \
    -oStrictHostKeyChecking=accept-new \
    -i ~/.ssh/lumalms_deploy \
    root@95.163.226.145
```

## Gunicorn

```bash
/opt/apps/mmtable/.venv/bin/gunicorn -w 2 -b 127.0.0.1:4173 server:app
```

## Files to Deploy

Обычно нужно выкладывать весь runtime-комплект:

- `app.js`
- `index.html`
- `styles.css`
- `server.py`
- `Иконка Формат.svg`
- `assets/favicon.png`
- `assets/apple-touch-icon.png`

Если затрагивается состояние документов, учитывать также:

- `/opt/apps/mmtable/workspace.db`

## Обязательный порядок деплоя

Основной способ публикации — **через GitHub**:

1. **Локально** — закоммитить изменения в `main`
2. **Push** — `git push origin main`
3. **GitHub Actions** — workflow `.github/workflows/deploy.yml` автоматически:
   - создаёт бэкап на сервере в `/opt/apps/backups/`
   - выкладывает файлы из коммита на прод
   - перезапускает gunicorn
   - проверяет публичный URL
4. **Запись в `REVIEW.md`** — после успешной выкладки добавить запись: дата, commit SHA, имя файла бэкапа, список изменений, ссылка на GitHub Actions run, результат проверки

### Первичная настройка GitHub Actions

Один раз настроить secrets в репозитории:

```bash
bash scripts/setup_github_deploy.sh
```

Скрипт записывает в GitHub secrets:

- `DEPLOY_SSH_KEY` — приватный ключ `~/.ssh/lumalms_deploy`
- `DEPLOY_HOST` — `95.163.226.145`
- `DEPLOY_USER` — `root`

Ручной запуск деплоя без нового коммита: GitHub → Actions → Deploy Production → Run workflow.

### Ручной деплой (запасной)

Если Actions недоступен, можно выкладывать с локальной машины:

```bash
bash scripts/deploy_prod.sh
```

Порядок тот же: бэкап → деплой → `REVIEW.md`.

### Зачем бэкап

- Откат кода одной командой (`tar -xzf` + перезапуск gunicorn).
- Если баг уже испортил `layout_json` через автосохранение, откат только `app.js` не вернёт документы — нужен `workspace.db` из того же архива.
- Бэкапы на сервере не зависят от локального git и не теряются при сбросе рабочей копии.

### Зачем REVIEW.md

- Журнал выкладок: что, когда и с каким бэкапом ушло на прод.
- Быстрый откат: по имени архива из журнала не нужно искать `ls -lt` на сервере.
- Контекст для Cursor и для себя: какие фичи уже на проде, что проверять после обновления.

Без записи в `REVIEW.md` деплой считается незавершённым.

## Standard Deploy

Основной способ:

```bash
git add ...
git commit -m "..."
git push origin main
```

Запасной локальный способ:

```bash
bash scripts/deploy_prod.sh
```

Скрипт по умолчанию использует:

- `DEPLOY_HOST=95.163.226.145`
- `DEPLOY_USER=root`
- `DEPLOY_SSH_KEY=~/.ssh/lumalms_deploy`

## Verification

Проверка на сервере:

```bash
curl -I http://127.0.0.1:4173/
```

Проверка снаружи:

```bash
curl -I https://mmtable.crystalsystems.ru/
```

## Important Notes

- Источник истины для прода — ветка `main` в GitHub.
- Локальные изменения попадают на прод только после `git push origin main`.
- При выкладке деплоится весь runtime-комплект, а не выборочно один файл.
- Скрипт `scripts/deploy_prod.sh` сам делает серверный бэкап перед заменой файлов.
- После каждого деплоя обновлять `REVIEW.md` (см. раздел «Обязательный порядок деплоя»).
- Если проблемный код успел изменить `layout_json` через автосохранение, одного отката кода недостаточно: может понадобиться восстановление `workspace.db` из бэкапа.
- Документы хранятся в `/opt/apps/mmtable/workspace.db`.
