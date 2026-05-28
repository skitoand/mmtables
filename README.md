# Table Workspace

Интерактивный рабочий стол с окнами таблиц:
- drag/resize окон
- zoom рабочего стола
- документная модель рабочего стола
- автосохранение в текущий документ
- меню `Файл`: создать, открыть, удалить, копировать
- авторизация по email и паролю
- сохранение документов в отдельных файлах, SQLite используется для индекса и метаданных

## Запуск

```bash
cd "/Users/skitovich/Yandex.Disk.localized/Приложения/MIndMapTable"
python3 -m pip install --user flask authlib
python3 server.py
```

Открой: http://127.0.0.1:4173

## Вход по email

На сервере можно войти по email и паролю через встроенную форму входа.
Папка документов для пользователя хранится как `workspace_documents/<email_safe>/`.

## Ограничение Google Sheets

`iframe` обычно подходит для published/view режима.
Полный edit в `iframe` часто блокируется политиками Google. Для полноценного редактирования нужен Google Sheets API.
