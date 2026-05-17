'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Candle3D = dynamic(() => import('@/components/candle-3d'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-32 w-32 animate-pulse rounded-full bg-primary/20" />
    </div>
  ),
})

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted" />

      {/* Ambient glow effects */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-accent/10 blur-[80px]" />

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 lg:grid-cols-2 lg:gap-16"
      >
        {/* Text Content */}
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-xs font-light tracking-wider text-primary">
              HANDCRAFTED LUXURY
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="mb-6 text-4xl font-light leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl xl:text-7xl"
          >
            <span className="block">Illuminate Your</span>
            <span className="block text-gradient">Moments</span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="mx-auto mb-8 max-w-lg text-base font-light leading-relaxed text-muted-foreground lg:mx-0 lg:text-lg"
          >
            Each SUARIN candle is a masterwork of scent and light, handcrafted to transform
            your space into a sanctuary of warmth and elegance.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
          >
            <Link href="/shop">
              <Button
                size="lg"
                className="group relative overflow-hidden bg-primary px-8 py-6 text-sm font-light tracking-wider text-primary-foreground transition-all hover:bg-primary/90"
              >
                <span className="relative z-10">EXPLORE COLLECTION</span>
                <div className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-500 group-hover:translate-x-0" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant="outline"
                size="lg"
                className="border-foreground/20 px-8 py-6 text-sm font-light tracking-wider text-foreground hover:bg-foreground/5"
              >
                OUR STORY
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* 3D Candle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="order-1 h-[400px] w-full lg:order-2 lg:h-[600px]"
        >
          <Candle3D />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-light tracking-wider text-muted-foreground">
            SCROLL TO DISCOVER
          </span>
          <ArrowDown className="h-4 w-4 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  )
}
