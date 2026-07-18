import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import SkillBadge from '../components/SkillBadge'
import { useProjects } from '../hooks/useProjects'
import { useSkills } from '../hooks/useSkills'
import type { SkillCategory } from '../types/database.types'

const CATEGORY_ORDER: SkillCategory[] = ['frontend', 'backend', 'devops', 'other']

function SectionTitle({ label, accent = 'pink' }: { label: string; accent?: 'pink' | 'cyan' }) {
  return (
    <h2 className="mb-12 flex items-center gap-4 font-display text-2xl font-semibold uppercase tracking-tight sm:text-3xl">
      <span
        className={`h-8 w-2 ${accent === 'pink' ? 'bg-pink' : 'bg-cyan'}`}
        aria-hidden="true"
      />
      {label}
    </h2>
  )
}

export default function HomePage() {
  const { t } = useTranslation()
  const { projects, loading: projectsLoading, error: projectsError } = useProjects(true)
  const { skills, loading: skillsLoading, error: skillsError } = useSkills()

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
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-6 px-4 py-24 sm:px-6 sm:py-32 md:grid-cols-12 md:min-h-[80vh]">
          <div className="space-y-8 md:col-span-7">
            <div className="space-y-4">
              <p className="font-mono text-sm uppercase tracking-widest text-cyan">
                {t('hero.eyebrow')}
              </p>
              <h1 className="font-display text-4xl font-bold uppercase leading-tight tracking-[-0.02em] sm:text-6xl">
                {titleRest} <span className="text-cyan">{titleLast}</span>
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-mut">
                {t('hero.subtitle')}
              </p>
            </div>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/projects"
                className="group flex items-center gap-2 rounded bg-cyanbright px-8 py-4 font-sans text-xs font-bold uppercase tracking-[0.1em] text-terminal shadow-glow-cyan transition-all hover:shadow-glow-cyan-strong"
              >
                {t('hero.ctaProjects')}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                to="/contact"
                className="rounded border-2 border-cyan/30 px-8 py-4 font-sans text-xs font-bold uppercase tracking-[0.1em] text-cyan backdrop-blur-sm transition-all hover:bg-cyan/10"
              >
                {t('hero.ctaContact')}
              </Link>
            </div>
          </div>
          {/* Soyut görsel vurgu: iç içe geçmiş neon çerçeveler */}
          <div className="hidden justify-end md:col-span-5 md:flex">
            <div className="relative h-80 w-80">
              <div
                className="absolute inset-0 rounded-full bg-cyan/20 blur-[100px]"
                aria-hidden="true"
              />
              <div className="relative flex h-full w-full items-center justify-center">
                <div
                  className="h-48 w-48 -rotate-12 translate-x-10 border-[20px] border-pink/40"
                  aria-hidden="true"
                />
                <div
                  className="absolute h-48 w-48 translate-x-[-20px] translate-y-[20px] border-[20px] border-cyan"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hakkımda */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionTitle label={t('about.title')} accent="pink" />
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12">
          <div className="md:col-span-4 lg:col-span-3">
            <div className="glass-panel group relative overflow-hidden rounded-xl p-4">
              <img
                src="https://avatars.githubusercontent.com/u/138572294?v=4"
                alt={t('about.photoAlt')}
                width="160"
                height="160"
                loading="lazy"
                className="aspect-square w-full rounded-lg object-cover"
              />
            </div>
          </div>
          <div className="space-y-8 md:col-span-8 lg:col-span-9">
            <div className="max-w-2xl space-y-6">
              <p className="text-lg leading-relaxed text-mut">{t('about.p1')}</p>
              <a
                href="/cv/muhammet-akif-ayan-cv.pdf"
                download
                className="inline-flex items-center gap-2 rounded bg-pink px-8 py-4 font-sans text-xs font-bold uppercase tracking-[0.1em] text-white transition-all hover:shadow-glow-pink"
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

            <div className="grid grid-cols-1 gap-12 pt-4 lg:grid-cols-2">
              {/* Eğitim + Dil + Hobiler */}
              <div className="space-y-8">
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
                  <div className="glass-panel space-y-2 rounded-lg border-l-4 !border-l-pink p-6">
                    <div className="flex items-center justify-between">
                      <p className="font-display text-lg font-semibold uppercase tracking-tight">
                        {t('about.languages.english')}
                      </p>
                      <span className="rounded-sm border-l-2 border-pink bg-ink/5 px-2 py-1 font-mono text-xs text-pink dark:bg-white/5">
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

              {/* Kısa tarihçe */}
              <div>
                <h3 className="mb-6 font-sans text-xs font-bold uppercase tracking-[0.2em] text-dim">
                  {t('about.timeline.title')}
                </h3>
                <ol className="relative space-y-6 before:absolute before:bottom-2 before:left-[11px] before:top-2 before:w-[2px] before:bg-ink/15 dark:before:bg-white/15">
                  {(['uni', 'trt', 'saski', 'hubtuam', 'grad'] as const).map((key, index) => (
                    <li key={key} className="relative pl-8">
                      <span
                        className={`absolute left-0 top-1.5 h-6 w-6 rotate-45 rounded-sm border-2 bg-base ${
                          index % 2 === 0 ? 'border-pink' : 'border-cyan'
                        }`}
                        aria-hidden="true"
                      />
                      <p
                        className={`mb-1 font-mono text-xs ${
                          index % 2 === 0 ? 'text-pink' : 'text-cyan'
                        }`}
                      >
                        {t(`about.timeline.${key}.year`)}
                      </p>
                      <p className="font-sans font-bold uppercase tracking-wide">
                        {t(`about.timeline.${key}.heading`)}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-mut">
                        {t(`about.timeline.${key}.desc`)}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beceriler */}
      <section className="bg-white/40 py-16 dark:bg-[#151d1e]/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle label={t('skills.title')} accent="cyan" />

          {skillsLoading && <p className="text-sm text-dim">{t('common.loading')}</p>}
          {skillsError && (
            <p className="text-sm text-dim">
              {t(skillsError === 'notConfigured' ? 'common.notConfigured' : 'common.fetchFailed')}
            </p>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <div key={category} className="space-y-6">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Öne çıkan projeler */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 className="flex items-center gap-4 font-display text-2xl font-semibold uppercase tracking-tight sm:text-3xl">
            <span className="h-8 w-2 bg-pink" aria-hidden="true" />
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
        </div>

        {projectsLoading && <p className="text-sm text-dim">{t('common.loading')}</p>}
        {projectsError && (
          <p className="text-sm text-dim">
            {t(projectsError === 'notConfigured' ? 'common.notConfigured' : 'common.fetchFailed')}
          </p>
        )}
        {!projectsLoading && !projectsError && projects.length === 0 && (
          <p className="text-sm text-dim">{t('projects.empty')}</p>
        )}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </>
  )
}
