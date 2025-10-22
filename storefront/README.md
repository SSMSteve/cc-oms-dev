# Storefront - React OMS Application

A modern React application for the Shopify Test Order Management System (OMS) built with Vite.

## 📚 Documentation

This project includes comprehensive documentation for developers:

### Quick Start
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Quick reference guide with common commands, components, and patterns

### Detailed Documentation
- **[STOREFRONT_DOCUMENTATION.md](./STOREFRONT_DOCUMENTATION.md)** - Complete overview of the React app architecture, components, and features
- **[COMPONENT_API_REFERENCE.md](./COMPONENT_API_REFERENCE.md)** - Detailed API reference for all components and functions
- **[DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)** - Development best practices, coding standards, and common tasks
- **[STYLING_GUIDE.md](./STYLING_GUIDE.md)** - CSS architecture, styling patterns, and responsive design guidelines

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Open `http://localhost:5173`

### Production Build
```bash
npm run build
```

### Linting
```bash
npm run lint
```

## 📁 Project Structure

```
storefront/
├── src/
│   ├── App.jsx                          # Main app component
│   ├── App.css                          # App styling
│   ├── main.jsx                         # React entry point
│   ├── index.css                        # Global styles
│   ├── components/
│   │   ├── ProductCatalog.jsx           # Product listing
│   │   ├── ShoppingCart.jsx             # Cart & checkout
│   │   ├── OrderManagement.jsx          # Local order management
│   │   └── ShopifyOrders.jsx            # Shopify order viewer
│   ├── styles/
│   │   ├── ProductCatalog.css
│   │   ├── ShoppingCart.css
│   │   └── OrderManagement.css
│   └── assets/
├── public/
├── package.json
├── vite.config.js
├── index.html
└── eslint.config.js
```

## 🧩 Components

| Component | Purpose |
|-----------|---------|
| **App** | Root component with state management and navigation |
| **ProductCatalog** | Display Shopify products with search |
| **ShoppingCart** | Shopping cart and checkout form |
| **OrderManagement** | Manage local orders with status tracking |
| **ShopifyOrders** | View orders from Shopify store |

## 🔌 API Integration

### Backend URL
```
http://localhost:3001/api
```

### Endpoints
- `GET /api/shopify/products` - Fetch products
- `GET /api/shopify/orders` - Fetch Shopify orders
- `GET /api/orders` - Fetch local orders
- `POST /api/orders` - Create order
- `PATCH /api/orders/:id/status` - Update order status
- `DELETE /api/orders/:id` - Delete order

## 🎨 Features

- ✅ Browse Shopify products
- ✅ Search products by title/description
- ✅ Add products to shopping cart
- ✅ Manage cart quantities
- ✅ Checkout with customer information
- ✅ Create local orders
- ✅ Track order status
- ✅ View order history
- ✅ View Shopify orders
- ✅ Filter orders by status
- ✅ Responsive design

## 🛠️ Tech Stack

- **React** 19.1.1 - UI framework
- **Vite** 7.1.7 - Build tool
- **CSS3** - Styling
- **Fetch API** - HTTP requests
- **ESLint** - Code linting

## 📖 Documentation Guide

### For New Developers
1. Start with [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
2. Read [STOREFRONT_DOCUMENTATION.md](./STOREFRONT_DOCUMENTATION.md)
3. Review [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)

### For Component Development
1. Check [COMPONENT_API_REFERENCE.md](./COMPONENT_API_REFERENCE.md)
2. Review [STYLING_GUIDE.md](./STYLING_GUIDE.md)
3. Follow patterns in [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)

### For Styling
1. Read [STYLING_GUIDE.md](./STYLING_GUIDE.md)
2. Check component CSS files
3. Review responsive design patterns

## 🔄 State Management

The app uses **React Hooks** for state management:

### Global State (App.jsx)
```javascript
const [currentPage, setCurrentPage] = useState('shop');
const [cart, setCart] = useState([]);
const [orders, setOrders] = useState([]);
```

### Component State
Each component manages its own local state (loading, error, form inputs, etc.)

## 🎯 Key Functions

### App.jsx
- `addToCart(product)` - Add product to cart
- `removeFromCart(productId)` - Remove from cart
- `updateCartQuantity(productId, quantity)` - Update quantity
- `createOrder(customerName, customerEmail)` - Create order
- `fetchOrders()` - Fetch all orders
- `updateOrderStatus(orderId, status, notes)` - Update status
- `deleteOrder(orderId)` - Delete order

## 🎨 Styling

- Component-scoped CSS files
- Responsive grid layouts
- Color-coded status badges
- Mobile-first design
- Flexbox and CSS Grid

### Status Colors
- Pending: Orange (#ffa500)
- Processing: Blue (#4169e1)
- Shipped: Purple (#9370db)
- Delivered: Green (#32cd32)
- Cancelled: Red (#dc143c)

## 📱 Responsive Design

- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

## 🐛 Debugging

### Browser DevTools
- Console: Check for errors
- Network: Monitor API calls
- React DevTools: Inspect state and props

### Common Issues
- **API not working:** Check backend is running on port 3001
- **Components not rendering:** Check console for errors
- **Styling issues:** Check CSS file is imported

## 📦 Dependencies

```json
{
  "react": "^19.1.1",
  "react-dom": "^19.1.1"
}
```

## 🚀 Deployment

### Build
```bash
npm run build
```

### Output
- `dist/` folder contains production build
- All assets are minified and optimized

### Steps
1. Build: `npm run build`
2. Upload `dist/` to web server
3. Configure backend API URL
4. Ensure CORS is enabled

## 📝 Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm install          # Install dependencies
```

## 🔗 Links

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [MDN Web Docs](https://developer.mozilla.org)
- [Backend API](http://localhost:3001)
- [App](http://localhost:5173)

## 📚 Additional Resources

- [STOREFRONT_DOCUMENTATION.md](./STOREFRONT_DOCUMENTATION.md) - Architecture and overview
- [COMPONENT_API_REFERENCE.md](./COMPONENT_API_REFERENCE.md) - API reference
- [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Development practices
- [STYLING_GUIDE.md](./STYLING_GUIDE.md) - CSS guidelines
- [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) - Quick reference

## 💡 Tips

- Use React DevTools for debugging
- Check network tab for API issues
- Use console.log for debugging
- Follow component patterns in existing code
- Test responsive design on mobile

## 🤝 Contributing

1. Follow coding standards in [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)
2. Use component patterns from existing components
3. Test all functionality before committing
4. Update documentation if needed

## 📞 Support

For issues or questions:
1. Check documentation files
2. Review component code
3. Check browser console
4. Check network requests
5. Check backend logs

---

**Last Updated:** October 2025
**Version:** 1.0.0

