const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');
const { getProducts, getOrders, getOrder, getShopInfo } = require('./shopify-rest');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Helper function to run database queries
const dbRun = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
};

const dbGet = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const dbAll = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Create a new order
app.post('/api/orders', async (req, res) => {
  try {
    const { customer_name, customer_email, items, total_price } = req.body;
    const orderId = uuidv4();
    const orderNumber = Date.now();

    await dbRun(
      `INSERT INTO orders (id, order_number, customer_name, customer_email, total_price)
       VALUES (?, ?, ?, ?, ?)`,
      [orderId, orderNumber, customer_name, customer_email, total_price]
    );

    // Insert order items
    for (const item of items) {
      const itemId = uuidv4();
      await dbRun(
        `INSERT INTO order_items (id, order_id, product_name, product_id, quantity, price)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [itemId, orderId, item.name, item.id, item.quantity, item.price]
      );
    }

    // Add initial status history
    const historyId = uuidv4();
    await dbRun(
      `INSERT INTO order_status_history (id, order_id, status, notes)
       VALUES (?, ?, ?, ?)`,
      [historyId, orderId, 'pending', 'Order created']
    );

    res.status(201).json({ id: orderId, order_number: orderNumber });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get all orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await dbAll(`SELECT * FROM orders ORDER BY created_at DESC`);
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get order by ID
app.get('/api/orders/:id', async (req, res) => {
  try {
    const order = await dbGet(`SELECT * FROM orders WHERE id = ?`, [req.params.id]);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    const items = await dbAll(`SELECT * FROM order_items WHERE order_id = ?`, [req.params.id]);
    const history = await dbAll(`SELECT * FROM order_status_history WHERE order_id = ? ORDER BY timestamp DESC`, [req.params.id]);

    res.json({ ...order, items, history });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// Update order status
app.patch('/api/orders/:id/status', async (req, res) => {
  try {
    const { status, notes } = req.body;
    const historyId = uuidv4();

    await dbRun(`UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, [status, req.params.id]);
    await dbRun(
      `INSERT INTO order_status_history (id, order_id, status, notes) VALUES (?, ?, ?, ?)`,
      [historyId, req.params.id, status, notes || '']
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// Delete order
app.delete('/api/orders/:id', async (req, res) => {
  try {
    await dbRun(`DELETE FROM order_items WHERE order_id = ?`, [req.params.id]);
    await dbRun(`DELETE FROM order_status_history WHERE order_id = ?`, [req.params.id]);
    await dbRun(`DELETE FROM orders WHERE id = ?`, [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

// Shopify REST API Integration Endpoints

// Get shop info
app.get('/api/shopify/shop', async (req, res) => {
  try {
    const shop = await getShopInfo();
    res.json(shop);
  } catch (error) {
    console.error('Error fetching shop info:', error);
    res.status(500).json({ error: 'Failed to fetch shop info', details: error.message });
  }
});

// Get all Shopify products
app.get('/api/shopify/products', async (req, res) => {
  try {
    const limit = req.query.limit || 50;
    const products = await getProducts(limit);
    res.json({ products, count: products.length });
  } catch (error) {
    console.error('Error fetching Shopify products:', error);
    res.status(500).json({ error: 'Failed to fetch Shopify products', details: error.message });
  }
});

// Get all Shopify orders
app.get('/api/shopify/orders', async (req, res) => {
  try {
    const limit = req.query.limit || 50;
    const status = req.query.status || 'any';
    const orders = await getOrders(limit, status);
    res.json({ orders, count: orders.length });
  } catch (error) {
    console.error('Error fetching Shopify orders:', error);
    res.status(500).json({ error: 'Failed to fetch Shopify orders', details: error.message });
  }
});

// Get specific Shopify order
app.get('/api/shopify/orders/:id', async (req, res) => {
  try {
    const order = await getOrder(req.params.id);
    res.json(order);
  } catch (error) {
    console.error('Error fetching Shopify order:', error);
    res.status(500).json({ error: 'Failed to fetch Shopify order', details: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Order Management API is running' });
});

app.listen(PORT, () => {
  console.log(`Order Management API running on http://localhost:${PORT}`);
  console.log(`Shopify integration available at http://localhost:${PORT}/api/shopify`);
});

