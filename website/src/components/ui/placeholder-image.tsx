import { cn } from '@/lib/utils'

interface PlaceholderImageProps {
  width?: number
  height?: number
  text?: string
  className?: string
  type?: 'hero' | 'card' | 'testimonial' | 'retreat' | 'about'
}

export function PlaceholderImage({
  width = 400,
  height = 300,
  text = 'Image Placeholder',
  className,
  type = 'card'
}: PlaceholderImageProps) {
  const bgColors = {
    hero: 'bg-gradient-to-br from-udaya-gold/20 via-udaya-sage/10 to-udaya-cream',
    card: 'bg-udaya-cream',
    testimonial: 'bg-udaya-sage/10',
    retreat: 'bg-gradient-to-b from-udaya-gold/10 to-udaya-cream',
    about: 'bg-gradient-to-br from-udaya-sage/20 to-udaya-cream'
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-lg overflow-hidden',
        bgColors[type],
        className
      )}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <div className="text-center p-4">
        <svg
          className="mx-auto h-12 w-12 text-udaya-sage/30 mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p className="text-sm text-udaya-charcoal/50">{text}</p>
      </div>
    </div>
  )
}