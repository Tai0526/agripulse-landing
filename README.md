# AgriPulse 🌾

Daily crop prices for Zambia's farmers, traders and retailers — know the price before you sell.

This is the **landing site + waitlist**. The app itself comes next.

## Stack

- Vite + React, plain CSS (no framework)
- Waitlist stored in Supabase (`waitlist` table, anon inserts only)
- Deployed on Netlify (`npm run build` → `dist/`)

## Local dev

```bash
npm install
npm run dev
```

## Waitlist setup (one-time)

1. Create a Supabase project.
2. Run [supabase/waitlist.sql](supabase/waitlist.sql) in the SQL Editor.
3. Copy `.env.example` to `.env` and fill in the project URL + anon key.
4. On Netlify, add the same two variables under Site settings → Environment variables.

Until the env vars are set, the form shows "Signups are not open yet."

## Origin

Built from the AgriPulse field-interview script — validating that price visibility
across markets changes selling behavior for farmers, traders and retailers.
