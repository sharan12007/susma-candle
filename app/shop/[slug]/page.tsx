'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter, notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Minus, Plus, Star, Truck, Shield, Leaf, ChevronRight, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Footer from '@/components/footer'
import ProductCard from '@/components/product-card'
import { useCart } from '@/context/cart-context'
import { useWishlist } from '@/context/wishlist-context'
import { getProductBySlug, products } from '@/lib/products'
import { formatCurrency } from '@/lib/utils'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const product = getProductBySlug(slug)

  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const { addItem } = useCart()
  const { toggleItem, isInWishlist } = useWishlist()

  if (!product) {
    notFound()
  }

  const isLiked = isInWishlist(product.id)

  const handleAddToCart = () => {
    addItem(product, quantity)
  }

  const handleBuyNow = () => {
    addItem(product, quantity)
    router.push('/checkout')
  }

  const handleToggleWishlist = () => {
    toggleItem(product.id)
  }

  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.fragranceFamily === product.fragranceFamily))
    .slice(0, 4)

  return (
    <main className="min-h-screen bg-background pt-20">
      {/* Breadcrumb */}
      <div className="border-b border-border px-6 py-4 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link href="/shop" className="text-muted-foreground hover:text-foreground">
              Shop
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <section className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/shop"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
                <Image
                  src={product.images[selectedImage] || '/placeholder-candle.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {product.new && (
                  <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    New
                  </span>
                )}
                {product.bestSeller && (
                  <span className="absolute left-4 top-12 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                    Best Seller
                  </span>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-20 w-20 overflow-hidden rounded-lg border-2 transition-colors ${
                        selectedImage === index
                          ? 'border-primary'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image src={image} alt={`${product.name} ${index + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <span className="mb-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {product.category}
              </span>

              <h1 className="mb-4 text-3xl font-light tracking-wide text-foreground md:text-4xl">
                {product.name}
              </h1>

              <div className="mb-4 flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-primary text-primary'
                          : 'fill-muted text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              <p className="mb-6 text-2xl font-medium text-primary">{formatCurrency(product.price)}</p>

              <p className="mb-6 leading-relaxed text-muted-foreground">{product.description}</p>

              {/* Fragrance Notes */}
              <div className="mb-6 space-y-3">
                <div className="flex items-start gap-4">
                  <span className="w-24 text-sm font-medium text-foreground">Top Notes:</span>
                  <span className="text-sm text-muted-foreground">{product.topNotes.join(', ')}</span>
                </div>
                <div className="flex items-start gap-4">
                  <span className="w-24 text-sm font-medium text-foreground">Heart Notes:</span>
                  <span className="text-sm text-muted-foreground">{product.heartNotes.join(', ')}</span>
                </div>
                <div className="flex items-start gap-4">
                  <span className="w-24 text-sm font-medium text-foreground">Base Notes:</span>
                  <span className="text-sm text-muted-foreground">{product.baseNotes.join(', ')}</span>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Product Details */}
              <div className="mb-6 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Size</p>
                  <p className="font-medium text-foreground">{product.size}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Burn Time</p>
                  <p className="font-medium text-foreground">{product.burnTime}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Weight</p>
                  <p className="font-medium text-foreground">{product.weight}</p>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Quantity & Add to Cart */}
              <div className="mb-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Quantity:</span>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button onClick={handleAddToCart} size="lg" variant="outline" className="flex-1">
                    Add to Cart - {formatCurrency(product.price * quantity)}
                  </Button>
                  <Button onClick={handleBuyNow} size="lg" className="flex-1">
                    Buy Now
                  </Button>
                </div>

                <Button 
                  variant="ghost" 
                  onClick={handleToggleWishlist}
                  className={isLiked ? "text-primary" : "text-muted-foreground hover:text-foreground"}
                >
                  <Heart className={`mr-2 h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                  {isLiked ? 'Added to Wishlist' : 'Add to Wishlist'}
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 rounded-lg bg-muted/30 p-4">
                <div className="flex flex-col items-center text-center">
                  <Truck className="mb-2 h-5 w-5 text-primary" />
                  <span className="text-xs text-muted-foreground">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Shield className="mb-2 h-5 w-5 text-primary" />
                  <span className="text-xs text-muted-foreground">Secure Payment</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Leaf className="mb-2 h-5 w-5 text-primary" />
                  <span className="text-xs text-muted-foreground">Eco-Friendly</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Product Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="w-full justify-start border-b border-border bg-transparent">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                <TabsTrigger value="care">Care Instructions</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-6">
                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground">
                    Each Lumière candle is handcrafted with care using premium natural ingredients. 
                    Our {product.name} candle features a unique blend of fragrances that create an 
                    immersive sensory experience, perfect for transforming any space into a 
                    sanctuary of calm and luxury.
                  </p>
                  <ul className="mt-4 space-y-2 text-muted-foreground">
                    <li>Hand-poured in small batches</li>
                    <li>100% natural soy wax</li>
                    <li>Lead-free cotton wick</li>
                    <li>Premium fragrance oils</li>
                    <li>Reusable glass vessel</li>
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="ingredients" className="mt-6">
                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground">
                    We believe in transparency and quality. Our candles contain only the finest ingredients:
                  </p>
                  <ul className="mt-4 space-y-2 text-muted-foreground">
                    <li>Natural Soy Wax</li>
                    <li>Premium Essential Oils</li>
                    <li>Phthalate-free Fragrance Oils</li>
                    <li>Natural Cotton Wick</li>
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="care" className="mt-6">
                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground">
                    To get the most out of your Lumière candle, follow these care tips:
                  </p>
                  <ul className="mt-4 space-y-2 text-muted-foreground">
                    <li>Trim the wick to 1/4 inch before each use</li>
                    <li>Allow the wax to melt to the edges on the first burn</li>
                    <li>Burn for no more than 4 hours at a time</li>
                    <li>Keep away from drafts and flammable materials</li>
                    <li>Stop use when 1/2 inch of wax remains</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-border px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-2xl font-light tracking-wide text-foreground">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
