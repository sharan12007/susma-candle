'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight } from 'lucide-react'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setEmail('')
    }
  }

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative mx-auto max-w-3xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="mb-4 inline-block text-sm font-light tracking-[0.3em] text-primary">
            STAY ILLUMINATED
          </span>
          <h2 className="mb-4 text-3xl font-light tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Join Our Inner Circle
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-base font-light leading-relaxed text-muted-foreground">
            Be the first to discover new collections, exclusive offers, and the art of
            mindful living. Welcome to the SUARIN community.
          </p>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-primary/30 bg-primary/10 p-6"
            >
              <p className="text-lg font-light text-foreground">
                Welcome to SUARIN. Check your inbox for a special gift.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 flex-1 border-border/50 bg-card/50 px-6 text-foreground placeholder:text-muted-foreground focus:border-primary"
                required
              />
              <Button
                type="submit"
                size="lg"
                className="group h-14 bg-primary px-8 text-sm font-light tracking-wider text-primary-foreground hover:bg-primary/90"
              >
                SUBSCRIBE
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          )}

          <p className="mt-4 text-xs font-light text-muted-foreground">
            By subscribing, you agree to receive marketing communications. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
