import { useInView } from '../hooks/useInView.js'
import logoWhite from '../assets/1.png'

export default function Footer() {
  const [ref, inView] = useInView()

  return (
    <footer
      ref={ref}
      style={{
        backgroundColor: 'var(--color-primary)',
        padding: '3rem 1.5rem',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '1.5rem',
      }}>
        <img src={logoWhite} alt="one. more brownies" style={{ height: '48px', width: 'auto' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <a
            href="https://www.instagram.com/one.moregt/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem',
              transition: 'color var(--transition-fast)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
            </svg>
            @one.moregt
          </a>

          <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.3)' }}>
            © 2026 one more brownies
          </p>
        </div>
      </div>
    </footer>
  )
}
