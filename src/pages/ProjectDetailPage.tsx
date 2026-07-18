import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
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
        <p className="text-sm text-dim">{t('common.loading')}</p>
      </section>
    )
  }

  if (!project) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6">
        <h1 className="mb-6 font-display text-3xl font-bold uppercase tracking-[-0.02em]">
          {t('projects.notFound')}
        </h1>
        <Link
          to="/projects"
          className="font-sans text-xs font-bold uppercase tracking-[0.1em] text-cyan underline-offset-4 hover:underline"
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

  // YouTube bağlantıları <video> yerine gömülü oynatıcıyla gösterilir
  const youtubeId = project.video_url?.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/,
  )?.[1]

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
        className="font-sans text-xs font-bold uppercase tracking-[0.1em] text-cyan underline-offset-4 hover:underline"
      >
        ← {t('projects.back')}
      </Link>

      <h1 className="mb-4 mt-8 flex items-center gap-4 font-display text-3xl font-bold uppercase tracking-[-0.02em] sm:text-4xl">
        <span className="h-10 w-2 shrink-0 bg-cyan" aria-hidden="true" />
        {title}
      </h1>
      <p className="mb-6 max-w-2xl text-lg leading-relaxed text-mut">{description}</p>

      {project.tech_stack.length > 0 && (
        <ul className="mb-8 flex flex-wrap gap-2">
          {project.tech_stack.map((tech) => (
            <li
              key={tech}
              className="rounded-sm border-l-2 border-cyan bg-ink/5 px-2 py-1 font-mono text-xs text-ink/80 dark:bg-white/5"
            >
              {tech}
            </li>
          ))}
        </ul>
      )}

      <div className="mb-12 flex flex-wrap gap-4 font-sans text-xs font-bold uppercase tracking-[0.1em]">
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noreferrer"
            className="rounded bg-cyanbright px-6 py-3 text-terminal shadow-glow-cyan transition-all hover:shadow-glow-cyan-strong"
          >
            {t('projects.viewCode')}
          </a>
        )}
        {project.live_url && (
          <a
            href={project.live_url}
            target="_blank"
            rel="noreferrer"
            className="rounded border-2 border-cyan/30 px-6 py-3 text-cyan backdrop-blur-sm transition-all hover:bg-cyan/10"
          >
            {t('projects.viewLive')}
          </a>
        )}
      </div>

      {gallery.length > 0 && (
        <div className="mb-12">
          <h2 className="mb-6 font-sans text-xs font-bold uppercase tracking-[0.2em] text-dim">
            {t('projects.gallery')}
          </h2>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {gallery.map((url) => (
              <li key={url}>
                <a href={url} target="_blank" rel="noreferrer" className="group block">
                  <img
                    src={url}
                    alt={title}
                    loading="lazy"
                    className="w-full rounded-lg border border-ink/10 transition-all duration-300 hover:border-cyan hover:shadow-glow-cyan dark:border-white/10"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {project.video_url && (
        <div className="mb-12">
          <h2 className="mb-6 font-sans text-xs font-bold uppercase tracking-[0.2em] text-dim">
            {t('projects.demoVideo')}
          </h2>
          {youtubeId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="aspect-video w-full rounded-xl border border-ink/10 dark:border-white/10"
            />
          ) : (
            <video
              src={project.video_url}
              controls
              preload="metadata"
              className="max-h-[70vh] rounded-xl border border-ink/10 dark:border-white/10"
            />
          )}
        </div>
      )}

      {readme && (
        <article className="glass-panel rounded-xl p-6 sm:p-8">
          <h2 className="mb-6 border-b border-ink/10 pb-3 font-sans text-xs font-bold uppercase tracking-[0.2em] text-dim dark:border-white/10">
            README.md — GitHub
          </h2>
          <div className="prose prose-sm max-w-none overflow-x-auto dark:prose-invert prose-a:text-cyan prose-img:max-w-full">
            <ReactMarkdown remarkPlugins={[remarkGfm]} urlTransform={transformUrl}>
              {readme}
            </ReactMarkdown>
          </div>
        </article>
      )}
      {readmeFailed && (
        <p className="text-sm text-dim">{t('projects.readmeError')}</p>
      )}
    </section>
  )
}
