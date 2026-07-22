const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const { fulfillOrder } = require('./_lib/fulfill');

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { session_id } = req.body;
    if (!session_id) {
      return res.status(400).json({ error: 'Missing session_id' });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== 'paid') {
      return res.status(402).json({ error: 'This order was not paid' });
    }

    await fulfillOrder(stripe, session);
    return res.status(200).json({ sent: true });
  } catch (err) {
    console.error('Resend confirmation error:', err.message);
    return res.status(500).json({ error: 'Could not resend confirmation' });
  }
};
