'use client'

import { useAuth } from '@/hooks/useAuth'
import { SettingInfo } from '@/components/molecules/setting-info/SettingInfo'
import { formatRoleDisplay, formatDate } from '@/utils/format'

export default function Settings() {
  const { user } = useAuth()

  return (
    <div className="p-8">
      <SettingInfo
        email={user?.email}
        displayName={user?.app_metadata?.displayName}
        phone={user?.phone}
        created_at={user?.created_at ? formatDate(user.created_at) : ''}
        role={formatRoleDisplay(user?.app_metadata?.role ?? '')}
      />
    </div>
  )
}