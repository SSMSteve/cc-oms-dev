# Shopify Test OMS - Quick Start

## 🎯 What You Have

A fully functional Order Management System that connects to your Shopify store:
- **Store**: cc-oms-dev.myshopify.com
- **API Version**: 2025-10
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001

## ✅ Status

- ✅ Backend running on port 3001
- ✅ Frontend running on port 5173
- ✅ Shopify API integrated
- ✅ Ready to use

## 🚀 Getting Started

### 1. Open the OMS
Visit: **http://localhost:5173**

### 2. Navigate Tabs

| Tab | Purpose |
|-----|---------|
| **Shop** | View products from your Shopify store |
| **Cart** | Manage shopping cart & checkout |
| **My Orders** | View orders created locally |
| **Shopify Orders** | View orders from your Shopify store |

### 3. Try It Out

**View Shopify Products:**
1. Click "Shop" tab
2. See all products from your store
3. Search for products
4. Add to cart

**View Shopify Orders:**
1. Click "Shopify Orders" tab
2. See all orders from your store
3. Filter by status
4. Click to expand order details

**Create Local Order:**
1. Add products to cart
2. Click "Cart" tab
3. Enter name and email
4. Click "Place Order"
5. View in "My Orders" tab

## 📊 Shopify Integration

Your OMS is connected to your Shopify store. Configure your credentials in `backend/.env`:

```env
SHOPIFY_STORE_NAME=your_store_name
SHOPIFY_API_KEY=your_api_key
SHOPIFY_API_PASSWORD=your_api_password
SHOPIFY_API_VERSION=2025-10
```

See `backend/.env.example` for the template.

### What It Can Do

- ✅ Fetch all products from your store
- ✅ Fetch all orders from your store
- ✅ View order details
- ✅ Filter orders by status
- ✅ Create local test orders
- ✅ Manage order status locally

## 🔌 API Endpoints

### Shopify Data
```bash
# Get products
curl http://localhost:3001/api/shopify/products

# Get orders
curl http://localhost:3001/api/shopify/orders

# Get specific order
curl http://localhost:3001/api/shopify/orders/{order-id}
```

### Local Orders
```bash
# Get all local orders
curl http://localhost:3001/api/orders

# Create order
curl -X POST http://localhost:3001/api/orders \
  -H "Content-Type: application/json" \
  -d '{"customer_name":"John","customer_email":"john@example.com","items":[],"total_price":0}'
```

## 📁 Project Structure

```
backend/
├── shopify-rest.js    ← Shopify API client
├── server.js          ← Express API
├── db.js              ← SQLite database
└── .env               ← Your credentials

storefront/
├── src/
│   ├── App.jsx        ← Main app
│   ├── components/
│   │   ├── ProductCatalog.jsx      ← Shopify products
│   │   ├── ShopifyOrders.jsx       ← Shopify orders
│   │   ├── ShoppingCart.jsx        ← Local cart
│   │   └── OrderManagement.jsx     ← Local orders
│   └── styles/        ← CSS files
```

## 🛠️ Commands

### Start Backend
```bash
cd backend
npm start
```

### Start Frontend
```bash
cd storefront
npm run dev
```

### Check Health
```bash
curl http://localhost:3001/api/health
```

## 🐛 Troubleshooting

### Products not loading?
- Check backend is running: `curl http://localhost:3001/api/health`
- Check browser console for errors
- Verify Shopify credentials in `backend/.env`

### Orders not showing?
- Make sure you have orders in your Shopify store
- Check backend logs for API errors
- Try refreshing the page

### Backend not responding?
- Kill and restart: `cd backend && npm start`
- Check port 3001 is not in use
- Check `.env` file has credentials

## 📋 Features

### Shop Tab
- [x] Display products from Shopify
- [x] Search products
- [x] Add to cart
- [x] Show product count
- [x] Handle loading/errors

### Shopify Orders Tab
- [x] Display orders from Shopify
- [x] Filter by status
- [x] Expand order details
- [x] Show customer info
- [x] Show order items
- [x] Show shipping address
- [x] Handle loading/errors

### Cart Tab
- [x] Manage cart items
- [x] Adjust quantities
- [x] Checkout form
- [x] Create local orders

### My Orders Tab
- [x] View local orders
- [x] Expand details
- [x] Update status
- [x] Delete orders

## 🎨 UI Components

- **ProductCatalog** - Grid of products with search
- **ShopifyOrders** - List of orders with filtering
- **ShoppingCart** - Cart management and checkout
- **OrderManagement** - Local order management
- **App** - Main navigation and routing

## 🔐 Security

- Credentials stored in `.env` (not in code)
- Basic Authentication for Shopify API
- CORS enabled for frontend
- No sensitive data in frontend

## 📈 Performance

- Lazy loading of data
- Pagination support
- Status filtering
- Error handling
- Loading states

## 🎯 Next Steps

1. **Explore** - Click through all tabs
2. **Test** - Create orders and view them
3. **Customize** - Modify styling and layout
4. **Extend** - Add more features
5. **Deploy** - Push to production

## 📞 Quick Help

| Issue | Solution |
|-------|----------|
| Products not loading | Check backend running |
| Orders not showing | Verify Shopify store has orders |
| API errors | Check `.env` credentials |
| Port in use | Kill process on port 3001 |
| Frontend not loading | Check frontend running on 5173 |

## 🎉 You're Ready!

Your Shopify Test OMS is ready to use.

**Open now:** http://localhost:5173

Enjoy! 🚀

