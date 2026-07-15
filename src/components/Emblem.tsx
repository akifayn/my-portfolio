interface EmblemProps {
  className?: string
}

// İmza öğesi: pah kesiğiyle aynı açıyı taşıyan çift çizgili "slash" amblemi.
// Dolu şerit currentColor'dan, ince çizgi volt renginden gelir.
export default function Emblem({ className }: EmblemProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" fill="none">
      <path d="M18 78 L52 22 H70 L36 78 Z" fill="currentColor" />
      <path d="M50 78 L82 25" stroke="#00D9FF" strokeWidth="6" />
    </svg>
  )
}
