import Link from 'next/link'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-display font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
          Sivua ei löydy
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Etsimääsi sivua ei valitettavasti löytynyt. Se saattaa olla poistettu tai siirretty.
        </p>
        <Link href="/" className="btn-primary inline-flex items-center gap-2">
          <Home size={20} />
          Takaisin etusivulle
        </Link>
      </div>
    </div>
  )
}
