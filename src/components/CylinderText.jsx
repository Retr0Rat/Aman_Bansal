import '../styles/cylinder.css'

export default function CylinderText({
  children,
  as,
  href,
  onClick,
  download,
  target,
  rel,
  type,
  className = '',
  style = {},
  charClass = '',
}) {
  const Tag = href ? 'a' : (as || 'span')
  const text = String(children)

  const chars = text.split('').map((ch, i) => {
    if (ch === ' ') return <span key={i} className="cyl-space" />
    const isOdd = i % 2 === 0
    return (
      <span key={i} className="cyl-wrap" data-odd={isOdd ? '1' : '0'}>
        <span className={`cyl-orig ${charClass}`}>{ch}</span>
        <span className={`cyl-clone ${charClass}`}>{ch}</span>
      </span>
    )
  })

  return (
    <Tag
      href={href}
      onClick={onClick}
      download={download}
      target={target}
      rel={rel}
      type={type}
      className={`cyl-text ${className}`}
      style={style}
    >
      {chars}
    </Tag>
  )
}
