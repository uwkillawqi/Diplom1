## Что уже сделано в проекте

- Добавлен backend на Node.js (`server/index.js`) с API:
  - `GET /api/health`
  - `GET /api/bootstrap`
  - `POST /api/dishes/:id/delete`
  - `POST /api/dishes/:id/restore`
- Добавлены SQL-скрипты схемы: `server/sql/schema.sql`
- Добавлен сидер `server/scripts/seedFromMock.js`, который берет текущий `mockData` из `app.js` и переносит данные в MS SQL.
- Фронтенд (`app.js`) теперь при старте пробует загрузить данные с `http://localhost:3001/api/bootstrap`.
  - Если API недоступен, останется fallback на локальные данные.

---

## Что нужно сделать тебе (пошагово)

### 1) Подготовить SQL Server

1. Убедись, что SQL Server запущен.
2. Создай БД, например `MealPlannerDb`.
3. Создай SQL login (или используй существующий) с правами на эту БД.

### 2) Применить схему БД

1. Открой SQL Server Management Studio.
2. Выбери `MealPlannerDb`.
3. Выполни скрипт из файла:
   - `server/sql/schema.sql`

### 3) Настроить окружение backend

1. Скопируй `.env.example` в `.env`.
2. Заполни реальные параметры:
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_SERVER`
   - `DB_PORT`
   - `DB_NAME`
   - `DB_ENCRYPT`
   - `DB_TRUST_CERT`

### 4) Проверить подключение backend к БД

В терминале проекта:

```bash
npm run dev
```

Потом в браузере открой:

- `http://localhost:3001/api/health`

Ожидается `{ "ok": true, "db": "connected" }`.

### 5) Перенести текущие данные из проекта в MS SQL

В новом терминале (при запущенном SQL и корректном `.env`):

```bash
npm run seed
```

Скрипт автоматически:
- читает `mockData` из `app.js`,
- загружает `ingredients`, `nutritionProfiles`, `dishes` в БД.

### 6) Проверить загрузку данных в UI

1. Открой фронтенд (как обычно).
2. Убедись, что backend все еще запущен (`npm run dev`).
3. При старте UI должен показать тост про загрузку из MS SQL API.

---

## Если что-то не работает

### Ошибка подключения к SQL

- Проверь `DB_SERVER` и `DB_PORT`.
- Проверь, что включен TCP/IP для SQL Server.
- Проверь firewall (порт 1433).
- Для локального dev часто работает:
  - `DB_ENCRYPT=false`
  - `DB_TRUST_CERT=true`

### API не отвечает

- Проверь, что backend запущен: `npm run dev`
- Проверь `http://localhost:3001/api/health`

### Данные не загрузились во фронт

- Открой DevTools -> Network -> запрос `GET /api/bootstrap`
- Проверь JSON-ответ API.

---

## Что нужно от тебя, чтобы я дальше помогла максимально быстро

Пришли мне:

1. Какой у тебя SQL Server:
   - LocalDB / SQL Express / full SQL Server / Docker / Azure SQL.
2. Точные значения подключения (можно без пароля):
   - server, port, db name, тип авторизации.
3. Сработал ли `GET /api/health`.
4. Сработал ли `npm run seed`.
5. Если ошибка — текст ошибки целиком.

Тогда я сразу точечно подправлю:
- конфиг подключения,
- сидер,
- и (если нужно) расширю API до полноценного CRUD меню/ингредиентов/пользовательских блюд полностью через БД без localStorage.
