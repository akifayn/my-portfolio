import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Emblem from './Emblem'
import type { Project } from '../types/database.types'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { t, i18n } = useTranslation()
  const isEnglish = i18n.resolvedLanguage === 'en'
  const [imageFailed, setImageFailed] = useState(false)

  const title = isEnglish ? project.title_en : project.title_tr
  const description = isEnglish ? project.description_en : project.description_tr
  const showImage = project.image_url && !imageFailed

  return (
    <article className="clip-notch group flex flex-col overflow-hidden border border-inkdark/10 bg-white transition-all hover:border-crimson hover:shadow-glow-crimson dark:border-frost/10 dark:bg-surface">
      <Link to={`/projects/${project.id}`} className="flex flex-1 flex-col">
        {showImage ? (
          <img
            src={project.image_url ?? undefined}
            alt={title}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="aspect-video w-full border-b border-inkdark/10 object-cover dark:border-frost/10"
          />
        ) : (
          <div className="flex aspect-video w-full items-center justify-center border-b border-inkdark/10 bg-inkdark/[0.03] dark:border-frost/10 dark:bg-frost/[0.03]">
            <Emblem className="h-12 w-12 text-inkdark/20 transition-colors group-hover:text-crimson/40 dark:text-frost/20" />
          </div>
        )}

        <div className="flex flex-1 flex-col gap-3 p-5">
          <h3 className="font-display text-lg font-bold uppercase tracking-wide transition-colors group-hover:text-crimson">
            {title}
          </h3>
          <p className="flex-1 text-sm leading-relaxed text-inkdark/70 dark:text-muted">
            {description}
          </p>

          {project.tech_stack.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {project.tech_stack.map((tech) => (
                <li
                  key={tech}
                  className="border border-volt/30 bg-volt/5 px-2 py-0.5 font-mono text-xs text-volt"
                >
                  {tech}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Link>

      <div className="flex gap-4 border-t border-inkdark/10 px-5 py-3 font-mono text-xs uppercase tracking-[0.15em] dark:border-frost/10">
        <Link
          to={`/projects/${project.id}`}
          className="text-crimson underline-offset-4 hover:underline"
        >
          {t('projects.details')}
        </Link>
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noreferrer"
            className="text-inkdark/60 underline-offset-4 hover:text-volt hover:underline dark:text-muted dark:hover:text-volt"
          >
            {t('projects.viewCode')}
          </a>
        )}
        {project.live_url && (
          <a
            href={project.live_url}
            target="_blank"
            rel="noreferrer"
            className="text-inkdark/60 underline-offset-4 hover:text-volt hover:underline dark:text-muted dark:hover:text-volt"
          >
            {t('projects.viewLive')}
          </a>
        )}
      </div>
    </article>
  )
}
