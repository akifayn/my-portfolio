import { useTranslation } from 'react-i18next'
import ProjectCard from '../components/ProjectCard'
import { useProjects } from '../hooks/useProjects'

export default function ProjectsPage() {
  const { t } = useTranslation()
  const { projects, loading, error } = useProjects()

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="mb-12 flex items-center gap-4 font-display text-3xl font-bold uppercase tracking-[-0.02em] sm:text-4xl">
        <span className="h-10 w-2 bg-cyan" aria-hidden="true" />
        {t('projects.title')}
      </h1>

      {loading && <p className="text-sm text-dim">{t('common.loading')}</p>}
      {error && (
        <p className="text-sm text-dim">
          {t(error === 'notConfigured' ? 'common.notConfigured' : 'common.fetchFailed')}
        </p>
      )}
      {!loading && !error && projects.length === 0 && (
        <p className="text-sm text-dim">{t('projects.empty')}</p>
      )}

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
