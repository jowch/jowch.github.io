import NormalLink from "./link"

const ME = new Set([
  "Jonathan Chen",
  "Jonathan W. Chen",
  "Jonathan Wenhan Chen"
])

export default function Pub({ pub, ...props }) {
  const { authors, title, publisher, published: year, URL } = pub

  return (
    <div {...props} className="max-w-prose space-y-1">
      <h2 className="text-base font-medium">{title}</h2>
      <div>
        {authors.map(({ name }, i) => (
          <span
            key={`${props.key}-author-${i}`}
            className={ME.has(name) && "font-semibold"}
          >
            {name}{i != authors.length - 1 && ", "}
          </span>
        ))}
      </div>
      <div>
        <span className="italic">{publisher}, {year}</span>
      </div>
      <div>
        [ <NormalLink href={URL}>Paper</NormalLink> ]
      </div>
    </div>
  )
}
