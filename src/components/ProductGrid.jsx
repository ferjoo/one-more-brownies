import { useState } from 'react'
import ProductCard from './ProductCard.jsx'
import { categories } from '../data/products.js'
import { useInView } from '../hooks/useInView.js'

export default function ProductGrid({ products, onAdd }) {
  const [active, setActive] = useState('todos')
  const [headerRef, headerInView] = useInView()
  const [gridRef, gridInView] = useInView()

  const filtered = active === 'todos'
    ? products
    : products.filter((p) => p.category === active)

  return (
    <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '3.5rem 1.5rem 5rem' }} id="menu">
      {/* Filters */}
      <div
        ref={headerRef}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '2rem', flexWrap: 'wrap', gap: '0.75rem',
          opacity: headerInView ? 1 : 0,
          transform: headerInView ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
      >
        <h2 style={{
          fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-muted)',
          letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>
          Menú
        </h2>

        <div style={{ display: 'flex', gap: '0.375rem' }}>
          {categories.map((cat) => {
            const isActive = active === cat
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                style={{
                  padding: '0.375rem 0.875rem', borderRadius: 'var(--radius-full)',
                  fontSize: '0.8125rem', fontWeight: 500, cursor: 'pointer',
                  textTransform: 'capitalize', border: '1.5px solid',
                  backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                  color: isActive ? '#fff' : 'var(--color-text-muted)',
                  borderColor: isActive ? 'var(--color-primary)' : 'var(--color-border)',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* Grid */}
      <div
        ref={gridRef}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}
      >
        {filtered.map((product, i) => (
          <div
            key={product.id}
            style={{
              opacity: gridInView ? 1 : 0,
              transform: gridInView ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.5s ease ${i * 60}ms, transform 0.5s ease ${i * 60}ms`,
            }}
          >
            <ProductCard product={product} onAdd={onAdd} />
          </div>
        ))}
      </div>
    </section>
  )
}
