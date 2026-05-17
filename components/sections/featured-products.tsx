'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ShoppingBag, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/cart-context'
import { useWishlist } from '@/context/wishlist-context'
import { cn } from '@/lib/utils'

const featuredProducts = [
  {
    id: '1',
    name: 'Midnight Amber',
    slug: 'midnight-amber',
    price: 68,
    image: '/products/candle-1.jpg',
    category: 'Signature Collection',
    scent: 'Amber, Vanilla, Sandalwood',
    shortDescription: 'A warm, inviting fragrance',
  },
  {
    id: '2',
    name: 'Rose Noir',
    slug: 'rose-noir',
    price: 75,
    image: '/products/candle-2.jpg',
    category: 'Floral Series',
    scent: 'Black Rose, Oud, Musk',
    shortDescription: 'Dark and mysterious floral',
  },
  {
    id: '3',
    name: 'Cedar & Sage',
    slug: 'cedar-sage',
    price: 62,
    image: '/products/candle-3.jpg',
    category: 'Botanical Collection',
    scent: 'Cedar, White Sage, Bergamot',
    shortDescription: 'Fresh and earthy notes',
  },
  {
    id: '4',
    name: 'Golden Hour',
    slug: 'golden-hour',
    price: 85,
    image: '/products/candle-4.jpg',
    category: 'Limited Edition',
    scent: 'Honey, Saffron, Warm Woods',
    shortDescription: 'Luxurious and golden',
  },
]

function ProductCard({ product, index }: { product: typeof featuredProducts[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { addItem } = useCart()
  const { toggleItem, isInWishlist } = useWishlist()
  
  const isLiked = isInWishlist(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
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
      rating: 4.8,
      reviewCount: 120,
      inStock: true,
    })
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleItem(product.id)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.4, 0.25, 1] }}
      className="group relative"
    >
      <Link href={`/shop/${product.slug}`}>
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-card">
          {/* Placeholder gradient for product image */}
          <div className="absolute inset-0 bg-gradient-to-br from-muted via-card to-muted" />
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-background/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Quick actions */}
          <div className="absolute right-4 top-4 flex flex-col gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
            <Button
              size="icon"
              variant="secondary"
              onClick={handleToggleWishlist}
              className={cn(
                "h-10 w-10 rounded-full backdrop-blur-sm transition-colors",
                isLiked 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                  : "bg-foreground/90 text-background hover:bg-foreground"
              )}
            >
              <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              onClick={handleAddToCart}
              className="h-10 w-10 rounded-full bg-foreground/90 text-background backdrop-blur-sm hover:bg-foreground"
            >
              <ShoppingBag className="h-4 w-4" />
            </Button>
          </div>

          {/* Category badge */}
          <div className="absolute left-4 top-4">
            <span className="rounded-full bg-primary/90 px-3 py-1 text-xs font-light tracking-wider text-primary-foreground">
              {product.category}
            </span>
          </div>

          {/* Candle icon placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-32 w-20 rounded-lg bg-foreground/10 shadow-lg" />
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <h3 className="text-lg font-medium text-foreground transition-colors group-hover:text-primary">
            {product.name}
          </h3>
          <p className="text-sm font-light text-muted-foreground">{product.scent}</p>
          <p className="text-lg font-light text-foreground">${product.price}</p>
        </div>
      </Link>
    </motion.div>
  )
}

export default function FeaturedProducts() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-light tracking-[0.3em] text-primary">
            CURATED FOR YOU
          </span>
          <h2 className="mb-4 text-3xl font-light tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Featured Collection
          </h2>
          <p className="mx-auto max-w-2xl text-base font-light leading-relaxed text-muted-foreground">
            Discover our most beloved creations, each handpoured with intention
            and infused with the finest natural ingredients.
          </p>
        </motion.div>

        {/* Products grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Link href="/shop">
            <Button
              variant="outline"
              size="lg"
              className="border-foreground/20 px-8 py-6 text-sm font-light tracking-wider text-foreground hover:bg-foreground/5"
            >
              VIEW ALL PRODUCTS
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
