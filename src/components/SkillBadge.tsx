import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { Skill } from '../types/database.types'

interface SkillBadgeProps {
  skill: Skill
}

export default function SkillBadge({ skill }: SkillBadgeProps) {
  const { t } = useTranslation()

  return (
    <div className="glass-panel rounded-lg p-4 transition-colors hover:!border-cyan">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="font-mono text-sm">{skill.name}</span>
        <span className="font-mono text-[10px] text-cyan">{skill.level * 20}%</span>
      </div>
      <span
        className="flex gap-0.5"
        role="img"
        aria-label={t('skills.levelLabel', { level: skill.level })}
      >
        {[1, 2, 3, 4, 5].map((bar) => (
          <motion.span
            key={bar}
            className={`h-1.5 w-3 origin-left ${
              bar <= skill.level ? 'bg-cyan' : 'bg-ink/15 dark:bg-white/10'
            }`}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.35, delay: bar * 0.06, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </span>
    </div>
  )
}
