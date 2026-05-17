'use client'

import { use } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Sparkles, Flower2, TreePine, Droplets } from 'lucide-react'
import { products, getProductsByCategory } from '@/lib/products'
import ProductCard from '@/components/product-card'
import { Button } from '@/components/ui/button'

const collectionsData: Record<string, {
  name: string
  description: string
  longDescription: string
  icon: typeof Sparkles
  category: string
}> = {
  'signature-collection': {
    name: 'Signature Collection',
    description: 'Our most beloved fragrances, crafted to perfection.',
    longDescription: 'The Signature Collection represents the heart and soul of SUARIN. Each fragrance in this collection has been meticulously developed to create a perfect balance of notes that evolve beautifully as the candle burns. These are our most beloved scents, chosen for their ability to transform any space into a sanctuary of warmth and elegance.',
    icon: Sparkles,
    category: 'Signature Collection',
  },
  'floral-series': {
    name: 'Floral Series',
    description: 'Delicate and romantic fragrances inspired by blooming gardens.',
    longDescription: 'Our Floral Series captures the ephemeral beauty of flowers in full bloom. From the deep mystery of black roses to the soft romance of peonies, each candle in this collection tells a botanical story. Perfect for those who appreciate the timeless elegance of floral fragrances with a modern, sophisticated twist.',
    icon: Flower2,
    category: 'Floral Series',
  },
  'botanical-collection': {
    name: 'Botanical Collection',
    description: 'Grounding scents that bring the serenity of nature indoors.',
    longDescription: 'The Botanical Collection is inspired by ancient forests, healing gardens, and the restorative power of plants. These fragrances combine earthy woods, cleansing herbs, and fresh greens to create an atmosphere of natural tranquility. Ideal for meditation, yoga, or simply bringing a touch of nature into your daily life.',
    icon: TreePine,
    category: 'Botanical Collection',
  },
  'fresh-collection': {
    name: 'Fresh Collection',
    description: 'Clean and invigorating scents for a refreshed space.',
    longDescription: 'The Fresh Collection offers clean, uplifting fragrances that invigorate the senses and refresh your space. From ocean breezes to crisp linens, these candles create an atmosphere of purity and calm. Perfect for kitchens, bathrooms, or any space where you want to feel renewed.',
    icon: Droplets,
    category: 'Fresh Collection',
  },
}

export default function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const collection = collectionsData[slug]

  if (!collection) {
    notFound()
  }

  const collectionProducts = getProductsByCategory(collection.category)
  const Icon = collection.icon

  // Get other collections for navigation
  const otherCollections = Object.entries(collectionsData)
    .filter(([key]) => key !== slug)
    .slice(0, 3)

  return (
    <main className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Link
            href="/collections"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            All Collections
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:gap-12"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-border bg-card">
              <Icon className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-light tracking-wide text-foreground md:text-5xl">
                {collection.name}
              </h1>
              <p className="mt-4 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
                {collection.longDescription}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {collectionProducts.length > 0 ? (
            <>
              <div className="mb-8 flex items-center justify-between">
                <p className="text-muted-foreground">
                  {collectionProducts.length} {collectionProducts.length === 1 ? 'product' : 'products'}
                </p>
              </div>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {collectionProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-16 text-center"
            >
              <Icon className="mx-auto h-16 w-16 text-muted-foreground/50" />
              <h2 className="mt-4 text-xl font-light text-foreground">Coming Soon</h2>
              <p className="mt-2 text-muted-foreground">
                New fragrances for this collection are being crafted. Check back soon!
              </p>
              <Button asChild className="mt-6">
                <Link href="/shop">
                  Browse All Products
                </Link>
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Other Collections */}
      <section className="border-t border-border/50 bg-card/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-light tracking-wide text-foreground">
              Explore Other Collections
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherCollections.map(([key, data]) => {
                const OtherIcon = data.icon
                const count = getProductsByCategory(data.category).length
                return (
                  <Link key={key} href={`/collections/${key}`}>
                    <div className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background group-hover:border-primary transition-colors">
                          <OtherIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {data.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">{count} products</p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center text-sm text-primary">
                        View Collection
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
