// Waitlist submissions go straight to Supabase's REST endpoint — no SDK needed.
// Configure via .env: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export function isConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)
}

export async function joinWaitlist({ name, phone, town, email }) {
  if (!isConfigured()) {
    throw new Error('Signups are not open yet — please check back shortly.')
  }
  const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({ name, phone, town, email: email || null }),
  })
  if (!res.ok) {
    const text = await res.text()
    // 23505 = unique violation → this phone already signed up
    if (text.includes('23505')) {
      throw new Error('This phone number is already on the waitlist — you are in!')
    }
    throw new Error('Something went wrong. Please try again.')
  }
}
