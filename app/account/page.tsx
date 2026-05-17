'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  User,
  Package,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
  ChevronRight,
  Edit2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Footer from '@/components/footer'
import { useAuth } from '@/context/auth-context'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Order, OrderStatus } from '@/lib/types'

// Mock orders data - replace with API call
const mockOrders: Order[] = [
  {
    id: 'LUM-ABC123-XYZ',
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
      { status: 'Order Placed', location: 'Online', timestamp: new Date('2024-01-15T10:00:00'), description: 'Your order has been placed' },
      { status: 'Processing', location: 'Warehouse', timestamp: new Date('2024-01-15T14:00:00'), description: 'Order is being prepared' },
      { status: 'Shipped', location: 'New York, NY', timestamp: new Date('2024-01-16T09:00:00'), description: 'Package has been shipped' },
    ],
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-16'),
  },
  {
    id: 'LUM-DEF456-ABC',
    userId: '1',
    items: [
      { productId: '2', productName: 'Rose Noir', quantity: 1, price: 75 },
    ],
    subtotal: 75,
    shipping: 15,
    tax: 6,
    total: 96,
    status: 'delivered',
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
    trackingId: 'TRK-456789012',
    trackingHistory: [],
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-05'),
  },
]

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-yellow-500/10 text-yellow-500',
  confirmed: 'bg-blue-500/10 text-blue-500',
  processing: 'bg-purple-500/10 text-purple-500',
  shipped: 'bg-cyan-500/10 text-cyan-500',
  delivered: 'bg-green-500/10 text-green-500',
  cancelled: 'bg-red-500/10 text-red-500',
}

export default function AccountPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, logout, updateUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(user?.name || '')

  // Redirect to login if not authenticated
  if (!isLoading && !isAuthenticated) {
    router.push('/login')
    return null
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background pt-20">
        <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      </main>
    )
  }

  const handleSaveProfile = () => {
    updateUser({ name: editedName })
    setIsEditing(false)
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="mb-2 text-3xl font-light tracking-wide text-foreground">My Account</h1>
            <p className="text-muted-foreground">Manage your profile, orders, and preferences</p>
          </motion.div>

          <Tabs defaultValue="orders" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-4">
              <TabsTrigger value="orders" className="gap-2">
                <Package className="h-4 w-4" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="profile" className="gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="addresses" className="gap-2">
                <MapPin className="h-4 w-4" />
                Addresses
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-medium text-foreground">Order History</h2>

                {mockOrders.length === 0 ? (
                  <div className="rounded-xl border border-border bg-card p-8 text-center">
                    <Package className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                    <p className="mb-2 text-lg text-foreground">No orders yet</p>
                    <p className="mb-4 text-sm text-muted-foreground">
                      When you place an order, it will appear here
                    </p>
                    <Button asChild>
                      <Link href="/shop">Start Shopping</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {mockOrders.map((order) => (
                      <div
                        key={order.id}
                        className="rounded-xl border border-border bg-card p-6 transition-colors hover:bg-card/80"
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <div className="mb-2 flex items-center gap-3">
                              <span className="font-medium text-foreground">{order.id}</span>
                              <span
                                className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                                  statusColors[order.status]
                                }`}
                              >
                                {order.status}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Placed on {formatDate(order.createdAt)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-medium text-foreground">
                              {formatCurrency(order.total)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                            </p>
                          </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex flex-wrap gap-2">
                            {order.items.slice(0, 3).map((item, index) => (
                              <span
                                key={index}
                                className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
                              >
                                {item.productName} x{item.quantity}
                              </span>
                            ))}
                            {order.items.length > 3 && (
                              <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                                +{order.items.length - 3} more
                              </span>
                            )}
                          </div>
                          <Link
                            href={`/track-order?orderId=${order.id}`}
                            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                          >
                            Track Order
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-2xl space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-medium text-foreground">Profile Information</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit2 className="mr-2 h-4 w-4" />
                    {isEditing ? 'Cancel' : 'Edit'}
                  </Button>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-foreground">{user?.name}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <p className="mt-1 text-foreground">{user?.email}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Email cannot be changed
                      </p>
                    </div>

                    <div>
                      <Label>Member Since</Label>
                      <p className="mt-1 text-foreground">
                        {user?.createdAt ? formatDate(user.createdAt) : 'N/A'}
                      </p>
                    </div>

                    {isEditing && (
                      <Button onClick={handleSaveProfile}>Save Changes</Button>
                    )}
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            {/* Addresses Tab */}
            <TabsContent value="addresses">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-medium text-foreground">Saved Addresses</h2>
                  <Button variant="outline">
                    <MapPin className="mr-2 h-4 w-4" />
                    Add Address
                  </Button>
                </div>

                <div className="rounded-xl border border-border bg-card p-8 text-center">
                  <MapPin className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                  <p className="mb-2 text-lg text-foreground">No saved addresses</p>
                  <p className="text-sm text-muted-foreground">
                    Save addresses during checkout for faster ordering
                  </p>
                </div>
              </motion.div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-2xl space-y-6"
              >
                <h2 className="text-xl font-medium text-foreground">Account Settings</h2>

                <div className="space-y-4">
                  <div className="rounded-xl border border-border bg-card p-6">
                    <h3 className="mb-2 font-medium text-foreground">Password</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Change your password to keep your account secure
                    </p>
                    <Button variant="outline">Change Password</Button>
                  </div>

                  <div className="rounded-xl border border-border bg-card p-6">
                    <h3 className="mb-2 font-medium text-foreground">Notifications</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Manage your email preferences
                    </p>
                    <Button variant="outline">Manage Notifications</Button>
                  </div>

                  <div className="rounded-xl border border-destructive/20 bg-card p-6">
                    <h3 className="mb-2 font-medium text-foreground">Sign Out</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Sign out of your account on this device
                    </p>
                    <Button variant="destructive" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </main>
  )
}
