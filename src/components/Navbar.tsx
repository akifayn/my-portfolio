import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import Emblem from './Emblem'

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark)
  localStorage.setItem('theme', dark ? 'dark' : 'light')
}

function initialDark(): boolean {
  return localStorage.getItem('theme') !== 'light'
}

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [dark, setDark] = useState(initialDark)

  useEffect(() => {
    applyTheme(dark)
  }, [dark])

  const otherLang = i18n.resolvedLanguage === 'en' ? 'tr' : 'en'

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `font-mono text-xs uppercase tracking-[0.15em] transition-colors hover:text-crimson ${
      isActive ? 'text-crimson' : 'text-inkdark/70 dark:text-muted'
    }`

  return (
    <header className="sticky top-0 z-10 border-b border-inkdark/10 bg-paper/90 backdrop-blur dark:border-frost/10 dark:bg-carbon/90">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <NavLink to="/" className="flex items-center gap-2">
          <Emblem className="h-7 w-7 text-crimson" />
          <span className="font-display text-lg font-bold uppercase tracking-wider">
            Akif Ayan
          </span>
        </NavLink>

        <div className="flex items-center gap-4 sm:gap-6">
          <NavLink to="/" end className={linkClass}>
            {t('nav.home')}
          </NavLink>
          <NavLink to="/projects" className={linkClass}>
            {t('nav.projects')}
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            {t('nav.contact')}
          </NavLink>

          <button
            type="button"
            onClick={() => i18n.changeLanguage(otherLang)}
            aria-label={t('nav.language')}
            className="clip-notch border border-inkdark/20 bg-transparent px-2.5 py-1 font-mono text-xs font-medium uppercase transition-colors hover:border-crimson hover:text-crimson dark:border-frost/20"
          >
            {otherLang}
          </button>

          <button
            type="button"
            onClick={() => setDark((d) => !d)}
            aria-label={dark ? t('nav.themeLight') : t('nav.themeDark')}
            className="text-inkdark/70 transition-colors hover:text-crimson dark:text-muted"
          >
            {dark ? (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </header>
  )
}
