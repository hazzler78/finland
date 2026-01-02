# Snabbstart: Cloudflare D1 Setup

## ✅ Databasen är skapad!

Database ID: `f41acc00-bbbf-48ce-8e83-3424c77803cf`

## Nästa steg:

### 1. Kör migration för att skapa tabeller och initial data

```bash
# Installera Wrangler CLI om du inte redan har det
npm install -g wrangler

# Logga in till Cloudflare
wrangler login

# Kör migration mot produktion
wrangler d1 execute sahkopomo-db --file=./db/migrations/0001_initial.sql
```

### 2. Koppla D1 till Cloudflare Pages

1. Gå till Cloudflare Dashboard → **Pages** → Ditt projekt (`sahkopomo`)
2. Klicka på **Settings** → **Functions**
3. Scrolla ner till **D1 Database bindings**
4. Klicka på **Add binding**
5. Fyll i:
   - **Variable name**: `DB`
   - **D1 Database**: Välj `sahkopomo-db`
6. Klicka på **Save**

### 3. Deploya projektet

Efter att du har pushat till GitHub kommer Cloudflare Pages automatiskt att:
- Bygga projektet
- Deploya Functions från `functions/` mappen
- Koppla D1-databasen till Functions

### 4. Testa API:et

Efter deployment, testa att API:et fungerar:

```bash
# Hämta alla leverantörer
curl https://sahkopomo.pages.dev/api/suppliers

# Eller öppna i webbläsaren:
# https://sahkopomo.pages.dev/api/suppliers
```

### 5. Konfigurera Telegram-bot (valfritt)

För att få notifikationer när någon skickar kontaktformulär:

1. Följ instruktionerna i `.cloudflare/telegram-setup.md`
2. Lägg till environment variables i Cloudflare Pages:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`

### 6. Testa admin-sidan

1. Gå till `https://sahkopomo.pages.dev/admin`
2. Logga in med lösenord: `admin2026`
3. Testa att lägga till, redigera eller ta bort leverantörer
4. Växla till "Yhteydenotot"-fliken för att se kontakter

## Felsökning

### Om API:et inte fungerar:

1. Kontrollera att D1-bindingen är korrekt konfigurerad i Pages Settings
2. Kontrollera att migrationen har körts:
   ```bash
   wrangler d1 execute sahkopomo-db --command="SELECT COUNT(*) FROM suppliers;"
   ```
3. Kontrollera Functions-loggarna i Cloudflare Dashboard

### Om du behöver återställa databasen:

```bash
# Ta bort alla leverantörer
wrangler d1 execute sahkopomo-db --command="DELETE FROM suppliers;"

# Kör migration igen för att lägga till initial data
wrangler d1 execute sahkopomo-db --file=./db/migrations/0001_initial.sql
```

## Ytterligare kommandon

```bash
# Se alla tabeller
wrangler d1 execute sahkopomo-db --command="SELECT name FROM sqlite_master WHERE type='table';"

# Se alla leverantörer
wrangler d1 execute sahkopomo-db --command="SELECT * FROM suppliers;"

# Se alla kontakter
wrangler d1 execute sahkopomo-db --command="SELECT * FROM contacts ORDER BY created_at DESC;"

# Se antal leverantörer
wrangler d1 execute sahkopomo-db --command="SELECT COUNT(*) as count FROM suppliers;"

# Se antal kontakter
wrangler d1 execute sahkopomo-db --command="SELECT COUNT(*) as count FROM contacts;"
```
