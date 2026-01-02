import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Oppaat ja vinkit - Sähköpomo.fi',
  description: 'Opastamme sinua sähkösopimusten valinnassa ja säästämisessä. Lue hyödyllisiä oppaita ja vinkkejä.',
}

const guides = [
  {
    slug: 'paras-sahkosopimus-2026',
    title: 'Paras sähkösopimus 2026',
    description: 'Opas parhaan sähkösopimuksen valintaan vuonna 2026. Mitä kannattaa huomioida hinnan, sopimuksen keston ja ehtojen suhteen?',
    category: 'Perusopas',
  },
  {
    slug: 'miten-vaihdan-sahkonmyyjaa',
    title: 'Miten vaihdan sähkönmyyjää?',
    description: 'Vaihda sähkönmyyjää helposti. Opas vaihdon vaiheisiin, mihin kannattaa kiinnittää huomiota ja miten vältyt yllätyksiltä.',
    category: 'Vaihto-opas',
  },
  {
    slug: 'uusiutuva-energia',
    title: 'Uusiutuva energia – Vihreän sähkön valinta',
    description: 'Miksi valita uusiutuvaa energiaa? Opas vihreän sähkön valintaan, ympäristövaikutuksiin ja hinnan eroihin.',
    category: 'Ympäristö',
  },
  {
    slug: 'kiintea-vai-porssisahko',
    title: 'Kiinteä vai pörssisähkö?',
    description: 'Mikä sopii sinulle paremmin: kiinteähintainen vai pörssisähkö? Vertaile eroja, etuja ja haittoja.',
    category: 'Vertailu',
  },
  {
    slug: 'sahkosopimuksen-ehdot',
    title: 'Sähkösopimuksen ehdot – Mitä tarkistaa?',
    description: 'Tarkista sähkösopimuksen ehdot ennen allekirjoitusta. Opas tärkeimpiin kohtiin, joihin kannattaa kiinnittää huomiota.',
    category: 'Perusopas',
  },
  {
    slug: 'sahkon-hinta-2026',
    title: 'Sähkön hinta 2026 – Trendit ja ennusteet',
    description: 'Miten sähkön hinta kehittyy vuonna 2026? Tarkastele trendejä ja saada vinkkejä hintojen seurantaan.',
    category: 'Hinnat',
  },
]

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Oppaat ja vinkit
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Opastamme sinua sähkösopimusten valinnassa ja säästämisessä. Lue hyödyllisiä oppaita ja vinkkejä.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/oppaat/${guide.slug}`}
              className="glass-card p-6 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BookOpen size={20} className="text-primary" />
                  <span className="text-xs font-semibold text-primary uppercase">
                    {guide.category}
                  </span>
                </div>
                <ArrowRight 
                  size={20} 
                  className="text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" 
                />
              </div>
              
              <h2 className="text-xl font-display font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                {guide.title}
              </h2>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                {guide.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-12 glass-card p-8 text-center">
          <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
            Etsitkö jotain muuta?
          </h2>
          <p className="text-gray-600 mb-6">
            Jos et löytänyt etsimääsi oppasta, ota yhteyttä ja autamme mielellämme.
          </p>
          <Link href="/yhteystiedot" className="btn-primary inline-block">
            Ota yhteyttä
          </Link>
        </div>
      </div>
    </div>
  )
}
