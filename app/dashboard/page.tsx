import type { Metadata } from 'next'
import DashboardTable, { type DashboardLink } from '@/components/DashboardTable'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'
import connectDB from '@/lib/db'
import ShortLink from '@/lib/models/ShortLink'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Manage links, clicks, and unlock performance.',
  openGraph: { title: 'Dashboard', description: 'Manage links, clicks, and unlock performance.' },
  twitter: { card: 'summary_large_image' },
}

export default async function DashboardPage() {
  await connectDB()

  const links = await ShortLink.find({})
    .sort({ createdAt: -1 })
    .limit(200)
    .select({ shortCode: 1, destinationUrl: 1, clicks: 1, createdAt: 1 })
    .lean<DashboardLink[]>()

  const totalLinks = links.length
  const totalClicks = links.reduce((acc, item) => acc + item.clicks, 0)
  const activeLinks = links.filter((item) => item.clicks > 0).length

  return (
    <div>
      <SiteHeader />
      <main className="section-shell py-10">
        <h1 className="text-4xl" style={{ fontFamily: 'var(--font-heading)' }}>
          Dashboard
        </h1>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ['Total Links', totalLinks],
            ['Total Clicks', totalClicks],
            ['Active Links', activeLinks],
          ].map(([label, value]) => (
            <article key={label} className="glass-card p-5">
              <p className="text-sm text-[--text-muted]">{label}</p>
              <p className="mt-2 text-3xl" style={{ fontFamily: 'var(--font-heading)' }}>
                {value}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-8">
          <DashboardTable links={links} />
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
