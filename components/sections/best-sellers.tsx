'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ShoppingBag, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/cart-context'

const bestSellers = [
  {
    id: '5',
    name: 'Midnight Amber',
    slug: 'midnight-amber',
    price: 68,
    rating: 4.9,
    reviews: 342,
    scent: 'Amber, Vanilla, Sandalwood',
    shortDescription: 'A warm, inviting fragrance',
    image: '/products/candle-1.jpg',
    category: 'Signature',
  },
  {
    id: '6',
    name: 'Velvet Rose',
    slug: 'velvet-rose',
    price: 72,
    rating: 4.8,
    reviews: 256,
    scent: 'Damask Rose, Peony, Musk',
    shortDescription: 'Elegant floral bouquet',
    image: '/products/candle-2.jpg',
    category: 'Floral',
  },
  {
    id: '7',
    name: 'Fireside',
    slug: 'fireside',
    price: 65,
    rating: 4.9,
    reviews: 418,
    scent: 'Smoky Wood, Cedar, Leather',
    shortDescription: 'Cozy and comforting',
    image: '/products/candle-3.jpg',
    category: 'Woody',
  },
]

export default function BestSellers() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const { addItem } = useCart()

  const handleAddToCart = (product: typeof bestSellers[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      images: [product.image],
      category: product.category,
      shortDescription: product.shortDescription,
      description: '',
      topNotes: [],
      heartNotes: [],
      baseNotes: [],
      size: '8 oz',
      burnTime: '60 hours',
      weight: '280g',
      fragranceFamily: 'Signature',
      rating: product.rating,
      reviewCount: product.reviews,
      inStock: true,
    })
  }

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-light tracking-[0.3em] text-primary">
            CUSTOMER FAVORITES
          </span>
          <h2 className="mb-4 text-3xl font-light tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Best Sellers
          </h2>
          <p className="mx-auto max-w-2xl text-base font-light leading-relaxed text-muted-foreground">
            Our most beloved creations, chosen by thousands of discerning customers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {bestSellers.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="group"
            >
              <Link href={`/shop/${product.slug}`} className="block">
                <div className="relative overflow-hidden rounded-lg border border-border/50 bg-card/50 p-8 transition-all duration-500 hover:border-primary/30 hover:bg-card">
                  {/* Rank badge */}
                  <div className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                    {index + 1}
                  </div>

                  {/* Product visual placeholder */}
                  <div className="mx-auto mb-6 flex h-40 w-24 items-center justify-center rounded-lg bg-foreground/5">
                    <div className="h-32 w-16 rounded bg-foreground/10" />
                  </div>

                  {/* Rating */}
                  <div className="mb-3 flex items-center justify-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="text-sm font-light text-foreground">{product.rating}</span>
                    <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
                  </div>

                  {/* Product info */}
                  <div className="text-center">
                    <h3 className="mb-1 text-xl font-medium text-foreground transition-colors group-hover:text-primary">
                      {product.name}
                    </h3>
                    <p className="mb-3 text-sm font-light text-muted-foreground">{product.scent}</p>
                    <p className="mb-4 text-lg font-light text-foreground">${product.price}</p>
                    <Button
                      variant="outline"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleAddToCart(product)
                      }}
                      className="w-full border-foreground/20 text-foreground hover:bg-primary hover:text-primary-foreground"
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
