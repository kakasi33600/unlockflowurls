import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-xl shadow-md p-10 text-center max-w-lg w-full">
        <h1 className="text-5xl font-black mb-4" style={{ color: 'var(--primary-color)' }}>
          404
        </h1>
        <h2 className="text-2xl font-bold mb-3">Page Not Found</h2>
        <p className="text-gray-600 mb-6">The page or short link you requested does not exist.</p>
        <Link href="/" className="inline-block px-6 py-3 rounded-lg text-white bg-[var(--primary-color)] font-semibold">
          Go to Homepage
        </Link>
      </div>
    </div>
  )
}
