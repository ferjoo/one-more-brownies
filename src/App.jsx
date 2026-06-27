import { useState, useRef, useEffect } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import ProductGrid from './components/ProductGrid.jsx'
import Cart from './components/Cart.jsx'
import Footer from './components/Footer.jsx'
import { products } from './data/products.js'

const CART_KEY = 'omg_cart'

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items))
}

export default function App() {
  const [cartItems, setCartItems] = useState(loadCart)
  const [cartOpen, setCartOpen] = useState(false)
  const gridRef = useRef(null)

  useEffect(() => {
    saveCart(cartItems)
  }, [cartItems])

  function addToCart(product) {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
  }

  function updateQty(id, qty) {
    if (qty <= 0) {
      setCartItems((prev) => prev.filter((i) => i.id !== id))
    } else {
      setCartItems((prev) => prev.map((i) => i.id === id ? { ...i, qty } : i))
    }
  }

  function clearCart() {
    setCartItems([])
  }

  function scrollToGrid() {
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const totalItems = cartItems.reduce((sum, i) => sum + i.qty, 0)

  return (
    <>
      <Header cartCount={totalItems} onCartOpen={() => setCartOpen(true)} />

      <main>
        <Hero onShop={scrollToGrid} />
        <div ref={gridRef}>
          <ProductGrid products={products} onAdd={addToCart} />
        </div>
      </main>

      <Footer />

      {cartOpen && (
        <Cart
          items={cartItems}
          onClose={() => setCartOpen(false)}
          onUpdate={updateQty}
          onOrder={clearCart}
        />
      )}
    </>
  )
}
