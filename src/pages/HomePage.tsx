import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import ClosingCta from '../components/ClosingCta'
import CoreCapabilities from '../components/CoreCapabilities'
import KineticStats from '../components/KineticStats'
import LiveClock from '../components/LiveClock'
import ProjectGalleryCard from '../components/ProjectGalleryCard'
import Reveal from '../components/Reveal'
import SkillBadge from '../components/SkillBadge'
import TechStackGrid from '../components/TechStackGrid'
import WorkingStyle from '../components/WorkingStyle'
import { useProjects } from '../hooks/useProjects'
import { useSkills } from '../hooks/useSkills'
import type { SkillCategory } from '../types/database.types'

const CATEGORY_ORDER: SkillCategory[] = ['frontend', 'backend', 'devops', 'other']
const EXPERIENCE_SINCE = 2023

const heroContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const heroItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

function SectionTitle({ label }: { label: string }) {
  return (
    <h2 className="mb-12 flex items-center gap-4 font-display text-2xl font-semibold uppercase tracking-tight sm:text-3xl">
      <span className="h-8 w-2 bg-cyan" aria-hidden="true" />
      {label}
    </h2>
  )
}

export default function HomePage() {
  const { t } = useTranslation()
  const { projects, loading: projectsLoading, error: projectsError } = useProjects(true)
  const { skills, loading: skillsLoading, error: skillsError } = useSkills()
  const reduceMotion = useReducedMotion()

  const categories = CATEGORY_ORDER.filter((category) =>
    skills.some((skill) => skill.category === category),
  )

  // Başlığın son kelimesi neon vurgu alır ("HI, I'M AKIF." → AKIF. camgöbeği)
  const titleWords = t('hero.title').trim().split(' ')
  const titleLast = titleWords.pop()
  const titleRest = titleWords.join(' ')

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Sol kenarda döner "açığım" etiketi — referanstaki rozet */}
        <div
          className="pointer-events-none absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 lg:block"
          aria-hidden="true"
        >
          <div className="-rotate-90">
            <span className="flex items-center gap-2 whitespace-nowrap rounded-b-md border border-t-0 border-cyan/30 bg-base px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-cyan">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
              {t('hero.openToWork')}
            </span>
          </div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroContainer}
          className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-6 px-4 py-24 sm:px-6 sm:py-32 md:grid-cols-12 md:min-h-[80vh]"
        >
          <div className="space-y-8 md:col-span-8 lg:ml-36 xl:ml-20 2xl:ml-0">
            <div className="space-y-6">
              <motion.div variants={heroItem} className="flex flex-wrap items-center gap-3">
                <p className="font-mono text-sm uppercase tracking-widest text-cyan">
                  {t('hero.eyebrow')}
                </p>
                <span className="hidden h-3 w-px bg-dim/30 sm:block" aria-hidden="true" />
                <LiveClock />
              </motion.div>
              <motion.h1
                variants={heroItem}
                className="font-display text-4xl font-bold uppercase leading-[1.1] tracking-[-0.04em] sm:text-6xl lg:text-7xl"
              >
                {titleRest} <span className="text-cyan">{titleLast}</span>
              </motion.h1>
              <motion.p variants={heroItem} className="max-w-xl text-lg leading-relaxed text-mut">
                {t('hero.subtitle')}
              </motion.p>
            </div>
            <motion.div variants={heroItem} className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/projects"
                className="group flex items-center gap-2 rounded bg-cyanbright px-8 py-4 font-sans text-xs font-bold uppercase tracking-[0.1em] text-white shadow-glow-cyan transition-all hover:scale-[1.03] hover:shadow-glow-cyan-strong"
              >
                {t('hero.ctaProjects')}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                to="/contact"
                className="rounded border border-ink/10 px-8 py-4 font-sans text-xs font-bold uppercase tracking-[0.1em] text-ink backdrop-blur-sm transition-all hover:scale-[1.03] hover:bg-surface-container-low dark:border-white/10 dark:text-white"
              >
                {t('hero.ctaContact')}
              </Link>
            </motion.div>
          </div>
          {/* Soyut görsel vurgu: yavaşça dönen iç içe neon çerçeveler */}
          <motion.div variants={heroItem} className="hidden justify-end md:col-span-4 md:flex">
            <div className="relative h-56 w-56 lg:h-64 lg:w-64">
              <motion.div
                className="absolute inset-0 rounded-full bg-cyan/20 blur-[100px]"
                aria-hidden="true"
                animate={reduceMotion ? undefined : { scale: [1, 1.15, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="relative flex h-full w-full items-center justify-center">
                <motion.div
                  className="h-36 w-36 border-[16px] border-cyan/30 lg:h-40 lg:w-40"
                  aria-hidden="true"
                  initial={{ rotate: -12, x: 30 }}
                  animate={reduceMotion ? { rotate: -12, x: 30 } : { rotate: [-12, 8, -12] }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute h-36 w-36 border-[16px] border-cyan lg:h-40 lg:w-40"
                  aria-hidden="true"
                  initial={{ x: -16, y: 16 }}
                  animate={reduceMotion ? { x: -16, y: 16 } : { rotate: [0, -10, 0], x: [-16, -26, -16] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Dev "hayalet" tipografi şeridi: referanstaki kayan başlık dokusu */}
        {skills.length > 0 && (
          <div className="relative overflow-hidden border-y border-ink/10 py-3 dark:border-white/10">
            <div className="flex overflow-hidden">
              <div className="marquee-track-slow flex shrink-0 items-center gap-10 pr-10">
                {[...skills, ...skills].map((skill, index) => (
                  <span
                    key={`${skill.id}-${index}`}
                    className="whitespace-nowrap font-display text-4xl font-black uppercase leading-none tracking-tight text-ink/[0.07] sm:text-6xl dark:text-white/[0.07]"
                  >
                    {skill.name} <span className="text-cyan/40">·</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      <TechStackGrid skills={skills} />

      <CoreCapabilities />

      <WorkingStyle />

      {/* Temel Odak — editöryal alıntı */}
      <Reveal className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-cyan">
          {t('focus.eyebrow')}
        </p>
        <p className="max-w-4xl font-editorial text-3xl italic leading-tight text-ink sm:text-5xl">
          “{t('focus.quote')}”
        </p>
        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-ink/10 pt-10 dark:border-white/10 sm:grid-cols-2">
          <div>
            <h3 className="mb-3 font-sans text-xs font-bold uppercase tracking-[0.2em] text-dim">
              {t('focus.scopeTitle')}
            </h3>
            <p className="text-base leading-relaxed text-mut">{t('focus.scopeBody')}</p>
          </div>
          <div>
            <h3 className="mb-3 font-sans text-xs font-bold uppercase tracking-[0.2em] text-dim">
              {t('focus.approachTitle')}
            </h3>
            <p className="text-base leading-relaxed text-mut">{t('focus.approachBody')}</p>
          </div>
        </div>
        <p className="mt-10 font-script text-4xl text-cyan" aria-hidden="true">
          Akif
        </p>
      </Reveal>

      {/* Rakamlarla — pinlenip yatay kayan kinetik başlık */}
      <KineticStats
        projectsCount={projects.length}
        skillsCount={skills.length}
        experienceYears={new Date().getFullYear() - EXPERIENCE_SINCE}
        gpa={3.1}
      />

      {/* Hakkımda */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <SectionTitle label={t('about.title')} />
        </Reveal>
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4 lg:col-span-3" delay={0.1}>
            <div className="glass-panel group relative overflow-hidden rounded-xl p-4">
              <img
                src="https://avatars.githubusercontent.com/u/138572294?v=4"
                alt={t('about.photoAlt')}
                width="160"
                height="160"
                loading="lazy"
                className="aspect-square w-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </Reveal>
          <Reveal className="space-y-8 md:col-span-8 lg:col-span-9" delay={0.15}>
            <div className="max-w-2xl space-y-6">
              <p className="text-lg leading-relaxed text-mut">{t('about.p1')}</p>
              <a
                href="/cv/muhammet-akif-ayan-cv.pdf"
                download
                className="inline-flex items-center gap-2 rounded border border-ink/10 px-8 py-4 font-sans text-xs font-bold uppercase tracking-[0.1em] text-ink transition-all hover:bg-surface-container-low dark:border-white/10 dark:text-white"
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M8 2v8m0 0 3-3m-3 3L5 7M3 13h10" />
                </svg>
                {t('about.downloadCv')}
              </a>
            </div>

            <div className="pt-4">
              {/* Eğitim + Dil + Hobiler */}
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="mb-6 font-sans text-xs font-bold uppercase tracking-[0.2em] text-dim">
                    {t('about.education.title')}
                  </h3>
                  <div className="glass-panel space-y-2 rounded-lg border-l-4 !border-l-cyan p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-display text-lg font-semibold uppercase tracking-tight">
                        {t('about.education.school')}
                      </p>
                      <span className="font-mono text-xs text-dim">
                        {t('about.education.period')}
                      </span>
                    </div>
                    <p className="text-sm text-mut">{t('about.education.degree')}</p>
                    <p className="font-mono text-sm text-cyan">{t('about.education.gpa')}</p>
                  </div>
                </div>

                <div>
                  <h3 className="mb-6 font-sans text-xs font-bold uppercase tracking-[0.2em] text-dim">
                    {t('about.languages.title')}
                  </h3>
                  <div className="glass-panel space-y-2 rounded-lg border-l-4 !border-l-cyan p-6">
                    <div className="flex items-center justify-between">
                      <p className="font-display text-lg font-semibold uppercase tracking-tight">
                        {t('about.languages.english')}
                      </p>
                      <span className="rounded-sm border-l-2 border-cyan bg-ink/5 px-2 py-1 font-mono text-xs text-cyan dark:bg-white/5">
                        {t('about.languages.englishLevel')}
                      </span>
                    </div>
                    <p className="text-sm text-mut">{t('about.languages.englishDetail')}</p>
                  </div>
                </div>

                <div>
                  <h3 className="mb-6 font-sans text-xs font-bold uppercase tracking-[0.2em] text-dim">
                    {t('about.hobbies.title')}
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {t('about.hobbies.list')
                      .split(',')
                      .map((hobby) => (
                        <li
                          key={hobby}
                          className="rounded-sm border-l-2 border-cyan bg-ink/5 px-2 py-1 font-mono text-xs text-ink/80 dark:bg-white/5"
                        >
                          {hobby.trim()}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Süreç / Kısa Tarihçe — Stitch "Studio Neura" Process sayfasının merkez çizgili düzeni */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <Reveal>
          <SectionTitle label={t('about.timeline.title')} />
        </Reveal>
        <div className="relative">
          <div
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-ink/15 to-transparent dark:via-white/15 md:block"
            aria-hidden="true"
          />
          <ol className="space-y-8 md:space-y-14">
            {(['uni', 'trt', 'saski', 'hubtuam', 'grad'] as const).map((key, index) => {
              const isLeft = index % 2 === 0
              return (
                <Reveal key={key} delay={index * 0.04}>
                  <li className="relative flex flex-col items-center md:flex-row md:justify-between">
                    <div className={`w-full md:w-5/12 ${isLeft ? 'md:order-1' : 'md:order-3'}`}>
                      <div
                        className={`glass-panel rounded-lg p-6 sm:p-8 ${isLeft ? 'md:text-right' : 'md:text-left'}`}
                      >
                        <p className="mb-1 font-mono text-xs uppercase tracking-[0.2em] text-cyan">
                          {t(`about.timeline.${key}.year`)}
                        </p>
                        <h3 className="font-display text-lg font-semibold uppercase tracking-tight">
                          {t(`about.timeline.${key}.heading`)}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-mut">
                          {t(`about.timeline.${key}.desc`)}
                        </p>
                      </div>
                    </div>
                    <span
                      className="relative z-10 my-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-cyan bg-base shadow-glow-cyan md:order-2 md:my-0"
                      aria-hidden="true"
                    >
                      <span className="h-2 w-2 rounded-full bg-cyan" />
                    </span>
                    <div className={`hidden w-5/12 md:block ${isLeft ? 'md:order-3' : 'md:order-1'}`} />
                  </li>
                </Reveal>
              )
            })}
          </ol>
        </div>
      </section>

      {/* Beceriler */}
      <section className="bg-white/40 py-16 dark:bg-[#1c1b1c]/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <SectionTitle label={t('skills.title')} />
          </Reveal>

          {skillsLoading && <p className="text-sm text-dim">{t('common.loading')}</p>}
          {skillsError && (
            <p className="text-sm text-dim">
              {t(skillsError === 'notConfigured' ? 'common.notConfigured' : 'common.fetchFailed')}
            </p>
          )}

          <motion.div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0 }}
            variants={staggerContainer}
          >
            {categories.map((category) => (
              <motion.div key={category} variants={staggerItem} className="space-y-6">
                <h3 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-dim">
                  {t(`skills.category.${category}`)}
                </h3>
                <div className="flex flex-col gap-4">
                  {skills
                    .filter((skill) => skill.category === category)
                    .map((skill) => (
                      <SkillBadge key={skill.id} skill={skill} />
                    ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Öne çıkan projeler */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 className="flex items-center gap-4 font-display text-2xl font-semibold uppercase tracking-tight sm:text-3xl">
            <span className="h-8 w-2 bg-cyan" aria-hidden="true" />
            {t('projects.featured')}
          </h2>
          <Link
            to="/projects"
            className="group flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.1em] text-cyan"
          >
            {t('projects.viewAll')}
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              ↗
            </span>
          </Link>
        </Reveal>

        {projectsLoading && <p className="text-sm text-dim">{t('common.loading')}</p>}
        {projectsError && (
          <p className="text-sm text-dim">
            {t(projectsError === 'notConfigured' ? 'common.notConfigured' : 'common.fetchFailed')}
          </p>
        )}
        {!projectsLoading && !projectsError && projects.length === 0 && (
          <p className="text-sm text-dim">{t('projects.empty')}</p>
        )}

        <motion.div
          className="grid gap-6 sm:grid-cols-2"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={staggerItem} className="aspect-[4/3]">
              <ProjectGalleryCard project={project} large className="h-full w-full" />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <ClosingCta skills={skills} />
    </>
  )
}
