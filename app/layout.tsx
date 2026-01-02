import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import React from 'react'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sähköpomo.fi - Vertaa sähkösopimuksia ja säästä satoja euroja',
  description: 'Vertaa sähkösopimuksia nopeasti ja helposti. Löydä paras sähkösopimus ja säästä satoja euroja vuodessa. Ilmainen ja riippumaton vertailu.',
  keywords: 'sähkösopimus, sähkövertailu, sähkönmyyjä, sähkösopimukset, halpa sähkö',
  openGraph: {
    title: 'Sähköpomo.fi - Vertaa sähkösopimuksia',
    description: 'Vertaa sähkösopimuksia nopeasti ja säästä satoja euroja vuodessa',
    type: 'website',
    locale: 'fi_FI',
    url: 'https://sahkopomo.fi',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fi" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans">
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
