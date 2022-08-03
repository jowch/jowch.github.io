import Head from 'next/head'
import Image from 'next/image'
import NormalLink from '../components/link'
import { loadIndex } from '../lib/pubs'
import path from 'path' 

import Section from '../components/section'
import Pub from '../components/pub'
import headshot from '../public/images/headshot.jpg'

const about = `
# About

I'm a PhD student at [UCLA](https://www.ucla.edu/) studying with [Gerard
Wong](https://samueli.ucla.edu/people/gerard-wong/). I am interested in applying
langauge models like AlphaFold to study peptides.

I'm also a [Julia](https://julialang.org) enthusiast!

Previously, I studied [Computer Science](https://cse.wustl.edu) and
[Biology](https://biology.wustl.edu) at [Washington University in St.
Louis](https://wustl.edu/), ultimately receiving BS and MS degrees.
`

const projects = `
# Projects

- Feature Extraction
- Neural Network Kernel Functions
- Peptide Drug Design and Optimization
`

export default function HomePage({ pubs }) {
  return (
    <main className='container mx-auto'>
      <Head>
        <title>Jonathan Chen</title>
      </Head>
      <article className='flex flex-col px-[50px] sm:flex-row items-center sm:items-start sm:justify-between sm:max-w-fit sm:mx-auto'>
        <figure className='float-left max-w-[150px]'>
          <Image
            src={headshot}
            layout='intrinsic'
            placeholder='blur'
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
          <Section md={projects} />
          <Section heading="Publications">
            <div className='space-y-4'>
              {pubs.map((pub, i) => (
                <Pub key={`pub-${i}`} pub={pub} />
              ))}
            </div>
          </Section>
        </div>
      </article>
    </main>
  );
}

export async function getStaticProps(context) {
  let pubs = await loadIndex(path.join(process.cwd(), 'pubs.yml'))

  return {
    props: {
      pubs
    },
  }
}
