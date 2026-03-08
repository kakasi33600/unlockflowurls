import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'
import UnlockPanel from '@/components/UnlockPanel'
import connectDB from '@/lib/db'
import ShortLink from '@/lib/models/ShortLink'
import LegacyUrl from '@/lib/models/LegacyUrl'
import { escapeRegex } from '@/lib/shortCode'

type PageProps = {
  params: { shortCode: string }
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Final Unlock',
  description: 'Step 2 final unlock before redirect.',
  openGraph: { title: 'Final Unlock', description: 'Step 2 final unlock before redirect.' },
  twitter: { card: 'summary_large_image' },
}

export default async function FinalUnlockPage({ params }: PageProps) {
  await connectDB()

  const regex = new RegExp(`^${escapeRegex(params.shortCode)}$`, 'i')

  const modern = await ShortLink.findOne({ shortCode: { $regex: regex } })
    .select({ destinationUrl: 1, clicks: 1, shortCode: 1 })
    .lean<{ destinationUrl: string; clicks: number; shortCode: string } | null>()

  const legacy = modern
    ? null
    : await LegacyUrl.findOne({
        $or: [{ shortCode: { $regex: regex } }, { slug: { $regex: regex } }],
      })
        .select({ originalUrl: 1, clicks: 1, clickCount: 1, shortCode: 1, slug: 1 })
        .lean<{
          originalUrl?: string
          clicks?: number
          clickCount?: number
          shortCode?: string
          slug?: string
        } | null>()

  const link = modern
    ? {
        destinationUrl: modern.destinationUrl,
        clicks: modern.clicks,
        shortCode: modern.shortCode,
      }
    : legacy?.originalUrl
      ? {
          destinationUrl: legacy.originalUrl,
          clicks: legacy.clicks ?? legacy.clickCount ?? 0,
          shortCode: (legacy.shortCode || legacy.slug || params.shortCode).toLowerCase(),
        }
      : null

  if (!link) notFound()

  const destinationHost = new URL(link.destinationUrl).hostname.replace(/^www\./, '')

  return (
    <div>
      <SiteHeader />
      <UnlockPanel shortCode={link.shortCode} destinationHost={destinationHost} clicks={link.clicks} />
      <SiteFooter />
    </div>
  )
}
