'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-display font-bold text-primary">
              Sähköpomo.fi
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Etusivu
            </Link>
            <Link href="/vertaa" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Vertaa sopimuksia
            </Link>
            <Link href="/oppaat" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Oppaat
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Blogi
            </Link>
            <Link href="/yhteystiedot" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Yhteystiedot
            </Link>
            <Link href="/admin" className="text-gray-500 hover:text-primary transition-colors font-medium text-sm">
              Admin
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Etusivu
            </Link>
            <Link
              href="/vertaa"
              className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Vertaa sopimuksia
            </Link>
            <Link
              href="/oppaat"
              className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Oppaat
            </Link>
            <Link
              href="/blog"
              className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Blogi
            </Link>
            <Link
              href="/yhteystiedot"
              className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Yhteystiedot
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
