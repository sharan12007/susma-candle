'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Search,
  Filter,
  Eye,
  Edit,
  Truck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Order, OrderStatus } from '@/lib/types'

// Mock data - replace with API calls
const mockStats = {
  totalRevenue: 45230,
  revenueChange: 12.5,
  totalOrders: 156,
  ordersChange: 8.2,
  totalCustomers: 89,
  customersChange: 15.3,
  avgOrderValue: 290,
  avgOrderChange: -2.1,
}

const mockOrders: (Order & { customerName: string })[] = [
  {
    id: 'SUA-ABC123-XYZ',
    userId: '1',
    customerName: 'John Doe',
    items: [
      { productId: '1', productName: 'Midnight Amber', quantity: 2, price: 68 },
      { productId: '4', productName: 'Golden Hour', quantity: 1, price: 85 },
    ],
    subtotal: 221,
    shipping: 0,
    tax: 17.68,
    total: 238.68,
    status: 'processing',
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
    trackingId: '',
    trackingHistory: [],
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: 'SUA-DEF456-ABC',
    userId: '2',
    customerName: 'Jane Smith',
    items: [{ productId: '2', productName: 'Rose Noir', quantity: 3, price: 75 }],
    subtotal: 225,
    shipping: 15,
    tax: 18,
    total: 258,
    status: 'shipped',
    shippingAddress: {
      fullName: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 555 987 6543',
      addressLine1: '456 Oak Avenue',
      city: 'Los Angeles',
      state: 'CA',
      postalCode: '90001',
      country: 'United States',
    },
    trackingId: 'TRK-123456789',
    trackingHistory: [],
    paymentStatus: 'paid',
    paymentMethod: 'PayPal',
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: 'SUA-GHI789-DEF',
    userId: '3',
    customerName: 'Mike Johnson',
    items: [{ productId: '6', productName: 'Fireside', quantity: 1, price: 65 }],
    subtotal: 65,
    shipping: 0,
    tax: 5.2,
    total: 70.2,
    status: 'pending',
    shippingAddress: {
      fullName: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+1 555 456 7890',
      addressLine1: '789 Pine Street',
      city: 'Chicago',
      state: 'IL',
      postalCode: '60601',
      country: 'United States',
    },
    trackingId: '',
    trackingHistory: [],
    paymentStatus: 'pending',
    paymentMethod: 'Credit Card',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: 'SUA-JKL012-GHI',
    userId: '4',
    customerName: 'Sarah Williams',
    items: [
      { productId: '3', productName: 'Cedar & Sage', quantity: 2, price: 62 },
      { productId: '8', productName: 'Lavender Dreams', quantity: 2, price: 55 },
    ],
    subtotal: 234,
    shipping: 0,
    tax: 18.72,
    total: 252.72,
    status: 'delivered',
    shippingAddress: {
      fullName: 'Sarah Williams',
      email: 'sarah@example.com',
      phone: '+1 555 321 0987',
      addressLine1: '321 Elm Street',
      city: 'Seattle',
      state: 'WA',
      postalCode: '98101',
      country: 'United States',
    },
    trackingId: 'TRK-987654321',
    trackingHistory: [],
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-17'),
  },
]

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  confirmed: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  processing: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  shipped: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
  delivered: 'bg-green-500/10 text-green-500 border-green-500/20',
  cancelled: 'bg-red-500/10 text-red-500 border-red-500/20',
}

const statuses: OrderStatus[] = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']

export default function AdminDashboard() {
  const [orders, setOrders] = useState(mockOrders)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedOrder, setSelectedOrder] = useState<(typeof mockOrders)[0] | null>(null)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [newStatus, setNewStatus] = useState<OrderStatus>('pending')
  const [newTrackingId, setNewTrackingId] = useState('')

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleUpdateOrder = () => {
    if (!selectedOrder) return

    setOrders((prev) =>
      prev.map((order) =>
        order.id === selectedOrder.id
          ? { ...order, status: newStatus, trackingId: newTrackingId || order.trackingId }
          : order
      )
    )
    setIsUpdateDialogOpen(false)
    setSelectedOrder(null)
  }

  const openUpdateDialog = (order: (typeof mockOrders)[0]) => {
    setSelectedOrder(order)
    setNewStatus(order.status)
    setNewTrackingId(order.trackingId || '')
    setIsUpdateDialogOpen(true)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-light tracking-[0.2em] text-foreground">
              SUARIN
            </Link>
            <Badge variant="secondary">Admin</Badge>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              View Store
            </Link>
          </nav>
        </div>
      </header>

      <div className="px-6 py-8">
        <div className="mx-auto max-w-7xl">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="mb-2 flex items-center gap-2 text-3xl font-light text-foreground">
              <LayoutDashboard className="h-8 w-8 text-primary" />
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your orders, track revenue, and update shipments
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            <StatCard
              title="Total Revenue"
              value={formatCurrency(mockStats.totalRevenue)}
              change={mockStats.revenueChange}
              icon={DollarSign}
            />
            <StatCard
              title="Total Orders"
              value={mockStats.totalOrders.toString()}
              change={mockStats.ordersChange}
              icon={ShoppingBag}
            />
            <StatCard
              title="Total Customers"
              value={mockStats.totalCustomers.toString()}
              change={mockStats.customersChange}
              icon={Users}
            />
            <StatCard
              title="Avg. Order Value"
              value={formatCurrency(mockStats.avgOrderValue)}
              change={mockStats.avgOrderChange}
              icon={TrendingUp}
            />
          </motion.div>

          {/* Orders Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-border bg-card"
          >
            <div className="border-b border-border p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="flex items-center gap-2 text-xl font-medium text-foreground">
                  <Package className="h-5 w-5 text-primary" />
                  Recent Orders
                </h2>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search orders..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-[200px] pl-9"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[150px]">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status} className="capitalize">
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="py-8 text-center text-muted-foreground">
                        No orders found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-foreground">{order.customerName}</p>
                            <p className="text-xs text-muted-foreground">
                              {order.shippingAddress.email}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-[150px]">
                            {order.items.slice(0, 2).map((item, i) => (
                              <p key={i} className="truncate text-sm">
                                {item.productName} x{item.quantity}
                              </p>
                            ))}
                            {order.items.length > 2 && (
                              <p className="text-xs text-muted-foreground">
                                +{order.items.length - 2} more
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{formatCurrency(order.total)}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`capitalize ${statusColors[order.status]}`}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatDate(order.createdAt)}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem asChild>
                                <Link href={`/track-order?orderId=${order.id}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openUpdateDialog(order)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Update Status
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openUpdateDialog(order)}>
                                <Truck className="mr-2 h-4 w-4" />
                                Add Tracking
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Update Order Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Order</DialogTitle>
            <DialogDescription>
              Update the status and tracking information for order {selectedOrder?.id}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="status">Order Status</Label>
              <Select value={newStatus} onValueChange={(value) => setNewStatus(value as OrderStatus)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status} className="capitalize">
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="trackingId">Tracking ID</Label>
              <Input
                id="trackingId"
                value={newTrackingId}
                onChange={(e) => setNewTrackingId(e.target.value)}
                placeholder="Enter tracking ID"
                className="mt-1"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpdateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateOrder}>Update Order</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}

function StatCard({
  title,
  value,
  change,
  icon: Icon,
}: {
  title: string
  value: string
  change: number
  icon: typeof DollarSign
}) {
  const isPositive = change >= 0

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-1 text-2xl font-medium text-foreground">{value}</p>
        </div>
        <div className="rounded-lg bg-primary/10 p-2">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1">
        {isPositive ? (
          <ArrowUpRight className="h-4 w-4 text-green-500" />
        ) : (
          <ArrowDownRight className="h-4 w-4 text-red-500" />
        )}
        <span className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {Math.abs(change)}%
        </span>
        <span className="text-sm text-muted-foreground">vs last month</span>
      </div>
    </div>
  )
}
