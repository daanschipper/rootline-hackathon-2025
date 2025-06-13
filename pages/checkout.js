// pages/checkout.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useBasket } from '../context/BasketContext';

export default function Checkout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { basket } = useBasket();

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    const totalAmount = basket.reduce((total, item) => {
      return total + parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
    }, 0);

    try {
      // Call your API route instead of the external API directly
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          totalAmount,
          basket,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Payment failed');
      }

      const data = await response.json();
      
      // Check if amount was limited for staging
      if (data.wasLimited) {
        console.log(`Note: Amount was limited to €${data.processedAmount} for staging environment`);
      }
      
      // If the payment API returns a checkout URL, redirect to it
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        // Otherwise, handle success
        console.log('Payment successful:', data);
        router.push('/success');
      }
      
    } catch (err) {
      setError(err.message);
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return basket.reduce((total, item) => {
      return total + parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
    }, 0);
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      
      <div className="basket-summary">
        <h2>Order Summary</h2>
        {basket.length === 0 ? (
          <p>Your basket is empty</p>
        ) : (
          <>
            {basket.map((item, index) => (
              <div key={index} className="basket-item">
                <span>{item.name}</span>
                <span>{item.price}</span>
              </div>
            ))}
            <div className="total">
              <strong>Total: €{calculateTotal().toFixed(2)}</strong>
            </div>
          </>
        )}
      </div>

      {error && <p className="error">{error}</p>}
      
      <button 
        onClick={handlePayment} 
        disabled={loading || basket.length === 0}
        className="pay-button"
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>

      <style jsx>{`
        .checkout-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 2rem;
        }

        .basket-summary {
          background: #f5f5f5;
          padding: 1.5rem;
          border-radius: 8px;
          margin-bottom: 2rem;
        }

        .basket-item {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid #ddd;
        }

        .total {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 2px solid #333;
          text-align: right;
        }

        .error {
          color: red;
          padding: 1rem;
          background: #ffebee;
          border-radius: 4px;
          margin-bottom: 1rem;
        }

        .pay-button {
          width: 100%;
          padding: 1rem;
          font-size: 1.2rem;
          background: #000;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: opacity 0.3s;
        }

        .pay-button:hover:not(:disabled) {
          opacity: 0.8;
        }

        .pay-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}