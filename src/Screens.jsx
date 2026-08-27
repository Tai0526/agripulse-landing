import { StatusBar, TabBar } from './Phone.jsx'

/* The app's real screens, rebuilt in CSS/SVG so they render razor sharp
   on any display. Content mirrors actual app screenshots. */

const chev = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const Back = () => (
  <svg {...chev} width="14" height="14"><path d="M15 5l-7 7 7 7" /></svg>
)
const Star = () => (
  <svg {...chev} width="16" height="16" strokeWidth={1.8}>
    <path d="M12 3l2.7 5.6 6.3.8-4.6 4.3 1.2 6.1-5.6-3-5.6 3 1.2-6.1L3 9.4l6.3-.8z" />
  </svg>
)
const TrendUp = () => (
  <svg {...chev} width="13" height="13"><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></svg>
)

/* Line chart matching the detail page: two peaks, area fill, end dot. */
function DetailChart() {
  const d = 'M6 60 C 16 66, 22 78, 30 88 S 44 116, 52 118 S 66 92, 74 64 S 86 22, 94 20 S 106 62, 112 78 S 122 118, 130 122 S 144 66, 152 40 S 162 16, 168 18 S 180 58, 186 72 S 196 108, 202 118 S 214 126, 220 118 S 232 74, 240 44 S 248 26, 252 22'
  return (
    <svg viewBox="0 0 258 140" className="s-chart" aria-hidden="true">
      <path d={`${d} L 252 140 L 6 140 Z`} fill="var(--green-500)" opacity="0.12" stroke="none" />
      <path d={d} fill="none" stroke="var(--green-600)" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="252" cy="22" r="4" fill="var(--green-600)" />
    </svg>
  )
}

/** Commodity detail: Sunflower in Ndola with the SELL suggestion. */
export function DetailPhone() {
  return (
    <div className="phone phone-sm">
      <div className="phone-screen">
        <StatusBar />
        <div className="s-head">
          <span className="s-round"><Back /></span>
          <span className="p-ava">🌻</span>
          <span className="s-head-body">
            <strong>Sunflower</strong>
            <small>50kg bag · Ndola Main Masala, Ndola</small>
          </span>
          <span className="s-star"><Star /></span>
        </div>

        <div className="s-card s-hero">
          <div className="s-hero-top">
            <div>
              <span className="s-label">Current price</span>
              <span className="s-big">K315</span>
              <small className="s-dim">Updated 27 Aug</small>
            </div>
            <div className="s-hero-right">
              <span className="p-chip up">+6.8%</span>
              <span className="s-demand">● High demand</span>
            </div>
          </div>
          <div className="s-stats">
            <span><small>Today</small><em className="up">+6.8%</em></span>
            <span><small>7 days</small><em className="up">+5.0%</em></span>
            <span><small>30-day range</small><em>K275–K320</em></span>
          </div>
        </div>

        <div className="s-rangebar">
          <span className="p-section">Price history</span>
          <span className="s-pills">
            <i>7D</i><i>14D</i><i className="on">30D</i><i className="depth">⤢ In-depth</i>
          </span>
        </div>
        <div className="s-card s-chart-card">
          <div className="s-chart-head">
            <span><small>27 Aug · latest</small><strong>K315</strong></span>
            <span className="s-chart-note"><em className="up">+6.8% that day</em><small>touch the chart to explore</small></span>
          </div>
          <DetailChart />
          <div className="s-chart-foot"><span>29 Jul</span><span>low K275 · high K320</span><span>27 Aug</span></div>
        </div>

        <span className="p-section">Suggested action</span>
        <div className="s-card s-suggest">
          <div className="s-suggest-head">
            <span className="s-verdict">SELL</span>
            <strong>Near the 30-day high</strong>
            <span className="s-trend"><TrendUp /></span>
          </div>
          <p>This market is paying close to its best price of the month. A good window to sell here.</p>
        </div>
        <div className="s-flex" />
        <div style={{ height: 14 }} />
      </div>
    </div>
  )
}

/** Compare markets: transport opportunities for Irish potatoes. */
export function ComparePhone() {
  return (
    <div className="phone phone-sm">
      <div className="phone-screen">
        <StatusBar />
        <div className="s-title-row">
          <span>
            <strong>Compare markets</strong>
            <small>Same crop. Different money.</small>
          </span>
          <span className="p-avatar">CM</span>
        </div>

        <div className="s-select">
          <span className="p-ava p-ava-sm">🥔</span>
          <strong>Irish potatoes · 10kg bag</strong>
          <svg {...chev} width="12" height="12"><path d="M6 9l6 6 6-6" /></svg>
        </div>

        <div className="s-gap"><TrendUp /> Lusaka pays <strong>&nbsp;23% more&nbsp;</strong> than the cheapest market</div>

        <div className="s-opp s-opp-best">
          <span className="s-opp-badge">Best Opportunity</span>
          <div className="s-opp-route">
            <span><small>From</small><strong>Chipata</strong><em>K130</em></span>
            <span className="s-opp-arrow">→</span>
            <span className="s-right"><small>To</small><strong>Lusaka</strong><em>K160</em></span>
          </div>
          <div className="s-opp-profit"><small>Potential Profit</small><strong>+K30 per 10kg bag</strong></div>
        </div>

        <div className="s-opp">
          <div className="s-opp-route">
            <span><small>From</small><strong>Chipata</strong><em>K130</em></span>
            <span className="s-opp-arrow dim">→</span>
            <span className="s-right"><small>To</small><strong>Ndola</strong><em>K155</em></span>
          </div>
          <div className="s-opp-profit"><small>Potential Profit</small><strong>+K25 per 10kg bag</strong></div>
        </div>

        <div className="s-flex" />
        <TabBar active="Compare" />
      </div>
    </div>
  )
}

/* Candle chart: red/green daily candles + orange 7-day average. */
function CandleChart() {
  const values = [312, 307, 300, 294, 288, 284, 289, 297, 306, 313, 318, 311, 302, 295, 289, 297, 306, 313, 305, 296, 289, 284, 291, 300, 309, 316]
  const top = 322
  const scale = 132 / 50 // px per Kwacha over the 272..322 window
  const y = (v) => (top - v) * scale
  const candles = values.slice(1).map((close, i) => {
    const open = values[i]
    return { x: 8 + i * 9.6, open, close, up: close >= open }
  })
  // 5-point moving average for the orange line
  const ma = values.map((_, i) => {
    const s = values.slice(Math.max(0, i - 4), i + 1)
    return s.reduce((a, b) => a + b, 0) / s.length
  })
  const maPath = ma.map((v, i) => `${i === 0 ? 'M' : 'L'} ${3 + i * 9.6} ${y(v)}`).join(' ')
  return (
    <svg viewBox="0 0 258 140" className="s-chart" aria-hidden="true">
      {[320, 309, 298, 286, 275].map((g) => (
        <g key={g}>
          <line x1="4" x2="230" y1={y(g)} y2={y(g)} stroke="var(--line)" strokeWidth="1" strokeDasharray="3 4" />
          <text x="236" y={y(g) + 3} fontSize="8.5" fill="var(--ink-soft)">{g}</text>
        </g>
      ))}
      {candles.map((c) => (
        <rect
          key={c.x}
          x={c.x}
          y={y(Math.max(c.open, c.close))}
          width="5.6"
          height={Math.max(3, Math.abs(y(c.open) - y(c.close)))}
          rx="1.6"
          fill={c.up ? '#21a375' : '#d64545'}
        />
      ))}
      <path d={maPath} fill="none" stroke="var(--amber)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** The in-depth candle view with the 7-day average overlay. */
export function CandlePhone() {
  return (
    <div className="phone phone-sm">
      <div className="phone-screen">
        <StatusBar />
        <div className="s-title-row">
          <span>
            <strong>Sunflower · In-depth</strong>
            <small>Ndola Main Masala, Ndola · 50kg bag</small>
          </span>
          <span className="s-round">—</span>
        </div>

        <div className="s-rangebar s-rangebar-tight">
          <span className="s-pills"><i>14D</i><i className="on">30D</i></span>
          <span className="s-toggle">7-day average <i className="s-switch"><b /></i></span>
        </div>

        <div className="s-card s-chart-card">
          <div className="s-chart-head">
            <span><small>27 Aug · latest</small><strong>K315</strong></span>
            <span className="s-ohlc">
              <span><small>Open</small><b>K295</b></span>
              <span><small>Close</small><b>K315</b></span>
              <span><small>Day</small><b className="up">+6.8%</b></span>
            </span>
          </div>
          <CandleChart />
          <div className="s-chart-foot"><span>30 Jul</span><span /><span>27 Aug</span></div>
        </div>

        <div className="s-legend">
          <span><i className="dot g" /> price rose that day</span>
          <span><i className="dot r" /> price fell</span>
          <span><i className="dot a" /> 7-day average</span>
        </div>

        <div className="s-card s-stats s-stats-card">
          <span><small>High</small><em>K320</em></span>
          <span><small>Low</small><em>K275</em></span>
          <span><small>Average</small><em>K297.67</em></span>
          <span><small>Change</small><em className="up">+6.8%</em></span>
        </div>

        <div className="s-flex" />
        <div className="s-close-btn">— Close in-depth view</div>
        <div style={{ height: 12 }} />
      </div>
    </div>
  )
}
