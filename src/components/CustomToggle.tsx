import React, { ReactNode } from 'react'
import Link from 'next/link'

interface CustomToggleProps {
  children?: ReactNode
  variant?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

const CustomToggle = React.forwardRef<HTMLAnchorElement, CustomToggleProps>(
  ({ children, variant, onClick }, ref) => (
    <Link
      href="/"
      ref={ref as React.RefObject<HTMLAnchorElement>}
      onClick={e => {
        e.preventDefault()
        if (onClick) {
          onClick(e)
        }
      }}
      className={variant}
    >
      {children}
    </Link>
  )
)

CustomToggle.displayName = 'CustomToggle'

export default CustomToggle
