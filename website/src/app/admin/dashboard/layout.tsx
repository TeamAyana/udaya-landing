'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  LogOut,
  Menu,
  X,
  Plus,
  Settings,
  BookOpen,
  Users,
  Mail,
  ChevronDown,
  ChevronRight,
  Tag,
  Shield,
  BarChart3,
  MessageSquare,
  Handshake
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { NotificationsBell } from '@/components/admin/notifications-bell'
import { ErrorBoundary } from '@/components/admin/error-boundary'

const sidebarItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  {
    name: 'Blog',
    icon: BookOpen,
    submenu: [
      { name: 'All Posts', href: '/admin/dashboard/posts', icon: FileText },
      { name: 'New Post', href: '/admin/dashboard/posts/new', icon: Plus },
      { name: 'Categories', href: '/admin/dashboard/settings?tab=categories', icon: Tag },
      { name: 'Authors', href: '/admin/dashboard/settings?tab=authors', icon: Users },
    ]
  },
  { name: 'Analytics', href: '/admin/dashboard/analytics', icon: BarChart3 },
  { name: 'Waitlist', href: '/admin/dashboard/subscribers', icon: Mail },
  { name: 'Contact Forms', href: '/admin/dashboard/contacts', icon: MessageSquare },
  { name: 'Partnerships', href: '/admin/dashboard/referrals', icon: Handshake },
  { name: 'User Management', href: '/admin/dashboard/users', icon: Shield },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['Blog'])
  const [showBlogMenu, setShowBlogMenu] = useState(false)

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const mainNavItems = sidebarItems.filter(item => !('submenu' in item))
  const blogItem = sidebarItems.find(item => item.name === 'Blog')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Blog Menu Modal */}
      {showBlogMenu && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setShowBlogMenu(false)}>
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Blog Management</h3>
              <button onClick={() => setShowBlogMenu(false)} className="p-2">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2">
              {blogItem && 'submenu' in blogItem && blogItem.submenu?.map((subItem) => {
                const SubIcon = subItem.icon
                const isActive = pathname === subItem.href
                return (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                      isActive
                        ? "bg-udaya-sage text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    )}
                    onClick={() => setShowBlogMenu(false)}
                  >
                    <SubIcon className="w-5 h-5" />
                    <span>{subItem.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar - Hidden on mobile */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg">
        <div className="h-full flex flex-col">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-serif font-bold text-udaya-sage">
              Udaya Admin
            </h2>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                
                if ('submenu' in item && item.submenu) {
                  const isExpanded = expandedMenus.includes(item.name)
                  const isChildActive = item.submenu.some(sub => pathname === sub.href)
                  
                  return (
                    <li key={item.name}>
                      <button
                        onClick={() => {
                          setExpandedMenus(prev =>
                            isExpanded 
                              ? prev.filter(name => name !== item.name)
                              : [...prev, item.name]
                          )
                        }}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
                          isChildActive
                            ? "bg-udaya-sage/10 text-udaya-sage"
                            : "hover:bg-gray-100 text-gray-700"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="flex-1 text-left">{item.name}</span>
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </button>
                      {isExpanded && (
                        <ul className="mt-2 ml-6 space-y-1">
                          {item.submenu.map((subItem) => {
                            const SubIcon = subItem.icon
                            const isActive = pathname === subItem.href
                            
                            return (
                              <li key={subItem.href}>
                                <Link
                                  href={subItem.href}
                                  className={cn(
                                    "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm",
                                    isActive
                                      ? "bg-udaya-sage text-white"
                                      : "hover:bg-gray-100 text-gray-700"
                                  )}
                                  onClick={() => setSidebarOpen(false)}
                                >
                                  <SubIcon className="w-4 h-4" />
                                  <span>{subItem.name}</span>
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      )}
                    </li>
                  )
                } else {
                  const isActive = pathname === item.href
                  
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
                          isActive
                            ? "bg-udaya-sage text-white"
                            : "hover:bg-gray-100 text-gray-700"
                        )}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  )
                }
              })}
            </ul>
          </nav>

          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:ml-64">
        {/* Top Header with Notifications and Title */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg sm:text-xl font-serif font-bold text-udaya-sage lg:hidden">Udaya Admin</h1>
            <div className="lg:ml-auto">
              <NotificationsBell />
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
        <div className="grid grid-cols-5 gap-1 px-2 py-2">
          {/* Dashboard */}
          <Link
            href="/admin/dashboard"
            className={cn(
              "flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-colors",
              pathname === '/admin/dashboard'
                ? "bg-udaya-sage/10 text-udaya-sage"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            <LayoutDashboard className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Home</span>
          </Link>

          {/* Blog */}
          <button
            onClick={() => setShowBlogMenu(true)}
            className={cn(
              "flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-colors",
              pathname.includes('/admin/dashboard/posts') || pathname.includes('/admin/dashboard/settings')
                ? "bg-udaya-sage/10 text-udaya-sage"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            <BookOpen className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Blog</span>
          </button>

          {/* Waitlist */}
          <Link
            href="/admin/dashboard/subscribers"
            className={cn(
              "flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-colors",
              pathname === '/admin/dashboard/subscribers'
                ? "bg-udaya-sage/10 text-udaya-sage"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            <Mail className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Waitlist</span>
          </Link>

          {/* Analytics */}
          <Link
            href="/admin/dashboard/analytics"
            className={cn(
              "flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-colors",
              pathname === '/admin/dashboard/analytics'
                ? "bg-udaya-sage/10 text-udaya-sage"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            <BarChart3 className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Stats</span>
          </Link>

          {/* More Menu */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">More</span>
          </button>
        </div>
      </nav>

      {/* Mobile "More" Menu Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setSidebarOpen(false)}>
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 max-h-[70vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">More Options</h3>
              <button onClick={() => setSidebarOpen(false)} className="p-2">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2">
              {/* Contact Forms */}
              <Link
                href="/admin/dashboard/contacts"
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  pathname === '/admin/dashboard/contacts'
                    ? "bg-udaya-sage text-white"
                    : "hover:bg-gray-100 text-gray-700"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <MessageSquare className="w-5 h-5" />
                <span>Contact Forms</span>
              </Link>

              {/* Partnerships */}
              <Link
                href="/admin/dashboard/referrals"
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  pathname === '/admin/dashboard/referrals'
                    ? "bg-udaya-sage text-white"
                    : "hover:bg-gray-100 text-gray-700"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <Handshake className="w-5 h-5" />
                <span>Partnerships</span>
              </Link>

              {/* User Management */}
              <Link
                href="/admin/dashboard/users"
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  pathname === '/admin/dashboard/users'
                    ? "bg-udaya-sage text-white"
                    : "hover:bg-gray-100 text-gray-700"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <Shield className="w-5 h-5" />
                <span>User Management</span>
              </Link>

              {/* Logout */}
              <button
                onClick={() => {
                  setSidebarOpen(false)
                  handleLogout()
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}