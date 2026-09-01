import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Tema değişkenleri index.css'te tanımlı (Stitch "Studio Neura" obsidian/indigo paleti)
        base: 'rgb(var(--bg) / <alpha-value>)',
        'surface-bright': 'rgb(var(--surface-bright) / <alpha-value>)',
        'surface-container-low': 'rgb(var(--surface-container-low) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        mut: 'rgb(var(--mut) / <alpha-value>)',
        dim: 'rgb(var(--dim) / <alpha-value>)',
        cyan: 'rgb(var(--cyan) / <alpha-value>)',
        danger: 'rgb(var(--danger) / <alpha-value>)',
        // Solid buton rengi — Stitch'in primary-container tonu, her iki temada beyaz metinle kullanılır
        cyanbright: '#5B5BD6',
        terminal: '#131314',
      },
      fontFamily: {
        display: ['Sora', 'Inter', 'sans-serif'],
        sans: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        editorial: ['"Playfair Display"', 'serif'],
        script: ['Caveat', 'cursive'],
      },
      boxShadow: {
        'glow-cyan': '0 0 15px rgba(91, 91, 214, 0.25)',
        'glow-cyan-strong': '0 0 25px rgba(91, 91, 214, 0.45)',
      },
    },
  },
  plugins: [typography],
}
