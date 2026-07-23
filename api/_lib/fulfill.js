const { resolveDelivery } = require('./delivery');
const { sendEmail } = require('./send-email');
const { setValue } = require('./redis');

const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function generateCode(length = 6) {
  let code = '';
  for (let i = 0; i < length; i++) {
    code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }
  return code;
}

function buildEmailHtml({ items, sessionId, code, botUsername }) {
  const rows = items
    .map(
      (item) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #2E3138;">
            <div style="font-weight:600;color:#F2F1EC;">${item.name}</div>
          </td>
        </tr>`
    )
    .join('');

  const botLink = botUsername ? `https://t.me/${botUsername}` : null;

  return `
  <div style="background:#14161A;padding:32px 16px;font-family:Arial,sans-serif;">
    <div style="max-width:480px;margin:0 auto;background:#1C1F25;border:1px solid #2E3138;border-radius:8px;padding:32px;color:#F2F1EC;">
      <h1 style="font-size:20px;margin:0 0 8px;">Here's your order</h1>
      <p style="color:#9A9CA3;font-size:14px;line-height:1.6;margin:0 0 20px;">Thanks for your purchase. Here's what you bought:</p>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">${rows}</table>

      <div style="background:#14161A;border:1px solid #2E3138;border-radius:8px;padding:20px;text-align:center;margin-bottom:20px;">
        <div style="color:#9A9CA3;font-size:13px;margin-bottom:8px;">Your access code</div>
        <div style="font-size:28px;font-weight:700;letter-spacing:4px;color:#5FA37B;">${code}</div>
      </div>

      <p style="color:#F2F1EC;font-size:14px;line-height:1.7;margin:0 0 8px;">
        <strong>How to get your links:</strong><br/>
        1. Open Telegram and go to
        ${botLink ? `<a href="${botLink}" style="color:#5FA37B;">our bot</a>` : 'our bot'}<br/>
        2. Send <strong>/start</strong><br/>
        3. Type in your code above
      </p>

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

  const code = generateCode();

  await setValue(
    `code:${code}`,
    JSON.stringify({
      items,
      sessionId: session.id,
      email,
    })
  );

  const html = buildEmailHtml({
    items,
    sessionId: session.id,
    code,
    botUsername: process.env.TELEGRAM_BOT_USERNAME,
  });

  await sendEmail({
    to: email,
    subject: 'Your order is ready — here is your access code',
    html,
  });

  return { email, items, code };
}

module.exports = { fulfillOrder, buildEmailHtml };
