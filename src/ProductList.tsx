import { useEffect, useState } from 'react'
import './App.css'

type Product = {
  id?: string | number
  name?: string
  description?: string
  price?: number | string
  image?: string
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState<string>('')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('https://learn-api-yqos.onrender.com/items')
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)

        const contentType = (res.headers.get('content-type') || '').toLowerCase()
        let data: any = null

        if (contentType.includes('application/json')) {
          data = await res.json()
        } else if (contentType.includes('multipart/form-data')) {
          // Parse FormData response into a plain object
          try {
            const form = await res.formData()
            const obj: Record<string, any> = {}
            for (const [key, value] of form.entries()) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) {
                if (!Array.isArray(obj[key])) obj[key] = [obj[key]]
                obj[key].push(value)
              } else {
                obj[key] = value
              }
            }
            data = obj
          } catch {
            data = null
          }
        } else {
          // Fallback: try text, then JSON parse
          const text = await res.text()
          try {
            data = JSON.parse(text)
          } catch {
            data = text
          }
        }

        if (!cancelled) setProducts(Array.isArray(data) ? data : [])
      } catch (err: any) {
        if (!cancelled) setError(err.message || 'Failed to fetch')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  if (error) return <div className="error">Failed to load products: {error}</div>
  if (!products) return <div className="loading">Loading products…</div>

  const q = query.trim().toLowerCase()
  const filtered = q
    ? products.filter((p) => {
        const name = (p.name || '').toLowerCase()
        const desc = (p.description || '').toLowerCase()
        return name.includes(q) || desc.includes(q)
      })
    : products

  return (
    <div>
      <div className="search-bar">
        <input
          aria-label="Search products"
          className="search-input"
          placeholder="Search products by name or description…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="search-meta">
          <span className="search-count">{filtered.length} items</span>
          {query && (
            <button className="clear-btn" onClick={() => setQuery('')} aria-label="Clear search">
              ×
            </button>
          )}
        </div>
      </div>

      <div className="product-grid">
        {filtered.map((p) => (
            <div className="product-card" key={p.id ?? p.name}>
          {p.image ? (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img src={p.image} alt={p.name ?? 'product image'} className="product-image" />
          ) : (
            <div className="product-image placeholder">No image</div>
          )}
          <div className="product-body">
            <h3 className="product-name">{p.name}</h3>
            {p.description && <p className="product-desc">{p.description}</p>}
            {p.price !== undefined && p.price !== null && p.price !== '' && !isNaN(Number(p.price)) && (
              <div className="product-price">${Number(p.price).toFixed(2)}</div>
            )}
          </div>
            </div>
          ))}
          </div>
          </div>
        )
}
