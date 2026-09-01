import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import StatCounter from './StatCounter'

interface KineticStatsProps {
  projectsCount: number
  skillsCount: number
  experienceYears: number
  gpa: number
}

// Referanstaki "pinlenip yatay kayan dev başlık" efekti: dikey scroll, yatay harekete dönüşür.
// prefers-reduced-motion'da pin/scroll-jack tamamen devre dışı, içerik normal akışta okunur.
export default function KineticStats({
  projectsCount,
  skillsCount,
  experienceYears,
  gpa,
}: KineticStatsProps) {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const x = useTransform(scrollYProgress, [0, 1], ['4%', '-82%'])

  const lines = [
    t('stats.kinetic.line1'),
    t('stats.kinetic.line2'),
    t('stats.kinetic.line3'),
    t('stats.kinetic.line4'),
  ]

  const statItems = [
    { value: projectsCount, decimals: 0, suffix: '', label: t('stats.projects') },
    { value: skillsCount, decimals: 0, suffix: '', label: t('stats.skills') },
    { value: experienceYears, decimals: 0, suffix: '+', label: t('stats.experience') },
    { value: gpa, decimals: 2, suffix: '', label: t('stats.gpa') },
  ]

  if (reduceMotion) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-dim">
          {t('stats.eyebrow')}
        </p>
        <div className="space-y-1">
          {lines.map((line) => (
            <p
              key={line}
              className="font-display text-3xl font-bold uppercase leading-tight sm:text-5xl"
            >
              {line}
            </p>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {statItems.map((item) => (
            <div key={item.label}>
              <div className="font-display text-4xl font-bold text-cyan sm:text-5xl">
                <StatCounter value={item.value} decimals={item.decimals} suffix={item.suffix} />
              </div>
              <p className="mt-2 text-sm text-mut">{item.label}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section ref={containerRef} className="relative h-[240vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex w-max items-center gap-16 pl-[8vw]">
          <p
            className="shrink-0 font-mono text-xs uppercase tracking-[0.3em] text-dim [writing-mode:vertical-rl]"
            aria-hidden="true"
          >
            {t('stats.eyebrow')}
          </p>
          {lines.map((line, index) => (
            <p
              key={line}
              className={`shrink-0 font-display text-6xl font-bold uppercase leading-none sm:text-8xl ${
                index % 2 === 0 ? 'text-ink' : 'text-ink/25'
              }`}
            >
              {line}
            </p>
          ))}
          <div className="flex shrink-0 gap-10 rounded-2xl border border-ink/10 bg-ink/[0.02] px-10 py-10 dark:border-white/10 dark:bg-white/[0.02] sm:gap-14 sm:px-14">
            {statItems.map((item) => (
              <div key={item.label}>
                <div className="font-display text-5xl font-bold text-cyan">
                  <StatCounter value={item.value} decimals={item.decimals} suffix={item.suffix} />
                </div>
                <p className="mt-2 whitespace-nowrap text-sm text-mut">{item.label}</p>
              </div>
            ))}
          </div>
          <span className="sr-only">{t('stats.eyebrow')}</span>
        </motion.div>
      </div>
    </section>
  )
}
