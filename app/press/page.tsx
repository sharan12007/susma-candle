'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Download, Mail, ArrowRight, Award, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const pressReleases = [
  {
    date: 'March 2024',
    title: 'SUARIN Wins International Fragrance Award',
    excerpt: 'Our Golden Hour limited edition candle has been recognized with the prestigious International Fragrance Award for Best Home Fragrance.',
    link: '#',
  },
  {
    date: 'January 2024',
    title: 'SUARIN Expands to Asian Markets',
    excerpt: 'Announcing our expansion into Japan and South Korea, bringing luxury French candles to new audiences.',
    link: '#',
  },
  {
    date: 'November 2023',
    title: 'Achieving Carbon Neutral Certification',
    excerpt: 'SUARIN becomes one of the first luxury candle brands to achieve carbon neutral certification across all operations.',
    link: '#',
  },
  {
    date: 'September 2023',
    title: 'Launch of Refillable Candle Collection',
    excerpt: 'Introducing our innovative refillable candle system, reducing glass waste by up to 70%.',
    link: '#',
  },
]

const mediaFeatures = [
  {
    publication: 'Vogue Living',
    quote: 'SUARIN has redefined what luxury home fragrance can be. Their attention to detail and commitment to sustainability sets a new standard.',
  },
  {
    publication: 'Architectural Digest',
    quote: 'The candles that interior designers are obsessing over. SUARIN combines French elegance with conscious craftsmanship.',
  },
  {
    publication: 'The New York Times',
    quote: 'A brand that proves luxury and sustainability can coexist beautifully.',
  },
]

const awards = [
  { year: '2024', title: 'International Fragrance Award - Best Home Fragrance' },
  { year: '2023', title: 'Sustainable Brand of the Year - EU Green Awards' },
  { year: '2023', title: 'Design Excellence Award - Paris Design Week' },
  { year: '2022', title: "Editor's Choice - Elle Décor" },
]

export default function PressPage() {
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
              Press & Media
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
              News, press releases, and media resources about SUARIN. 
              For press inquiries, please contact our media relations team.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg">
                <Mail className="mr-2 h-4 w-4" />
                Press Inquiries
              </Button>
              <Button variant="outline" size="lg">
                <Download className="mr-2 h-4 w-4" />
                Media Kit
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Media Features */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-light tracking-wide text-foreground">
            As Seen In
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {mediaFeatures.map((feature, index) => (
              <motion.div
                key={feature.publication}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl border border-border bg-card p-6"
              >
                <Quote className="h-8 w-8 text-primary/20" />
                <p className="mt-4 text-muted-foreground italic">&ldquo;{feature.quote}&rdquo;</p>
                <p className="mt-4 font-medium text-foreground">{feature.publication}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="border-y border-border/50 bg-card/30 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-light tracking-wide text-foreground">
              Awards & Recognition
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              We&apos;re honored to be recognized for our commitment to excellence
            </p>
          </motion.div>
          <div className="mt-12 space-y-4">
            {awards.map((award, index) => (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 rounded-lg border border-border bg-card p-4"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-border bg-background">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{award.title}</p>
                </div>
                <Badge variant="secondary">{award.year}</Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-light tracking-wide text-foreground">
              Press Releases
            </h2>
            <p className="mt-2 text-muted-foreground">
              Latest news and announcements from SUARIN
            </p>
          </motion.div>

          <div className="mt-8 space-y-6">
            {pressReleases.map((release, index) => (
              <motion.article
                key={release.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
              >
                <time className="text-sm text-muted-foreground">{release.date}</time>
                <h3 className="mt-2 text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                  {release.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{release.excerpt}</p>
                <Button variant="link" className="mt-4 h-auto p-0">
                  Read More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Media Contact */}
      <section className="border-t border-border/50 bg-card/30 py-16">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-light tracking-wide text-foreground">
              Media Contact
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              For press inquiries, interviews, or media samples, please reach out to our communications team.
            </p>
            <div className="mt-6 text-center">
              <p className="font-medium text-foreground">Sophie Martin</p>
              <p className="text-muted-foreground">Head of Communications</p>
              <a href="mailto:press@suarin.com" className="mt-2 inline-block text-primary hover:underline">
                press@suarin.com
              </a>
            </div>
            <Button asChild size="lg" className="mt-8">
              <Link href="/contact">
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
