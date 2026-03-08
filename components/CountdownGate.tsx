'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

type Props = {
  shortCode: string
  destinationHost: string
}

const TOTAL_SECONDS = 8

export default function CountdownGate({ shortCode, destinationHost }: Props) {
  const [seconds, setSeconds] = useState(TOTAL_SECONDS)

  useEffect(() => {
    if (seconds <= 0) return
    const timer = setTimeout(() => setSeconds((current) => current - 1), 1000)
    return () => clearTimeout(timer)
  }, [seconds])

  const progressPercent = useMemo(
    () => Math.round(((TOTAL_SECONDS - seconds) / TOTAL_SECONDS) * 100),
    [seconds]
  )

  const circleDeg = useMemo(
    () => Math.round(((TOTAL_SECONDS - seconds) / TOTAL_SECONDS) * 360),
    [seconds]
  )

  return (
    <div className="section-shell py-12">
      <div className="glass-card mx-auto max-w-xl p-7 text-center">
        <p className="mb-1 text-xs uppercase tracking-[0.25em] text-[--text-muted]">Step 1 of 2</p>
        <h1 className="text-3xl" style={{ fontFamily: 'var(--font-heading)' }}>
          Preparing Your Link
        </h1>
        <p className="mt-2 text-sm text-[--text-muted]">Destination: {destinationHost}</p>

        <div className="mx-auto my-8 flex h-40 w-40 items-center justify-center rounded-full border border-white/15 bg-black/30"
          style={{
            backgroundImage: `conic-gradient(var(--accent) ${circleDeg}deg, rgba(255,255,255,0.08) ${circleDeg}deg)`,
          }}
        >
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[--bg-card] text-4xl font-bold">
            {seconds}
          </div>
        </div>

        <div className="mx-auto h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="progress-glow h-full bg-[--accent] transition-all duration-700"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <p className="mt-3 text-sm text-[--text-muted]">Please wait while we prepare your link...</p>

        <div className="mx-auto mt-6 flex h-[250px] w-[300px] items-center justify-center rounded-xl border border-dashed border-white/20 text-xs text-[--text-muted]">
          Ad placeholder 300x250
        </div>

        {seconds === 0 ? (
          <Link href={`/go/${shortCode}`} className="primary-cta mt-6 inline-flex">
            Continue to Unlock
          </Link>
        ) : (
          <button disabled className="mt-6 rounded-lg border border-white/15 px-4 py-2 text-sm text-[--text-muted]">
            Continue locked until countdown ends
          </button>
        )}
      </div>
    </div>
  )
}
