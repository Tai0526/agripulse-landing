import { LogoMark } from './Icons.jsx'

const mini = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const MiniBell = ({ s = 15 }) => (
  <svg {...mini} width={s} height={s}>
    <path d="M18 16v-5a6 6 0 1 0-12 0v5l-2 3h16z" />
    <path d="M10.5 21.5a2 2 0 0 0 3 0" />
  </svg>
)
const MiniPin = ({ s = 13 }) => (
  <svg {...mini} width={s} height={s}>
    <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
)
const MiniChevron = ({ s = 12 }) => (
  <svg {...mini} width={s} height={s}><path d="M6 9l6 6 6-6" /></svg>
)
const MiniTrend = ({ s = 15 }) => (
  <svg {...mini} width={s} height={s}>
    <path d="M3 17l6-6 4 4 8-8" />
    <path d="M15 7h6v6" />
  </svg>
)
const MiniHome = ({ s = 20 }) => (
  <svg {...mini} width={s} height={s}>
    <path d="M3 11l9-8 9 8" />
    <path d="M5 9.5V21h14V9.5" />
  </svg>
)
const MiniCompare = ({ s = 20 }) => (
  <svg {...mini} width={s} height={s}>
    <path d="M8 3v18M16 3v18" />
    <path d="M8 7H3M21 17h-5" />
  </svg>
)

function MiniSpark({ up = true }) {
  const d = up
    ? 'M2 26 L14 20 L26 22 L38 12 L50 15 L62 6'
    : 'M2 8 L14 14 L26 11 L38 20 L50 17 L62 26'
  return (
    <svg viewBox="0 0 64 32" className="p-spark" aria-hidden="true">
      <path d={`${d} L62 32 L2 32 Z`} fill="currentColor" opacity="0.12" stroke="none" />
      <path d={d} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const ROWS = [
  { name: 'Tomatoes', unit: 'box', price: 'K180', change: '+5.8%', dir: 'up' },
  { name: 'Soya beans', unit: 'kg', price: 'K9.50', change: '-1.1%', dir: 'down' },
  { name: 'Groundnuts', unit: '20L', price: 'K210', change: '+1.9%', dir: 'up' },
]

export default function Phone() {
  return (
    <div className="phone-scene">
      <div className="phone">
        <div className="phone-screen">
          {/* status bar + dynamic island */}
          <div className="p-status">
            <span className="p-time">9:41</span>
            <span className="p-island" />
            <span className="p-status-icons">
              <svg width="15" height="11" viewBox="0 0 16 12" aria-hidden="true"><rect x="0" y="7" width="3" height="5" rx="1" fill="currentColor"/><rect x="4.5" y="5" width="3" height="7" rx="1" fill="currentColor"/><rect x="9" y="2.5" width="3" height="9.5" rx="1" fill="currentColor"/><rect x="13.5" y="0" width="2.5" height="12" rx="1" fill="currentColor" opacity="0.35"/></svg>
              <svg width="20" height="11" viewBox="0 0 22 12" aria-hidden="true"><rect x="0.5" y="0.5" width="18" height="11" rx="3" fill="none" stroke="currentColor" opacity="0.5"/><rect x="2" y="2" width="13" height="8" rx="1.8" fill="currentColor"/><rect x="19.5" y="4" width="2" height="4" rx="1" fill="currentColor" opacity="0.5"/></svg>
            </span>
          </div>

          {/* app header */}
          <div className="p-header">
            <span className="p-brand">
              <span className="p-brand-mark"><LogoMark size={20} /></span>
              AgriPulse
            </span>
            <span className="p-bell"><MiniBell /><i /></span>
          </div>

          <div className="p-title-row">
            <div>
              <span className="p-title">Today's prices</span>
              <span className="p-date">Tuesday, 5 August</span>
            </div>
          </div>

          <button className="p-market" type="button" tabIndex={-1}>
            <MiniPin />
            Soweto Market, Lusaka
            <MiniChevron />
          </button>

          {/* featured crop card */}
          <div className="p-featured">
            <div className="p-featured-top">
              <div>
                <span className="p-crop">Maize</span>
                <span className="p-unit">50kg bag</span>
              </div>
              <span className="p-chip up">+2.4%</span>
            </div>
            <div className="p-featured-mid">
              <span className="p-price">K340</span>
              <MiniSpark up />
            </div>
            <div className="p-best">
              <MiniTrend />
              <span>Best today: <strong>K365</strong> at Ndola Main</span>
            </div>
          </div>

          {/* price rows */}
          <div className="p-rows">
            {ROWS.map((r) => (
              <div className="p-row" key={r.name}>
                <span className="p-row-ava">{r.name[0]}</span>
                <span className="p-row-body">
                  <span className="p-row-name">{r.name}</span>
                  <span className="p-row-unit">per {r.unit}</span>
                </span>
                <span className="p-row-price">{r.price}</span>
                <span className={`p-chip ${r.dir}`}>{r.change}</span>
              </div>
            ))}
          </div>

          {/* bottom nav */}
          <div className="p-nav">
            <span className="p-nav-item active"><MiniHome /><em>Prices</em></span>
            <span className="p-nav-item"><MiniCompare /><em>Compare</em></span>
            <span className="p-nav-item"><MiniBell s={20} /><em>Alerts</em></span>
            <span className="p-home-bar" />
          </div>
        </div>
      </div>

      {/* floating cards */}
      <div className="float-card float-alert">
        <span className="float-icon"><MiniBell /></span>
        <span>
          <strong>Price alert</strong>
          Tomatoes up 5.8% at Chisokone
        </span>
      </div>
      <div className="float-card float-best">
        <span className="float-icon green"><MiniTrend /></span>
        <span>
          <strong>K365 for Maize</strong>
          Best market: Ndola Main
        </span>
      </div>
    </div>
  )
}
