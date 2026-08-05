import { useState } from 'react'
import { TICKER_ROW_1, TICKER_ROW_2 } from './data.js'
import { joinWaitlist, normalizeZambianPhone } from './waitlist.js'
import Phone from './Phone.jsx'
import {
  LogoMark, IconLeaf, IconTruck, IconStore, IconEyeOff, IconSwings, IconRoute,
} from './Icons.jsx'

function Change({ value }) {
  const cls = value > 0 ? 'up' : value < 0 ? 'down' : 'flat'
  const sign = value > 0 ? '+' : ''
  return <span className={`change ${cls}`}>{`${sign}${value.toFixed(1)}%`}</span>
}

function TickerItem({ item }) {
  return (
    <div className="tick">
      <span className="tick-code">{item.code}</span>
      <span className="tick-body">
        <span className="tick-name">
          {item.name}
          {item.breed && <span className="tick-breed">{item.breed}</span>}
        </span>
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

function WaitlistForm() {
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
    const phone = normalizeZambianPhone(form.phone)
    if (!phone) {
      setStatus('error')
      setMessage('Please enter a valid Zambian mobile number, e.g. 097 123 4567.')
      return
    }
    setStatus('sending')
    setMessage('')
    try {
      await joinWaitlist({
        name: form.name.trim(),
        phone,
        town: form.town.trim(),
        email: form.email.trim().toLowerCase(),
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
    <form className="waitlist-form" onSubmit={submit}>
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
          <input type="text" placeholder="e.g. Lusaka, Soweto Market" value={form.town} onChange={set('town')} />
        </label>
        <label>
          <span>Email <em>(optional)</em></span>
          <input type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} autoComplete="email" />
        </label>
      </div>
      <button className="btn btn-primary btn-lg" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Joining…' : 'Join the waitlist, it’s free'}
      </button>
      {status === 'error' && <p className="form-error" role="alert">{message}</p>}
      <p className="form-note">Free during early access. No spam. We only message you about AgriPulse.</p>
    </form>
  )
}

const ROADMAP = [
  {
    phase: 'At launch',
    title: 'Check and compare prices',
    points: [
      'Daily prices for the crops you grow, trade or stock',
      'Prices submitted by trained field agents inside each market, cross-checked before publishing',
      'Compare markets side by side: Lusaka, Kitwe, Ndola and Chipata to start',
      'Price history, so you know if today is a good day to sell',
      'Works on any smartphone. Nothing to install.',
    ],
  },
  {
    phase: 'Coming soon',
    title: 'Prices that come to you',
    points: [
      'Livestock prices too: cattle, goats, pigs and chickens, listed by breed, because breed determines price',
      'Price alerts that tell you the moment your crop moves',
      'Watchlists for the crops, animals and markets you care about',
      'Prices delivered on WhatsApp and SMS, where you already chat',
      'A profit estimator: project your earnings from your land size, crop and today’s prices',
      'More markets and crops, added where waitlist members are',
    ],
  },
  {
    phase: 'On the roadmap',
    title: 'Any phone, anywhere',
    points: [
      'USSD access for feature phones. No internet, no data bundle needed.',
      'Built to work on slow connections and cheap data',
      'Simple enough to use at the market, in the sun, in a hurry',
    ],
  },
  {
    phase: 'The bigger picture',
    title: 'From checking prices to selling better',
    points: [
      'Know your real profit before you travel: transport costs factored in, so you can see that Lusaka pays K850 more after all costs',
      'Sell direct: list your produce and deal with verified buyers in the app',
      'Ratings and track records, so farmers and buyers can trade with new people safely',
      'Cross-border prices and trade across the region: Zimbabwe, Malawi, Tanzania and routes like Kasumbalesa',
    ],
  },
]

export default function App() {
  return (
    <>
      <header className="nav">
        <div className="container nav-inner">
          <a className="brand" href="#top">
            <span className="brand-mark"><LogoMark /></span> AgriPulse
          </a>
          <nav className="nav-links">
            <a href="#how">How it works</a>
            <a href="#coming">What you'll get</a>
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
              <span className="badge">Launching soon in Zambia · Free early access</span>
              <h1>
                Know the price <span className="accent">before</span> you sell.
              </h1>
              <p className="lede">
                AgriPulse shows daily crop and livestock prices across Zambia's markets,
                on any phone. Whether you farm, trade or run a shop: stop guessing,
                stop losing money, sell where it pays.
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
              <Phone />
            </div>
          </div>
        </section>

        {/* ---------- TICKER ---------- */}
        <section className="ticker" aria-label="Sample crop prices across markets">
          <TickerRow items={TICKER_ROW_1} />
          <TickerRow items={TICKER_ROW_2} reverse />
          <p className="ticker-note container">Illustrative prices. The live app shows real daily prices from each market.</p>
        </section>

        {/* ---------- PROBLEM ---------- */}
        <section className="section problem">
          <div className="container">
            <span className="kicker">The problem</span>
            <h2>Every day, money is left on the table.</h2>
            <div className="cards-3">
              <div className="card">
                <div className="card-icon"><IconEyeOff /></div>
                <h3>Selling blind</h3>
                <p>Too often you only learn the price when the buyer names it, at the farm gate, with the harvest already done and nowhere else to go.</p>
              </div>
              <div className="card">
                <div className="card-icon"><IconSwings /></div>
                <h3>Prices swing daily</h3>
                <p>A box of tomatoes can differ by K60 between two markets in the same week. Without visibility, you find out when it's too late.</p>
              </div>
              <div className="card">
                <div className="card-icon"><IconRoute /></div>
                <h3>Travel is a gamble</h3>
                <p>Going to a further market costs fuel and time. Nobody risks it on a rumour, so everyone stays and sells low.</p>
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
                <p>Open AgriPulse and see what your crop is selling for right now, collected daily from real markets.</p>
              </div>
              <div className="step">
                <span className="step-num">2</span>
                <h3>Compare markets</h3>
                <p>See prices side by side across Lusaka, Kitwe, Ndola, Chipata and more. Spot where your crop pays best.</p>
              </div>
              <div className="step">
                <span className="step-num">3</span>
                <h3>Sell where it pays</h3>
                <p>Decide with numbers, not rumours. Hold for a week, or load the truck for a better market.</p>
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
                <div className="card-icon"><IconLeaf /></div>
                <h3>Farmers</h3>
                <p>Know the fair price before the buyer arrives. Negotiate with confidence, or take your harvest where it's worth more.</p>
              </div>
              <div className="card who-card">
                <div className="card-icon"><IconTruck /></div>
                <h3>Traders</h3>
                <p>Track price gaps between markets and protect your margin. Buy low, sell high, with today's numbers instead of last week's.</p>
              </div>
              <div className="card who-card">
                <div className="card-icon"><IconStore /></div>
                <h3>Retailers</h3>
                <p>Source smarter. Compare supply markets on price and consistency, and stop overpaying for stock.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- WHAT YOU'LL GET ---------- */}
        <section className="section roadmap" id="coming">
          <div className="container">
            <span className="kicker">What you'll get</span>
            <h2>Useful on day one. Better every month.</h2>
            <div className="timeline">
              {ROADMAP.map((item) => (
                <div className="timeline-item" key={item.phase}>
                  <div className="timeline-marker">
                    <span className="timeline-dot" />
                  </div>
                  <div className="timeline-card">
                    <div className="timeline-head">
                      <span className="timeline-phase">{item.phase}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <ul>
                      {item.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- WHY WE'RE BUILDING THIS ---------- */}
        <section className="mission">
          <div className="container">
            <span className="kicker">Why we're building this</span>
            <h2>Fair prices should not depend on who you know.</h2>
            <p className="mission-lede">
              Agriculture feeds Zambia and employs most of it. Yet the people doing the work
              still find prices by rumour, phone-a-friend, or showing up and hoping.
              The phones are already in every pocket. What's missing is the information.
              AgriPulse exists to close that gap, starting with something simple:
              today's prices, in your hand, every day. Zambia first, then the region.
              Know your market. Sell smarter.
            </p>
            <div className="stats-row">
              <div className="stat">
                <strong>~70%</strong>
                <span>of Zambians depend on agriculture for their livelihood</span>
              </div>
              <div className="stat">
                <strong>1.5M+</strong>
                <span>smallholder farming families selling into local markets</span>
              </div>
              <div className="stat">
                <strong>20M+</strong>
                <span>active mobile connections across the country</span>
              </div>
              <div className="stat">
                <strong>1</strong>
                <span>place to see what your crop is really worth: AgriPulse</span>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- NO SMARTPHONE ---------- */}
        <section className="section ussd">
          <div className="container ussd-inner">
            <div className="ussd-copy">
              <span className="kicker">Reach</span>
              <h2>No smartphone? No problem.</h2>
              <p>
                SMS and USSD access are on the roadmap so any phone can check prices.
                No internet, no app, no data bundle. Price information should reach
                the furthest farm, not just the smartphone in town.
              </p>
            </div>
            <div className="ussd-phone">
              <div className="ussd-screen">
                <p>AgriPulse. Prices today:</p>
                <p>1. Maize K340 (Soweto)</p>
                <p>2. Tomatoes K180 (Soweto)</p>
                <p>3. Soya K9.50/kg (Kitwe)</p>
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
                Early members get it <strong>free</strong>, and help us decide which markets
                and crops come first.
              </p>
              <ul className="ticks">
                <li>Free during early access</li>
                <li>Works on any smartphone, nothing to install</li>
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
                <p>From trained field agents inside the markets, submitting prices through the trading day. Submissions are cross-checked before publishing, and every price shows its market and when it was updated, so you can judge it yourself.</p>
              </details>
              <details>
                <summary>Can I earn money with AgriPulse?</summary>
                <p>Yes. We are recruiting field agents in each market: people who know their market well, submit daily prices and build a track record on the platform. Join the waitlist with your town, then email us and say you want to be an agent.</p>
              </details>
              <details>
                <summary>How much does it cost?</summary>
                <p>Nothing during early access. Later there will be a small monthly subscription, priced so that one better sale covers months of it. Waitlist members will always get the best deal.</p>
              </details>
              <details>
                <summary>Which markets will you cover first?</summary>
                <p>We're starting with the busiest trading hubs: Lusaka, Kitwe, Ndola and Chipata, then expanding based on where waitlist members are. Your signup literally votes for your market.</p>
              </details>
              <details>
                <summary>I don't have a smartphone. Can I still use it?</summary>
                <p>SMS and USSD access is on our roadmap so any phone can check prices. Join the waitlist and tell us your town. It helps us prioritise.</p>
              </details>
              <details>
                <summary>Do you cover livestock?</summary>
                <p>Yes. Cattle, goats, pigs and chickens are on the roadmap alongside crops, and always listed with the breed, because a Boer goat and a local goat do not sell for the same money. You'll see the breed next to every animal price.</p>
              </details>
              <details>
                <summary>How is this different from asking around?</summary>
                <p>Asking around gets you one or two prices, hours old, from people who may have their own interests. AgriPulse shows the same day's prices across many markets at once, so the decision is yours, made with numbers.</p>
              </details>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <a className="brand" href="#top"><span className="brand-mark"><LogoMark /></span> AgriPulse</a>
            <p className="footer-tag">Know your market. Sell smarter. Daily crop and livestock prices for Zambia's farmers, traders and retailers.</p>
          </div>
          <div className="footer-links">
            <a href="#how">How it works</a>
            <a href="#coming">What you'll get</a>
            <a href="#waitlist">Join waitlist</a>
            <a href="#faq">FAQ</a>
            <a href="mailto:taizyakasitu20@gmail.com?subject=AgriPulse">Contact us</a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} AgriPulse. Proudly Zambian.</span>
          <span className="footer-invest">Partner or investor? <a href="mailto:taizyakasitu20@gmail.com?subject=AgriPulse%20partnership">Email us</a></span>
        </div>
      </footer>
    </>
  )
}
