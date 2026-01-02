import ComparisonTool from '@/components/ComparisonTool'
import DealCard from '@/components/DealCard'
import TrustBadges from '@/components/TrustBadges'
import HowItWorks from '@/components/HowItWorks'
import { mockDeals } from '@/lib/mockData'

export default function HomePage() {
  // Server component - use mockDeals directly
  // Client-side will use localStorage data via getDeals() in client components
  const featuredDeals = mockDeals.slice(0, 6)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-teal-600 text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
              Vertaa sähkösopimuksia ja säästä<br />
              <span className="text-accent">satoja euroja vuodessa</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Helppo ja nopea vertailu – vaihda paras sopimus muutamassa minuutissa
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <ComparisonTool />
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrustBadges />
        </div>
      </section>

      {/* Featured Deals */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Suosituimmat sähkösopimukset
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Löydä paras sähkösopimus vertailemalla hintoja ja ehtoja. Kaikki sopimukset ovat luotettavilta sähkönmyyjiltä.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDeals.map((deal, index) => (
              <DealCard key={deal.id} deal={deal} index={index} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a
              href="/vertaa"
              className="btn-secondary inline-flex items-center gap-2"
            >
              Näytä kaikki sopimukset
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Miksi valita Sähköpomo.fi?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-card p-6">
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                Ilmainen vertailu
              </h3>
              <p className="text-gray-600">
                Vertailupalvelumme on täysin ilmainen. Maksat vain valitsemasi sähkösopimuksen.
              </p>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                Riippumaton
              </h3>
              <p className="text-gray-600">
                Näytämme kaikki saatavilla olevat sopimukset. Emme suosittele tiettyjä sähkönmyyjiä.
              </p>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                Helppo käyttää
              </h3>
              <p className="text-gray-600">
                Vertailu kestää vain muutaman minuutin. Löydä paras sopimus nopeasti ja helposti.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Blog Teaser */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Hyödyllisiä oppaita
            </h2>
            <p className="text-lg text-gray-600">
              Lue vinkkejä sähkösopimusten vertailuun ja säästämiseen
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="/oppaat/paras-sahkosopimus-2026" className="glass-card p-6 hover:shadow-xl transition-all duration-300 block">
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                Paras sähkösopimus 2026
              </h3>
              <p className="text-gray-600 mb-4">
                Opas parhaan sähkösopimuksen valintaan vuonna 2026. Mitä kannattaa huomioida?
              </p>
              <span className="text-primary font-medium">Lue lisää →</span>
            </a>
            
            <a href="/oppaat/miten-vaihdan-sahkonmyyjaa" className="glass-card p-6 hover:shadow-xl transition-all duration-300 block">
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                Miten vaihdan sähkönmyyjää?
              </h3>
              <p className="text-gray-600 mb-4">
                Vaihda sähkönmyyjää helposti. Opas vaihdon vaiheisiin ja mihin kannattaa kiinnittää huomiota.
              </p>
              <span className="text-primary font-medium">Lue lisää →</span>
            </a>
            
            <a href="/oppaat/uusiutuva-energia" className="glass-card p-6 hover:shadow-xl transition-all duration-300 block">
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                Uusiutuva energia
              </h3>
              <p className="text-gray-600 mb-4">
                Miksi valita uusiutuvaa energiaa? Opas vihreän sähkön valintaan ja ympäristövaikutuksiin.
              </p>
              <span className="text-primary font-medium">Lue lisää →</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
