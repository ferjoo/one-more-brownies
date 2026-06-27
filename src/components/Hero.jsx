import { useEffect, useRef } from 'react'
import cacaoBg from '../assets/IMG_3102.jpg'

export default function Hero({ onShop }) {
  const textRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    const els = textRef.current?.querySelectorAll('[data-anim]') ?? []
    els.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(24px)'
      setTimeout(() => {
        el.style.transition = 'opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, 100 + i * 120)
    })

    if (imgRef.current) {
      imgRef.current.style.opacity = '0'
      imgRef.current.style.transform = 'scale(0.97) translateX(16px)'
      setTimeout(() => {
        imgRef.current.style.transition = 'opacity 0.9s cubic-bezier(0.4,0,0.2,1), transform 0.9s cubic-bezier(0.4,0,0.2,1)'
        imgRef.current.style.opacity = '1'
        imgRef.current.style.transform = 'scale(1) translateX(0)'
      }, 250)
    }
  }, [])

  return (
    <section style={{ position: 'relative', padding: '6rem 1.5rem 5rem', overflow: 'hidden' }}>
      <img
        src={cacaoBg}
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', opacity: 0.07, pointerEvents: 'none',
        }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.88) 45%, rgba(253,245,245,0.55) 100%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: '1200px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '4rem', alignItems: 'center',
      }}>
        <div ref={textRef}>
          <span data-anim style={{
            display: 'inline-block', fontSize: '0.7rem', fontWeight: 600,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'var(--color-accent)', marginBottom: '1.25rem',
          }}>
            Horneado hoy
          </span>

          <h1 data-anim style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
            fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em',
            color: 'var(--color-primary)', marginBottom: '2rem',
          }}>
            Un brownie{' '}
            <em style={{ color: 'var(--color-accent)', fontStyle: 'italic', fontWeight: 800 }}>
              más.
            </em>
          </h1>

          <div data-anim>
            <button
              onClick={onShop}
              style={{
                padding: '0.875rem 2rem',
                backgroundColor: 'var(--color-primary)', color: '#fff',
                borderRadius: 'var(--radius-full)', fontSize: '0.9375rem',
                fontWeight: 600, border: 'none', cursor: 'pointer',
                transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
                boxShadow: '0 4px 20px rgba(76,18,22,0.25)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 28px rgba(76,18,22,0.35)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(76,18,22,0.25)'
              }}
            >
              Ver menú
            </button>
          </div>
        </div>

        <div ref={imgRef} style={{ position: 'relative' }}>
          <div style={{
            borderRadius: 'var(--radius-lg)', overflow: 'hidden', aspectRatio: '4/4.5',
            boxShadow: '0 24px 56px rgba(76,18,22,0.14)',
          }}>
            <img
              src="https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=900&q=85&auto=format&fit=crop"
              alt="Brownies artesanales"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
