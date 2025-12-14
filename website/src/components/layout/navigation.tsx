'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { NAVIGATION_ITEMS, SITE_CONFIG } from '@/lib/constants'

interface NavigationProps {
  onBookConsultation?: () => void
}

export function Navigation({ onBookConsultation }: NavigationProps = {}) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const [showFloatingButton, setShowFloatingButton] = React.useState(false)
  const pathname = usePathname()

  // Ensure component is mounted before using window
  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (mounted) {
      setIsOpen(false)
    }
  }, [pathname, mounted])

  // Determine if floating button should be enabled on this page
  const shouldShowButtonOnPage = React.useMemo(() => {
    // Pages where button should NEVER appear
    const neverShowPages = [
      '/inquiry',       // Already on inquiry page
      '/contact',       // Has own form
      '/referrals',     // Different CTA (partnership)
      '/privacy',       // Legal pages - poor UX
      '/terms',
      '/disclaimer',
    ]

    // Admin pages - never show
    if (pathname.startsWith('/admin')) return false

    // Test pages - never show
    if (pathname.startsWith('/test')) return false

    // Check exact matches for never-show pages
    if (neverShowPages.includes(pathname)) return false

    // All other pages should show the button
    return true
  }, [pathname])

  // Handle scroll effects (navbar background + floating button visibility)
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // Change navbar background after scrolling a bit
      setScrolled(scrollY > 20)

      // Only calculate button visibility if it should show on this page
      if (!shouldShowButtonOnPage) {
        setShowFloatingButton(false)
        return
      }

      // Show floating button after scrolling past hero section (viewport height)
      // Hide it when approaching footer (within 500px of bottom)
      const distanceFromBottom = documentHeight - (scrollY + viewportHeight)

      // Different scroll thresholds based on page type
      let scrollThreshold: number

      if (pathname === '/') {
        // Homepage: Show after scrolling past hero (80% of viewport)
        scrollThreshold = viewportHeight * 0.8
      } else if (pathname.startsWith('/blog/') && pathname !== '/blog') {
        // Individual blog posts: Show after reading 30% of content
        scrollThreshold = documentHeight * 0.3
      } else {
        // Other pages: Show after scrolling 40% of viewport
        scrollThreshold = viewportHeight * 0.4
      }

      const pastThreshold = scrollY > scrollThreshold
      const beforeFooter = distanceFromBottom > 500

      setShowFloatingButton(pastThreshold && beforeFooter)
    }

    if (mounted) {
      // Run once on mount to set initial state
      handleScroll()

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [mounted, pathname, shouldShowButtonOnPage])

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-500",
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20"
            : "bg-gradient-to-b from-white/60 to-transparent backdrop-blur-sm"
        )}
      >
      <Container>
        <nav className="flex h-20 items-center justify-between">
          {/* Logo and Navigation Group */}
          <div className="flex items-center gap-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center transition-all duration-300 hover:scale-105"
            >
              <div className="relative h-11 w-28">
                <Image
                  src="/uploads/logo.png"
                  alt="Udaya"
                  fill
                  sizes="112px"
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              {NAVIGATION_ITEMS.map((item) => (
                <div key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center space-x-1 text-sm font-medium transition-colors hover:text-udaya-sage',
                      pathname === item.href
                        ? 'text-udaya-sage'
                        : 'text-udaya-charcoal'
                    )}
                  >
                    <span>{item.label}</span>
                    {item.children && (
                      <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                    )}
                  </Link>
                  {item.children && (
                    <div className="absolute left-0 top-full hidden pt-2 group-hover:block">
                      <div className="rounded-lg bg-white p-4 shadow-lg">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block whitespace-nowrap px-4 py-2 text-sm text-udaya-charcoal hover:bg-udaya-cream hover:text-udaya-sage"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button
              onClick={onBookConsultation}
              className="bg-udaya-sage text-white hover:bg-udaya-sage/90"
            >
              {SITE_CONFIG.hero.cta_primary_label}
            </Button>
          </div>

          {/* Mobile Menu Button - Custom Themed Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-50 group"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <div className="relative w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 hover:bg-udaya-sage/10">
              <div className="w-6 h-5 relative flex flex-col justify-center items-center">
                {/* Top Line */}
                <span
                  className={cn(
                    "absolute w-6 h-0.5 rounded-full transition-all duration-300 ease-in-out",
                    "bg-gradient-to-r from-udaya-sage to-udaya-sage/80",
                    isOpen
                      ? "rotate-45 translate-y-0"
                      : "-translate-y-2 group-hover:w-5 group-hover:translate-x-0.5"
                  )}
                />

                {/* Middle Line */}
                <span
                  className={cn(
                    "absolute w-6 h-0.5 rounded-full transition-all duration-300 ease-in-out",
                    "bg-gradient-to-r from-udaya-sage to-udaya-sage/80",
                    isOpen
                      ? "opacity-0 scale-0"
                      : "opacity-100 scale-100"
                  )}
                />

                {/* Bottom Line */}
                <span
                  className={cn(
                    "absolute w-6 h-0.5 rounded-full transition-all duration-300 ease-in-out",
                    "bg-gradient-to-r from-udaya-sage to-udaya-sage/80",
                    isOpen
                      ? "-rotate-45 translate-y-0"
                      : "translate-y-2 group-hover:w-5 group-hover:translate-x-0.5"
                  )}
                />
              </div>
            </div>
          </button>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-x-0 top-20 z-[60] bg-white/95 backdrop-blur-xl shadow-2xl transition-all duration-500 lg:hidden border-t border-white/20',
          isOpen
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0 pointer-events-none'
        )}
      >
        <Container>
          <div className="py-8 space-y-6">
            {NAVIGATION_ITEMS.map((item) => (
              <div key={item.href} className="space-y-2">
                <Link
                  href={item.href}
                  className={cn(
                    'block text-lg font-medium',
                    pathname === item.href
                      ? 'text-udaya-sage'
                      : 'text-udaya-charcoal'
                  )}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-4 space-y-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block text-sm text-udaya-charcoal/70 hover:text-udaya-sage"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4">
              <Button
                onClick={onBookConsultation}
                className="w-full bg-udaya-sage text-white hover:bg-udaya-sage/90"
              >
                Get More Information
              </Button>
            </div>
          </div>
        </Container>
      </div>
      </header>

      {/* Mobile Floating CTA Button - Outside header for proper z-index stacking */}
      {/* Shows after scrolling past hero, hides near footer and when menu is open */}
      <button
        onClick={onBookConsultation}
        className={cn(
          "lg:hidden fixed bottom-6 right-6 z-40 bg-udaya-sage text-white px-6 py-3 rounded-full shadow-lg hover:bg-udaya-sage/90 transition-all duration-300 font-medium text-sm",
          showFloatingButton && !isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto scale-100"
            : "opacity-0 translate-y-4 pointer-events-none scale-95"
        )}
      >
        Get More Information
      </button>
    </>
  )
}