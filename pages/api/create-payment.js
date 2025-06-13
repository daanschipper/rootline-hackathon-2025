// pages/api/create-payment.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    try {
      const { totalAmount, basket } = req.body;
      
      // Check if amount is too high for staging environment

      const processAmount = Math.min(totalAmount);

      const accountIds = new Map();

      accountIds.set("y", "acc_4tAUPCiLw0BA9o9CS6K6xT");
      accountIds.set("j", "acc_6YZCNFxhcRBYvGe73QDAvs");
      accountIds.set("w", "acc_7mlgK1mPCPdEE81ZgTRlrb");
      accountIds.set("s", "acc_4DdxkSfkEGUbYKmUlsxWgd");

      const splits = []
      basket.forEach(item => {
        const accountId = accountIds.get(item.id.charAt(0));

        if (!accountId) {
          throw new Error('Invalid item ID');
        }

        splits.push({
          account_id: accountId,
          amount: {
            currency: 'EUR',
            quantity: parseFloat(item.price.replace(/[^0-9.-]+/g, '')).toFixed(2).toString(),
          },
          reference: `order-${Date.now()}`,
        })
      })
      
const requestBody = {
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
    return_url: 'https://www.zenythluxury.life', // Updated to root domain
    splits: splits
  }),
}

console.log(requestBody);

      const response = await fetch('https://payment-api.staging.rootline.com/v1/payments', requestBody);
  
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
      });
      
    } catch (error) {
      console.error('Payment error:', error);
      res.status(500).json({ 
        error: 'Payment processing failed', 
        message: error.message 
      });
    }
  }