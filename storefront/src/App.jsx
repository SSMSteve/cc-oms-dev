import { useState, useEffect } from 'react';
import './App.css';
import ProductCatalog from './components/ProductCatalog';
import ShoppingCart from './components/ShoppingCart';
import OrderManagement from './components/OrderManagement';
import ShopifyOrders from './components/ShopifyOrders';

function App() {
  const [currentPage, setCurrentPage] = useState('shop');
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  const API_URL = 'http://localhost:3001/api';

  // Add product to cart
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Update cart quantity
  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  // Create order from cart
  const createOrder = async (customerName, customerEmail) => {
    try {
      const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: customerName,
          customer_email: customerEmail,
          items: cart.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price
          })),
          total_price: totalPrice
        })
      });

      if (response.ok) {
        const data = await response.json();
        setCart([]);
        fetchOrders();
        setCurrentPage('orders');
        return data;
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/orders`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId, status, notes) => {
    try {
      const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes })
      });

      if (response.ok) {
        fetchOrders();
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  // Delete order
  const deleteOrder = async (orderId) => {
    try {
      const response = await fetch(`${API_URL}/orders/${orderId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchOrders();
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🛍️ Shopify Test OMS</h1>
        <nav className="nav">
          <button
            className={`nav-btn ${currentPage === 'shop' ? 'active' : ''}`}
            onClick={() => setCurrentPage('shop')}
          >
            Shop
          </button>
          <button
            className={`nav-btn ${currentPage === 'cart' ? 'active' : ''}`}
            onClick={() => setCurrentPage('cart')}
          >
            Cart ({cart.length})
          </button>
          <button
            className={`nav-btn ${currentPage === 'orders' ? 'active' : ''}`}
            onClick={() => setCurrentPage('orders')}
          >
            My Orders ({orders.length})
          </button>
          <button
            className={`nav-btn ${currentPage === 'shopify-orders' ? 'active' : ''}`}
            onClick={() => setCurrentPage('shopify-orders')}
          >
            Shopify Orders
          </button>
        </nav>
      </header>

      <main className="app-main">
        {currentPage === 'shop' && (
          <ProductCatalog onAddToCart={addToCart} />
        )}
        {currentPage === 'cart' && (
          <ShoppingCart
            cart={cart}
            onRemoveFromCart={removeFromCart}
            onUpdateQuantity={updateCartQuantity}
            onCreateOrder={createOrder}
          />
        )}
        {currentPage === 'orders' && (
          <OrderManagement
            orders={orders}
            onUpdateStatus={updateOrderStatus}
            onDeleteOrder={deleteOrder}
          />
        )}
        {currentPage === 'shopify-orders' && (
          <ShopifyOrders />
        )}
      </main>
    </div>
  );
}

export default App;
