import { Search, FileText, CheckCircle } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: '1. Vertaile sopimuksia',
      description: 'Syötä postinumero ja vuosittainen kulutus. Vertaamme automaattisesti parhaat sopimukset.',
    },
    {
      icon: FileText,
      title: '2. Valitse paras sopimus',
      description: 'Tarkastele hintoja, ehtoja ja säästöarviota. Valitse sinulle sopivin sähkösopimus.',
    },
    {
      icon: CheckCircle,
      title: '3. Vaihda helposti',
      description: 'Siirry sähkönmyyjän sivulle ja täydennä tilaustiedot. Vaihto hoituu automaattisesti.',
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-gray-900 mb-12">
          Miten se toimii?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <Icon size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
