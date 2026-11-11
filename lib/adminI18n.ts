export type AdminLocale = 'fi' | 'no'

export const ADMIN_LOCALE_STORAGE_KEY = 'sahkopomo-admin-locale'

const messages = {
  fi: {
    loginTitle: 'Admin-kirjautuminen',
    passwordLabel: 'Salasana',
    passwordPlaceholder: 'Syötä salasana',
    loginSubmit: 'Kirjaudu sisään',
    loginSubmitting: 'Kirjaudutaan...',
    backToHome: 'Takaisin etusivulle',
    wrongPassword: 'Väärä salasana',

    errorLoadSuppliers: 'Virhe ladattaessa sähkönmyyjiä: ',
    errorDelete: 'Virhe poistettaessa: ',
    errorSave: 'Virhe tallennettaessa: ',

    panelTitle: 'Admin-paneeli',
    panelSubtitle: 'Hallinnoi sähkönmyyjiä ja yhteydenottoja',
    addNew: 'Lisää uusi',
    logout: 'Kirjaudu ulos',
    tabSuppliers: 'Sähkönmyyjät',
    tabContacts: 'Yhteydenotot',

    editSupplierTitle: 'Muokkaa sähkönmyyjää',
    addSupplierTitle: 'Lisää uusi sähkönmyyjä',
    labelSupplier: 'Sähkönmyyjä',
    labelPrice: 'Hinta (snt/kWh)',
    labelMonthlyFee: 'Perusmaksu (€/kk)',
    labelContractType: 'Sopimuksen tyyppi',
    contractTypeKiinteä: 'Kiinteä',
    contractTypePörssisähkö: 'Pörssisähkö',
    labelDuration: 'Kesto',
    labelSavings: 'Säästöarvio (€/vuosi)',
    labelRating: 'Arvostelu (1-5)',
    labelAffiliate: 'Affiliate-linkki',
    labelRenewable: 'Uusiutuva energia',
    labelShowOnFrontpage: 'Näytä etusivun "Suosituimmat" -listassa',
    save: 'Tallenna',
    cancel: 'Peruuta',
    confirmDeleteSupplier: 'Haluatko varmasti poistaa tämän sähkönmyyjän?',

    suppliersHeading: 'Sähkönmyyjät',
    thSupplier: 'Sähkönmyyjä',
    thPrice: 'Hinta',
    thType: 'Tyyppi',
    thRating: 'Arvostelu',
    thFrontpage: 'Etusivu',
    thActions: 'Toiminnot',
    renewableBadge: 'Uusiutuva',
    frontpageVisible: 'Näkyy',
    frontpageHidden: 'Piilotettu',
    editAction: 'Muokkaa',
    deleteAction: 'Poista',

    contactsHeading: 'Yhteydenotot',
    contactsNewBadge: 'uutta',
    contactsEmpty: 'Ei yhteydenottoja',
    contactReplied: 'Vastattu',
    contactName: 'Nimi',
    contactEmail: 'Sähköposti',
    contactDate: 'Päivämäärä',
    contactMessage: 'Viesti',
    markRead: 'Merkitse luetuksi',
    markReplied: 'Merkitse vastatuksi',
    replyByEmail: 'Vastaa sähköpostilla',
    contactSelectPrompt: 'Valitse yhteydenotto vasemmalta nähdäksesi tiedot',
    confirmDeleteContact: 'Haluatko varmasti poistaa tämän yhteydenoton?',
  },
  no: {
    loginTitle: 'Admin-innlogging',
    passwordLabel: 'Passord',
    passwordPlaceholder: 'Skriv inn passord',
    loginSubmit: 'Logg inn',
    loginSubmitting: 'Logger inn …',
    backToHome: 'Tilbake til forsiden',
    wrongPassword: 'Feil passord',

    errorLoadSuppliers: 'Feil ved lasting av strømleverandører: ',
    errorDelete: 'Feil ved sletting: ',
    errorSave: 'Feil ved lagring: ',

    panelTitle: 'Adminpanel',
    panelSubtitle: 'Administrer strømleverandører og henvendelser',
    addNew: 'Legg til ny',
    logout: 'Logg ut',
    tabSuppliers: 'Strømleverandører',
    tabContacts: 'Henvendelser',

    editSupplierTitle: 'Rediger strømleverandør',
    addSupplierTitle: 'Legg til ny strømleverandør',
    labelSupplier: 'Strømleverandør',
    labelPrice: 'Pris (øre/kWh)',
    labelMonthlyFee: 'Grunnavgift (€/mnd)',
    labelContractType: 'Avtaletype',
    contractTypeKiinteä: 'Fastpris',
    contractTypePörssisähkö: 'Spotpris',
    labelDuration: 'Varighet',
    labelSavings: 'Spareestimat (€/år)',
    labelRating: 'Vurdering (1–5)',
    labelAffiliate: 'Affiliate-lenke',
    labelRenewable: 'Fornybar energi',
    labelShowOnFrontpage: 'Vis på forsiden i listen «Mest populære»',
    save: 'Lagre',
    cancel: 'Avbryt',
    confirmDeleteSupplier: 'Er du sikker på at du vil slette denne strømleverandøren?',

    suppliersHeading: 'Strømleverandører',
    thSupplier: 'Strømleverandør',
    thPrice: 'Pris',
    thType: 'Type',
    thRating: 'Vurdering',
    thFrontpage: 'Forside',
    thActions: 'Handlinger',
    renewableBadge: 'Fornybar',
    frontpageVisible: 'Synlig',
    frontpageHidden: 'Skjult',
    editAction: 'Rediger',
    deleteAction: 'Slett',

    contactsHeading: 'Henvendelser',
    contactsNewBadge: 'nye',
    contactsEmpty: 'Ingen henvendelser',
    contactReplied: 'Besvart',
    contactName: 'Navn',
    contactEmail: 'E-post',
    contactDate: 'Dato',
    contactMessage: 'Melding',
    markRead: 'Merk som lest',
    markReplied: 'Merk som besvart',
    replyByEmail: 'Svar på e-post',
    contactSelectPrompt: 'Velg en henvendelse til venstre for å se detaljene',
    confirmDeleteContact: 'Er du sikker på at du vil slette denne henvendelsen?',
  },
} as const

export type AdminMessageKey = keyof typeof messages.fi

export function readStoredAdminLocale(): AdminLocale {
  if (typeof window === 'undefined') return 'fi'
  const stored = localStorage.getItem(ADMIN_LOCALE_STORAGE_KEY)
  return stored === 'no' ? 'no' : 'fi'
}

export function persistAdminLocale(locale: AdminLocale): void {
  localStorage.setItem(ADMIN_LOCALE_STORAGE_KEY, locale)
}

export function adminT(locale: AdminLocale, key: AdminMessageKey): string {
  return messages[locale][key]
}

const CONTRACT_TYPE_KEYS: Record<string, AdminMessageKey> = {
  Kiinteä: 'contractTypeKiinteä',
  Pörssisähkö: 'contractTypePörssisähkö',
}

export function contractTypeDisplayLabel(locale: AdminLocale, type: string): string {
  const key = CONTRACT_TYPE_KEYS[type]
  if (key) return adminT(locale, key)
  return type
}

export function adminDateLocale(locale: AdminLocale): string {
  return locale === 'no' ? 'nb-NO' : 'fi-FI'
}
