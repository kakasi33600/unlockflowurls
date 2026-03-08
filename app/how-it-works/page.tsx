import type { Metadata } from 'next'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'

export const metadata: Metadata = {
  title: 'How It Works',
  description: 'How UnlockFlowURLS works from creation to redirect.',
  openGraph: { title: 'How It Works', description: 'How UnlockFlowURLS works from creation to redirect.' },
  twitter: { card: 'summary_large_image' },
}

export default function HowItWorksPage() {
  const steps = ['Create short code', 'Wait through countdown', 'Confirm final unlock', 'Redirect to destination']

  return (
    <div>
      <SiteHeader />
      <main className="section-shell py-12">
        <h1 className="text-4xl" style={{ fontFamily: 'var(--font-heading)' }}>
          How It Works
        </h1>
        <div className="mt-6 space-y-3">
          {steps.map((step, i) => (
            <div key={step} className="glass-card p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-[--accent]">Step {i + 1}</p>
              <p className="mt-1">{step}</p>
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
