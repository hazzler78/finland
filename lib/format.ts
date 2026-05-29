import { ElectricityDeal } from './mockData'

// Single source of truth for parsing and formatting deal money values.
// Numbers are canonical; display strings (Finnish: comma decimals + units)
// are always derived from them.

// Parse a Finnish-formatted numeric value (e.g. "6,99", "3,90 €/kk",
// "250 €/vuosi") or a plain number into a JS number. Returns NaN if unparseable.
export function parseFiNumber(value: unknown): number {
  if (typeof value === 'number') return value
  if (typeof value !== 'string') return NaN
  const cleaned = value.replace(/[^\d,.-]/g, '').replace(',', '.')
  return parseFloat(cleaned)
}

// Format a number with a fixed number of decimals using a comma separator.
function formatFi(value: number, decimals: number): string {
  if (!Number.isFinite(value)) return ''
  return value.toFixed(decimals).replace('.', ',')
}

export function formatPriceSnt(value: number): string {
  return `${formatFi(value, 2)} snt/kWh`
}

export function formatMonthlyFeeEur(value: number): string {
  return `${formatFi(value, 2)} €/kk`
}

export function formatSavingsEur(value: number): string {
  return `${formatFi(value, 0)} €/vuosi`
}

// Canonical numeric accessors: prefer the stored numeric value, falling back
// to parsing the legacy display string so older/mock data keeps working.
export function dealPriceSnt(deal: ElectricityDeal): number {
  const value = deal.priceValue
  return typeof value === 'number' && Number.isFinite(value) ? value : parseFiNumber(deal.price)
}

export function dealMonthlyFeeEur(deal: ElectricityDeal): number {
  const value = deal.monthlyFeeValue
  return typeof value === 'number' && Number.isFinite(value)
    ? value
    : parseFiNumber(deal.monthlyFee)
}

export function dealSavingsEur(deal: ElectricityDeal): number {
  const value = deal.savingsValue
  return typeof value === 'number' && Number.isFinite(value) ? value : parseFiNumber(deal.savings)
}
