'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

export default function ComparisonTool() {
  const [postalCode, setPostalCode] = useState('')
  const [consumption, setConsumption] = useState('5000')
  const [apartmentType, setApartmentType] = useState('kerrostalo')
  const router = useRouter()

  const handleCompare = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams({
      postinumero: postalCode,
      kulutus: consumption,
      tyyppi: apartmentType,
    })
    router.push(`/vertaa?${params.toString()}`)
  }

  return (
    <form onSubmit={handleCompare} className="glass-card p-6 md:p-8 space-y-4">
      <h3 className="text-xl font-display font-bold text-gray-900 mb-6">
        Vertaa sähkösopimuksia
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-2">
            Postinumero
          </label>
          <input
            id="postalCode"
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="00100"
            className="input-field"
            required
            maxLength={5}
            pattern="[0-9]{5}"
          />
        </div>
        
        <div>
          <label htmlFor="consumption" className="block text-sm font-medium text-gray-700 mb-2">
            Vuosittainen kulutus (kWh)
          </label>
          <input
            id="consumption"
            type="number"
            value={consumption}
            onChange={(e) => setConsumption(e.target.value)}
            placeholder="5000"
            className="input-field"
            required
            min="1000"
            max="50000"
          />
        </div>
        
        <div>
          <label htmlFor="apartmentType" className="block text-sm font-medium text-gray-700 mb-2">
            Asumismuoto
          </label>
          <select
            id="apartmentType"
            value={apartmentType}
            onChange={(e) => setApartmentType(e.target.value)}
            className="input-field"
          >
            <option value="kerrostalo">Kerrostalo</option>
            <option value="rivitalo">Rivitalo</option>
            <option value="omakotitalo">Omakotitalo</option>
            <option value="paritalo">Paritalo</option>
          </select>
        </div>
      </div>
      
      <button
        type="submit"
        className="btn-primary w-full md:w-auto flex items-center justify-center gap-2 text-lg"
      >
        <Search size={20} />
        Vertaa nyt
      </button>
    </form>
  )
}
