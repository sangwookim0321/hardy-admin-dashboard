'use client'

import { useAuth } from '@/hooks/useAuth'

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="flex items-center justify-center h-full">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">대시보드 페이지 입니다.</h1>
        {user && (
          <p className="mt-4 text-gray-600">
            환영합니다, {user.email}님!
          </p>
        )}
      </div>
    </div>
  )
}