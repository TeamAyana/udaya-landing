'use client'

import * as React from 'react'
import { Navigation } from './navigation'
import { Footer } from './footer'
import { CookieConsent } from '@/components/ui/cookie-consent'
import { InquiryModal } from '@/components/ui/inquiry-modal'

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  return (
    <>
      <Navigation onBookConsultation={() => setIsModalOpen(true)} />
      <main className="min-h-screen pt-20">{children}</main>
      <Footer onJoinWaitlist={() => setIsModalOpen(true)} />
      <CookieConsent />
      <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
