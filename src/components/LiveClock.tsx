import { useEffect, useState } from 'react'

function format(date: Date) {
  return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

// Hero'daki kişisel dokunuş: Türkiye saatiyle canlı saat
export default function LiveClock() {
  const [time, setTime] = useState(() => format(new Date()))

  useEffect(() => {
    const id = setInterval(() => setTime(format(new Date())), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="font-mono text-sm tabular-nums text-dim">{time}</span>
  )
}
