'use client'

import Link from 'next/link'

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 py-12 text-sm text-[--text-muted]">
      <div className="section-shell grid gap-8 md:grid-cols-3">
        <div>
          <p className="mb-2 text-[--text-primary]" style={{ fontFamily: 'var(--font-heading)' }}>
            UnlockFlow
          </p>
          <p>Smart link unlocking with premium speed and reliability.</p>
        </div>
        <div className="space-y-2">
          <Link href="/privacy" className="block transition-colors hover:text-[--text-primary]">
            Privacy
          </Link>
          <Link href="/terms" className="block transition-colors hover:text-[--text-primary]">
            Terms
          </Link>
          <Link href="/contact" className="block transition-colors hover:text-[--text-primary]">
            Contact
          </Link>
        </div>
        <div>
          <p>© {new Date().getFullYear()} UnlockFlowURLs.com</p>
        </div>
      </div>
    </footer>
  )
}
