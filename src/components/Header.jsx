import { useState, useEffect } from 'react'
import logo from '../assets/5.png'

export default function Header({ cartCount, onCartOpen }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="animate-fade-in"
      style={{
        position: 'sticky', top: 0, zIndex: 100,
        backgroundColor: scrolled ? 'rgba(255,255,255,0.92)' : 'var(--color-background)',
        borderBottom: `1px solid ${scrolled ? 'var(--color-border)' : 'transparent'}`,
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'background-color 400ms ease, border-color 400ms ease',
      }}
    >
      <div style={{
        maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem',
        height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <img src={logo} alt="one. more brownies" style={{ height: '32px', width: 'auto' }} />

        <button
          onClick={onCartOpen}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-primary)',
            padding: '0.5rem 1.125rem', borderRadius: 'var(--radius-full)',
            border: '1.5px solid var(--color-border)', backgroundColor: 'transparent',
            transition: 'all var(--transition-fast)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-primary)'
            e.currentTarget.style.borderColor = 'var(--color-primary)'
            e.currentTarget.style.color = '#fff'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.borderColor = 'var(--color-border)'
            e.currentTarget.style.color = 'var(--color-primary)'
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6"/>
          </svg>
          Carrito
          {cartCount > 0 && (
            <span className="animate-scale-in" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: '18px', height: '18px', borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-accent)', color: '#fff',
              fontSize: '0.625rem', fontWeight: 700,
            }}>
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
