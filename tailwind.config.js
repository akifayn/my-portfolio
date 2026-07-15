import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        carbon: '#0B0C10',
        surface: '#13151C',
        elevated: '#1A1D26',
        frost: '#E9EAF0',
        muted: '#8A8FA3',
        crimson: '#FF2950',
        volt: '#00D9FF',
        paper: '#F2F3F5',
        inkdark: '#16181F',
      },
      fontFamily: {
        display: ['"Chakra Petch"', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'glow-crimson': '0 0 24px rgba(255, 41, 80, 0.35)',
        'glow-volt': '0 0 24px rgba(0, 217, 255, 0.25)',
      },
    },
  },
  plugins: [typography],
}
