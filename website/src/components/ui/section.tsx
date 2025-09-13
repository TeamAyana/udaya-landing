import * as React from 'react'
import { cn } from '@/lib/utils'

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'cream' | 'white'
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variantClasses = {
      default: 'bg-white',
      cream: 'bg-udaya-cream',
      white: 'bg-white',
    }

    return (
      <section
        ref={ref}
        className={cn(
          'py-section',
          variantClasses[variant],
          className
        )}
        {...props}
      />
    )
  }
)

Section.displayName = 'Section'

export { Section }