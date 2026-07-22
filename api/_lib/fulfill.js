const { resolveDelivery } = require('./delivery');
const { sendEmail } = require('./send-email');

function buildEmailHtml({ items, sessionId }) {
  const rows = items
    .map((item) => {
      if (item.configured) {
        return `
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #2E3138;">
              <div style="font-weight:600;color:#F2F1EC;">${item.name}</div>
              <a href="${item.link}" style="color:#5FA37B;">Access your pack →</a>
            </td>
          </tr>`;
      }
      return `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #2E3138;">
            <div style="font-weight:600;color:#F2F1EC;">${item.name}</div>
            <div style="color:#9A9CA3;">Your access link is being finalized — you'll get a follow-up email shortly. If you don't hear from us within a few hours, just reply to this email.</div>
          </td>
        </tr>`;
    })
    .join('');

  return `
  <div style="background:#14161A;padding:32px 16px;font-family:Arial,sans-serif;">
    <div style="max-width:480px;margin:0 auto;background:#1C1F25;border:1px solid #2E3138;border-radius:8px;padding:32px;color:#F2F1EC;">
      <h1 style="font-size:20px;margin:0 0 8px;">Here's your order</h1>
      <p style="color:#9A9CA3;font-size:14px;line-height:1.6;margin:0 0 20px;">Thanks for your purchase. Your access is below.</p>
      <table style="width:100%;border-collapse:collapse;">${rows}</table>
      <p style="color:#6E7078;font-size:12px;margin-top:24px;">Order ref: ${sessionId}</p>
    </div>
  </div>`;
}

async function fulfillOrder(stripe, session) {
  const email = session.customer_details && session.customer_details.email;

  if (!email) {
    throw new Error('No customer email on session — cannot deliver');
  }

  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
    limit: 100,
  });

  const purchasedNames = lineItems.data.map((li) => li.description);
  const items = resolveDelivery(purchasedNames);

  const html = buildEmailHtml({ items, sessionId: session.id });

  await sendEmail({
    to: email,
    subject: 'Your order is ready',
    html,
  });

  return { email, items };
}

module.exports = { fulfillOrder, buildEmailHtml };
