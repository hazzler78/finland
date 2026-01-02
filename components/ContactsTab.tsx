'use client'

import { useState } from 'react'
import { Mail, Trash2, CheckCircle, Circle, Reply } from 'lucide-react'
import { Contact, updateContact, deleteContact } from '@/lib/api'

interface ContactsTabProps {
  contacts: Contact[]
  onRefresh: () => void
  loading: boolean
}

export default function ContactsTab({ contacts, onRefresh, loading }: ContactsTabProps) {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)

  const handleMarkRead = async (id: string, read: boolean) => {
    setUpdating(id)
    try {
      await updateContact(id, { read })
      onRefresh()
    } catch (error) {
      console.error('Error updating contact:', error)
    } finally {
      setUpdating(null)
    }
  }

  const handleMarkReplied = async (id: string, replied: boolean) => {
    setUpdating(id)
    try {
      await updateContact(id, { replied })
      onRefresh()
    } catch (error) {
      console.error('Error updating contact:', error)
    } finally {
      setUpdating(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Haluatko varmasti poistaa tämän yhteydenoton?')) {
      setUpdating(id)
      try {
        await deleteContact(id)
        if (selectedContact?.id === id) {
          setSelectedContact(null)
        }
        onRefresh()
      } catch (error) {
        console.error('Error deleting contact:', error)
      } finally {
        setUpdating(null)
      }
    }
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString('fi-FI', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const unreadCount = contacts.filter(c => !c.read).length

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Contacts List */}
      <div className="lg:col-span-1">
        <div className="glass-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-display font-bold text-gray-900">
              Yhteydenotot ({contacts.length})
            </h2>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                {unreadCount} uutta
              </span>
            )}
          </div>
          
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {contacts.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-8">
                Ei yhteydenottoja
              </p>
            ) : (
              contacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`p-4 rounded-lg cursor-pointer transition-colors border ${
                    selectedContact?.id === contact.id
                      ? 'bg-primary/10 border-primary'
                      : contact.read
                      ? 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      : 'bg-white border-gray-300 hover:border-primary'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 mb-1">
                        {contact.name}
                      </div>
                      <div className="text-sm text-gray-600 mb-1">
                        {contact.email}
                      </div>
                      <div className="text-sm font-medium text-gray-700">
                        {contact.subject}
                      </div>
                    </div>
                    {!contact.read && (
                      <Circle size={12} className="text-primary fill-primary mt-1 flex-shrink-0" />
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    {formatDate(contact.created_at)}
                  </div>
                  <div className="flex gap-2 mt-2">
                    {contact.replied && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        Vastattu
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Contact Details */}
      <div className="lg:col-span-2">
        {selectedContact ? (
          <div className="glass-card p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
                  {selectedContact.subject}
                </h2>
                <div className="text-sm text-gray-600">
                  <div>Nimi: {selectedContact.name}</div>
                  <div>Sähköposti: <a href={`mailto:${selectedContact.email}`} className="text-primary hover:underline">{selectedContact.email}</a></div>
                  <div>Päivämäärä: {formatDate(selectedContact.created_at)}</div>
                </div>
              </div>
              <div className="flex gap-2">
                {!selectedContact.read && (
                  <button
                    onClick={() => handleMarkRead(selectedContact.id, true)}
                    disabled={updating === selectedContact.id}
                    className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    title="Merkitse luetuksi"
                  >
                    <CheckCircle size={20} />
                  </button>
                )}
                {!selectedContact.replied && (
                  <button
                    onClick={() => handleMarkReplied(selectedContact.id, true)}
                    disabled={updating === selectedContact.id}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="Merkitse vastatuksi"
                  >
                    <Reply size={20} />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(selectedContact.id)}
                  disabled={updating === selectedContact.id}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Poista"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-semibold text-gray-900 mb-3">Viesti:</h3>
              <div className="bg-gray-50 rounded-lg p-4 text-gray-700 whitespace-pre-wrap">
                {selectedContact.message}
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <a
                href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
                className="btn-primary flex items-center gap-2"
              >
                <Mail size={18} />
                Vastaa sähköpostilla
              </a>
            </div>
          </div>
        ) : (
          <div className="glass-card p-12 text-center">
            <Mail size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">
              Valitse yhteydenotto vasemmalta nähdäksesi tiedot
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
