import Link from 'next/link'
import { notFound } from 'next/navigation'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { blogPosts } from '@/lib/blogPosts'

export default function BlogSinglePage({ params }: { params: { id: string } }) {
  const postId = Number(params.id)
  const post = blogPosts.find((p) => p.id === postId)

  if (!post) {
    notFound()
  }

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 2)

  return (
    <div>
      <SiteHeader />

      <section className="hero">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1>{post.title}</h1>
          <p>
            {post.category} • {new Date(post.date).toLocaleDateString()} • {post.readTime}
          </p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
          <p className="text-gray-700 leading-8">{post.content}</p>
        </div>
      </section>

      <section className="py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {relatedPosts.map((related) => (
              <div key={related.id} className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold mb-2">{related.title}</h3>
                <p className="text-gray-600 mb-3">{related.excerpt}</p>
                <Link href={`/blog/${related.id}`} className="text-[var(--primary-color)] font-semibold">
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
