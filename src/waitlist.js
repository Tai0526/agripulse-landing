// Waitlist submissions go straight to Supabase's REST endpoint — no SDK needed.
// Configure via .env: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export function isConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)
}

// Normalize any way of writing a Zambian mobile number to +260XXXXXXXXX,
// so "097 123 4567", "0971234567" and "+260971234567" are all the same row
// in the database and the unique index can catch repeat signups.
// Returns null if it is not a valid Zambian mobile number.
export function normalizeZambianPhone(input) {
  const digits = (input || '').replace(/\D/g, '')
  let core = null
  if (digits.length === 12 && digits.startsWith('260')) core = digits.slice(3)
  else if (digits.length === 10 && digits.startsWith('0')) core = digits.slice(1)
  else if (digits.length === 9) core = digits
  if (!core || !/^(9[5-7]|7[5-7])\d{7}$/.test(core)) return null
  return `+260${core}`
}

export async function joinWaitlist({ name, phone, town, email }) {
  if (!isConfigured()) {
    throw new Error('Signups are not open yet. Please check back shortly.')
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
    // 23505 = unique violation → this person already signed up
    if (text.includes('23505')) {
      if (text.includes('waitlist_email_key')) {
        throw new Error('This email is already on the waitlist. You are in!')
      }
      throw new Error('This phone number is already on the waitlist. You are in!')
    }
    throw new Error('Something went wrong. Please try again.')
  }
}
