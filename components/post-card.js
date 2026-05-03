import Link from 'next/link'

export default function PostCard({ post }) {
  return (
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
}
