import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const CreateCoupon = () => {
    const { user } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        code: '',
        discountType: 'percentage',
        discountValue: '',
        minOrderAmount: '',
        maxDiscount: '',
        expiryDate: '',
        usageLimit: ''
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage('');
        setError('');
        setLoading(true);

        try {
            const response = await fetch('/api/coupons', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    code: formData.code,
                    discountType: formData.discountType,
                    discountValue: Number(formData.discountValue),
                    minOrderAmount: Number(formData.minOrderAmount) || 0,
                    maxDiscount:
                        formData.maxDiscount === ''
                            ? null
                            : Number(formData.maxDiscount),
                    expiryDate: formData.expiryDate,
                    usageLimit:
                        formData.usageLimit === ''
                            ? null
                            : Number(formData.usageLimit)
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Failed to create coupon');
                return;
            }

            setMessage('Coupon created successfully!');

            setFormData({
                code: '',
                discountType: 'percentage',
                discountValue: '',
                minOrderAmount: '',
                maxDiscount: '',
                expiryDate: '',
                usageLimit: ''
            });

        } catch (error) {
            console.error(error);
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    // Inline styles
    const containerStyle = {
        maxWidth: '650px',
        margin: '40px auto',
        padding: '30px',
        backgroundColor: '#18181b',
        border: '1px solid #27272a',
        borderRadius: '14px',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
        color: '#fff'
    };

    const headingStyle = {
        textAlign: 'center',
        color: '#f97316',
        marginBottom: '25px',
        fontSize: '28px',
        fontWeight: '700'
    };

    const messageStyle = {
        padding: '12px 15px',
        marginBottom: '20px',
        borderRadius: '8px',
        backgroundColor: 'rgba(16, 185, 129, 0.12)',
        border: '1px solid #10b981',
        color: '#10b981',
        fontWeight: '600'
    };

    const errorStyle = {
        padding: '12px 15px',
        marginBottom: '20px',
        borderRadius: '8px',
        backgroundColor: 'rgba(239, 68, 68, 0.12)',
        border: '1px solid #ef4444',
        color: '#ef4444',
        fontWeight: '600'
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '18px'
    };

    const formGroupStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '7px'
    };

    const labelStyle = {
        color: '#d4d4d8',
        fontSize: '14px',
        fontWeight: '600'
    };

    const inputStyle = {
        width: '100%',
        boxSizing: 'border-box',
        padding: '12px 14px',
        backgroundColor: '#27272a',
        color: '#fff',
        border: '1px solid #3f3f46',
        borderRadius: '8px',
        fontSize: '15px',
        outline: 'none'
    };

    const buttonStyle = {
        width: '100%',
        padding: '13px',
        marginTop: '8px',
        backgroundColor: loading ? '#9a3412' : '#f97316',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '700',
        cursor: loading ? 'not-allowed' : 'pointer',
        transition: '0.2s'
    };

    return (
        <div style={containerStyle}>

            <h2 style={headingStyle}>
                Create Coupon
            </h2>

            {message && (
                <p style={messageStyle}>
                    {message}
                </p>
            )}

            {error && (
                <p style={errorStyle}>
                    {error}
                </p>
            )}

            <form onSubmit={handleSubmit} style={formStyle}>

                {/* Coupon Code */}
                <div style={formGroupStyle}>
                    <label style={labelStyle}>
                        Coupon Code
                    </label>

                    <input
                        style={inputStyle}
                        type="text"
                        name="code"
                        placeholder="e.g. SHOE20"
                        value={formData.code}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Discount Type */}
                <div style={formGroupStyle}>
                    <label style={labelStyle}>
                        Discount Type
                    </label>

                    <select
                        style={inputStyle}
                        name="discountType"
                        value={formData.discountType}
                        onChange={handleChange}
                    >
                        <option value="percentage">
                            Percentage
                        </option>

                        <option value="fixed">
                            Fixed Amount
                        </option>
                    </select>
                </div>

                {/* Discount Value */}
                <div style={formGroupStyle}>
                    <label style={labelStyle}>
                        Discount Value
                    </label>

                    <input
                        style={inputStyle}
                        type="number"
                        name="discountValue"
                        placeholder="e.g. 20"
                        value={formData.discountValue}
                        onChange={handleChange}
                        min="0"
                        required
                    />
                </div>

                {/* Minimum Order */}
                <div style={formGroupStyle}>
                    <label style={labelStyle}>
                        Minimum Order Amount
                    </label>

                    <input
                        style={inputStyle}
                        type="number"
                        name="minOrderAmount"
                        placeholder="e.g. 1000"
                        value={formData.minOrderAmount}
                        onChange={handleChange}
                        min="0"
                    />
                </div>

                {/* Maximum Discount */}
                <div style={formGroupStyle}>
                    <label style={labelStyle}>
                        Maximum Discount
                    </label>

                    <input
                        style={inputStyle}
                        type="number"
                        name="maxDiscount"
                        placeholder="e.g. 500"
                        value={formData.maxDiscount}
                        onChange={handleChange}
                        min="0"
                    />
                </div>

                {/* Expiry Date */}
                <div style={formGroupStyle}>
                    <label style={labelStyle}>
                        Expiry Date
                    </label>

                    <input
                        style={inputStyle}
                        type="date"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Usage Limit */}
                <div style={formGroupStyle}>
                    <label style={labelStyle}>
                        Usage Limit
                    </label>

                    <input
                        style={inputStyle}
                        type="number"
                        name="usageLimit"
                        placeholder="e.g. 100"
                        value={formData.usageLimit}
                        onChange={handleChange}
                        min="1"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    style={buttonStyle}
                >
                    {loading
                        ? 'Creating...'
                        : 'Create Coupon'}
                </button>

            </form>
        </div>
    );
};

export default CreateCoupon;