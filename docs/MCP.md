# Подключение Cursor к MM Table через MCP

Прод: `https://mmtable.crystalsystems.ru/mcp`  
Локально: `http://127.0.0.1:4173/mcp`

## Быстрый старт

1. Войдите в MM Table.
2. Меню → **Профиль** → блок **MCP / Cursor**.
3. Нажмите **Создать токен** и скопируйте значение (показывается один раз).
4. **Копировать конфиг** и вставьте в Cursor MCP settings.

Пример:

```json
{
  "mcpServers": {
    "mmtable": {
      "url": "https://mmtable.crystalsystems.ru/mcp",
      "headers": {
        "Authorization": "Bearer mmt_..."
      }
    }
  }
}
```

## Возможности (tools)

| Tool | Назначение |
|------|------------|
| `list_documents` | список документов |
| `create_document` | новый документ |
| `get_document_overview` | листы, BP, таблицы |
| `describe_sheet` | snapshot листа (ids) |
| `create_shape` / `update_shape` / `delete_shapes` / `move_shapes` | фигуры |
| `create_table` / `get_table` / `set_table_cells` | таблицы |
| `create_business_process` / `add_bp_stage` / `add_bp_task` / `update_bp_task` / `list_business_processes` | бизнес-процессы |
| `connect_shapes` | связи |

## REST API

Тот же функционал доступен как Bearer REST:

- `GET/POST /api/v1/docs`
- `GET /api/v1/docs/<id>`
- object endpoints под `/api/v1/docs/<id>/...`

Scopes токена: `docs:read`, `docs:write`.

## Ограничения v1

- Нет raw-записи всего `layout_json` через MCP.
- Нет Bitrix / freedraw / image.
- Для записи нужна роль `editor+` на документ.
- При гонке с UI autosave можно передать `expectedUpdatedAt` (REST → `409 conflict`).

Контракт данных: [MCP_LAYOUT_CONTRACT.md](./MCP_LAYOUT_CONTRACT.md).
