'use client'

import { useAuth } from '@/hooks/useAuth'
import { Settings } from '@/components/organisms/settings/Settings'

export default function SettingsPage() {
  const { user } = useAuth()

  return (
    <Settings currentUser={user} />
  )
}