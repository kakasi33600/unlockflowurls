import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'
import { blogCategories, blogPosts } from '@/lib/blogPosts'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Guides, tips, and monetization playbooks for unlock links.',
  openGraph: { title: 'Blog', description: 'Guides, tips, and monetization playbooks for unlock links.' },
  twitter: { card: 'summary_large_image' },
}

export default function BlogIndexPage() {
  const [featured, ...rest] = blogPosts
  const recent = blogPosts.slice(0, 4)

  return (
    <div>
      <SiteHeader />
      <main className="section-shell py-10">
        <h1 className="text-4xl" style={{ fontFamily: 'var(--font-heading)' }}>
          UnlockFlow Blog
        </h1>

        <article className="glass-card mt-8 grid gap-6 p-6 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[--accent]">Featured</p>
            <h2 className="mt-2 text-3xl" style={{ fontFamily: 'var(--font-heading)' }}>
              {featured.title}
            </h2>
            <p className="mt-3 text-[--text-muted]">{featured.excerpt}</p>
            <Link href={`/blog/${featured.slug}`} className="primary-cta mt-5 inline-flex">
              Read Featured Post
            </Link>
          </div>
          <div className="overflow-hidden rounded-xl border border-white/10">
            <Image src={featured.cover} alt={featured.title} width={640} height={420} className="h-full w-full object-cover" />
          </div>
        </article>

        <section className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {rest.map((post) => (
              <article key={post.slug} className="glass-card overflow-hidden">
                <Image src={post.cover} alt={post.title} width={460} height={240} className="h-40 w-full object-cover" />
                <div className="p-4">
                  <p className="text-xs text-[--accent]">{post.category}</p>
                  <h3 className="mt-2 text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-[--text-muted]">{post.excerpt}</p>
                  <p className="mt-3 text-xs text-[--text-muted]">
                    {new Date(post.date).toLocaleDateString()} · {post.readTime}
                  </p>
                  <Link href={`/blog/${post.slug}`} className="mt-4 inline-flex text-sm text-[--accent] hover:underline">
                    Read article
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <aside className="space-y-4">
            <div className="glass-card p-5">
              <h3 style={{ fontFamily: 'var(--font-heading)' }}>Categories</h3>
              <ul className="mt-3 space-y-2 text-sm text-[--text-muted]">
                {blogCategories.map((category) => (
                  <li key={category}>{category}</li>
                ))}
              </ul>
            </div>

            <div className="glass-card p-5">
              <h3 style={{ fontFamily: 'var(--font-heading)' }}>Recent Posts</h3>
              <ul className="mt-3 space-y-2 text-sm text-[--text-muted]">
                {recent.map((post) => (
                  <li key={post.slug}>
                    <Link href={`/blog/${post.slug}`} className="hover:text-[--text-primary]">
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
