const s = {
  overlay: {
    position: 'fixed', inset: 0,
    backgroundColor: 'rgba(76,18,22,0.4)',
    zIndex: 200, backdropFilter: 'blur(4px)',
    animation: 'fadeIn 0.25s ease both',
  },
  drawer: {
    position: 'fixed', top: 0, right: 0, bottom: 0,
    width: '400px', maxWidth: '100vw',
    backgroundColor: 'var(--color-background)',
    borderLeft: '1px solid var(--color-border)',
    display: 'flex', flexDirection: 'column',
    zIndex: 201,
    animation: 'slideInRight 0.35s cubic-bezier(0.4,0,0.2,1) both',
    boxShadow: '-24px 0 64px rgba(76,18,22,0.10)',
  },
}

const WA_NUMBER = '50241656808'

function buildWhatsAppUrl(items, total) {
  const lines = items.map((i) => `• ${i.name} x${i.qty} — Q.${(i.price * i.qty).toLocaleString('es-GT')}`)
  const msg = [
    '¡Hola! Quiero hacer un pedido 🍫',
    '',
    ...lines,
    '',
    `*Total: Q.${total.toLocaleString('es-GT')}*`,
  ].join('\n')
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
}

export default function Cart({ items, onClose, onUpdate, onOrder }) {
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  function handleCheckout() {
    if (items.length === 0) return
    window.open(buildWhatsAppUrl(items, total), '_blank', 'noopener,noreferrer')
    onOrder()
    onClose()
  }

  return (
    <>
      <div style={s.overlay} onClick={onClose} />
      <aside style={s.drawer}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)' }}>
          <div>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-primary)' }}>
              Tu pedido
            </span>
            {items.length > 0 && (
              <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginLeft: '0.5rem' }}>
                ({items.length} {items.length === 1 ? 'item' : 'items'})
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              width: '32px', height: '32px', display: 'flex', alignItems: 'center',
              justifyContent: 'center', borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)', backgroundColor: 'transparent',
              cursor: 'pointer', color: 'var(--color-primary)',
              transition: 'background-color var(--transition-fast)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem' }}>
          {items.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', height: '100%', gap: '0.75rem',
              color: 'var(--color-text-muted)' }}>
              <span style={{ fontSize: '2.5rem' }}>🍫</span>
              <p style={{ fontSize: '0.9375rem', fontWeight: 500 }}>Tu carrito está vacío</p>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-light)', textAlign: 'center' }}>
                Agrega tus brownies favoritos del menú
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex', gap: '0.875rem', padding: '0.875rem 0',
                  borderBottom: '1px solid var(--color-border)', alignItems: 'center',
                  animation: 'fadeInUp 0.3s ease both',
                }}
              >
                <img
                  src={item.image} alt={item.name}
                  style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-md)',
                    objectFit: 'cover', flexShrink: 0, backgroundColor: 'var(--color-surface)' }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-primary)',
                    marginBottom: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.name}
                  </p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                    Q.{item.price.toLocaleString('es-GT')} c/u
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                  <QtyBtn onClick={() => onUpdate(item.id, item.qty - 1)}>−</QtyBtn>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, minWidth: '20px', textAlign: 'center' }}>
                    {item.qty}
                  </span>
                  <QtyBtn onClick={() => onUpdate(item.id, item.qty + 1)}>+</QtyBtn>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.125rem' }}>
            <span style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)' }}>Total</span>
            <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-primary)' }}>
              Q.{total.toLocaleString('es-GT')}
            </span>
          </div>
          <button
            disabled={items.length === 0}
            onClick={handleCheckout}
            style={{
              width: '100%', padding: '0.9375rem',
              backgroundColor: items.length === 0 ? 'var(--color-border)' : 'var(--color-accent)',
              color: items.length === 0 ? 'var(--color-text-muted)' : '#fff',
              border: 'none', borderRadius: 'var(--radius-full)',
              fontSize: '0.9375rem', fontWeight: 600, cursor: items.length === 0 ? 'not-allowed' : 'pointer',
              transition: 'background-color var(--transition-fast), transform var(--transition-fast)',
              boxShadow: items.length > 0 ? '0 4px 16px rgba(76,18,22,0.25)' : 'none',
            }}
            onMouseEnter={(e) => {
              if (items.length > 0) {
                e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }
            }}
            onMouseLeave={(e) => {
              if (items.length > 0) {
                e.currentTarget.style.backgroundColor = 'var(--color-accent)'
                e.currentTarget.style.transform = 'translateY(0)'
              }
            }}
          >
            Hacer pedido por WhatsApp
          </button>
        </div>
      </aside>
    </>
  )
}

function QtyBtn({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '28px', height: '28px', borderRadius: 'var(--radius-sm)',
        border: '1.5px solid var(--color-border)', backgroundColor: 'transparent',
        cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center',
        justifyContent: 'center', color: 'var(--color-primary)',
        transition: 'background-color var(--transition-fast), border-color var(--transition-fast)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--color-surface)'
        e.currentTarget.style.borderColor = 'var(--color-primary)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent'
        e.currentTarget.style.borderColor = 'var(--color-border)'
      }}
    >
      {children}
    </button>
  )
}
