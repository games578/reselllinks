# Cargo Ledger — Stripe checkout backend

This is the small server piece your storefront needs to actually take payments.
It holds your Stripe **secret key** safely and creates a Checkout Session when
someone clicks "Checkout" — something the HTML file alone can never do.

## 1. Put this in GitHub

1. Create a new repo on GitHub (e.g. `cargo-ledger-backend`).
2. Add these files to it: `api/create-checkout-session.js`, `package.json`, `vercel.json`, `success.html`.
3. Also copy your storefront's `index.html` into this same repo, so the whole site
   (frontend + backend) deploys together. Rename it to `index.html` at the repo root
   if it isn't already.
4. Commit and push.

## 2. Connect the repo to Vercel

1. Go to vercel.com, sign in with GitHub.
2. Click **Add New → Project**, pick this repo.
3. Vercel auto-detects the `api/` folder as serverless functions — no config needed
   beyond what's already in `vercel.json`.
4. Before deploying, add these **Environment Variables** in the Vercel project settings:
   - `STRIPE_SECRET_KEY` — from your Stripe Dashboard → Developers → API keys
     (use the **test** key first: starts with `sk_test_...`)
   - `SITE_URL` — the URL Vercel gives you, e.g. `https://cargo-ledger.vercel.app`
   - `ALLOWED_ORIGIN` — same URL as `SITE_URL` (locks down who can call your API)
5. Click Deploy.

## 3. Point the frontend at it

Since the frontend and backend deploy together from the same repo, the frontend's
`CHECKOUT_ENDPOINT` can stay as `/create-checkout-session` — no change needed,
because they now live on the same domain.

## 4. Test it

1. Visit your Vercel URL, add something to the cart, click Checkout.
2. You should land on Stripe's hosted payment page. Use Stripe's test card:
   `4242 4242 4242 4242`, any future date, any CVC.
3. On success you'll land on `success.html`.

## 5. Go live

1. In Stripe, switch from test mode to live mode (top-left toggle in the Dashboard).
2. Replace `STRIPE_SECRET_KEY` in Vercel's environment variables with your **live**
   secret key (`sk_live_...`).
3. Redeploy (Vercel → Deployments → redeploy latest).

## Notes

- Never put `sk_live_...` or `sk_test_...` in the HTML/JS that ships to the browser —
  only ever in Vercel's environment variables, which stay server-side.
- The publishable key (`pk_...`) is safe client-side but isn't needed for this
  redirect-to-Stripe-hosted-checkout approach.
- If you rename or move files, keep the rewrite rule in `vercel.json` in sync with
  wherever the frontend's `fetch('/create-checkout-session')` call points.
