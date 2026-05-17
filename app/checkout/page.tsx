'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, CreditCard, Truck, Shield, ChevronRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { useCart } from '@/context/cart-context'
import { useAuth } from '@/context/auth-context'
import { formatCurrency, generateOrderId } from '@/lib/utils'
import { ShippingAddress } from '@/lib/types'

const shippingOptions = [
  { id: 'standard', name: 'Standard Shipping', price: 0, time: '5-7 business days' },
  { id: 'express', name: 'Express Shipping', price: 15, time: '2-3 business days' },
  { id: 'overnight', name: 'Overnight Shipping', price: 30, time: '1 business day' },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, clearCart } = useCart()
  const { isAuthenticated, user } = useAuth()

  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping')
  const [selectedShipping, setSelectedShipping] = useState('standard')
  const [saveAddress, setSaveAddress] = useState(false)

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
  })

  const shippingCost = shippingOptions.find((o) => o.id === selectedShipping)?.price || 0
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shippingCost + tax

  const handleInputChange = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress((prev) => ({ ...prev, [field]: value }))
  }

  const handlePlaceOrder = async () => {
    setIsLoading(true)

    // TODO: Replace with actual API call
    // const response = await fetch('/api/orders', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     items: items.map(item => ({
    //       productId: item.product.id,
    //       productName: item.product.name,
    //       quantity: item.quantity,
    //       price: item.product.price,
    //     })),
    //     shippingAddress,
    //     shippingMethod: selectedShipping,
    //     subtotal,
    //     shipping: shippingCost,
    //     tax,
    //     total,
    //   }),
    // })
    // const data = await response.json()
    // if (response.ok) {
    //   clearCart()
    //   router.push(`/order-confirmation/${data.orderId}`)
    // }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const orderId = generateOrderId()
    clearCart()
    router.push(`/order-confirmation?orderId=${orderId}`)
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background pt-20">
        <div className="mx-auto max-w-2xl px-6 py-16 text-center lg:px-8">
          <h1 className="mb-4 text-2xl font-light text-foreground">Your cart is empty</h1>
          <p className="mb-8 text-muted-foreground">Add some products to your cart before checking out.</p>
          <Button asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="border-b border-border px-6 py-4 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>
      </div>

      <div className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-8 text-3xl font-light tracking-wide text-foreground">Checkout</h1>

          {/* Progress Steps */}
          <div className="mb-12 flex items-center justify-center gap-4">
            {['shipping', 'payment', 'review'].map((s, index) => (
              <div key={s} className="flex items-center">
                <button
                  onClick={() => {
                    if (s === 'shipping') setStep('shipping')
                    else if (s === 'payment' && step !== 'shipping') setStep('payment')
                    else if (s === 'review' && step === 'review') setStep('review')
                  }}
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                    step === s
                      ? 'bg-primary text-primary-foreground'
                      : index < ['shipping', 'payment', 'review'].indexOf(step)
                      ? 'bg-primary/20 text-primary'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {index + 1}
                </button>
                <span
                  className={`ml-2 hidden text-sm capitalize sm:block ${
                    step === s ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {s}
                </span>
                {index < 2 && <ChevronRight className="mx-4 h-4 w-4 text-muted-foreground" />}
              </div>
            ))}
          </div>

          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="rounded-xl border border-border bg-card p-6"
              >
                {step === 'shipping' && (
                  <div className="space-y-6">
                    <h2 className="flex items-center gap-2 text-xl font-medium text-foreground">
                      <Truck className="h-5 w-5 text-primary" />
                      Shipping Information
                    </h2>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={shippingAddress.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          placeholder="John Doe"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={shippingAddress.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="john@example.com"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={shippingAddress.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+1 (555) 000-0000"
                          className="mt-1"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label htmlFor="addressLine1">Address Line 1</Label>
                        <Input
                          id="addressLine1"
                          value={shippingAddress.addressLine1}
                          onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                          placeholder="123 Main Street"
                          className="mt-1"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
                        <Input
                          id="addressLine2"
                          value={shippingAddress.addressLine2}
                          onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                          placeholder="Apt, Suite, etc."
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={shippingAddress.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          placeholder="New York"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={shippingAddress.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          placeholder="NY"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          value={shippingAddress.postalCode}
                          onChange={(e) => handleInputChange('postalCode', e.target.value)}
                          placeholder="10001"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          value={shippingAddress.country}
                          onChange={(e) => handleInputChange('country', e.target.value)}
                          placeholder="United States"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="mb-4 font-medium text-foreground">Shipping Method</h3>
                      <RadioGroup value={selectedShipping} onValueChange={setSelectedShipping}>
                        {shippingOptions.map((option) => (
                          <div
                            key={option.id}
                            className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors ${
                              selectedShipping === option.id
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/50'
                            }`}
                            onClick={() => setSelectedShipping(option.id)}
                          >
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value={option.id} id={option.id} />
                              <div>
                                <Label htmlFor={option.id} className="cursor-pointer font-medium">
                                  {option.name}
                                </Label>
                                <p className="text-sm text-muted-foreground">{option.time}</p>
                              </div>
                            </div>
                            <span className="font-medium text-foreground">
                              {option.price === 0 ? 'Free' : formatCurrency(option.price)}
                            </span>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    {isAuthenticated && (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="saveAddress"
                          checked={saveAddress}
                          onCheckedChange={(checked) => setSaveAddress(checked === true)}
                        />
                        <Label htmlFor="saveAddress" className="text-sm text-muted-foreground">
                          Save this address for future orders
                        </Label>
                      </div>
                    )}

                    <Button onClick={() => setStep('payment')} className="w-full" size="lg">
                      Continue to Payment
                    </Button>
                  </div>
                )}

                {step === 'payment' && (
                  <div className="space-y-6">
                    <h2 className="flex items-center gap-2 text-xl font-medium text-foreground">
                      <CreditCard className="h-5 w-5 text-primary" />
                      Payment Information
                    </h2>

                    <div className="rounded-lg border border-border bg-muted/30 p-6">
                      <p className="mb-4 text-sm text-muted-foreground">
                        Payment integration ready for Razorpay. In production, you would be redirected
                        to a secure payment page.
                      </p>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input id="cardName" placeholder="John Doe" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="4242 4242 4242 4242" className="mt-1" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" className="mt-1" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 rounded-lg bg-muted/30 p-4 text-sm text-muted-foreground">
                      <Shield className="h-5 w-5 text-primary" />
                      Your payment information is encrypted and secure
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => setStep('shipping')} className="flex-1">
                        Back
                      </Button>
                      <Button onClick={() => setStep('review')} className="flex-1">
                        Review Order
                      </Button>
                    </div>
                  </div>
                )}

                {step === 'review' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-medium text-foreground">Review Your Order</h2>

                    <div className="space-y-4 rounded-lg border border-border p-4">
                      <h3 className="font-medium text-foreground">Shipping Address</h3>
                      <div className="text-sm text-muted-foreground">
                        <p>{shippingAddress.fullName}</p>
                        <p>{shippingAddress.addressLine1}</p>
                        {shippingAddress.addressLine2 && <p>{shippingAddress.addressLine2}</p>}
                        <p>
                          {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}
                        </p>
                        <p>{shippingAddress.country}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium text-foreground">Order Items</h3>
                      {items.map((item) => (
                        <div key={item.product.id} className="flex gap-4 rounded-lg bg-muted/30 p-4">
                          <div className="relative h-16 w-16 overflow-hidden rounded-md bg-muted">
                            <Image
                              src={item.product.images[0] || '/placeholder-candle.jpg'}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-1 items-center justify-between">
                            <div>
                              <p className="font-medium text-foreground">{item.product.name}</p>
                              <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-medium text-foreground">
                              {formatCurrency(item.product.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => setStep('payment')} className="flex-1">
                        Back
                      </Button>
                      <Button onClick={handlePlaceOrder} className="flex-1" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          `Place Order - ${formatCurrency(total)}`
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
                <h2 className="mb-4 text-lg font-medium text-foreground">Order Summary</h2>

                <div className="mb-4 max-h-64 space-y-3 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                        <Image
                          src={item.product.images[0] || '/placeholder-candle.jpg'}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium text-foreground">
                        {formatCurrency(item.product.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">
                      {shippingCost === 0 ? 'Free' : formatCurrency(shippingCost)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span className="text-foreground">{formatCurrency(tax)}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between text-lg font-medium">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
