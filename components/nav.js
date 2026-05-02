import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const IconLink = ({ children, icon, ...props }) => (
  <a {...props} className='inline-block relative p-1 m-[-4px] hover:border-b-2 hover:text-sky-900 dark:hover:text-[#84c9f2] dark:border-[#84c9f2]'>
    <FontAwesomeIcon icon={icon} size='sm' />
  </a>
)

export default function Nav() {
  return (
    <nav className='mb-4 border-b-2 dark:border-[#313d43] p-3'>
      <div className='max-w-(--breakpoint-md) mx-auto flex items-center justify-between'>
        <div className='flex items-baseline gap-5'>
          <Link href="/" className='text-xl hover:border-b-2 hover:text-sky-900 dark:hover:text-[#84c9f2] dark:border-[#84c9f2]'>
            Jonathan Chen
          </Link>
          <Link href="/writing" className='font-sans text-sm text-slate-500 dark:text-slate-400 hover:text-sky-900 dark:hover:text-[#84c9f2]'>
            Writing
          </Link>
        </div>
        <div className='flex items-center gap-2 text-lg'>
          <IconLink href='mailto:jwhc@ucla.edu' title='Email' icon={faEnvelope} />
          <IconLink href='https://github.com/jowch' title='GitHub' icon={faGithub} />
          <IconLink href='https://www.linkedin.com/in/jowch/' title='LinkedIn' icon={faLinkedinIn} />
          <IconLink href='https://twitter.com/jowch' title='Twitter' icon={faTwitter} />
        </div>
      </div>
    </nav>
  )
}
