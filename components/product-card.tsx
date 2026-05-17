'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingBag, Star, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Product } from '@/lib/types'
import { useCart } from '@/context/cart-context'
import { formatCurrency } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link href={`/shop/${product.slug}`}>
        <motion.article
          className="group relative overflow-hidden rounded-xl bg-card"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-muted">
            <Image
              src={product.images[0] || '/placeholder-candle.jpg'}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Overlay on hover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent"
            />

            {/* Badges */}
            <div className="absolute left-3 top-3 flex flex-col gap-2">
              {product.new && (
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  New
                </span>
              )}
              {product.bestSeller && (
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                  Best Seller
                </span>
              )}
            </div>

            {/* Quick Add Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-4 left-4 right-4"
            >
              <Button
                onClick={handleAddToCart}
                className="w-full gap-2"
                size="lg"
              >
                <Plus className="h-4 w-4" />
                Add to Cart
              </Button>
            </motion.div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {product.category}
              </span>
            </div>

            <h3 className="mb-1 text-lg font-medium text-foreground transition-colors group-hover:text-primary">
              {product.name}
            </h3>

            <p className="mb-3 text-sm text-muted-foreground line-clamp-1">
              {product.shortDescription}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-lg font-medium text-primary">
                {formatCurrency(product.price)}
              </span>

              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount})
                </span>
              </div>
            </div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  )
}
