'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Flame, Heart, Leaf, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'

const values = [
  {
    icon: Flame,
    title: 'Artisan Craftsmanship',
    description: 'Each candle is hand-poured by skilled artisans who bring decades of expertise to every creation.',
  },
  {
    icon: Leaf,
    title: 'Sustainable Practices',
    description: 'We use only natural soy wax, lead-free cotton wicks, and eco-friendly packaging materials.',
  },
  {
    icon: Heart,
    title: 'Made with Love',
    description: 'Every candle is crafted with passion and attention to detail, ensuring a perfect burn every time.',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'We source the finest fragrance oils from master perfumers around the world.',
  },
]

const milestones = [
  { year: '2018', title: 'The Beginning', description: 'Lumière was born in a small Parisian atelier with a passion for fragrance.' },
  { year: '2019', title: 'First Collection', description: 'Launched our signature collection with 5 unique fragrances.' },
  { year: '2021', title: 'Global Expansion', description: 'Expanded shipping to over 50 countries worldwide.' },
  { year: '2023', title: 'Sustainability Pledge', description: 'Achieved carbon-neutral status and launched refillable candle line.' },
  { year: '2024', title: 'Award Recognition', description: 'Received the prestigious International Fragrance Award.' },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl font-light tracking-wide text-foreground md:text-5xl lg:text-6xl">
              Our Story
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
              Born from a passion for fragrance and a commitment to artisan craftsmanship, 
              Lumière creates luxury candles that transform spaces and evoke emotions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-center"
            >
              <div>
                <h2 className="text-3xl font-light tracking-wide text-foreground">
                  The Art of Illumination
                </h2>
                <p className="mt-6 text-muted-foreground leading-relaxed">
                  In a small atelier nestled in the heart of Paris, Lumière was born from a simple 
                  belief: that light and fragrance have the power to transform any space into a 
                  sanctuary. Our founder, inspired by the golden light of Parisian evenings, set out 
                  to create candles that capture moments of beauty and serenity.
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Today, each Lumière candle is still hand-poured using traditional techniques passed 
                  down through generations of master chandlers. We blend the finest natural waxes with 
                  precious fragrance oils, creating scents that tell stories and evoke cherished memories.
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Our commitment to excellence extends beyond our products. We believe in sustainable 
                  luxury—creating beautiful things that honor both our customers and our planet. From 
                  our responsibly sourced ingredients to our recyclable packaging, every decision 
                  reflects our dedication to a more beautiful world.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <Flame className="mx-auto h-16 w-16 text-primary/20" />
                    <p className="mt-4 text-sm text-muted-foreground">Artisan Workshop</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="border-y border-border/50 bg-card/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-light tracking-wide text-foreground">Our Values</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              The principles that guide everything we create
            </p>
          </motion.div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-6 text-lg font-medium text-foreground">{value.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-light tracking-wide text-foreground">Our Journey</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Key moments in the Lumière story
            </p>
          </motion.div>
          <div className="mt-16 space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-8"
              >
                <div className="w-20 flex-shrink-0 text-right">
                  <span className="text-2xl font-light text-primary">{milestone.year}</span>
                </div>
                <div className="relative flex-1 border-l border-border pl-8 pb-8">
                  <div className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-primary" />
                  <h3 className="text-lg font-medium text-foreground">{milestone.title}</h3>
                  <p className="mt-1 text-muted-foreground">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/50 bg-card/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-light tracking-wide text-foreground">
              Experience the Lumière Difference
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Discover our collection of handcrafted luxury candles
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/shop">
                Shop Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
