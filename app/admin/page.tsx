'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Edit, Trash2, Save, X, Lock, Loader2 } from 'lucide-react'
import { ElectricityDeal } from '@/lib/mockData'
import { fetchSuppliers, createSupplier, updateSupplier, deleteSupplier, fetchContacts, Contact } from '@/lib/api'
import ContactsTab from '@/components/ContactsTab'

export default function AdminPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'suppliers' | 'contacts'>('suppliers')
  const [deals, setDeals] = useState<ElectricityDeal[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState<Partial<ElectricityDeal>>({})
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simple password protection (in production, use proper authentication)
    const storedAuth = sessionStorage.getItem('admin_authenticated')
    if (storedAuth === 'true') {
      setIsAuthenticated(true)
      loadDeals()
      loadContacts()
    }
  }, [])

  const loadDeals = async () => {
    setLoading(true)
    setError(null)
    try {
      const loadedDeals = await fetchSuppliers()
      setDeals(loadedDeals)
    } catch (err: any) {
      setError('Virhe ladatessa leverantörejä: ' + err.message)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const loadContacts = async () => {
    try {
      const loadedContacts = await fetchContacts()
      setContacts(loadedContacts)
    } catch (err: any) {
      console.error('Error loading contacts:', err)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple password check (change this password!)
    if (password === 'admin2026') {
      setIsAuthenticated(true)
      sessionStorage.setItem('admin_authenticated', 'true')
      loadDeals()
      loadContacts()
    } else {
      alert('Väärä salasana')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('admin_authenticated')
    router.push('/')
  }

  const handleEdit = (deal: ElectricityDeal) => {
    setEditingId(deal.id)
    setFormData(deal)
    setIsAdding(false)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Haluatko varmasti poistaa tämän leverantörin?')) {
      setLoading(true)
      setError(null)
      try {
        await deleteSupplier(id)
        await loadDeals()
      } catch (err: any) {
        setError('Virhe poistettaessa: ' + err.message)
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      if (editingId) {
        await updateSupplier(editingId, formData as Partial<ElectricityDeal>)
      } else {
        await createSupplier(formData as Omit<ElectricityDeal, 'id'>)
      }
      
      setEditingId(null)
      setIsAdding(false)
      setFormData({})
      await loadDeals()
    } catch (err: any) {
      setError('Virhe tallennettaessa: ' + err.message)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setIsAdding(false)
    setFormData({})
  }

  const handleAddNew = () => {
    setIsAdding(true)
    setEditingId(null)
    setFormData({
      supplier: '',
      price: '',
      basePrice: '',
      monthlyFee: '',
      type: 'Kiinteä',
      duration: '12 kk',
      renewable: false,
      savings: '',
      rating: 4.0,
      affiliateLink: '',
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="glass-card p-8 max-w-md w-full">
          <div className="flex items-center justify-center mb-6">
            <Lock size={48} className="text-primary" />
          </div>
          <h1 className="text-2xl font-display font-bold text-gray-900 mb-6 text-center">
            Admin-kirjautuminen
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Salasana
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                required
                placeholder="Syötä salasana"
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Kirjaudu sisään
            </button>
          </form>
          <div className="mt-4 text-center">
            <button
              onClick={() => router.push('/')}
              className="text-sm text-gray-600 hover:text-primary"
            >
              Takaisin etusivulle
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2">
              Admin-paneeli
            </h1>
            <p className="text-gray-600">
              Hallinnoi leverantörejä ja kontakteja
            </p>
          </div>
          <div className="flex gap-4">
            {activeTab === 'suppliers' && (
              <button
                onClick={handleAddNew}
                className="btn-primary flex items-center gap-2"
              >
                <Plus size={20} />
                Lisää uusi
              </button>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Kirjaudu ulos
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('suppliers')}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === 'suppliers'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Leverantörit ({deals.length})
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-6 py-3 font-medium transition-colors border-b-2 relative ${
              activeTab === 'contacts'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Yhteydenotot ({contacts.length})
            {contacts.filter(c => !c.read).length > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {contacts.filter(c => !c.read).length}
              </span>
            )}
          </button>
        </div>

        {activeTab === 'suppliers' && (isAdding || editingId) && (
          <div className="glass-card p-6 mb-6">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-4">
              {editingId ? 'Muokkaa leverantöriä' : 'Lisää uusi leverantöri'}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Leverantöri *
                  </label>
                  <input
                    type="text"
                    value={formData.supplier || ''}
                    onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hinta (snt/kWh) *
                  </label>
                  <input
                    type="text"
                    value={formData.price || ''}
                    onChange={(e) => {
                      const price = e.target.value
                      setFormData({
                        ...formData,
                        price,
                        basePrice: `${price} snt/kWh`,
                      })
                    }}
                    className="input-field"
                    required
                    placeholder="6,99"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Perusmaksu *
                  </label>
                  <input
                    type="text"
                    value={formData.monthlyFee || ''}
                    onChange={(e) => setFormData({ ...formData, monthlyFee: e.target.value })}
                    className="input-field"
                    required
                    placeholder="3,90 €/kk"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sopimuksen tyyppi *
                  </label>
                  <select
                    value={formData.type || 'Kiinteä'}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="input-field"
                    required
                  >
                    <option value="Kiinteä">Kiinteä</option>
                    <option value="Pörssisähkö">Pörssisähkö</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kesto *
                  </label>
                  <input
                    type="text"
                    value={formData.duration || ''}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="input-field"
                    required
                    placeholder="12 kk"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Säästöarvio *
                  </label>
                  <input
                    type="text"
                    value={formData.savings || ''}
                    onChange={(e) => setFormData({ ...formData, savings: e.target.value })}
                    className="input-field"
                    required
                    placeholder="250 €/vuosi"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Arvostelu (1-5) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={formData.rating || 4.0}
                    onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                    className="input-field"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Affiliate-linkki *
                  </label>
                  <input
                    type="url"
                    value={formData.affiliateLink || ''}
                    onChange={(e) => setFormData({ ...formData, affiliateLink: e.target.value })}
                    className="input-field"
                    required
                    placeholder="https://..."
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.renewable || false}
                      onChange={(e) => setFormData({ ...formData, renewable: e.target.checked })}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Uusiutuva energia
                    </span>
                  </label>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button type="submit" className="btn-primary flex items-center gap-2">
                  <Save size={20} />
                  Tallenna
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <X size={20} />
                  Peruuta
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'suppliers' && (
          <div className="glass-card p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-display font-bold text-gray-900">
                Leverantörit ({deals.length})
              </h2>
              {loading && <Loader2 className="animate-spin text-primary" size={20} />}
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Leverantöri</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Hinta</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Tyyppi</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Arvostelu</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Toiminnot</th>
                  </tr>
                </thead>
                <tbody>
                  {deals.map((deal) => (
                    <tr key={deal.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">{deal.supplier}</div>
                        {deal.renewable && (
                          <span className="text-xs text-primary">Uusiutuva</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-gray-700">{deal.basePrice}</td>
                      <td className="py-3 px-4 text-gray-700">{deal.type}</td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-medium">⭐ {deal.rating}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(deal)}
                            className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                            title="Muokkaa"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(deal.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Poista"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <ContactsTab 
            contacts={contacts} 
            onRefresh={loadContacts}
            loading={loading}
          />
        )}

        {error && (
          <div className="glass-card p-4 mt-6 bg-red-50 border border-red-200">
            <p className="text-red-700">{error}</p>
          </div>
        )}
      </div>
    </div>
  )
}
