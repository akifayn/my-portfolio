import { useTranslation } from 'react-i18next'
import ContactForm from '../components/ContactForm'
import Reveal from '../components/Reveal'

const CONTACT_EMAIL = 'akifayan98@gmail.com'

export default function ContactPage() {
  const { t } = useTranslation()

  return (
    <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <Reveal>
        <h1 className="mb-4 flex items-center gap-4 font-display text-3xl font-bold uppercase tracking-[-0.02em] sm:text-4xl">
          <span className="h-10 w-2 bg-cyan" aria-hidden="true" />
          {t('contact.title')}
        </h1>
        <p className="mb-10 text-lg leading-relaxed text-mut">{t('contact.subtitle')}</p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="glass-panel relative overflow-hidden rounded-xl p-6 sm:p-10">
          <div
            className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-cyan/20 blur-[100px]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-cyan/10 blur-[100px]"
            aria-hidden="true"
          />
          <div className="relative">
            <ContactForm />
          </div>
        </div>
      </Reveal>

      <p className="mt-10 text-sm text-dim">
        {t('contact.emailDirect')}{' '}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="font-mono text-cyan underline-offset-4 hover:underline"
        >
          {CONTACT_EMAIL}
        </a>
      </p>
    </section>
  )
}
