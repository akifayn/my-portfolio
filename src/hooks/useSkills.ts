import { useEffect, useState } from 'react'
import { isSupabaseConfigured } from '../lib/supabase'
import { getSkills } from '../services/skills.service'
import type { Skill } from '../types/database.types'

interface UseSkillsResult {
  skills: Skill[]
  loading: boolean
  error: 'notConfigured' | 'fetchFailed' | null
}

export function useSkills(): UseSkillsResult {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<UseSkillsResult['error']>(null)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setError('notConfigured')
      setLoading(false)
      return
    }

    let cancelled = false

    getSkills()
      .then((data) => {
        if (!cancelled) setSkills(data)
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
  }, [])

  return { skills, loading, error }
}
