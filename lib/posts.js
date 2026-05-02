import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'

const POSTS_DIR = path.join(process.cwd(), 'posts')

// Category display order for /writing
export const CATEGORIES = ['essay', 'note', 'curiosity']

export const CATEGORY_LABELS = {
  essay: 'Essays',
  note: 'Notes',
  curiosity: 'Curiosities & Observations',
}

const parsePost = (filename, raw) => {
  const { data, content } = matter(raw)
  const slug = filename.replace(/\.md$/, '')
  return { slug, content, ...data }
}

export const getAllPosts = async () => {
  const files = await fs.readdir(POSTS_DIR)
  const posts = await Promise.all(
    files
      .filter(f => f.endsWith('.md'))
      .map(async filename => {
        const raw = await fs.readFile(path.join(POSTS_DIR, filename), 'utf8')
        return parsePost(filename, raw)
      })
  )
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
}

export const getPostBySlug = async slug => {
  const raw = await fs.readFile(path.join(POSTS_DIR, `${slug}.md`), 'utf8')
  return parsePost(`${slug}.md`, raw)
}

export const getPostsByCategory = async () => {
  const posts = await getAllPosts()
  const grouped = {}
  for (const cat of CATEGORIES) {
    grouped[cat] = posts.filter(p => p.category === cat)
  }
  return grouped
}
