# Fix: Database Error i Kontaktformulär

## Problem
Du får "Database error" när du försöker skicka kontaktformulär.

## Lösning

### Steg 1: Kör Contacts Migration

Kontakttabellen måste skapas i databasen. Kör detta kommando:

```bash
wrangler d1 execute sahkopomo-db --file=./db/migrations/0002_add_contacts.sql
```

### Steg 2: Verifiera att tabellen skapades

```bash
wrangler d1 execute sahkopomo-db --command="SELECT name FROM sqlite_master WHERE type='table' AND name='contacts';"
```

Du bör se `contacts` i resultatet.

### Steg 3: Testa API:et

**Windows PowerShell:**
```powershell
$body = @{
    name = "Test"
    email = "test@example.com"
    subject = "Test"
    message = "Test message"
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://sahkopomo.pages.dev/api/contacts" `
    -Method POST `
    -Headers @{"Content-Type"="application/json"} `
    -Body $body
```

**Linux/Mac/Bash:**
```bash
curl -X POST https://sahkopomo.pages.dev/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Test message"}'
```

Om detta fungerar, bör kontaktformuläret också fungera.

## Ytterligare felsökning

### Om migrationen misslyckas:

1. Kontrollera att du är inloggad i Wrangler:
   ```bash
   wrangler login
   ```

2. Kontrollera att databasen finns:
   ```bash
   wrangler d1 list
   ```

3. Kontrollera att databas-ID är korrekt i `wrangler.toml`:
   ```toml
   database_id = "f41acc00-bbbf-48ce-8e83-3424c77803cf"
   ```

### Om D1 binding saknas i Cloudflare Pages:

1. Gå till Cloudflare Dashboard → **Pages** → Ditt projekt (`sahkopomo`)
2. Klicka på **Settings** → **Functions**
3. Scrolla ner till **D1 Database bindings**
4. Kontrollera att `DB` binding finns och är kopplad till `sahkopomo-db`
5. Om den saknas, lägg till den:
   - Klicka på **Add binding**
   - Variable name: `DB`
   - D1 Database: Välj `sahkopomo-db`
   - Klicka på **Save**

### Kontrollera Functions logs:

1. Gå till Cloudflare Dashboard → **Pages** → Ditt projekt
2. Klicka på **Functions** → **Logs**
3. Leta efter fel när du skickar kontaktformuläret

## Snabb checklista

- [ ] Contacts migration kördes (`0002_add_contacts.sql`)
- [ ] Tabellen `contacts` finns i databasen
- [ ] D1 Database binding `DB` är konfigurerad i Cloudflare Pages
- [ ] API:et fungerar när du testar med curl
- [ ] Inga fel i Cloudflare Functions logs
