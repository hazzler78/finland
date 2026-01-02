# Telegram Bot Setup för Notifikationer

## Steg 1: Skapa Telegram Bot

1. Öppna Telegram och sök efter **@BotFather**
2. Skicka kommandot `/newbot`
3. Följ instruktionerna:
   - Välj ett namn för din bot (t.ex. "Sähköpomo Notifier")
   - Välj ett användarnamn (måste sluta med "bot", t.ex. "sahkopomo_notifier_bot")
4. BotFather ger dig en **Bot Token** - spara denna!

## Steg 2: Hämta ditt Chat ID

1. Skicka ett meddelande till din nya bot
2. Öppna denna URL i webbläsaren (ersätt `YOUR_BOT_TOKEN` med din bot token):
   ```
   https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates
   ```
3. I JSON-svaret, hitta `"chat":{"id":123456789}` - detta är ditt Chat ID
4. Om du inte ser något, skicka ett meddelande till boten igen och uppdatera sidan

## Steg 3: Konfigurera i Cloudflare Pages

1. Gå till Cloudflare Dashboard → **Pages** → Ditt projekt (`sahkopomo`)
2. Klicka på **Settings** → **Environment Variables**
3. Lägg till följande variabler:

   **Production:**
   - `TELEGRAM_BOT_TOKEN` = Din bot token från BotFather
     - Exempel: `YOUR_BOT_TOKEN:YOUR_BOT_SECRET`
   - `TELEGRAM_CHAT_ID` = Ditt chat ID (bara numret, t.ex. `123456789`)
     - För flera mottagare: separera med komma (t.ex. `123456789,987654321,111222333`)

4. Klicka på **Save**

## Steg 4: Konfigurera i Cloudflare Pages

**Viktigt:** Använd dina egna värden från BotFather och ditt Chat ID. Dela aldrig dessa värden offentligt!

## Steg 5: Testa

1. Gå till `/yhteystiedot` på din webbplats
2. Fyll i kontaktformuläret och skicka
3. Du bör få ett Telegram-meddelande med kontaktinformationen
4. Om du har flera chat IDs konfigurerade kommer alla att få notifikationen

## Felsökning

### Boten svarar inte
- Kontrollera att du har skickat ett meddelande till boten först
- Verifiera att Bot Token är korrekt
- Verifiera att Chat ID är korrekt

### Inga notifikationer kommer
- Kontrollera Cloudflare Pages Functions-loggarna
- Verifiera att environment variables är satta korrekt
- Testa API:et manuellt med curl:

```bash
curl -X POST https://api.telegram.org/botYOUR_BOT_TOKEN/sendMessage \
  -H "Content-Type: application/json" \
  -d '{"chat_id":"YOUR_CHAT_ID","text":"Test message"}'
```

## Säkerhet

- **ALDRIG** dela din Bot Token offentligt
- Bot Token och Chat ID är känsliga uppgifter - håll dem hemliga
- Använd environment variables i Cloudflare Pages för säker lagring
