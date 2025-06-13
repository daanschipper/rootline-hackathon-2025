import { supabase } from '../../../lib/supabase';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Process the webhook payload
    const payload = req.body;

    // Insert the payload into the webhooks table
    const { error } = await supabase
      .from('payments')
      .insert([{ response: payload }]);

    if (error) {
      console.error('Error inserting webhook:', error);
      return res.status(500).json({ error: 'Failed to store webhook', error: error });
    }

    // Respond with a success status1
    res.status(200).json({ message: 'Webhook received successfully' });
  } else {
    // Handle any other HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 