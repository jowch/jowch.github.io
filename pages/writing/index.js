import Head from 'next/head'
import PostCard from '../../components/post-card'
import { getPostsByCategory, CATEGORIES, CATEGORY_LABELS } from '../../lib/posts'

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
              <h2 className="font-sans text-xl">{CATEGORY_LABELS[cat]}</h2>
              <div className="space-y-5">
                {posts.map(post => (
                  <PostCard key={post.slug} post={post} />
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
    serialized[cat] = posts.map(({ content: _, ...meta }) => ({
      ...meta,
      date: meta.date instanceof Date ? meta.date.toISOString() : meta.date,
    }))
  }
  return { props: { grouped: serialized } }
}
