'use client'

import { SettingInfo } from '@/components/molecules/setting-info/SettingInfo'
import { SettingManagement } from '@/components/molecules/setting-management/SettingManagement'

export const Settings = () => {
  return (
    <div className="space-y-4">
      <SettingInfo />
      <SettingManagement />
    </div>
  )
}
