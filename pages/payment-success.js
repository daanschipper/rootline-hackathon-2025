import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';

export default function PaymentSuccess() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleNextPayment = async () => {
      try {
        const remainingPayments = JSON.parse(sessionStorage.getItem('remainingPayments'));
        
        if (!remainingPayments || remainingPayments.amounts.length === 0) {
          // No more payments needed, clear storage and redirect to home
          sessionStorage.removeItem('remainingPayments');
          router.push('/');
          return;
        }

        // Create next payment session
        const response = await fetch('/api/create-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            totalAmount: remainingPayments.amounts[0],
            basket: remainingPayments.items,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create next payment');
        }

        const data = await response.json();
        
        // Update remaining payments in storage
        sessionStorage.setItem('remainingPayments', JSON.stringify({
          amounts: remainingPayments.amounts.slice(1),
          items: remainingPayments.items,
          currentIndex: remainingPayments.currentIndex + 1
        }));

        // Redirect to next payment
        window.location.href = data.checkoutUrl;
      } catch (err) {
        setError(err.message);
        console.error('Payment continuation error:', err);
      } finally {
        setLoading(false);
      }
    };

    handleNextPayment();
  }, [router]);

  return (
    <>
      <Header />
      <div className="payment-success-section">
        <h2 className="section-title">Payment Processing</h2>
        {loading ? (
          <div className="loading-message">
            <p>Processing your payment...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <p>Error: {error}</p>
            <button 
              className="cta-button primary-btn"
              onClick={() => router.push('/')}
            >
              Return to Home
            </button>
          </div>
        ) : (
          <div className="success-message">
            <p>Payment successful! Redirecting to next payment...</p>
          </div>
        )}
      </div>
    </>
  );
} 