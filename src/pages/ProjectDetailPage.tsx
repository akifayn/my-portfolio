import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Emblem from '../components/Emblem'
import { isSupabaseConfigured } from '../lib/supabase'
import { getReadme, parseGithubUrl } from '../services/github.service'
import { getProjectById } from '../services/projects.service'
import type { Project } from '../types/database.types'

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { t, i18n } = useTranslation()
  const isEnglish = i18n.resolvedLanguage === 'en'

  const [project, setProject] = useState<Project | null>(null)
  const [readme, setReadme] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [readmeFailed, setReadmeFailed] = useState(false)

  useEffect(() => {
    if (!id || !isSupabaseConfigured) {
      setLoading(false)
      return
    }

    let cancelled = false

    getProjectById(id)
      .then(async (data) => {
        if (cancelled) return
        setProject(data)

        const repoRef = data.github_url ? parseGithubUrl(data.github_url) : null
        if (!repoRef) return
        try {
          const text = await getReadme(repoRef)
          if (!cancelled) setReadme(text)
        } catch {
          if (!cancelled) setReadmeFailed(true)
        }
      })
      .catch(() => {
        if (!cancelled) setProject(null)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [id])

  if (loading) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <p className="text-sm text-inkdark/60 dark:text-muted">{t('common.loading')}</p>
      </section>
    )
  }

  if (!project) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6">
        <h1 className="mb-6 font-display text-3xl font-bold uppercase">{t('projects.notFound')}</h1>
        <Link
          to="/projects"
          className="font-mono text-xs uppercase tracking-[0.15em] text-volt underline-offset-4 hover:underline"
        >
          {t('projects.back')}
        </Link>
      </section>
    )
  }

  const title = isEnglish ? project.title_en : project.title_tr
  const description = isEnglish ? project.description_en : project.description_tr
  const repoRef = project.github_url ? parseGithubUrl(project.github_url) : null
  // Kolonlar henüz eklenmemişse (myzoo-media.sql çalıştırılmadan) alanlar undefined gelir
  const gallery = project.gallery_urls ?? []

  // README içindeki göreli görsel/bağlantı yolları repo adresine çevrilir
  const transformUrl = (url: string, key: string) => {
    if (/^(https?:|#|mailto:)/.test(url)) return url
    if (!repoRef) return url
    const path = url.replace(/^\.?\//, '')
    return key === 'src'
      ? `https://raw.githubusercontent.com/${repoRef.owner}/${repoRef.repo}/HEAD/${path}`
      : `https://github.com/${repoRef.owner}/${repoRef.repo}/blob/HEAD/${path}`
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <Link
        to="/projects"
        className="font-mono text-xs uppercase tracking-[0.15em] text-volt underline-offset-4 hover:underline"
      >
        ← {t('projects.back')}
      </Link>

      <h1 className="mb-4 mt-6 flex items-center gap-3 font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">
        <Emblem className="h-8 w-8 shrink-0 text-crimson" />
        {title}
      </h1>
      <p className="mb-6 max-w-2xl leading-relaxed text-inkdark/70 dark:text-muted">{description}</p>

      {project.tech_stack.length > 0 && (
        <ul className="mb-8 flex flex-wrap gap-2">
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

      <div className="mb-10 flex gap-4 font-mono text-xs uppercase tracking-[0.15em]">
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noreferrer"
            className="clip-notch bg-crimson px-5 py-2 text-white transition-all hover:shadow-glow-crimson"
          >
            {t('projects.viewCode')}
          </a>
        )}
        {project.live_url && (
          <a
            href={project.live_url}
            target="_blank"
            rel="noreferrer"
            className="clip-notch border border-volt/40 px-5 py-2 text-volt transition-all hover:border-volt hover:shadow-glow-volt"
          >
            {t('projects.viewLive')}
          </a>
        )}
      </div>

      {gallery.length > 0 && (
        <div className="mb-10">
          <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-inkdark/50 dark:text-muted">
            {t('projects.gallery')}
          </h2>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {gallery.map((url) => (
              <li key={url}>
                <a href={url} target="_blank" rel="noreferrer">
                  <img
                    src={url}
                    alt={title}
                    loading="lazy"
                    className="clip-notch w-full border border-inkdark/10 transition-all hover:border-volt hover:shadow-glow-volt dark:border-frost/10"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {project.video_url && (
        <div className="mb-10">
          <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-inkdark/50 dark:text-muted">
            {t('projects.demoVideo')}
          </h2>
          <video
            src={project.video_url}
            controls
            preload="metadata"
            className="clip-notch max-h-[70vh] border border-inkdark/10 dark:border-frost/10"
          />
        </div>
      )}

      {readme && (
        <article className="clip-notch border border-inkdark/10 bg-white p-6 dark:border-frost/10 dark:bg-surface sm:p-8">
          <h2 className="mb-6 border-b border-inkdark/10 pb-3 font-mono text-xs uppercase tracking-[0.25em] text-inkdark/50 dark:border-frost/10 dark:text-muted">
            README.md — GitHub
          </h2>
          <div className="prose prose-sm max-w-none overflow-x-auto dark:prose-invert prose-a:text-volt prose-img:max-w-full">
            <ReactMarkdown remarkPlugins={[remarkGfm]} urlTransform={transformUrl}>
              {readme}
            </ReactMarkdown>
          </div>
        </article>
      )}
      {readmeFailed && (
        <p className="text-sm text-inkdark/60 dark:text-muted">{t('projects.readmeError')}</p>
      )}
    </section>
  )
}
