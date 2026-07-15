import { useTranslation } from 'react-i18next'
import type { Skill } from '../types/database.types'

interface SkillBadgeProps {
  skill: Skill
}

export default function SkillBadge({ skill }: SkillBadgeProps) {
  const { t } = useTranslation()

  return (
    <div className="clip-notch flex items-center justify-between gap-3 border border-inkdark/10 bg-white px-3 py-2 dark:border-frost/10 dark:bg-surface">
      <span className="text-sm font-medium">{skill.name}</span>
      <span
        className="flex gap-1"
        role="img"
        aria-label={t('skills.levelLabel', { level: skill.level })}
      >
        {[1, 2, 3, 4, 5].map((bar) => (
          <span
            key={bar}
            className={`h-3 w-1.5 -skew-x-12 ${
              bar <= skill.level ? 'bg-crimson' : 'bg-inkdark/15 dark:bg-frost/15'
            }`}
          />
        ))}
      </span>
    </div>
  )
}
