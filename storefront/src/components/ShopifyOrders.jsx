import { useState, useEffect } from 'react';
import '../styles/OrderManagement.css';

const STATUS_COLORS = {
  pending: '#ffc107',
  processing: '#2196f3',
  shipped: '#4caf50',
  delivered: '#8bc34a',
  cancelled: '#f44336',
  any: '#9c27b0',
};

export default function ShopifyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState('any');

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `http://localhost:3001/api/shopify/orders?status=${statusFilter}&limit=50`
      );
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    return STATUS_COLORS[status] || '#999';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  if (loading) {
    return (
      <div className="order-management">
        <h2>Shopify Orders</h2>
        <div className="no-orders">
          <p>Loading orders from Shopify...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-management">
        <h2>Shopify Orders</h2>
        <div className="no-orders" style={{ color: '#dc143c' }}>
          <p>Error loading orders: {error}</p>
          <button onClick={fetchOrders} className="add-to-cart-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-management">
      <h2>Shopify Orders</h2>
      <div className="order-count">
        Showing {orders.length} orders
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ marginRight: '1rem', fontWeight: '600' }}>Filter by Status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            border: '1px solid #ddd',
            fontSize: '0.9rem',
            cursor: 'pointer',
          }}
        >
          <option value="any">All Orders</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {orders.length === 0 ? (
        <div className="no-orders">
          <h2>No Orders Found</h2>
          <p>There are no orders with the selected status.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div
                className="order-header"
                onClick={() =>
                  setExpandedOrder(expandedOrder === order.id ? null : order.id)
                }
              >
                <div className="order-info">
                  <h3>Order #{order.order_number}</h3>
                  <div className="customer-info">
                    {order.customer ? (
                      <>
                        <strong>{order.customer.first_name} {order.customer.last_name}</strong>
                        <br />
                        {order.customer.email}
                      </>
                    ) : (
                      <span>Guest Order</span>
                    )}
                  </div>
                </div>
                <div className="order-meta">
                  <span
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(order.financial_status) }}
                  >
                    {order.financial_status}
                  </span>
                  <span
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(order.fulfillment_status || 'pending') }}
                  >
                    {order.fulfillment_status || 'pending'}
                  </span>
                  <div className="order-total">${formatPrice(order.total_price)}</div>
                  <span className="expand-icon">
                    {expandedOrder === order.id ? '▼' : '▶'}
                  </span>
                </div>
              </div>

              {expandedOrder === order.id && (
                <div className="order-details">
                  <div className="order-items">
                    <h4>Order Items</h4>
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.line_items && order.line_items.map((item) => (
                          <tr key={item.id}>
                            <td>{item.title}</td>
                            <td>{item.quantity}</td>
                            <td>${formatPrice(item.price)}</td>
                            <td>${formatPrice(parseFloat(item.price) * item.quantity)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="order-status-section">
                    <h4>Order Information</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <strong>Order Date:</strong>
                        <p>{formatDate(order.created_at)}</p>
                      </div>
                      <div>
                        <strong>Financial Status:</strong>
                        <p style={{ color: getStatusColor(order.financial_status) }}>
                          {order.financial_status}
                        </p>
                      </div>
                      <div>
                        <strong>Fulfillment Status:</strong>
                        <p style={{ color: getStatusColor(order.fulfillment_status || 'pending') }}>
                          {order.fulfillment_status || 'pending'}
                        </p>
                      </div>
                      <div>
                        <strong>Total:</strong>
                        <p>${formatPrice(order.total_price)}</p>
                      </div>
                    </div>
                  </div>

                  {order.shipping_address && (
                    <div className="order-status-section">
                      <h4>Shipping Address</h4>
                      <div>
                        <p>
                          {order.shipping_address.address1}
                          {order.shipping_address.address2 && `, ${order.shipping_address.address2}`}
                        </p>
                        <p>
                          {order.shipping_address.city}, {order.shipping_address.province}{' '}
                          {order.shipping_address.zip}
                        </p>
                        <p>{order.shipping_address.country}</p>
                      </div>
                    </div>
                  )}

                  <div className="order-footer">
                    <span className="order-date">
                      Created: {formatDate(order.created_at)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

