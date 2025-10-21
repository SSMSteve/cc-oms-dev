# Shopify Test OMS

A simple, production-ready Order Management System (OMS) that integrates with your Shopify store using the REST API.

## 🎯 Features

- ✅ View products from your Shopify store
- ✅ View orders from your Shopify store
- ✅ Create local test orders
- ✅ Manage order status
- ✅ Search and filter functionality
- ✅ Error handling and loading states
- ✅ Responsive design

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm

### Installation

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../storefront
npm install
```

### Running the OMS

**Terminal 1 - Start Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Start Frontend:**
```bash
cd storefront
npm run dev
```

### Access
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

## 📋 Tabs

| Tab | Purpose |
|-----|---------|
| **Shop** | View products from your Shopify store |
| **Cart** | Manage shopping cart & checkout |
| **My Orders** | View orders created locally |
| **Shopify Orders** | View orders from your Shopify store |

## 🔌 API Endpoints

### Shopify Integration
```
GET  /api/shopify/products?limit=50
GET  /api/shopify/orders?status=any&limit=50
GET  /api/shopify/orders/:id
GET  /api/shopify/shop
```

### Local Orders
```
GET  /api/orders
POST /api/orders
PATCH /api/orders/:id/status
DELETE /api/orders/:id
```

### Health Check
```
GET /api/health
```

## 📁 Project Structure

```
backend/
├── shopify-rest.js    # Shopify REST API client
├── server.js          # Express API server
├── db.js              # SQLite database setup
├── .env               # Configuration (credentials)
└── package.json

storefront/
├── src/
│   ├── App.jsx        # Main app with navigation
│   ├── App.css        # Main styles
│   ├── components/
│   │   ├── ProductCatalog.jsx      # Shopify products
│   │   ├── ShopifyOrders.jsx       # Shopify orders
│   │   ├── ShoppingCart.jsx        # Local cart
│   │   └── OrderManagement.jsx     # Local orders
│   └── styles/
│       ├── ProductCatalog.css
│       ├── ShoppingCart.css
│       └── OrderManagement.css
├── index.html
├── vite.config.js
└── package.json
```

## 🔐 Configuration

Create `backend/.env` with your Shopify credentials:

```env
SHOPIFY_API_KEY=your_api_key
SHOPIFY_API_PASSWORD=your_api_password
SHOPIFY_STORE_NAME=your_store_name
SHOPIFY_API_VERSION=2025-10
```

## 🧪 Testing Workflow

### 1. View Shopify Products
1. Click "Shop" tab
2. See products from your store
3. Search for products
4. Add to cart

### 2. Create Local Order
1. Go to "Cart" tab
2. Enter customer name and email
3. Click "Place Order"
4. Order is saved locally

### 3. View Local Orders
1. Click "My Orders" tab
2. Expand order to see details
3. Update status
4. Delete if needed

### 4. View Shopify Orders
1. Click "Shopify Orders" tab
2. See all orders from your store
3. Filter by status
4. Expand to see details

## 🛠️ Technology Stack

**Frontend:**
- React 18
- Vite
- CSS3

**Backend:**
- Node.js
- Express.js
- SQLite3

**Integration:**
- Shopify Admin REST API
- Basic Authentication

## 📊 Data Flow

```
Frontend (React)
    ↓
API Endpoints (Express)
    ↓
Shopify REST API / SQLite Database
    ↓
Your Shopify Store / Local Storage
```

## 🐛 Troubleshooting

### Products not loading
- Check backend is running: `curl http://localhost:3001/api/health`
- Verify Shopify credentials in `backend/.env`
- Check browser console for errors

### Orders not showing
- Ensure you have orders in your Shopify store
- Check backend logs for API errors
- Try refreshing the page

### Backend not responding
- Kill and restart: `cd backend && npm start`
- Check port 3001 is not in use
- Verify `.env` file has credentials

## 📚 Documentation

- **OMS_QUICK_START.md** - Quick start guide
- **SHOPIFY_OMS_GUIDE.md** - Complete feature guide
- **OMS_IMPLEMENTATION_SUMMARY.md** - Implementation details
- **IMPLEMENTATION_COMPLETE.md** - Full technical summary

## 🎯 Next Steps

1. Customize styling and layout
2. Add more features (fulfillment, tracking, etc.)
3. Deploy to production
4. Monitor usage and errors

## 📞 Support

For issues:
1. Check browser console for errors
2. Check backend logs
3. Verify Shopify credentials in `.env`
4. Ensure both frontend and backend are running

## 🎉 Ready to Use

Your Shopify Test OMS is ready!

**Open now:** http://localhost:5173

Enjoy! 🚀
