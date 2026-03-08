import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Url from '@/lib/models/Url'

export async function GET(
  req: NextRequest,
  { params }: { params: { shortCode: string } }
) {
  try {
    await connectDB()
    
    const urlData = await Url.findOneAndUpdate(
      { shortCode: params.shortCode },
      { $inc: { clicks: 1 } },
      { new: true }
    )

    if (!urlData) {
      return NextResponse.redirect(new URL('/404', req.url))
    }

    return NextResponse.redirect(urlData.originalUrl)
  } catch (error) {
    console.error('Redirect error:', error)
    return NextResponse.redirect(new URL('/404', req.url))
  }
}
