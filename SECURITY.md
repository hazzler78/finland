# Säkerhetsguide

## Känsliga uppgifter

**ALDRIG** committa följande till Git:

- Telegram Bot Tokens
- Chat IDs
- API-nycklar
- Lösenord
- Privata nycklar

## Vad att göra om känsliga uppgifter har committats

Om du av misstag har committat känsliga uppgifter:

1. **Omedelbart:** Återkalla/ändra den exponerade tokenen/nyckeln
2. Ta bort den från alla filer i repositoryt
3. Använd `git filter-branch` eller BFG Repo-Cleaner för att ta bort från historiken
4. Force push till GitHub (varning: detta skriver över historiken)

## För Telegram Bot Token

Om din Telegram Bot Token har exponerats:

1. Gå till [@BotFather](https://t.me/botfather) på Telegram
2. Skicka `/revoke` och välj din bot
3. BotFather ger dig en ny token
4. Uppdatera environment variables i Cloudflare Pages med den nya tokenen

## Admin-autentisering

Admin-panelen (`/admin`) och de skyddade API-rutterna verifieras på servern via
en bearer-token, inte längre med ett hårdkodat lösenord i klientkoden.

- `ADMIN_PASSWORD` – lösenordet som anges i inloggningsformuläret.
- `ADMIN_TOKEN` – en lång slumpmässig sträng som servern returnerar efter lyckad
  inloggning och kräver i `Authorization: Bearer <token>` på skyddade anrop.

Skyddade rutter: `POST/PUT/DELETE /api/suppliers` samt alla läs/skriv-rutter för
`/api/contacts` (förutom `POST /api/contacts`, som är det publika
kontaktformuläret). Om `ADMIN_TOKEN` saknas avvisas alla skyddade anrop ("fail
closed"). Sätt aldrig dessa värden i koden – använd environment variables.

## Best Practices

- Använd alltid environment variables för känsliga värden
- Lägg till `.env` och `.env.local` i `.gitignore`
- Använd placeholders i dokumentation (t.ex. `YOUR_BOT_TOKEN`)
- Kontrollera filer innan commit med `git diff`
