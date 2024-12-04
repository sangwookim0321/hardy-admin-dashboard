'use client'

import { useAuth } from '@/hooks/useAuth'
import { Settings } from '@/components/organisms/settings/Settings'

export default function SettingsPage() {
  const { user } = useAuth()
  // TODO: users 데이터를 가져오는 로직 추가 필요
  const users = [] // 임시 빈 배열

  return (
    <Settings currentUser={user} users={users} />
  )
}