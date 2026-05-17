export interface Product {
  id: string
  name: string
  slug: string
  price: number
  description: string
  shortDescription: string
  category: string
  fragranceFamily: string
  topNotes: string[]
  heartNotes: string[]
  baseNotes: string[]
  burnTime: string
  size: string
  weight: string
  images: string[]
  inStock: boolean
  rating: number
  reviewCount: number
  featured: boolean
  bestSeller: boolean
  new: boolean
  createdAt: Date
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  status: OrderStatus
  shippingAddress: ShippingAddress
  trackingId?: string
  trackingHistory: TrackingEvent[]
  paymentStatus: PaymentStatus
  paymentMethod?: string
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  price: number
}

export interface ShippingAddress {
  fullName: string
  email: string
  phone: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'

export interface TrackingEvent {
  status: string
  location: string
  timestamp: Date
  description: string
}

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  addresses: ShippingAddress[]
  orders: string[]
  createdAt: Date
}
