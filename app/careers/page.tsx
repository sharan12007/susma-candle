'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Briefcase, MapPin, Clock, ArrowRight, Heart, Sparkles, Users, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const benefits = [
  {
    icon: Heart,
    title: 'Health & Wellness',
    description: 'Comprehensive health insurance, mental health support, and wellness stipend.',
  },
  {
    icon: Sparkles,
    title: 'Growth & Learning',
    description: 'Professional development budget and access to courses and conferences.',
  },
  {
    icon: Users,
    title: 'Work-Life Balance',
    description: 'Flexible hours, remote work options, and generous paid time off.',
  },
  {
    icon: Leaf,
    title: 'Sustainability Focus',
    description: 'Work for a company that genuinely cares about environmental impact.',
  },
]

const openPositions = [
  {
    title: 'Senior Candle Artisan',
    department: 'Production',
    location: 'Paris, France',
    type: 'Full-time',
    description: 'Lead our team of master chandlers in creating our signature luxury candles.',
  },
  {
    title: 'E-commerce Manager',
    department: 'Marketing',
    location: 'Remote (EU)',
    type: 'Full-time',
    description: 'Drive our online presence and optimize the customer shopping experience.',
  },
  {
    title: 'Fragrance Developer',
    department: 'R&D',
    location: 'Paris, France',
    type: 'Full-time',
    description: 'Create unique fragrance compositions for our new product lines.',
  },
  {
    title: 'Customer Experience Specialist',
    department: 'Support',
    location: 'Remote',
    type: 'Part-time',
    description: 'Provide exceptional support and build lasting relationships with our customers.',
  },
]

export default function CareersPage() {
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
              Join Our Team
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
              Help us create moments of beauty and tranquility for people around the world. 
              We&apos;re looking for passionate individuals who share our values.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-light tracking-wide text-foreground">
            Why Work With Us
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl border border-border bg-card p-6 text-center"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-4 font-medium text-foreground">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="border-y border-border/50 bg-card/30 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-light tracking-wide text-foreground">
              Open Positions
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Find your perfect role and help us illuminate the world
            </p>
          </motion.div>

          <div className="mt-12 space-y-4">
            {openPositions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                      {position.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{position.description}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Briefcase className="h-3 w-3" />
                        {position.department}
                      </Badge>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {position.location}
                      </Badge>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {position.type}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="shrink-0">
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-light tracking-wide text-foreground">
              Our Culture
            </h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
              <p>
                At Lumière, we believe that great products come from great teams. We&apos;ve built a 
                culture that values creativity, craftsmanship, and collaboration. Our team members 
                are encouraged to bring their whole selves to work and contribute their unique 
                perspectives.
              </p>
              <p>
                We&apos;re a diverse group of artisans, marketers, developers, and dreamers united by 
                a shared passion for creating beautiful things. Whether you&apos;re hand-pouring candles 
                in our Paris atelier or working remotely on our digital platforms, you&apos;ll be part 
                of a supportive community that celebrates both individual growth and collective success.
              </p>
              <p>
                Work should be meaningful and enjoyable. That&apos;s why we offer flexible working 
                arrangements, invest in professional development, and create opportunities for 
                team members to learn new skills and take on new challenges.
              </p>
            </div>
          </motion.div>
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
              Don&apos;t see the right role?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              We&apos;re always looking for talented people. Send us your resume and let us know 
              how you&apos;d like to contribute.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/contact">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
