import { useState } from 'react'

const badgeColors = {
  Favorito:     { backgroundColor: 'var(--color-primary)', color: '#fff' },
  Nuevo:        { backgroundColor: 'var(--color-accent)', color: '#fff' },
  Popular:      { backgroundColor: '#5A3E2B', color: '#fff' },
  'Mejor Valor':{ backgroundColor: '#4A7C59', color: '#fff' },
  Regalo:       { backgroundColor: '#7A5230', color: '#fff' },
  Agotado:      { backgroundColor: 'var(--color-surface)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' },
}

export default function ProductCard({ product, onAdd }) {
  const [hovered, setHovered] = useState(false)
  const [added, setAdded] = useState(false)

  function handleAdd() {
    if (!product.stock || added) return
    onAdd(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 'var(--radius-lg)', overflow: 'hidden',
        backgroundColor: 'var(--color-background)',
        border: '1px solid var(--color-border)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? '0 12px 32px rgba(76,18,22,0.12)' : '0 1px 4px rgba(76,18,22,0.04)',
        transition: 'transform var(--transition-base), box-shadow var(--transition-base)',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden', backgroundColor: 'var(--color-surface)' }}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 600ms cubic-bezier(0.4,0,0.2,1)',
          }}
        />

        {product.badge && (
          <span style={{
            position: 'absolute', top: '0.75rem', left: '0.75rem',
            padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)',
            fontSize: '0.6875rem', fontWeight: 600,
            ...(badgeColors[product.badge] || {}),
          }}>
            {product.badge}
          </span>
        )}

        {product.stock && (
          <button
            onClick={handleAdd}
            style={{
              position: 'absolute', bottom: '0.75rem',
              left: '50%', transform: hovered ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(10px)',
              padding: '0.5rem 1.25rem',
              backgroundColor: added ? '#4A7C59' : 'var(--color-primary)',
              color: '#fff',
              borderRadius: 'var(--radius-full)', fontSize: '0.8125rem',
              fontWeight: 600, border: 'none', cursor: 'pointer',
              whiteSpace: 'nowrap',
              opacity: hovered ? 1 : 0,
              transition: 'opacity var(--transition-base), transform var(--transition-base), background-color var(--transition-fast)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            }}
          >
            {added ? '✓ Listo' : '+ Agregar'}
          </button>
        )}
      </div>

      {/* Body — name + price only */}
      <div style={{ padding: '0.875rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-primary)' }}>
          {product.name}
        </h3>
        <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-primary)', flexShrink: 0 }}>
          ${product.price.toLocaleString('es-MX')}
        </span>
      </div>
    </article>
  )
}
