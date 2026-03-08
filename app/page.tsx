import type { Metadata } from 'next'
import HomeClient from '@/components/HomeClient'

export const metadata: Metadata = {
  title: 'Unlock Links. Earn More.',
  description: 'Create smart unlock links with a 2-step flow. Free forever.',
  openGraph: {
    title: 'Unlock Links. Earn More.',
    description: 'Create smart unlock links with a 2-step flow. Free forever.',
  },
  twitter: { card: 'summary_large_image' },
}

export default function HomePage() {
  return <HomeClient />
}
