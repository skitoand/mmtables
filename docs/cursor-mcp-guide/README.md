# Как подключить MM Table MCP к Cursor

Для сотрудников. Обычно 3–5 минут.

MCP URL: `https://mmtable.crystalsystems.ru/mcp`

HTML-версия: [index.html](./index.html) · [открыть на проде](https://mmtable.crystalsystems.ru/docs/cursor-mcp-guide/index.html)

## Что нужно

- аккаунт в [MM Table](https://mmtable.crystalsystems.ru)
- установленный Cursor

Токен `mmt_…` — как пароль: не пересылайте и не коммитьте в Git.

## Шаги

### 1. Войдите в MM Table

Откройте https://mmtable.crystalsystems.ru и войдите своим email.

### 2. Создайте токен

1. Меню → **Профиль**
2. Блок **MCP / Cursor / Claude**
3. Имя токена, например: `Мой Cursor`
4. **Создать токен**
5. Сразу **Копировать токен** (`mmt_…` показывается один раз)

### 3. Скопируйте конфиг

В том же блоке нажмите **Копировать конфиг**.

Получится примерно:

```json
{
  "mcpServers": {
    "mmtable": {
      "url": "https://mmtable.crystalsystems.ru/mcp",
      "headers": {
        "Authorization": "Bearer mmt_ваш_токен"
      }
    }
  }
}
```

### 4. Вставьте в Cursor

1. Cursor Settings: **Cmd/Ctrl + Shift + J**
2. **Tools & MCP**
3. Откройте / создайте `mcp.json`
4. Вставьте JSON и сохраните

Файлы:

| ОС | Путь |
|----|------|
| Mac | `~/.cursor/mcp.json` |
| Windows | `%USERPROFILE%\.cursor\mcp.json` |

Если в файле уже есть другие серверы — добавьте только блок `"mmtable"`, не затирайте весь файл.

### 5. Проверка

1. Перезапустите Cursor
2. Settings → Tools & MCP → у `mmtable` зелёный статус
3. В Agent-чате: `Покажи мои документы в MM Table`

Если агент вызвал `list_documents` — готово.

## Проблемы

| Симптом | Что сделать |
|---------|-------------|
| Не подключается | Проверьте `Bearer ` перед токеном, перезапустите Cursor |
| Токен потерян | Создайте новый в Профиле |
| Нет документов | Тот же аккаунт, что в MM Table; нужен доступ к документу |
| Ошибка JSON | Уберите лишнюю запятую |

Подробнее: [../MCP.md](../MCP.md)
