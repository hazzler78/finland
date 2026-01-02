import { Metadata } from 'next'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Yhteystiedot - Sähköpomo.fi',
  description: 'Ota yhteyttä, jos sinulla on kysymyksiä tai palautetta. Autamme mielellämme sähkösopimusten valinnassa.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Yhteystiedot
          </h1>
          <p className="text-xl text-gray-600">
            Ota yhteyttä, jos sinulla on kysymyksiä tai palautetta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="glass-card p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Mail size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-gray-900">Sähköposti</h3>
                <a href="mailto:info@sahkopomo.fi" className="text-primary hover:underline">
                  info@sahkopomo.fi
                </a>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Phone size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-gray-900">Puhelin</h3>
                <a href="tel:+358501234567" className="text-primary hover:underline">
                  +358 50 123 4567
                </a>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <MapPin size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-gray-900">Osoite</h3>
                <p className="text-gray-600">
                  Sähköpomo.fi<br />
                  00100 Helsinki<br />
                  Suomi
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Clock size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-gray-900">Aukioloajat</h3>
                <p className="text-gray-600">
                  Ma–Pe: 9:00–17:00<br />
                  La–Su: Suljettu
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-8">
          <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
            Lähetä viesti
          </h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nimi
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="input-field"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Sähköposti
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="input-field"
                required
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Aihe
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="input-field"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Viesti
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="input-field"
                required
              ></textarea>
            </div>
            
            <button type="submit" className="btn-primary w-full md:w-auto">
              Lähetä viesti
            </button>
          </form>
        </div>

        <div className="mt-12 glass-card p-6 bg-primary/5">
          <h3 className="font-display font-semibold text-gray-900 mb-2">
            Tietosuoja
          </h3>
          <p className="text-sm text-gray-600">
            Käsittelemme henkilötietojasi luottamuksellisesti GDPR-asetuksen mukaisesti. 
            Lue lisää <a href="/tietosuoja" className="text-primary hover:underline">tietosuojaselosteesta</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
