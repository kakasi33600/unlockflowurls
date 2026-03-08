'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type Props = {
  shortCode: string
  destinationHost: string
  clicks: number
}

export default function UnlockPanel({ shortCode, destinationHost, clicks }: Props) {
  const [animatedClicks, setAnimatedClicks] = useState(0)

  useEffect(() => {
    let frame = 0
    const target = Math.max(clicks, 1)
    const timer = setInterval(() => {
      frame += 1
      const next = Math.min(target, Math.ceil((target / 12) * frame))
      setAnimatedClicks(next)
      if (next >= target) clearInterval(timer)
    }, 50)

    return () => clearInterval(timer)
  }, [clicks])

  return (
    <div className="section-shell py-12">
      <div className="glass-card mx-auto max-w-xl p-7 text-center">
        <p className="mb-1 text-xs uppercase tracking-[0.25em] text-[--text-muted]">Step 2 of 2</p>
        <h1 className="text-3xl" style={{ fontFamily: 'var(--font-heading)' }}>
          Unlock Complete
        </h1>

        <p className="mt-4 text-sm text-[--text-muted]">You&apos;re about to visit:</p>
        <div className="mx-auto mt-2 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 mono text-sm">
          <span aria-hidden>🌐</span>
          {destinationHost}
        </div>

        <div className="mt-6 text-5xl">🔒 ➜ 🔓</div>

        <Link href={`/api/redirect/${shortCode}`} className="primary-cta mt-8 inline-flex items-center gap-2 px-6 py-3 text-base">
          Visit Link →
        </Link>

        <p className="mt-3 text-xs text-[--text-muted]">This link leads to an external site</p>

        <div className="mt-6 rounded-xl border border-white/15 bg-black/30 p-3 text-sm">
          Recent unlocks: <span className="mono text-[--accent]">{animatedClicks}</span>
        </div>
      </div>
    </div>
  )
}
