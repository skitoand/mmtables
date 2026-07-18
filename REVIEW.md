# Review — журнал выкладок MIndMapTable

Прод: https://mmtable.crystalsystems.ru  
Сервер: `95.163.226.145` (`/opt/apps/mmtable`)  
Бэкапы: `/opt/apps/backups/`

Формат записи: дата → commit → бэкап → что выкатили → проверка → GitHub Actions (если через CI).

После каждого деплоя на прод сюда добавляется новая запись (вручную или агентом Cursor).

---

## 2026-07-18 — OAuth 2.1 для ChatGPT MCP

**Commit:** `a193192` — Add OAuth 2.1 for ChatGPT MCP connectors.  
**Бэкап:** `mmtable-PROD-BACKUP-20260718-184012-before-deploy.tar.gz`  
**Деплой:** GitHub Actions [Deploy Production #29656312113](https://github.com/skitoand/mmtables/actions/runs/29656312113)  
**Статус:** OK

### Выкатано

| Файл | Назначение |
|------|------------|
| `mcp_oauth.py` | discovery, DCR/CIMD, authorize/token, PKCE, `oat_` tokens |
| `mcp_http.py` | `WWW-Authenticate` на 401; MCP только Bearer (не session cookie) |
| `server.py` | wiring OAuth + приём OAuth Bearer |
| `docs/MCP.md` | инструкция ChatGPT OAuth + Cursor PAT |
| `scripts/deploy_prod.sh` | выкладка `mcp_oauth.py` |

### Проверка на проде

- [x] `/.well-known/oauth-protected-resource` → resource `/mcp`
- [x] `/.well-known/oauth-authorization-server` → CIMD + S256
- [x] `POST /mcp` без токена → 401 + `WWW-Authenticate`
- [ ] ChatGPT: добавить connector URL → логин MM Table → tools

---

## 2026-07-18 — MCP remote + PAT + object API

**Commit:** `52d026d` — Include MCP Python modules in production deploy package. (feature: `bbc21db`)  
**Бэкап:** `mmtable-PROD-BACKUP-20260718-162048-before-deploy.tar.gz`  
**Деплой:** GitHub Actions [Deploy Production #29651770697](https://github.com/skitoand/mmtables/actions/runs/29651770697)  
**Статус:** OK

### Выкатано

| Файл | Назначение |
|------|------------|
| `server.py` | PAT (`api_tokens`), Bearer auth, `/api/me/tokens`, `/api/mcp/config` |
| `layout_engine/` | серверные мутации shapes/tables/BP/connectors |
| `api_v1.py` | object-level REST `/api/v1` |
| `mcp_http.py` | Streamable HTTP MCP на `/mcp` |
| `app.js` / `index.html` / `styles.css` | UI токенов в Профиле |
| `docs/MCP.md`, `docs/MCP_LAYOUT_CONTRACT.md` | документация |
| `scripts/deploy_prod.sh` | выкладка новых Python-модулей |

### Проверка на проде

- [x] публичный URL → 200
- [x] `POST /mcp` без токена → 401
- [ ] Профиль → создать MCP-токен → Cursor tools/list

---

## 2026-07-18 — независимое выравнивание текста + вход в редактирование из share

**Commit:** `f44182d` — Fix independent text align buttons and shared-doc edit entry.  
**Бэкап:** `mmtable-PROD-BACKUP-20260718-151221-before-deploy.tar.gz`  
**Деплой:** GitHub Actions [Deploy Production #29649519161](https://github.com/skitoand/mmtables/actions/runs/29649519161)  
**Статус:** OK

### Выкатано

| Файл | Назначение |
|------|------------|
| `app.js` | горизонталь/вертикаль текста больше не переписывают друг друга; публичная ссылка остаётся view-only, при личном доступе — кнопка «Открыть для редактирования» |
| `index.html` | cache-buster `align-axes-independent` |

### Проверка на проде

- [x] публичный URL → 200
- [ ] hard refresh → выделить 2 фигуры: Left+Middle → клик Center → остаётся Center+Middle

---

## 2026-07-17 — шеврон: превью, жёлтый буллит, линия

**Commit:** `f36863e` — Fix chevron place preview, yellow depth handle, and missing SVG border.  
**Бэкап:** `mmtable-PROD-BACKUP-20260717-113102-before-deploy.tar.gz`  
**Деплой:** GitHub Actions [Deploy Production #29577093241](https://github.com/skitoand/mmtables/actions/runs/29577093241)  
**Статус:** OK

### Выкатано

| Файл | Назначение |
|------|------------|
| `app.js` | превью шеврона при создании; жёлтый буллит в overlay; цвет линии SVG хранится в `dataset.borderColor` (больше не пропадает) |
| `styles.css` | показ `.shape-param-handle` в overlay; SVG place-preview |
| `index.html` | cache-buster `chevron-border-fix-v1` |

### Проверка на проде

- [x] публичный URL → 200
- [ ] hard refresh → создать шеврон: сразу форма + жёлтый буллит + чёрная линия 1pt

---

## 2026-07-17 — выравнивание стадий БП в одну строку

**Commit:** `a8e45cd` — Align BP stages to a single row on every relayout.  
**Бэкап:** `mmtable-PROD-BACKUP-20260717-075601-before-deploy.tar.gz`  
**Деплой:** GitHub Actions [Deploy Production #29564677532](https://github.com/skitoand/mmtables/actions/runs/29564677532)  
**Статус:** OK

### Выкатано

| Файл | Назначение |
|------|------------|
| `app.js` | `relayoutBpStagesAfter` выравнивает все стадии по общему `rowTop` (min top); исправляет «уехавшие вниз» при загрузке |
| `index.html` | cache-buster `bp-stage-row-align-v1` |

### Проверка на проде

- [x] публичный URL → 200
- [ ] hard refresh → документ «электрик»: все стадии РАСЧЕТ в одну строку

---

## 2026-07-17 — перетаскивание стадий БП с задачами

**Commit:** `7ea0922` — Drag BP stages with their tasks and reindex on drop.  
**Бэкап:** `mmtable-PROD-BACKUP-20260717-074914-before-deploy.tar.gz`  
**Деплой:** GitHub Actions [Deploy Production #29564303368](https://github.com/skitoand/mmtables/actions/runs/29564303368)  
**Статус:** OK

### Выкатано

| Файл | Назначение |
|------|------------|
| `app.js` | drag стадии двигает её задачи; по отпусканию — reindex `0..n-1`, relayout цепочки и задач |
| `index.html` | cache-buster `bp-stage-drag-reorder-v1` |

### Проверка на проде

- [x] публичный URL → 200
- [ ] hard refresh → перетащить стадию в другой слот; задачи едут вместе; «+» справа вставляет рядом

---

## 2026-07-17 — без автовыделения всей группы БП

**Commit:** `c97f6c1` — Disable auto group selection for sequential BP shapes.  
**Бэкап:** `mmtable-PROD-BACKUP-20260717-074640-before-deploy.tar.gz`  
**Деплой:** GitHub Actions [Deploy Production #29564165609](https://github.com/skitoand/mmtables/actions/runs/29564165609)  
**Статус:** OK

### Выкатано

| Файл | Назначение |
|------|------------|
| `app.js` | клик/ПКМ/создание/вставка БП больше не вызывают `selectGroup`; выделяется одна фигура; `groupId` и связи стадий/задач без изменений |
| `index.html` | cache-buster `bp-no-auto-group-select-v1` |

### Проверка на проде

- [x] публичный URL → 200
- [ ] hard refresh → клик по стадии выделяет только её, без синей рамки на весь процесс

---

## 2026-07-17 — relayout стадий БП сразу после удаления

**Commit:** `f93c07f` — Relayout BP stages immediately after stage deletion.  
**Бэкап:** `mmtable-PROD-BACKUP-20260717-074238-before-deploy.tar.gz`  
**Деплой:** GitHub Actions [Deploy Production #29563939388](https://github.com/skitoand/mmtables/actions/runs/29563939388)  
**Статус:** OK

### Выкатано

| Файл | Назначение |
|------|------------|
| `app.js` | после удаления стадии — compact индексов, relayout цепочки, удаление задач без стадии; `getBpStageLeftAfter` по logical box |
| `index.html` | cache-buster `bp-stage-delete-relayout-v1` |

### Проверка на проде

- [x] публичный URL → 200
- [ ] hard refresh → удалить стадию из середины — остальные сдвигаются сразу, без reload

---

## 2026-07-16 — вставка стадии БП по визуальному порядку

**Commit:** `ef9a557` — Fix BP stage insert to use visual order and relayout immediately.  
**Бэкап:** `mmtable-PROD-BACKUP-20260716-134419-before-deploy.tar.gz`  
**Деплой:** GitHub Actions [Deploy Production #29503464745](https://github.com/skitoand/mmtables/actions/runs/29503464745)  
**Статус:** OK

### Выкатано

| Файл | Назначение |
|------|------------|
| `app.js` | «+» слева/справа вставляет по `offsetLeft`; reindex `0..n-1`; `relayout` сразу; то же после drag/delete стадии |
| `index.html` | cache-buster `bp-stage-insert-visual-v1` |

### Проверка на проде

- [x] публичный URL → 200
- [ ] hard refresh → «+» справа от стадии ставит новую сразу справа, без прыжка после reload

---

## 2026-07-14 — значок заметки всегда виден

**Commit:** `118d821` — Show attached-note badges on all shapes, not only when selected.  
**Бэкап:** `mmtable-PROD-BACKUP-20260714-173225-before-deploy.tar.gz`  
**Деплой:** ручной `scripts/deploy_prod.sh`  
**Статус:** OK

### Выкатано

| Файл | Назначение |
|------|------------|
| `app.js` | `syncAttachedNoteBadge` рисует значки для всех фигур с свёрнутой заметкой; клик сразу открывает заметку |
| `index.html` | cache-buster `note-badge-always-v1` |

### Проверка на проде

- [x] публичный URL → 200
- [ ] hard refresh → значок заметки виден без выделения фигуры
- [ ] клик по значку открывает заметку

---

## 2026-07-14 — прокрутка текста фигур по наведению

**Commit:** `6df3727` — Scroll shape text on hover like tables, without entering edit mode.  
**Бэкап:** `mmtable-PROD-BACKUP-20260714-143322-before-deploy.tar.gz`  
**Деплой:** ручной `scripts/deploy_prod.sh`  
**Статус:** OK

### Выкатано

| Файл | Назначение |
|------|------------|
| `app.js` | `findScrollableWheelTarget` находит `.shape-text` под курсором (даже с `pointer-events:none`) |
| `index.html` | cache-buster `shape-text-hover-scroll-v1` |

### Проверка на проде

- [x] публичный URL → 200
- [ ] hard refresh → колесо над заметкой/фигурой с длинным текстом скроллит без входа в редактирование

---

## 2026-07-14 — без браузерного меню при Ctrl-соединителях

**Commit:** `251c049` — Suppress browser context menu during Ctrl connector pulls.  
**Бэкап:** `mmtable-PROD-BACKUP-20260714-140524-before-deploy.tar.gz`  
**Деплой:** ручной `scripts/deploy_prod.sh`  
**Статус:** OK

### Выкатано

| Файл | Назначение |
|------|------------|
| `app.js` | блокировка browser contextmenu на `.conn-arrow` и при Ctrl+/черновике соединителя (macOS Ctrl+click) |
| `index.html` | cache-buster `ctrl-connector-no-menu-v1` |

### Проверка на проде

- [x] публичный URL → 200
- [ ] hard refresh → Ctrl + тянуть синюю стрелку без меню браузера

---

## 2026-07-14 — фикс иконки «Текст» (404 whiteboard-icons)

**Commit:** (локальный, pending push) — fix text.svg deploy nesting + letter A icon  
**Бэкап:** `mmtable-PROD-BACKUP-20260714-114858-before-deploy.tar.gz`  
**Деплой:** ручной `scripts/deploy_prod.sh`  
**Статус:** OK

### Причина

`scp -r` в существовавший `/tmp/mmtable_whiteboard_icons` создавал вложенную папку → `text.svg` оказывался в `assets/whiteboard-icons/whiteboard-icons/text.svg` и отдавал 404. В тулбаре вместо «A» был битый placeholder.

### Выкатано

| Файл | Назначение |
|------|------------|
| `scripts/deploy_prod.sh` | заливка `*.svg` плоско без вложенной директории |
| `assets/whiteboard-icons/text.svg` | иконка буквы A; лежит в правильном пути на проде |

### Проверка на проде

- [x] `GET /assets/whiteboard-icons/text.svg` → 200
- [x] нет nested `assets/whiteboard-icons/whiteboard-icons/`
- [ ] hard refresh → в объектах иконка «A» у кнопки «Текст»

---

## 2026-07-14 — инструмент «Текст» (A) на рабочем столе

**Commit:** `46f6182` — Add text tool that places caret-first labels without fill or border.  
**Бэкап:** `mmtable-PROD-BACKUP-20260714-114400-before-deploy.tar.gz`  
**Деплой:** ручной `scripts/deploy_prod.sh` (push в GitHub временно недоступен из‑за SOCKS/proxy)  
**GitHub Actions:** не запускался  
**Статус:** OK

### Выкатано

| Файл | Назначение |
|------|------------|
| `app.js` | инструмент «Текст»: клик → мигающий курсор; Enter/клик вне — фигура без заливки и обводки; без рамки во время ввода; автовыход из инструмента после сохранения |
| `draw-tools.js` | сброс shape-place tool при переключении на рисование/лазер |
| `styles.css` | `text-tool-active`, `shape-text-tool`, скрытие selection chrome в режиме `is-text-placing` |
| `index.html` | cache-buster `text-tool-v3` |
| `assets/whiteboard-icons/text.svg` | иконка A в тулбаре объектов |

### Проверка на проде

- [x] gunicorn / публичный URL → 200
- [x] `index.html` отдаёт `app.js?v=20260714-text-tool-v3`
- [x] на сервере есть `assets/whiteboard-icons/text.svg` и код `placeTextShapeAtEvent`
- [ ] hard refresh → кнопка «Текст» в объектах
- [ ] клик по столу → курсор без рамки; Enter → обычная фигура; инструмент выключается

---

## 2026-07-13 — объекты, рисование/лазер, Ctrl/Alt коннекторы, тёмный БП

**Commit:** `9bc333c` — Add objects toolbar, draw/laser tools, and BP dark theme.  
**Бэкап:** `mmtable-PROD-BACKUP-20260713-192226-before-deploy.tar.gz`  
**GitHub Actions:** [run #29278196011](https://github.com/skitoand/mmtables/actions/runs/29278196011) — success  
**Статус:** OK

### Выкатано

| Файл | Назначение |
|------|------------|
| `app.js` | тулбар «Объекты»; голубые стрелки по Ctrl, жёлтые ячеек по Alt; тёмные цвета base/стадий БП при смене темы |
| `draw-tools.js` | рисование (7) и лазерная указка (K) |
| `vendor/perfect-freehand.js`, `vendor/laser-pointer.js` | библиотеки freehand/лазера |
| `assets/whiteboard-icons/` | иконки меню объектов и палитры |
| `styles.css` | стили objects-toolbar, ctrl-connector-mode, тёмная тема задач БП |
| `index.html` | переключатели Форматирование/Объекты; cache-buster `bp-dark-stages-v1` |
| `bitrix-chart.js` | мелкие правки под текущий runtime |
| `scripts/deploy_prod.sh` | деплой draw-tools, vendor и whiteboard-icons |

### Проверка на проде

- [x] GitHub Actions завершился успешно
- [x] gunicorn healthcheck → 200 (в workflow)
- [ ] hard refresh → тулбар «Объекты», рисование/лазер
- [ ] Ctrl → голубые стрелки; Alt у ячейки → жёлтые
- [ ] тёмная тема: фон и стадии БП не остаются светлыми

---

## 2026-07-13 — Bitrix24: тень, автообновление, загрузка, расширенный фильтр, фреймы

**Commit:** `2640ff2` — Improve Bitrix24 widgets: shadow format, refresh, loading, and filters.  
**Бэкап:** `mmtable-PROD-BACKUP-20260713-154505-before-deploy.tar.gz`  
**GitHub Actions:** [run #29263535744](https://github.com/skitoand/mmtables/actions/runs/29263535744) — success  
**Статус:** OK

### Выкатано

| Файл | Назначение |
|------|------------|
| `bitrix-chart.js` | тень через панель формата; автообновление графиков/карточек при смене фильтра; кэш GET (45 с) и серверный кэш stage history/fields; индикаторы загрузки; фильтр по любому полю (дата и списки) |
| `app.js` | формат тени для графика/фильтра; геометрическая привязка к фрейму; инструмент «Фрейм»; refresh вместо rebuild при загрузке layout |
| `server.py` | кэш stage history и fields meta (60 с) |
| `index.html` | фрейм в палитре; настройки расширенного фильтра; подсказка webhook |
| `styles.css` | убраны жёсткие тени у Bitrix-карточек; стили оверлея загрузки |

### Проверка на проде

- [x] GitHub Actions завершился успешно
- [x] gunicorn healthcheck → 200 (в workflow)
- [ ] hard refresh → тень в панели формата у графика/фильтра/карточки
- [ ] смена фильтра обновляет график без перезагрузки страницы
- [ ] при загрузке данных виден спиннер/статус

---

## 2026-07-13 — фикс: Bitrix webhook на проде (bitrix-chart.js не деплоился)

**Commit:** `a5d1cc1` — Fix deploy backup when bitrix-chart.js is not yet on the server. (включает `c2da5ee` — добавление файла в deploy)  
**Бэкап:** `mmtable-PROD-BACKUP-20260713-123143-before-deploy.tar.gz`  
**GitHub Actions:** [run #29250191217](https://github.com/skitoand/mmtables/actions/runs/29250191217) — success  
**Статус:** OK

### Причина

`index.html` подключал `bitrix-chart.js`, но скрипт деплоя его не выкладывал → 404 на проде → кнопка «Подключить» в профиле не работала (логика в `bitrix-chart.js`).

### Выкатано

| Файл | Назначение |
|------|------------|
| `scripts/deploy_prod.sh` | деплой `bitrix-chart.js`; бэкап не падает, если файла ещё нет на сервере |
| `DEPLOY.md` | `bitrix-chart.js` в списке runtime-файлов |
| прод | `bitrix-chart.js` → HTTP 200 |

### Проверка на проде

- [x] GitHub Actions завершился успешно
- [x] `curl -I http://127.0.0.1:4173/bitrix-chart.js` → 200
- [ ] подключение webhook в профиле — проверить вручную после hard refresh

---

## 2026-07-13 — график Bitrix24: количество или сумма по полю

**Commit:** `cd5ed33` — Add count or sum-by-field metric selection to Bitrix24 chart settings.  
**Бэкап:** `mmtable-PROD-BACKUP-20260713-122259-before-deploy.tar.gz`  
**GitHub Actions:** [run #29249637198](https://github.com/skitoand/mmtables/actions/runs/29249637198) — success  
**Статус:** OK

### Выкатано

| Файл | Назначение |
|------|------------|
| `index.html` | в настройках графика: показатель «Количество» / «Сумма по полю» и выбор поля |
| `bitrix-chart.js` | сохранение metric/sumField в конфиге графика, форматирование значений и легенды |
| `server.py` | chart-data суммирует выбранное поле по входам на стадию в каждый период |

### Проверка на проде

- [x] GitHub Actions завершился успешно
- [x] gunicorn healthcheck → 200 (в workflow)
- [x] локально проверено: в ⚙ графика доступны показатель и поле для суммы

---

## 2026-07-13 — виджеты Bitrix24: график, карточка, фильтр дат

**Commit:** `560fc2f` — Add Bitrix24 charts, KPI cards, and date filter widgets to the workspace.  
**Бэкап:** `mmtable-PROD-BACKUP-20260713-121539-before-deploy.tar.gz`  
**GitHub Actions:** [run #29249187010](https://github.com/skitoand/mmtables/actions/runs/29249187010) — success  
**Статус:** OK

### Выкатано

| Файл | Назначение |
|------|------------|
| `bitrix-chart.js` | график, KPI-карточка и фильтр дат Bitrix24; формат дат на оси `dd.mm` под 45°; кэш справочников и мгновенное открытие настроек |
| `server.py` | API Bitrix24: воронки, стадии, поля, chart-data, card-data; карточка и график считают входы на стадию через stage history |
| `app.js` | контекстное меню Bitrix24, формулы по карточкам, форматирование KPI, интеграция с профилем |
| `index.html` | модалки настроек графика/карточки/фильтра, блок webhook в профиле |
| `styles.css` | стили виджетов Bitrix24 |

### Проверка на проде

- [x] GitHub Actions завершился успешно
- [x] gunicorn healthcheck → 200 (в workflow)
- [ ] `curl -I https://mmtable.crystalsystems.ru/` — не проверено с локальной машины (SSL timeout)
- [x] локально проверено: карточка и график совпадают по сумме за период; настройки карточки открываются сразу

---

## 2026-07-13 — поля «Поля» задают отступ текста, а не позицию фигуры

**Commit:** `473e54d` — Fix text margin controls to adjust padding inside shapes, not shape bounds.  
**Бэкап:** `mmtable-PROD-BACKUP-20260713-103258-before-deploy.tar.gz`  
**GitHub Actions:** [run #29243130622](https://github.com/skitoand/mmtables/actions/runs/29243130622) — success  
**Статус:** OK

### Выкатано

| Файл | Назначение |
|------|------------|
| `app.js` | поля «Поля» управляют `padding` текста в px (сверху/снизу/слева/справа/общие), значения сохраняются в документе |
| `index.html` | добавлен `fpR` (справа), дефолт отступов 10 px |

### Проверка на проде

- [x] GitHub Actions завершился успешно
- [x] gunicorn healthcheck → 200
- [x] `curl -I https://mmtable.crystalsystems.ru/` → 200
- [x] локально проверено: отступы двигают текст внутри фигуры, рамка выделения не съезжает

---

## 2026-07-13 — выделение не масштабируется с zoom

**Commit:** `286ea9c` — Keep shape selection chrome at a constant screen size across zoom levels.  
**Бэкап:** `mmtable-PROD-BACKUP-20260713-100223-before-deploy.tar.gz`  
**GitHub Actions:** [run #29241301015](https://github.com/skitoand/mmtables/actions/runs/29241301015) — success  
**Статус:** OK

### Выкатано

| Файл | Назначение |
|------|------------|
| `styles.css` | рамка, маркеры и стрелки соединителей компенсируют `--desktop-zoom`, остаются одного экранного размера |
| `app.js` | `--desktop-zoom`, пересчёт padding/offset при zoom, relayout стрелок и group selection box |

### Проверка на проде

- [x] GitHub Actions завершился успешно
- [x] gunicorn healthcheck → 200
- [x] `curl -I https://mmtable.crystalsystems.ru/` → 200
- [x] локально проверено: при 83% и 200% zoom рамка и буллеты не меняют размер

---

## 2026-07-13 — аккуратное выделение фигур

**Commit:** `1aa2c6c` — Refine shape selection frame and resize handles for a cleaner look.  
**Бэкап:** `mmtable-PROD-BACKUP-20260713-094637-before-deploy.tar.gz`  
**GitHub Actions:** [run #29240360268](https://github.com/skitoand/mmtables/actions/runs/29240360268) — success  
**Статус:** OK

### Выкатано

| Файл | Назначение |
|------|------------|
| `styles.css` | тонкая фиолетовая рамка выделения `#6965db`, квадратные маркеры 8×8 px вместо зелёных кругов 22 px |
| `app.js` | константа `SHAPE_SELECTION_PAD = 4` для позиционирования рамки и group selection box |

### Проверка на проде

- [x] GitHub Actions завершился успешно
- [x] gunicorn healthcheck → 200
- [x] `curl -I https://mmtable.crystalsystems.ru/` → 200
- [x] локально проверено: ресайз за углы/стороны и голубые стрелки соединителей работают

---

## 2026-07-13 — docs-only коммиты не запускают автодеплой

**Commit:** `e30db0c` — Skip GitHub deploy on documentation-only commits.  
**Бэкап:** `mmtable-PROD-BACKUP-20260713-093247-before-deploy.tar.gz`  
**GitHub Actions:** [run #29239512985](https://github.com/skitoand/mmtables/actions/runs/29239512985) — success  
**Статус:** OK (runtime без изменений)

### Выкатано

| Файл | Назначение |
|------|------------|
| `.github/workflows/deploy.yml` | `paths-ignore`: `REVIEW.md`, `DEPLOY.md`, `AGENTS.md` — правки документации не дергают прод |

### Проверка на проде

- [x] GitHub Actions завершился успешно
- [x] последующие push только с REVIEW.md не запускают workflow

---

**Commit:** `81a3180` — Add REVIEW.md entry for the deploy journal documentation commit.  
**Бэкап:** `mmtable-PROD-BACKUP-20260713-093145-before-deploy.tar.gz`  
**GitHub Actions:** [run #29239449123](https://github.com/skitoand/mmtables/actions/runs/29239449123)  
**Статус:** OK (runtime без изменений; последний автодеплой только из‑за правки REVIEW.md)

### Выкатано

| Файл | Назначение |
|------|------------|
| `REVIEW.md` | дополнена запись о `27c0a78` |

### Проверка на проде

- [x] gunicorn и публичный URL → 200

---

**Commit:** `27c0a78` — Document today's deploys in REVIEW.md and formalize post-deploy journal updates.  
**Бэкап:** `mmtable-PROD-BACKUP-20260713-093041-before-deploy.tar.gz`  
**GitHub Actions:** [run #29239378993](https://github.com/skitoand/mmtables/actions/runs/29239378993) — success  
**Статус:** OK (runtime на проде без изменений)

### Выкатано

| Файл | Назначение |
|------|------------|
| `REVIEW.md` | записи о выкладках 2026-07-13 (GitHub Actions, sync, healthcheck, иконка) |
| `DEPLOY.md`, `AGENTS.md` | формат REVIEW: commit SHA + ссылка на Actions run |

### Проверка на проде

- [x] GitHub Actions завершился успешно
- [x] `curl -I https://mmtable.crystalsystems.ru/` → 200

---

**Commit:** `4d0b1cb` — Add MMTABLE source icon asset.  
**Бэкап:** `mmtable-PROD-BACKUP-20260713-092530-before-deploy.tar.gz`  
**GitHub Actions:** [run #29239037370](https://github.com/skitoand/mmtables/actions/runs/29239037370) — success  
**Статус:** OK (runtime на проде без изменений)

### Выкатано

| Файл | Назначение |
|------|------------|
| `Иконка MMTABLE.png` | исходник иконки в git; **не** входит в `deploy_prod.sh`, на сервер не копируется |

### Проверка на проде

- [x] GitHub Actions завершился успешно
- [x] `curl -I https://mmtable.crystalsystems.ru/` → 200

---

## 2026-07-13 — фикс healthcheck в deploy_prod.sh

**Commit:** `967c0cc` — Fix deploy healthcheck so GitHub Actions does not fail on gunicorn grep race.  
**Бэкап:** `mmtable-PROD-BACKUP-20260713-085027-before-deploy.tar.gz`  
**GitHub Actions:** [run #29236840923](https://github.com/skitoand/mmtables/actions/runs/29236840923) — success  
**Статус:** OK

### Выкатано

| Файл | Назначение |
|------|------------|
| `scripts/deploy_prod.sh` | healthcheck через `curl` вместо обязательного `grep gunicorn`; CI больше не падает на гонке процессов |

### Проверка на проде

- [x] GitHub Actions завершился успешно
- [x] gunicorn и публичный URL отвечают 200

---

## 2026-07-13 — переход на деплой через GitHub Actions + синхронизация main с продом

**Commits:** `b594098` (workflow) + `7a556dc` (sync prod state); также в push: `ef49886`, `ec70d16`, `289bc52`  
**Бэкап:** `mmtable-PROD-BACKUP-20260713-084837-before-deploy.tar.gz`  
**GitHub Actions:** [run #29236733442](https://github.com/skitoand/mmtables/actions/runs/29236733442) — failure в CI, **прод обновлён** (известная гонка `grep gunicorn`)  
**Статус:** OK на проде; CI исправлен в `967c0cc`

### Выкатано

| Файл | Назначение |
|------|------------|
| `.github/workflows/deploy.yml` | автодеплой при `push` в `main` |
| `scripts/deploy_prod.sh` | деплой по SSH; поддержка `DEPLOY_SSH_KEY_CONTENT` для CI |
| `scripts/setup_github_deploy.sh` | настройка secrets в GitHub |
| `DEPLOY.md`, `AGENTS.md` | документация нового процесса |
| `app.js`, `index.html`, `styles.css`, `server.py` | синхронизация git с текущим продом |
| `assets/*` | favicon, apple-touch-icon, иконки БП |
| `docs/`, `scripts/`, `REVIEW.md`, прочие | вспомогательные файлы в репозитории |

### Проверка на проде

- [x] `app.js` на сервере 687689 байт — совпадает с продом до выкладки
- [x] gunicorn и `https://mmtable.crystalsystems.ru/` → 200
- [x] Secrets `DEPLOY_SSH_KEY`, `DEPLOY_HOST`, `DEPLOY_USER` настроены

---

## 2026-07-06 — новый БП без пользовательского стиля прямоугольника

**Бэкап:** `mmtable-PROD-BACKUP-20260706-130431-before-deploy.tar.gz`  
**Статус:** OK (`20260706-bp-create-factory-style`)

### Выкатано

| Файл | Назначение |
|------|------------|
| `app.js` | при создании БП (base/stage/task) не применяется `defaultStyles['shape-rect']`; заводские `BP_FACTORY_VISUAL_OPTS` |
| `index.html` | cache-buster `20260706-bp-create-factory-style` |

### Проверка на проде

- [ ] Создать «Последовательный бизнес-процесс» → ступенчатые синие стадии, без градиента/тени/скругления
- [ ] Сброс стиля БП по-прежнему восстанавливает шаблон

---

## 2026-07-06 — сброс стиля БП к заводскому шаблону

**Бэкап:** `mmtable-PROD-BACKUP-20260706-124552-before-deploy.tar.gz`  
**Статус:** OK (`20260706-bp-reset-factory-style`)

### Выкатано

| Файл | Назначение |
|------|------------|
| `app.js` | `restoreBpProcessFactoryStyles()` — для БП восстанавливает шаблон (цвета стадий, без градиента/тени/скругления), а не `defaultStyles['shape-rect']` |
| `index.html` | cache-buster `20260706-bp-reset-factory-style` |

### Проверка на проде

- [ ] Выделить группу БП → «Сбросить к стилю по умолчанию» → ступенчатые синие стадии, зелёная последняя, лавандовая подложка, без градиента и тени
- [ ] Обычный прямоугольник по-прежнему сбрасывается к сохранённому пользовательскому стилю

---

## 2026-07-06 — кнопка «Сбросить к стилю по умолчанию»

**Бэкап скрипта деплоя:** `mmtable-PROD-BACKUP-20260706-113843-before-deploy.tar.gz`  
**Статус:** OK (`20260706-reset-default-style`)

### Выкатано

| Файл | Назначение |
|------|------------|
| `app.js` | `resetCurrentStyleToDefault()` — применяет сохранённый `defaultStyles[type]` к выделению |
| `index.html` | кнопка «Сбросить к стилю по умолчанию» на вкладке Стиль |

### Проверка на проде

- [ ] Сохранить стиль прямоугольника как по умолчанию → изменить стадию БП → «Сбросить к стилю по умолчанию» возвращает сохранённый вид

---

**Бэкап скрипта деплоя:** `mmtable-PROD-BACKUP-20260706-111942-before-deploy.tar.gz`  
**Статус:** OK (`20260706-text-valign`)

### Выкатано

| Файл | Назначение |
|------|------------|
| `styles.css` | `.shape-text` — CSS Grid + `align-content` для top/middle/bottom |
| `app.js` | `syncShapeTextVerticalAlign` выставляет `data-valign` вместо padding-хака |

### Проверка на проде

- [ ] Фигура с текстом → кнопка ↕ (по центру) — текст по вертикали посередине

---

**Бэкап скрипта деплоя:** `mmtable-PROD-BACKUP-20260706-111624-before-deploy.tar.gz`  
**Статус:** OK (`app.js?v=20260706-rich-text-font-scale`)

### Выкатано

| Файл | Назначение |
|------|------------|
| `app.js` | кнопки A+/A− меняют `font-size` у всех span в `textHtml`, не только у корня `.shape-text` |

### Проверка на проде

- [ ] Фигура с разными размерами слов → A+/A− увеличивает/уменьшает все пропорционально на 1px

---

**Бэкап скрипта деплоя:** `mmtable-PROD-BACKUP-20260706-110642-before-deploy.tar.gz`  
**Скрипт:** `bash scripts/deploy_prod.sh`  
**Статус:** OK (`app.js?v=20260706-orphan-handles`, gunicorn 200)

### Выкатано

| Файл | Назначение |
|------|------------|
| `app.js` | удаление orphaned `shape-handles` из overlay при потере владельца; `purgeOrphanedInteractionControls`; сброс `groupSelectionBox` при загрузке листа |
| `index.html` | cache-buster `20260706-orphan-handles` |

### Проверка на проде

- [ ] Документ «Тест»: обновить страницу — «призрачные» зелёные кружки исчезают
- [ ] Выделить фигуру → Delete — ручки не остаются на столе
- [ ] Групповое выделение с нулевым размером не показывает кластер ручек

---

**Бэкап скрипта деплоя:** `mmtable-PROD-BACKUP-20260705-113753-before-deploy.tar.gz`  
**Скрипт:** `bash scripts/deploy_prod.sh`  
**Статус:** OK (`app.js?v=20260705-sheet-window-controls`, gunicorn 200)

### Выкатано

| Файл | Назначение |
|------|------------|
| `app.js` | `addShapeHandles` для sheet-window; `selectWindow` + overlay lift по `connId`; Delete/Backspace удаляет выбранное окно |
| `styles.css` | рамка выделения `.sheet-window.selected-window .shape-handles` |
| `index.html` | cache-buster `20260705-sheet-window-controls` |

### Проверка на проде

- [ ] Добавить окно Google Sheets на рабочий стол — появляется зелёная рамка с ручками
- [ ] Delete/Backspace удаляет выбранное окно
- [ ] Фигуры и таблицы — выделение и удаление без регрессий

---

**Полный бэкап до выкладки:** `mmtable-PROD-FULL-BACKUP-20260704-113104-manual.tar.gz` (~40 МБ)  
**Бэкап скрипта деплоя:** `mmtable-PROD-BACKUP-20260704-143115-before-deploy.tar.gz`  
**Скрипт:** `bash scripts/deploy_prod.sh`  
**Статус:** OK (`app.js?v=20260704-paste-group-v2`, healthcheck 200)

### Выкатано

| Файл | Назначение |
|------|------------|
| `app.js` | копирование всей группы при выборе любого её члена; при вставке — новый `groupId` на всех объектах; выбор `selectGroup` после paste |
| `index.html` | cache-buster `20260704-paste-group-v2` |

### Проверка на проде

- [ ] БП: выделить группу или одну стадию → Cmd+C / Cmd+D → вставка одной группой (общая рамка, drag всей группы)
- [ ] Formal: подписи фигур на месте

---

## 2026-07-04 — BP-стадии, частичное форматирование текста, правки dblclick

**Полный бэкап до выкладки:** `mmtable-PROD-FULL-BACKUP-20260704-112146-manual.tar.gz` (весь `/opt/apps/mmtable`, ~40 МБ: код, `workspace.db`, `workspace_documents`, `.venv`)  
**Бэкап скрипта деплоя:** `mmtable-PROD-BACKUP-20260704-142204-before-deploy.tar.gz`  
**Скрипт:** `bash scripts/deploy_prod.sh`  
**Статус:** OK (`app.js?v=20260704-partial-format-v3`, healthcheck 200 на сервере и через nginx)

### Выкатано

| Файл | Назначение |
|------|------------|
| `app.js` | выбор стадии BP при уже выбранной группе; красные «+» (fix `syncFormatPanel` / `tc`); dblclick — вход в редактирование без выделения слова; частичный inline-формат (B/I/U и др.); сохранение выделения при клике в панель «Формат» (в т.ч. свёрнутую) |
| `styles.css` | `.shape-text` → `display:block` (исправлен разъезд текста на столбцы после `<span>`) |
| `index.html` | cache-buster `20260704-partial-format-v3` |
| `server.py` | актуальная серверная версия из локалки |
| `assets/favicon.png`, `assets/apple-touch-icon.png` | иконки |

### Проверка на проде

- [ ] БП: клик по группе → клик по стадии → красные «+» слева/справа/снизу
- [ ] Двойной клик по фигуре — только курсор, без выделения слова
- [ ] Выделить фрагмент текста → **B** — жирным только выделение, текст не в столбцы
- [ ] Свёрнутая панель «Формат» → развернуть → применить **B** к выделению
- [ ] Formal / документы: подписи фигур на месте после автосохранения

---

## 2026-07-02 — z-order для мультивыделения и группы

**Бэкап на сервере:** `mmtable-PROD-BACKUP-20260702-185419-before-deploy.tar.gz`  
**Скрипт:** `bash scripts/deploy_prod.sh`  
**Статус:** OK (`app.js?v=20260702-zorder-multi`, healthcheck 200)

### Выкатано

| Файл | Назначение |
|------|------------|
| `app.js` | `getZOrderTargets()`: «На передний план» / «На задний план» работают для мультивыделения, формальной группы и одной фигуры |
| `index.html` | cache-buster `20260702-zorder-multi` |

### Проверка

- выделить несколько задач рамкой → «Положение» → «На передний план» / «На задний план»;
- то же для сгруппированных объектов.

---

## 2026-07-02 — возврат горизонтального смещения задач BP

**Бэкап на сервере:** `mmtable-PROD-BACKUP-20260702-184542-before-deploy.tar.gz`  
**Статус:** OK (`app.js?v=20260702-bp-task-offset`, healthcheck 200)

### Выкатано

| Файл | Назначение |
|------|------------|
| `app.js` | вернуть `BP_TASK_OFFSET_X = 30` в `getBpTaskLeftForStage`; ширина по-прежнему = нижняя часть стадии |
| `index.html` | cache-buster `20260702-bp-task-offset` |

---

## 2026-07-02 — ширина задач BP по нижней части стадии

**Бэкап на сервере:** `mmtable-PROD-BACKUP-20260702-184117-before-deploy.tar.gz`  
**Полный бэкап до выкладки:** `mmtable-PROD-FULL-BACKUP-20260702-153700-manual.tar.gz`  
**Скрипт:** `bash scripts/deploy_prod.sh`  
**Статус:** OK (`app.js?v=20260702-bp-task-body-width`, healthcheck 200)

### Выкатано

| Файл | Назначение |
|------|------------|
| `app.js` | `getBpStageBodyWidth` / `getBpTaskLeftForStage`: ширина задачи = ширина bbox стадии − chevron inset; left = offsetLeft стадии; убрана обратная подгонка стадии при resize задачи |
| `index.html` | cache-buster `20260702-bp-task-body-width` |

### Проверка

- Formal: задачи под нижней плоской частью chevron, без накопительного сдвига к концу процесса;
- подписи фигур сохраняются (hotfix `text` в `readShapeData` на месте).

---

## 2026-07-02 — HOTFIX: восстановление сохранения подписей фигур

**Бэкап на сервере:** `mmtable-PROD-BACKUP-20260702-183021-before-deploy.tar.gz`  
**Причина:** в `readShapeData()` отсутствовало поле `text` — любое автосохранение стирало подписи всех фигур.  
**База восстановлена из:** `mmtable-PROD-BACKUP-20260702-174917-before-deploy.tar.gz` (Formal: 89 подписей, 40 стадий с текстом).  
**Фикс:** вернуть `text: text ? (text.dataset.rawText ?? innerText) : ""` в `readShapeData`.  
**Cache-buster:** `20260702-save-text-hotfix`

**Важно:** до этого hotfix не открывать документы — автосохранение снова сотрёт подписи.

---

## 2026-07-02 — ОТКАТ: фикс смещения задач BP (неудачный)

**Откат с бэкапа:** `mmtable-PROD-BACKUP-20260702-181845-before-deploy.tar.gz`  
**Причина отката:** после выкладки `20260702-bp-task-drift` — кривая ширина задач, наложения, пропали названия стадий.  
**Восстановлено:** `app.js`, `index.html` из бэкапа до деплоя (`20260702-conn-label-format`).  
**База данных:** `workspace.db` восстановлена из `mmtable-PROD-BACKUP-20260702-180013-before-deploy.tar.gz` (в бэкапе 181845 тексты стадий уже были пустыми; в 180013 — есть, напр. «НОВЫЙ ЗАПРОС»).  
**Текущий cache-buster:** `20260702-conn-label-format`

---

## 2026-07-02 — фикс смещения задач BP от стадий (ОТКАЧЕН)

**Бэкап на сервере:** `mmtable-PROD-BACKUP-20260702-181845-before-deploy.tar.gz`  
**Скрипт:** `bash scripts/deploy_prod.sh`  
**Статус:** ОТКАЧЕН — см. запись выше

### Выкатано

| Файл | Назначение |
|------|------------|
| `app.js` | `layoutAllBpTasksInProcess`: горизонтальная сетка задач привязана к `getBpStageLeftAfter` вместо `left + taskWidth` — убран накопительный сдвиг (~16px/стадию) |
| `index.html` | cache-buster `20260702-bp-task-drift` |

### Проверка

- BP с 15–20 стадиями: задачи остаются под своими стадиями, стрелки не «уезжают» к концу процесса;
- вертикальный стек задач на одной стадии без изменений.

---

## 2026-07-02 — подписи на соединителях

**Бэкап на сервере:** `mmtable-PROD-BACKUP-20260702-174917-before-deploy.tar.gz`  
**Скрипт:** `bash scripts/deploy_prod.sh`  
**Статус:** OK (`app.js?v=20260702-conn-label`, healthcheck 200)

### Выкатано

| Файл | Назначение |
|------|------------|
| `app.js` | подпись на соединителе: печать при выделении; разрыв линии под текст; перетаскивание вдоль стрелки |
| `styles.css` | `.conn-label`, ромб-ручка перетаскивания |
| `index.html` | cache-buster `20260702-conn-label` |

### Проверка

- выделить стрелку → напечатать текст → подпись в середине, линия с разрывом;
- перетащить подпись по телу стрелки;
- Backspace удаляет символы подписи, пустая подпись — удаляет соединитель как раньше.

---

## 2026-07-02 — «На передний план» выше соединителей

**Бэкап на сервере:** `mmtable-PROD-BACKUP-20260702-174423-before-deploy.tar.gz`  
**Скрипт:** `bash scripts/deploy_prod.sh`  
**Статус:** OK (`app.js?v=20260702-shape-above-conn`, healthcheck 200)

### Выкатано

| Файл | Назначение |
|------|------------|
| `app.js` | явное «На передний план» поднимает фигуру выше стрелок (`aboveConnectors`); базовый z-index соединителей считается без таких фигур — стрелки по умолчанию остаются поверх |
| `index.html` | cache-buster `20260702-shape-above-conn` |

### Проверка

- новая стрелка при создании — поверх таблиц/фигур;
- «На передний план» у задачи — стрелка под блоком;
- «На задний план» — сбрасывает флаг, стрелки снова поверх.

---

## 2026-07-02 — скролл таблицы под соединителями + z-index BP-задач

**Бэкап на сервере:** `mmtable-PROD-BACKUP-20260702-172604-before-deploy.tar.gz`  
**Скрипт:** `bash scripts/deploy_prod.sh`  
**Статус:** OK (файлы на проде, `app.js?v=20260702-table-scroll-wheel`, healthcheck 200; скрипт завершился с code 1 на grep gunicorn)

### Выкатано

| Файл | Назначение |
|------|------------|
| `app.js` | скролл таблицы при wheel над соединителем (`elementsFromPoint` + ручной scroll); авто-включение scroll после `renderTable()`; сохранение z-index BP-задачи после «На передний план» |
| `index.html` | cache-buster `20260702-table-scroll-wheel` |

### Проверка после деплоя

```bash
ssh ... "grep app.js /opt/apps/mmtable/index.html"
# app.js?v=20260702-table-scroll-wheel
curl -I http://127.0.0.1:4173/  # 200
```

Ручная проверка: таблица «ПАКЕТЫ (счета)» с перекрывающими стрелками — колёсико прокручивает строки; уменьшение шрифта в блоке задачи не сбрасывает z-index.

---

## 2026-07-02 — соединители ячеек: clamp, preview, handles

**Локальный бэкап:** `backups/MIndMapTable-LOCAL-BACKUP-20260702-171205-before-cell-clamp-edge-deploy.tar.gz`  
**Бэкап на сервере:** `mmtable-PROD-BACKUP-20260702-171211-before-deploy.tar.gz`  
**Скрипт:** `bash scripts/deploy_prod.sh`  
**Статус:** OK (файлы на проде, gunicorn и публичный URL 200; скрипт завершился с code 1 на шаге grep gunicorn — известная гонка)

### Выкатано

| Файл | Назначение |
|------|------------|
| `app.js` | зелёные handles в overlay; жёлтые стрелки ячеек (⌘/Ctrl); capped z-index соединителей (≤19950); preview-линия при протягивании (fixed overlay); clamp якоря ячейки при скролле таблицы; точка крепления на внешнем крае ячейки |
| `styles.css` | interaction-controls-layer; lifted cell guides; conn-draft-overlay |
| `index.html` | cache-buster `20260702-cell-clamp-edge` |

### Проверка после деплоя

```bash
curl -I https://mmtable.crystalsystems.ru/
# HTTP/1.1 200 OK
ssh ... "grep app.js /opt/apps/mmtable/index.html"
# app.js?v=20260702-cell-clamp-edge
curl -I http://127.0.0.1:4173/  # на сервере: HTTP/1.1 200 OK
```

Ручная проверка на проде:
- клик по таблице/фигуре → зелёная рамка и resize handles;
- ⌘/Ctrl + ячейка → жёлтые стрелки, preview-линия при drag;
- соединитель ячейка→ячейка, скролл таблицы → стрелка на видимом крае, не за блоком;
- стрелка на внешнем крае ячейки, не на тексте.

---

## 2026-07-02 — BP: ресайз связанных задач по ширине стадии

**Бэкап:** `mmtable-PROD-BACKUP-20260702-105220-before-deploy.tar.gz`  
**Скрипт:** `bash scripts/deploy_prod.sh`  
**Статус:** OK (код на сервере обновлён, локальный healthcheck `127.0.0.1:4173` = 200; скрипт завершился с code 1 на финальной проверке)

### Выкатано

| Файл | Назначение |
|------|------------|
| `app.js` | в `layoutAllBpTasksInProcess()` ширина применяется ко всем задачам стадии, затем повторно считается auto-height; вторая и последующие задачи теперь корректно расширяются при изменении ширины стадии |

### Проверка после деплоя

```bash
python3 -c "... http://127.0.0.1:4173/ -> 200 ..."
python3 -c "... проверить chunk function layoutAllBpTasksInProcess ..."
```

Ручная проверка: у стадии с несколькими задачами растянуть ширину стадии и убедиться, что 2-я и следующие задачи тоже меняют ширину.

---

## 2026-07-02 — тёмная тема при выключенной заливке рабочего стола

**Бэкап:** `mmtable-PROD-BACKUP-20260702-102212-before-deploy.tar.gz`  
**Скрипт:** `bash scripts/deploy_prod.sh`  
**Статус:** OK (app.js на проде; gunicorn и URL 200)

### Выкатано

| Файл | Назначение |
|------|------------|
| `app.js` | при `fillEnabled: false` не ставить `body { background: transparent }`, сбрасывать inline-фон — работает CSS `body` / `body.dark`; `setTheme()` вызывает `syncViewportDesktopBackground()` |
| `index.html` | cache-buster `app.js?v=20260702-dark-theme-no-fill` |

### Проверка после деплоя

```bash
curl -I https://mmtable.crystalsystems.ru/
# HTTP/1.1 200 OK
grep 'document.body.style.background = ""' /opt/apps/mmtable/app.js
```

Ручная проверка: документ Formal (заливка рабочего стола выкл.) → включить «Темная тема» → фон рабочего стола тёмный, не белый.

---

## 2026-07-01 (5) — BP: перевязка задач + соединители стадий

**Бэкап:** `mmtable-PROD-BACKUP-20260701-142616-before-deploy.tar.gz`  
**Скрипт:** `bash scripts/deploy_prod.sh`  
**Статус:** OK (файлы установлены, gunicorn и публичный URL отвечают 200; скрипт завершился с code 1 на шаге grep gunicorn — известная гонка)

### Выкатано

| Файл | Назначение |
|------|------------|
| `app.js` | перевязка задач между стадиями (dblclick → drag → подсветка → drop); соединительные стрелки на стадиях BP; drop на стадию другого BP-процесса; overlay не блокирует отпускание линии |
| `styles.css` | подсветка стадии `.bp-stage-drop-target`; стрелки conn выше кнопок «+»; без стрелок у фона BP |
| `index.html` | cache-buster `app.js?v=20260701-bp-conn-drop`, `styles.css?v=20260701-bp-conn-fix4` |

### Проверка после деплоя

```bash
curl -I https://mmtable.crystalsystems.ru/
# HTTP/1.1 200 OK
```

На проде: `app.js?v=20260701-bp-conn-drop`.

Ручная проверка: перевязка задачи между стадиями; вытягивание линии со стадии и закрепление на стадии другого последовательного BP.

### Откат

```bash
ssh -i ~/.ssh/lumalms_deploy root@95.163.226.145
cd /opt/apps/mmtable
tar -xzf /opt/apps/backups/mmtable-PROD-BACKUP-20260701-142616-before-deploy.tar.gz
# перезапустить gunicorn
```

---

## 2026-07-01 (4) — переназначение задач BP между стадиями

**Бэкап:** `mmtable-PROD-BACKUP-20260701-115331-before-deploy.tar.gz`  
**Скрипт:** `bash scripts/deploy_prod.sh`  
**Статус:** OK (файлы установлены, gunicorn и публичный URL отвечают 200; скрипт завершился с code 1 на шаге grep gunicorn — известная гонка, сервис работает)

### Выкатано

| Файл | Назначение |
|------|------------|
| `app.js` | переназначение задачи на другую стадию: двойной клик → drag → подсветка стадии → drop с авто-раскладкой |
| `styles.css` | класс `.bp-stage-drop-target` — зелёная обводка стадии при наведении |
| `index.html` | cache-buster `app.js?v=20260701-bp-task-reassign`, `styles.css?v=20260701-bp-task-reassign` |

### Проверка после деплоя

```bash
curl -I https://mmtable.crystalsystems.ru/
# HTTP/1.1 200 OK
```

На проде в `index.html`: `app.js?v=20260701-bp-task-reassign`.

### Откат

```bash
ssh -i ~/.ssh/lumalms_deploy root@95.163.226.145
cd /opt/apps/mmtable
tar -xzf /opt/apps/backups/mmtable-PROD-BACKUP-20260701-115331-before-deploy.tar.gz
# перезапустить gunicorn
```

---

## 2026-07-01 (3) — заголовок вкладки «Название - MMTable»

**Бэкап:** `mmtable-PROD-BACKUP-20260701-112602-before-deploy.tar.gz`  
**Скрипт:** `bash scripts/deploy_prod.sh`  
**Статус:** OK (файлы установлены, gunicorn и публичный URL отвечают 200)

### Выкатано

| Файл | Назначение |
|------|------------|
| `app.js` | `document.title` = «{имя документа} - MMTable» |
| `index.html` | дефолтный `<title>MMTable</title>`, cache-buster `app.js?v=20260701-doc-title` |

### Проверка после деплоя

```bash
curl -I https://mmtable.crystalsystems.ru/
# HTTP/1.1 200 OK
```

Во вкладке браузера: `Report - MMTable` (или другое имя открытого документа).

### Откат

```bash
ssh -i ~/.ssh/lumalms_deploy root@95.163.226.145
cd /opt/apps/mmtable
tar -xzf /opt/apps/backups/mmtable-PROD-BACKUP-20260701-112602-before-deploy.tar.gz
# перезапустить gunicorn
```

---

## 2026-07-01 (2) — favicon: обрезка и прозрачный фон

**Бэкап:** `mmtable-PROD-BACKUP-20260701-111458-before-deploy.tar.gz`  
**Скрипт:** `bash scripts/deploy_prod.sh`  
**Статус:** OK (файлы установлены, gunicorn и публичный URL отвечают 200)

### Выкатано

| Файл | Назначение |
|------|------------|
| `index.html` | ссылки на favicon `?v=20260701-crop`, `apple-touch-icon.png` |
| `assets/favicon.png` | 128×128, обрезка по содержимому, прозрачный фон |
| `assets/apple-touch-icon.png` | 180×180 для iOS |

### Кратко по изменениям

- Favicon обрезан по содержимому (убраны чёрные поля 682×1024)
- Прозрачный фон вместо чёрного — корректное отображение во вкладке браузера
- Осветлены контуры иконки для читаемости на светлой и тёмной вкладке
- В `DEPLOY.md` и `AGENTS.md` зафиксирован обязательный порядок: бэкап → деплой → `REVIEW.md`

### Проверка после деплоя

```bash
curl -I https://mmtable.crystalsystems.ru/
# HTTP/1.1 200 OK
```

Проверить иконку во вкладке: при необходимости закрыть вкладку и открыть сайт заново (кэш favicon).

### Откат

```bash
ssh -i ~/.ssh/lumalms_deploy root@95.163.226.145
cd /opt/apps/mmtable
tar -xzf /opt/apps/backups/mmtable-PROD-BACKUP-20260701-111458-before-deploy.tar.gz
# перезапустить gunicorn
```

---

## 2026-07-01 — фильтр, стиль шапки, favicon, тёмная тема (свёрнутая панель)

**Бэкап:** `mmtable-PROD-BACKUP-20260701-110846-before-deploy.tar.gz`  
**Скрипт:** `bash scripts/deploy_prod.sh`  
**Статус:** OK (файлы установлены, gunicorn и публичный URL отвечают 200)

### Выкатано

| Файл | Назначение |
|------|------------|
| `app.js` | фильтр таблиц, сохранение градиента шапки (`normalizeTableStyleRecord`), clipboard, прочие правки сессии |
| `index.html` | favicon, cache-buster `app.js?v=20260630-table-style-save`, `styles.css?v=20260701-dark-fp-collapsed` |
| `styles.css` | фильтр, скругление таблиц, фон рабочего стола, свёрнутая панель форматирования в тёмной теме |
| `server.py` | серверные изменения (sharing, folders и др.) |
| `assets/favicon.png` | иконка приложения |

### Кратко по изменениям

- Фильтр по первой строке таблицы (исправления UI и высоты строк)
- Сохранение форматирования шапки таблицы (градиент заливки после перезагрузки)
- Favicon в вкладке браузера
- Видимость свёрнутого окна «Формат» в тёмной теме
- Форматирование рабочего стола (отключение сетки/фона)

### Проверка после деплоя

```bash
curl -I https://mmtable.crystalsystems.ru/
# HTTP/1.1 200 OK
```

Рекомендуется на проде: жёсткое обновление страницы (`Cmd+Shift+R`), проверить градиент шапки таблицы, favicon, свёрнутую панель форматирования в тёмной теме.

### Откат

```bash
ssh -i ~/.ssh/lumalms_deploy root@95.163.226.145
cd /opt/apps/mmtable
tar -xzf /opt/apps/backups/mmtable-PROD-BACKUP-20260701-110846-before-deploy.tar.gz
# перезапустить gunicorn
```

---

## 2026-06-30 — фильтр и правки UI (предыдущая выкладка)

**Бэкап:** `mmtable-PROD-BACKUP-20260630-234241-before-deploy.tar.gz`  
**Статус:** OK

Первая выкладка сессии: фильтр, скругление таблиц, исправления ручек строк.
