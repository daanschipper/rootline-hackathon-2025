import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import { useBasket } from '../context/BasketContext';

export default function Basket() {
  const { basket, updateQuantity, removeFromBasket, calculateTotal, getBasketCount } = useBasket();
  const router = useRouter();

  const handleShowYachts = () => {
    router.push('/?view=yachts');
  };

  const handleShowJets = () => {
    router.push('/?view=jets');
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
              <button className="cta-button primary-btn">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
} 