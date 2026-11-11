'use client'

import { AdminLocale } from '@/lib/adminI18n'
import { useAdminLocale } from '@/components/AdminLocaleContext'

function LangButton({
  code,
  label,
  active,
  onClick,
}: {
  code: AdminLocale
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-2 py-1 text-sm font-semibold rounded transition-colors ${
        active ? 'bg-primary text-white' : 'text-gray-600 hover:text-gray-900'
      }`}
      aria-pressed={active}
      aria-label={label}
    >
      {code === 'fi' ? 'FI' : 'NO'}
    </button>
  )
}

export default function AdminLanguageSwitcher() {
  const { locale, setLocale } = useAdminLocale()

  return (
    <div
      className="inline-flex items-center gap-0.5 rounded-lg border border-gray-200 bg-white p-0.5"
      role="group"
      aria-label="Admin language"
    >
      <LangButton
        code="fi"
        label="Suomi"
        active={locale === 'fi'}
        onClick={() => setLocale('fi')}
      />
      <span className="text-gray-300 select-none" aria-hidden>
        |
      </span>
      <LangButton
        code="no"
        label="Norsk"
        active={locale === 'no'}
        onClick={() => setLocale('no')}
      />
    </div>
  )
}
