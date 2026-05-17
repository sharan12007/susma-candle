'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 lg:py-32">
      {/* Background accent */}
      <div className="pointer-events-none absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-lg bg-card"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-muted via-card to-primary/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 h-48 w-32 rounded-lg bg-foreground/10 shadow-lg" />
                <p className="text-sm font-light text-muted-foreground">Artisan Craftsmanship</p>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8 }}
              className="mb-4 inline-block text-sm font-light tracking-[0.3em] text-primary"
            >
              OUR STORY
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-6 text-3xl font-light tracking-tight text-foreground md:text-4xl lg:text-5xl"
            >
              Crafted with
              <br />
              <span className="text-gradient">Intention</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4 text-base font-light leading-relaxed text-muted-foreground"
            >
              <p>
                Born from a passion for artisanal excellence, Lumière began in a small Parisian
                atelier where the art of candle-making has been perfected over generations.
              </p>
              <p>
                Each candle is a testament to our commitment to quality—hand-poured using
                100% natural soy wax, infused with premium essential oils, and housed in
                elegant vessels that become treasured keepsakes.
              </p>
              <p>
                We believe in the transformative power of scent. A single flame can turn an
                ordinary moment into something extraordinary, creating atmospheres of calm,
                joy, and intimate connection.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 grid grid-cols-3 gap-8"
            >
              {[
                { number: '12+', label: 'Years of Craft' },
                { number: '50k+', label: 'Happy Customers' },
                { number: '100%', label: 'Natural Ingredients' },
              ].map((stat, index) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl font-light text-primary lg:text-3xl">{stat.number}</div>
                  <div className="mt-1 text-xs font-light tracking-wider text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
