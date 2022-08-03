import Markdown from 'markdown-to-jsx'
import NormalLink from '../components/link'

const Header = ({children}) =>
  <h1 className='font-sans text-xl pb-2'>{children}</h1>

const Paragraph = ({children}) =>
  <p className='text-base max-w-prose mb-2'>{children}</p>

export default function Section({ md, heading, children }) {
  return (
    <section className='font-serif'>
      {(typeof md !== 'undefined') ?
        <Markdown
          children={md}
          options={{
            overrides: {
              h1: {
                component: Header
              },
              a: {
                component: NormalLink
              },
              p: {
                component: Paragraph
              },
              ul: {

              }
            }
          }}
        />
      :
        <div>
          {(typeof heading !== 'undefined') && <Header>{heading}</Header>}
          {children}
        </div>
      }
    </section>
  )
}
