// pages/api/create-payment.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    try {
      const { totalAmount, basket } = req.body;
      
      // Check if amount is too high for staging environment
      const maxAmount = 10000; // 10,000 EUR limit for staging
      const processAmount = Math.min(totalAmount, maxAmount);
      
      if (totalAmount > maxAmount) {
        console.warn(`Amount ${totalAmount} exceeds staging limit. Processing ${maxAmount} instead.`);
      }
      
      const amountA = (processAmount * 0.9).toFixed(2);
      const amountB = (processAmount * 0.1).toFixed(2);
  
      const response = await fetch('https://payment-api.staging.rootline.com/v1/payments', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': 'sk_rootline_staging_ABmUeOwdSJjmu0Mm9MlGuSvBPU7GJnFloO6fRKtOM2FRTIf0xunzPEaiFEhHNi6FCiZgbX8SKAoVtLNSZrTgcqyGW9fS6B3uc',
          'rootline-version': '2024-04-23',
        },
        body: JSON.stringify({
          account_id: 'acc_2b8tGla2q1AUr70B3mMAxU',
          reference: `order-${Date.now()}`, // Generate unique reference
          amount: {
            currency: 'EUR',
            quantity: processAmount.toFixed(2),
          },
          return_url: 'https://www.zenythluxury.life/success', // Use full URL
          splits: [
            {
              account_id: 'acc_3dCEME8jKxB2Fw30G2Wmg7',
              amount: {
                currency: 'EUR',
                quantity: amountA,
              },
              reference: 'split-a',
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
              reference: 'split-b',
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
        const errorData = await response.json();
        console.error('Payment API error:', errorData);
        throw new Error(errorData.message || 'Payment failed');
      }
  
      const data = await response.json();
      
      console.log(data);

      // If the payment API returns a checkout URL, send it to the client
      res.status(200).json({ 
        success: true, 
        data,
        checkoutUrl: data.next_action.checkout_url,
        processedAmount: processAmount,
        originalAmount: totalAmount,
        wasLimited: totalAmount > maxAmount
      });
      
    } catch (error) {
      console.error('Payment error:', error);
      res.status(500).json({ 
        error: 'Payment processing failed', 
        message: error.message 
      });
    }
  }