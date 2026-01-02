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

## Best Practices

- Använd alltid environment variables för känsliga värden
- Lägg till `.env` och `.env.local` i `.gitignore`
- Använd placeholders i dokumentation (t.ex. `YOUR_BOT_TOKEN`)
- Kontrollera filer innan commit med `git diff`
