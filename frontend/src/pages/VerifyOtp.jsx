import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/auth.css';

const VerifyOtp = () => {

  const [otp, setOtp] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const email = location.state?.email;


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          otp
        })
      });

      const data = await res.json();

      if (res.ok) {

        alert("Email verified successfully!");

        login(data);

        navigate('/');

      } else {

        alert(data.message);

      }

    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="auth-container">

      <form onSubmit={handleSubmit} className="auth-form">

        <h2>Verify OTP</h2>

        <p>
          Enter the OTP sent to your email
        </p>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <button type="submit" className="btn">
          Verify
        </button>

      </form>

    </div>
  );
};


export default VerifyOtp;