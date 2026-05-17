'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/cart-context'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, itemCount } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-card"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-medium tracking-wide">Your Cart</h2>
                <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                  {itemCount}
                </span>
              </div>
              <Button variant="ghost" size="icon" onClick={closeCart}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex h-full flex-col items-center justify-center gap-4 text-center"
                >
                  <div className="rounded-full bg-muted p-6">
                    <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <p className="text-lg font-light text-muted-foreground">Your cart is empty</p>
                  <p className="text-sm text-muted-foreground/70">
                    Discover our collection of luxury candles
                  </p>
                  <Button onClick={closeCart} asChild className="mt-4">
                    <Link href="/shop">
                      Continue Shopping
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <motion.div
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="flex gap-4 rounded-lg bg-muted/30 p-4"
                      >
                        {/* Product Image Placeholder */}
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                          <div className="flex h-full items-center justify-center">
                            <div className="h-16 w-10 rounded bg-foreground/10" />
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <h3 className="font-medium text-foreground">{item.product.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.product.shortDescription}</p>
                          </div>

                          <div className="flex items-center justify-between">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center text-sm">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>

                            {/* Price */}
                            <span className="font-medium text-primary">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 self-start text-muted-foreground hover:text-destructive"
                          onClick={() => removeItem(item.product.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t border-border px-6 py-4"
              >
                <div className="mb-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-muted-foreground">Calculated at checkout</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-border pt-2 text-lg font-medium">
                    <span>Total</span>
                    <span className="text-primary">${subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button asChild className="w-full" size="lg" onClick={closeCart}>
                    <Link href="/checkout">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" onClick={closeCart} asChild>
                    <Link href="/shop">Continue Shopping</Link>
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
