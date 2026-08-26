import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/couponBanner.css';

const CouponBanner = () => {
    const navigate = useNavigate();

    const handleShopNow = () => {
        navigate('/shop');
    };

    return (
        <section className="coupon-banner">

            {/* Middle - Offer Text */}
            <div className="coupon-content">
                <span className="coupon-label">
                    EXCLUSIVE COUPONS
                </span>

                <h2>
                    Grab the Best <span>Deals!</span>
                </h2>

                <p>
                    Use code at checkout and save more on your favorite shoes.
                </p>
            </div>

            {/* Divider */}
            <div className="coupon-divider"></div>

            {/* Offer */}
            <div className="coupon-offer">

                <h2>
                    GET <span>20%</span> OFF
                </h2>

                <p>ON YOUR FIRST ORDER</p>

                <div className="coupon-code">
                    Use Code:
                    <strong> SHOE20</strong>
                </div>

            </div>

            {/* Button */}
            <button
                className="coupon-shop-btn"
                onClick={handleShopNow}
            >
                Shop Now
                <span>→</span>
            </button>

        </section>
    );
};

export default CouponBanner;