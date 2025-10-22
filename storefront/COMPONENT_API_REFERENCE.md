# Component API Reference

## App.jsx

### Component Props

None (root component)

### State

```javascript
const [currentPage, setCurrentPage] = useState('shop');
const [cart, setCart] = useState([]);
const [orders, setOrders] = useState([]);
```

### Functions

#### addToCart(product)

Adds a product to cart or increments quantity if already exists.

**Parameters:**

-   `product` (Object)
    -   `id` (string) - Product ID
    -   `name` (string) - Product name
    -   `price` (number) - Product price
    -   `image` (string) - Product image URL

**Returns:** void

**Example:**

```javascript
addToCart({
  id: '123',
  name: 'Product Name',
  price: 29.99,
  image: 'https://...'
});
```

#### removeFromCart(productId)

Removes a product from cart.

**Parameters:**

-   `productId` (string) - ID of product to remove

**Returns:** void

#### updateCartQuantity(productId, quantity)

Updates quantity of cart item. Removes if quantity \<= 0.

**Parameters:**

-   `productId` (string) - Product ID
-   `quantity` (number) - New quantity

**Returns:** void

#### createOrder(customerName, customerEmail)

Creates an order from current cart.

**Parameters:**

-   `customerName` (string) - Customer full name
-   `customerEmail` (string) - Customer email address

**Returns:** Promise - Created order data

**Payload Sent:**

```javascript
{
  customer_name: string,
  customer_email: string,
  items: [
    {
      id: string,
      name: string,
      quantity: number,
      price: number
    }
  ],
  total_price: number
}
```

#### fetchOrders()

Fetches all local orders from backend.

**Parameters:** None

**Returns:** Promise

**Response:**

```javascript
[
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
]
```

#### updateOrderStatus(orderId, status, notes)

Updates order status with optional notes.

**Parameters:**

-   `orderId` (number) - Order ID
-   `status` (string) - New status (pending, processing, shipped, delivered, cancelled)
-   `notes` (string) - Optional status change notes

**Returns:** Promise

**Payload Sent:**

```javascript
{
  status: string,
  notes: string
}
```

#### deleteOrder(orderId)

Deletes an order.

**Parameters:**

-   `orderId` (number) - Order ID to delete

**Returns:** Promise

## ProductCatalog.jsx

### Component Props

```javascript
{
  onAddToCart: (product) => void  // Required
}
```

### State

```javascript
const [products, setProducts] = useState([]);
const [searchTerm, setSearchTerm] = useState('');
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

### Functions

#### fetchProducts()

Fetches products from Shopify API.

**Returns:** Promise

**API Endpoint:** `GET /api/shopify/products`

**Response Format:**

```javascript
{
  products: [
    {
      id: string,
      title: string,
      body_html: string,
      image: { src: string },
      variants: [{ price: string }]
    }
  ]
}
```

## ShoppingCart.jsx

### Component Props

```javascript
{
  cart: Array,                              // Required
  onRemoveFromCart: (productId) => void,   // Required
  onUpdateQuantity: (productId, qty) => void, // Required
  onCreateOrder: (name, email) => Promise  // Required
}
```

### State

```javascript
const [customerName, setCustomerName] = useState('');
const [customerEmail, setCustomerEmail] = useState('');
const [isSubmitting, setIsSubmitting] = useState(false);
const [error, setError] = useState('');
```

### Functions

#### handleCheckout(e)

Handles checkout form submission with validation.

**Validation:**

-   Customer name required
-   Customer email required
-   Valid email format
-   Cart not empty

**Returns:** Promise

## OrderManagement.jsx

### Component Props

```javascript
{
  orders: Array,                              // Required
  onUpdateStatus: (id, status, notes) => void, // Required
  onDeleteOrder: (id) => void                // Required
}
```

### State

```javascript
const [expandedOrderId, setExpandedOrderId] = useState(null);
const [statusNotes, setStatusNotes] = useState({});
```

### Constants

#### STATUS_OPTIONS

```javascript
['pending', 'processing', 'shipped', 'delivered', 'cancelled']
```

#### STATUS_COLORS

```javascript
{
  pending: '#ffa500',
  processing: '#4169e1',
  shipped: '#9370db',
  delivered: '#32cd32',
  cancelled: '#dc143c'
}
```

### Functions

#### handleStatusChange(orderId, newStatus)

Updates order status.

**Parameters:**

-   `orderId` (number)
-   `newStatus` (string)

**Returns:** void

#### toggleOrderDetails(orderId)

Toggles order details expansion.

**Parameters:**

-   `orderId` (number)

**Returns:** void

## ShopifyOrders.jsx

### Component Props

None

### State

```javascript
const [orders, setOrders] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [expandedOrder, setExpandedOrder] = useState(null);
const [statusFilter, setStatusFilter] = useState('any');
```

### Functions

#### fetchOrders()

Fetches orders from Shopify API with status filter.

**Returns:** Promise

**API Endpoint:** `GET /api/shopify/orders?status={statusFilter}&limit=50`

**Response Format:**

```javascript
{
  orders: [
    {
      id: string,
      order_number: string,
      customer: {
        first_name: string,
        last_name: string,
        email: string
      },
      line_items: [
        {
          id: string,
          title: string,
          quantity: number,
          price: string
        }
      ],
      financial_status: string,
      fulfillment_status: string,
      total_price: string,
      created_at: string,
      shipping_address: {
        address1: string,
        address2: string,
        city: string,
        province: string,
        zip: string,
        country: string
      }
    }
  ]
}
```

#### getStatusColor(status)

Returns color for status badge.

**Parameters:**

-   `status` (string)

**Returns:** string (hex color)

#### formatDate(dateString)

Formats date string to readable format.

**Parameters:**

-   `dateString` (string) - ISO date string

**Returns:** string - Formatted date

**Example:** "Oct 22, 2025, 02:30 PM"

#### formatPrice(price)

Formats price to 2 decimal places.

**Parameters:**

-   `price` (string\|number)

**Returns:** string - Formatted price

**Example:** "29.99"

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
  items: [
    {
      id: number,
      product_name: string,
      quantity: number,
      price: number
    }
  ],
  total_price: number,
  status: string,
  created_at: string,
  history: [
    {
      id: number,
      status: string,
      timestamp: string,
      notes: string
    }
  ]
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

## Hooks Used

### useState

Used in all components for local state management.

### useEffect

Used for:

-   Fetching products on component mount (ProductCatalog)
-   Fetching orders on component mount (ShopifyOrders)
-   Fetching orders on app mount (App)
-   Re-fetching orders when status filter changes (ShopifyOrders)

## Error Handling

All components implement error handling:

-   Try-catch blocks for API calls
-   Error state display to user
-   Retry buttons for failed requests
-   Console logging for debugging
-   Validation errors in forms

## Performance Considerations

-   Products and orders are fetched once on mount
-   Search is performed client-side (no API call)
-   Status filter triggers re-fetch
-   No pagination implemented (limit 50 items)
-   No caching mechanism
