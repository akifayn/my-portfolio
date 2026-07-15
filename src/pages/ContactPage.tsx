import { useTranslation } from 'react-i18next'
import ContactForm from '../components/ContactForm'
import Emblem from '../components/Emblem'

const CONTACT_EMAIL = 'akifayan98@gmail.com'

export default function ContactPage() {
  const { t } = useTranslation()

  return (
    <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="mb-4 flex items-center gap-3 font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">
        <Emblem className="h-8 w-8 text-crimson" />
        {t('contact.title')}
      </h1>
      <p className="mb-10 text-inkdark/70 dark:text-muted">{t('contact.subtitle')}</p>

      <ContactForm />

      <p className="mt-10 text-sm text-inkdark/60 dark:text-muted">
        {t('contact.emailDirect')}{' '}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="font-mono text-volt underline-offset-4 hover:underline"
        >
          {CONTACT_EMAIL}
        </a>
      </p>
    </section>
  )
}
