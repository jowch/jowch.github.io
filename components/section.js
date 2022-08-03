import Markdown from 'markdown-to-jsx'
import NormalLink from '../components/link'


export default function Section({ children }) {
  return (
    <section className='font-serif'>
      <Markdown
        children={children}
        options={{
          overrides: {
            h1: {
              component: ({children}) => <h1 className='font-sans text-xl'>{children}</h1>
            },
            a: {
              component: NormalLink
            },
            p: {
              component: ({children}) => <p className='text-base max-w-prose my-2'>{children}</p>
            }
          }
        }}
      >
        {children}
      </Markdown>
    </section>
  )
}
