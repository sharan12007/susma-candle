import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Providers from '@/components/providers'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'SUARIN | Luxury Artisan Candles',
  description: 'Experience the art of illumination with our handcrafted luxury candles. Each piece is a masterwork of scent and light, designed to transform your space.',
  keywords: ['luxury candles', 'artisan candles', 'handcrafted', 'home fragrance', 'premium candles'],
  openGraph: {
    title: 'SUARIN | Luxury Artisan Candles',
    description: 'Experience the art of illumination with our handcrafted luxury candles.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1612',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} bg-background`}>
      <body className="font-serif antialiased">
        <Providers>
          {children}
        </Providers>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
