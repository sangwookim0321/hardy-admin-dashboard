'use client'

import { SettingInfo } from '@/components/molecules/setting-info/SettingInfo'
import { SettingManagement } from '@/components/molecules/setting-management/SettingManagement'
import { User } from '@supabase/supabase-js'

interface SettingsProps {
  currentUser?: User | null
  users?: User[]
}

export const Settings = ({ currentUser, users }: SettingsProps) => {
  return (
    <div>
      <SettingInfo
        email={currentUser?.email}
        displayName={currentUser?.app_metadata?.displayName}
        phone={currentUser?.phone}
        created_at={currentUser?.created_at ? new Date(currentUser.created_at).toLocaleDateString() : ''}
        role={currentUser?.app_metadata?.role}
      />
      <SettingManagement currentUser={currentUser} users={users} />
    </div>
  )
}