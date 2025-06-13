export default function handler(req, res) {
  if (req.method === 'POST') {
    // Process the webhook payload
    const payload = req.body;
    console.log('Received webhook payload:', payload);

    // Respond with a success status
    res.status(200).json({ message: 'Webhook received successfully' });
  } else {
    // Handle any other HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 