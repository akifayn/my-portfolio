import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { sendMessage } from '../services/messages.service'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

const inputClass =
  'clip-notch w-full border border-inkdark/20 bg-white px-3 py-2 text-sm placeholder:text-inkdark/40 focus:border-volt dark:border-frost/20 dark:bg-surface dark:placeholder:text-muted'

export default function ContactForm() {
  const { t } = useTranslation()
  const [status, setStatus] = useState<FormStatus>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    setStatus('sending')
    try {
      await sendMessage({
        name: String(data.get('name')),
        email: String(data.get('email')),
        subject: String(data.get('subject')) || null,
        body: String(data.get('body')),
      })
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  const labelClass =
    'font-mono text-xs uppercase tracking-[0.15em] text-inkdark/60 dark:text-muted'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
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
        className="clip-notch self-start bg-crimson px-7 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.15em] text-white transition-all hover:shadow-glow-crimson disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'sending' ? t('contact.sending') : t('contact.send')}
      </button>

      {status === 'success' && (
        <p role="status" className="text-sm font-medium text-volt">
          {t('contact.success')}
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className="text-sm font-medium text-crimson">
          {t('contact.error')}
        </p>
      )}
    </form>
  )
}
