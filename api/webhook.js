const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const { fulfillOrder } = require('./_lib/fulfill');

// Stripe signature verification needs the raw, untouched request body —
// Vercel's default body parsing would break that, so we turn it off here
// and read the raw bytes ourselves.
module.exports.config = {
  api: { bodyParser: false },
};

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    const rawBody = await readRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    try {
      if (session.payment_status === 'paid') {
        await fulfillOrder(stripe, session);
      }
    } catch (err) {
      console.error('Fulfillment error:', err.message);
      return res.status(500).json({ error: 'Fulfillment failed' });
    }
  }

  return res.status(200).json({ received: true });
};
