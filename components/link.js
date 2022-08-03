export default function NormalLink({children, ...props}) {
  return (
    <a
      {...props}
      className="underline hover:decoration-2 text-sky-900"
      rel="noopener noreferrer"
    >
        {children}
    </a>
  )
}