import { useState } from 'react'
import { TICKER_ROW_1, TICKER_ROW_2, HERO_PRICES, SPARK } from './data.js'
import { joinWaitlist } from './waitlist.js'

function Change({ value }) {
  const cls = value > 0 ? 'up' : value < 0 ? 'down' : 'flat'
  const sign = value > 0 ? '+' : ''
  return <span className={`change ${cls}`}>{value === 0 ? '—' : `${sign}${value.toFixed(1)}%`}</span>
}

function Sparkline({ points }) {
  const w = 120
  const h = 36
  const max = Math.max(...points)
  const min = Math.min(...points)
  const step = w / (points.length - 1)
  const d = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${(i * step).toFixed(1)},${(h - ((p - min) / (max - min)) * (h - 6) - 3).toFixed(1)}`)
    .join(' ')
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="spark" aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function TickerItem({ item }) {
  return (
    <div className="tick">
      <span className="tick-code">{item.code}</span>
      <span className="tick-body">
        <span className="tick-name">{item.name}</span>
        <span className="tick-market">{item.market}</span>
      </span>
      <span className="tick-price">{item.price}</span>
      <Change value={item.change} />
    </div>
  )
}

function TickerRow({ items, reverse }) {
  const doubled = [...items, ...items]
  return (
    <div className="ticker-row">
      <div className={`ticker-track ${reverse ? 'reverse' : ''}`}>
        {doubled.map((item, i) => (
          <TickerItem key={i} item={item} />
        ))}
      </div>
    </div>
  )
}

function WaitlistForm({ compact }) {
  const [form, setForm] = useState({ name: '', phone: '', town: '', email: '' })
  const [status, setStatus] = useState('idle') // idle | sending | done | error
  const [message, setMessage] = useState('')

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  async function submit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim() || !form.town.trim()) {
      setStatus('error')
      setMessage('Please fill in your name, phone and town.')
      return
    }
    setStatus('sending')
    setMessage('')
    try {
      await joinWaitlist({
        name: form.name.trim(),
        phone: form.phone.trim(),
        town: form.town.trim(),
        email: form.email.trim(),
      })
      setStatus('done')
    } catch (err) {
      setStatus('error')
      setMessage(err.message)
    }
  }

  if (status === 'done') {
    return (
      <div className="form-done" role="status">
        <div className="form-done-icon">✓</div>
        <h3>You're on the list, {form.name.split(' ')[0]}!</h3>
        <p>We'll message you on {form.phone} as soon as AgriPulse opens in your area.</p>
      </div>
    )
  }

  return (
    <form className={`waitlist-form ${compact ? 'compact' : ''}`} onSubmit={submit}>
      <div className="form-grid">
        <label>
          <span>Your name</span>
          <input type="text" placeholder="e.g. Chanda Mwansa" value={form.name} onChange={set('name')} autoComplete="name" />
        </label>
        <label>
          <span>Phone number</span>
          <input type="tel" placeholder="e.g. 097 000 0000" value={form.phone} onChange={set('phone')} autoComplete="tel" />
        </label>
        <label>
          <span>Town / market</span>
          <input type="text" placeholder="e.g. Lusaka — Soweto Market" value={form.town} onChange={set('town')} />
        </label>
        <label>
          <span>Email <em>(optional)</em></span>
          <input type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} autoComplete="email" />
        </label>
      </div>
      <button className="btn btn-primary btn-lg" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Joining…' : 'Join the waitlist — it’s free'}
      </button>
      {status === 'error' && <p className="form-error" role="alert">{message}</p>}
      <p className="form-note">Free during early access. No spam — we only message you about AgriPulse.</p>
    </form>
  )
}

export default function App() {
  return (
    <>
      <header className="nav">
        <div className="container nav-inner">
          <a className="brand" href="#top">
            <span className="brand-mark">🌾</span> AgriPulse
          </a>
          <nav className="nav-links">
            <a href="#how">How it works</a>
            <a href="#who">Who it's for</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a className="btn btn-primary" href="#waitlist">Join waitlist</a>
        </div>
      </header>

      <main id="top">
        {/* ---------- HERO ---------- */}
        <section className="hero">
          <div className="container hero-inner">
            <div className="hero-copy">
              <span className="badge">🇿🇲 Launching soon in Zambia · Free early access</span>
              <h1>
                Know the price <span className="accent">before</span> you sell.
              </h1>
              <p className="lede">
                AgriPulse shows you daily crop prices across Zambia's markets — on your phone.
                Farmers, traders and retailers: stop guessing, stop losing money, sell where it pays.
              </p>
              <div className="hero-cta">
                <a className="btn btn-primary btn-lg" href="#waitlist">Join the waitlist</a>
                <a className="btn btn-ghost btn-lg" href="#how">See how it works</a>
              </div>
              <div className="hero-proof">
                <div><strong>Daily</strong><span>price updates</span></div>
                <div><strong>10+</strong><span>markets at launch</span></div>
                <div><strong>K0</strong><span>during early access</span></div>
              </div>
            </div>

            <div className="hero-card-wrap">
              <div className="hero-card">
                <div className="hero-card-head">
                  <div>
                    <span className="hero-card-title">Today's prices</span>
                    <span className="hero-card-sub">Updated this morning</span>
                  </div>
                  <span className="live-dot">LIVE</span>
                </div>
                {HERO_PRICES.map((crop) => (
                  <div className="crop-block" key={crop.name}>
                    <div className="crop-head">
                      <span className="crop-name">{crop.name}</span>
                      <Sparkline points={SPARK} />
                    </div>
                    {crop.prices.map((p, i) => (
                      <div className={`crop-row ${i === crop.best ? 'best' : ''}`} key={p.market}>
                        <span>{p.market}</span>
                        <span className="crop-price">
                          {p.value} {i === crop.best && <em>best</em>}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
                <div className="hero-card-foot">Same crop. Different market. Up to <strong>45% more</strong>.</div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- TICKER ---------- */}
        <section className="ticker" aria-label="Sample crop prices across markets">
          <TickerRow items={TICKER_ROW_1} />
          <TickerRow items={TICKER_ROW_2} reverse />
          <p className="ticker-note container">Illustrative prices — the live app shows real daily prices from each market.</p>
        </section>

        {/* ---------- PROBLEM ---------- */}
        <section className="section problem">
          <div className="container">
            <span className="kicker">The problem</span>
            <h2>Every day, money is left on the table.</h2>
            <div className="cards-3">
              <div className="card">
                <div className="card-emoji">🤝</div>
                <h3>You sell blind</h3>
                <p>Most farmers only learn the price when the buyer names it — at the farm gate, with the crop already harvested and nowhere else to go.</p>
              </div>
              <div className="card">
                <div className="card-emoji">📉</div>
                <h3>Prices swing daily</h3>
                <p>A box of tomatoes can differ by K60 between two markets in the same week. Without visibility, you find out when it's too late.</p>
              </div>
              <div className="card">
                <div className="card-emoji">🛻</div>
                <h3>Travel is a gamble</h3>
                <p>Going to a further market costs fuel and time. Nobody risks it on a rumour — so everyone stays, and sells low.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- HOW IT WORKS ---------- */}
        <section className="section how" id="how">
          <div className="container">
            <span className="kicker">How it works</span>
            <h2>Three steps. No guesswork.</h2>
            <div className="steps">
              <div className="step">
                <span className="step-num">1</span>
                <h3>Check today's prices</h3>
                <p>Open AgriPulse and see what your crop is selling for right now — collected daily from real markets.</p>
              </div>
              <div className="step">
                <span className="step-num">2</span>
                <h3>Compare markets</h3>
                <p>See prices side by side across Lusaka, Kitwe, Ndola, Chipata and more. Spot where your crop pays best.</p>
              </div>
              <div className="step">
                <span className="step-num">3</span>
                <h3>Sell where it pays</h3>
                <p>Decide with numbers, not rumours — whether that's holding a week, or loading the truck for a better market.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- WHO IT'S FOR ---------- */}
        <section className="section who" id="who">
          <div className="container">
            <span className="kicker">Who it's for</span>
            <h2>Built for everyone in the chain.</h2>
            <div className="cards-3">
              <div className="card who-card">
                <div className="card-emoji">🌱</div>
                <h3>Farmers</h3>
                <p>Know the fair price before the buyer arrives. Negotiate with confidence, or take your harvest where it's worth more.</p>
              </div>
              <div className="card who-card">
                <div className="card-emoji">🚚</div>
                <h3>Traders</h3>
                <p>Track price gaps between markets and protect your margin. Buy low, sell high — with today's numbers, not last week's.</p>
              </div>
              <div className="card who-card">
                <div className="card-emoji">🏪</div>
                <h3>Retailers</h3>
                <p>Source smarter. Compare supply markets on price and consistency, and stop overpaying for stock.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- NO SMARTPHONE ---------- */}
        <section className="section ussd">
          <div className="container ussd-inner">
            <div className="ussd-copy">
              <span className="kicker">On the roadmap</span>
              <h2>No smartphone? No problem.</h2>
              <p>
                We're building SMS and USSD access so any phone can check prices — no internet, no app, no data bundle.
                Because price information should reach the furthest farm, not just the smartphone in town.
              </p>
            </div>
            <div className="ussd-phone">
              <div className="ussd-screen">
                <p>AgriPulse — Prices today</p>
                <p>1. Maize — K340 (Soweto)</p>
                <p>2. Tomatoes — K180 (Soweto)</p>
                <p>3. Soya — K9.50/kg (Kitwe)</p>
                <p>4. Change market</p>
                <p>5. Help</p>
                <p className="ussd-cursor">_</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- WAITLIST ---------- */}
        <section className="section waitlist" id="waitlist">
          <div className="container waitlist-inner">
            <div className="waitlist-copy">
              <span className="kicker">Early access</span>
              <h2>Be first when we switch on your market.</h2>
              <p>
                Join the waitlist and we'll message you the moment AgriPulse covers your area.
                Early members get it <strong>free</strong> — and help us decide which markets and crops come first.
              </p>
              <ul className="ticks">
                <li>Free during early access</li>
                <li>Works on any smartphone — nothing to install</li>
                <li>Your number is never shared</li>
              </ul>
            </div>
            <div className="waitlist-form-wrap">
              <WaitlistForm />
            </div>
          </div>
        </section>

        {/* ---------- FAQ ---------- */}
        <section className="section faq" id="faq">
          <div className="container">
            <span className="kicker">FAQ</span>
            <h2>Questions, answered.</h2>
            <div className="faq-list">
              <details>
                <summary>Where do the prices come from?</summary>
                <p>From the markets themselves — collected daily and cross-checked before publishing. Every price shows the market and when it was updated, so you can judge it yourself.</p>
              </details>
              <details>
                <summary>How much does it cost?</summary>
                <p>Nothing during early access. Later, there'll be a small monthly subscription — priced so that one better sale covers months of it. Waitlist members will always get the best deal.</p>
              </details>
              <details>
                <summary>Which markets will you cover first?</summary>
                <p>We're starting with the busiest trading hubs — Lusaka, Kitwe, Ndola, Chipata — and expanding based on where waitlist members are. Your signup literally votes for your market.</p>
              </details>
              <details>
                <summary>I don't have a smartphone. Can I still use it?</summary>
                <p>SMS and USSD access is on our roadmap so any phone can check prices. Join the waitlist and tell us your town — it helps us prioritise.</p>
              </details>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <a className="brand" href="#top"><span className="brand-mark">🌾</span> AgriPulse</a>
            <p className="footer-tag">Daily crop prices for Zambia's farmers, traders and retailers.</p>
          </div>
          <div className="footer-links">
            <a href="#how">How it works</a>
            <a href="#who">Who it's for</a>
            <a href="#waitlist">Join waitlist</a>
            <a href="#faq">FAQ</a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} AgriPulse. Made in Zambia 🇿🇲</span>
        </div>
      </footer>
    </>
  )
}
