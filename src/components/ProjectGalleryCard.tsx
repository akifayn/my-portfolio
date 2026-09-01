import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import type { Project } from '../types/database.types'

interface ProjectGalleryCardProps {
  project: Project
  className?: string
  large?: boolean
}

// Stitch "Studio Neura" Work/Featured Deployments kartının birebir uyarlaması:
// görsel dolu, üstte gradient scrim, kategori + başlık + ok ikonu hover'da tam görünür olur.
export default function ProjectGalleryCard({ project, className = '', large = false }: ProjectGalleryCardProps) {
  const { t, i18n } = useTranslation()
  const isEnglish = i18n.resolvedLanguage === 'en'
  const [imageFailed, setImageFailed] = useState(false)

  const title = isEnglish ? project.title_en : project.title_tr
  const description = isEnglish ? project.description_en : project.description_tr
  const category = project.tech_stack[0]
  const showImage = project.image_url && !imageFailed

  return (
    <Link
      to={`/projects/${project.id}`}
      className={`glass-panel group relative block overflow-hidden rounded-lg ${className}`}
    >
      {showImage ? (
        <img
          src={project.image_url ?? undefined}
          alt={title}
          loading="lazy"
          onError={() => setImageFailed(true)}
          className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-luminosity transition-[opacity,mix-blend-mode] duration-500 group-hover:opacity-90 group-hover:mix-blend-normal"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-ink/[0.04]">
          <span className="font-mono text-4xl font-bold text-ink/15" aria-hidden="true">
            //
          </span>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-base via-base/40 to-transparent" aria-hidden="true" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-8">
        <div className="space-y-1.5">
          {category && (
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.1em] text-cyan">
              {category}
            </p>
          )}
          <h3
            className={`font-display font-semibold tracking-tight text-ink ${large ? 'text-2xl sm:text-3xl' : 'text-xl'}`}
          >
            {title}
          </h3>
          {large && (
            <p className="hidden max-w-md text-sm leading-relaxed text-mut sm:block">{description}</p>
          )}
        </div>
        <span
          className="mb-1 shrink-0 text-ink opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 -translate-x-2"
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <span className="sr-only">{t('projects.details')}</span>
    </Link>
  )
}
