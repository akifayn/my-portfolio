import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Tema değişkenleri index.css'te tanımlı (koyu: Stitch "Cyber-Minimalist" paleti)
        base: 'rgb(var(--bg) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        mut: 'rgb(var(--mut) / <alpha-value>)',
        dim: 'rgb(var(--dim) / <alpha-value>)',
        cyan: 'rgb(var(--cyan) / <alpha-value>)',
        pink: 'rgb(var(--pink) / <alpha-value>)',
        gold: 'rgb(var(--gold) / <alpha-value>)',
        // Solid buton rengi — her iki temada da siyah metinle kullanılır
        cyanbright: '#00E5FF',
        terminal: '#0B0F14',
      },
      fontFamily: {
        display: ['Geist', 'Inter', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 15px rgba(0, 218, 243, 0.2)',
        'glow-cyan-strong': '0 0 25px rgba(0, 218, 243, 0.4)',
        'glow-pink': '0 0 20px rgba(255, 45, 85, 0.4)',
        'glow-segment-cyan': '0 0 8px rgba(0, 218, 243, 0.5)',
        'glow-segment-pink': '0 0 8px rgba(255, 45, 85, 0.5)',
        'glow-segment-gold': '0 0 8px rgba(243, 191, 38, 0.5)',
        'glow-segment-white': '0 0 8px rgba(255, 255, 255, 0.5)',
      },
    },
  },
  plugins: [typography],
}
