# Shopify Test OMS - Quick Start Guide

## 🎯 Overview

This is a simple test Order Management System (OMS) that integrates with your Shopify store using the REST API. It allows you to:

- View products from your Shopify store
- View orders from your Shopify store
- Create local test orders
- Manage order status locally

## 🚀 Quick Start

### 1. Backend is Running
The backend API is already running on `http://localhost:3001`

### 2. Frontend is Running
The frontend is already running on `http://localhost:5173`

### 3. Open in Browser
Visit: **http://localhost:5173**

## 📋 Features

### Shop Tab
- Displays all products from your Shopify store
- Search products by title
- Add products to cart
- Shows product count

### Cart Tab
- View items in cart
- Adjust quantities
- Remove items
- Checkout form with customer name and email
- Order summary with total price

### My Orders Tab
- View orders created locally
- Expand order details
- View order items
- Update order status
- View status history
- Delete orders

### Shopify Orders Tab
- View all orders from your Shopify store
- Filter by status (All, Pending, Processing, Shipped, Delivered, Cancelled)
- Expand order details
- View customer information
- View order items
- View shipping address
- See order dates and totals

## 🔌 API Endpoints

### Products
```
GET /api/shopify/products?limit=50
```
Returns all products from your Shopify store

### Orders
```
GET /api/shopify/orders?status=any&limit=50
GET /api/shopify/orders/:id
```
Returns orders from your Shopify store

### Local Orders
```
GET /api/orders
POST /api/orders
PATCH /api/orders/:id/status
DELETE /api/orders/:id
```

## 🛠️ Configuration

Your Shopify credentials are configured in `backend/.env`. See `backend/.env.example` for the required keys:

```env
SHOPIFY_API_KEY=your_api_key
SHOPIFY_API_PASSWORD=your_api_password
SHOPIFY_STORE_NAME=your_store_name
SHOPIFY_API_VERSION=2025-10
```

**Note:** Never commit your `.env` file with real credentials. Use `.env.example` as a template.

## 📁 Project Structure

```
backend/
├── shopify-rest.js      # Shopify REST API client
├── server.js            # Express API server
├── db.js                # SQLite database
└── .env                 # Configuration

storefront/
├── src/
│   ├── App.jsx          # Main app with navigation
│   ├── components/
│   │   ├── ProductCatalog.jsx    # Shopify products
│   │   ├── ShoppingCart.jsx      # Local cart
│   │   ├── OrderManagement.jsx   # Local orders
│   │   └── ShopifyOrders.jsx     # Shopify orders
│   └── styles/
│       ├── ProductCatalog.css
│       ├── ShoppingCart.css
│       └── OrderManagement.css
```

## 🧪 Testing Workflow

### 1. View Shopify Products
1. Click "Shop" tab
2. See products from your Shopify store
3. Search for products
4. Add to cart

### 2. Create Local Order
1. Go to "Cart" tab
2. Enter customer name and email
3. Click "Place Order"
4. Order is saved locally

### 3. View Local Orders
1. Click "My Orders" tab
2. See orders you created
3. Expand order to see details
4. Update status
5. Delete if needed

### 4. View Shopify Orders
1. Click "Shopify Orders" tab
2. See all orders from your Shopify store
3. Filter by status
4. Expand to see details
5. View customer info and shipping address

## 🔄 How It Works

### Frontend Flow
```
App.jsx (Main component with navigation)
  ├── ProductCatalog.jsx (Fetches from /api/shopify/products)
  ├── ShoppingCart.jsx (Local cart state)
  ├── OrderManagement.jsx (Local orders from /api/orders)
  └── ShopifyOrders.jsx (Fetches from /api/shopify/orders)
```

### Backend Flow
```
Express Server (port 3001)
  ├── /api/shopify/products → shopify-rest.js → Shopify API
  ├── /api/shopify/orders → shopify-rest.js → Shopify API
  ├── /api/orders → SQLite Database (local)
  └── /api/orders/:id/status → SQLite Database (local)
```

## 🔐 Authentication

The backend uses **Basic Authentication** to connect to Shopify:
- API Key: Configured in `backend/.env`
- API Password: Configured in `backend/.env`
- Store: Configured in `backend/.env`

See `backend/.env.example` for required configuration keys.

## 📊 Database

Local orders are stored in SQLite (`backend/orders.db`):

### Tables
- **orders** - Order header information
- **order_items** - Line items in each order
- **order_status_history** - Status change history

## 🐛 Troubleshooting

### Products not loading
- Check backend is running: `http://localhost:3001/api/health`
- Check Shopify credentials in `.env`
- Check network tab in browser DevTools

### Orders not showing
- Make sure you've created an order first
- Check browser console for errors
- Verify backend is running

### Shopify Orders not loading
- Verify Shopify credentials are correct
- Check if your Shopify store has orders
- Look at backend logs for API errors

## 🚀 Next Steps

1. **Test with real data** - Create orders in Shopify and view them
2. **Customize styling** - Edit CSS files in `storefront/src/styles/`
3. **Add features** - Implement fulfillment, tracking, etc.
4. **Deploy** - Push to production when ready

## 📞 API Reference

### Get Shopify Products
```bash
curl http://localhost:3001/api/shopify/products
```

### Get Shopify Orders
```bash
curl http://localhost:3001/api/shopify/orders?status=any
```

### Get Local Orders
```bash
curl http://localhost:3001/api/orders
```

### Create Local Order
```bash
curl -X POST http://localhost:3001/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "John Doe",
    "customer_email": "john@example.com",
    "items": [{"id": "1", "name": "Product", "quantity": 1, "price": 29.99}],
    "total_price": 29.99
  }'
```

## ✨ Features Implemented

- ✅ Shopify REST API integration
- ✅ Product catalog from Shopify
- ✅ Order viewing from Shopify
- ✅ Local order creation
- ✅ Order status management
- ✅ Shopping cart functionality
- ✅ Responsive design
- ✅ Error handling
- ✅ Loading states
- ✅ Status filtering

## 🎉 You're Ready!

Your Shopify Test OMS is ready to use. Visit http://localhost:5173 to get started!

