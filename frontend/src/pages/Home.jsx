import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import {
  Trophy,
  RefreshCcw,
  Truck,
  LockKeyhole
} from 'lucide-react';
import '../styles/product.css';
import CouponBanner from '../components/CouponBanner.jsx';


const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data.slice(0, 4)); // Featured products
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      <CouponBanner />
      <div className="hero-banner">
        <h1>Welcome to ShoeVerse</h1>
        <p> Discover the perfect pair for every step. Explore our latest collection of stylish, comfortable, and high-quality shoes designed for every lifestyle and occasion.</p>
      </div>
      <div className="featured-header">
    <h2>Featured Products</h2>

    <button
        className="view-more-btn"
        onClick={() => navigate('/shop')}
    >
        View More →
    </button>
</div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}


    <div className="shoe-policy">
      <div className="policy-details">
           <div className="policy-icon">
            <Trophy />
             </div>
      <h3>Permium Quality</h3>
      <p>Top quality materials for maximum comfort.</p>
      </div>
      <div className="policy-details">
        <div className="policy-icon">
          <RefreshCcw />
          </div>
      <h3>30 Days Returns</h3>
      <p>Easy returns & exchanges within 30 Days.</p>
      </div>
      <div className="policy-details">
         <div className="policy-icon">
          <Truck />
          </div>
      <h3>Fast Delivery</h3>
      <p>Express delivery across india in 2-4 Days.</p>
      </div>
      <div className="policy-details">
        <div className="policy-icon">
          <LockKeyhole />
           </div>
      <h3>Secure Payments</h3>
      <p>100% secure payments with multiple option.</p>
      </div>
    
    </div>
    </div>
  );
};

export default Home;