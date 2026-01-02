import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar } from 'lucide-react'

const blogContent: Record<string, { title: string; content: string; date: string; category: string }> = {
  'sahkon-hinnat-laskevat-2026': {
    title: 'Sähkön hinnat laskevat vuonna 2026',
    date: '20.1.2026',
    category: 'Uutiset',
    content: `
      <p>Sähkön hinnat ovat laskeneet merkittävästi vuoden 2026 alussa. Tämä on hyvä uutinen kuluttajille, jotka etsivät uutta sähkösopimusta.</p>
      <p>Asiantuntijat uskovat, että hinnat pysyvät alhaisina kevään ja kesän ajan. Nyt on hyvä hetki vertailla sopimuksia ja vaihtaa halvempaan.</p>
      <p>Käytä vertailupalveluamme löytääksesi parhaan sopimuksen alhaisilla hinnoilla.</p>
    `,
  },
  'uusiutuva-energia-suosituin': {
    title: 'Uusiutuva energia on suosituin valinta',
    date: '18.1.2026',
    category: 'Ympäristö',
    content: `
      <p>Yhä useampi suomalainen valitsee uusiutuvaa energiaa. Viime vuoden tilastot osoittavat, että yli 60% uusista sähkösopimuksista on uusiutuvaa energiaa.</p>
      <p>Tämä on positiivinen kehitys ympäristön kannalta. Uusiutuva energia auttaa vähentämään hiilijalanjälkeä ja tukee kestävää kehitystä.</p>
      <p>Valitse sinäkin uusiutuvaa energiaa seuraavalla sähkösopimuksellasi.</p>
    `,
  },
  'sahkosopimus-kesken-kauden': {
    title: 'Voiko sähkösopimuksen vaihtaa kesken kauden?',
    date: '15.1.2026',
    category: 'Vinkit',
    content: `
      <p>Usein sähkösopimuksen voi vaihtaa kesken kauden ilman maksuja. Tämä riippuu sopimuksen ehdoista.</p>
      <p>Kiinteähintaisissa sopimuksissa voi olla irtisanomisrajoituksia, mutta useimmissa tapauksissa vaihto on mahdollista.</p>
      <p>Käytä vertailupalveluamme löytääksesi paremman sopimuksen ja vaihda helposti.</p>
    `,
  },
  'sahkon-saastaminen-kotona': {
    title: '10 vinkkiä sähkön säästämiseen kotona',
    date: '12.1.2026',
    category: 'Vinkit',
    content: `
      <h3>1. Vaihda LED-valot</h3>
      <p>LED-valot kuluttavat 80% vähemmän energiaa kuin perinteiset hehkulamput.</p>
      
      <h3>2. Käytä energiatehokkaita laitteita</h3>
      <p>Valitse energiatehokkaita kodinkoneita. Ne säästävät energiaa ja rahaa pitkällä aikavälillä.</p>
      
      <h3>3. Sammuta laitteet kokonaan</h3>
      <p>Älä jätä laitteita valmiustilaan. Ne kuluttavat energiaa turhaan.</p>
      
      <h3>4. Säätö lämmitystä</h3>
      <p>Laske lämpötilaa yhdellä asteella ja säästä merkittävästi energiaa.</p>
      
      <h3>5. Käytä pesukoneita täydellä kuormalla</h3>
      <p>Pese pyykkiä ja astioita vain täydellä kuormalla.</p>
    `,
  },
  'sahkosopimus-omakotitaloon': {
    title: 'Paras sähkösopimus omakotitaloon',
    date: '10.1.2026',
    category: 'Oppaat',
    content: `
      <p>Omakotitalon sähkönkulutus on yleensä suurempi kuin kerrostalossa. Tämä vaikuttaa parhaan sopimuksen valintaan.</p>
      <p>Korkeammalla kulutuksella kannattaa kiinnittää erityisesti huomiota energiahintaan. Pieni ero sentissä kilowattituntia kohden kertautuu suureksi eroksi.</p>
      <p>Vertaa sopimuksia ja löydä paras vaihtoehto omakotitalollesi.</p>
    `,
  },
  'sahkonmyyjien-vertailu': {
    title: 'Suosituimpien sähkönmyyjien vertailu',
    date: '8.1.2026',
    category: 'Vertailu',
    content: `
      <p>Suomessa on useita sähkönmyyjiä, joista valita. Vertailemme suosituimpien myyjien hintoja, palveluja ja asiakastyytyväisyyttä.</p>
      <p>Käytä vertailupalveluamme löytääksesi sinulle parhaan vaihtoehdon. Näytämme kaikki saatavilla olevat sopimukset rehellisesti.</p>
    `,
  },
}

export async function generateStaticParams() {
  return Object.keys(blogContent).map((slug) => ({
    slug: slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogContent[params.slug]
  
  if (!post) {
    return {
      title: 'Artikkeli ei löytynyt - Sähköpomo.fi',
    }
  }
  
  return {
    title: `${post.title} - Sähköpomo.fi`,
    description: `Lue artikkelimme: ${post.title}`,
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogContent[params.slug]

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Takaisin blogiin
        </Link>

        <article className="glass-card p-8 md:p-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-primary uppercase">
              {post.category}
            </span>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar size={16} />
              <span>{post.date}</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-8">
            {post.title}
          </h1>
          
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{
              lineHeight: '1.8',
            }}
          />
        </article>
      </div>
    </div>
  )
}
