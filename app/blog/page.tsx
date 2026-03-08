import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { blogPosts } from '@/lib/blogPosts'

export default function BlogPage() {
  return (
    <div>
      <SiteHeader />

      <section className="hero">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1>Our Blog</h1>
          <p>Tips, tricks, and insights to maximize URL shortening results.</p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-8">
                <div className="flex gap-4 text-sm text-gray-500 mb-3">
                  <span>{post.category}</span>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-2xl font-bold mb-3">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link href={`/blog/${post.id}`} className="text-[var(--primary-color)] font-bold">
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
