'use client'

import { ReactNode } from 'react'
import { CartProvider } from '@/context/cart-context'
import { AuthProvider } from '@/context/auth-context'
import { WishlistProvider } from '@/context/wishlist-context'
import CartDrawer from '@/components/cart-drawer'
import NavbarClient from '@/components/navbar-client'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <NavbarClient />
          <CartDrawer />
          {children}
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  )
}
