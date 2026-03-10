'use client'

import { useEffect, useState } from 'react'
import DealCard from './DealCard'
import { ElectricityDeal } from '@/lib/mockData'
import { fetchSuppliers } from '@/lib/api'

export default function FeaturedDeals() {
  const [deals, setDeals] = useState<ElectricityDeal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const all = await fetchSuppliers()
        const visible = all.filter((deal) => deal.showOnFrontpage !== false)
        setDeals(visible.slice(0, 6))
      } catch (e) {
        console.error('Failed to load featured deals', e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="text-center text-gray-500">
        Ladataan suosituimpia sopimuksia...
      </div>
    )
  }

  if (!deals.length) {
    return (
      <div className="text-center text-gray-500">
        Ei sopimuksia etusivun listalle valittuna.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {deals.map((deal, index) => (
        <DealCard key={deal.id} deal={deal} index={index} />
      ))}
    </div>
  )
}

