'use client'

import { SettingInfo } from '@/components/molecules/setting-info/SettingInfo'
import { SettingManagement } from '@/components/molecules/setting-management/SettingManagement'
import { User } from '@supabase/supabase-js'
import { useUsers } from '@/hooks/useUsers'
import { useAuth } from '@/hooks/useAuth'
import { formatRoleDisplay, formatDate } from '@/utils/format'

interface SettingsProps {
  currentUser?: User | null
}

export const Settings = ({ currentUser }: SettingsProps) => {
  const { users, loading } = useUsers()
  const { isAuthenticated, isValidating } = useAuth()

  if (isValidating) {
    return <div>Validating authentication...</div>
  }

  if (!isAuthenticated) {
    return <div>Please log in to access settings</div>
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-4">
      <SettingInfo
        email={currentUser?.email}
        displayName={currentUser?.app_metadata?.displayName}
        phone={currentUser?.phone}
        created_at={currentUser?.created_at ? formatDate(currentUser.created_at) : ''}
        role={formatRoleDisplay(currentUser?.app_metadata?.role)}
      />
      <SettingManagement users={users} currentUser={currentUser} />
    </div>
  )
}