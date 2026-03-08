import type { Metadata } from 'next'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'

export const metadata: Metadata = {
  title: 'Features',
  description: 'UnlockFlow feature highlights.',
  openGraph: { title: 'Features', description: 'UnlockFlow feature highlights.' },
  twitter: { card: 'summary_large_image' },
}

const cards = [
  { title: '2-Step Unlock', desc: 'Countdown + final confirmation flow for qualified traffic.' },
  { title: 'Fast Redirect', desc: 'Destination handoff using direct HTTP redirects.' },
  { title: 'Dashboard', desc: 'Track click volume and manage links quickly.' },
]

export default function FeaturesPage() {
  return (
    <div>
      <SiteHeader />
      <main className="section-shell py-12">
        <h1 className="text-4xl" style={{ fontFamily: 'var(--font-heading)' }}>
          Features
        </h1>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <article key={card.title} className="glass-card p-5">
              <h2 className="text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
                {card.title}
              </h2>
              <p className="mt-2 text-sm text-[--text-muted]">{card.desc}</p>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
