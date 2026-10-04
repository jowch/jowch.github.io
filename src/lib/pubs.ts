import { readFile } from 'node:fs/promises'
import { parse } from 'yaml'

export interface Author { name: string; orcid?: string; first?: boolean }
export interface Pub {
  doi?: string
  title: string
  publisher?: string
  authors: Author[]
  URL?: string
  published: number
  selected?: boolean
  type?: 'thesis'
}

// Names that are me, for bolding in author lists
export const ME = new Set(['Jonathan Chen', 'Jonathan W. Chen', 'Jonathan Wenhan Chen'])

export async function loadPubs(): Promise<Pub[]> {
  const raw = parse(await readFile('pubs.yml', 'utf8')) as Pub[]
  return raw
    .filter(p => p.title && p.authors)
    .sort((a, b) => b.published - a.published)
}
