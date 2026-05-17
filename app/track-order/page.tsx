'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  ArrowLeft,
  Search,
  Box,
  CircleDot,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import Footer from '@/components/footer'
import { formatDateTime, formatCurrency } from '@/lib/utils'
import { Order, OrderStatus, TrackingEvent } from '@/lib/types'

// Mock order data - replace with API call
const mockOrderData: Record<string, Order> = {
  'SUA-ABC123-XYZ': {
    id: 'SUA-ABC123-XYZ',
    userId: '1',
    items: [
      { productId: '1', productName: 'Midnight Amber', quantity: 2, price: 68 },
      { productId: '4', productName: 'Golden Hour', quantity: 1, price: 85 },
    ],
    subtotal: 221,
    shipping: 0,
    tax: 17.68,
    total: 238.68,
    status: 'shipped',
    shippingAddress: {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+1 555 123 4567',
      addressLine1: '123 Main Street',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'United States',
    },
    trackingId: 'TRK-789456123',
    trackingHistory: [
      {
        status: 'Order Placed',
        location: 'Online',
        timestamp: new Date('2024-01-15T10:00:00'),
        description: 'Your order has been placed successfully',
      },
      {
        status: 'Payment Confirmed',
        location: 'Online',
        timestamp: new Date('2024-01-15T10:05:00'),
        description: 'Payment has been verified',
      },
      {
        status: 'Processing',
        location: 'Warehouse - Los Angeles, CA',
        timestamp: new Date('2024-01-15T14:00:00'),
        description: 'Your candles are being carefully prepared',
      },
      {
        status: 'Shipped',
        location: 'Los Angeles, CA',
        timestamp: new Date('2024-01-16T09:00:00'),
        description: 'Package has left our facility',
      },
      {
        status: 'In Transit',
        location: 'Phoenix, AZ',
        timestamp: new Date('2024-01-17T15:30:00'),
        description: 'Package is on its way to you',
      },
    ],
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-17'),
  },
}

const statusSteps: { status: OrderStatus; icon: typeof Package; label: string }[] = [
  { status: 'pending', icon: Clock, label: 'Order Placed' },
  { status: 'processing', icon: Box, label: 'Processing' },
  { status: 'shipped', icon: Truck, label: 'Shipped' },
  { status: 'delivered', icon: CheckCircle, label: 'Delivered' },
]

function getStatusIndex(status: OrderStatus): number {
  const statusOrder: OrderStatus[] = ['pending', 'confirmed', 'processing', 'shipped', 'delivered']
  return statusOrder.indexOf(status)
}

function TrackOrderContent() {
  const searchParams = useSearchParams()
  const orderIdParam = searchParams.get('orderId')

  const [searchOrderId, setSearchOrderId] = useState(orderIdParam || '')
  const [order, setOrder] = useState<Order | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (orderIdParam) {
      handleSearch(orderIdParam)
    }
  }, [orderIdParam])

  const handleSearch = async (id?: string) => {
    const searchId = id || searchOrderId
    if (!searchId.trim()) {
      setError('Please enter an order ID')
      return
    }

    setIsSearching(true)
    setError('')

    // TODO: Replace with actual API call
    // const response = await fetch(`/api/orders/${searchId}`)
    // const data = await response.json()
    // if (response.ok) {
    //   setOrder(data.order)
    // } else {
    //   setError(data.error)
    // }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const foundOrder = mockOrderData[searchId.toUpperCase()]
    if (foundOrder) {
      setOrder(foundOrder)
    } else {
      setError('Order not found. Please check your order ID and try again.')
      setOrder(null)
    }

    setIsSearching(false)
  }

  const currentStatusIndex = order ? getStatusIndex(order.status) : -1

  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <h1 className="mb-4 text-3xl font-light tracking-wide text-foreground md:text-4xl">
              Track Your Order
            </h1>
            <p className="text-muted-foreground">
              Enter your order ID to see the latest status
            </p>
          </motion.div>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <div className="mx-auto max-w-md">
              <div className="flex gap-3">
                <Input
                  placeholder="Enter Order ID (e.g., SUA-ABC123-XYZ)"
                  value={searchOrderId}
                  onChange={(e) => setSearchOrderId(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1"
                />
                <Button onClick={() => handleSearch()} disabled={isSearching}>
                  {isSearching ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
            </div>
          </motion.div>

          {/* Order Details */}
          {order && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Order Header */}
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Order ID</p>
                    <p className="text-xl font-medium text-foreground">{order.id}</p>
                  </div>
                  {order.trackingId && (
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Tracking Number</p>
                      <p className="font-medium text-primary">{order.trackingId}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Status Progress */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-6 text-lg font-medium text-foreground">Order Status</h2>

                <div className="relative">
                  {/* Progress Line */}
                  <div className="absolute left-6 top-0 h-full w-0.5 bg-border" />
                  <div
                    className="absolute left-6 top-0 w-0.5 bg-primary transition-all duration-500"
                    style={{
                      height: `${Math.min(100, ((currentStatusIndex + 1) / statusSteps.length) * 100)}%`,
                    }}
                  />

                  {/* Status Steps */}
                  <div className="relative space-y-8">
                    {statusSteps.map((step, index) => {
                      const isCompleted = index <= currentStatusIndex
                      const isCurrent = index === currentStatusIndex
                      const Icon = step.icon

                      return (
                        <div key={step.status} className="flex items-start gap-4">
                          <div
                            className={`relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full transition-colors ${
                              isCompleted
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground'
                            } ${isCurrent ? 'ring-4 ring-primary/20' : ''}`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 pt-2">
                            <p
                              className={`font-medium ${
                                isCompleted ? 'text-foreground' : 'text-muted-foreground'
                              }`}
                            >
                              {step.label}
                            </p>
                            {isCurrent && order.status !== 'delivered' && (
                              <p className="text-sm text-primary">In Progress</p>
                            )}
                            {isCompleted && index < currentStatusIndex && (
                              <p className="text-sm text-muted-foreground">Completed</p>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Tracking Timeline */}
              {order.trackingHistory.length > 0 && (
                <div className="rounded-xl border border-border bg-card p-6">
                  <h2 className="mb-6 text-lg font-medium text-foreground">Tracking Timeline</h2>

                  <div className="space-y-4">
                    {[...order.trackingHistory].reverse().map((event, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full ${
                              index === 0
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            <CircleDot className="h-4 w-4" />
                          </div>
                          {index < order.trackingHistory.length - 1 && (
                            <div className="h-full w-0.5 bg-border" />
                          )}
                        </div>
                        <div className="flex-1 pb-6">
                          <p className="font-medium text-foreground">{event.status}</p>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {formatDateTime(event.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Order Summary */}
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Shipping Address */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h2 className="mb-4 text-lg font-medium text-foreground">Shipping Address</h2>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p className="font-medium text-foreground">{order.shippingAddress.fullName}</p>
                    <p>{order.shippingAddress.addressLine1}</p>
                    {order.shippingAddress.addressLine2 && (
                      <p>{order.shippingAddress.addressLine2}</p>
                    )}
                    <p>
                      {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                      {order.shippingAddress.postalCode}
                    </p>
                    <p>{order.shippingAddress.country}</p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h2 className="mb-4 text-lg font-medium text-foreground">Order Items</h2>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.productName} x{item.quantity}
                        </span>
                        <span className="text-foreground">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span className="text-foreground">Total</span>
                      <span className="text-primary">{formatCurrency(order.total)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Need Help */}
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <p className="mb-4 text-muted-foreground">Need help with your order?</p>
                <Button variant="outline" asChild>
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </div>
            </motion.div>
          )}

          {/* No Order State */}
          {!order && !error && !orderIdParam && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl border border-border bg-card p-12 text-center"
            >
              <Package className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
              <p className="mb-2 text-lg text-foreground">Track your SUARIN order</p>
              <p className="text-sm text-muted-foreground">
                Enter your order ID above to see real-time tracking updates
              </p>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-background pt-20">
        <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      </main>
    }>
      <TrackOrderContent />
    </Suspense>
  )
}
