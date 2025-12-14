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

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className={cn(
        "lg:hidden fixed top-4 z-50 transition-all",
        sidebarOpen ? "left-[220px]" : "left-4"
      )}>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-white rounded-lg shadow-md"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
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
      <main className="lg:ml-64 relative">
        {/* Top Header with Notifications */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-end lg:justify-end">
          <NotificationsBell />
        </div>

        <div className="p-6 lg:p-8">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </div>
      </main>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}