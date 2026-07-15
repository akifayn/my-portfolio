import { supabase } from '../lib/supabase'
import type { Skill } from '../types/database.types'

export async function getSkills(): Promise<Skill[]> {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('order_index', { ascending: true })

  if (error) throw error
  return data
}
