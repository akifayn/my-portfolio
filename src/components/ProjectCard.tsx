import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
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
    <article className="glass-panel group flex flex-col overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.03] hover:!border-cyan hover:shadow-glow-cyan">
      <Link to={`/projects/${project.id}`} className="flex flex-1 flex-col">
        {showImage ? (
          <div className="overflow-hidden border-b border-ink/10">
            <img
              src={project.image_url ?? undefined}
              alt={title}
              loading="lazy"
              onError={() => setImageFailed(true)}
              className="aspect-video w-full object-cover opacity-70 mix-blend-luminosity transition-[transform,opacity] duration-500 group-hover:scale-105 group-hover:opacity-100 group-hover:mix-blend-normal"
            />
          </div>
        ) : (
          <div className="flex aspect-video w-full items-center justify-center border-b border-ink/10 bg-ink/[0.04]">
            <span
              className="font-mono text-4xl font-bold text-ink/15 transition-colors group-hover:text-cyan/50"
              aria-hidden="true"
            >
              //
            </span>
          </div>
        )}

        <div className="flex flex-1 flex-col gap-3 p-6">
          <h3 className="font-display text-lg font-semibold tracking-tight transition-colors group-hover:text-cyan">
            {title}
          </h3>
          <p className="flex-1 text-sm leading-relaxed text-mut">
            {description}
          </p>

          {project.tech_stack.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {project.tech_stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-sm border-l-2 border-cyan bg-ink/5 px-2 py-1 font-mono text-[10px] text-ink/80 dark:bg-white/5"
                >
                  {tech}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Link>

      <div className="flex gap-6 border-t border-ink/10 px-6 py-3 font-sans text-xs font-bold uppercase tracking-[0.1em]">
        <Link
          to={`/projects/${project.id}`}
          className="text-cyan underline-offset-4 hover:underline"
        >
          {t('projects.details')}
        </Link>
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noreferrer"
            className="text-dim transition-colors hover:text-ink"
          >
            {t('projects.viewCode')}
          </a>
        )}
        {project.live_url && (
          <a
            href={project.live_url}
            target="_blank"
            rel="noreferrer"
            className="text-dim transition-colors hover:text-ink"
          >
            {t('projects.viewLive')}
          </a>
        )}
      </div>
    </article>
  )
}
