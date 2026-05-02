// CJS script — runs standalone via `node lib/rss.js` before/during build.
// Cannot use ESM imports since it runs outside Next.js compilation.
const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const POSTS_DIR = path.join(process.cwd(), 'posts')
const OUT = path.join(process.cwd(), 'public', 'feed.xml')
const BASE_URL = 'https://jowch.github.io'

const getAllPosts = () => {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs.readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.md'))
    .map(filename => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf8')
      const { data, content } = matter(raw)
      return { slug: filename.replace(/\.md$/, ''), content, ...data }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

const escapeXml = str =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const buildFeed = posts => `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Jonathan Chen</title>
    <link>${BASE_URL}</link>
    <description>Writing by Jonathan Chen — essays, notes, and curiosities.</description>
    <language>en-us</language>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts.map(post => `<item>
      <title>${escapeXml(post.title)}</title>
      <link>${BASE_URL}/writing/${escapeXml(post.slug)}</link>
      <guid>${BASE_URL}/writing/${escapeXml(post.slug)}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.description || '')}</description>
    </item>`).join('\n    ')}
  </channel>
</rss>`

const posts = getAllPosts()
fs.writeFileSync(OUT, buildFeed(posts), 'utf8')
console.log(`RSS feed written with ${posts.length} post(s) → ${OUT}`)
