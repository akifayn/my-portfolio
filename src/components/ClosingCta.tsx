import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Skill } from '../types/database.types'

const CONTACT_EMAIL = 'akifayan98@gmail.com'

interface ClosingCtaProps {
  skills: Skill[]
}

export default function ClosingCta({ skills }: ClosingCtaProps) {
  const { t } = useTranslation()
  const reduceMotion = useReducedMotion()
  const words = t('cta.words').split(',').map((w) => w.trim())
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    if (reduceMotion || words.length < 2) return
    const id = setInterval(() => setWordIndex((i) => (i + 1) % words.length), 2200)
    return () => clearInterval(id)
  }, [reduceMotion, words.length])

  const roleBand = Array.from({ length: 6 }, () => t('hero.eyebrow')).join('  ·  ')
  const skillBand =
    skills.length > 0 ? Array.from({ length: 3 }, () => skills.map((s) => s.name).join('  ·  ')).join('  ·  ') : ''

  return (
    <section className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-x-0 top-10 -rotate-2 select-none overflow-hidden opacity-90">
        <div className="marquee-track flex shrink-0 whitespace-nowrap font-display text-2xl font-black uppercase tracking-tight text-ink/[0.06] sm:text-4xl dark:text-white/[0.06]">
          <span className="pr-8">{roleBand}</span>
          <span className="pr-8">{roleBand}</span>
        </div>
      </div>
      {skillBand && (
        <div className="pointer-events-none absolute inset-x-0 bottom-10 rotate-2 select-none overflow-hidden opacity-90">
          <div className="marquee-track-reverse flex shrink-0 whitespace-nowrap font-display text-2xl font-black uppercase tracking-tight text-cyan/[0.1] sm:text-4xl">
            <span className="pr-8">{skillBand}</span>
            <span className="pr-8">{skillBand}</span>
          </div>
        </div>
      )}

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2 className="font-display text-3xl font-black uppercase leading-tight tracking-tight sm:text-5xl">
          {t('cta.prefix')}{' '}
          <span className="inline-flex text-cyan">
            <AnimatePresence mode="wait">
              <motion.span
                key={words[wordIndex]}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {words[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>{' '}
          {t('cta.suffix')}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-mut">{t('cta.subtitle')}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="rounded bg-cyanbright px-8 py-4 font-sans text-xs font-bold uppercase tracking-[0.1em] text-white shadow-glow-cyan transition-all hover:scale-[1.03] hover:shadow-glow-cyan-strong"
          >
            {t('cta.hire')}
          </a>
          <a
            href="/cv/muhammet-akif-ayan-cv.pdf"
            download
            className="rounded border-2 border-cyan/30 px-8 py-4 font-sans text-xs font-bold uppercase tracking-[0.1em] text-cyan backdrop-blur-sm transition-all hover:scale-[1.03] hover:bg-cyan/10"
          >
            {t('cta.resume')}
          </a>
        </div>
      </div>
    </section>
  )
}
