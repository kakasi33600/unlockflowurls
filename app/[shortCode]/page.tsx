import { notFound, redirect } from 'next/navigation'
import connectDB from '@/lib/db'
import ShortLink from '@/lib/models/ShortLink'

interface Props {
  params: { shortCode: string }
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export default async function ShortCodePage({ params }: Props) {
  const { shortCode } = params

  try {
    await connectDB()

    const link = await ShortLink.findOne({
      shortCode: { $regex: new RegExp(`^${escapeRegex(shortCode)}$`, 'i') },
    })
      .select({ _id: 1, shortCode: 1 })
      .lean<{ _id: string; shortCode: string } | null>()

    if (!link) {
      notFound()
    }

    void ShortLink.findByIdAndUpdate(link._id, { $inc: { clicks: 1 } }).exec()

    redirect(`/unlock/${link.shortCode}`)
  } catch (error) {
    console.error('ShortCode lookup error:', error)
    notFound()
  }
}
