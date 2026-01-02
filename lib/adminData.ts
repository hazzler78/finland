import { ElectricityDeal } from './mockData'

// Admin data management with localStorage
const STORAGE_KEY = 'sahkopomo_deals'

export function getDeals(): ElectricityDeal[] {
  if (typeof window === 'undefined') {
    return []
  }
  
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return []
    }
  }
  
  // Return default mock data if nothing stored
  return []
}

export function saveDeals(deals: ElectricityDeal[]): void {
  if (typeof window === 'undefined') return
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(deals))
}

export function addDeal(deal: Omit<ElectricityDeal, 'id'>): ElectricityDeal {
  const deals = getDeals()
  const newDeal: ElectricityDeal = {
    ...deal,
    id: Date.now().toString(),
  }
  deals.push(newDeal)
  saveDeals(deals)
  return newDeal
}

export function updateDeal(id: string, updates: Partial<ElectricityDeal>): boolean {
  const deals = getDeals()
  const index = deals.findIndex(d => d.id === id)
  
  if (index === -1) return false
  
  deals[index] = { ...deals[index], ...updates }
  saveDeals(deals)
  return true
}

export function deleteDeal(id: string): boolean {
  const deals = getDeals()
  const filtered = deals.filter(d => d.id !== id)
  
  if (filtered.length === deals.length) return false
  
  saveDeals(filtered)
  return true
}

// Initialize with mock data if empty
export function initializeDeals(defaultDeals: ElectricityDeal[]): void {
  if (typeof window === 'undefined') return
  
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    saveDeals(defaultDeals)
  }
}
