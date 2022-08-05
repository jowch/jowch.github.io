export default function NormalLink({children, ...props}) {
  return (
    <a
      {...props}
      className="underline hover:decoration-2 text-sky-900 dark:text-[#84c9f2]"
      rel="noopener noreferrer"
    >
        {children}
    </a>
  )
}