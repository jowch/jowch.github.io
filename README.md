# [jowch.github.io](https://jowch.github.io)

![Status](https://github.com/jowch/jowch.github.io/actions/workflows/pages.yml/badge.svg)

This is my personal website. It was built with automation in mind. This is a
static site is built with [Next.js](https://nextjs.org). The styles are built
with [Tailwind CSS](https://tailwindcss.com). This combination results in a very
no-fuss workflow that I would recommend anybody who wants to make a website for
themselves but doesn't want to spend all of their time doing it.

I've designed the website as a template with the actual content specified by
[`about.md`](about.md) and [`pubs.yml`](pubs.yml). These are the only files that
need to be changed when making small updates. They are pulled into the site at
build time. The publications (specified by [DOI](https://www.doi.org)) are
filled in and updated automatically by calling the [Crossref
API](https://www.crossref.org).

The GitHub actions workflow specified in
[`.github/workflows/pages.yml`](.github/workflows/pages.yml) automatically
starts a build process on commits to the main branch of the repository. It will
commit any changes to the [`pubs.yml`](pubs.yml) file and then deploy to [GitHub
Pages](https://pages.github.com).

This set up allows for low energy updates to the website, which means more time
spent working on research!
