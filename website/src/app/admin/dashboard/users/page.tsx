'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Shield, 
  UserPlus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Key,
  Search,
  MoreVertical,
  Check,
  AlertCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'editor' | 'author'
  permissions: {
    posts: {
      create: boolean
      read: boolean
      update: boolean
      delete: boolean
    }
    categories: {
      create: boolean
      read: boolean
      update: boolean
      delete: boolean
    }
    users: {
      create: boolean
      read: boolean
      update: boolean
      delete: boolean
    }
    subscribers: {
      read: boolean
      export: boolean
    }
  }
  createdAt: string
  lastLogin?: string
  isActive: boolean
}

const defaultPermissions = {
  admin: {
    posts: { create: true, read: true, update: true, delete: true },
    categories: { create: true, read: true, update: true, delete: true },
    users: { create: true, read: true, update: true, delete: true },
    subscribers: { read: true, export: true }
  },
  editor: {
    posts: { create: true, read: true, update: true, delete: false },
    categories: { create: true, read: true, update: true, delete: false },
    users: { create: false, read: false, update: false, delete: false },
    subscribers: { read: true, export: true }
  },
  author: {
    posts: { create: true, read: true, update: false, delete: false },
    categories: { create: false, read: true, update: false, delete: false },
    users: { create: false, read: false, update: false, delete: false },
    subscribers: { read: false, export: false }
  }
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showNewUser, setShowNewUser] = useState(false)
  const [editingUser, setEditingUser] = useState<string | null>(null)
  const [newUser, setNewUser] = useState({
    email: '',
    name: '',
    password: '',
    role: 'author' as User['role']
  })
  const [editedUser, setEditedUser] = useState<Partial<User>>({})
  
  useEffect(() => {
    fetchUsers()
  }, [])
  
  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users')
      
      // Check if response is ok
      if (!response.ok) {
        console.error('API response not ok:', response.status, response.statusText)
        
        // Try to get error message
        const contentType = response.headers.get('content-type')
        if (contentType && contentType.includes('application/json')) {
          const error = await response.json()
          console.error('API error:', error)
        } else {
          // Response is not JSON (probably HTML 404 page)
          console.error('API returned non-JSON response')
        }
        return
      }
      
      const data = await response.json()
      setUsers(data.users || [])
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const handleCreateUser = async () => {
    if (!newUser.email || !newUser.name || !newUser.password) return
    
    setLoading(true)
    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newUser,
          permissions: defaultPermissions[newUser.role]
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        setUsers([...users, data.user])
        setNewUser({ email: '', name: '', password: '', role: 'author' })
        setShowNewUser(false)
      }
    } catch (error) {
      console.error('Failed to create user:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const handleUpdateUser = async (userId: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedUser)
      })
      
      if (response.ok) {
        setUsers(users.map(user => 
          user.id === userId ? { ...user, ...editedUser } : user
        ))
        setEditingUser(null)
        setEditedUser({})
      }
    } catch (error) {
      console.error('Failed to update user:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setUsers(users.filter(user => user.id !== userId))
      }
    } catch (error) {
      console.error('Failed to delete user:', error)
    }
  }
  
  const togglePermission = (userId: string, category: string, permission: string) => {
    const user = users.find(u => u.id === userId)
    if (!user) return
    
    const updatedPermissions = {
      ...editedUser.permissions || user.permissions,
      [category]: {
        ...((editedUser.permissions || user.permissions)[category as keyof User['permissions']] as any),
        [permission]: !((editedUser.permissions || user.permissions)[category as keyof User['permissions']] as any)[permission]
      }
    }
    
    setEditedUser({
      ...editedUser,
      permissions: updatedPermissions
    })
  }
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  const getRoleBadgeColor = (role: User['role']) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800'
      case 'editor': return 'bg-blue-100 text-blue-800'
      case 'author': return 'bg-green-100 text-green-800'
    }
  }
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600 mt-2">Manage admin users and their permissions</p>
      </div>
      
      {/* Search and Add User */}
      <div className="flex justify-between items-center gap-4">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={() => setShowNewUser(true)}>
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>
      
      {/* New User Form */}
      {showNewUser && (
        <Card>
          <CardHeader>
            <CardTitle>Add New User</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <Input
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value as User['role'] })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-udaya-sage focus:border-transparent"
                  >
                    <option value="author">Author</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCreateUser} disabled={loading}>
                  <Save className="w-4 h-4 mr-2" />
                  Create User
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowNewUser(false)
                    setNewUser({ email: '', name: '', password: '', role: 'author' })
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-gray-500 text-center py-8">Loading...</p>
          ) : filteredUsers.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              {searchQuery ? 'No matching users found.' : 'No users yet.'}
            </p>
          ) : (
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div key={user.id} className="border rounded-lg p-4">
                  {editingUser === user.id ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-lg">{user.name}</h4>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleUpdateUser(user.id)}>
                            <Save className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setEditingUser(null)
                              setEditedUser({})
                            }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Role Selection */}
                      <div>
                        <label className="block text-sm font-medium mb-2">Role</label>
                        <select
                          value={editedUser.role || user.role}
                          onChange={(e) => {
                            const newRole = e.target.value as User['role']
                            setEditedUser({
                              ...editedUser,
                              role: newRole,
                              permissions: defaultPermissions[newRole]
                            })
                          }}
                          className="w-full max-w-xs px-3 py-1 border rounded-lg focus:ring-2 focus:ring-udaya-sage focus:border-transparent"
                        >
                          <option value="author">Author</option>
                          <option value="editor">Editor</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                      
                      {/* Password Change */}
                      <div>
                        <label className="block text-sm font-medium mb-2">New Password (leave blank to keep current)</label>
                        <Input
                          type="password"
                          value={editedUser.password || ''}
                          onChange={(e) => setEditedUser({ ...editedUser, password: e.target.value })}
                          placeholder="••••••••"
                          className="max-w-xs"
                        />
                      </div>
                      
                      {/* Permissions Grid */}
                      <div className="space-y-3">
                        <h5 className="font-medium text-sm">Permissions</h5>
                        <div className="grid gap-3">
                          {Object.entries(editedUser.permissions || user.permissions).map(([category, perms]) => (
                            <div key={category} className="border rounded p-3">
                              <h6 className="font-medium text-sm mb-2 capitalize">{category}</h6>
                              <div className="flex gap-4 flex-wrap">
                                {Object.entries(perms).map(([action, allowed]) => (
                                  <label key={action} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={allowed}
                                      onChange={() => togglePermission(user.id, category, action)}
                                      className="rounded border-gray-300 text-udaya-sage focus:ring-udaya-sage"
                                    />
                                    <span className="text-sm capitalize">{action}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <h4 className="font-medium text-lg">{user.name}</h4>
                          <span className={cn(
                            "px-2 py-1 text-xs rounded-full font-medium",
                            getRoleBadgeColor(user.role)
                          )}>
                            {user.role}
                          </span>
                          {user.isActive ? (
                            <span className="flex items-center gap-1 text-xs text-green-600">
                              <Check className="w-3 h-3" />
                              Active
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-xs text-gray-500">
                              <AlertCircle className="w-3 h-3" />
                              Inactive
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Last login: {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => {
                            setEditingUser(user.id)
                            setEditedUser(user)
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteUser(user.id)}
                          disabled={user.email === 'admin@udaya.one'} // Prevent deleting main admin
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}