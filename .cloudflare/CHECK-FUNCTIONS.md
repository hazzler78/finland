# Kontrollera Cloudflare Pages Functions

## Problem: 500 Internal Server Error utan response body

Detta tyder på att Functions inte körs korrekt eller att det finns ett konfigurationsproblem.

## Steg 1: Kontrollera Functions-loggarna

1. Gå till [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Välj ditt konto
3. Gå till **Workers & Pages** → **Pages** → Ditt projekt (`sahkopomo`)
4. Klicka på **Functions** → **Logs**
5. Leta efter fel när du gör API-anrop

## Steg 2: Kontrollera D1 Database Binding

1. Gå till **Settings** → **Functions**
2. Scrolla ner till **D1 Database bindings**
3. Kontrollera att:
   - Variable name: `DB`
   - D1 Database: `sahkopomo-db`
   - Binding finns och är aktiv

Om binding saknas:
1. Klicka på **Add binding**
2. Variable name: `DB`
3. D1 Database: Välj `sahkopomo-db`
4. Klicka på **Save**
5. Vänta på att deploymenten är klar

## Steg 3: Kontrollera att Functions är deployade

1. Gå till **Deployments**
2. Kontrollera den senaste deploymenten
3. Klicka på den för att se detaljer
4. Kontrollera att `functions/api/[[path]].ts` finns i Functions-listan

## Steg 4: Testa lokalt med Wrangler (valfritt)

```bash
# Installera Wrangler om du inte redan har det
npm install -g wrangler

# Logga in
wrangler login

# Kör lokalt med D1 binding
wrangler pages dev out --d1=DB=sahkopomo-db
```

Öppna `http://localhost:8788/api/suppliers` i webbläsaren.

## Steg 5: Kontrollera databasen

Verifiera att båda tabellerna finns:

```bash
# Kontrollera suppliers-tabellen
wrangler d1 execute sahkopomo-db --command="SELECT name FROM sqlite_master WHERE type='table' AND name='suppliers';"

# Kontrollera contacts-tabellen
wrangler d1 execute sahkopomo-db --command="SELECT name FROM sqlite_master WHERE type='table' AND name='contacts';"
```

## Vanliga problem

### Problem 1: Functions körs inte
**Symptom:** 500 error utan response body
**Lösning:** Kontrollera Functions-loggarna för JavaScript-fel

### Problem 2: D1 Binding saknas
**Symptom:** "Database not configured" eller 500 error
**Lösning:** Lägg till D1 binding i Cloudflare Pages Settings

### Problem 3: Tabeller saknas
**Symptom:** "no such table" error i loggarna
**Lösning:** Kör migrationerna:
```bash
wrangler d1 execute sahkopomo-db --file=./db/migrations/0001_initial.sql
wrangler d1 execute sahkopomo-db --file=./db/migrations/0002_add_contacts.sql
```

### Problem 4: Functions-filen är inte deployad
**Symptom:** 404 eller 500 error
**Lösning:** Kontrollera att `functions/api/[[path]].ts` finns i deploymenten

## Nästa steg

Efter att du har kontrollerat ovanstående:
1. Testa API:et igen med `test-api.ps1`
2. Om det fortfarande inte fungerar, kontrollera Functions-loggarna för specifika felmeddelanden
3. Dela felmeddelandet från loggarna så kan vi fixa det
