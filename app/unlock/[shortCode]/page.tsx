import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CountdownGate from '@/components/CountdownGate'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'
import connectDB from '@/lib/db'
import { resolveLinkByCode } from '@/lib/linkResolver'

type PageProps = {
  params: { shortCode: string }
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Unlock Link',
  description: 'Step 1 countdown before destination unlock.',
  openGraph: { title: 'Unlock Link', description: 'Step 1 countdown before destination unlock.' },
  twitter: { card: 'summary_large_image' },
}

export default async function UnlockCountdownPage({ params }: PageProps) {
  await connectDB()
  const link = await resolveLinkByCode(params.shortCode)

  if (!link) notFound()

  const destinationHost = new URL(link.destinationUrl).hostname.replace(/^www\./, '')

  return (
    <div>
      <SiteHeader />
      <CountdownGate shortCode={link.shortCode} destinationHost={destinationHost} />
      <SiteFooter />
    </div>
  )
}
