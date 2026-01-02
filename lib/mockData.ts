export interface ElectricityDeal {
  id: string
  supplier: string
  price: string
  basePrice: string
  monthlyFee: string
  type: string
  duration: string
  renewable: boolean
  savings: string
  rating: number
  affiliateLink: string
  logo?: string
}

// Function to get deals (checks localStorage first, falls back to mock data)
export function getDeals(): ElectricityDeal[] {
  if (typeof window === 'undefined') {
    return mockDeals
  }
  
  const stored = localStorage.getItem('sahkopomo_deals')
  if (stored) {
    try {
      const parsed = JSON.parse(stored)
      return parsed.length > 0 ? parsed : mockDeals
    } catch {
      return mockDeals
    }
  }
  
  return mockDeals
}

export const mockDeals: ElectricityDeal[] = [
  {
    id: '1',
    supplier: 'Hehku Energia',
    price: '6,99',
    basePrice: '6,99 snt/kWh',
    monthlyFee: '3,90 €/kk',
    type: 'Kiinteä',
    duration: '12 kk',
    renewable: true,
    savings: '250 €/vuosi',
    rating: 4.8,
    affiliateLink: '#',
  },
  {
    id: '2',
    supplier: 'Väre Energia',
    price: '7,15',
    basePrice: '7,15 snt/kWh',
    monthlyFee: '4,20 €/kk',
    type: 'Kiinteä',
    duration: '24 kk',
    renewable: true,
    savings: '220 €/vuosi',
    rating: 4.7,
    affiliateLink: '#',
  },
  {
    id: '3',
    supplier: 'Fortum',
    price: '7,45',
    basePrice: '7,45 snt/kWh',
    monthlyFee: '3,50 €/kk',
    type: 'Kiinteä',
    duration: '12 kk',
    renewable: false,
    savings: '200 €/vuosi',
    rating: 4.5,
    affiliateLink: '#',
  },
  {
    id: '4',
    supplier: 'Helen',
    price: '7,29',
    basePrice: '7,29 snt/kWh',
    monthlyFee: '4,00 €/kk',
    type: 'Kiinteä',
    duration: '24 kk',
    renewable: true,
    savings: '210 €/vuosi',
    rating: 4.6,
    affiliateLink: '#',
  },
  {
    id: '5',
    supplier: 'Oomi',
    price: '6,89',
    basePrice: '6,89 snt/kWh',
    monthlyFee: '3,90 €/kk',
    type: 'Kiinteä',
    duration: '12 kk',
    renewable: true,
    savings: '260 €/vuosi',
    rating: 4.9,
    affiliateLink: '#',
  },
  {
    id: '6',
    supplier: 'Caruna Energia',
    price: '7,35',
    basePrice: '7,35 snt/kWh',
    monthlyFee: '4,50 €/kk',
    type: 'Kiinteä',
    duration: '12 kk',
    renewable: false,
    savings: '190 €/vuosi',
    rating: 4.4,
    affiliateLink: '#',
  },
  {
    id: '7',
    supplier: 'Lumo Energia',
    price: '7,05',
    basePrice: '7,05 snt/kWh',
    monthlyFee: '3,80 €/kk',
    type: 'Pörssisähkö',
    duration: 'Ei sitoumusta',
    renewable: true,
    savings: '230 €/vuosi',
    rating: 4.6,
    affiliateLink: '#',
  },
  {
    id: '8',
    supplier: 'Kotimaan Energia',
    price: '7,19',
    basePrice: '7,19 snt/kWh',
    monthlyFee: '4,00 €/kk',
    type: 'Kiinteä',
    duration: '24 kk',
    renewable: true,
    savings: '215 €/vuosi',
    rating: 4.5,
    affiliateLink: '#',
  },
  {
    id: '9',
    supplier: 'Tibber',
    price: '6,95',
    basePrice: '6,95 snt/kWh',
    monthlyFee: '3,90 €/kk',
    type: 'Pörssisähkö',
    duration: 'Ei sitoumusta',
    renewable: true,
    savings: '245 €/vuosi',
    rating: 4.7,
    affiliateLink: '#',
  },
  {
    id: '10',
    supplier: 'E.ON',
    price: '7,39',
    basePrice: '7,39 snt/kWh',
    monthlyFee: '4,20 €/kk',
    type: 'Kiinteä',
    duration: '12 kk',
    renewable: false,
    savings: '185 €/vuosi',
    rating: 4.3,
    affiliateLink: '#',
  },
]
