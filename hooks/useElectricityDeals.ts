import { useState, useEffect } from 'react'
import { ElectricityDeal } from '@/lib/mockData'

interface UseElectricityDealsOptions {
  postalCode?: string
  consumption?: number
  apartmentType?: string
}

export function useElectricityDeals(options?: UseElectricityDealsOptions) {
  const [deals, setDeals] = useState<ElectricityDeal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API call
    const fetchDeals = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // In production, replace this with actual API call
        // const response = await fetch(`/api/deals?postalCode=${options?.postalCode}&consumption=${options?.consumption}`)
        // const data = await response.json()
        
        // For now, use mock data with delay to simulate API
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Import mock data dynamically
        const { mockDeals } = await import('@/lib/mockData')
        setDeals(mockDeals)
      } catch (err) {
        setError('Sopimuksia ei voitu ladata. Yritä myöhemmin uudelleen.')
        console.error('Error fetching deals:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDeals()
  }, [options?.postalCode, options?.consumption, options?.apartmentType])

  return { deals, loading, error }
}
