require('dotenv').config();

const API_KEY = process.env.SHOPIFY_API_KEY;
const API_PASSWORD = process.env.SHOPIFY_API_PASSWORD;
const STORE_NAME = process.env.SHOPIFY_STORE_NAME;
const API_VERSION = process.env.SHOPIFY_API_VERSION || '2025-10';

const BASE_URL = `https://${STORE_NAME}.myshopify.com/admin/api/${API_VERSION}`;

// Helper function to make Shopify REST API calls
async function shopifyRestRequest(endpoint, options = {}) {
  if (!API_KEY || !API_PASSWORD || !STORE_NAME) {
    throw new Error('Shopify credentials not configured. Please set SHOPIFY_API_KEY, SHOPIFY_API_PASSWORD, and SHOPIFY_STORE_NAME in .env');
  }

  const url = `${BASE_URL}${endpoint}`;

  // Create Basic Auth header
  const credentials = Buffer.from(`${API_KEY}:${API_PASSWORD}`).toString('base64');

  const defaultOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${credentials}`,
    },
  };

  const finalOptions = { ...defaultOptions, ...options };

  try {
    const response = await fetch(url, finalOptions);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Shopify API Error (${response.status}): ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Shopify REST API Error:', error);
    throw error;
  }
}

// Get all products
async function getProducts(limit = 50) {
  try {
    const data = await shopifyRestRequest(`/products.json?limit=${limit}`);
    return data.products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

// Get specific product
async function getProduct(productId) {
  try {
    const data = await shopifyRestRequest(`/products/${productId}.json`);
    return data.product;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

// Get all orders
async function getOrders(limit = 50, status = 'any') {
  try {
    const data = await shopifyRestRequest(`/orders.json?limit=${limit}&status=${status}`);
    return data.orders || [];
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}

// Get specific order
async function getOrder(orderId) {
  try {
    const data = await shopifyRestRequest(`/orders/${orderId}.json`);
    return data.order;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
}

// Get order by order number
async function getOrderByNumber(orderNumber) {
  try {
    const orders = await getOrders(250, 'any');
    return orders.find(order => order.order_number === parseInt(orderNumber));
  } catch (error) {
    console.error('Error fetching order by number:', error);
    throw error;
  }
}

// Create order
async function createOrder(orderData) {
  try {
    const data = await shopifyRestRequest('/orders.json', {
      method: 'POST',
      body: JSON.stringify({ order: orderData }),
    });
    return data.order;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

// Update order
async function updateOrder(orderId, orderData) {
  try {
    const data = await shopifyRestRequest(`/orders/${orderId}.json`, {
      method: 'PUT',
      body: JSON.stringify({ order: orderData }),
    });
    return data.order;
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
}

// Get fulfillments for an order
async function getOrderFulfillments(orderId) {
  try {
    const data = await shopifyRestRequest(`/orders/${orderId}/fulfillments.json`);
    return data.fulfillments || [];
  } catch (error) {
    console.error('Error fetching fulfillments:', error);
    throw error;
  }
}

// Create fulfillment
async function createFulfillment(orderId, fulfillmentData) {
  try {
    const data = await shopifyRestRequest(`/orders/${orderId}/fulfillments.json`, {
      method: 'POST',
      body: JSON.stringify({ fulfillment: fulfillmentData }),
    });
    return data.fulfillment;
  } catch (error) {
    console.error('Error creating fulfillment:', error);
    throw error;
  }
}

// Get shop info
async function getShopInfo() {
  try {
    const data = await shopifyRestRequest('/shop.json');
    return data.shop;
  } catch (error) {
    console.error('Error fetching shop info:', error);
    throw error;
  }
}

module.exports = {
  shopifyRestRequest,
  getProducts,
  getProduct,
  getOrders,
  getOrder,
  getOrderByNumber,
  createOrder,
  updateOrder,
  getOrderFulfillments,
  createFulfillment,
  getShopInfo,
  BASE_URL,
};

