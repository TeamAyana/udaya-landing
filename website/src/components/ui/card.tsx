import * as React from 'react'
import { cn } from '@/lib/utils'

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    hover3d?: boolean
    glass?: boolean
  }
>(({ className, hover3d = false, glass = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'relative rounded-lg transition-all duration-300 ease-out',
      glass 
        ? 'bg-white/80 backdrop-blur-sm border border-white/20' 
        : 'bg-white',
      hover3d 
        ? 'hover:shadow-2xl hover:scale-[1.02] transform-gpu perspective-1000' 
        : 'hover:shadow-xl',
      'before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-udaya-sage/0 before:to-udaya-gold/0 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-10',
      className
    )}
    style={{
      transform: hover3d ? 'translateZ(0)' : undefined,
    }}
    {...props}
  />
))
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'font-serif text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-udaya-charcoal/70', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }