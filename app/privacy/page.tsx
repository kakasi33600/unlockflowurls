import type { Metadata } from 'next'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'UnlockFlowURLS privacy policy.',
  openGraph: { title: 'Privacy', description: 'UnlockFlowURLS privacy policy.' },
  twitter: { card: 'summary_large_image' },
}

export default function PrivacyPage() {
  return (
    <div>
      <SiteHeader />
      <main className="section-shell py-12">
        <div className="glass-card p-7">
          <h1 className="text-4xl" style={{ fontFamily: 'var(--font-heading)' }}>
            Privacy
          </h1>
          <p className="mt-4 text-[--text-muted]">UnlockFlowURLS stores operational data required for link routing and product analytics.</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
