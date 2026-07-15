import { useEffect, useState } from 'react'
import { isSupabaseConfigured } from '../lib/supabase'
import { getFeaturedProjects, getProjects } from '../services/projects.service'
import type { Project } from '../types/database.types'

interface UseProjectsResult {
  projects: Project[]
  loading: boolean
  error: 'notConfigured' | 'fetchFailed' | null
}

export function useProjects(featuredOnly = false): UseProjectsResult {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<UseProjectsResult['error']>(null)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setError('notConfigured')
      setLoading(false)
      return
    }

    let cancelled = false
    const fetcher = featuredOnly ? getFeaturedProjects : getProjects

    fetcher()
      .then((data) => {
        if (!cancelled) setProjects(data)
      })
      .catch(() => {
        if (!cancelled) setError('fetchFailed')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [featuredOnly])

  return { projects, loading, error }
}
