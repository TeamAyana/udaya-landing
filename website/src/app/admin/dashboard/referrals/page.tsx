'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Handshake,
  Mail,
  Calendar,
  Download,
  Search,
  MapPin,
  Phone,
  Building2,
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ReferralEntry {
  id: string
  name: string
  email: string
  phone?: string
  country: string
  organization?: string
  role: string
  message: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
}

interface ReferralStats {
  totalReferrals: number
  pendingReferrals: number
  approvedReferrals: number
  rejectedReferrals: number
  physicianReferrals: number
  healthcareReferrals: number
  therapistReferrals: number
  advocateReferrals: number
  organizationReferrals: number
}

export default function ReferralsPage() {
  const [referrals, setReferrals] = useState<ReferralEntry[]>([])
  const [stats, setStats] = useState<ReferralStats>({
    totalReferrals: 0,
    pendingReferrals: 0,
    approvedReferrals: 0,
    rejectedReferrals: 0,
    physicianReferrals: 0,
    healthcareReferrals: 0,
    therapistReferrals: 0,
    advocateReferrals: 0,
    organizationReferrals: 0
  })
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterRole, setFilterRole] = useState<string>('all')

  useEffect(() => {
    fetchReferrals()
  }, [])

  const fetchReferrals = async () => {
    try {
      const response = await fetch('/api/admin/referrals')
      const data = await response.json()

      setReferrals(data.referrals || [])
      setStats(data.stats || {
        totalReferrals: 0,
        pendingReferrals: 0,
        approvedReferrals: 0,
        rejectedReferrals: 0,
        physicianReferrals: 0,
        healthcareReferrals: 0,
        therapistReferrals: 0,
        advocateReferrals: 0,
        organizationReferrals: 0
      })
    } catch (error) {
      console.error('Failed to fetch referrals:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateReferralStatus = async (id: string, status: 'pending' | 'approved' | 'rejected') => {
    try {
      const response = await fetch('/api/admin/referrals', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      })

      if (response.ok) {
        // Refresh the list
        await fetchReferrals()
      } else {
        console.error('Failed to update referral status')
      }
    } catch (error) {
      console.error('Error updating referral:', error)
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

  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      physician: 'Physician/Oncologist',
      healthcare: 'Healthcare Provider',
      therapist: 'Therapist/Counselor',
      advocate: 'Patient Advocate',
      organization: 'Support Organization',
      other: 'Other'
    }
    return labels[role] || role
  }

  const getRoleBadgeColor = (role: string) => {
    const colors: Record<string, string> = {
      physician: 'bg-blue-100 text-blue-800',
      healthcare: 'bg-green-100 text-green-800',
      therapist: 'bg-purple-100 text-purple-800',
      advocate: 'bg-orange-100 text-orange-800',
      organization: 'bg-indigo-100 text-indigo-800',
      other: 'bg-gray-100 text-gray-800'
    }
    return colors[role] || colors.other
  }

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { color: string; icon: any; label: string }> = {
      pending: {
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: Clock,
        label: 'Pending Review'
      },
      approved: {
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: CheckCircle,
        label: 'Approved'
      },
      rejected: {
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: XCircle,
        label: 'Rejected'
      }
    }
    return badges[status] || badges.pending
  }

  const handleExport = () => {
    const headers = [
      'Name',
      'Email',
      'Phone',
      'Country',
      'Organization',
      'Role',
      'Status',
      'Message',
      'Date'
    ]
    let csv = headers.join(',') + '\n'

    filteredReferrals.forEach(referral => {
      const row = [
        referral.name,
        referral.email,
        referral.phone || 'N/A',
        referral.country,
        referral.organization || 'N/A',
        getRoleLabel(referral.role),
        referral.status,
        referral.message.replace(/"/g, '""'), // Escape quotes
        formatDate(referral.createdAt)
      ]
      csv += row.map(cell => `"${cell}"`).join(',') + '\n'
    })

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `referrals-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const filteredReferrals = referrals.filter(referral => {
    const matchesSearch =
      referral.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      referral.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      referral.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (referral.organization?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)

    const matchesStatusFilter = filterStatus === 'all' || referral.status === filterStatus
    const matchesRoleFilter = filterRole === 'all' || referral.role === filterRole

    return matchesSearch && matchesStatusFilter && matchesRoleFilter
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-gray-900">
          Partnership & Referral Inquiries
        </h1>
        <p className="text-gray-600 mt-2">
          Manage professional referral partners and collaboration inquiries
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-udaya-sage">{stats.totalReferrals}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pendingReferrals}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.approvedReferrals}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Physicians</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.physicianReferrals}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search by name, email, organization, or country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border rounded-md bg-white text-sm"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border rounded-md bg-white text-sm"
          >
            <option value="all">All Roles</option>
            <option value="physician">Physicians</option>
            <option value="healthcare">Healthcare Providers</option>
            <option value="therapist">Therapists</option>
            <option value="advocate">Patient Advocates</option>
            <option value="organization">Organizations</option>
            <option value="other">Other</option>
          </select>

          <Button onClick={handleExport} variant="outline" size="default">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Referrals List */}
      <Card>
        <CardHeader>
          <CardTitle>All Partnership Inquiries ({filteredReferrals.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-gray-500 text-center py-8">Loading...</p>
          ) : filteredReferrals.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              {searchQuery || filterStatus !== 'all' || filterRole !== 'all'
                ? 'No matching referrals found.'
                : 'No referral inquiries yet.'}
            </p>
          ) : (
            <div className="space-y-4">
              {filteredReferrals.map((referral) => {
                const statusBadge = getStatusBadge(referral.status)
                const StatusIcon = statusBadge.icon

                return (
                  <div
                    key={referral.id}
                    className="border rounded-lg p-5 hover:shadow-md transition-shadow"
                  >
                    {/* Header Row */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="font-semibold text-lg text-gray-900">
                            {referral.name}
                          </h3>
                          <span
                            className={cn(
                              'px-2 py-1 text-xs rounded-full font-medium',
                              getRoleBadgeColor(referral.role)
                            )}
                          >
                            {getRoleLabel(referral.role)}
                          </span>
                          <span
                            className={cn(
                              'px-2 py-1 text-xs rounded-full font-medium border flex items-center gap-1',
                              statusBadge.color
                            )}
                          >
                            <StatusIcon className="w-3 h-3" />
                            {statusBadge.label}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            <a
                              href={`mailto:${referral.email}`}
                              className="text-udaya-sage hover:underline"
                            >
                              {referral.email}
                            </a>
                          </div>
                          {referral.phone && (
                            <div className="flex items-center gap-1">
                              <Phone className="w-4 h-4" />
                              <a
                                href={`tel:${referral.phone}`}
                                className="text-udaya-sage hover:underline"
                              >
                                {referral.phone}
                              </a>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{referral.country}</span>
                          </div>
                          {referral.organization && (
                            <div className="flex items-center gap-1">
                              <Building2 className="w-4 h-4" />
                              <span>{referral.organization}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(referral.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-sm font-medium text-gray-500 mb-2">Message</p>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {referral.message}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 flex-wrap pt-4 border-t">
                      <Button size="sm" variant="outline" asChild>
                        <a
                          href={`mailto:${referral.email}?subject=Re: Partnership with Udaya`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Reply via Email
                        </a>
                      </Button>

                      {referral.phone && (
                        <Button size="sm" variant="outline" asChild>
                          <a
                            href={`https://wa.me/${referral.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            WhatsApp
                          </a>
                        </Button>
                      )}

                      {referral.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            variant="default"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => updateReferralStatus(referral.id, 'approved')}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => updateReferralStatus(referral.id, 'rejected')}
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                        </>
                      )}

                      {referral.status !== 'pending' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateReferralStatus(referral.id, 'pending')}
                        >
                          <Clock className="w-4 h-4 mr-2" />
                          Mark as Pending
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
