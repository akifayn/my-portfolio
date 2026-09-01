import { useRef, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { sendMessage } from '../services/messages.service'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

// Tasarım dili: alt çizgili minimal input; odakta camgöbeği parlar
const inputClass =
  'w-full border-0 border-b-2 border-ink/20 bg-transparent px-1 py-2 text-sm transition-all placeholder:text-dim focus:border-cyan focus:shadow-[0_8px_12px_-10px_rgba(0,218,243,0.5)] focus:ring-0 dark:border-white/20'

const MIN_FILL_SECONDS = 2

export default function ContactForm() {
  const { t } = useTranslation()
  const [status, setStatus] = useState<FormStatus>('idle')
  const mountedAt = useRef(Date.now())

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    // Honeypot: gerçek kullanıcılara görünmeyen alan doluysa ya da form
    // insan-imkânsızı bir hızda gönderildiyse sessizce yut (bot filtresi)
    const isBot =
      String(data.get('company')).trim() !== '' ||
      Date.now() - mountedAt.current < MIN_FILL_SECONDS * 1000
    if (isBot) {
      setStatus('success')
      form.reset()
      return
    }

    setStatus('sending')
    try {
      await sendMessage({
        name: String(data.get('name')).trim(),
        email: String(data.get('email')).trim(),
        subject: String(data.get('subject')).trim() || null,
        body: String(data.get('body')).trim(),
      })
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  const labelClass = 'font-sans text-xs font-bold uppercase tracking-[0.1em] text-dim'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>{t('contact.name')}</span>
          <input name="name" type="text" required maxLength={120} className={inputClass} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>{t('contact.email')}</span>
          <input name="email" type="email" required maxLength={200} className={inputClass} />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className={labelClass}>{t('contact.subject')}</span>
        <input name="subject" type="text" maxLength={200} className={inputClass} />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className={labelClass}>{t('contact.body')}</span>
        <textarea name="body" required rows={6} maxLength={4000} className={inputClass} />
      </label>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="self-start rounded bg-cyanbright px-8 py-4 font-sans text-xs font-bold uppercase tracking-[0.1em] text-white shadow-glow-cyan transition-all hover:scale-[1.03] hover:shadow-glow-cyan-strong disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
      >
        {status === 'sending' ? t('contact.sending') : t('contact.send')}
      </button>

      {status === 'success' && (
        <p role="status" className="font-mono text-sm text-cyan">
          {t('contact.success')}
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className="font-mono text-sm text-danger">
          {t('contact.error')}
        </p>
      )}
    </form>
  )
}
