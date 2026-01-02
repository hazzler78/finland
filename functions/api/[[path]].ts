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
  created_at?: number
  updated_at?: number
}

// Convert D1 row to ElectricityDeal
function dbRowToDeal(row: D1Supplier): ElectricityDeal {
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
function dealToDbRow(deal: Omit<ElectricityDeal, 'id'> & { id?: string }): Omit<D1Supplier, 'created_at' | 'updated_at'> {
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
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }

  try {
    // GET /api/suppliers - Get all suppliers
    if (method === 'GET' && pathname === '/api/suppliers') {
      const result = await db.prepare('SELECT * FROM suppliers ORDER BY rating DESC, price ASC').all()
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
      const body: Omit<ElectricityDeal, 'id'> = await request.json()
      const id = Date.now().toString()
      const row = dealToDbRow({ ...body, id })

      await db.prepare(
        `INSERT INTO suppliers (id, supplier, price, base_price, monthly_fee, type, duration, renewable, savings, rating, affiliate_link, logo, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, unixepoch(), unixepoch())`
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
        row.logo
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
      const id = pathname.split('/').pop()
      const body: Partial<ElectricityDeal> = await request.json()
      
      // Get existing supplier
      const existing = await db.prepare('SELECT * FROM suppliers WHERE id = ?').bind(id).first()
      if (!existing) {
        return new Response(JSON.stringify({ error: 'Not found' }), {
          status: 404,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        })
      }

      const updated = { ...existing, ...body }
      const row = dealToDbRow(updated as ElectricityDeal)

      await db.prepare(
        `UPDATE suppliers 
         SET supplier = ?, price = ?, base_price = ?, monthly_fee = ?, type = ?, duration = ?, 
             renewable = ?, savings = ?, rating = ?, affiliate_link = ?, logo = ?, updated_at = unixepoch()
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
        id
      ).run()

      return new Response(JSON.stringify(dbRowToDeal(row)), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
    }

    // DELETE /api/suppliers/:id - Delete supplier
    if (method === 'DELETE' && pathname.startsWith('/api/suppliers/')) {
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

    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error: any) {
    console.error('API Error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }
}
