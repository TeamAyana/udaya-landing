import * as React from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'narrow' | 'wide' | 'full'
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'default', ...props }, ref) => {
    const sizeClasses = {
      default: 'max-w-7xl',
      narrow: 'max-w-4xl',
      wide: 'max-w-[90rem]',
      full: 'max-w-full',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto w-full px-5 sm:px-8 lg:px-16',
          sizeClasses[size],
          className
        )}
        {...props}
      />
    )
  }
)

Container.displayName = 'Container'

export { Container }