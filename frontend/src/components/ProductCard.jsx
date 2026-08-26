import React from "react";
import { Link } from "react-router-dom";
import "../styles/product.css";

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
                <div className="product-image-container"><img src={product.imageUrl} alt={product.name} className="product-image" />   {product.category === "Sale" && (
    <span className="sale-badge">SALE</span>
  )}</div>
                <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">₹{product.price.toFixed(2)}</p>
                    <Link to={"/products/" + product._id} className="product-link">
                        View Details
                    </Link>
                </div>
                
        </div>
    );
};



export default ProductCard;