import { useEffect, useRef } from 'react'
import cacaoBg from '../assets/IMG_3102.jpg'
import logoWhite from '../assets/1.png'

export default function Hero({ onShop }) {
  const textRef = useRef(null)

  useEffect(() => {
    const els = textRef.current?.querySelectorAll('[data-anim]') ?? []
    els.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(24px)'
      setTimeout(() => {
        el.style.transition = 'opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, 100 + i * 130)
    })
  }, [])

  return (
    <section style={{
      position: 'relative',
      minHeight: '92vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      backgroundColor: 'var(--color-primary)',
    }}>
      {/* Cacao image — visible texture */}
      <img
        src={cacaoBg}
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          opacity: 0.35,
          pointerEvents: 'none',
          mixBlendMode: 'luminosity',
        }}
      />
      {/* Dark overlay so text is readable */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(76,18,22,0.85) 50%, rgba(76,18,22,0.3) 100%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: '1200px', margin: '0 auto',
        padding: '5rem 1.5rem',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '4rem', alignItems: 'center',
      }}>
        <div ref={textRef}>
          <span data-anim style={{
            display: 'inline-block', fontSize: '0.7rem', fontWeight: 600,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.6)', marginBottom: '1.25rem',
          }}>
            Horneado hoy
          </span>

          <h1 data-anim style={{
            fontSize: 'clamp(2.75rem, 5.5vw, 4.25rem)',
            fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em',
            color: '#fff', marginBottom: '2.25rem',
          }}>
            Un brownie{' '}
            <em style={{ color: 'rgba(255,255,255,0.55)', fontStyle: 'italic' }}>
              más.
            </em>
          </h1>

          <div data-anim>
            <button
              onClick={onShop}
              style={{
                padding: '0.9rem 2.25rem',
                backgroundColor: '#fff',
                color: 'var(--color-primary)',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.9375rem', fontWeight: 700,
                border: 'none', cursor: 'pointer',
                transition: 'transform var(--transition-fast), box-shadow var(--transition-fast), background-color var(--transition-fast)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.4)'
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.9)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)'
                e.currentTarget.style.backgroundColor = '#fff'
              }}
            >
              Ver menú
            </button>
          </div>
        </div>

        {/* Right side — logo en grande sobre la imagen */}
        <div data-anim style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={logoWhite}
            alt="one. more brownies"
            style={{
              width: '100%', maxWidth: '340px',
              opacity: 0.9,
              filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.4))',
            }}
          />
        </div>
      </div>
    </section>
  )
}
