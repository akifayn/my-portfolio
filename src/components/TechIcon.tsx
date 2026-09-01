import type { ReactElement } from 'react'

// Beceri adına göre eşleşen basit marka ikonları — Tech Stack ızgarasında kullanılır.
// Piksel-mükemmel resmi logolar değil, tanınabilir sade SVG yorumlarıdır.

function ReactIcon({ color = '#61DAFB' }: { color?: string }) {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none">
      <circle cx="16" cy="16" r="2.4" fill={color} />
      <g stroke={color} strokeWidth="1.6">
        <ellipse cx="16" cy="16" rx="11" ry="4.2" />
        <ellipse cx="16" cy="16" rx="11" ry="4.2" transform="rotate(60 16 16)" />
        <ellipse cx="16" cy="16" rx="11" ry="4.2" transform="rotate(120 16 16)" />
      </g>
    </svg>
  )
}

function TypeScriptIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none">
      <rect x="2" y="2" width="28" height="28" rx="5" fill="#3178C6" />
      <text x="16" y="21" textAnchor="middle" fontSize="13" fontWeight="700" fill="white" fontFamily="monospace">
        TS
      </text>
    </svg>
  )
}

function NodeIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" stroke="#3C873A" strokeWidth="1.8" strokeLinejoin="round">
      <path d="M16 3 27 9.5v13L16 29 5 22.5v-13Z" />
      <path d="M16 3v26M5 9.5l11 6.5M27 9.5 16 16" opacity="0.5" />
    </svg>
  )
}

function PythonIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7">
      <defs>
        <clipPath id="py-clip">
          <rect x="2" y="2" width="28" height="28" rx="6" />
        </clipPath>
      </defs>
      <g clipPath="url(#py-clip)">
        <rect x="2" y="2" width="28" height="14" fill="#3776AB" />
        <rect x="2" y="16" width="28" height="14" fill="#FFD43B" />
      </g>
      <text x="16" y="20" textAnchor="middle" fontSize="11" fontWeight="700" fill="white" fontFamily="monospace">
        Py
      </text>
    </svg>
  )
}

function PostgresIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" stroke="#336791" strokeWidth="1.8">
      <ellipse cx="16" cy="9" rx="11" ry="5" />
      <path d="M5 9v14c0 2.8 4.9 5 11 5s11-2.2 11-5V9" />
      <path d="M5 16c0 2.8 4.9 5 11 5s11-2.2 11-5" opacity="0.6" />
    </svg>
  )
}

function SupabaseIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" fill="#3ECF8E">
      <path d="M18 3 6 19h9l-1 10 12-16h-9z" />
    </svg>
  )
}

function TailwindIcon() {
  return (
    <svg viewBox="0 0 32 20" className="h-6 w-9" fill="#38BDF8">
      <path d="M9 0C5.3 0 3 1.9 2 5.7 3.5 3.8 5.3 3.1 7.4 3.6c1.2.3 2.1 1.2 3.1 2.2C12.1 7.4 13.9 9 17.5 9c3.7 0 6-1.9 7-5.7-1.5 1.9-3.3 2.6-5.4 2.1-1.2-.3-2.1-1.2-3.1-2.2C14.4 1.6 12.6 0 9 0Z" />
      <path d="M2 9.9C-1.7 9.9-4 11.8-5 15.6c1.5-1.9 3.3-2.6 5.4-2.1 1.2.3 2.1 1.2 3.1 2.2C5.1 17.3 6.9 18.9 10.5 18.9c3.7 0 6-1.9 7-5.7-1.5 1.9-3.3 2.6-5.4 2.1-1.2-.3-2.1-1.2-3.1-2.2C7.4 11.5 5.6 9.9 2 9.9Z" transform="translate(7 0)" />
    </svg>
  )
}

function VercelIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-6 w-6">
      <path d="M16 5 29 27H3Z" className="fill-ink dark:fill-white" />
    </svg>
  )
}

function GitIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7 text-dim" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="9" cy="24" r="3" />
      <circle cx="9" cy="8" r="3" />
      <circle cx="23" cy="16" r="3" />
      <path d="M9 11v10M9 11c0 5 4 5 11 5" />
    </svg>
  )
}

function NeuralIcon({ color = '#F3BF26' }: { color?: string }) {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" stroke={color} strokeWidth="1.6">
      <circle cx="6" cy="9" r="2.4" fill={color} stroke="none" />
      <circle cx="6" cy="23" r="2.4" fill={color} stroke="none" />
      <circle cx="16" cy="16" r="2.4" fill={color} stroke="none" />
      <circle cx="26" cy="9" r="2.4" fill={color} stroke="none" />
      <circle cx="26" cy="23" r="2.4" fill={color} stroke="none" />
      <path d="M6 9 16 16 6 23M26 9 16 16 26 23" />
    </svg>
  )
}

function ChipIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" stroke="#0FB5AE" strokeWidth="1.7">
      <rect x="9" y="9" width="14" height="14" rx="2" />
      <path d="M13 9V4M19 9V4M13 28v-5M19 28v-5M9 13H4M9 19H4M28 13h-5M28 19h-5" />
    </svg>
  )
}

interface Match {
  test: RegExp
  render: () => ReactElement
}

const MATCHERS: Match[] = [
  { test: /react native/i, render: () => <ReactIcon color="#8B7CF6" /> },
  { test: /react/i, render: () => <ReactIcon /> },
  { test: /typescript/i, render: () => <TypeScriptIcon /> },
  { test: /node/i, render: () => <NodeIcon /> },
  { test: /python/i, render: () => <PythonIcon /> },
  { test: /postgre/i, render: () => <PostgresIcon /> },
  { test: /supabase/i, render: () => <SupabaseIcon /> },
  { test: /tailwind/i, render: () => <TailwindIcon /> },
  { test: /vercel/i, render: () => <VercelIcon /> },
  { test: /git/i, render: () => <GitIcon /> },
  { test: /(deep|machine)\s*learning|tensorflow|ai\b/i, render: () => <NeuralIcon /> },
  { test: /c\+\+|arduino|iot|esp8266|raspberry/i, render: () => <ChipIcon /> },
]

export function getTechIcon(name: string) {
  const match = MATCHERS.find((m) => m.test.test(name))
  return match ? match.render() : <ChipIcon />
}
