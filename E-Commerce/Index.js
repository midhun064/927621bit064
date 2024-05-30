import React, { useState } from 'react';
import './Index.css';

function Index() {
  const [company, setCompany] = useState('AMZ');
  const [category, setCategory] = useState('Laptop');
  const [top, setTop] = useState(10);
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTopProducts = async () => {
    setLoading(true);
    setError(null);

    const url = `http://20.244.56.144/test/companies/${company}/categories/${category}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Index">
      <h1>E-Commerce Product Viewer</h1>
      <div className="form-group">
        <label htmlFor="company">Company:</label>
        <select id="company" value={company} onChange={(e) => setCompany(e.target.value)}>
          <option value="AMZ">AMZ</option>
          <option value="FLP">FLP</option>
          <option value="SNP">SNP</option>
          <option value="MYN">MYN</option>
          <option value="AZO">AZO</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Phone">Phone</option>
          <option value="Computer">Computer</option>
          <option value="TV">TV</option>
          <option value="Earphone">Earphone</option>
          <option value="Tablet">Tablet</option>
          <option value="Charger">Charger</option>
          <option value="House">House</option>
          <option value="Keypad">Keypad</option>
          <option value="Bluetooth">Bluetooth</option>
          <option value="Pendrive">Pendrive</option>
          <option value="Remote">Remote</option>
          <option value="Speaker">Speaker</option>
          <option value="Headset">Headset</option>
          <option value="Laptop">Laptop</option>
          <option value="PC">PC</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="top">Top:</label>
        <input type="number" id="top" value={top} onChange={(e) => setTop(parseInt(e.target.value))} />
      </div>
      <div className="form-group">
        <label htmlFor="minPrice">Min Price:</label>
        <input type="number" id="minPrice" value={minPrice} onChange={(e) => setMinPrice(parseInt(e.target.value))} />
      </div>
      <div className="form-group">
        <label htmlFor="maxPrice">Max Price:</label>
        <input type="number" id="maxPrice" value={maxPrice} onChange={(e) => setMaxPrice(parseInt(e.target.value))} />
      </div>
      <button onClick={fetchTopProducts}>Fetch Top Products</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="products">
        {products.map((product, index) => (
          <div key={index} className="product">
            <h3>{product.productName}</h3>
            <p>Price: {product.price}</p>
            <p>Rating: {product.rating}</p>
            <p>Discount: {product.discount}</p>
            <p>Availability: {product.availability}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Index;
