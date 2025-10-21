import { useState, useEffect } from 'react';
import '../styles/ProductCatalog.css';

export default function ProductCatalog({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:3001/api/shopify/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data.products || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.body_html && product.body_html.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="product-catalog">
        <div className="catalog-header">
          <h2>Product Catalog</h2>
        </div>
        <div className="no-products">
          <p>Loading products from Shopify...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-catalog">
        <div className="catalog-header">
          <h2>Product Catalog</h2>
        </div>
        <div className="no-products" style={{ color: '#dc143c' }}>
          <p>Error loading products: {error}</p>
          <button onClick={fetchProducts} className="add-to-cart-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-catalog">
      <div className="catalog-header">
        <h2>Product Catalog ({products.length} products)</h2>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => {
          const price = product.variants && product.variants[0] ? product.variants[0].price : '0.00';
          const image = product.image ? product.image.src : '📦';

          return (
            <div key={product.id} className="product-card">
              <div className="product-image">
                {image.startsWith('http') ? (
                  <img src={image} alt={product.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                ) : (
                  <div style={{ fontSize: '3rem', textAlign: 'center' }}>📦</div>
                )}
              </div>
              <h3>{product.title}</h3>
              <p className="product-description">
                {product.body_html ? product.body_html.replace(/<[^>]*>/g, '').substring(0, 100) : 'No description'}
              </p>
              <div className="product-footer">
                <span className="product-price">${parseFloat(price).toFixed(2)}</span>
                <button
                  className="add-to-cart-btn"
                  onClick={() => onAddToCart({
                    id: product.id,
                    name: product.title,
                    price: parseFloat(price),
                    image: image
                  })}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-products">
          <p>No products found matching your search.</p>
        </div>
      )}
    </div>
  );
}

