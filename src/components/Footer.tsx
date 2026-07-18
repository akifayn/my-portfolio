import { useTranslation } from 'react-i18next'

const GITHUB_URL = 'https://github.com/akifayn'
const LINKEDIN_URL = 'https://www.linkedin.com/in/muhammet-akif-ayan'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-ink/10 bg-base/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 sm:flex-row sm:justify-between sm:px-6">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <span className="font-display text-base font-bold tracking-tighter text-cyan">
            AKIF AYAN
          </span>
          <span className="text-sm text-mut">
            © {new Date().getFullYear()} Muhammet Akif Ayan · {t('footer.builtWith')}
          </span>
        </div>
        <div className="flex gap-8 font-mono text-xs tracking-[0.05em]">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="text-mut transition-all hover:-translate-y-1 hover:text-cyan"
          >
            {t('footer.github')}
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            className="text-mut transition-all hover:-translate-y-1 hover:text-cyan"
          >
            {t('footer.linkedin')}
          </a>
        </div>
      </div>
    </footer>
  )
}
