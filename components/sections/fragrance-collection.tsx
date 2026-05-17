'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

const collections = [
  {
    id: 1,
    name: 'Floral',
    description: 'Delicate blooms and romantic notes',
    count: 12,
    color: 'from-pink-900/30 to-rose-900/20',
  },
  {
    id: 2,
    name: 'Woody',
    description: 'Earthy warmth and grounding scents',
    count: 8,
    color: 'from-amber-900/30 to-orange-900/20',
  },
  {
    id: 3,
    name: 'Fresh',
    description: 'Crisp and invigorating fragrances',
    count: 10,
    color: 'from-emerald-900/30 to-teal-900/20',
  },
  {
    id: 4,
    name: 'Oriental',
    description: 'Rich and mysterious aromatics',
    count: 6,
    color: 'from-purple-900/30 to-indigo-900/20',
  },
]

export default function FragranceCollection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-light tracking-[0.3em] text-primary">
            EXPLORE BY SCENT
          </span>
          <h2 className="mb-4 text-3xl font-light tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Fragrance Families
          </h2>
          <p className="mx-auto max-w-2xl text-base font-light leading-relaxed text-muted-foreground">
            Find your signature scent among our carefully curated fragrance collections.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Link href={`/collections/${collection.name.toLowerCase()}`}>
                <div className="group relative aspect-[4/5] overflow-hidden rounded-lg">
                  <div className={`absolute inset-0 bg-gradient-to-br ${collection.color}`} />
                  <div className="absolute inset-0 bg-card/50" />
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-primary/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  <div className="relative flex h-full flex-col justify-end p-6">
                    <span className="mb-1 text-xs font-light tracking-wider text-primary">
                      {collection.count} PRODUCTS
                    </span>
                    <h3 className="mb-2 text-2xl font-light text-foreground transition-colors group-hover:text-primary">
                      {collection.name}
                    </h3>
                    <p className="text-sm font-light text-muted-foreground">
                      {collection.description}
                    </p>
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
