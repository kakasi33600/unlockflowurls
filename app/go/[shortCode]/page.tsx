import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'
import UnlockPanel from '@/components/UnlockPanel'
import connectDB from '@/lib/db'
import ShortLink from '@/lib/models/ShortLink'

type PageProps = {
  params: { shortCode: string }
}

export const metadata: Metadata = {
  title: 'Final Unlock',
  description: 'Step 2 final unlock before redirect.',
  openGraph: { title: 'Final Unlock', description: 'Step 2 final unlock before redirect.' },
  twitter: { card: 'summary_large_image' },
}

export default async function FinalUnlockPage({ params }: PageProps) {
  await connectDB()
  const link = await ShortLink.findOne({ shortCode: params.shortCode })
    .select({ destinationUrl: 1, clicks: 1 })
    .lean<{ destinationUrl: string; clicks: number } | null>()

  if (!link) notFound()

  const destinationHost = new URL(link.destinationUrl).hostname.replace(/^www\./, '')

  return (
    <div>
      <SiteHeader />
      <UnlockPanel shortCode={params.shortCode} destinationHost={destinationHost} clicks={link.clicks} />
      <SiteFooter />
    </div>
  )
}
