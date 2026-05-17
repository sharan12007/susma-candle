'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Leaf, Award, Truck, Shield } from 'lucide-react'

const features = [
  {
    icon: Leaf,
    title: 'Natural Ingredients',
    description: '100% soy wax and premium essential oils, free from harmful chemicals and toxins.',
  },
  {
    icon: Award,
    title: 'Handcrafted Quality',
    description: 'Each candle is hand-poured by skilled artisans ensuring exceptional quality.',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Complimentary shipping on all orders, delivered with care to your doorstep.',
  },
  {
    icon: Shield,
    title: 'Satisfaction Guaranteed',
    description: 'Love your candle or receive a full refund. Your happiness is our priority.',
  },
]

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-light tracking-[0.3em] text-primary">
            WHY LUMIÈRE
          </span>
          <h2 className="mb-4 text-3xl font-light tracking-tight text-foreground md:text-4xl lg:text-5xl">
            The Lumière Difference
          </h2>
          <p className="mx-auto max-w-2xl text-base font-light leading-relaxed text-muted-foreground">
            We believe in creating more than candles—we create experiences that elevate your everyday moments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative rounded-lg border border-border/50 bg-card/50 p-8 text-center backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:bg-card"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-colors duration-500 group-hover:bg-primary/20">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-3 text-lg font-medium text-foreground">{feature.title}</h3>
                <p className="text-sm font-light leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
