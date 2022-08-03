import { promises as fs } from 'fs'
import pThrottle from 'p-throttle'
import { join } from 'path'
import { parse, stringify } from 'yaml'

const CROSSREF_API = "https://api.crossref.org"

const throttle = pThrottle({
  limit: 25,
  interval: 1000
})

const fetchRef = throttle(doi =>
  fetch(`${CROSSREF_API}/works/${doi}`)
    .then(res => res.json())
    .then(data => data.message),
  200, {leading: true, accumulate: true})

const extractAuthors = ({ ORCID = '', given, family, sequence }) => {
  return {
    orcid: ORCID,
    name: ([given, family]).join(' '),
    first: sequence === 'first'
  }
}

const extractDate = refPublished => {
  let d = new Date(refPublished['date-parts'][0].join('-'))
  return `${d.toLocaleString('default', { month: 'long' })}, ${d.getFullYear()}`
}

const extractFields = ref => {
  let title = ref["title"][0]
  let { publisher, URL } = ref

  // publisher, author, URL, published 
  let authors = ref.author.map(extractAuthors)
  let published = extractDate(ref.published)

  return { title, publisher, authors, URL, published }
}

export const loadIndex = async path => {
  const file = await fs.readFile(path, 'utf8')
  let index = parse(file)

  let doisToLookUp = index
    .map((entry, i) => [i, entry])
    .filter(([_, { checked, donotcheck }]) => !donotcheck && !checked)
    .map(([i, { doi }]) => [i, doi])

  if (doisToLookUp.length != 0) {
    let fetched = await Promise.all(doisToLookUp.map(async ([i, doi]) => ([
      i, await fetchRef(doi).then(extractFields).catch(err => {
        console.warn(err)
        return null
      })
    ])))

    for (const [i, data] of fetched) {
      if (data != null)
        index[i] = { ...index[i], ...data, checked: true }
    }

    fs.writeFile(path, stringify(index), 'utf-8')
  }

  return index.sort(({ published: a }, { published: b }) => {
    let ad = new Date(a)
    let bd = new Date(b)

    return ad - bd
  })
}