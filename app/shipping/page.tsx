'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Package, Truck, Clock, Globe, RefreshCw, Shield, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const shippingOptions = [
  {
    icon: Package,
    title: 'Standard Shipping',
    price: 'Free over $75',
    time: '3-5 business days',
    description: 'Carefully packaged and shipped via trusted carriers.',
  },
  {
    icon: Truck,
    title: 'Express Shipping',
    price: '$15',
    time: '1-2 business days',
    description: 'Priority handling for when you need your candles faster.',
  },
  {
    icon: Globe,
    title: 'International',
    price: 'From $25',
    time: '7-14 business days',
    description: 'We ship to over 50 countries worldwide.',
  },
]

const policies = [
  {
    icon: RefreshCw,
    title: '30-Day Returns',
    description: 'Unopened items can be returned within 30 days for a full refund. Items must be in original packaging.',
  },
  {
    icon: Shield,
    title: 'Damage Protection',
    description: 'If your order arrives damaged, contact us within 48 hours for a free replacement or full refund.',
  },
  {
    icon: Clock,
    title: 'Quick Processing',
    description: 'Orders placed before 2 PM CET are typically shipped the same day (Monday-Friday).',
  },
]

export default function ShippingPage() {
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
              Shipping & Returns
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
              We ensure your luxury candles arrive safely and beautifully packaged. 
              Learn about our shipping options and hassle-free return policy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-light tracking-wide text-foreground">
            Shipping Options
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {shippingOptions.map((option, index) => {
              const Icon = option.icon
              return (
                <motion.div
                  key={option.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl border border-border bg-card p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-foreground">{option.title}</h3>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-xl font-semibold text-foreground">{option.price}</span>
                    <span className="text-sm text-muted-foreground">• {option.time}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{option.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Policies */}
      <section className="border-y border-border/50 bg-card/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-light tracking-wide text-foreground">
            Our Policies
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {policies.map((policy, index) => {
              const Icon = policy.icon
              return (
                <motion.div
                  key={policy.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-border bg-background">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{policy.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{policy.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Detailed Info */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-light tracking-wide text-foreground">
                Shipping Information
              </h2>
              <div className="mt-4 space-y-4 text-muted-foreground">
                <p>
                  All orders are carefully hand-packaged in our signature gift boxes with protective 
                  materials to ensure your candles arrive in perfect condition. Each package includes 
                  a care card with burning instructions and fragrance notes.
                </p>
                <p>
                  <strong className="text-foreground">Free Shipping:</strong> Enjoy free standard shipping 
                  on all orders over $75 within France and the EU. International orders over $150 qualify 
                  for free standard international shipping.
                </p>
                <p>
                  <strong className="text-foreground">Processing Time:</strong> Orders are typically processed 
                  within 1-2 business days. During peak seasons or for custom orders, processing may take 
                  up to 3-5 business days.
                </p>
                <p>
                  <strong className="text-foreground">Tracking:</strong> Once your order ships, you&apos;ll receive 
                  an email with tracking information. You can also track your order on our website using 
                  your order number.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-light tracking-wide text-foreground">
                Returns & Exchanges
              </h2>
              <div className="mt-4 space-y-4 text-muted-foreground">
                <p>
                  We want you to love your SUARIN candles. If you&apos;re not completely satisfied, 
                  we accept returns within 30 days of delivery.
                </p>
                <p>
                  <strong className="text-foreground">Eligibility:</strong> Items must be unused, unopened, 
                  and in their original packaging. Due to the handcrafted nature of our products, we cannot 
                  accept returns of burned candles unless they are defective.
                </p>
                <p>
                  <strong className="text-foreground">Process:</strong> To initiate a return, please contact 
                  our customer service team with your order number. We&apos;ll provide a prepaid return label 
                  for domestic orders. Refunds are processed within 5-7 business days of receiving the return.
                </p>
                <p>
                  <strong className="text-foreground">Exchanges:</strong> If you&apos;d prefer a different fragrance, 
                  we&apos;re happy to exchange your unopened candle. Contact us and we&apos;ll arrange the exchange 
                  with minimal hassle.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-light tracking-wide text-foreground">
                International Shipping
              </h2>
              <div className="mt-4 space-y-4 text-muted-foreground">
                <p>
                  We proudly ship to over 50 countries worldwide. International shipping rates and 
                  delivery times vary by destination.
                </p>
                <p>
                  <strong className="text-foreground">Customs & Duties:</strong> International orders may be 
                  subject to import duties and taxes, which are the responsibility of the recipient. 
                  These fees are not included in the shipping cost and are collected by your local customs office.
                </p>
                <p>
                  <strong className="text-foreground">Delivery Times:</strong> International standard shipping 
                  typically takes 7-14 business days. Express international shipping (2-5 business days) is 
                  available to select countries for an additional fee.
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
              Have more questions?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Our customer support team is happy to help with any shipping or return inquiries.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/contact">
                Contact Support
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
