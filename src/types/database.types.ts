// Supabase şemasına karşılık gelen tipler.
// Şema değiştiğinde `supabase gen types typescript` ile yeniden üretilmelidir (CLAUDE.md §8).
// Not: Supabase tip çıkarımı `interface` ile çalışmaz; `type` kullanılmalıdır.

export type SkillCategory = 'frontend' | 'backend' | 'devops' | 'other'

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          title_tr: string
          title_en: string
          description_tr: string
          description_en: string
          tech_stack: string[]
          github_url: string | null
          live_url: string | null
          image_url: string | null
          gallery_urls: string[]
          video_url: string | null
          is_featured: boolean
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          title_tr: string
          title_en: string
          description_tr: string
          description_en: string
          tech_stack?: string[]
          github_url?: string | null
          live_url?: string | null
          image_url?: string | null
          gallery_urls?: string[]
          video_url?: string | null
          is_featured?: boolean
          order_index?: number
          created_at?: string
        }
        Update: {
          id?: string
          title_tr?: string
          title_en?: string
          description_tr?: string
          description_en?: string
          tech_stack?: string[]
          github_url?: string | null
          live_url?: string | null
          image_url?: string | null
          gallery_urls?: string[]
          video_url?: string | null
          is_featured?: boolean
          order_index?: number
          created_at?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          id: string
          name: string
          category: SkillCategory
          icon_name: string | null
          level: number
          order_index: number
        }
        Insert: {
          id?: string
          name: string
          category: SkillCategory
          icon_name?: string | null
          level: number
          order_index?: number
        }
        Update: {
          id?: string
          name?: string
          category?: SkillCategory
          icon_name?: string | null
          level?: number
          order_index?: number
        }
        Relationships: []
      }
      messages: {
        Row: {
          id: string
          name: string
          email: string
          subject: string | null
          body: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          subject?: string | null
          body: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          subject?: string | null
          body?: string
          is_read?: boolean
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: { [_ in never]: never }
    CompositeTypes: { [_ in never]: never }
  }
}

// Uygulama içinde kullanılan kısayol tipleri
export type Project = Database['public']['Tables']['projects']['Row']
export type Skill = Database['public']['Tables']['skills']['Row']
export type NewMessage = Database['public']['Tables']['messages']['Insert']
