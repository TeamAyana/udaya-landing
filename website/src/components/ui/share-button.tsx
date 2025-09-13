'use client'

import { useState } from 'react'
import { Share2, Copy, Check, Facebook, Twitter, Linkedin, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ShareButtonProps {
  title: string
  url?: string
  description?: string
  className?: string
}

export function ShareButton({ title, url, description, className }: ShareButtonProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [copied, setCopied] = useState(false)
  
  // Use current URL if not provided
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
  const shareText = description || title

  const shareOptions = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'hover:bg-blue-50 hover:text-blue-600',
      action: () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
          '_blank',
          'width=600,height=400'
        )
      }
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'hover:bg-sky-50 hover:text-sky-600',
      action: () => {
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
          '_blank',
          'width=600,height=400'
        )
      }
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'hover:bg-blue-50 hover:text-blue-700',
      action: () => {
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
          '_blank',
          'width=600,height=400'
        )
      }
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'hover:bg-gray-50 hover:text-gray-700',
      action: () => {
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`
      }
    },
    {
      name: 'Copy Link',
      icon: copied ? Check : Copy,
      color: copied ? 'bg-green-50 text-green-600' : 'hover:bg-gray-50 hover:text-gray-700',
      action: () => {
        navigator.clipboard.writeText(shareUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    }
  ]

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: shareText,
          url: shareUrl
        })
      } catch (error) {
        // User cancelled or share failed
        console.log('Share cancelled')
      }
    } else {
      setShowMenu(!showMenu)
    }
  }

  return (
    <div className={cn("relative", className)}>
      <Button 
        variant="outline" 
        size="sm"
        onClick={handleNativeShare}
        onBlur={() => setTimeout(() => setShowMenu(false), 200)}
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </Button>
      
      {showMenu && (
        <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-xl border border-gray-200 p-2 min-w-[200px] animate-fade-up">
          <div className="grid gap-1">
            {shareOptions.map((option) => {
              const Icon = option.icon
              return (
                <button
                  key={option.name}
                  onClick={() => {
                    option.action()
                    if (option.name !== 'Copy Link') {
                      setShowMenu(false)
                    }
                  }}
                  className={cn(
                    "flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md transition-colors text-left",
                    option.color
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{option.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}