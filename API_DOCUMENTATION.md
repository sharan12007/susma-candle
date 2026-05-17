# SUARIN E-commerce API Documentation

This document outlines all the API endpoints needed for the SUARIN luxury candle e-commerce website.

## Base URL
```
/api
```

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### POST /api/auth/register
Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-15T10:00:00Z"
  },
  "token": "jwt_token_here"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Email already exists"
}
```

---

### POST /api/auth/login
Authenticate a user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt_token_here"
}
```

---

### POST /api/auth/logout
Logout the current user.

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### GET /api/auth/me
Get the current authenticated user.

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 555 123 4567",
    "addresses": [],
    "createdAt": "2024-01-15T10:00:00Z"
  }
}
```

---

## Products Endpoints

### GET /api/products
Get all products with optional filters.

**Query Parameters:**
- `category` (optional): Filter by category
- `fragranceFamily` (optional): Filter by fragrance family
- `featured` (optional): boolean - Get featured products only
- `bestSeller` (optional): boolean - Get best sellers only
- `new` (optional): boolean - Get new products only
- `search` (optional): Search by name or description
- `sort` (optional): `featured`, `newest`, `price-asc`, `price-desc`, `rating`
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 12)

**Response (200 OK):**
```json
{
  "products": [
    {
      "id": "1",
      "name": "Midnight Amber",
      "slug": "midnight-amber",
      "price": 68,
      "description": "A captivating blend...",
      "shortDescription": "Amber, Vanilla, Sandalwood",
      "category": "Signature Collection",
      "fragranceFamily": "Oriental",
      "topNotes": ["Warm Amber", "Bergamot"],
      "heartNotes": ["Vanilla Bean", "Jasmine"],
      "baseNotes": ["Sandalwood", "Musk", "Cedar"],
      "burnTime": "50 hours",
      "size": "8 oz",
      "weight": "280g",
      "images": ["/products/midnight-amber-1.jpg"],
      "inStock": true,
      "rating": 4.9,
      "reviewCount": 342,
      "featured": true,
      "bestSeller": true,
      "new": false,
      "createdAt": "2024-01-15T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 8,
    "totalPages": 1
  }
}
```

---

### GET /api/products/:slug
Get a single product by slug.

**Response (200 OK):**
```json
{
  "product": {
    "id": "1",
    "name": "Midnight Amber",
    "slug": "midnight-amber",
    // ... full product object
  }
}
```

---

## Orders Endpoints

### POST /api/orders
Create a new order.

**Headers:** `Authorization: Bearer <token>` (optional for guest checkout)

**Request Body:**
```json
{
  "items": [
    {
      "productId": "1",
      "quantity": 2
    },
    {
      "productId": "4",
      "quantity": 1
    }
  ],
  "shippingAddress": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1 555 123 4567",
    "addressLine1": "123 Main Street",
    "addressLine2": "Apt 4B",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "United States"
  },
  "shippingMethod": "standard",
  "paymentMethod": "razorpay"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "order": {
    "id": "SUA-ABC123-XYZ",
    "items": [
      {
        "productId": "1",
        "productName": "Midnight Amber",
        "quantity": 2,
        "price": 68
      }
    ],
    "subtotal": 221,
    "shipping": 0,
    "tax": 17.68,
    "total": 238.68,
    "status": "pending",
    "paymentStatus": "pending",
    "createdAt": "2024-01-18T10:00:00Z"
  },
  "paymentOrderId": "razorpay_order_id"
}
```

---

### GET /api/orders
Get orders for the authenticated user.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page
- `status` (optional): Filter by status

**Response (200 OK):**
```json
{
  "orders": [
    {
      "id": "SUA-ABC123-XYZ",
      "items": [...],
      "total": 238.68,
      "status": "shipped",
      "trackingId": "TRK-789456123",
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 5,
    "totalPages": 1
  }
}
```

---

### GET /api/orders/:orderId
Get a single order by ID.

**Response (200 OK):**
```json
{
  "order": {
    "id": "SUA-ABC123-XYZ",
    "userId": "user_123",
    "items": [
      {
        "productId": "1",
        "productName": "Midnight Amber",
        "quantity": 2,
        "price": 68
      }
    ],
    "subtotal": 221,
    "shipping": 0,
    "tax": 17.68,
    "total": 238.68,
    "status": "shipped",
    "shippingAddress": {
      "fullName": "John Doe",
      "addressLine1": "123 Main Street",
      "city": "New York",
      "state": "NY",
      "postalCode": "10001",
      "country": "United States"
    },
    "trackingId": "TRK-789456123",
    "trackingHistory": [
      {
        "status": "Order Placed",
        "location": "Online",
        "timestamp": "2024-01-15T10:00:00Z",
        "description": "Your order has been placed"
      },
      {
        "status": "Shipped",
        "location": "New York, NY",
        "timestamp": "2024-01-16T09:00:00Z",
        "description": "Package has been shipped"
      }
    ],
    "paymentStatus": "paid",
    "paymentMethod": "Credit Card",
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-16T09:00:00Z"
  }
}
```

---

## Payment Endpoints

### POST /api/payments/create-order
Create a Razorpay order for payment.

**Request Body:**
```json
{
  "orderId": "SUA-ABC123-XYZ",
  "amount": 23868
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "razorpayOrderId": "order_xyz123",
  "amount": 23868,
  "currency": "INR",
  "key": "razorpay_key_id"
}
```

---

### POST /api/payments/verify
Verify Razorpay payment after completion.

**Request Body:**
```json
{
  "orderId": "SUA-ABC123-XYZ",
  "razorpayOrderId": "order_xyz123",
  "razorpayPaymentId": "pay_abc123",
  "razorpaySignature": "signature_hash"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Payment verified successfully",
  "order": {
    "id": "SUA-ABC123-XYZ",
    "paymentStatus": "paid"
  }
}
```

---

## Admin Endpoints

All admin endpoints require admin authentication.

### GET /api/admin/orders
Get all orders (admin only).

**Query Parameters:**
- `page`, `limit`, `status`, `search`, `startDate`, `endDate`

**Response (200 OK):**
```json
{
  "orders": [...],
  "stats": {
    "totalOrders": 156,
    "pendingOrders": 12,
    "shippedOrders": 45,
    "deliveredOrders": 89
  },
  "pagination": {...}
}
```

---

### PATCH /api/admin/orders/:orderId
Update order status and tracking.

**Request Body:**
```json
{
  "status": "shipped",
  "trackingId": "TRK-123456789",
  "trackingEvent": {
    "status": "Shipped",
    "location": "Los Angeles, CA",
    "description": "Package has left our facility"
  }
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "order": {
    "id": "SUA-ABC123-XYZ",
    "status": "shipped",
    "trackingId": "TRK-123456789"
  }
}
```

---

### GET /api/admin/stats
Get dashboard statistics.

**Response (200 OK):**
```json
{
  "totalRevenue": 45230,
  "revenueChange": 12.5,
  "totalOrders": 156,
  "ordersChange": 8.2,
  "totalCustomers": 89,
  "customersChange": 15.3,
  "avgOrderValue": 290,
  "avgOrderChange": -2.1,
  "recentOrders": [...],
  "topProducts": [...]
}
```

---

### GET /api/admin/products
Get all products for management.

### POST /api/admin/products
Create a new product.

### PATCH /api/admin/products/:id
Update a product.

### DELETE /api/admin/products/:id
Delete a product.

---

## Database Schema (Prisma)

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String
  passwordHash  String
  phone         String?
  role          Role      @default(CUSTOMER)
  addresses     Address[]
  orders        Order[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

enum Role {
  CUSTOMER
  ADMIN
}

model Address {
  id           String  @id @default(cuid())
  userId       String
  user         User    @relation(fields: [userId], references: [id])
  fullName     String
  phone        String
  addressLine1 String
  addressLine2 String?
  city         String
  state        String
  postalCode   String
  country      String
  isDefault    Boolean @default(false)
}

model Product {
  id              String      @id @default(cuid())
  name            String
  slug            String      @unique
  price           Float
  description     String      @db.Text
  shortDescription String
  category        String
  fragranceFamily String
  topNotes        String[]
  heartNotes      String[]
  baseNotes       String[]
  burnTime        String
  size            String
  weight          String
  images          String[]
  inStock         Boolean     @default(true)
  rating          Float       @default(0)
  reviewCount     Int         @default(0)
  featured        Boolean     @default(false)
  bestSeller      Boolean     @default(false)
  new             Boolean     @default(false)
  orderItems      OrderItem[]
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
}

model Order {
  id              String         @id @default(cuid())
  orderNumber     String         @unique
  userId          String?
  user            User?          @relation(fields: [userId], references: [id])
  items           OrderItem[]
  subtotal        Float
  shipping        Float
  tax             Float
  total           Float
  status          OrderStatus    @default(PENDING)
  shippingAddress Json
  trackingId      String?
  trackingHistory TrackingEvent[]
  paymentStatus   PaymentStatus  @default(PENDING)
  paymentMethod   String?
  paymentId       String?
  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt
}

model OrderItem {
  id          String   @id @default(cuid())
  orderId     String
  order       Order    @relation(fields: [orderId], references: [id])
  productId   String
  product     Product  @relation(fields: [productId], references: [id])
  productName String
  quantity    Int
  price       Float
}

model TrackingEvent {
  id          String   @id @default(cuid())
  orderId     String
  order       Order    @relation(fields: [orderId], references: [id])
  status      String
  location    String
  description String
  timestamp   DateTime @default(now())
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}

enum PaymentStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
}
```

---

## Backend Architecture Recommendations

### Folder Structure
```
/backend
├── /src
│   ├── /controllers
│   │   ├── authController.ts
│   │   ├── productController.ts
│   │   ├── orderController.ts
│   │   ├── paymentController.ts
│   │   └── adminController.ts
│   ├── /middleware
│   │   ├── auth.ts
│   │   ├── adminAuth.ts
│   │   ├── validation.ts
│   │   └── rateLimit.ts
│   ├── /services
│   │   ├── authService.ts
│   │   ├── orderService.ts
│   │   ├── paymentService.ts
│   │   └── emailService.ts
│   ├── /utils
│   │   ├── jwt.ts
│   │   ├── password.ts
│   │   └── orderIdGenerator.ts
│   ├── /validators
│   │   ├── authValidator.ts
│   │   ├── orderValidator.ts
│   │   └── productValidator.ts
│   └── /types
│       └── index.ts
├── /prisma
│   └── schema.prisma
└── package.json
```

### Security Checklist
- [ ] Password hashing with bcrypt (min 12 rounds)
- [ ] JWT tokens with short expiry (15min access, 7d refresh)
- [ ] HTTP-only cookies for token storage
- [ ] CORS configuration for frontend domain only
- [ ] Rate limiting on auth endpoints
- [ ] Input validation with Zod or similar
- [ ] SQL injection prevention (Prisma handles this)
- [ ] XSS prevention (sanitize user inputs)
- [ ] HTTPS only in production
- [ ] Environment variables for secrets
- [ ] Razorpay signature verification

### Environment Variables Needed
```env
DATABASE_URL=postgresql://...
JWT_SECRET=your-super-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=your-razorpay-secret
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=noreply@suarin.com
SMTP_PASS=email-password
FRONTEND_URL=https://suarin.com
```
