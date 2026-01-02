import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blogi - Sähköpomo.fi',
  description: 'Pysy ajan tasalla sähkösopimuksista, hinnoista ja säästövinkeistä. Lue uutisia ja vinkkejä sähkön säästämiseen.',
}

const blogPosts = [
  {
    slug: 'sahkon-hinnat-laskevat-2026',
    title: 'Sähkön hinnat laskevat vuonna 2026',
    excerpt: 'Sähkön hinnat ovat laskeneet merkittävästi vuoden 2026 alussa. Vertaile sopimuksia ja hyödy alhaisista hinnoista.',
    date: '20.1.2026',
    category: 'Uutiset',
  },
  {
    slug: 'uusiutuva-energia-suosituin',
    title: 'Uusiutuva energia on suosituin valinta',
    excerpt: 'Yhä useampi suomalainen valitsee uusiutuvaa energiaa. Tutustu vihreän sähkön etuihin ja valitse ympäristöystävällinen vaihtoehto.',
    date: '18.1.2026',
    category: 'Ympäristö',
  },
  {
    slug: 'sahkosopimus-kesken-kauden',
    title: 'Voiko sähkösopimuksen vaihtaa kesken kauden?',
    excerpt: 'Usein sähkösopimuksen voi vaihtaa kesken kauden ilman maksuja. Opas vaihdon vaiheisiin ja ehtoihin.',
    date: '15.1.2026',
    category: 'Vinkit',
  },
  {
    slug: 'sahkon-saastaminen-kotona',
    title: '10 vinkkiä sähkön säästämiseen kotona',
    excerpt: 'Säästä sähköä ja rahaa näillä yksinkertaisilla vinkeillä. Pienet muutokset voivat tuoda suuria säästöjä.',
    date: '12.1.2026',
    category: 'Vinkit',
  },
  {
    slug: 'sahkosopimus-omakotitaloon',
    title: 'Paras sähkösopimus omakotitaloon',
    excerpt: 'Omakotitalon sähkönkulutus on yleensä suurempi kuin kerrostalossa. Löydä paras sopimus korkeammalle kulutukselle.',
    date: '10.1.2026',
    category: 'Oppaat',
  },
  {
    slug: 'sahkonmyyjien-vertailu',
    title: 'Suosituimpien sähkönmyyjien vertailu',
    excerpt: 'Vertaile suosituimpien sähkönmyyjien hintoja, palveluja ja asiakastyytyväisyyttä. Löydä sinulle paras vaihtoehto.',
    date: '8.1.2026',
    category: 'Vertailu',
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Blogi
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pysy ajan tasalla sähkösopimuksista, hinnoista ja säästövinkeistä.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="glass-card p-6 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-primary uppercase">
                  {post.category}
                </span>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Calendar size={14} />
                  <span>{post.date}</span>
                </div>
              </div>
              
              <h2 className="text-xl font-display font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {post.excerpt}
              </p>
              
              <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                Lue lisää
                <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
