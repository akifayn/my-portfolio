import { motion, type Variants } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { BracketsIcon, BrainIcon, HexagonIcon, WifiIcon } from './CubeIcons'
import Reveal from './Reveal'

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

interface Card {
  key: 'fullstack' | 'iot' | 'data' | 'architecture'
  span: string
  icon: React.ReactNode
}

const CARDS: Card[] = [
  { key: 'fullstack', span: 'md:col-span-8', icon: <BracketsIcon /> },
  { key: 'iot', span: 'md:col-span-4', icon: <WifiIcon /> },
  { key: 'data', span: 'md:col-span-4', icon: <BrainIcon /> },
  { key: 'architecture', span: 'md:col-span-8', icon: <HexagonIcon /> },
]

// Figma "Studio Neura" tasarımındaki bento-grid Core Capabilities bölümünün birebir uyarlaması.
export default function CoreCapabilities() {
  const { t } = useTranslation()

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Reveal className="mb-10">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {t('capabilities.title')}
        </h2>
        <p className="mt-2 text-base text-mut">{t('capabilities.subtitle')}</p>
      </Reveal>

      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0 }}
        variants={staggerContainer}
      >
        {CARDS.map((card) => (
          <motion.div
            key={card.key}
            variants={staggerItem}
            className={`glass-panel group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-lg p-8 ${card.span}`}
          >
            <div className="text-cyan">{card.icon}</div>
            <div className="mt-auto pt-6">
              <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                {t(`features.${card.key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mut">
                {t(`features.${card.key}.body`)}
              </p>
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
