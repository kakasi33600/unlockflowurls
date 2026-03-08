import type { Metadata } from 'next'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact UnlockFlowURLS support.',
  openGraph: { title: 'Contact', description: 'Contact UnlockFlowURLS support.' },
  twitter: { card: 'summary_large_image' },
}

export default function ContactPage() {
  return (
    <div>
      <SiteHeader />
      <main className="section-shell py-12">
        <div className="glass-card mx-auto max-w-2xl p-7">
          <h1 className="text-4xl" style={{ fontFamily: 'var(--font-heading)' }}>
            Contact
          </h1>
          <form className="mt-6 space-y-3">
            <input required placeholder="Name" className="h-11 w-full rounded-lg border border-white/15 bg-black/35 px-3" />
            <input required type="email" placeholder="Email" className="h-11 w-full rounded-lg border border-white/15 bg-black/35 px-3" />
            <textarea required placeholder="Message" rows={5} className="w-full rounded-lg border border-white/15 bg-black/35 px-3 py-2" />
            <button className="primary-cta" type="submit">
              Send Message
            </button>
          </form>
          <p className="mt-4 text-sm text-[--text-muted]">Support reply window: within 24 hours.</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
