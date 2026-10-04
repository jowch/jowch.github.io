# [jowch.github.io](https://jowch.github.io)

![Status](https://github.com/jowch/jowch.github.io/actions/workflows/pages.yml/badge.svg)

My personal site and the landing pages for my open-source projects. Built with
[Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com), and
deployed to GitHub Pages by [`.github/workflows/pages.yml`](.github/workflows/pages.yml)
on every push to `main`.

## Where things live

| To change | Edit |
|---|---|
| Research areas on the home page | [`src/data/research.yml`](src/data/research.yml) |
| Publications | [`pubs.yml`](pubs.yml): add a `doi:` line, then `npm run pubs`. Papers without a DOI can be written out in full (title, authors, publisher, published) |
| CV page (hidden until updated; restore by renaming `src/pages/_cv.astro` to `cv.astro` and re-adding the nav link) | [`src/data/cv.yml`](src/data/cv.yml) |
| A project's landing page | [`src/content/projects/<name>.md`](src/content/projects) |
| Colors and fonts | [`src/styles/global.css`](src/styles/global.css) |

`npm run pubs` looks up any unresolved DOI on [Crossref](https://www.crossref.org)
and fills in the title, authors, venue and year. CI runs it on every build too,
so a bare DOI still appears on the site, but committing the resolved file keeps
builds reproducible.

Adding a project means adding one Markdown file to `src/content/projects/`; the
projects index, the home page cards and the stack diagram pick it up from its
frontmatter.

## Project docs

Reference docs generated from code stay in each project's repository and
publish from its own `gh-pages` branch, which GitHub serves under this domain
(for example [jowch.github.io/Masque.jl](https://jowch.github.io/Masque.jl/stable/)).
Landing pages live here under `/projects/` so the two never collide.

## Develop

```
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

Requires Node 22.12 or newer.
