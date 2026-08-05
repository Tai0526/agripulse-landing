// Hand-drawn stroke icons, lucide-style. All inherit currentColor.
const base = {
  width: 26,
  height: 26,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export function LogoMark({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="currentColor" />
      <path
        d="M6 19h5l2.5-8 4.5 12 2.5-7H26"
        fill="none"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const IconLeaf = () => (
  <svg {...base}>
    <path d="M6 21C6 12 12 5 21 4c0 9-6 16-15 17z" />
    <path d="M6 21c3-6 7-10 12-13" />
  </svg>
)

export const IconTruck = () => (
  <svg {...base}>
    <rect x="1.5" y="6" width="13" height="10" rx="1.5" />
    <path d="M14.5 9.5h3.6l3.4 3.4V16h-7z" />
    <circle cx="6" cy="18" r="1.8" />
    <circle cx="17.5" cy="18" r="1.8" />
  </svg>
)

export const IconStore = () => (
  <svg {...base}>
    <path d="M4.5 9.5L6 4.5h12l1.5 5" />
    <path d="M4.5 9.5a2.4 2.4 0 0 0 4.8 0 2.4 2.4 0 0 0 4.8 0 2.4 2.4 0 0 0 4.9 0" />
    <path d="M5.5 12v7.5h13V12" />
    <path d="M9.5 19.5V14h5v5.5" />
  </svg>
)

export const IconEyeOff = () => (
  <svg {...base}>
    <path d="M3 3l18 18" />
    <path d="M10.5 5.2A10 10 0 0 1 12 5.1c5 0 9 4.4 10 6.9-.4 1-1.4 2.5-2.9 3.8" />
    <path d="M6.5 6.6C4.1 8.1 2.6 10.4 2 12c1 2.5 5 6.9 10 6.9 1.7 0 3.3-.5 4.7-1.3" />
    <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
  </svg>
)

export const IconSwings = () => (
  <svg {...base}>
    <path d="M3 5.5l6.5 6.5 4-4 7.5 7.5" />
    <path d="M21 10v5.5h-5.5" />
  </svg>
)

export const IconRoute = () => (
  <svg {...base}>
    <circle cx="5.5" cy="18.5" r="2" />
    <circle cx="17.8" cy="4.8" r="2" />
    <path d="M7.5 18.5H14a3.5 3.5 0 0 0 0-7h-4a3.4 3.4 0 0 1-.2-6.8" />
  </svg>
)

export const IconBell = () => (
  <svg {...base}>
    <path d="M18 16v-5a6 6 0 1 0-12 0v5l-2 3h16z" />
    <path d="M10.5 21.5a2 2 0 0 0 3 0" />
  </svg>
)

export const IconChat = () => (
  <svg {...base}>
    <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)

export const IconChart = () => (
  <svg {...base}>
    <path d="M3 3v18h18" />
    <path d="M7 14l4-4 3 3 5-6" />
  </svg>
)

export const IconNetwork = () => (
  <svg {...base}>
    <circle cx="12" cy="5" r="2.4" />
    <circle cx="5" cy="19" r="2.4" />
    <circle cx="19" cy="19" r="2.4" />
    <path d="M11 7.2L6 16.8M13 7.2l5 9.6M7.5 19h9" />
  </svg>
)

export const IconDatabase = () => (
  <svg {...base}>
    <ellipse cx="12" cy="5" rx="8" ry="3" />
    <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
    <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
  </svg>
)

export const IconCard = () => (
  <svg {...base}>
    <rect x="2.5" y="5.5" width="19" height="13.5" rx="2" />
    <path d="M2.5 10h19" />
    <path d="M6.5 15h4" />
  </svg>
)
