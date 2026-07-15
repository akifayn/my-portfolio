import { supabase } from '../lib/supabase'
import type { NewMessage } from '../types/database.types'

export async function sendMessage(message: NewMessage): Promise<void> {
  const { error } = await supabase.from('messages').insert(message)
  if (error) throw error
}
