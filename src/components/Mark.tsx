type Props = {
  /** Rendered size in px. */
  size?: number
  className?: string
}

/**
 * The SteelThreads mark: a machined slab with the thread as a negative-space
 * channel dropping one level, and a teal terminal where the path exits.
 * The slab inherits `currentColor` so it follows the surrounding text color.
 */
export function Mark({ size = 28, className }: Props) {
  return (
    <svg
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="SteelThreads mark"
    >
      <path
        fill="currentColor"
        d="M72 56H314L424 168V304H260A8 8 0 0 1 252 296V216A48 48 0 0 0 204 168H40V88A32 32 0 0 1 72 56Z"
      />
      <path
        fill="currentColor"
        d="M40 208H204A8 8 0 0 1 212 216V296A48 48 0 0 0 260 344H424V424A32 32 0 0 1 392 456H72A32 32 0 0 1 40 424Z"
      />
      <circle fill="var(--accent-text)" cx="454" cy="324" r="18" />
    </svg>
  )
}
