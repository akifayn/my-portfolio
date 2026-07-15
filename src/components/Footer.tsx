import { useTranslation } from 'react-i18next'
import Emblem from './Emblem'

const GITHUB_URL = 'https://github.com/akifayn'
const LINKEDIN_URL = 'https://www.linkedin.com/in/muhammet-akif-ayan'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-inkdark/10 dark:border-frost/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-8 sm:flex-row sm:justify-between sm:px-6">
        <div className="flex items-center gap-2 text-sm text-inkdark/60 dark:text-muted">
          <Emblem className="h-4 w-4 text-crimson" />
          <span>
            © {new Date().getFullYear()} Muhammet Akif Ayan · {t('footer.builtWith')}
          </span>
        </div>
        <div className="flex gap-5 font-mono text-xs uppercase tracking-[0.15em]">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="text-inkdark/70 transition-colors hover:text-crimson dark:text-muted"
          >
            {t('footer.github')}
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            className="text-inkdark/70 transition-colors hover:text-crimson dark:text-muted"
          >
            {t('footer.linkedin')}
          </a>
        </div>
      </div>
    </footer>
  )
}
