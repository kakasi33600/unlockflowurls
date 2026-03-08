import type { Metadata } from 'next'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'UnlockFlow pricing plans.',
  openGraph: { title: 'Pricing', description: 'UnlockFlow pricing plans.' },
  twitter: { card: 'summary_large_image' },
}

const plans = [
  { name: 'Free', price: '$0', detail: 'Create and share links' },
  { name: 'Pro', price: '$19', detail: 'Advanced tracking and export' },
  { name: 'Scale', price: '$99', detail: 'Team workflows and support' },
]

export default function PricingPage() {
  return (
    <div>
      <SiteHeader />
      <main className="section-shell py-12">
        <h1 className="text-4xl" style={{ fontFamily: 'var(--font-heading)' }}>
          Pricing
        </h1>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <article key={plan.name} className="glass-card p-5">
              <h2 className="text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
                {plan.name}
              </h2>
              <p className="mt-2 text-3xl">{plan.price}</p>
              <p className="mt-1 text-sm text-[--text-muted]">{plan.detail}</p>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
