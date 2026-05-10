# Table Workspace

Интерактивный рабочий стол с окнами таблиц:
- drag/resize окон
- zoom рабочего стола
- документная модель рабочего стола
- автосохранение в текущий документ
- меню `Файл`: создать, открыть, удалить, копировать
- авторизация через Google
- сохранение документов в SQLite по пользователю

## Запуск

```bash
cd "/Users/skitovich/Yandex.Disk.localized/Приложения/MIndMapTable"
python3 -m pip install --user flask authlib
python3 server.py
```

Открой: http://127.0.0.1:4173

## Настройка Google OAuth

1. В Google Cloud Console создай OAuth Client ID (Web application).
2. Authorized redirect URI:
`http://127.0.0.1:4173/auth/google/callback`
3. Скопируй `.env.example` в `.env` и заполни:

```env
SESSION_SECRET=change-this-secret
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

4. Перезапусти `python3 server.py`.

## Ограничение Google Sheets

`iframe` обычно подходит для published/view режима.
Полный edit в `iframe` часто блокируется политиками Google. Для полноценного редактирования нужен Google Sheets API.
