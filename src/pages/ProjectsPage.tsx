import { useTranslation } from 'react-i18next'
import Emblem from '../components/Emblem'
import ProjectCard from '../components/ProjectCard'
import { useProjects } from '../hooks/useProjects'

export default function ProjectsPage() {
  const { t } = useTranslation()
  const { projects, loading, error } = useProjects()

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="mb-10 flex items-center gap-3 font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">
        <Emblem className="h-8 w-8 text-crimson" />
        {t('projects.title')}
      </h1>

      {loading && <p className="text-sm text-inkdark/60 dark:text-muted">{t('common.loading')}</p>}
      {error && (
        <p className="text-sm text-inkdark/60 dark:text-muted">
          {t(error === 'notConfigured' ? 'common.notConfigured' : 'common.fetchFailed')}
        </p>
      )}
      {!loading && !error && projects.length === 0 && (
        <p className="text-sm text-inkdark/60 dark:text-muted">{t('projects.empty')}</p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
