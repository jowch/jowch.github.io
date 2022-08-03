import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const IconLink = ({ children, icon, ...props }) => (
  <a {...props} className='inline-block relative p-1 m-[-4px] hover:border-b-2 hover:text-blue-600'>
    <FontAwesomeIcon icon={icon} size='sm' />
  </a>
)

export default function Nav() {
  return (
    <nav className='mb-4 border-b-2 p-3'>
      <div className='max-w-screen-md mx-auto'>
        <span className='text-xl'>Jonathan Chen</span>
        <div className='float-right text-lg space-x-2'>
          <IconLink href='mailto:jwhc@ucla.edu' title='Email' icon={faEnvelope} />
          <IconLink href='https://github.com/jowch' title='GitHub' icon={faGithub} />
          <IconLink href='https://www.linkedin.com/in/jowch/' title='LinkedIn' icon={faLinkedinIn} />
          <IconLink href='https://twitter.com/jowch' title='Twitter' icon={faTwitter} />
        </div>
      </div>
    </nav>
  )
}
