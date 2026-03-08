import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://unlockflowurls.com'),
  title: {
    default: 'UnlockFlow | Smart Unlock Links',
    template: '%s | UnlockFlow',
  },
  description:
    'Create high-converting unlock links with a clean 2-step flow, analytics, and reliable redirects.',
  openGraph: {
    title: 'UnlockFlow | Smart Unlock Links',
    description:
      'Create high-converting unlock links with a clean 2-step flow, analytics, and reliable redirects.',
    type: 'website',
    url: 'https://unlockflowurls.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UnlockFlow | Smart Unlock Links',
    description:
      'Create high-converting unlock links with a clean 2-step flow, analytics, and reliable redirects.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[--bg-primary] text-[--text-primary]">
        {children}
      </body>
    </html>
  )
}
