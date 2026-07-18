# Подключение Cursor и ChatGPT к MM Table через MCP

Прод MCP: `https://mmtable.crystalsystems.ru/mcp`  
Локально: `http://127.0.0.1:4173/mcp`

## Cursor (Bearer PAT)

1. Войдите в MM Table.
2. Меню → **Профиль** → блок **MCP / Cursor**.
3. **Создать токен** → скопировать `mmt_...` (один раз).
4. Вставить в Cursor MCP config:

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

## ChatGPT (OAuth 2.1)

**Инструкция со скриншотами:** [chatgpt-mcp-guide/](./chatgpt-mcp-guide/) · [открыть HTML](./chatgpt-mcp-guide/index.html)

PAT в ChatGPT обычно вставить нельзя — нужен OAuth.

1. Settings → Apps → Advanced → **Developer mode**
2. **Create** → URL `https://mmtable.crystalsystems.ru/mcp`, Auth = **OAuth**
3. Войдите email/паролем MM Table и разрешите доступ
4. В чате: **+** → Developer mode → включите MM Table

ChatGPT получит пару токенов:
- `access_token` (`oat_...`) — ~1 час
- `refresh_token` (`ort_...`) — ~90 дней (silent refresh, как у Notion)

Discovery endpoints:

| URL | Назначение |
|-----|------------|
| `/.well-known/oauth-protected-resource` | resource + authorization_servers |
| `/.well-known/oauth-authorization-server` | authorize / token / register |
| `/oauth/register` | Dynamic Client Registration |
| `/oauth/authorize` | login + consent + auth code + PKCE |
| `/oauth/token` | обмен code → access token |

Поддерживается CIMD (`client_id_metadata_document_supported: true`) и DCR. PKCE: только `S256`.

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

Тот же функционал доступен как Bearer REST (`mmt_...` или OAuth `oat_...`):

- `GET/POST /api/v1/docs`
- `GET /api/v1/docs/<id>`
- object endpoints под `/api/v1/docs/<id>/...`

Scopes: `docs:read`, `docs:write`.

## Ограничения v1

- Нет raw-записи всего `layout_json` через MCP.
- Нет Bitrix / freedraw / image.
- Для записи нужна роль `editor+` на документ.
- OAuth access ~1 час, refresh ~90 дней (с ротацией refresh token).

Контракт данных: [MCP_LAYOUT_CONTRACT.md](./MCP_LAYOUT_CONTRACT.md).
