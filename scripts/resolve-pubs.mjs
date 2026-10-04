// Fills in title, authors, venue and year for any entry in pubs.yml that
// hasn't been looked up yet, using the Crossref API. Run with `npm run pubs`
// after adding a DOI, then commit pubs.yml. CI runs it too, so a DOI added
// without running it still shows up on the site.
import { readFile, writeFile } from 'node:fs/promises'
import { parse, stringify } from 'yaml'

const FILE = new URL('../pubs.yml', import.meta.url)
const index = parse(await readFile(FILE, 'utf8')) ?? []

const todo = index.filter(p => p.doi && !p.checked && !p.donotcheck)
if (todo.length === 0) {
  console.log('pubs.yml: nothing to resolve')
  process.exit(0)
}

for (const entry of todo) {
  try {
    const res = await fetch(`https://api.crossref.org/works/${entry.doi}`, {
      headers: { 'User-Agent': 'jowch.github.io (https://jowch.github.io)' },
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const ref = (await res.json()).message
    Object.assign(entry, {
      title: ref.title[0],
      publisher: ref['container-title']?.[0] || ref.publisher,
      authors: (ref.author ?? []).map(({ ORCID = '', given, family, sequence }) => ({
        orcid: ORCID,
        name: [given, family].filter(Boolean).join(' '),
        first: sequence === 'first',
      })),
      URL: ref.URL,
      published: (ref.published ?? ref.issued)['date-parts'][0][0],
      checked: true,
    })
    console.log(`resolved ${entry.doi}`)
  } catch (err) {
    console.warn(`could not resolve ${entry.doi}: ${err.message}`)
  }
}

index.sort((a, b) => (b.published ?? 0) - (a.published ?? 0))
await writeFile(FILE, stringify(index))
