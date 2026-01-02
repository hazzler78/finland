# Cloudflare D1 Database Setup

## Steg 1: Skapa D1-databasen

1. Logga in på Cloudflare Dashboard
2. Gå till **Workers & Pages** → **D1**
3. Klicka på **Create database**
4. Namn: `sahkopomo-db`
5. Klicka på **Create**

## Steg 2: Hämta Database ID ✅ KLART

Database ID är konfigurerat i `wrangler.toml`:
- Database ID: `f41acc00-bbbf-48ce-8e83-3424c77803cf`

## Steg 3: Kör migrations lokalt (valfritt)

```bash
# Installera Wrangler CLI om du inte redan har det
npm install -g wrangler

# Logga in
wrangler login

# Kör migration
wrangler d1 execute sahkopomo-db --file=./db/migrations/0001_initial.sql --local
```

## Steg 4: Kör migrations i produktion

```bash
# Kör migration mot produktion
wrangler d1 execute sahkopomo-db --file=./db/migrations/0001_initial.sql
```

## Steg 5: Koppla D1 till Cloudflare Pages

1. Gå till Cloudflare Dashboard → **Pages** → Ditt projekt
2. Gå till **Settings** → **Functions**
3. Under **D1 Database bindings**, lägg till:
   - **Variable name**: `DB`
   - **D1 Database**: `sahkopomo-db`
4. Spara ändringar

## Steg 6: Deploya Functions

Functions-filerna i `functions/` mappen kommer automatiskt att deployas med Cloudflare Pages.

## Verifiera att det fungerar

Efter deployment, testa API:et:

```bash
# Hämta alla leverantörer
curl https://sahkopomo.pages.dev/api/suppliers

# Skapa ny leverantör (från admin-sidan)
# Gå till /admin och testa att lägga till en leverantör
```

## Ytterligare kommandon

```bash
# Se alla tabeller
wrangler d1 execute sahkopomo-db --command="SELECT name FROM sqlite_master WHERE type='table';"

# Se alla leverantörer
wrangler d1 execute sahkopomo-db --command="SELECT * FROM suppliers;"

# Rensa databasen (försiktigt!)
wrangler d1 execute sahkopomo-db --command="DELETE FROM suppliers;"
```
