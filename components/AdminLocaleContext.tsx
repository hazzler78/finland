'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  AdminLocale,
  AdminMessageKey,
  adminT,
  persistAdminLocale,
  readStoredAdminLocale,
} from '@/lib/adminI18n'

type AdminLocaleContextValue = {
  locale: AdminLocale
  setLocale: (locale: AdminLocale) => void
  t: (key: AdminMessageKey) => string
}

const AdminLocaleContext = createContext<AdminLocaleContextValue | null>(null)

export function AdminLocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<AdminLocale>('fi')

  useEffect(() => {
    setLocaleState(readStoredAdminLocale())
  }, [])

  const setLocale = useCallback((next: AdminLocale) => {
    setLocaleState(next)
    persistAdminLocale(next)
  }, [])

  const t = useCallback((key: AdminMessageKey) => adminT(locale, key), [locale])

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t])

  return <AdminLocaleContext.Provider value={value}>{children}</AdminLocaleContext.Provider>
}

export function useAdminLocale(): AdminLocaleContextValue {
  const ctx = useContext(AdminLocaleContext)
  if (!ctx) {
    throw new Error('useAdminLocale must be used within AdminLocaleProvider')
  }
  return ctx
}
