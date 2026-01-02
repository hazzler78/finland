import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-display font-bold text-xl mb-4">
              Sähköpomo.fi
            </h3>
            <p className="text-sm">
              Riippumaton vertailupalvelu sähkösopimuksille. Autamme sinua löytämään parhaan sähkösopimuksen.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Linkit</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Etusivu
                </Link>
              </li>
              <li>
                <Link href="/vertaa" className="hover:text-primary transition-colors">
                  Vertaa sopimuksia
                </Link>
              </li>
              <li>
                <Link href="/oppaat" className="hover:text-primary transition-colors">
                  Oppaat
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary transition-colors">
                  Blogi
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Tietoa</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/yhteystiedot" className="hover:text-primary transition-colors">
                  Yhteystiedot
                </Link>
              </li>
              <li>
                <Link href="/tietosuoja" className="hover:text-primary transition-colors">
                  Tietosuoja
                </Link>
              </li>
              <li>
                <Link href="/kayttoehdot" className="hover:text-primary transition-colors">
                  Käyttöehdot
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Yhteydenotto</h4>
            <p className="text-sm mb-2">
              Sähköposti: info@sahkopomo.fi
            </p>
            <p className="text-sm">
              Palvelumme on ilmainen ja riippumaton.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>
            © 2026 Sähköpomo.fi. Kaikki oikeudet pidätetään.
          </p>
        </div>
      </div>
    </footer>
  )
}
