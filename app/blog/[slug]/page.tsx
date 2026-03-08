import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'
import { blogPosts } from '@/lib/blogPosts'

type PageProps = { params: { slug: string } }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = blogPosts.find((item) => item.slug === params.slug)
  if (!post) return { title: 'Post Not Found' }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt },
    twitter: { card: 'summary_large_image' },
  }
}

export default function BlogPostPage({ params }: PageProps) {
  const post = blogPosts.find((item) => item.slug === params.slug)
  if (!post) notFound()

  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3)

  return (
    <div>
      <SiteHeader />
      <main className="section-shell grid gap-8 py-10 lg:grid-cols-[240px_1fr]">
        <aside className="glass-card h-fit p-4 text-sm text-[--text-muted]">
          <p className="font-semibold text-[--text-primary]">Table of contents</p>
          <ul className="mt-3 space-y-2">
            {post.sections.map((section) => (
              <li key={section.heading}>
                <a href={`#${section.heading.replace(/\s+/g, '-').toLowerCase()}`} className="hover:text-[--text-primary]">
                  {section.heading}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <article className="glass-card p-6">
          <p className="text-xs uppercase tracking-[0.25em] text-[--accent]">{post.category}</p>
          <h1 className="mt-2 text-4xl" style={{ fontFamily: 'var(--font-heading)' }}>
            {post.title}
          </h1>
          <p className="mt-2 text-sm text-[--text-muted]">
            {new Date(post.date).toLocaleDateString()} · {post.readTime} · {post.author}
          </p>

          <div className="mt-8 space-y-8">
            {post.sections.map((section) => (
              <section key={section.heading} id={section.heading.replace(/\s+/g, '-').toLowerCase()}>
                <h2 className="text-2xl" style={{ fontFamily: 'var(--font-heading)' }}>
                  {section.heading}
                </h2>
                <div className="mt-3 space-y-4 text-[--text-muted]">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="mt-10 border-t border-white/10 pt-6">
            <h3 className="text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
              Author
            </h3>
            <p className="mt-2 text-[--text-muted]">
              UnlockFlowURLS Editorial publishes tactical playbooks for creators, marketers, and growth teams.
            </p>
          </section>

          <section className="mt-8 flex flex-wrap gap-2">
            {['X', 'LinkedIn', 'Facebook'].map((label) => (
              <button key={label} className="rounded-md border border-white/15 px-3 py-2 text-xs hover:bg-white/10">
                Share on {label}
              </button>
            ))}
          </section>

          <section className="mt-10">
            <h3 className="text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
              Related posts
            </h3>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              {related.map((item) => (
                <Link key={item.slug} href={`/blog/${item.slug}`} className="rounded-lg border border-white/10 p-3 text-sm hover:bg-white/5">
                  {item.title}
                </Link>
              ))}
            </div>
          </section>
        </article>
      </main>
      <SiteFooter />
    </div>
  )
}
