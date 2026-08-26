import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { clearCart } from '../redux/cartSlice';
import '../styles/cart.css';

const Checkout = () => {
    const { user } = useContext(AuthContext);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [address, setAddress] = useState({
        fullName: '',
        street: '',
        city: '',
        postalCode: '',
        country: ''
    });

    // Coupon states
    const [couponCode, setCouponCode] = useState('');
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [couponMessage, setCouponMessage] = useState('');
    const [couponApplied, setCouponApplied] = useState(false);
    const [couponLoading, setCouponLoading] = useState(false);

    // Calculate cart total
    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    );

    // Calculate final price after coupon
    const discountedPrice = totalPrice - couponDiscount;
    const gstAmount = discountedPrice * 0.18;
    const finalPrice = discountedPrice + gstAmount;

    // Apply Coupon
    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) {
            setCouponMessage('Please enter a coupon code');
            return;
        }

        if (!user) {
            alert('Please login first');
            navigate('/login');
            return;
        }

        try {
            setCouponLoading(true);
            setCouponMessage('');

            const response = await fetch('/api/coupons/apply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    code: couponCode.trim(),
                    cartTotal: totalPrice
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setCouponMessage(data.message || 'Invalid coupon');
                setCouponDiscount(0);
                setCouponApplied(false);
                return;
            }

            setCouponDiscount(data.discount);
            setCouponApplied(true);

            setCouponMessage(
                `Coupon applied! You saved ₹${data.discount.toFixed(2)}`
            );

        } catch (error) {
            console.error('Coupon error:', error);

            setCouponMessage(
                'Something went wrong while applying coupon'
            );

            setCouponDiscount(0);
            setCouponApplied(false);

        } finally {
            setCouponLoading(false);
        }
    };

    // Razorpay Payment
    const handlePayment = async () => {
        try {
            const orderRes = await fetch('/api/payments/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    amount: finalPrice
                })
            });

            const orderData = await orderRes.json();

            if (!orderRes.ok) {
                const fallback = window.confirm(
                    'Razorpay Keys unconfigured on backend. Use Student Bypass Mode to Place test order?'
                );

                if (fallback) {
                    return bypassPayment();
                } else {
                    return alert('Payment failed to initialize');
                }
            }

            const option = {
                key: 'rzp_test_dummykey123',
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'ShoeVerse',
                description: 'Test Transaction',
                order_id: orderData.id,

                handler: async function (response) {
                    try {
                        const verifyRes = await fetch(
                            '/api/payments/verify',
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(response)
                            }
                        );

                        if (verifyRes.ok) {

                            const saveOrderRes = await fetch(
                                '/api/orders',
                                {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: `Bearer ${user.token}`
                                    },
                                    body: JSON.stringify({
                                        items: cartItems,
                                        totalAmount: finalPrice,
                                        address,
                                        paymentId:
                                            response.razorpay_payment_id,
                                        couponCode: couponApplied
                                            ? couponCode.toUpperCase()
                                            : null,
                                        couponDiscount: couponDiscount
                                    })
                                }
                            );

                            if (saveOrderRes.ok) {
                                dispatch(clearCart());
                                navigate('/ordersuccess');
                            } else {
                                alert('Order saving failed');
                            }

                        } else {
                            alert('Payment verification failed');
                        }

                    } catch (error) {
                        console.error(
                            'Order/payment verification error:',
                            error
                        );
                        alert('Something went wrong while saving the order');
                    }
                },

                prefill: {
                    name: address.fullName,
                    email: user?.email,
                    contact: '9999999999'
                },

                theme: {
                    color: '#f97316'
                }
            };

            const rzpl = new window.Razorpay(option);
            rzpl.open();

        } catch (error) {
            console.error('Payment error:', error);
            alert('Something went wrong while processing payment');
        }
    };

    // Demo / Bypass Payment
    const bypassPayment = async () => {
        try {
            const savedOrderRes = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    items: cartItems,
                    totalAmount: finalPrice,
                    address,
                    paymentId: 'DEMO_TXN_' + Date.now(),
                    paymentMethod: 'Demo Payment',
                    paymentStatus: 'Paid',
                    couponCode: couponApplied
                        ? couponCode.toUpperCase()
                        : null,
                    couponDiscount: couponDiscount
                })
            });

            if (savedOrderRes.ok) {
                alert('Payment Successful!');

                dispatch(clearCart());
                navigate('/ordersuccess');
            } else {
                const error = await savedOrderRes.text();

                console.log(error);
                alert('Failed to save order.');
            }

        } catch (error) {
            console.error(error);
            alert('Something went wrong.');
        }
    };

    // Form Submit
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user) {
            alert('Please login first');
            navigate('/login');
            return;
        }

        bypassPayment();
    };

    return (
        <div className="checkout-container">

            <h2>Checkout</h2>

            <div className="checkout-content">

                <form
                    onSubmit={handleSubmit}
                    className="shipping-form"
                >

                    <h3 style={{ color: '#10b981' }}>
                        Shipping Address
                    </h3>

                    <input
                        type="text"
                        placeholder="Full Name"
                        required
                        value={address.fullName}
                        onChange={(e) =>
                            setAddress({
                                ...address,
                                fullName: e.target.value
                            })
                        }
                    />

                    <input
                        type="text"
                        placeholder="Street"
                        required
                        value={address.street}
                        onChange={(e) =>
                            setAddress({
                                ...address,
                                street: e.target.value
                            })
                        }
                    />

                    <input
                        type="text"
                        placeholder="City"
                        required
                        value={address.city}
                        onChange={(e) =>
                            setAddress({
                                ...address,
                                city: e.target.value
                            })
                        }
                    />

                    <input
                        type="text"
                        placeholder="Postal Code"
                        required
                        value={address.postalCode}
                        onChange={(e) =>
                            setAddress({
                                ...address,
                                postalCode: e.target.value
                            })
                        }
                    />

                    <input
                        type="text"
                        placeholder="Country"
                        required
                        value={address.country}
                        onChange={(e) =>
                            setAddress({
                                ...address,
                                country: e.target.value
                            })
                        }
                    />
                    
                    {/* Checkout Summary */}
                    <div className="checkout-summary">

                        {/* Coupon Section */}
                        <div className="coupon-section">

                            <h4>Have a Coupon?</h4>

                            <div className="coupon-input-row">

                                <input
                                    type="text"
                                    placeholder="Enter coupon code"
                                    value={couponCode}
                                    onChange={(e) =>
                                        setCouponCode(e.target.value)
                                    }
                                    
                                />

                                <button
                                    type="button"
                                    className="btn coupon-btn"
                                    onClick={handleApplyCoupon}
                                    disabled={
                                        couponLoading
                                    }
                                >
                                    {couponLoading
                                        ? 'Applying...'
                                        : couponApplied
                                        ? 'Applied'
                                        : 'Apply'}
                                </button>

                            </div>

                            {couponMessage && (
                                <p
                                    className={
                                        couponApplied
                                            ? 'coupon-success'
                                            : 'coupon-error'
                                    }
                                >
                                    {couponMessage}
                                </p>
                            )}

                        </div>

                        {/* Price Summary */}
                        <div className="price-summary">

                            <p>
                                Subtotal:
                                <span>
                                    ₹{totalPrice.toFixed(2)}
                                </span>
                            </p>

                            {couponDiscount > 0 && (
                                <p className="discount-row">
                                    Coupon Discount:
                                    <span>
                                        -₹{couponDiscount.toFixed(2)}
                                    </span>
                                </p>
                            )}

                            <p>
                                GST 18%:
                                <span>
                                    ₹{gstAmount.toFixed(2)}
                                </span>
                            </p>

                            <h4>
                                Total to pay:
                                <span>
                                    ₹{finalPrice.toFixed(2)}
                                </span>
                            </h4>

                        </div>

                        <button
                            type="submit"
                            className="btn"
                        >
                            Pay Now
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default Checkout;