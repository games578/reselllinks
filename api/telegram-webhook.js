const { getValue } = require('./_lib/redis');

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const WEBHOOK_SECRET = process.env.TELEGRAM_WEBHOOK_SECRET;

async function sendMessage(chatId, text) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });
}

function formatDelivery(record) {
  const lines = record.items.map((item) => {
    if (item.configured) {
      return `<b>${item.name}</b>\n${item.link}`;
    }
    return `<b>${item.name}</b>\nYour access link is still being finalized — check back soon, or reply to your order email if it's been a while.`;
  });
  return `Here's your order:\n\n${lines.join('\n\n')}`;
}

module.exports = async (req, res) => {
  if (
    WEBHOOK_SECRET &&
    req.headers['x-telegram-bot-api-secret-token'] !== WEBHOOK_SECRET
  ) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(200).json({ ok: true });
  }

  try {
    const update = req.body;
    const message = update.message;
    if (!message || !message.text) {
      return res.status(200).json({ ok: true });
    }

    const chatId = message.chat.id;
    const text = message.text.trim();

    if (text === '/start') {
      await sendMessage(
        chatId,
        "Welcome! After you buy a pack, you'll get an access code by email. Just send me that code here and I'll give you your link(s)."
      );
      return res.status(200).json({ ok: true });
    }

    const code = text.replace(/\s+/g, '').toUpperCase();
    const raw = await getValue(`code:${code}`);

    if (!raw) {
      await sendMessage(
        chatId,
        "I couldn't find that code. Double check it matches exactly what's in your order email, then try again."
      );
      return res.status(200).json({ ok: true });
    }

    const record = JSON.parse(raw);
    await sendMessage(chatId, formatDelivery(record));
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Telegram webhook error:', err.message);
    return res.status(200).json({ ok: true });
  }
};
