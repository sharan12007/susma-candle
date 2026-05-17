'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ShoppingBag, Heart, Filter, Grid3X3, LayoutGrid, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Product } from '@/lib/types'
import { products } from '@/lib/products'
import { useCart } from '@/context/cart-context'
import { useWishlist } from '@/context/wishlist-context'
import { cn } from '@/lib/utils'
import Footer from '@/components/footer'

function ProductCard({ product, index }: { product: Product; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const { addItem } = useCart()
  const { toggleItem, isInWishlist } = useWishlist()
  
  const isLiked = isInWishlist(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleItem(product.id)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <Link href={`/shop/${product.slug}`}>
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-card">
          {/* Placeholder gradient */}
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
              className="h-10 w-10 rounded-full bg-foreground/90 text-background hover:bg-foreground"
            >
              <ShoppingBag className="h-4 w-4" />
            </Button>
          </div>

          {/* Badges */}
          <div className="absolute left-4 top-4 flex flex-col gap-2">
            {product.new && (
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-light tracking-wider text-accent-foreground">
                NEW
              </span>
            )}
            {product.bestSeller && (
              <span className="rounded-full bg-primary/90 px-3 py-1 text-xs font-light tracking-wider text-primary-foreground">
                BEST SELLER
              </span>
            )}
          </div>

          {/* Candle placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-32 w-20 rounded-lg bg-foreground/10 shadow-lg transition-transform duration-500 group-hover:scale-110" />
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <h3 className="text-lg font-medium text-foreground transition-colors group-hover:text-primary">
            {product.name}
          </h3>
          <p className="text-sm font-light text-muted-foreground">{product.shortDescription}</p>
          <div className="flex items-center justify-between">
            <p className="text-lg font-light text-foreground">${product.price}</p>
            <div className="flex items-center gap-1">
              <svg className="h-4 w-4 fill-primary text-primary" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-light text-foreground">{product.rating}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function ShopPage() {
  const [sortBy, setSortBy] = useState('featured')
  const [filterCategory, setFilterCategory] = useState('all')
  const [gridView, setGridView] = useState<'3' | '4'>('4')

  const filteredProducts = products.filter((product) => {
    if (filterCategory === 'all') return true
    return product.category.toLowerCase().includes(filterCategory.toLowerCase())
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      default:
        return 0
    }
  })

  return (
    <main className="min-h-screen pt-20">

      {/* Hero */}
      <section className="relative pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="mb-4 text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Our Collection
            </h1>
            <p className="mx-auto max-w-2xl text-base font-light leading-relaxed text-muted-foreground">
              Discover our complete range of handcrafted luxury candles, each designed to
              transform your space and elevate your moments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-y border-border/50 py-4">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[180px] border-border/50 bg-card/50">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="signature">Signature Collection</SelectItem>
                  <SelectItem value="floral">Floral Series</SelectItem>
                  <SelectItem value="botanical">Botanical Collection</SelectItem>
                  <SelectItem value="limited">Limited Edition</SelectItem>
                  <SelectItem value="fresh">Fresh Collection</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] border-border/50 bg-card/50">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-light text-muted-foreground">
                {sortedProducts.length} products
              </span>
              <div className="hidden sm:flex sm:items-center sm:gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setGridView('3')}
                  className={gridView === '3' ? 'text-foreground' : 'text-muted-foreground'}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setGridView('4')}
                  className={gridView === '4' ? 'text-foreground' : 'text-muted-foreground'}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={`grid grid-cols-1 gap-8 sm:grid-cols-2 ${
              gridView === '4' ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
            }`}
          >
            {sortedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
