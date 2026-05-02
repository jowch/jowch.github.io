import Head from 'next/head'
import Link from 'next/link'
import { getPostsByCategory, CATEGORIES, CATEGORY_LABELS } from '../../lib/posts'

const PostRow = ({ post }) => (
  <div className="border-l pl-3 border-slate-200 dark:border-slate-700 space-y-0.5">
    <Link href={`/writing/${post.slug}`} className="font-sans font-medium text-base hover:underline hover:decoration-2 text-sky-900 dark:text-[#84c9f2]">
      {post.title}
    </Link>
    {post.description && (
      <p className="font-serif text-sm text-slate-600 dark:text-slate-400">{post.description}</p>
    )}
    <p className="font-sans text-xs text-slate-400 dark:text-slate-500">
      {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
    </p>
  </div>
)

export default function Writing({ grouped }) {
  return (
    <main>
      <Head>
        <title>Writing — Jonathan Chen</title>
      </Head>
      <article className="px-[50px] pt-[30px] pb-[50px] max-w-(--breakpoint-md) mx-auto space-y-10">
        {CATEGORIES.map(cat => {
          const posts = grouped[cat]
          if (!posts || posts.length === 0) return null
          return (
            <section key={cat} className="space-y-4">
              <h1 className="font-sans text-xl">{CATEGORY_LABELS[cat]}</h1>
              <div className="space-y-5">
                {posts.map(post => (
                  <PostRow key={post.slug} post={post} />
                ))}
              </div>
            </section>
          )
        })}
      </article>
    </main>
  )
}

export async function getStaticProps() {
  const grouped = await getPostsByCategory()
  // Serialize dates to strings for JSON serialization
  const serialized = {}
  for (const [cat, posts] of Object.entries(grouped)) {
    serialized[cat] = posts.map(({ content: _, ...meta }) => meta)
  }
  return { props: { grouped: serialized } }
}
