import { useState } from 'react';
import '../styles/OrderManagement.css';

const STATUS_OPTIONS = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
const STATUS_COLORS = {
  pending: '#ffa500',
  processing: '#4169e1',
  shipped: '#9370db',
  delivered: '#32cd32',
  cancelled: '#dc143c'
};

export default function OrderManagement({ orders, onUpdateStatus, onDeleteOrder }) {
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [statusNotes, setStatusNotes] = useState({});

  const handleStatusChange = (orderId, newStatus) => {
    const notes = statusNotes[orderId] || '';
    onUpdateStatus(orderId, newStatus, notes);
    setStatusNotes({ ...statusNotes, [orderId]: '' });
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  if (orders.length === 0) {
    return (
      <div className="order-management">
        <div className="no-orders">
          <h2>No Orders Yet</h2>
          <p>Start shopping to create your first order!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-management">
      <h2>Order Management</h2>
      <p className="order-count">Total Orders: {orders.length}</p>

      <div className="orders-list">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header" onClick={() => toggleOrderDetails(order.id)}>
              <div className="order-info">
                <h3>Order #{order.order_number}</h3>
                <p className="customer-info">
                  {order.customer_name} • {order.customer_email}
                </p>
              </div>
              <div className="order-meta">
                <span
                  className="status-badge"
                  style={{ backgroundColor: STATUS_COLORS[order.status] }}
                >
                  {order.status.toUpperCase()}
                </span>
                <span className="order-total">${order.total_price.toFixed(2)}</span>
                <span className="expand-icon">
                  {expandedOrderId === order.id ? '▼' : '▶'}
                </span>
              </div>
            </div>

            {expandedOrderId === order.id && (
              <div className="order-details">
                <div className="order-items">
                  <h4>Items</h4>
                  {order.items && order.items.length > 0 ? (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Qty</th>
                          <th>Price</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map(item => (
                          <tr key={item.id}>
                            <td>{item.product_name}</td>
                            <td>{item.quantity}</td>
                            <td>${item.price.toFixed(2)}</td>
                            <td>${(item.quantity * item.price).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No items in this order</p>
                  )}
                </div>

                <div className="order-status-section">
                  <h4>Update Status</h4>
                  <div className="status-controls">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="status-select"
                    >
                      {STATUS_OPTIONS.map(status => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <textarea
                    placeholder="Add notes about this status change..."
                    value={statusNotes[order.id] || ''}
                    onChange={(e) => setStatusNotes({ ...statusNotes, [order.id]: e.target.value })}
                    className="status-notes"
                  />
                </div>

                {order.history && order.history.length > 0 && (
                  <div className="order-history">
                    <h4>Status History</h4>
                    <div className="history-timeline">
                      {order.history.map(entry => (
                        <div key={entry.id} className="history-entry">
                          <span
                            className="history-status"
                            style={{ backgroundColor: STATUS_COLORS[entry.status] }}
                          >
                            {entry.status}
                          </span>
                          <div className="history-details">
                            <p className="history-timestamp">
                              {new Date(entry.timestamp).toLocaleString()}
                            </p>
                            {entry.notes && <p className="history-notes">{entry.notes}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="order-footer">
                  <p className="order-date">
                    Created: {new Date(order.created_at).toLocaleString()}
                  </p>
                  <button
                    onClick={() => onDeleteOrder(order.id)}
                    className="delete-btn"
                  >
                    Delete Order
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

