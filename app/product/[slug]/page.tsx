'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingBag, Heart, Minus, Plus, Star, Truck, Shield, Leaf, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getProductBySlug, products } from '@/lib/products'
import { useCart } from '@/context/cart-context'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function ProductPage() {
  const params = useParams()
  const slug = params.slug as string
  const product = getProductBySlug(slug)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'shipping'>('description')
  const { addItem } = useCart()

  if (!product) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-light text-foreground">Product Not Found</h1>
            <Link href="/shop">
              <Button variant="outline">Return to Shop</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.fragranceFamily === product.fragranceFamily)
    .slice(0, 4)

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Breadcrumb */}
      <section className="pt-28 pb-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm font-light text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/shop" className="hover:text-foreground">Shop</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Details */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square overflow-hidden rounded-lg bg-card">
                <div className="absolute inset-0 bg-gradient-to-br from-muted via-card to-muted" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-64 w-40 rounded-lg bg-foreground/10 shadow-2xl" />
                </div>
              </div>
              {/* Thumbnail strip */}
              <div className="mt-4 flex gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`aspect-square w-20 cursor-pointer overflow-hidden rounded-lg bg-card ${
                      i === 1 ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <div className="flex h-full items-center justify-center">
                      <div className="h-12 w-8 rounded bg-foreground/10" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-4 flex items-center gap-4">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-light tracking-wider text-primary">
                  {product.category}
                </span>
                {product.bestSeller && (
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-light tracking-wider text-accent">
                    BEST SELLER
                  </span>
                )}
              </div>

              <h1 className="mb-4 text-3xl font-light tracking-tight text-foreground md:text-4xl">
                {product.name}
              </h1>

              <div className="mb-6 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-primary text-primary'
                          : 'fill-muted text-muted'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm font-light text-foreground">{product.rating}</span>
                </div>
                <span className="text-sm font-light text-muted-foreground">
                  ({product.reviewCount} reviews)
                </span>
              </div>

              <p className="mb-6 text-2xl font-light text-foreground">${product.price}</p>

              <p className="mb-8 text-base font-light leading-relaxed text-muted-foreground">
                {product.description}
              </p>

              {/* Fragrance notes */}
              <div className="mb-8 space-y-4">
                <h3 className="text-sm font-medium tracking-wider text-foreground">FRAGRANCE NOTES</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="mb-1 text-xs font-light text-muted-foreground">TOP</p>
                    <p className="text-sm font-light text-foreground">{product.topNotes.join(', ')}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-light text-muted-foreground">HEART</p>
                    <p className="text-sm font-light text-foreground">{product.heartNotes.join(', ')}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-light text-muted-foreground">BASE</p>
                    <p className="text-sm font-light text-foreground">{product.baseNotes.join(', ')}</p>
                  </div>
                </div>
              </div>

              {/* Quantity selector */}
              <div className="mb-6 flex items-center gap-4">
                <span className="text-sm font-light text-foreground">Quantity</span>
                <div className="flex items-center rounded-lg border border-border/50">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center text-foreground">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="mb-8 flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="flex-1 bg-primary py-6 text-sm font-light tracking-wider text-primary-foreground hover:bg-primary/90"
                  onClick={() => addItem(product, quantity)}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  ADD TO CART
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-foreground/20 py-6 text-foreground hover:bg-foreground/5"
                >
                  <Heart className="mr-2 h-4 w-4" />
                  WISHLIST
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 border-t border-border/50 pt-8">
                <div className="flex flex-col items-center text-center">
                  <Truck className="mb-2 h-5 w-5 text-primary" />
                  <span className="text-xs font-light text-muted-foreground">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Shield className="mb-2 h-5 w-5 text-primary" />
                  <span className="text-xs font-light text-muted-foreground">30-Day Returns</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Leaf className="mb-2 h-5 w-5 text-primary" />
                  <span className="text-xs font-light text-muted-foreground">Natural Soy Wax</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-t border-border/50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-8 flex gap-8 border-b border-border/50">
            {(['description', 'details', 'shipping'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-light tracking-wider transition-colors ${
                  activeTab === tab
                    ? 'border-b-2 border-primary text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="max-w-3xl">
            {activeTab === 'description' && (
              <div className="space-y-4 text-base font-light leading-relaxed text-muted-foreground">
                <p>{product.description}</p>
                <p>
                  Each SUARIN candle is hand-poured in small batches using 100% natural soy wax
                  and premium cotton wicks. Our fragrances are carefully blended using the finest
                  essential oils and phthalate-free fragrance oils.
                </p>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="grid grid-cols-2 gap-4 text-sm font-light">
                <div className="flex justify-between border-b border-border/50 py-3">
                  <span className="text-muted-foreground">Size</span>
                  <span className="text-foreground">{product.size}</span>
                </div>
                <div className="flex justify-between border-b border-border/50 py-3">
                  <span className="text-muted-foreground">Weight</span>
                  <span className="text-foreground">{product.weight}</span>
                </div>
                <div className="flex justify-between border-b border-border/50 py-3">
                  <span className="text-muted-foreground">Burn Time</span>
                  <span className="text-foreground">{product.burnTime}</span>
                </div>
                <div className="flex justify-between border-b border-border/50 py-3">
                  <span className="text-muted-foreground">Fragrance Family</span>
                  <span className="text-foreground">{product.fragranceFamily}</span>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-4 text-base font-light leading-relaxed text-muted-foreground">
                <p>
                  <strong className="text-foreground">Free Standard Shipping</strong> on all
                  domestic orders. Orders are processed within 1-2 business days.
                </p>
                <p>
                  <strong className="text-foreground">Express Shipping</strong> available at
                  checkout for an additional fee. Express orders are delivered within 2-3
                  business days.
                </p>
                <p>
                  <strong className="text-foreground">International Shipping</strong> rates are
                  calculated at checkout. Please allow 7-14 business days for international
                  delivery.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-border/50 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="mb-8 text-2xl font-light tracking-tight text-foreground">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {relatedProducts.map((p) => (
                <Link key={p.id} href={`/product/${p.slug}`} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-card">
                    <div className="absolute inset-0 bg-gradient-to-br from-muted via-card to-muted" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-24 w-16 rounded bg-foreground/10 transition-transform duration-500 group-hover:scale-110" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-base font-medium text-foreground group-hover:text-primary">
                      {p.name}
                    </h3>
                    <p className="text-sm font-light text-muted-foreground">${p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
