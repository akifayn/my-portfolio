import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Emblem from '../components/Emblem'
import ProjectCard from '../components/ProjectCard'
import SkillBadge from '../components/SkillBadge'
import { useProjects } from '../hooks/useProjects'
import { useSkills } from '../hooks/useSkills'
import type { SkillCategory } from '../types/database.types'

const CATEGORY_ORDER: SkillCategory[] = ['frontend', 'backend', 'devops', 'other']

function SectionTitle({ label }: { label: string }) {
  return (
    <h2 className="mb-8 flex items-center gap-3 font-display text-2xl font-bold uppercase tracking-wide">
      <Emblem className="h-6 w-6 text-crimson" />
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

  return (
    <>
      {/* Hero */}
      <section className="bg-grid relative overflow-hidden border-b border-inkdark/10 dark:border-frost/10">
        <div
          className="pointer-events-none absolute -right-40 top-1/2 h-[36rem] w-[36rem] -translate-y-1/2 rounded-full bg-crimson/10 blur-3xl"
          aria-hidden="true"
        />
        <Emblem className="pointer-events-none absolute right-4 top-1/2 h-72 w-72 -translate-y-1/2 text-crimson/25 sm:right-12 md:h-96 md:w-96" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-volt">
            {t('hero.eyebrow')}
          </p>
          <h1 className="max-w-2xl font-display text-4xl font-bold uppercase leading-tight tracking-tight sm:text-6xl">
            {t('hero.title')}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-inkdark/70 dark:text-muted">
            {t('hero.subtitle')}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/projects"
              className="clip-notch bg-crimson px-7 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.15em] text-white transition-all hover:shadow-glow-crimson"
            >
              {t('hero.ctaProjects')}
            </Link>
            <Link
              to="/contact"
              className="clip-notch border border-volt/40 px-7 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.15em] text-volt transition-all hover:border-volt hover:shadow-glow-volt"
            >
              {t('hero.ctaContact')}
            </Link>
          </div>
        </div>
      </section>

      {/* Hakkımda */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionTitle label={t('about.title')} />
        <div className="flex flex-col items-start gap-8 sm:flex-row">
          <img
            src="https://avatars.githubusercontent.com/u/138572294?v=4"
            alt={t('about.photoAlt')}
            width="160"
            height="160"
            loading="lazy"
            className="clip-notch h-40 w-40 border border-inkdark/10 object-cover dark:border-frost/10"
          />
          <div className="max-w-xl space-y-4 leading-relaxed text-inkdark/80 dark:text-frost/80">
            <p>{t('about.p1')}</p>
          </div>
        </div>
      </section>

      {/* Beceriler */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionTitle label={t('skills.title')} />

        {skillsLoading && <p className="text-sm text-inkdark/60 dark:text-muted">{t('common.loading')}</p>}
        {skillsError && (
          <p className="text-sm text-inkdark/60 dark:text-muted">
            {t(skillsError === 'notConfigured' ? 'common.notConfigured' : 'common.fetchFailed')}
          </p>
        )}

        <div className="grid gap-8 sm:grid-cols-2">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-inkdark/50 dark:text-muted">
                {t(`skills.category.${category}`)}
              </h3>
              <div className="flex flex-col gap-2">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill) => (
                    <SkillBadge key={skill.id} skill={skill} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Öne çıkan projeler */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="flex items-center gap-3 font-display text-2xl font-bold uppercase tracking-wide">
            <Emblem className="h-6 w-6 text-crimson" />
            {t('projects.featured')}
          </h2>
          <Link
            to="/projects"
            className="font-mono text-xs uppercase tracking-[0.15em] text-volt underline-offset-4 hover:underline"
          >
            {t('projects.viewAll')}
          </Link>
        </div>

        {projectsLoading && <p className="text-sm text-inkdark/60 dark:text-muted">{t('common.loading')}</p>}
        {projectsError && (
          <p className="text-sm text-inkdark/60 dark:text-muted">
            {t(projectsError === 'notConfigured' ? 'common.notConfigured' : 'common.fetchFailed')}
          </p>
        )}
        {!projectsLoading && !projectsError && projects.length === 0 && (
          <p className="text-sm text-inkdark/60 dark:text-muted">{t('projects.empty')}</p>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </>
  )
}
