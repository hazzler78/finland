# Felsökning: Kontaktformulär fungerar inte

## Vanliga problem och lösningar

### 1. Kontakttabellen saknas i databasen

**Symptom:** "Fel skickat meddelande" eller "Database error"

**Lösning:** Kör contacts migration:

```bash
wrangler d1 execute sahkopomo-db --file=./db/migrations/0002_add_contacts.sql
```

Verifiera att tabellen skapades:

```bash
wrangler d1 execute sahkopomo-db --command="SELECT name FROM sqlite_master WHERE type='table' AND name='contacts';"
```

### 2. D1 Database binding saknas i Cloudflare Pages

**Symptom:** "Database not configured"

**Lösning:**
1. Gå till Cloudflare Dashboard → **Pages** → Ditt projekt
2. Klicka på **Settings** → **Functions**
3. Scrolla ner till **D1 Database bindings**
4. Kontrollera att `DB` binding finns och är kopplad till `sahkopomo-db`
5. Om den saknas, lägg till den enligt instruktionerna i `QUICKSTART.md`

### 3. API-routing fungerar inte

**Symptom:** "Network error" eller CORS-fel

**Lösning:**
1. Kontrollera att `functions/api/[[path]].ts` finns
2. Verifiera att filen är deployad (kolla Cloudflare Pages Functions-loggarna)
3. Testa API:et direkt:
   ```bash
   curl https://sahkopomo.pages.dev/api/contacts
   ```

### 4. Testa API:et manuellt

Testa att skicka en kontakt direkt till API:et:

```bash
curl -X POST https://sahkopomo.pages.dev/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Test message"}'
```

Om detta fungerar men formuläret inte gör det, är problemet i frontend-koden.

### 5. Kontrollera browser console

Öppna Developer Tools (F12) i webbläsaren och kolla Console-fliken när du skickar formuläret. Där ser du detaljerade felmeddelanden.

### 6. Kontrollera Cloudflare Functions logs

1. Gå till Cloudflare Dashboard → **Pages** → Ditt projekt
2. Klicka på **Functions** → **Logs**
3. Leta efter fel när du skickar kontaktformuläret

## Snabb checklista

- [ ] Kontakttabellen finns i databasen (`0002_add_contacts.sql` kördes)
- [ ] D1 Database binding är konfigurerad i Cloudflare Pages
- [ ] API-filen `functions/api/[[path]].ts` finns och är deployad
- [ ] Inga fel i browser console
- [ ] Inga fel i Cloudflare Functions logs

## Ytterligare hjälp

Om inget av ovanstående löser problemet:

1. Kontrollera att alla migrationer är körda:
   ```bash
   wrangler d1 execute sahkopomo-db --file=./db/migrations/0001_initial.sql
   wrangler d1 execute sahkopomo-db --file=./db/migrations/0002_add_contacts.sql
   ```

2. Verifiera databasstrukturen:
   ```bash
   wrangler d1 execute sahkopomo-db --command="PRAGMA table_info(contacts);"
   ```

3. Testa att läsa från databasen:
   ```bash
   wrangler d1 execute sahkopomo-db --command="SELECT COUNT(*) FROM contacts;"
   ```
