import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar } from 'lucide-react'

const guideContent: Record<string, { title: string; content: string; date: string }> = {
  'paras-sahkosopimus-2026': {
    title: 'Paras sähkösopimus 2026',
    date: '15.1.2026',
    content: `
      <h2>Miten valita paras sähkösopimus?</h2>
      <p>Sähkösopimuksen valinta vaatii hieman vertailua ja pohdintaa. Tässä oppaassa käymme läpi tärkeimmät asiat, joihin kannattaa kiinnittää huomiota.</p>
      
      <h3>1. Vertaa hintoja</h3>
      <p>Ensimmäinen askel on vertailla eri sähkönmyyjien hintoja. Kiinnitä huomiota sekä energiahintaan (snt/kWh) että perusmaksuun (€/kk). Kokonaiskustannus riippuu molemmista.</p>
      
      <h3>2. Tarkista sopimuksen kesto</h3>
      <p>Kiinteähintaiset sopimukset voivat olla 12, 24 tai 36 kuukauden mittaisia. Pitkä sopimus tarjoaa hintavarmuutta, mutta lyhyt sopimus antaa joustavuutta.</p>
      
      <h3>3. Huomioi uusiutuva energia</h3>
      <p>Jos ympäristö on sinulle tärkeä, valitse uusiutuvaa energiaa tarjoava sähkönmyyjä. Hintaero on usein pieni, mutta ympäristöhyöty merkittävä.</p>
      
      <h3>4. Lue sopimuksen ehdot</h3>
      <p>Ennen allekirjoitusta, lue sopimuksen ehdot huolellisesti. Kiinnitä erityisesti huomiota irtisanomisehtoihin ja mahdollisiin piilomaksuihin.</p>
    `,
  },
  'miten-vaihdan-sahkonmyyjaa': {
    title: 'Miten vaihdan sähkönmyyjää?',
    date: '12.1.2026',
    content: `
      <h2>Sähkönmyyjän vaihto on helppoa</h2>
      <p>Vaihtaminen on yleensä nopeaa ja helppoa. Uusi sähkönmyyjä hoitaa vaihdon puolestasi.</p>
      
      <h3>Vaihe 1: Valitse uusi sähkönmyyjä</h3>
      <p>Käytä vertailupalvelua löytääksesi sinulle sopivimman sähkösopimuksen. Vertaile hintoja, ehtoja ja palveluita.</p>
      
      <h3>Vaihe 2: Täydennä tilaustiedot</h3>
      <p>Siirry valitsemasi sähkönmyyjän sivulle ja täydennä tilaustiedot. Tarvitset henkilötunnuksen, osoitteen ja nykyisen sähkösopimuksen tiedot.</p>
      
      <h3>Vaihe 3: Uusi myyjä hoitaa loput</h3>
      <p>Uusi sähkönmyyjä ilmoittaa nykyiselle myyjällesi vaihdosta. Sinun ei tarvitse tehdä mitään muuta kuin odottaa vahvistusta.</p>
      
      <h3>Mihin aikaan vaihto tapahtuu?</h3>
      <p>Vaihto tapahtuu yleensä seuraavan laskutuskauden alussa. Tämä on tyypillisesti 1-2 kuukautta tilauksesta.</p>
    `,
  },
  'uusiutuva-energia': {
    title: 'Uusiutuva energia – Vihreän sähkön valinta',
    date: '10.1.2026',
    content: `
      <h2>Miksi valita uusiutuvaa energiaa?</h2>
      <p>Uusiutuva energia on tulevaisuus. Valitsemalla vihreän sähkön tuet kestävää kehitystä ja vähennät hiilijalanjälkeäsi.</p>
      
      <h3>Mikä on uusiutuva energia?</h3>
      <p>Uusiutuvaa energiaa tuotetaan luonnonvoimilla, kuten tuulella, auringolla, vesivoimalla ja biomassalla. Nämä energianlähteet eivät loppu ja ne eivät tuota hiilidioksidipäästöjä.</p>
      
      <h3>Paljonko uusiutuva energia maksaa?</h3>
      <p>Uusiutuvan energian hinta on lähes sama kuin perinteisen sähkön. Ero on usein vain muutamia senttejä kilowattituntia kohden.</p>
      
      <h3>Miten valita uusiutuvaa energiaa?</h3>
      <p>Valitse sähkösopimuksessa uusiutuvaa energiaa tarjoava sähkönmyyjä. Useimmat sähkönmyyjät tarjoavat vihreää sähköä vaihtoehtona.</p>
    `,
  },
  'kiintea-vai-porssisahko': {
    title: 'Kiinteä vai pörssisähkö?',
    date: '8.1.2026',
    content: `
      <h2>Kiinteä vai pörssisähkö – Mikä sopii sinulle?</h2>
      <p>Valinta kiinteän ja pörssisähkön välillä riippuu riskinsietokyvystäsi ja budjetista.</p>
      
      <h3>Kiinteähintainen sähkö</h3>
      <p>Kiinteähintaisessa sopimuksessa hinta pysyy samana koko sopimuskauden. Tämä tarjoaa hintavarmuutta ja helpottaa budjetointia.</p>
      <p><strong>Hyvät puolet:</strong> Hintavarmuus, helppo budjetoida</p>
      <p><strong>Huonot puolet:</strong> Et hyödy hintojen laskusta</p>
      
      <h3>Pörssisähkö</h3>
      <p>Pörssisähkön hinta vaihtelee tuntikohtaisesti markkinahintojen mukaan. Hinta voi olla halvempi kuin kiinteä, mutta myös korkeampi.</p>
      <p><strong>Hyvät puolet:</strong> Voit hyötyä halvoista tunneista, joustavuus</p>
      <p><strong>Huonot puolet:</strong> Hinta voi nousta, vaatii seurantaa</p>
    `,
  },
  'sahkosopimuksen-ehdot': {
    title: 'Sähkösopimuksen ehdot – Mitä tarkistaa?',
    date: '5.1.2026',
    content: `
      <h2>Tarkista sopimuksen ehdot ennen allekirjoitusta</h2>
      <p>Ennen kuin allekirjoitat sähkösopimuksen, lue sen ehdot huolellisesti.</p>
      
      <h3>1. Irtisanomisehdot</h3>
      <p>Tarkista, milloin voit irtisanoa sopimuksen ilman maksuja. Joissakin sopimuksissa on irtisanomisrajoituksia.</p>
      
      <h3>2. Hintojen muutokset</h3>
      <p>Ymmärrä, milloin ja miten hintoja voidaan muuttaa. Kiinteähintaisissa sopimuksissa hinta pysyy samana.</p>
      
      <h3>3. Perusmaksut</h3>
      <p>Tarkista perusmaksun suuruus ja milloin se veloitetaan. Perusmaksu vaikuttaa kokonaiskustannuksiin.</p>
      
      <h3>4. Piilomaksut</h3>
      <p>Lue sopimus huolellisesti ja tarkista, onko siinä piilomaksuja tai yllättäviä kustannuksia.</p>
    `,
  },
  'sahkon-hinta-2026': {
    title: 'Sähkön hinta 2026 – Trendit ja ennusteet',
    date: '3.1.2026',
    content: `
      <h2>Sähkön hinnat vuonna 2026</h2>
      <p>Sähkön hinnat vaihtelevat markkinoilla. Tässä oppaassa tarkastelemme trendejä ja ennusteita.</p>
      
      <h3>Mikä vaikuttaa sähkön hintaan?</h3>
      <p>Sähkön hintaan vaikuttavat mm. tuotanto, kysyntä, sääolosuhteet ja kansainväliset markkinat.</p>
      
      <h3>Ennusteet vuodelle 2026</h3>
      <p>Asiantuntijat odottavat sähkön hintojen pysyvän suhteellisen vakaana vuonna 2026. Uusiutuvan energian osuus kasvaa.</p>
      
      <h3>Miten seurata hintoja?</h3>
      <p>Käytä vertailupalvelua seurataksesi sähkön hintoja ja löytääksesi parhaan sopimuksen.</p>
    `,
  },
}

export async function generateStaticParams() {
  return Object.keys(guideContent).map((slug) => ({
    slug: slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const guide = guideContent[params.slug]
  
  if (!guide) {
    return {
      title: 'Opas ei löytynyt - Sähköpomo.fi',
    }
  }
  
  return {
    title: `${guide.title} - Sähköpomo.fi`,
    description: `Lue oppaamme: ${guide.title}`,
  }
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = guideContent[params.slug]

  if (!guide) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/oppaat"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Takaisin oppaisiin
        </Link>

        <article className="glass-card p-8 md:p-12">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Calendar size={16} />
            <span>{guide.date}</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-8">
            {guide.title}
          </h1>
          
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: guide.content }}
            style={{
              lineHeight: '1.8',
            }}
          />
        </article>
      </div>
    </div>
  )
}
