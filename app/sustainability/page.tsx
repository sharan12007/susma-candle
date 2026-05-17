'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Leaf, Recycle, TreePine, Droplets, Heart, Globe, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const initiatives = [
  {
    icon: Leaf,
    title: 'Natural Ingredients',
    description: 'We use 100% natural soy and coconut wax blends, free from paraffin and harmful chemicals.',
  },
  {
    icon: Recycle,
    title: 'Recyclable Packaging',
    description: 'All our packaging is made from recycled materials and is fully recyclable or compostable.',
  },
  {
    icon: TreePine,
    title: 'Carbon Neutral',
    description: 'We offset 100% of our carbon emissions through verified reforestation projects.',
  },
  {
    icon: Droplets,
    title: 'Clean Fragrances',
    description: 'Our fragrance oils are phthalate-free and sourced from responsible suppliers.',
  },
  {
    icon: Heart,
    title: 'Cruelty-Free',
    description: 'We never test on animals and all our products are certified cruelty-free.',
  },
  {
    icon: Globe,
    title: 'Ethical Sourcing',
    description: 'We work with suppliers who share our commitment to fair labor practices.',
  },
]

const stats = [
  { value: '100%', label: 'Natural Wax' },
  { value: '0', label: 'Harmful Chemicals' },
  { value: '50K+', label: 'Trees Planted' },
  { value: '2023', label: 'Carbon Neutral Since' },
]

export default function SustainabilityPage() {
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
            <h1 className="text-4xl font-light tracking-wide text-foreground md:text-5xl">
              Our Commitment to Sustainability
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
              At SUARIN, we believe luxury and sustainability go hand in hand. 
              Every decision we make considers its impact on our planet.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-light text-primary">{stat.value}</div>
                <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="border-y border-border/50 bg-card/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-light tracking-wide text-foreground">
              Our Sustainability Initiatives
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              From ingredients to packaging, every aspect of our process is designed with the environment in mind.
            </p>
          </motion.div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {initiatives.map((initiative, index) => {
              const Icon = initiative.icon
              return (
                <motion.div
                  key={initiative.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl border border-border bg-card p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-foreground">{initiative.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{initiative.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-light tracking-wide text-foreground">
                Our Journey to Sustainability
              </h2>
              <div className="mt-4 space-y-4 text-muted-foreground">
                <p>
                  From our founding, SUARIN has been committed to creating products that bring joy 
                  without harming our planet. We started with a simple premise: luxury doesn&apos;t have 
                  to come at the expense of the environment.
                </p>
                <p>
                  In 2023, we achieved carbon-neutral certification, a milestone we&apos;re incredibly 
                  proud of. But we know there&apos;s always more to do. We continue to invest in new 
                  technologies and practices that reduce our environmental footprint.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-light tracking-wide text-foreground">
                Packaging Innovation
              </h2>
              <div className="mt-4 space-y-4 text-muted-foreground">
                <p>
                  Our packaging is designed with circularity in mind. Our boxes are made from 100% 
                  recycled cardboard, printed with soy-based inks. The tissue paper is acid-free 
                  and biodegradable, and we&apos;ve eliminated plastic from our packaging entirely.
                </p>
                <p>
                  We encourage customers to repurpose our elegant glass vessels once the candle is 
                  finished. They make beautiful containers for flowers, cotton balls, or trinkets. 
                  We also offer a vessel return program where you can send back your empty containers 
                  for cleaning and refilling.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-light tracking-wide text-foreground">
                Our Future Goals
              </h2>
              <div className="mt-4 space-y-4 text-muted-foreground">
                <p>
                  By 2026, we aim to be completely plastic-free across all operations, including 
                  shipping materials. We&apos;re also working toward B Corp certification and expanding 
                  our reforestation partnerships.
                </p>
                <p>
                  We believe transparency is key to meaningful change. That&apos;s why we publish an 
                  annual sustainability report detailing our progress, challenges, and goals. 
                  Together with our community, we&apos;re building a more sustainable future.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/50 bg-card/30 py-16">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-light tracking-wide text-foreground">
              Shop Our Sustainable Collection
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Experience luxury that&apos;s kind to the planet.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/shop">
                Explore Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
