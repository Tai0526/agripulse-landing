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

export const MiniBell = ({ s = 15 }) => (
  <svg {...mini} width={s} height={s}>
    <path d="M18 16v-5a6 6 0 1 0-12 0v5l-2 3h16z" />
    <path d="M10.5 21.5a2 2 0 0 0 3 0" />
  </svg>
)
const MiniTrend = ({ s = 14 }) => (
  <svg {...mini} width={s} height={s}>
    <path d="M3 17l6-6 4 4 8-8" />
    <path d="M15 7h6v6" />
  </svg>
)
const MiniHome = ({ s = 19 }) => (
  <svg {...mini} width={s} height={s}>
    <path d="M3 11l9-8 9 8" />
    <path d="M5 9.5V21h14V9.5" />
  </svg>
)
const MiniPrices = ({ s = 19 }) => (
  <svg {...mini} width={s} height={s}>
    <path d="M4 20V10M10 20V4M16 20v-7M21 20H3" />
  </svg>
)
const MiniCompare = ({ s = 19 }) => (
  <svg {...mini} width={s} height={s}>
    <path d="M8 3v18M16 3v18" />
    <path d="M8 7H3M21 17h-5" />
  </svg>
)
const MiniStar = ({ s = 19 }) => (
  <svg {...mini} width={s} height={s}>
    <path d="M12 3l2.7 5.6 6.3.8-4.6 4.3 1.2 6.1-5.6-3-5.6 3 1.2-6.1L3 9.4l6.3-.8z" />
  </svg>
)

export function StatusBar() {
  return (
    <div className="p-status">
      <span className="p-time">9:41</span>
      <span className="p-island" />
      <span className="p-status-icons">
        <svg width="15" height="11" viewBox="0 0 16 12" aria-hidden="true"><rect x="0" y="7" width="3" height="5" rx="1" fill="currentColor"/><rect x="4.5" y="5" width="3" height="7" rx="1" fill="currentColor"/><rect x="9" y="2.5" width="3" height="9.5" rx="1" fill="currentColor"/><rect x="13.5" y="0" width="2.5" height="12" rx="1" fill="currentColor" opacity="0.35"/></svg>
        <svg width="20" height="11" viewBox="0 0 22 12" aria-hidden="true"><rect x="0.5" y="0.5" width="18" height="11" rx="3" fill="none" stroke="currentColor" opacity="0.5"/><rect x="2" y="2" width="13" height="8" rx="1.8" fill="currentColor"/><rect x="19.5" y="4" width="2" height="4" rx="1" fill="currentColor" opacity="0.5"/></svg>
      </span>
    </div>
  )
}

export function TabBar({ active = 'Home' }) {
  const tabs = [
    ['Home', MiniHome],
    ['Prices', MiniPrices],
    ['Compare', MiniCompare],
    ['Watchlist', MiniStar],
  ]
  return (
    <div className="p-nav">
      {tabs.map(([label, Icon]) => (
        <span key={label} className={`p-nav-item ${active === label ? 'active' : ''}`}>
          <Icon />
          <em>{label}</em>
        </span>
      ))}
      <span className="p-home-bar" />
    </div>
  )
}

const MOVERS = [
  { pic: '🥣', name: 'Cassava meal', town: 'Chipata', price: 'K140', change: '+7.7%', dir: 'up' },
  { pic: '🌽', name: 'Maize', town: 'Livingstone', price: 'K300', change: '-7.7%', dir: 'down' },
  { pic: '🧅', name: 'Onions', town: 'Chipata', price: 'K120', change: '-7.5%', dir: 'down' },
]

const PERFORMERS = [
  { pic: '🥣', name: 'Cassava meal', meta: 'Lusaka · K150', change: '+11.1%' },
  { pic: '🥔', name: 'Irish potatoes', meta: 'Lusaka · K155', change: '+10.7%' },
  { pic: '🍠', name: 'Sweet potatoes', meta: 'Lusaka · K110', change: '+10.0%' },
]

/** The app's actual Home screen, rebuilt in CSS so it stays razor sharp. */
export default function Phone() {
  return (
    <div className="phone-scene">
      <div className="phone">
        <div className="phone-screen">
          <StatusBar />

          {/* top bar: brand, bell, avatar */}
          <div className="p-header">
            <span className="p-brand">
              <span className="p-brand-mark"><LogoMark size={20} /></span>
              <span className="p-brand-col">
                AgriPulse
                <small>Thursday 27 August</small>
              </span>
            </span>
            <span className="p-header-right">
              <span className="p-bell"><MiniBell /><i /></span>
              <span className="p-avatar">CM</span>
            </span>
          </div>

          <div className="p-title-row">
            <span className="p-title">Good morning, Chanda.</span>
            <span className="p-date">Here is what the markets are doing today.</span>
          </div>

          {/* crops / livestock toggle */}
          <div className="p-seg">
            <span className="p-seg-item active">Crops</span>
            <span className="p-seg-item">Livestock</span>
          </div>

          {/* market pulse */}
          <div className="p-pulse">
            <span className="p-pulse-kicker"><MiniTrend s={12} /> Market pulse</span>
            <span className="p-pulse-big">114 up · 130 down</span>
            <span className="p-pulse-sub">across 320 crop prices tracked today</span>
            <span className="p-pulse-foot">
              <span className="p-pulse-foot-text">Top riser: 🥣 Cassava meal in Chipata</span>
              <strong>+7.7%</strong>
            </span>
          </div>

          {/* biggest movers */}
          <span className="p-section">Biggest movers</span>
          <div className="p-movers">
            {MOVERS.map((m) => (
              <div className="p-mover" key={m.name}>
                <span className="p-ava">{m.pic}</span>
                <span className="p-mover-name">{m.name}</span>
                <span className="p-mover-town">{m.town}</span>
                <span className="p-mover-price">{m.price}</span>
                <span className={`p-chip ${m.dir}`}>{m.change}</span>
              </div>
            ))}
          </div>

          {/* top performers */}
          <span className="p-section">Top performers this week</span>
          <div className="p-perf">
            {PERFORMERS.map((p, i) => (
              <div className="p-perf-row" key={p.name}>
                <span className="p-rank">{i + 1}</span>
                <span className="p-ava p-ava-sm">{p.pic}</span>
                <span className="p-row-body">
                  <span className="p-row-name">{p.name}</span>
                  <span className="p-row-unit">{p.meta}</span>
                </span>
                <span className="p-chip up">{p.change}</span>
              </div>
            ))}
          </div>

          <TabBar active="Home" />
        </div>
      </div>

      {/* floating alert */}
      <div className="float-card float-alert">
        <span className="float-icon"><MiniBell /></span>
        <span>
          <strong>Price alert</strong>
          Cassava meal up 7.7% at Chipata
        </span>
      </div>
    </div>
  )
}
