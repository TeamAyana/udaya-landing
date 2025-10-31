'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  MessageSquare,
  Mail,
  Calendar,
  Download,
  Search,
  MapPin,
  User,
  Filter,
  ExternalLink
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ContactEntry {
  id: string
  name: string
  email: string
  country: string
  userType: 'patient' | 'caregiver' | 'clinician' | 'other'
  subject: string
  message: string
  createdAt: string
}

interface ContactStats {
  totalContacts: number
  patientContacts: number
  caregiverContacts: number
  clinicianContacts: number
  otherContacts: number
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<ContactEntry[]>([])
  const [stats, setStats] = useState<ContactStats>({
    totalContacts: 0,
    patientContacts: 0,
    caregiverContacts: 0,
    clinicianContacts: 0,
    otherContacts: 0
  })
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterUserType, setFilterUserType] = useState<string>('all')

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/admin/contacts')
      const data = await response.json()

      setContacts(data.contacts || [])
      setStats(data.stats || {
        totalContacts: 0,
        patientContacts: 0,
        caregiverContacts: 0,
        clinicianContacts: 0,
        otherContacts: 0
      })
    } catch (error) {
      console.error('Failed to fetch contacts:', error)
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

  const getUserTypeLabel = (userType: string) => {
    const labels: Record<string, string> = {
      patient: 'Patient',
      caregiver: 'Caregiver',
      clinician: 'Healthcare Professional',
      other: 'Other'
    }
    return labels[userType] || userType
  }

  const getUserTypeBadgeColor = (userType: string) => {
    const colors: Record<string, string> = {
      patient: 'bg-blue-100 text-blue-800',
      caregiver: 'bg-purple-100 text-purple-800',
      clinician: 'bg-green-100 text-green-800',
      other: 'bg-gray-100 text-gray-800'
    }
    return colors[userType] || colors.other
  }

  const handleExport = () => {
    const headers = ['Name', 'Email', 'Country', 'User Type', 'Subject', 'Message', 'Date']
    let csv = headers.join(',') + '\n'

    filteredContacts.forEach(contact => {
      const row = [
        contact.name,
        contact.email,
        contact.country,
        getUserTypeLabel(contact.userType),
        contact.subject,
        contact.message.replace(/"/g, '""'), // Escape quotes
        formatDate(contact.createdAt)
      ]
      csv += row.map(cell => `"${cell}"`).join(',') + '\n'
    })

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `contacts-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.country.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter =
      filterUserType === 'all' || contact.userType === filterUserType

    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-gray-900">Contact Form Submissions</h1>
        <p className="text-gray-600 mt-2">View and manage all contact form inquiries</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-udaya-sage">{stats.totalContacts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.patientContacts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Caregivers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.caregiverContacts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Clinicians
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.clinicianContacts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Other
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{stats.otherContacts}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search by name, email, subject, or country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={filterUserType}
            onChange={(e) => setFilterUserType(e.target.value)}
            className="px-4 py-2 border rounded-md bg-white text-sm"
          >
            <option value="all">All Types</option>
            <option value="patient">Patients</option>
            <option value="caregiver">Caregivers</option>
            <option value="clinician">Clinicians</option>
            <option value="other">Other</option>
          </select>

          <Button onClick={handleExport} variant="outline" size="default">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Contacts List */}
      <Card>
        <CardHeader>
          <CardTitle>All Contact Submissions ({filteredContacts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-gray-500 text-center py-8">Loading...</p>
          ) : filteredContacts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              {searchQuery || filterUserType !== 'all'
                ? 'No matching contacts found.'
                : 'No contact submissions yet.'}
            </p>
          ) : (
            <div className="space-y-4">
              {filteredContacts.map((contact) => (
                <div key={contact.id} className="border rounded-lg p-5 hover:shadow-md transition-shadow">
                  {/* Header Row */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg text-gray-900">
                          {contact.name}
                        </h3>
                        <span className={cn(
                          "px-2 py-1 text-xs rounded-full font-medium",
                          getUserTypeBadgeColor(contact.userType)
                        )}>
                          {getUserTypeLabel(contact.userType)}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          <a
                            href={`mailto:${contact.email}`}
                            className="text-udaya-sage hover:underline"
                          >
                            {contact.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{contact.country}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(contact.createdAt)}</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                    >
                      <a
                        href={`mailto:${contact.email}?subject=Re: ${encodeURIComponent(contact.subject)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Reply
                      </a>
                    </Button>
                  </div>

                  {/* Subject */}
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-500 mb-1">Subject</p>
                    <p className="font-medium text-gray-900">{contact.subject}</p>
                  </div>

                  {/* Message */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-500 mb-2">Message</p>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {contact.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
