import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 relative overflow-hidden magnetic-button',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-udaya-sage to-udaya-sage/90 text-white hover:from-udaya-sage/90 hover:to-udaya-sage focus-visible:ring-udaya-sage shadow-lg hover:shadow-xl hover:scale-105 before:absolute before:inset-0 before:bg-white/20 before:opacity-0 hover:before:opacity-100 before:transition-opacity',
        secondary:
          'bg-udaya-cream text-udaya-charcoal hover:bg-udaya-cream/80 focus-visible:ring-udaya-cream shadow-md hover:shadow-lg',
        outline:
          'border-2 border-udaya-sage bg-transparent text-udaya-sage hover:bg-udaya-sage hover:text-white focus-visible:ring-udaya-sage hover:shadow-lg hover:scale-105',
        ghost:
          'hover:bg-udaya-sage/10 text-udaya-sage focus-visible:ring-udaya-sage',
        link:
          'text-udaya-sage underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 px-4',
        lg: 'h-12 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }