import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useBasket } from '../context/BasketContext';
import Link from 'next/link';
import Header from '../components/Header';

export default function BasketPage() {
  const router = useRouter();
  const { basket, updateQuantity, removeFromBasket, calculateTotal, getBasketCount } = useBasket();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleShowYachts = () => {
    router.push('/?view=yachts');
  };

  const handleShowJets = () => {
    router.push('/?view=jets');
  };

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          totalAmount: calculateTotal(),
          basket,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Payment failed');
      }

      const data = await response.json();
      
      // Redirect to the payment checkout URL
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error('No checkout URL received');
      }
      
    } catch (err) {
      setError(err.message);
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header 
        basketCount={getBasketCount()}
        onShowYachts={handleShowYachts}
        onShowJets={handleShowJets}
      />
      <div className="basket-section">
        <h2 className="section-title">Your Luxury Selection</h2>
        {basket.length === 0 ? (
          <div className="empty-basket">
            <p>Your basket is empty</p>
            <Link href="/" className="cta-button primary-btn">
              Browse Our Collection
            </Link>
          </div>
        ) : (
          <>
            <div className="basket-items">
              {basket.map((item) => (
                <div key={item.id} className="basket-item">
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-price">{item.price}/{item.type === 'yacht' ? 'day' : 'hour'}</p>
                    {item.type === 'yacht' && (
                      <p>{item.length} • {item.guests} • {item.crew}</p>
                    )}
                    {item.type === 'jet' && (
                      <p>{item.range} • {item.passengers}</p>
                    )}
                  </div>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                    <button 
                      onClick={() => removeFromBasket(item.id)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="basket-summary">
              <div className="total-price">
                Total: €{calculateTotal().toLocaleString()}
              </div>
              {error && <p className="error">{error}</p>}
              <button 
                className="cta-button primary-btn" 
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Proceed to Payment'}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
} 