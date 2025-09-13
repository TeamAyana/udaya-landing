'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ScrollAnimationProps {
  children: ReactNode
  className?: string
  animation?: 'fade-up' | 'fade-in' | 'scale' | 'slide-left' | 'slide-right'
  delay?: number
  threshold?: number
}

export function ScrollAnimation({
  children,
  className,
  animation = 'fade-up',
  delay = 0,
  threshold = 0.1
}: ScrollAnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-in')
            }, delay)
          }
        })
      },
      { threshold }
    )

    observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [delay, threshold])

  const animations = {
    'fade-up': 'opacity-0 translate-y-8 animate-in:opacity-100 animate-in:translate-y-0',
    'fade-in': 'opacity-0 animate-in:opacity-100',
    'scale': 'opacity-0 scale-95 animate-in:opacity-100 animate-in:scale-100',
    'slide-left': 'opacity-0 translate-x-8 animate-in:opacity-100 animate-in:translate-x-0',
    'slide-right': 'opacity-0 -translate-x-8 animate-in:opacity-100 animate-in:translate-x-0'
  }

  return (
    <div
      ref={elementRef}
      className={cn(
        'transition-all duration-700 ease-out',
        animations[animation],
        className
      )}
    >
      {children}
    </div>
  )
}