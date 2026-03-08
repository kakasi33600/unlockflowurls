import type { Metadata } from 'next'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about UnlockFlowURLS.',
  openGraph: { title: 'FAQ', description: 'Frequently asked questions about UnlockFlowURLS.' },
  twitter: { card: 'summary_large_image' },
}

const items = [
  { q: 'Do links expire?', a: 'No. UnlockFlowURLS links are stored with no expiration field.' },
  { q: 'Does UnlockFlowURLS proxy files?', a: 'No. Final destination is opened by HTTP redirect only.' },
  { q: 'How many steps are in unlock flow?', a: 'Two: countdown and final confirmation.' },
  { q: 'Can I delete links?', a: 'Yes, from the dashboard table.' },
  { q: 'Is rate limiting enabled?', a: 'Yes, shorten endpoint enforces IP-based rate limiting.' },
]

export default function FaqPage() {
  return (
    <div>
      <SiteHeader />
      <main className="section-shell py-12">
        <h1 className="text-4xl" style={{ fontFamily: 'var(--font-heading)' }}>
          FAQ
        </h1>
        <div className="mt-6 space-y-3">
          {items.map((item) => (
            <details key={item.q} className="glass-card p-5">
              <summary className="cursor-pointer font-medium">{item.q}</summary>
              <p className="mt-2 text-sm text-[--text-muted]">{item.a}</p>
            </details>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
