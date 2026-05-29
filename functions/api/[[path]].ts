// Cloudflare Pages Function for suppliers API
// This handles all /api/* routes

interface ElectricityDeal {
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
  showOnFrontpage?: boolean
  priceValue?: number
  monthlyFeeValue?: number
  savingsValue?: number
}

interface D1Supplier {
  id: string
  supplier: string
  price: string
  base_price: string
  monthly_fee: string
  type: string
  duration: string
  renewable: number
  savings: string
  rating: number
  affiliate_link: string
  logo?: string | null
  show_on_frontpage?: number
  price_value?: number | null
  monthly_fee_value?: number | null
  savings_value?: number | null
  created_at?: number
  updated_at?: number
}

interface Contact {
  id: string
  name: string
  email: string
  subject: string
  message: string
  read: number
  replied: number
  created_at?: number
}

// Resolve the canonical numeric value of a deal, preferring the stored numeric
// field and falling back to parsing the legacy display string.
function resolveDealNumbers(source: any) {
  const price =
    typeof source.priceValue === 'number' ? source.priceValue : parseFiNumber(source.price)
  const monthlyFee =
    typeof source.monthly_fee_value === 'number'
      ? source.monthly_fee_value
      : typeof source.monthlyFeeValue === 'number'
      ? source.monthlyFeeValue
      : parseFiNumber(source.monthly_fee ?? source.monthlyFee)
  const savings =
    typeof source.savings_value === 'number'
      ? source.savings_value
      : typeof source.savingsValue === 'number'
      ? source.savingsValue
      : parseFiNumber(source.savings)
  const priceValue =
    typeof source.price_value === 'number' ? source.price_value : price
  return { priceValue, monthlyFee, savings }
}

// Convert D1 row to ElectricityDeal (display strings regenerated from numbers).
function dbRowToDeal(row: D1Supplier): ElectricityDeal {
  const { priceValue, monthlyFee, savings } = resolveDealNumbers(row)
  return {
    id: row.id,
    supplier: row.supplier,
    price: Number.isFinite(priceValue) ? formatFi(priceValue, 2) : row.price,
    basePrice: Number.isFinite(priceValue) ? `${formatFi(priceValue, 2)} snt/kWh` : row.base_price,
    monthlyFee: Number.isFinite(monthlyFee) ? `${formatFi(monthlyFee, 2)} €/kk` : row.monthly_fee,
    type: row.type,
    duration: row.duration,
    renewable: Boolean(row.renewable),
    savings: Number.isFinite(savings) ? `${formatFi(savings, 0)} €/vuosi` : row.savings,
    rating: row.rating,
    affiliateLink: row.affiliate_link,
    logo: row.logo || undefined,
    showOnFrontpage: row.show_on_frontpage !== undefined ? Boolean(row.show_on_frontpage) : true,
    priceValue: Number.isFinite(priceValue) ? priceValue : undefined,
    monthlyFeeValue: Number.isFinite(monthlyFee) ? monthlyFee : undefined,
    savingsValue: Number.isFinite(savings) ? savings : undefined,
  }
}

// Convert ElectricityDeal to D1 insert format (stores numbers + derived strings).
function dealToDbRow(
  deal: Omit<ElectricityDeal, 'id'> & { id?: string }
): Omit<D1Supplier, 'created_at' | 'updated_at'> {
  const { priceValue, monthlyFee, savings } = resolveDealNumbers(deal)
  return {
    id: deal.id || Date.now().toString(),
    supplier: deal.supplier,
    price: formatFi(priceValue, 2),
    base_price: `${formatFi(priceValue, 2)} snt/kWh`,
    monthly_fee: `${formatFi(monthlyFee, 2)} €/kk`,
    type: deal.type,
    duration: deal.duration,
    renewable: deal.renewable ? 1 : 0,
    savings: `${formatFi(savings, 0)} €/vuosi`,
    rating: deal.rating,
    affiliate_link: deal.affiliateLink,
    logo: deal.logo || null,
    show_on_frontpage: deal.showOnFrontpage === false ? 0 : 1,
    price_value: priceValue,
    monthly_fee_value: monthlyFee,
    savings_value: savings,
  }
}

function dbRowToContact(row: any): Contact {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    subject: row.subject,
    message: row.message,
    read: row.read,
    replied: row.replied,
    created_at: row.created_at,
  }
}

const JSON_CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
}

function corsJson(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: JSON_CORS_HEADERS })
}

// Numeric values are canonical; display strings are derived from them.
// (Mirrors lib/format.ts — duplicated because Pages Functions are bundled
// separately from the Next app and cannot import via the "@/" alias.)
function parseFiNumber(value: unknown): number {
  if (typeof value === 'number') return value
  if (typeof value !== 'string') return NaN
  const cleaned = value.replace(/[^\d,.-]/g, '').replace(',', '.')
  return parseFloat(cleaned)
}

function formatFi(value: number, decimals: number): string {
  if (!Number.isFinite(value)) return ''
  return value.toFixed(decimals).replace('.', ',')
}

// Verify the request carries a valid admin bearer token.
// Fails closed: if ADMIN_TOKEN is not configured, no request is authorized.
function isAuthorized(request: any, env: any): boolean {
  const expected = env.ADMIN_TOKEN
  if (!expected) return false
  const auth = request.headers.get('Authorization') || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7).trim() : ''
  return token.length > 0 && token === expected
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Validate a (possibly merged) deal before writing it to the database.
// Returns an error message, or null when the input is valid.
function validateDeal(deal: any): string | null {
  const requiredStrings = ['supplier', 'type', 'duration', 'affiliateLink']
  for (const field of requiredStrings) {
    if (!isNonEmptyString(deal[field])) {
      return `Pakollinen kenttä puuttuu tai on virheellinen: ${field}`
    }
  }

  const { priceValue, monthlyFee, savings } = resolveDealNumbers(deal)
  if (!Number.isFinite(priceValue) || priceValue < 0) {
    return 'Hinnan tulee olla kelvollinen, ei-negatiivinen luku'
  }
  if (!Number.isFinite(monthlyFee) || monthlyFee < 0) {
    return 'Perusmaksun tulee olla kelvollinen, ei-negatiivinen luku'
  }
  if (!Number.isFinite(savings) || savings < 0) {
    return 'Säästöarvion tulee olla kelvollinen, ei-negatiivinen luku'
  }

  const rating = Number(deal.rating)
  if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
    return 'Arvostelun tulee olla luku välillä 1–5'
  }
  if (deal.affiliateLink !== '#' && !/^https?:\/\//i.test(deal.affiliateLink)) {
    return 'Affiliate-linkin tulee olla kelvollinen http(s)-osoite'
  }
  return null
}

export async function onRequest(context: any) {
  const { request, env } = context
  const { method } = request
  const url = new URL(request.url)
  const pathname = url.pathname

  // Get D1 database binding
  const db = env.DB

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  }

  try {
    // POST /api/login - Authenticate admin and issue bearer token
    if (method === 'POST' && pathname === '/api/login') {
      const expectedPassword = env.ADMIN_PASSWORD
      const token = env.ADMIN_TOKEN

      if (!expectedPassword || !token) {
        return corsJson({ error: 'Admin login is not configured' }, 503)
      }

      const body = await request.json().catch(() => ({}))
      if (body.password && body.password === expectedPassword) {
        return corsJson({ token })
      }

      return corsJson({ error: 'Invalid credentials' }, 401)
    }

    // GET /api/suppliers - Get all suppliers
    if (method === 'GET' && pathname === '/api/suppliers') {
      const result = await db.prepare('SELECT * FROM suppliers ORDER BY rating DESC, price_value ASC').all()
      const deals = result.results.map((row: any) => dbRowToDeal(row))
      
      return new Response(JSON.stringify(deals), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
    }

    // GET /api/suppliers/:id - Get single supplier
    if (method === 'GET' && pathname.startsWith('/api/suppliers/')) {
      const id = pathname.split('/').pop()
      const result = await db.prepare('SELECT * FROM suppliers WHERE id = ?').bind(id).first()
      
      if (!result) {
        return new Response(JSON.stringify({ error: 'Not found' }), {
          status: 404,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        })
      }

      return new Response(JSON.stringify(dbRowToDeal(result as any)), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
    }

    // POST /api/suppliers - Create new supplier
    if (method === 'POST' && pathname === '/api/suppliers') {
      if (!isAuthorized(request, env)) {
        return corsJson({ error: 'Unauthorized' }, 401)
      }
      const body: Omit<ElectricityDeal, 'id'> = await request.json()

      const validationError = validateDeal(body)
      if (validationError) {
        return corsJson({ error: validationError }, 400)
      }

      const id = Date.now().toString()
      const row = dealToDbRow({ ...body, id })

      await db.prepare(
        `INSERT INTO suppliers (id, supplier, price, base_price, monthly_fee, type, duration, renewable, savings, rating, affiliate_link, logo, show_on_frontpage, price_value, monthly_fee_value, savings_value, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, unixepoch(), unixepoch())`
      ).bind(
        row.id,
        row.supplier,
        row.price,
        row.base_price,
        row.monthly_fee,
        row.type,
        row.duration,
        row.renewable,
        row.savings,
        row.rating,
        row.affiliate_link,
        row.logo,
        row.show_on_frontpage ?? 1,
        row.price_value,
        row.monthly_fee_value,
        row.savings_value
      ).run()

      return new Response(JSON.stringify({ id, ...body }), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
    }

    // PUT /api/suppliers/:id - Update supplier
    if (method === 'PUT' && pathname.startsWith('/api/suppliers/')) {
      if (!isAuthorized(request, env)) {
        return corsJson({ error: 'Unauthorized' }, 401)
      }
      const id = pathname.split('/').pop()
      const body: Partial<ElectricityDeal> = await request.json()
      
      // Get existing supplier
      const existing = await db.prepare('SELECT * FROM suppliers WHERE id = ?').bind(id).first()
      if (!existing) {
        return corsJson({ error: 'Not found' }, 404)
      }

      // Merge as a normalized (camelCase) deal so partial updates don't drop
      // fields whose DB column name differs from the API field name.
      const updated = { ...dbRowToDeal(existing as D1Supplier), ...body }
      const validationError = validateDeal(updated)
      if (validationError) {
        return corsJson({ error: validationError }, 400)
      }
      const row = dealToDbRow(updated)

      await db.prepare(
        `UPDATE suppliers 
         SET supplier = ?, price = ?, base_price = ?, monthly_fee = ?, type = ?, duration = ?, 
             renewable = ?, savings = ?, rating = ?, affiliate_link = ?, logo = ?, show_on_frontpage = ?,
             price_value = ?, monthly_fee_value = ?, savings_value = ?, updated_at = unixepoch()
         WHERE id = ?`
      ).bind(
        row.supplier,
        row.price,
        row.base_price,
        row.monthly_fee,
        row.type,
        row.duration,
        row.renewable,
        row.savings,
        row.rating,
        row.affiliate_link,
        row.logo,
        row.show_on_frontpage ?? 1,
        row.price_value,
        row.monthly_fee_value,
        row.savings_value,
        id
      ).run()

      return new Response(JSON.stringify(dbRowToDeal({ ...(existing as D1Supplier), ...row })), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
    }

    // DELETE /api/suppliers/:id - Delete supplier
    if (method === 'DELETE' && pathname.startsWith('/api/suppliers/')) {
      if (!isAuthorized(request, env)) {
        return corsJson({ error: 'Unauthorized' }, 401)
      }
      const id = pathname.split('/').pop()
      const result = await db.prepare('DELETE FROM suppliers WHERE id = ?').bind(id).run()

      if (result.success) {
        return new Response(JSON.stringify({ success: true }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        })
      }

      return new Response(JSON.stringify({ error: 'Not found' }), {
        status: 404,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
    }

    // CONTACTS API

    // POST /api/contacts - Create new contact
    if (method === 'POST' && pathname === '/api/contacts') {
      try {
        const body = await request.json()
        const { name, email, subject, message } = body

        if (!isNonEmptyString(name) || !isNonEmptyString(email) || !isNonEmptyString(subject) || !isNonEmptyString(message)) {
          return corsJson({ error: 'Täytä kaikki pakolliset kentät' }, 400)
        }

        if (!isValidEmail(email)) {
          return corsJson({ error: 'Virheellinen sähköpostiosoite' }, 400)
        }

        if (name.length > 200 || email.length > 200 || subject.length > 300 || message.length > 5000) {
          return corsJson({ error: 'Yksi tai useampi kenttä ylittää sallitun pituuden' }, 400)
        }

        if (!db) {
          return corsJson({ error: 'Database not configured' }, 500)
        }

        // Basic anti-spam: at most one message per email per 30 seconds
        const since = Math.floor(Date.now() / 1000) - 30
        const recent = await db.prepare(
          'SELECT COUNT(*) AS count FROM contacts WHERE email = ? AND created_at > ?'
        ).bind(email, since).first()
        if (recent && Number((recent as any).count) > 0) {
          return corsJson({ error: 'Olet juuri lähettänyt viestin. Yritä hetken kuluttua uudelleen.' }, 429)
        }

        const id = Date.now().toString()
        const result = await db.prepare(
          `INSERT INTO contacts (id, name, email, subject, message, created_at, read, replied)
           VALUES (?, ?, ?, ?, ?, unixepoch(), 0, 0)`
        ).bind(id, name, email, subject, message).run()

        if (!result.success) {
          return new Response(JSON.stringify({ error: 'Failed to save contact to database' }), {
            status: 500,
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          })
        }

        // Send Telegram notification to all configured chat IDs
        const telegramBotToken = env.TELEGRAM_BOT_TOKEN
        const telegramChatIds = env.TELEGRAM_CHAT_ID // Can be comma-separated list
        
        if (telegramBotToken && telegramChatIds) {
          try {
            const telegramMessage = `🔔 Uusi yhteydenotto Sähköpomo.fi:sta\n\n` +
              `📧 Nimi: ${name}\n` +
              `✉️ Sähköposti: ${email}\n` +
              `📌 Aihe: ${subject}\n` +
              `💬 Viesti:\n${message}\n\n` +
              `🕐 ${new Date().toLocaleString('fi-FI')}`
            
            // Support multiple chat IDs (comma-separated)
            const chatIdList = telegramChatIds.split(',').map((id: string) => id.trim()).filter((id: string) => id)
            
            // Send to all chat IDs
            await Promise.allSettled(
              chatIdList.map((chatId: string) =>
                fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    chat_id: chatId,
                    text: telegramMessage,
                    parse_mode: 'HTML'
                  })
                })
              )
            )
          } catch (telegramError) {
            console.error('Telegram notification error:', telegramError)
            // Don't fail the request if Telegram fails
          }
        }

        // Fetch the created contact to return complete object
        const created = await db.prepare('SELECT * FROM contacts WHERE id = ?').bind(id).first()
        
        return new Response(JSON.stringify(dbRowToContact(created)), {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        })
      } catch (dbError: any) {
        // Log full detail server-side; never leak internals (schema, SQL) to clients.
        console.error('Database error (contacts POST):', dbError)
        return corsJson(
          { error: 'Viestin tallentaminen epäonnistui. Yritä myöhemmin uudelleen.' },
          500
        )
      }
    }

    // GET /api/contacts - Get all contacts (admin only)
    if (method === 'GET' && pathname === '/api/contacts') {
      if (!isAuthorized(request, env)) {
        return corsJson({ error: 'Unauthorized' }, 401)
      }
      const result = await db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all()
      
      return new Response(JSON.stringify(result.results.map((row: any) => dbRowToContact(row))), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
    }

    // GET /api/contacts/:id - Get single contact
    if (method === 'GET' && pathname.startsWith('/api/contacts/')) {
      if (!isAuthorized(request, env)) {
        return corsJson({ error: 'Unauthorized' }, 401)
      }
      const id = pathname.split('/').pop()
      const result = await db.prepare('SELECT * FROM contacts WHERE id = ?').bind(id).first()
      
      if (!result) {
        return new Response(JSON.stringify({ error: 'Not found' }), {
          status: 404,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        })
      }

      return new Response(JSON.stringify(dbRowToContact(result)), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
    }

    // PUT /api/contacts/:id - Update contact (mark as read/replied)
    if (method === 'PUT' && pathname.startsWith('/api/contacts/')) {
      if (!isAuthorized(request, env)) {
        return corsJson({ error: 'Unauthorized' }, 401)
      }
      const id = pathname.split('/').pop()
      const body = await request.json()
      
      const updates: string[] = []
      const values: any[] = []
      
      if (body.read !== undefined) {
        updates.push('read = ?')
        values.push(body.read ? 1 : 0)
      }
      
      if (body.replied !== undefined) {
        updates.push('replied = ?')
        values.push(body.replied ? 1 : 0)
      }
      
      if (updates.length === 0) {
        return new Response(JSON.stringify({ error: 'No updates provided' }), {
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        })
      }
      
      values.push(id)
      
      await db.prepare(
        `UPDATE contacts SET ${updates.join(', ')} WHERE id = ?`
      ).bind(...values).run()

      const updated = await db.prepare('SELECT * FROM contacts WHERE id = ?').bind(id).first()

      return new Response(JSON.stringify(dbRowToContact(updated)), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
    }

    // DELETE /api/contacts/:id - Delete contact
    if (method === 'DELETE' && pathname.startsWith('/api/contacts/')) {
      if (!isAuthorized(request, env)) {
        return corsJson({ error: 'Unauthorized' }, 401)
      }
      const id = pathname.split('/').pop()
      const result = await db.prepare('DELETE FROM contacts WHERE id = ?').bind(id).run()

      if (result.success) {
        return new Response(JSON.stringify({ success: true }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        })
      }

      return new Response(JSON.stringify({ error: 'Not found' }), {
        status: 404,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
    }

    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error: any) {
    console.error('API Error:', error)
    return corsJson({ error: 'Internal server error' }, 500)
  }
}
