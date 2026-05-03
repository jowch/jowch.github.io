import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import NormalLink from '../components/link'
import PostCard from '../components/post-card'
import { loadIndex } from '../lib/pubs'
import { getAllPosts } from '../lib/posts'
import path from 'path'

import Section from '../components/section'
import Pub from '../components/pub'
import headshot from '../public/images/headshot.jpg'
import { promises as fs } from 'fs'

const ProjectCard = ({ title, description, href }) => (
  <div className="border-l pl-3 border-slate-200 dark:border-slate-700 space-y-0.5">
    <NormalLink href={href} className="font-sans font-medium text-base">
      {title}
    </NormalLink>
    <p className="font-serif text-sm text-slate-600 dark:text-slate-400">{description}</p>
  </div>
)

const PROJECTS = [
  {
    title: 'Himalaya.jl',
    href: 'https://github.com/jowch/Himalaya.jl',
    description: 'A Julia toolkit for lipid phase analysis of small-angle X-ray scattering (SAXS) data. Peak detection, phase identification, and visualization.',
  },
  {
    title: 'Wordle.jl',
    href: 'https://github.com/jowch/Wordle.jl',
    description: 'A Wordle implementation in Julia — for the joy of it, and as a study in how far a functional language can carry a game loop.',
  },
]

export default function HomePage({ about, pubs, recentPosts }) {
  return (
    <main>
      <Head>
        <title>Jonathan Chen</title>
      </Head>
      <article className='flex flex-col items-center px-[50px] pt-[30px] pb-[50px] max-w-(--breakpoint-md) mx-auto sm:flex-row sm:items-start'>
        <figure className='shrink-0 max-w-[150px]'>
          <Image
            src={headshot}
            width={150}
            height={210}
            placeholder='blur'
            alt="Jonathan Chen"
            className='dark:brightness-[.85]'
          />
          <figcaption className='font-serif text-base'>
            PhD Student, UCLA Bioengineering
            <div>
              <NormalLink href="mailto:jwhc@ucla.edu">jwhc@ucla.edu</NormalLink>
              &nbsp;
              <NormalLink href="https://raw.githubusercontent.com/jowch/vitae/master/cv.pdf">CV</NormalLink>
            </div>
          </figcaption>
        </figure>
        <div className='h-8 sm:w-10'/>
        <div className='min-w-[200px] space-y-8'>
          <Section md={about} />

          <Section heading="Current Work">
            <p className="font-serif text-base max-w-prose">
              I'm currently focused on using transformers and deep kernel learning to
              model the fitness landscape of antimicrobial peptides — trying to understand
              which sequence features drive activity and selectivity. The goal is to make
              the search over sequence space less like guessing and more like navigation.
            </p>
          </Section>

          <Section heading="Publications">
            <div className='space-y-4'>
              {pubs.map((pub, i) => (
                <Pub key={`pub-${i}`} pub={pub} />
              ))}
            </div>
          </Section>

          {recentPosts.length > 0 && (
            <Section heading="Recent Writing">
              <div className="space-y-5">
                {recentPosts.map(post => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
              <p className="font-sans text-sm mt-4">
                <NormalLink href="/writing">All writing →</NormalLink>
              </p>
            </Section>
          )}

          <Section heading="Projects">
            <div className="space-y-5">
              {PROJECTS.map(p => (
                <ProjectCard key={p.title} {...p} />
              ))}
            </div>
          </Section>
        </div>
      </article>
    </main>
  )
}

export async function getStaticProps(context) {
  let pubs = await loadIndex(path.join(process.cwd(), 'pubs.yml'))
  let about = await fs.readFile(path.join(process.cwd(), 'about.md'), 'utf8')
  let allPosts = await getAllPosts()
  let recentPosts = allPosts.slice(0, 3).map(({ content: _, ...meta }) => ({
    ...meta,
    date: meta.date instanceof Date ? meta.date.toISOString() : meta.date,
  }))

  return {
    props: {
      about,
      pubs,
      recentPosts,
    },
  }
}
