// FeatureCube yüzleri için tek renkli (currentColor) sade ikonlar.

export function WifiIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M4 9a12 12 0 0 1 16 0" opacity="0.5" />
      <path d="M7 13a7.5 7.5 0 0 1 10 0" opacity="0.75" />
      <circle cx="12" cy="18" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function CpuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path d="M9 7V3M13 7V3M9 21v-4M13 21v-4M7 9H3M7 13H3M21 9h-4M21 13h-4" />
    </svg>
  )
}

export function RadarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="8" opacity="0.4" />
      <circle cx="12" cy="12" r="4.5" opacity="0.7" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function AtomIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="8.5" ry="3.2" />
      <ellipse cx="12" cy="12" rx="8.5" ry="3.2" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="8.5" ry="3.2" transform="rotate(120 12 12)" />
    </svg>
  )
}

export function BracketsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6 3 12l6 6M15 6l6 6-6 6" />
    </svg>
  )
}

export function HexagonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <path d="M12 2 21 7.5v9L12 22 3 16.5v-9Z" />
    </svg>
  )
}

export function BrainIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="6" cy="6" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="6" cy="18" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="18" cy="6" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="18" cy="18" r="1.8" fill="currentColor" stroke="none" />
      <path d="M6 6 12 12 6 18M18 6 12 12 18 18" />
    </svg>
  )
}

export function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      <rect x="4" y="13" width="4" height="8" rx="1" />
      <rect x="10" y="8" width="4" height="13" rx="1" />
      <rect x="16" y="3" width="4" height="18" rx="1" />
    </svg>
  )
}

export function TerminalIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 9l3 3-3 3M13 15h4" />
    </svg>
  )
}
