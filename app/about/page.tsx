import type { Metadata } from 'next'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'

export const metadata: Metadata = {
  title: 'About',
  description: 'About UnlockFlowURLS and our product mission.',
  openGraph: { title: 'About', description: 'About UnlockFlowURLS and our product mission.' },
  twitter: { card: 'summary_large_image' },
}

export default function AboutPage() {
  return (
    <div>
      <SiteHeader />
      <main className="section-shell py-12">
        <div className="glass-card p-7">
          <h1 className="text-4xl" style={{ fontFamily: 'var(--font-heading)' }}>
            About UnlockFlowURLS
          </h1>
          <p className="mt-4 text-[--text-muted]">
            UnlockFlowURLS builds monetization-first URL workflows with clean UX, reliable redirecting, and strong operational controls.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
