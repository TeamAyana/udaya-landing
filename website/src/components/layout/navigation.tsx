'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { NAVIGATION_ITEMS } from '@/lib/constants'

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
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

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    if (mounted) {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [mounted])

  return (
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
          <div className="flex items-center gap-12">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center transition-all duration-300 hover:scale-105"
            >
              <img 
                src="/uploads/logo.png" 
                alt="Udaya" 
                className="h-9 w-auto"
              />
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
            <Button asChild>
              <Link href="/waitlist">Join Waitlist</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-udaya-charcoal" />
            ) : (
              <Menu className="h-6 w-6 text-udaya-charcoal" />
            )}
          </button>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-x-0 top-20 bg-white/95 backdrop-blur-xl shadow-2xl transition-all duration-500 lg:hidden border-t border-white/20',
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
              <Button asChild className="w-full">
                <Link href="/waitlist">Join Waitlist</Link>
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </header>
  )
}