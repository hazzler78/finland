'use client'

import { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { ArrowUp, ArrowDown } from 'lucide-react'
import DealFilters, { FilterState } from '@/components/DealFilters'
import { mockDeals, ElectricityDeal } from '@/lib/mockData'

function ComparisonResults() {
  const searchParams = useSearchParams()
  const postalCode = searchParams.get('postinumero') || ''
  const consumption = searchParams.get('kulutus') || '5000'
  const apartmentType = searchParams.get('tyyppi') || 'kerrostalo'

  const [filters, setFilters] = useState<FilterState>({
    contractType: 'all',
    renewable: null,
    duration: 'all',
    minPrice: '',
    maxPrice: '',
  })
  
  const [sortBy, setSortBy] = useState<'price' | 'savings' | 'rating'>('price')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const filteredAndSortedDeals = useMemo(() => {
    let filtered = [...mockDeals]

    // Apply filters
    if (filters.contractType !== 'all') {
      filtered = filtered.filter(deal => deal.type.toLowerCase().includes(filters.contractType.toLowerCase()))
    }

    if (filters.renewable !== null) {
      filtered = filtered.filter(deal => deal.renewable === filters.renewable)
    }

    if (filters.duration !== 'all') {
      if (filters.duration === 'ei') {
        filtered = filtered.filter(deal => deal.duration.includes('Ei sitoumusta'))
      } else {
        filtered = filtered.filter(deal => deal.duration.includes(filters.duration))
      }
    }

    if (filters.minPrice) {
      filtered = filtered.filter(deal => parseFloat(deal.price.replace(',', '.')) >= parseFloat(filters.minPrice))
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(deal => parseFloat(deal.price.replace(',', '.')) <= parseFloat(filters.maxPrice))
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0
      
      if (sortBy === 'price') {
        const priceA = parseFloat(a.price.replace(',', '.'))
        const priceB = parseFloat(b.price.replace(',', '.'))
        comparison = priceA - priceB
      } else if (sortBy === 'savings') {
        const savingsA = parseFloat(a.savings.replace(/[^\d,]/g, '').replace(',', '.'))
        const savingsB = parseFloat(b.savings.replace(/[^\d,]/g, '').replace(',', '.'))
        comparison = savingsB - savingsA // Higher savings first
      } else if (sortBy === 'rating') {
        comparison = b.rating - a.rating
      }
      
      return sortOrder === 'asc' ? comparison : -comparison
    })

    return filtered
  }, [filters, sortBy, sortOrder])

  const handleSort = (field: 'price' | 'savings' | 'rating') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  const calculateMonthlyEstimate = (deal: ElectricityDeal) => {
    const pricePerKwh = parseFloat(deal.price.replace(',', '.'))
    const monthlyConsumption = parseFloat(consumption) / 12
    const energyCost = (monthlyConsumption * pricePerKwh) / 100
    const monthlyFee = parseFloat(deal.monthlyFee.replace(/[^\d,]/g, '').replace(',', '.'))
    return (energyCost + monthlyFee).toFixed(2)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Sähkösopimusten vertailu
          </h1>
          {postalCode && (
            <p className="text-lg text-gray-600">
              Postinumero: <span className="font-semibold">{postalCode}</span> • 
              Vuosikulutus: <span className="font-semibold">{consumption} kWh</span> • 
              Asumismuoto: <span className="font-semibold">{apartmentType}</span>
            </p>
          )}
        </div>

        {/* Calculator */}
        <div className="glass-card p-6 mb-8 bg-gradient-to-r from-primary/10 to-accent/10">
          <h2 className="text-xl font-display font-bold text-gray-900 mb-4">
            Säästölaskuri
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-gray-600">Nykyinen sopimus (arvio)</div>
              <div className="text-2xl font-bold text-gray-900">8,50 snt/kWh</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Paras löydetty sopimus</div>
              <div className="text-2xl font-bold text-primary">
                {filteredAndSortedDeals[0]?.basePrice || 'N/A'}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Säästöarvio vuodessa</div>
              <div className="text-2xl font-bold text-accent">
                {filteredAndSortedDeals[0]?.savings || 'N/A'}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <DealFilters onFilterChange={setFilters} />
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Sort Controls */}
            <div className="glass-card p-4 mb-6 flex flex-wrap items-center gap-4">
              <span className="text-sm font-medium text-gray-700">
                Järjestä:
              </span>
              <button
                onClick={() => handleSort('price')}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                  sortBy === 'price'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Hinta
                {sortBy === 'price' && (
                  sortOrder === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />
                )}
              </button>
              <button
                onClick={() => handleSort('savings')}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                  sortBy === 'savings'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Säästö
                {sortBy === 'savings' && (
                  sortOrder === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />
                )}
              </button>
              <button
                onClick={() => handleSort('rating')}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                  sortBy === 'rating'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Arvostelu
                {sortBy === 'rating' && (
                  sortOrder === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />
                )}
              </button>
            </div>

            {/* Results Count */}
            <div className="mb-4 text-sm text-gray-600">
              Löytyi <span className="font-semibold">{filteredAndSortedDeals.length}</span> sopimusta
            </div>

            {/* Deal Cards */}
            {filteredAndSortedDeals.length > 0 ? (
              <div className="space-y-6">
                {filteredAndSortedDeals.map((deal, index) => (
                  <div key={deal.id} className="glass-card p-6 hover:shadow-xl transition-all duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                      <div>
                        <h3 className="text-xl font-display font-bold text-gray-900 mb-1">
                          {deal.supplier}
                        </h3>
                        <div className="text-sm text-gray-600">
                          {deal.type} • {deal.duration}
                        </div>
                        {deal.renewable && (
                          <div className="text-xs text-primary mt-1">✓ Uusiutuva energia</div>
                        )}
                      </div>
                      
                      <div>
                        <div className="text-2xl font-display font-bold text-primary mb-1">
                          {deal.basePrice}
                        </div>
                        <div className="text-sm text-gray-600">
                          Perusmaksu: {deal.monthlyFee}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Arvioitu kuukausikustannus: ~{calculateMonthlyEstimate(deal)} €
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-lg font-semibold text-accent mb-1">
                          Säästöarvio: {deal.savings}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          ⭐ {deal.rating}
                        </div>
                      </div>
                      
                      <div>
                        <a
                          href={deal.affiliateLink}
                          className="btn-primary w-full text-center block"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Valitse sopimus
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-card p-12 text-center">
                <p className="text-lg text-gray-600">
                  Ei sopimuksia löytynyt valittujen suodattimien perusteella.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Kokeile muuttaa suodattimia.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ComparisonPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Ladataan...</div>}>
      <ComparisonResults />
    </Suspense>
  )
}
