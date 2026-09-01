import { motion, type Variants } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { AtomIcon, ChartIcon, RadarIcon, TerminalIcon } from './CubeIcons'
import Reveal from './Reveal'

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

const CARDS = [
  { key: 'problemSolving', icon: <RadarIcon /> },
  { key: 'collaboration', icon: <AtomIcon /> },
  { key: 'codeQuality', icon: <TerminalIcon /> },
  { key: 'learning', icon: <ChartIcon /> },
] as const

// Stitch "Studio Neura" Services sayfasındaki uniform 2x2 kart düzeninin uyarlaması.
export default function WorkingStyle() {
  const { t } = useTranslation()

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Reveal className="mb-10 max-w-2xl">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {t('workingStyle.title')}
        </h2>
        <p className="mt-2 text-base text-mut">{t('workingStyle.subtitle')}</p>
      </Reveal>

      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0 }}
        variants={staggerContainer}
      >
        {CARDS.map((card) => (
          <motion.div
            key={card.key}
            variants={staggerItem}
            className="glass-panel rounded-lg p-8"
          >
            <div className="text-cyan">{card.icon}</div>
            <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-ink">
              {t(`workingStyle.${card.key}.title`)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-mut">
              {t(`workingStyle.${card.key}.body`)}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
