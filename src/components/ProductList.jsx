import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products/list/');
        setProducts(response.data.products);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchProducts();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Product List</h1>
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px', width: '10%' }}>Product Id</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', width: '15%' }}>Product Code</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Product Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', width: '10%' }}>Total Stock</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Variants</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', width: '15%' }}>Image</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.ProductID}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.ProductCode}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.ProductName}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {Math.round(product.TotalStock || 0)}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {product.variants.map((variant) => (
                    <div key={variant.id}>
                      {variant.name}: {variant.subvariants.map(sv => sv.option).join(', ')}
                    </div>
                  ))}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                  {product.ProductImage ? (
                    <img 
                      src={product.ProductImage} 
                      alt={product.ProductName} 
                      style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'contain' }} 
                    />
                  ) : (
                    'No Image'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;
