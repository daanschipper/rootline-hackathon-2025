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

    const totalAmount = basket.reduce((total, item) => total + parseFloat(item.price.replace(/[^0-9.-]+/g, '')), 0);
    const amountA = (totalAmount * 0.9).toFixed(2);
    const amountB = (totalAmount * 0.1).toFixed(2);

    try {
      const response = await fetch('https://payment-api.staging.rootline.com/v1/payments', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': 'sk_rootline_staging_ABmUeOwdSJjmu0Mm9MlGuSvBPU7GJnFloO6fRKtOM2FRTIf0xunzPEaiFEhHNi6FCiZgbX8SKAoVtLNSZrTgcqyGW9fS6B3uc',
          'rootline-version': '2024-04-23',
        },
        body: JSON.stringify({
          account_id: 'acc_2b8tGla2q1AUr70B3mMAxU',
          reference: 'your-reference',
          amount: {
            currency: 'EUR',
            quantity: totalAmount.toFixed(2),
          },
          return_url: 'www.zenythluxury.life',
          splits: [
            {
              account_id: 'acc_2b8tGla2q1AUr70B3mMAxU',
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
              account_id: 'acc_4DdxkSfkEGUbYKmUlsxWgd',
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