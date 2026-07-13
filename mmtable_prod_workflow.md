# MMTables Prod Workflow

Короткая памятка для быстрого доступа и создания схем / таблиц в `Table Workspace`.

## 1. Что это

```tsv
Параметр	Значение
Приложение	Table Workspace
Домен	https://mmtable.crystalsystems.ru
Старый домен (редирект)	https://mmtable.skitovich.ru
Сервер	95.163.226.145
SSH ключ	~/.ssh/lumalms_deploy
SSH пользователь	root
Каталог приложения	/opt/apps/mmtable
База документов	/opt/apps/mmtable/workspace.db
```

## 2. Быстрый SSH вход

```bash
ssh -oHostKeyAlgorithms=+ssh-rsa \
    -oPubkeyAcceptedAlgorithms=+ssh-rsa \
    -oBatchMode=yes \
    -oConnectTimeout=10 \
    -oStrictHostKeyChecking=accept-new \
    -i ~/.ssh/lumalms_deploy \
    root@95.163.226.145
```

## 3. Где хранятся документы

Документы хранятся в таблице БД:

```tsv
Таблица БД	Назначение
user_documents	список документов и их layout_json
document_access	доступ пользователя к документу
users	пользователи
```

Главное поле:

```tsv
Поле	Смысл
user_documents.layout_json	полный layout рабочего стола
```

## 4. Как посмотреть документы пользователя

```bash
ssh -oHostKeyAlgorithms=+ssh-rsa \
    -oPubkeyAcceptedAlgorithms=+ssh-rsa \
    -oBatchMode=yes \
    -oConnectTimeout=10 \
    -oStrictHostKeyChecking=accept-new \
    -i ~/.ssh/lumalms_deploy \
    root@95.163.226.145 \
    "python3 - <<'PY'
import sqlite3
conn = sqlite3.connect('/opt/apps/mmtable/workspace.db')
conn.row_factory = sqlite3.Row
rows = conn.execute(
    'select id,email,name,created_at,updated_at from user_documents where lower(email)=? order by updated_at desc, created_at desc',
    ('skitovich@yandex.ru',)
).fetchall()
for row in rows:
    print(dict(row))
PY"
```

## 5. Как посмотреть состав layout документа

```bash
ssh -oHostKeyAlgorithms=+ssh-rsa \
    -oPubkeyAcceptedAlgorithms=+ssh-rsa \
    -oBatchMode=yes \
    -oConnectTimeout=10 \
    -oStrictHostKeyChecking=accept-new \
    -i ~/.ssh/lumalms_deploy \
    root@95.163.226.145 \
    "python3 - <<'PY'
import sqlite3, json
DOC_ID = 'PASTE_DOC_ID'
conn = sqlite3.connect('/opt/apps/mmtable/workspace.db')
conn.row_factory = sqlite3.Row
row = conn.execute('select id,name,layout_json from user_documents where id=?', (DOC_ID,)).fetchone()
layout = json.loads(row['layout_json'])
print({'id': row['id'], 'name': row['name'], 'shapes': len(layout.get('shapes', [])), 'connectors': len(layout.get('connectors', []))})
for s in layout.get('shapes', [])[:30]:
    print({
        'id': s.get('id'),
        'type': s.get('type'),
        'tableTitle': s.get('tableTitle'),
        'text': s.get('text'),
        'left': s.get('left'),
        'top': s.get('top')
    })
PY"
```

## 6. Самый быстрый способ создать новый документ со схемой

Если уже есть готовый документ-шаблон, быстрее всего делать копию его `layout_json`.

Пример:

```bash
ssh -oHostKeyAlgorithms=+ssh-rsa \
    -oPubkeyAcceptedAlgorithms=+ssh-rsa \
    -oBatchMode=yes \
    -oConnectTimeout=10 \
    -oStrictHostKeyChecking=accept-new \
    -i ~/.ssh/lumalms_deploy \
    root@95.163.226.145 \
    "python3 - <<'PY'
import sqlite3, uuid
DB='/opt/apps/mmtable/workspace.db'
EMAIL='skitovich@yandex.ru'
SOURCE_ID='PASTE_SOURCE_DOC_ID'
NEW_NAME='schema_audit'
conn=sqlite3.connect(DB)
conn.row_factory=sqlite3.Row
source=conn.execute(
    'select layout_json from user_documents where id=? and lower(email)=?',
    (SOURCE_ID, EMAIL)
).fetchone()
if not source:
    raise SystemExit('source document not found')
new_id=str(uuid.uuid4())
conn.execute(
    '''
    insert into user_documents(id,email,name,layout_json,is_active,created_at,updated_at)
    values(?,?,?, ?,0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
    ''',
    (new_id, EMAIL, NEW_NAME, source['layout_json'])
)
conn.execute(
    'insert or ignore into document_access(document_id,user_email,role) values(?,?,?)',
    (new_id, EMAIL, 'owner')
)
conn.commit()
print({'id': new_id, 'name': NEW_NAME})
PY"
```

## 7. Правило перед созданием нового документа

Если имя уже существует, сначала проверить, нужен ли:

```tsv
Сценарий	Действие
Нужна новая версия	создать новый документ
Нужно обновить старый	изменить существующий layout_json
Нужно пересоздать	удалить старый документ с таким именем и создать заново
```

## 8. Что важно помнить

```tsv
Правило	Почему
Сначала смотреть существующий документ Flixo	часто нужные таблицы уже собраны
Не править рабочий документ без необходимости	чтобы не ломать текущую схему пользователя
Для быстрого создания схем использовать копию layout_json	это быстрее и безопаснее, чем собирать руками через UI
После создания всегда проверять shapes/connectors	чтобы убедиться, что схема реально записалась
```

## 9. Проверка созданного документа

```bash
ssh -oHostKeyAlgorithms=+ssh-rsa \
    -oPubkeyAcceptedAlgorithms=+ssh-rsa \
    -oBatchMode=yes \
    -oConnectTimeout=10 \
    -oStrictHostKeyChecking=accept-new \
    -i ~/.ssh/lumalms_deploy \
    root@95.163.226.145 \
    "python3 - <<'PY'
import sqlite3, json
DOC_ID = 'PASTE_DOC_ID'
conn = sqlite3.connect('/opt/apps/mmtable/workspace.db')
conn.row_factory = sqlite3.Row
row = conn.execute('select id,name,layout_json from user_documents where id=?', (DOC_ID,)).fetchone()
layout = json.loads(row['layout_json'])
print({'id': row['id'], 'name': row['name'], 'shapes': len(layout.get('shapes', [])), 'connectors': len(layout.get('connectors', []))})
PY"
```

## 10. Текущий рабочий прием

```tsv
Шаг	Что делать
1	зайти по SSH на прод
2	посмотреть user_documents пользователя skitovich@yandex.ru
3	найти документ-шаблон
4	скопировать его layout_json в новый документ
5	проверить shapes / connectors
6	если нужно, потом уже править содержимое документа
```
