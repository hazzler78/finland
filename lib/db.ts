import { ElectricityDeal } from './mockData'

// Database types for D1
export interface D1Supplier {
  id: string
  supplier: string
  price: string
  base_price: string
  monthly_fee: string
  type: string
  duration: string
  renewable: number // 0 or 1 in SQLite
  savings: string
  rating: number
  affiliate_link: string
  logo?: string | null
  created_at?: number
  updated_at?: number
}

// Convert D1 row to ElectricityDeal
export function dbRowToDeal(row: D1Supplier): ElectricityDeal {
  return {
    id: row.id,
    supplier: row.supplier,
    price: row.price,
    basePrice: row.base_price,
    monthlyFee: row.monthly_fee,
    type: row.type,
    duration: row.duration,
    renewable: Boolean(row.renewable),
    savings: row.savings,
    rating: row.rating,
    affiliateLink: row.affiliate_link,
    logo: row.logo || undefined,
  }
}

// Convert ElectricityDeal to D1 insert format
export function dealToDbRow(deal: Omit<ElectricityDeal, 'id'> & { id?: string }): Omit<D1Supplier, 'created_at' | 'updated_at'> {
  return {
    id: deal.id || Date.now().toString(),
    supplier: deal.supplier,
    price: deal.price,
    base_price: deal.basePrice,
    monthly_fee: deal.monthlyFee,
    type: deal.type,
    duration: deal.duration,
    renewable: deal.renewable ? 1 : 0,
    savings: deal.savings,
    rating: deal.rating,
    affiliate_link: deal.affiliateLink,
    logo: deal.logo || null,
  }
}
