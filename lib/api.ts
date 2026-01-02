import { ElectricityDeal } from './mockData'

const API_BASE = typeof window !== 'undefined' 
  ? window.location.origin 
  : 'https://sahkopomo.pages.dev'

// Fetch all suppliers from API
export async function fetchSuppliers(): Promise<ElectricityDeal[]> {
  try {
    const response = await fetch(`${API_BASE}/api/suppliers`)
    if (!response.ok) {
      throw new Error('Failed to fetch suppliers')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching suppliers:', error)
    // Fallback to mock data if API fails
    const { mockDeals } = await import('./mockData')
    return mockDeals
  }
}

// Fetch single supplier
export async function fetchSupplier(id: string): Promise<ElectricityDeal | null> {
  try {
    const response = await fetch(`${API_BASE}/api/suppliers/${id}`)
    if (!response.ok) {
      return null
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching supplier:', error)
    return null
  }
}

// Create new supplier
export async function createSupplier(deal: Omit<ElectricityDeal, 'id'>): Promise<ElectricityDeal> {
  const response = await fetch(`${API_BASE}/api/suppliers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(deal),
  })

  if (!response.ok) {
    throw new Error('Failed to create supplier')
  }

  return await response.json()
}

// Update supplier
export async function updateSupplier(id: string, updates: Partial<ElectricityDeal>): Promise<ElectricityDeal> {
  const response = await fetch(`${API_BASE}/api/suppliers/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  })

  if (!response.ok) {
    throw new Error('Failed to update supplier')
  }

  return await response.json()
}

// Delete supplier
export async function deleteSupplier(id: string): Promise<boolean> {
  const response = await fetch(`${API_BASE}/api/suppliers/${id}`, {
    method: 'DELETE',
  })

  return response.ok
}

// CONTACTS API

export interface Contact {
  id: string
  name: string
  email: string
  subject: string
  message: string
  created_at: number
  read: number
  replied: number
}

// Create new contact
export async function createContact(contact: Omit<Contact, 'id' | 'created_at' | 'read' | 'replied'>): Promise<Contact> {
  const response = await fetch(`${API_BASE}/api/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contact),
  })

  if (!response.ok) {
    throw new Error('Failed to create contact')
  }

  return await response.json()
}

// Fetch all contacts
export async function fetchContacts(): Promise<Contact[]> {
  try {
    const response = await fetch(`${API_BASE}/api/contacts`)
    if (!response.ok) {
      throw new Error('Failed to fetch contacts')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return []
  }
}

// Fetch single contact
export async function fetchContact(id: string): Promise<Contact | null> {
  try {
    const response = await fetch(`${API_BASE}/api/contacts/${id}`)
    if (!response.ok) {
      return null
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching contact:', error)
    return null
  }
}

// Update contact (mark as read/replied)
export async function updateContact(id: string, updates: { read?: boolean; replied?: boolean }): Promise<Contact> {
  const response = await fetch(`${API_BASE}/api/contacts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  })

  if (!response.ok) {
    throw new Error('Failed to update contact')
  }

  return await response.json()
}

// Delete contact
export async function deleteContact(id: string): Promise<boolean> {
  const response = await fetch(`${API_BASE}/api/contacts/${id}`, {
    method: 'DELETE',
  })

  return response.ok
}
