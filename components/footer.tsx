'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react'

const footerLinks = {
  shop: [
    { label: 'All Products', href: '/shop' },
    { label: 'Best Sellers', href: '/shop?filter=bestsellers' },
    { label: 'New Arrivals', href: '/shop?filter=new' },
    { label: 'Gift Sets', href: '/shop?filter=gifts' },
  ],
  company: [
    { label: 'Our Story', href: '/about' },
    { label: 'Sustainability', href: '/sustainability' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
  ],
  support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQs', href: '/faq' },
    { label: 'Shipping & Returns', href: '/shipping' },
    { label: 'Track Order', href: '/track-order' },
  ],
}

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-border/50 bg-card/30">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-light tracking-[0.3em] text-foreground">
                LUMIÈRE
              </span>
            </Link>
            <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">
              Handcrafted luxury candles that transform your space into a sanctuary
              of warmth and elegance.
            </p>
            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-2">
            <div>
              <h3 className="mb-4 text-sm font-medium tracking-wider text-foreground">SHOP</h3>
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm font-light text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium tracking-wider text-foreground">COMPANY</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm font-light text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium tracking-wider text-foreground">SUPPORT</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm font-light text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact column */}
          <div className="lg:col-span-1">
            <h3 className="mb-4 text-sm font-medium tracking-wider text-foreground">CONTACT</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span className="text-sm font-light text-muted-foreground">
                  123 Rue de la Lumière
                  <br />
                  Paris, 75001 France
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0 text-primary" />
                <a
                  href="mailto:hello@lumiere.com"
                  className="text-sm font-light text-muted-foreground transition-colors hover:text-foreground"
                >
                  hello@lumiere.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0 text-primary" />
                <a
                  href="tel:+33123456789"
                  className="text-sm font-light text-muted-foreground transition-colors hover:text-foreground"
                >
                  +33 1 23 45 67 89
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row">
          <p className="text-xs font-light text-muted-foreground">
            &copy; {new Date().getFullYear()} Lumière. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs font-light text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs font-light text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
