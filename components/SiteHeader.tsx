import Link from 'next/link'

export default function SiteHeader() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold"
          style={{ color: 'var(--primary-color)' }}
        >
          <img src="/logo.png" alt="UnlockFlowURLS" className="h-10" />
          UnlockFlowURLS
        </Link>
        <div className="hidden md:flex gap-6">
          <Link href="/" className="text-gray-700 hover:text-[var(--primary-color)] font-medium">
            Homepage
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-[var(--primary-color)] font-medium">
            About US
          </Link>
          <Link href="/features" className="text-gray-700 hover:text-[var(--primary-color)] font-medium">
            Our Features
          </Link>
          <Link href="/faq" className="text-gray-700 hover:text-[var(--primary-color)] font-medium">
            FAQ
          </Link>
          <Link href="/blog" className="text-gray-700 hover:text-[var(--primary-color)] font-medium">
            Blog & Tips
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-[var(--primary-color)] font-medium">
            Get Support
          </Link>
        </div>
      </div>
    </nav>
  )
}
