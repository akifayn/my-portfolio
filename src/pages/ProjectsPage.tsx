import { motion, type Variants } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import ProjectGalleryCard from '../components/ProjectGalleryCard'
import Reveal from '../components/Reveal'
import { useProjects } from '../hooks/useProjects'

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export default function ProjectsPage() {
  const { t } = useTranslation()
  const { projects, loading, error } = useProjects()

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Reveal>
        <h1 className="mb-12 flex items-center gap-4 font-display text-3xl font-bold uppercase tracking-[-0.02em] sm:text-4xl">
          <span className="h-10 w-2 bg-cyan" aria-hidden="true" />
          {t('projects.title')}
        </h1>
      </Reveal>

      {loading && <p className="text-sm text-dim">{t('common.loading')}</p>}
      {error && (
        <p className="text-sm text-dim">
          {t(error === 'notConfigured' ? 'common.notConfigured' : 'common.fetchFailed')}
        </p>
      )}
      {!loading && !error && projects.length === 0 && (
        <p className="text-sm text-dim">{t('projects.empty')}</p>
      )}

      {/* Stitch "Studio Neura" Work sayfasındaki asimetrik ritim: her 3'te bir tam genişlik */}
      <motion.div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {projects.map((project, index) => {
          const isFull = index % 3 === 0
          return (
            <motion.div
              key={project.id}
              variants={staggerItem}
              className={`${isFull ? 'sm:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'}`}
            >
              <ProjectGalleryCard project={project} large={isFull} className="h-full w-full" />
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
