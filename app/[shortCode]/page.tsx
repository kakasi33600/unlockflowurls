import { notFound, redirect } from 'next/navigation'
import connectDB from '@/lib/db'
import { incrementLinkClicks, resolveLinkByCode } from '@/lib/linkResolver'

interface Props {
  params: { shortCode: string }
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function ShortCodePage({ params }: Props) {
  await connectDB()

  const link = await resolveLinkByCode(params.shortCode)
  if (!link) notFound()

  void incrementLinkClicks(link)
  redirect(`/unlock/${link.shortCode}`)
}
