# Storefront Quick Reference

## Quick Start

```bash
cd storefront
npm install
npm run dev
```

Open: `http://localhost:5173`

---

## File Locations

| What | Where |
|------|-------|
| Main App | `src/App.jsx` |
| Components | `src/components/` |
| Styles | `src/styles/` |
| Global CSS | `src/index.css` |
| Config | `vite.config.js` |
| Dependencies | `package.json` |

---

## Components Overview

| Component | File | Purpose |
|-----------|------|---------|
| App | `App.jsx` | Root component, state management |
| ProductCatalog | `ProductCatalog.jsx` | Display Shopify products |
| ShoppingCart | `ShoppingCart.jsx` | Cart & checkout |
| OrderManagement | `OrderManagement.jsx` | Local order management |
| ShopifyOrders | `ShopifyOrders.jsx` | View Shopify orders |

---

## Key Functions in App.jsx

```javascript
addToCart(product)              // Add product to cart
removeFromCart(productId)       // Remove from cart
updateCartQuantity(id, qty)     // Update quantity
createOrder(name, email)        // Create order
fetchOrders()                   // Fetch all orders
updateOrderStatus(id, status)   // Update status
deleteOrder(id)                 // Delete order
```

---

## API Endpoints

### Local Orders
```
GET    /api/orders              Fetch all orders
POST   /api/orders              Create order
PATCH  /api/orders/:id/status   Update status
DELETE /api/orders/:id          Delete order
```

### Shopify
```
GET /api/shopify/products       Fetch products
GET /api/shopify/orders         Fetch orders
```

---

## Component Props

### ProductCatalog
```javascript
<ProductCatalog onAddToCart={(product) => {}} />
```

### ShoppingCart
```javascript
<ShoppingCart
  cart={[]}
  onRemoveFromCart={(id) => {}}
  onUpdateQuantity={(id, qty) => {}}
  onCreateOrder={(name, email) => {}}
/>
```

### OrderManagement
```javascript
<OrderManagement
  orders={[]}
  onUpdateStatus={(id, status, notes) => {}}
  onDeleteOrder={(id) => {}}
/>
```

### ShopifyOrders
```javascript
<ShopifyOrders />
```

---

## State in App.jsx

```javascript
const [currentPage, setCurrentPage] = useState('shop');
const [cart, setCart] = useState([]);
const [orders, setOrders] = useState([]);
```

---

## Common Code Patterns

### Fetch Data
```javascript
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetch = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/endpoint');
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  fetch();
}, []);
```

### Handle Form Submit
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;
  
  try {
    const res = await fetch('http://localhost:3001/api/endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed');
  } catch (err) {
    setError(err.message);
  }
};
```

### Conditional Rendering
```javascript
{loading && <p>Loading...</p>}
{error && <p style={{color: 'red'}}>{error}</p>}
{data && <div>{/* render data */}</div>}
```

---

## CSS Classes

### ProductCatalog
```css
.product-catalog
.catalog-header
.search-input
.products-grid
.product-card
.product-image
.product-price
.add-to-cart-btn
```

### ShoppingCart
```css
.shopping-cart
.cart-container
.cart-items
.cart-item
.item-quantity
.checkout-form
.order-summary
.checkout-btn
```

### OrderManagement
```css
.order-management
.orders-list
.order-card
.order-header
.order-details
.status-badge
.order-items
.items-table
```

---

## Status Options

```javascript
const STATUS_OPTIONS = [
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled'
];
```

### Status Colors
```javascript
{
  pending: '#ffa500',      // Orange
  processing: '#4169e1',   // Blue
  shipped: '#9370db',      // Purple
  delivered: '#32cd32',    // Green
  cancelled: '#dc143c'     // Red
}
```

---

## Data Models

### Cart Item
```javascript
{
  id: string,
  name: string,
  price: number,
  image: string,
  quantity: number
}
```

### Order
```javascript
{
  id: number,
  order_number: string,
  customer_name: string,
  customer_email: string,
  items: Array,
  total_price: number,
  status: string,
  created_at: string,
  history: Array
}
```

### Product
```javascript
{
  id: string,
  title: string,
  body_html: string,
  image: { src: string },
  variants: [{ price: string }]
}
```

---

## npm Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm install          # Install dependencies
npm update           # Update dependencies
```

---

## Debugging Tips

1. **Check Console:** `F12` → Console tab
2. **Check Network:** `F12` → Network tab
3. **Check React:** Install React DevTools extension
4. **Check Backend:** Ensure `http://localhost:3001` is running
5. **Check Logs:** Look at backend console for errors

---

## Common Errors

| Error | Solution |
|-------|----------|
| Cannot GET /api/... | Backend not running |
| CORS error | Check backend CORS config |
| Component not rendering | Check import statement |
| State not updating | Check setState call |
| API call failing | Check network tab, backend logs |

---

## Performance Tips

- Use client-side search (no API call)
- Avoid unnecessary re-renders
- Use useEffect dependencies correctly
- Lazy load images
- Minimize bundle size

---

## Useful Links

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [MDN Docs](https://developer.mozilla.org)
- [Backend API](http://localhost:3001)
- [App](http://localhost:5173)

---

## File Checklist

- [ ] `src/App.jsx` - Main component
- [ ] `src/components/ProductCatalog.jsx` - Products
- [ ] `src/components/ShoppingCart.jsx` - Cart
- [ ] `src/components/OrderManagement.jsx` - Orders
- [ ] `src/components/ShopifyOrders.jsx` - Shopify orders
- [ ] `src/styles/ProductCatalog.css` - Product styles
- [ ] `src/styles/ShoppingCart.css` - Cart styles
- [ ] `src/styles/OrderManagement.css` - Order styles
- [ ] `src/index.css` - Global styles
- [ ] `package.json` - Dependencies
- [ ] `vite.config.js` - Vite config

---

## Next Steps

1. Read `STOREFRONT_DOCUMENTATION.md` for detailed overview
2. Read `COMPONENT_API_REFERENCE.md` for API details
3. Read `DEVELOPMENT_GUIDE.md` for development practices
4. Start the dev server: `npm run dev`
5. Make changes and test

