import React from 'react'
import ReactDOM from 'react-dom/client'
import { applyTheme } from './theme.js'
import App from './App.jsx'
import './index.css'

// Apply the color palette to CSS variables before render
applyTheme()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
