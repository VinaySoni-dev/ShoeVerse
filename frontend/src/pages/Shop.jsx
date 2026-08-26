import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import '../styles/product.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
    try {
        const params = new URLSearchParams();

        if (category !== "All") {
          params.append("category", category);
        }

        if (brand !== "All") {
          params.append("brand", brand);
        }

        const res = await fetch(`/api/products?${params.toString()}`);
        const data = await res.json();

        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category, brand]);

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
    <div className="shop-page">
      <FilterSidebar 
       category={category}
        setCategory={setCategory}
        brand={brand}
        setBrand={setBrand}
        />

      <div className="shop-container">
        <h2>All Products</h2>
        <h4>Explore our premium collection of sport , performance and lifestyle Sneakers.<input 
          type="text" 
          placeholder="Search products..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        /></h4>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Shop;