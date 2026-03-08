'use client'

import { useState } from 'react'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'

type ApiResponse = { shortUrl?: string; error?: string }

const features = [
  { title: 'Speed', copy: 'Ultra-fast redirects with globally distributed hosting.' },
  { title: 'Analytics', copy: 'Track click totals and link activity in one dashboard.' },
  { title: 'Never Expires', copy: 'Your links remain active with no expiry timestamp.' },
]

const faqs = [
  {
    q: 'How many links can I create?',
    a: 'You can start free immediately and create links without a hard cap in this version.',
  },
  {
    q: 'Do links expire?',
    a: 'No. UnlockFlow stores links without an expiry field by design.',
  },
  {
    q: 'Can I use affiliate links?',
    a: 'Yes, as long as your destination complies with legal and network policy requirements.',
  },
  {
    q: 'How does the 2-step flow work?',
    a: 'Visitors wait on a countdown page, then confirm on a final unlock page before redirect.',
  },
  {
    q: 'Can I remove a link later?',
    a: 'Yes, delete links from your dashboard using the delete action.',
  },
]

export default function HomeClient() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [shortUrl, setShortUrl] = useState('')

  async function createLink() {
    if (!url.trim() || loading) return
    setLoading(true)
    try {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      const data = (await res.json()) as ApiResponse
      if (!res.ok || !data.shortUrl) {
        alert(data.error || 'Failed to create link')
        return
      }
      setShortUrl(data.shortUrl)
    } catch {
      alert('Network error while creating link')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <SiteHeader />

      <main>
        <section className="grain-overlay grid-overlay border-b border-white/10 py-20">
          <div className="section-shell">
            <p className="mb-3 inline-flex rounded-full border border-white/15 px-3 py-1 text-xs text-[--text-muted]">
              Monetization-Ready URL Platform
            </p>
            <h1 className="max-w-3xl text-5xl font-bold leading-tight md:text-7xl" style={{ fontFamily: 'var(--font-heading)' }}>
              Unlock Links. <span className="gradient-text">Earn More.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-[--text-muted]">
              Create smart unlock links with a 2-step flow. Free forever.
            </p>

            <div className="glass-card mt-10 flex flex-col gap-3 p-4 md:flex-row md:items-center">
              <input
                type="url"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                placeholder="https://example.com/your-file.zip"
                className="h-12 flex-1 rounded-xl border border-white/10 bg-black/40 px-4 outline-none"
              />
              <button onClick={createLink} disabled={loading} className="primary-cta h-12 px-6 disabled:opacity-60">
                {loading ? 'Creating...' : 'Create Link'}
              </button>
            </div>

            {shortUrl && (
              <div className="glass-card mt-4 flex items-center justify-between gap-3 p-4">
                <code className="mono overflow-x-auto text-sm">{shortUrl}</code>
                <button
                  onClick={() => navigator.clipboard.writeText(shortUrl)}
                  className="rounded-lg border border-white/20 px-3 py-2 text-xs transition-colors hover:bg-white/10"
                >
                  Copy
                </button>
              </div>
            )}

            <div className="mt-8 rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-[--text-muted]">
              10,000+ links created · 500K+ unlocks · 99.9% uptime
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="section-shell grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.title} className="glass-card p-6">
                <h2 className="mb-2 text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
                  {feature.title}
                </h2>
                <p className="text-sm text-[--text-muted]">{feature.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell py-12">
          <h2 className="mb-6 text-3xl" style={{ fontFamily: 'var(--font-heading)' }}>
            How It Works
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              'Create your short unlock link',
              'Visitor passes a short countdown',
              'Visitor confirms and opens destination',
            ].map((step, index) => (
              <div key={step} className="glass-card p-6">
                <p className="mb-2 text-xs uppercase tracking-widest text-[--accent]">Step {index + 1}</p>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-shell py-12">
          <h2 className="mb-6 text-3xl" style={{ fontFamily: 'var(--font-heading)' }}>
            Testimonials
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              'We doubled affiliate conversion quality with unlock flow gating. — Emma R, Growth Lead',
              'The UI is clean and redirect speed is excellent worldwide. — Diego M, Media Buyer',
              'Dashboard insights helped us remove low-performing campaigns. — Alina P, Creator',
            ].map((quote) => (
              <blockquote key={quote} className="glass-card p-6 text-sm text-[--text-muted]">
                {quote}
              </blockquote>
            ))}
          </div>
        </section>

        <section className="section-shell py-12">
          <h2 className="mb-6 text-3xl" style={{ fontFamily: 'var(--font-heading)' }}>
            FAQ
          </h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="glass-card p-5">
                <summary className="cursor-pointer font-medium">{faq.q}</summary>
                <p className="mt-3 text-sm text-[--text-muted]">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
