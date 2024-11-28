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

  if (error) return <div className="text-red-500 font-bold text-center">Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Product List</h1>
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-200 px-4 py-2">Product ID</th>
                <th className="border border-gray-200 px-4 py-2">Product Code</th>
                <th className="border border-gray-200 px-4 py-2">Product Name</th>
                <th className="border border-gray-200 px-4 py-2">Total Stock</th>
                <th className="border border-gray-200 px-4 py-2">Variants</th>
                <th className="border border-gray-200 px-4 py-2">Image</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    {product.ProductID}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    {product.ProductCode}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">{product.ProductName}</td>
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    {Math.round(product.TotalStock || 0)}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {product.variants.map((variant) => (
                      <div key={variant.id} className="text-sm">
                        {variant.name}: {variant.subvariants.map((sv) => sv.option).join(', ')}
                      </div>
                    ))}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    {product.ProductImage ? (
                      <img
                        src={product.ProductImage}
                        alt={product.ProductName}
                        className="max-w-[100px] max-h-[100px] mx-auto object-contain"
                      />
                    ) : (
                      <span className="text-gray-500 italic">No Image</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductList;
