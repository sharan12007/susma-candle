'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X, Search, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/cart-context'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/collections', label: 'Collections' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { itemCount, openCart } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'glass border-b border-border/50' : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <motion.span
              className="text-2xl font-light tracking-[0.3em] text-foreground"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              LUMIÈRE
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative text-sm font-light tracking-wider text-foreground/80 transition-colors hover:text-foreground"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-4 lg:flex">
            <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-foreground">
              <Search className="h-5 w-5" />
            </Button>
            <Link href="/account">
              <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-foreground">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative text-foreground/80 hover:text-foreground"
              onClick={openCart}
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {itemCount}
                </span>
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 glass lg:hidden"
          >
            <div className="flex h-full flex-col items-center justify-center gap-8 pt-20">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-2xl font-light tracking-wider text-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex items-center gap-6"
              >
                <Button variant="ghost" size="icon">
                  <Search className="h-6 w-6" />
                </Button>
                <Link href="/account">
                  <Button variant="ghost" size="icon">
                    <User className="h-6 w-6" />
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    openCart()
                  }}
                >
                  <ShoppingBag className="h-6 w-6" />
                  {itemCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                      {itemCount}
                    </span>
                  )}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
