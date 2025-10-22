# Shopify Test OMS - Storefront React App Documentation

## 📋 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Project Structure](#project-structure)
4. [Components](#components)
5. [State Management](#state-management)
6. [API Integration](#api-integration)
7. [Styling](#styling)
8. [Development](#development)
9. [Building & Deployment](#building--deployment)

---

## Overview

The Storefront is a modern React application built with **Vite** that provides a user interface for the Shopify Test Order Management System (OMS). It allows users to:

- Browse products from a Shopify store
- Add products to a shopping cart
- Create orders with customer information
- Manage local orders with status tracking
- View orders from the Shopify store

**Tech Stack:**
- React 19.1.1
- Vite 7.1.7 (build tool)
- CSS3 (styling)
- Fetch API (HTTP requests)

---

## Architecture

### High-Level Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    React App (Storefront)                   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              App.jsx (Main Component)                │  │
│  │  - State: cart, orders, currentPage                  │  │
│  │  - Functions: addToCart, createOrder, etc.           │  │
│  └──────────────────────────────────────────────────────┘  │
│                           │                                  │
│         ┌─────────────────┼─────────────────┐               │
│         │                 │                 │               │
│    ┌────▼────┐    ┌──────▼──────┐   ┌─────▼──────┐        │
│    │ProductCat│    │ShoppingCart │   │OrderMgmt   │        │
│    │alog      │    │             │   │            │        │
│    └────┬────┘    └──────┬──────┘   └─────┬──────┘        │
│         │                │                 │               │
│         └────────────────┼─────────────────┘               │
│                          │                                  │
│                    ┌─────▼──────┐                          │
│                    │ShopifyOrders│                          │
│                    └─────┬──────┘                          │
│                          │                                  │
└──────────────────────────┼──────────────────────────────────┘
                           │
                    ┌──────▼──────┐
                    │ Backend API  │
                    │ (Express)    │
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
   ┌────▼────┐      ┌─────▼──────┐    ┌─────▼──────┐
   │Shopify   │      │SQLite DB   │    │Shopify API │
   │Products  │      │(Local)     │    │(REST)      │
   └──────────┘      └────────────┘    └────────────┘
```

---

## Project Structure

```
storefront/
├── src/
│   ├── App.jsx                          # Main app component
│   ├── App.css                          # App styling
│   ├── main.jsx                         # React entry point
│   ├── index.css                        # Global styles
│   ├── components/
│   │   ├── ProductCatalog.jsx           # Product listing component
│   │   ├── ShoppingCart.jsx             # Cart & checkout component
│   │   ├── OrderManagement.jsx          # Local order management
│   │   └── ShopifyOrders.jsx            # Shopify order viewer
│   ├── styles/
│   │   ├── ProductCatalog.css           # Product catalog styles
│   │   ├── ShoppingCart.css             # Shopping cart styles
│   │   └── OrderManagement.css          # Order management styles
│   └── assets/
│       └── react.svg
├── public/
│   └── vite.svg
├── package.json                         # Dependencies
├── vite.config.js                       # Vite configuration
├── index.html                           # HTML entry point
└── eslint.config.js                     # ESLint configuration
```

---

## Components

### 1. App.jsx (Main Component)

**Purpose:** Root component that manages global state and navigation

**State:**
- `currentPage` - Current active tab (shop, cart, orders, shopify-orders)
- `cart` - Array of cart items with quantities
- `orders` - Array of local orders

**Key Functions:**
- `addToCart(product)` - Add product to cart or increment quantity
- `removeFromCart(productId)` - Remove product from cart
- `updateCartQuantity(productId, quantity)` - Update item quantity
- `createOrder(customerName, customerEmail)` - Create order from cart
- `fetchOrders()` - Fetch all local orders from backend
- `updateOrderStatus(orderId, status, notes)` - Update order status
- `deleteOrder(orderId)` - Delete an order

**API Calls:**
- `POST /api/orders` - Create new order
- `GET /api/orders` - Fetch all orders
- `PATCH /api/orders/:id/status` - Update order status
- `DELETE /api/orders/:id` - Delete order

---

### 2. ProductCatalog.jsx

**Purpose:** Display products from Shopify store with search functionality

**Props:**
- `onAddToCart(product)` - Callback when user adds product to cart

**State:**
- `products` - Array of products from Shopify
- `searchTerm` - Current search query
- `loading` - Loading state
- `error` - Error message if fetch fails

**Features:**
- Fetches products from `/api/shopify/products`
- Search by product title or description
- Displays product image, title, description, and price
- Shows product count
- Error handling with retry button
- Loading state

**API Calls:**
- `GET /api/shopify/products` - Fetch all products

---

### 3. ShoppingCart.jsx

**Purpose:** Display cart items and checkout form

**Props:**
- `cart` - Array of cart items
- `onRemoveFromCart(productId)` - Remove item callback
- `onUpdateQuantity(productId, quantity)` - Update quantity callback
- `onCreateOrder(name, email)` - Create order callback

**State:**
- `customerName` - Customer name input
- `customerEmail` - Customer email input
- `isSubmitting` - Form submission state
- `error` - Validation error message

**Features:**
- Display all cart items with images and prices
- Adjust quantities with +/- buttons
- Remove items from cart
- Checkout form with customer info
- Order summary with subtotal and total
- Form validation (name, email format)
- Empty cart message

---

### 4. OrderManagement.jsx

**Purpose:** Manage local orders created in the OMS

**Props:**
- `orders` - Array of local orders
- `onUpdateStatus(orderId, status, notes)` - Update status callback
- `onDeleteOrder(orderId)` - Delete order callback

**State:**
- `expandedOrderId` - Currently expanded order
- `statusNotes` - Notes for status changes

**Features:**
- Display all local orders
- Expandable order details
- Order items table
- Status dropdown with color coding
- Status notes textarea
- Status history timeline
- Delete order button
- Order creation date display

**Status Colors:**
- Pending: Orange (#ffa500)
- Processing: Blue (#4169e1)
- Shipped: Purple (#9370db)
- Delivered: Green (#32cd32)
- Cancelled: Red (#dc143c)

---

### 5. ShopifyOrders.jsx

**Purpose:** Display orders from Shopify store

**State:**
- `orders` - Array of Shopify orders
- `loading` - Loading state
- `error` - Error message
- `expandedOrder` - Currently expanded order
- `statusFilter` - Filter by status

**Features:**
- Fetch orders from Shopify API
- Filter by financial/fulfillment status
- Display customer information
- Show order items with quantities and prices
- Display shipping address
- Show order dates and totals
- Expandable order details
- Error handling with retry

**API Calls:**
- `GET /api/shopify/orders?status={status}&limit=50` - Fetch orders

---

## State Management

The app uses **React Hooks** for state management:

- **useState** - Local component state
- **useEffect** - Side effects (API calls)

### Global State (App.jsx)
```javascript
const [currentPage, setCurrentPage] = useState('shop');
const [cart, setCart] = useState([]);
const [orders, setOrders] = useState([]);
```

### Component-Level State
Each component manages its own local state (loading, error, form inputs, etc.)

---

## API Integration

### Backend URL
```javascript
const API_URL = 'http://localhost:3001/api';
```

### Endpoints Used

**Local Orders:**
- `GET /api/orders` - Fetch all orders
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:id/status` - Update order status
- `DELETE /api/orders/:id` - Delete order

**Shopify Integration:**
- `GET /api/shopify/products` - Fetch products
- `GET /api/shopify/orders` - Fetch orders

### Error Handling
- Try-catch blocks for all API calls
- Error state display to user
- Retry buttons for failed requests
- Console logging for debugging

---

## Styling

### CSS Files
- `App.css` - Main app layout and navigation
- `ProductCatalog.css` - Product grid and cards
- `ShoppingCart.css` - Cart layout and checkout form
- `OrderManagement.css` - Order cards and details
- `index.css` - Global styles

### Design Features
- Responsive grid layouts
- Color-coded status badges
- Expandable/collapsible sections
- Form validation styling
- Loading and error states
- Mobile-friendly design

---

## Development

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation
```bash
cd storefront
npm install
```

### Running Development Server
```bash
npm run dev
```
Server runs on `http://localhost:5173`

### Building for Production
```bash
npm run build
```
Output: `dist/` directory

### Linting
```bash
npm run lint
```

### Preview Production Build
```bash
npm run preview
```

---

## Building & Deployment

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Environment Configuration
- Backend API URL: `http://localhost:3001/api` (hardcoded in App.jsx)
- For production, update API_URL in App.jsx

### Deployment Steps
1. Build the app: `npm run build`
2. Deploy `dist/` folder to web server
3. Configure backend API URL for production
4. Ensure CORS is enabled on backend

---

## Key Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19.1.1 | UI framework |
| Vite | 7.1.7 | Build tool |
| React DOM | 19.1.1 | React rendering |
| ESLint | 9.36.0 | Code linting |

---

## Notes

- The app uses client-side routing with state management
- No external routing library (React Router) is used
- All styling is vanilla CSS (no CSS-in-JS or preprocessors)
- API calls use native Fetch API
- Components are functional components with hooks

