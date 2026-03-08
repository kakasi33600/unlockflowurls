import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="section-shell py-24">
      <div className="glass-card mx-auto max-w-xl p-8 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-[--text-muted]">404</p>
        <h1 className="mt-2 text-4xl" style={{ fontFamily: 'var(--font-heading)' }}>
          Page Not Found
        </h1>
        <p className="mt-3 text-[--text-muted]">The requested page or short link does not exist.</p>
        <Link href="/" className="primary-cta mt-6 inline-flex">
          Back to Home
        </Link>
      </div>
    </div>
  )
}
