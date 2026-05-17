'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles, Flower2, TreePine, Droplets } from 'lucide-react'
import { products } from '@/lib/products'

const collections = [
  {
    slug: 'signature-collection',
    name: 'Signature Collection',
    description: 'Our most beloved fragrances, crafted to perfection. These timeless scents represent the essence of Lumière.',
    icon: Sparkles,
    category: 'Signature Collection',
    image: '/products/signature.jpg',
  },
  {
    slug: 'floral-series',
    name: 'Floral Series',
    description: 'Delicate and romantic, our floral candles capture the beauty of blooming gardens and precious petals.',
    icon: Flower2,
    category: 'Floral Series',
    image: '/products/floral.jpg',
  },
  {
    slug: 'botanical-collection',
    name: 'Botanical Collection',
    description: 'Grounding and refreshing, these candles bring the serenity of nature into your home.',
    icon: TreePine,
    category: 'Botanical Collection',
    image: '/products/botanical.jpg',
  },
  {
    slug: 'fresh-collection',
    name: 'Fresh Collection',
    description: 'Clean and invigorating scents that refresh your space and uplift your spirit.',
    icon: Droplets,
    category: 'Fresh Collection',
    image: '/products/fresh.jpg',
  },
]

// Get product count for each collection
const getCollectionProductCount = (category: string) => {
  return products.filter(p => p.category === category).length
}

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl font-light tracking-wide text-foreground md:text-5xl lg:text-6xl">
              Our Collections
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
              Explore our curated collections, each designed to evoke a unique mood and atmosphere. 
              Find the perfect fragrance for every moment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {collections.map((collection, index) => {
              const Icon = collection.icon
              const productCount = getCollectionProductCount(collection.category)
              
              return (
                <motion.div
                  key={collection.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/collections/${collection.slug}`}>
                    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/50">
                      {/* Background pattern */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                      
                      <div className="relative p-8 lg:p-10">
                        <div className="flex items-start justify-between">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background transition-colors group-hover:border-primary">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {productCount} {productCount === 1 ? 'Product' : 'Products'}
                          </span>
                        </div>
                        
                        <h2 className="mt-6 text-2xl font-light tracking-wide text-foreground group-hover:text-primary transition-colors">
                          {collection.name}
                        </h2>
                        
                        <p className="mt-3 text-muted-foreground leading-relaxed">
                          {collection.description}
                        </p>
                        
                        <div className="mt-6 flex items-center text-sm font-medium text-primary">
                          Explore Collection
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Limited Edition Banner */}
      <section className="border-t border-border/50 bg-card/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/shop?filter=new">
              <div className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-8 lg:p-12">
                <div className="relative">
                  <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Limited Edition
                  </span>
                  <h2 className="mt-4 text-3xl font-light tracking-wide text-foreground md:text-4xl">
                    Golden Hour Collection
                  </h2>
                  <p className="mt-4 max-w-xl text-muted-foreground">
                    Capture the magic of sunset with our exclusive limited edition fragrances. 
                    Hand-poured during the golden hour, each candle is infused with the warmth 
                    and beauty of that magical time of day.
                  </p>
                  <div className="mt-6 flex items-center text-sm font-medium text-primary">
                    Shop Limited Edition
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
