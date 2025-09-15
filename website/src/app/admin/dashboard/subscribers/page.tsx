'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { UserCheck, Mail, Calendar, Download, Search, Filter } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'

interface WaitlistEntry {
  id: string
  fullName: string
  email: string
  phone: string
  age: string
  country: string
  diagnosis: string
  diagnosisDate: string
  currentTreatments: string
  cannabisExperience: string
  retreatInterest: string
  status: string
  createdAt: string
  agreement: boolean
}

interface NewsletterContact {
  id: string
  email: string
  source: string
  status: string
  subscribedAt: string
}

export default function SubscribersPage() {
  const [activeTab, setActiveTab] = useState('waitlist')
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([])
  const [newsletter, setNewsletter] = useState<NewsletterContact[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  
  useEffect(() => {
    fetchSubscribers()
  }, [])
  
  const fetchSubscribers = async () => {
    try {
      const response = await fetch('/api/admin/subscribers')
      const data = await response.json()
      
      setWaitlist(data.waitlist || [])
      setNewsletter(data.newsletter || [])
    } catch (error) {
      console.error('Failed to fetch subscribers:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  const formatRetreatInterest = (interest: string) => {
    const formatted = interest
      .replace('cancer-q2-2026', 'Cancer Retreat - Q2 2026')
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    return formatted
  }
  
  const handleExport = (type: 'waitlist' | 'newsletter') => {
    const data = type === 'waitlist' ? waitlist : newsletter
    const headers = type === 'waitlist' 
      ? ['Name', 'Email', 'Phone', 'Age', 'Country', 'Diagnosis', 'Cannabis Experience', 'Retreat Interest', 'Status', 'Date']
      : ['Email', 'Source', 'Status', 'Date']
    
    let csv = headers.join(',') + '\n'
    
    data.forEach(item => {
      const row = type === 'waitlist' 
        ? [
            (item as WaitlistEntry).fullName,
            item.email,
            (item as WaitlistEntry).phone,
            (item as WaitlistEntry).age,
            (item as WaitlistEntry).country,
            (item as WaitlistEntry).diagnosis,
            (item as WaitlistEntry).cannabisExperience,
            formatRetreatInterest((item as WaitlistEntry).retreatInterest),
            item.status,
            formatDate((item as WaitlistEntry).createdAt)
          ]
        : [
            item.email, 
            (item as NewsletterContact).source, 
            item.status, 
            formatDate((item as NewsletterContact).subscribedAt)
          ]
      
      csv += row.map(cell => `"${cell}"`).join(',') + '\n'
    })
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${type}-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }
  
  const filteredWaitlist = waitlist.filter(entry => 
    entry.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.country.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  const filteredNewsletter = newsletter.filter(entry => 
    entry.email.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-gray-900">Subscribers</h1>
        <p className="text-gray-600 mt-2">Manage waitlist and newsletter subscribers</p>
      </div>
      
      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search by name, email or country..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="bg-gray-50 rounded-lg p-1 mb-8">
          <TabsList className="flex gap-2">
            <TabsTrigger
              value="waitlist"
              className={cn(
                "px-4 py-2 rounded-md font-medium transition-colors",
                activeTab === 'waitlist' 
                  ? "bg-white text-udaya-sage shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <UserCheck className="w-4 h-4 mr-2 inline" />
              Waitlist ({waitlist.length})
            </TabsTrigger>
            <TabsTrigger
              value="newsletter"
              className={cn(
                "px-4 py-2 rounded-md font-medium transition-colors",
                activeTab === 'newsletter' 
                  ? "bg-white text-udaya-sage shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <Mail className="w-4 h-4 mr-2 inline" />
              Newsletter ({newsletter.length})
            </TabsTrigger>
          </TabsList>
        </div>
        
        {/* Waitlist Tab */}
        <TabsContent value="waitlist">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Waitlist Subscribers</CardTitle>
              <Button onClick={() => handleExport('waitlist')} size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-gray-500 text-center py-8">Loading...</p>
              ) : filteredWaitlist.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  {searchQuery ? 'No matching subscribers found.' : 'No waitlist subscribers yet.'}
                </p>
              ) : (
                <div className="space-y-4">
                  {filteredWaitlist.map((entry) => (
                    <div key={entry.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-medium text-lg">{entry.fullName}</p>
                              <p className="text-sm text-gray-600">{entry.email} • {entry.phone}</p>
                            </div>
                            <span className={cn(
                              "px-2 py-1 text-xs rounded-full",
                              entry.status === 'pending' ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                            )}>
                              {entry.status}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mt-3">
                            <p><span className="font-medium">Age:</span> {entry.age}</p>
                            <p><span className="font-medium">Country:</span> {entry.country}</p>
                            <p><span className="font-medium">Diagnosis:</span> {entry.diagnosis}</p>
                            <p><span className="font-medium">Cannabis Experience:</span> {entry.cannabisExperience.charAt(0).toUpperCase() + entry.cannabisExperience.slice(1)}</p>
                          </div>
                          {entry.currentTreatments && (
                            <p className="text-sm text-gray-600 mt-2">
                              <span className="font-medium">Current Treatments:</span> {entry.currentTreatments}
                            </p>
                          )}
                          <p className="text-sm text-gray-600 mt-2">
                            <span className="font-medium">Retreat Interest:</span> {formatRetreatInterest(entry.retreatInterest)}
                          </p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-1 mt-3 pt-3 border-t">
                        <Calendar className="w-4 h-4" />
                        {formatDate(entry.createdAt)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Newsletter Tab */}
        <TabsContent value="newsletter">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Newsletter Subscribers</CardTitle>
              <Button onClick={() => handleExport('newsletter')} size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-gray-500 text-center py-8">Loading...</p>
              ) : filteredNewsletter.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  {searchQuery ? 'No matching subscribers found.' : 'No newsletter subscribers yet.'}
                </p>
              ) : (
                <div className="space-y-4">
                  {filteredNewsletter.map((contact) => (
                    <div key={contact.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{contact.email}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Source:</span> {contact.source}
                            </p>
                            <span className={cn(
                              "px-2 py-1 text-xs rounded-full",
                              contact.status === 'active' ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            )}>
                              {contact.status}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(contact.subscribedAt)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}