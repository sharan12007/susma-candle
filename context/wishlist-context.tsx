'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface WishlistContextType {
  items: string[]
  addItem: (productId: string) => void
  removeItem: (productId: string) => void
  toggleItem: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  itemCount: number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('lumiere-wishlist')
    if (savedWishlist) {
      try {
        setItems(JSON.parse(savedWishlist))
      } catch {
        console.error('Failed to parse wishlist from localStorage')
      }
    }
    setIsInitialized(true)
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('lumiere-wishlist', JSON.stringify(items))
    }
  }, [items, isInitialized])

  const addItem = (productId: string) => {
    setItems((prev) => {
      if (prev.includes(productId)) return prev
      return [...prev, productId]
    })
  }

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((id) => id !== productId))
  }

  const toggleItem = (productId: string) => {
    setItems((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId)
      }
      return [...prev, productId]
    })
  }

  const isInWishlist = (productId: string) => items.includes(productId)

  const itemCount = items.length

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        toggleItem,
        isInWishlist,
        itemCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
