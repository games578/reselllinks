const REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

async function redisCommand(command) {
  if (!REST_URL || !REST_TOKEN) {
    throw new Error(
      'UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN are not set'
    );
  }

  const res = await fetch(REST_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${REST_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Redis error (${res.status}): ${text}`);
  }

  const data = await res.json();
  return data.result;
}

async function setValue(key, value) {
  return redisCommand(['SET', key, value]);
}

async function getValue(key) {
  return redisCommand(['GET', key]);
}

module.exports = { setValue, getValue };
