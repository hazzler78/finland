// Cloudflare Pages Function for suppliers API
// This handles all /api/* routes

import { dbRowToDeal, dealToDbRow } from '../../lib/db'
import { ElectricityDeal } from '../../lib/mockData'

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
