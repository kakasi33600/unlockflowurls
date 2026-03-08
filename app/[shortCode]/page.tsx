import { notFound, redirect } from 'next/navigation'
import connectDB from '@/lib/db'
import Url from '@/lib/models/Url'

export default async function ShortCodePage({ params }: { params: { shortCode: string } }) {
  await connectDB()
  const urlData = await Url.findOne({ shortCode: params.shortCode })
  
  if (!urlData) {
    notFound()
  }

  redirect(`/redirect/${params.shortCode}/1`)
}
