'use client'

import Image from 'next/image'
import Link from 'next/link'

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
]

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="section-shell flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
          <Image src="/logo.png" alt="UnlockFlow logo" width={32} height={32} priority />
          <span>UnlockFlow</span>
        </Link>

        <nav className="flex items-center gap-5 text-sm text-[--text-muted]">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors duration-200 hover:text-[--text-primary]">
              {link.label}
            </Link>
          ))}
          <Link href="/" className="primary-cta text-sm">
            Create Link
          </Link>
        </nav>
      </div>
    </header>
  )
}
