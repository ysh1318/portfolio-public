import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'fade'

interface RevealProps {
  children: ReactNode
  direction?: Direction
  /** Stagger delay in ms, e.g. index * 120 for a grid of cards. */
  delay?: number
  className?: string
  as?: 'div' | 'li'
}

/**
 * Wraps any block in a scroll-triggered slide/fade-in. One shared
 * mechanism for every "appears by sliding from side/up/down" moment
 * across the site instead of bespoke animations per section.
 *
 * Fires once (IntersectionObserver, disconnects after first trigger)
 * and fully respects prefers-reduced-motion (renders visible, no
 * animation, immediately).
 */
export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  as = 'div',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReducedMotion) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const Tag = as
  return (
    <Tag
      ref={ref as never}
      className={`reveal reveal-${direction} ${visible ? 'reveal-visible' : ''} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  )
}
