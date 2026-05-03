import Head from 'next/head'
import Markdown from 'markdown-to-jsx'
import NormalLink from '../../components/link'
import { getAllPosts, getPostBySlug, CATEGORY_LABELS } from '../../lib/posts'

const Heading = ({ children, level }) => {
  const Tag = `h${level}`
  const sizes = { 1: 'text-xl', 2: 'text-lg', 3: 'text-base' }
  return <Tag className={`font-sans font-medium ${sizes[level] || 'text-base'} mt-6 mb-2`}>{children}</Tag>
}

const Paragraph = ({ children }) =>
  <p className="font-serif text-base max-w-prose mb-4 leading-relaxed">{children}</p>

export default function Post({ post }) {
  const { title, date, category, content } = post
  return (
    <main>
      <Head>
        <title>{title} — Jonathan Chen</title>
      </Head>
      <article className="px-[50px] pt-[30px] pb-[50px] max-w-(--breakpoint-md) mx-auto">
        <header className="mb-8 space-y-1">
          <p className="font-sans text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wide">
            {CATEGORY_LABELS[category]}
          </p>
          <h1 className="font-sans text-2xl font-medium">{title}</h1>
          <p className="font-sans text-sm text-slate-500 dark:text-slate-400">
            {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </header>
        <Markdown
          children={content}
          options={{
            overrides: {
              // Page title is already h1; treat markdown # as h2 to avoid duplicate h1s.
              h1: { component: Heading, props: { level: 2 } },
              h2: { component: Heading, props: { level: 2 } },
              h3: { component: Heading, props: { level: 3 } },
              a: { component: NormalLink },
              p: { component: Paragraph },
            }
          }}
        />
      </article>
    </main>
  )
}

export async function getStaticPaths() {
  const posts = await getAllPosts()
  return {
    paths: posts.map(p => ({ params: { slug: p.slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug)
  if (!post) return { notFound: true }
  return {
    props: {
      post: {
        ...post,
        date: post.date instanceof Date ? post.date.toISOString() : post.date,
      }
    }
  }
}
