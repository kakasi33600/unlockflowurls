import type { Metadata } from 'next'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'

export const metadata: Metadata = {
  title: 'Terms',
  description: 'UnlockFlowURLS terms of service.',
  openGraph: { title: 'Terms', description: 'UnlockFlowURLS terms of service.' },
  twitter: { card: 'summary_large_image' },
}

export default function TermsPage() {
  return (
    <div>
      <SiteHeader />
      <main className="section-shell py-12">
        <div className="glass-card p-7">
          <h1 className="text-4xl" style={{ fontFamily: 'var(--font-heading)' }}>
            Terms
          </h1>
          <p className="mt-4 text-[--text-muted]">Use UnlockFlowURLS only for legal content and compliant traffic practices.</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
