'use client'

import { useState } from 'react'

interface DealFiltersProps {
  onFilterChange: (filters: FilterState) => void
}

export interface FilterState {
  contractType: string
  renewable: boolean | null
  duration: string
  minPrice: string
  maxPrice: string
}

export default function DealFilters({ onFilterChange }: DealFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    contractType: 'all',
    renewable: null,
    duration: 'all',
    minPrice: '',
    maxPrice: '',
  })

  const handleFilterChange = (key: keyof FilterState, value: string | boolean | null) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="glass-card p-6 space-y-6">
      <h3 className="text-xl font-display font-bold text-gray-900 mb-4">
        Suodata tuloksia
      </h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sopimuksen tyyppi
        </label>
        <select
          value={filters.contractType}
          onChange={(e) => handleFilterChange('contractType', e.target.value)}
          className="input-field"
        >
          <option value="all">Kaikki</option>
          <option value="kiinteä">Kiinteä</option>
          <option value="pörssi">Pörssisähkö</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Uusiutuva energia
        </label>
        <select
          value={filters.renewable === null ? 'all' : filters.renewable ? 'yes' : 'no'}
          onChange={(e) => {
            const value = e.target.value === 'all' ? null : e.target.value === 'yes'
            handleFilterChange('renewable', value)
          }}
          className="input-field"
        >
          <option value="all">Kaikki</option>
          <option value="yes">Vain uusiutuva</option>
          <option value="no">Ei uusiutuva</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sopimuksen kesto
        </label>
        <select
          value={filters.duration}
          onChange={(e) => handleFilterChange('duration', e.target.value)}
          className="input-field"
        >
          <option value="all">Kaikki</option>
          <option value="12">12 kuukautta</option>
          <option value="24">24 kuukautta</option>
          <option value="ei">Ei sitoumusta</option>
        </select>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Min. hinta (snt/kWh)
          </label>
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            placeholder="0"
            className="input-field"
            step="0.01"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max. hinta (snt/kWh)
          </label>
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            placeholder="10"
            className="input-field"
            step="0.01"
          />
        </div>
      </div>
      
      <button
        onClick={() => {
          const resetFilters: FilterState = {
            contractType: 'all',
            renewable: null,
            duration: 'all',
            minPrice: '',
            maxPrice: '',
          }
          setFilters(resetFilters)
          onFilterChange(resetFilters)
        }}
        className="w-full text-sm text-gray-600 hover:text-primary transition-colors"
      >
        Tyhjennä suodattimet
      </button>
    </div>
  )
}
