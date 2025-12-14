'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { UserCheck, Mail, Calendar, Download, Search, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'
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
  cannabisExperienceOther?: string
  retreatInterest: string
  status: string
  createdAt: string
  agreement: boolean
  waitlistNumber?: number

  // New fields
  mobilityLevel?: string
  prognosis?: string
  travelOrigin?: string
  preferredLanguage?: string
  preferredLanguageOther?: string
  currentMedications?: string
  dietaryRequirements?: string[]
  dietaryAllergies?: string
  dietaryOther?: string
  healingGoals?: string
  yourStory?: string
  treatmentPhilosophy?: string
  treatmentPhilosophyOther?: string
  hasCaregiver?: string
  hearAboutUs?: string
  hearAboutUsOther?: string
}

interface NewsletterContact {
  id: string
  email: string
  source: string
  status: string
  subscribedAt: string
}

interface PartialSubmission {
  id: string
  fullName: string
  email: string
  phone: string
  age: string
  country: string
  status: string
  stepCompleted: number
  abandonedAt: string
  createdAt: string
}

export default function SubscribersPage() {
  const [activeTab, setActiveTab] = useState('waitlist')
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([])
  const [newsletter, setNewsletter] = useState<NewsletterContact[]>([])
  const [partialSubmissions, setPartialSubmissions] = useState<PartialSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null)

  useEffect(() => {
    fetchSubscribers()
  }, [])

  const fetchSubscribers = async () => {
    try {
      const response = await fetch('/api/admin/subscribers')
      const data = await response.json()

      setWaitlist(data.waitlist || [])
      setNewsletter(data.newsletter || [])
      setPartialSubmissions(data.partialSubmissions || [])
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
      .replace('cancer-q2-2026', 'Cancer Treatment Program - Q2 2026')
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    return formatted
  }

  const formatMobilityLevel = (level?: string) => {
    if (!level) return 'Not specified'
    return level
      .replace('fully-mobile', 'Fully mobile and independent')
      .replace('minimal-assistance', 'Mobile with minimal assistance')
      .replace('mobility-aids', 'Require mobility aids')
      .replace('significant-assistance', 'Require significant assistance')
      .replace('bedridden', 'Bedridden')
  }

  const formatCaregiver = (value?: string) => {
    if (!value) return 'Not specified'
    return value
      .replace('yes-traveling', 'Yes, traveling with me')
      .replace('yes-not-traveling', 'Yes, but not traveling')
      .replace('no', 'No')
      .replace('considering', 'Considering it')
  }

  const handleExport = (type: 'waitlist' | 'newsletter') => {
    const data = type === 'waitlist' ? waitlist : newsletter
    const headers = type === 'waitlist'
      ? [
          'Waitlist #', 'Name', 'Email', 'Phone', 'Age', 'Country',
          'Diagnosis', 'Diagnosis Date', 'Current Treatments', 'Cannabis Experience',
          'Mobility Level', 'Prognosis', 'Travel Origin', 'Preferred Language',
          'Current Medications', 'Dietary Requirements', 'Healing Goals',
          'Treatment Philosophy', 'Caregiver', 'How Heard', 'Retreat Interest',
          'Status', 'Date'
        ]
      : ['Email', 'Source', 'Status', 'Date']

    let csv = headers.join(',') + '\n'

    data.forEach(item => {
      const row = type === 'waitlist'
        ? [
            (item as WaitlistEntry).waitlistNumber || '',
            (item as WaitlistEntry).fullName,
            item.email,
            (item as WaitlistEntry).phone,
            (item as WaitlistEntry).age,
            (item as WaitlistEntry).country,
            (item as WaitlistEntry).diagnosis,
            (item as WaitlistEntry).diagnosisDate,
            (item as WaitlistEntry).currentTreatments,
            (item as WaitlistEntry).cannabisExperience,
            formatMobilityLevel((item as WaitlistEntry).mobilityLevel),
            (item as WaitlistEntry).prognosis || '',
            (item as WaitlistEntry).travelOrigin || '',
            (item as WaitlistEntry).preferredLanguage || '',
            (item as WaitlistEntry).currentMedications || '',
            (item as WaitlistEntry).dietaryRequirements?.join('; ') || '',
            (item as WaitlistEntry).healingGoals || '',
            (item as WaitlistEntry).treatmentPhilosophy || '',
            formatCaregiver((item as WaitlistEntry).hasCaregiver),
            (item as WaitlistEntry).hearAboutUs || '',
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

      csv += row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',') + '\n'
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
    entry.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredNewsletter = newsletter.filter(entry =>
    entry.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredPartial = partialSubmissions.filter(entry =>
    entry.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.country.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleExpanded = (id: string) => {
    setExpandedEntry(expandedEntry === id ? null : id)
  }

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
          placeholder="Search by name, email, country or diagnosis..."
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
            <TabsTrigger
              value="abandoned"
              className={cn(
                "px-4 py-2 rounded-md font-medium transition-colors",
                activeTab === 'abandoned'
                  ? "bg-white text-udaya-sage shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <AlertCircle className="w-4 h-4 mr-2 inline" />
              Abandoned ({partialSubmissions.length})
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
                    <div key={entry.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-lg">{entry.fullName}</p>
                                {entry.waitlistNumber && (
                                  <span className="px-2 py-0.5 bg-udaya-sage/10 text-udaya-sage text-xs rounded-full font-semibold">
                                    #{entry.waitlistNumber}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{entry.email} • {entry.phone}</p>
                            </div>
                            <span className={cn(
                              "px-2 py-1 text-xs rounded-full",
                              entry.status === 'pending' ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                            )}>
                              {entry.status}
                            </span>
                          </div>

                          {/* Quick Overview */}
                          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mt-3">
                            <p><span className="font-medium">Age:</span> {entry.age}</p>
                            <p><span className="font-medium">Country:</span> {entry.country}</p>
                            <p><span className="font-medium">Diagnosis:</span> {entry.diagnosis}</p>
                            <p><span className="font-medium">Mobility:</span> {formatMobilityLevel(entry.mobilityLevel)}</p>
                          </div>

                          <p className="text-sm text-gray-600 mt-2">
                            <span className="font-medium">Program:</span> {formatRetreatInterest(entry.retreatInterest)}
                          </p>

                          {/* Expandable Details */}
                          {expandedEntry === entry.id && (
                            <div className="mt-4 pt-4 border-t space-y-3">
                              <div className="bg-gray-50 p-3 rounded-md">
                                <h4 className="font-semibold text-sm text-udaya-sage mb-2">Medical Information</h4>
                                <div className="space-y-2 text-sm">
                                  <p><span className="font-medium">Diagnosis Date:</span> {entry.diagnosisDate}</p>
                                  <p><span className="font-medium">Current Treatments:</span> {entry.currentTreatments}</p>
                                  {entry.currentMedications && (
                                    <p><span className="font-medium">Current Medications:</span> {entry.currentMedications}</p>
                                  )}
                                  {entry.prognosis && (
                                    <p><span className="font-medium">Prognosis:</span> {entry.prognosis}</p>
                                  )}
                                </div>
                              </div>

                              <div className="bg-gray-50 p-3 rounded-md">
                                <h4 className="font-semibold text-sm text-udaya-sage mb-2">Travel & Logistics</h4>
                                <div className="space-y-2 text-sm">
                                  {entry.travelOrigin && (
                                    <p><span className="font-medium">Travel Origin:</span> {entry.travelOrigin}</p>
                                  )}
                                  {entry.preferredLanguage && (
                                    <p><span className="font-medium">Preferred Language:</span> {entry.preferredLanguage} {entry.preferredLanguageOther && `(${entry.preferredLanguageOther})`}</p>
                                  )}
                                  {entry.dietaryRequirements && entry.dietaryRequirements.length > 0 && (
                                    <p><span className="font-medium">Dietary Requirements:</span> {entry.dietaryRequirements.join(', ')}</p>
                                  )}
                                  {entry.dietaryAllergies && (
                                    <p><span className="font-medium">Allergies:</span> {entry.dietaryAllergies}</p>
                                  )}
                                  {entry.dietaryOther && (
                                    <p><span className="font-medium">Other Dietary:</span> {entry.dietaryOther}</p>
                                  )}
                                </div>
                              </div>

                              <div className="bg-gray-50 p-3 rounded-md">
                                <h4 className="font-semibold text-sm text-udaya-sage mb-2">Goals & Philosophy</h4>
                                <div className="space-y-2 text-sm">
                                  {entry.healingGoals && (
                                    <p><span className="font-medium">Healing Goals:</span> {entry.healingGoals}</p>
                                  )}
                                  {entry.yourStory && (
                                    <p><span className="font-medium">Their Story:</span> {entry.yourStory}</p>
                                  )}
                                  {entry.treatmentPhilosophy && (
                                    <p><span className="font-medium">Treatment Philosophy:</span> {entry.treatmentPhilosophy} {entry.treatmentPhilosophyOther && `(${entry.treatmentPhilosophyOther})`}</p>
                                  )}
                                  <p><span className="font-medium">Cannabis Experience:</span> {entry.cannabisExperience} {entry.cannabisExperienceOther && `(${entry.cannabisExperienceOther})`}</p>
                                </div>
                              </div>

                              <div className="bg-gray-50 p-3 rounded-md">
                                <h4 className="font-semibold text-sm text-udaya-sage mb-2">Additional Information</h4>
                                <div className="space-y-2 text-sm">
                                  {entry.hasCaregiver && (
                                    <p><span className="font-medium">Caregiver:</span> {formatCaregiver(entry.hasCaregiver)}</p>
                                  )}
                                  {entry.hearAboutUs && (
                                    <p><span className="font-medium">How They Heard:</span> {entry.hearAboutUs} {entry.hearAboutUsOther && `(${entry.hearAboutUsOther})`}</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Expand/Collapse Button */}
                          <button
                            onClick={() => toggleExpanded(entry.id)}
                            className="mt-3 text-sm text-udaya-sage hover:text-udaya-sage/80 font-medium flex items-center gap-1"
                          >
                            {expandedEntry === entry.id ? (
                              <>
                                <ChevronUp className="w-4 h-4" />
                                Show less
                              </>
                            ) : (
                              <>
                                <ChevronDown className="w-4 h-4" />
                                Show full details
                              </>
                            )}
                          </button>
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

        {/* Abandoned Forms Tab */}
        <TabsContent value="abandoned">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Abandoned Form Submissions</CardTitle>
                <p className="text-sm text-gray-600 mt-1">Users who started but didn't complete the consultation form</p>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-gray-500 text-center py-8">Loading...</p>
              ) : filteredPartial.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  {searchQuery ? 'No matching abandoned forms found.' : 'No abandoned forms yet.'}
                </p>
              ) : (
                <div className="space-y-4">
                  {filteredPartial.map((entry) => (
                    <div key={entry.id} className="border border-orange-200 bg-orange-50/30 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900">{entry.fullName}</p>
                            <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800">
                              Step {entry.stepCompleted} of 2
                            </span>
                          </div>
                          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Email:</span>{' '}
                              <a href={`mailto:${entry.email}`} className="text-udaya-sage hover:underline">
                                {entry.email}
                              </a>
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Phone:</span> {entry.phone || 'Not provided'}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Age:</span> {entry.age}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Country:</span> {entry.country}
                            </p>
                          </div>
                        </div>
                        <div className="text-right text-sm text-gray-500 ml-4">
                          <div className="flex items-center gap-1 justify-end mb-1">
                            <AlertCircle className="w-4 h-4 text-orange-600" />
                            <span className="font-medium text-orange-600">Abandoned</span>
                          </div>
                          <div className="flex items-center gap-1 justify-end">
                            <Calendar className="w-4 h-4" />
                            {formatDate(entry.abandonedAt)}
                          </div>
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
