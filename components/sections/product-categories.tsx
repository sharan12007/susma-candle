'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const categories = [
  {
    id: 1,
    name: 'Signature Collection',
    description: 'Our iconic fragrances',
    count: 12,
  },
  {
    id: 2,
    name: 'Limited Editions',
    description: 'Seasonal exclusives',
    count: 4,
  },
  {
    id: 3,
    name: 'Gift Sets',
    description: 'Perfect for gifting',
    count: 8,
  },
  {
    id: 4,
    name: 'Travel Size',
    description: 'Luxury on the go',
    count: 6,
  },
]

export default function ProductCategories() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="mb-4 inline-block text-sm font-light tracking-[0.3em] text-primary">
            BROWSE BY
          </span>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <h2 className="text-3xl font-light tracking-tight text-foreground md:text-4xl lg:text-5xl">
              Shop Categories
            </h2>
            <Link
              href="/shop"
              className="group flex items-center gap-2 text-sm font-light text-primary hover:text-primary/80"
            >
              View All
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Link href={`/shop?category=${category.name.toLowerCase().replace(' ', '-')}`}>
                <div className="group relative overflow-hidden rounded-lg border border-border/50 bg-card/50 p-6 transition-all duration-500 hover:border-primary/30 hover:bg-card">
                  <div className="mb-4 flex h-20 items-center justify-center">
                    <div className="h-16 w-10 rounded bg-foreground/10 transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <h3 className="mb-1 text-lg font-medium text-foreground transition-colors group-hover:text-primary">
                    {category.name}
                  </h3>
                  <p className="mb-2 text-sm font-light text-muted-foreground">
                    {category.description}
                  </p>
                  <span className="text-xs font-light text-primary">{category.count} Products</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
