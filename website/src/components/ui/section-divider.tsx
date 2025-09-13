import { cn } from '@/lib/utils'

interface SectionDividerProps {
  variant?: 'wave' | 'lotus' | 'curve'
  color?: string
  className?: string
  flip?: boolean
}

export function SectionDivider({ 
  variant = 'wave', 
  color = '#F6F2E6',
  className,
  flip = false 
}: SectionDividerProps) {
  const dividers = {
    wave: (
      <svg 
        viewBox="0 0 1440 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-full h-auto", flip && "rotate-180", className)}
        preserveAspectRatio="none"
      >
        <path 
          d="M0 50C240 10 480 90 720 50C960 10 1200 90 1440 50V100H0V50Z" 
          fill={color}
        />
      </svg>
    ),
    lotus: (
      <svg 
        viewBox="0 0 1440 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-full h-auto", flip && "rotate-180", className)}
        preserveAspectRatio="none"
      >
        <path 
          d="M0 100C360 100 360 20 720 20C1080 20 1080 100 1440 100H0Z" 
          fill={color}
        />
        <path 
          d="M720 20C680 35 660 50 720 80C780 50 760 35 720 20Z" 
          fill={color}
          opacity="0.5"
        />
      </svg>
    ),
    curve: (
      <svg 
        viewBox="0 0 1440 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-full h-auto", flip && "rotate-180", className)}
        preserveAspectRatio="none"
      >
        <path 
          d="M0 0C480 100 960 100 1440 0V100H0V0Z" 
          fill={color}
        />
      </svg>
    )
  }

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      {dividers[variant]}
    </div>
  )
}