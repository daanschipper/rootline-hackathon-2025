import React from 'react';
import { useRouter } from 'next/router';
import { useBasket } from '../context/BasketContext';

export default function ServicesSection({ services, selectedServices, onToggleService, onBack, totalPrice }) {
  const router = useRouter();
  const { getBasketTotal } = useBasket();

  const handleCheckout = async () => {
    const totalAmount = getBasketTotal();

    try {
      const response = await fetch('https://payment-api.staging.rootline.com/v1/payments', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
          'rootline-version': '2024-04-23',
        },
        body: JSON.stringify({
          account_id: '[platform-account-id]',
          reference: 'your-reference',
          amount: {
            currency: 'EUR',
            quantity: totalAmount.toFixed(2),
          },
          return_url: 'https://rootline.com/[PAYMENT_ID]',
          splits: [
            {
              account_id: '[hotel-account-id]',
              amount: {
                currency: 'EUR',
                quantity: totalAmount.toFixed(2),
              },
              reference: 'your-reference',
              fees: [
                {
                  flat_rate: {
                    amount: {
                      quantity: '0.50',
                      currency: 'EUR',
                    },
                  },
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('Payment failed');
      }

      const data = await response.json();
      // Handle successful payment
      console.log('Payment successful:', data);
      router.push('/success');
    } catch (err) {
      console.error('Payment error:', err);
    }
  };

  return (
    <section className="services-section">
      <div className="selected-item">
        {selectedItem && (
          <>
            <h3>{selectedItem.name}</h3>
            <div>{selectedItem.details}</div>
          </>
        )}
      </div>
      <h2 className="section-title">Bespoke Services</h2>
      <div className="services-grid">
        {services.map(service => (
          <div
            className={`service-card${selectedServices.has(service.id) ? ' selected' : ''}`}
            key={service.id}
            onClick={() => onToggleService(service.id)}
          >
            <div className="service-icon">{service.icon}</div>
            <h4>{service.name}</h4>
            <div className="service-price">{service.price}</div>
            <div className="service-details">{service.details}</div>
          </div>
        ))}
      </div>
      <div className="checkout-section">
        <div className="total-price">Total: {totalPrice}/day</div>
        <button className="cta-button secondary-btn back-btn" onClick={onBack}>Return</button>
        <button className="cta-button primary-btn" onClick={handleCheckout}><span>Reserve Now</span></button>
      </div>
    </section>
  );
} 