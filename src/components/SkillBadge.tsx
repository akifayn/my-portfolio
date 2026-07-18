import { useTranslation } from 'react-i18next'
import type { Skill, SkillCategory } from '../types/database.types'

interface SkillBadgeProps {
  skill: Skill
}

// Kategori başına neon vurgu rengi (tasarımdaki dörtlü kodlama)
const ACCENT: Record<
  SkillCategory,
  { text: string; segment: string; hover: string }
> = {
  frontend: {
    text: 'text-cyan',
    segment: 'bg-cyan shadow-glow-segment-cyan',
    hover: 'hover:!border-cyan',
  },
  backend: {
    text: 'text-pink',
    segment: 'bg-pink shadow-glow-segment-pink',
    hover: 'hover:!border-pink',
  },
  devops: {
    text: 'text-ink',
    segment: 'bg-ink shadow-none dark:bg-white dark:shadow-glow-segment-white',
    hover: 'hover:!border-ink dark:hover:!border-white',
  },
  other: {
    text: 'text-gold',
    segment: 'bg-gold shadow-glow-segment-gold',
    hover: 'hover:!border-gold',
  },
}

export default function SkillBadge({ skill }: SkillBadgeProps) {
  const { t } = useTranslation()
  const accent = ACCENT[skill.category] ?? ACCENT.other

  return (
    <div className={`glass-panel rounded-lg p-4 transition-all ${accent.hover}`}>
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="font-mono text-sm">{skill.name}</span>
        <span className={`font-mono text-[10px] ${accent.text}`}>{skill.level * 20}%</span>
      </div>
      <span
        className="flex gap-0.5"
        role="img"
        aria-label={t('skills.levelLabel', { level: skill.level })}
      >
        {[1, 2, 3, 4, 5].map((bar) => (
          <span
            key={bar}
            className={`h-1.5 w-3 ${
              bar <= skill.level ? accent.segment : 'bg-ink/15 dark:bg-white/10'
            }`}
          />
        ))}
      </span>
    </div>
  )
}
