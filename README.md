# Sähköpomo.fi

Moderni sähkösopimusten vertailupalvelu suomalaisille kuluttajille. Sivusto auttaa käyttäjiä löytämään parhaan sähkösopimuksen ja säästämään satoja euroja vuodessa.

## Teknologiat

- **Next.js 14+** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Lucide React** (icons)

## Ominaisuudet

- 🏠 **Etusivu** - Hero-osa, vertailutyökalu ja suosituimmat sopimukset
- 🔍 **Vertailusivu** - Suodattimet, järjestely ja yksityiskohtaiset tulokset
- 📚 **Oppaat** - Hyödyllisiä oppaita sähkösopimusten valintaan
- 📝 **Blogi** - Uutisia ja vinkkejä sähkön säästämiseen
- 📧 **Yhteystiedot** - Yhteydenottolomake ja tietosuojaseloste

## Asennus ja käyttöönotto

### Kehitysympäristö

```bash
# Asenna riippuvuudet
npm install

# Käynnistä kehityspalvelin
npm run dev
```

Sivusto on saatavilla osoitteessa [http://localhost:3000](http://localhost:3000)

### Tuotantoon valmistelu

```bash
# Rakenna tuotantoversio
npm run build

# Esikatsele tuotantoversiota
npm run preview
```

## Cloudflare Pages -julkaisu

Projekti on valmisteltu Cloudflare Pages -julkaisuun.

### Automaattinen julkaisu

1. **Yhdistä Git-repositorio Cloudflare Pagesiin:**
   - Mene Cloudflare Dashboard → Pages
   - Klikkaa "Create a project"
   - Yhdistä Git-repositoriosi

2. **Rakenna-asetukset:**
   - **Framework preset:** Next.js (Static HTML Export)
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Root directory:** `/`

3. **Mukautettu domain:**
   - Lisää domain `sahkopomo.fi` Cloudflare Pages -asetuksissa
   - Päivitä DNS-tietueet ohjeiden mukaan

### Manuaalinen julkaisu

```bash
# Rakenna projekti
npm run build

# Julkaise out/-hakemisto Cloudflare Pagesiin
# Käytä Wrangler CLI:tä tai Cloudflare Dashboardia
```

## Projektin rakenne

```
├── app/                    # Next.js App Router -sivut
│   ├── page.tsx           # Etusivu
│   ├── layout.tsx         # Pääasettelu
│   ├── globals.css        # Globaalit tyylit
│   ├── vertaa/            # Vertailusivu
│   ├── oppaat/            # Oppaat-sivut
│   ├── blog/              # Blogi-sivut
│   └── yhteystiedot/      # Yhteystiedot-sivu
├── components/            # Uudelleenkäytettävät komponentit
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── ComparisonTool.tsx
│   ├── DealCard.tsx
│   ├── DealFilters.tsx
│   ├── TrustBadges.tsx
│   └── HowItWorks.tsx
├── lib/                   # Apufunktiot ja data
│   └── mockData.ts       # Mock-data sähkösopimuksille
├── hooks/                 # React hooks
│   └── useElectricityDeals.ts
├── .cloudflare/           # Cloudflare Pages -konfiguraatio
├── wrangler.toml          # Cloudflare Workers/Pages config
└── public/               # Staattiset tiedostot
```

## Design-ohjeet

### Väripaletti

- **Primary**: `#00A388` (teal/vihreä)
- **Accent**: `#FF8C42` (oranssi)
- **Neutraali**: Valkea, harmaat sävyt

### Typografia

- **Otsikot**: Poppins (bold)
- **Teksti**: Inter (regular/medium)

### Design-trendit 2026

- Glassmorphism-kortit
- Paljon valkoista tilaa
- Pyöristetyt kulmat
- Hienovaraiset varjot
- Micro-animaatiot
- Mobile-first responsiivisuus

## API-integraatio

Tällä hetkellä sivusto käyttää mock-dataa (`lib/mockData.ts`). Tuotannossa korvaa tämä oikealla API:lla:

1. Päivitä `lib/mockData.ts` tai luo uusi API-moduuli
2. Lisää API-kutsu komponentteihin
3. Käsittele lataustilat ja virheet

## SEO

Sivusto on optimoitu hakukoneille:

- Meta-tagit (`app/layout.tsx`)
- Semanttinen HTML
- Strukturoitu data (voidaan lisätä)
- Nopea latausaika
- Responsiivinen design

## Tulevat parannukset

- [ ] Oikea API-integraatio
- [ ] Käyttäjätilin hallinta
- [ ] Sähköposti-ilmoitukset
- [ ] Lisää oppaita ja blogipostauksia
- [ ] Dark mode
- [ ] PWA-tuki
- [ ] Lisää animaatioita

## Lisenssi

Tämä projekti on yksityinen.

## Yhteystiedot

- Sähköposti: info@sahkopomo.fi
- Sivusto: https://sahkopomo.fi
