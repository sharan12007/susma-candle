"use client"

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, Package, ArrowRight, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Footer from '@/components/footer'

function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId') || 'SUA-DEMO-ORDER'
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10"
          >
            <CheckCircle className="h-12 w-12 text-primary" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 text-3xl font-light tracking-wide text-foreground md:text-4xl"
          >
            Thank You for Your Order!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 text-lg text-muted-foreground"
          >
            Your order has been successfully placed. We&apos;ll send you a confirmation email shortly.
          </motion.p>

          {/* Order Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 rounded-xl border border-border bg-card p-6"
          >
            <div className="mb-4 flex items-center justify-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                Order ID
              </span>
            </div>

            <p className="mb-4 text-2xl font-medium tracking-wider text-foreground">
              {orderId}
            </p>

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>Confirmation email sent to your inbox</span>
            </div>
          </motion.div>

          {/* What's Next */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8 space-y-4 rounded-xl border border-border bg-card p-6 text-left"
          >
            <h2 className="font-medium text-foreground">
              What happens next?
            </h2>

            <ol className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                  1
                </span>

                <span>
                  We&apos;ll prepare your handcrafted candles with care
                </span>
              </li>

              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                  2
                </span>

                <span>
                  You&apos;ll receive a shipping confirmation with tracking details
                </span>
              </li>

              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                  3
                </span>

                <span>
                  Your candles will arrive beautifully packaged at your doorstep
                </span>
              </li>
            </ol>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col gap-4 sm:flex-row sm:justify-center"
          >
            <Button asChild size="lg">
              <Link href={`/track-order?orderId=${orderId}`}>
                Track Your Order
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  )
}