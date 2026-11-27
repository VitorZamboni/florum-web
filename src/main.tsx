import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext.tsx'
import { ToastProvider } from '@/contexts/ToastContext.tsx'
import { CartProvider } from './contexts/CartContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <ToastProvider>
    <CartProvider>
      <App />
    </CartProvider>
    </ToastProvider>
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
