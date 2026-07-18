import { useTranslation } from 'react-i18next'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { lazy } from 'react'
import ContactPage from './pages/ContactPage'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'

// README render'ı (react-markdown) ağır olduğu için detay sayfası ihtiyaç anında yüklenir
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'))

function NotFound() {
  const { t } = useTranslation()
  return (
    <section className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6">
      <h1 className="mb-6 font-display text-3xl font-bold uppercase tracking-[-0.02em]">
        {t('notFound.title')}
      </h1>
      <Link
        to="/"
        className="font-sans text-xs font-bold uppercase tracking-[0.1em] text-cyan underline-offset-4 hover:underline"
      >
        {t('notFound.goHome')}
      </Link>
    </section>
  )
}

export default function App() {
  return (
    // future flag'leri v7 davranışına şimdiden geçirir; konsoldaki React Router uyarılarını kapatır
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
