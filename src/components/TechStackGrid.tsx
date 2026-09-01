import { motion, type Variants } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { getTechIcon } from './TechIcon'
import type { Skill } from '../types/database.types'

interface TechStackGridProps {
  skills: Skill[]
}

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}

export default function TechStackGrid({ skills }: TechStackGridProps) {
  const { t } = useTranslation()
  if (skills.length === 0) return null

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="mb-10 font-mono text-xs uppercase tracking-[0.2em] text-dim">
        {t('techStack.title')}
      </p>
      <motion.div
        className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-4"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {skills.map((skill) => (
          <motion.div key={skill.id} variants={staggerItem} className="flex items-center gap-3">
            {getTechIcon(skill.name)}
            <span className="font-sans text-sm font-semibold">{skill.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
