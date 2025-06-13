import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useBasket } from '../context/BasketContext';

export default function Checkout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { basket, getBasketTotal } = useBasket();

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    const totalAmount = getBasketTotal();
    const amountA = (totalAmount * 0.9).toFixed(2);
    const amountB = (totalAmount * 0.1).toFixed(2);

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
              account_id: 'A',
              amount: {
                currency: 'EUR',
                quantity: amountA,
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
            {
              account_id: 'B',
              amount: {
                currency: 'EUR',
                quantity: amountB,
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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      {error && <p className="error">{error}</p>}
      <button onClick={handlePayment} disabled={loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  );
} 