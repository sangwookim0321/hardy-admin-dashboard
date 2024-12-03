'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function Dashboard() {
  const router = useRouter()
  const { user, isAuthenticated, isValidating } = useAuth()

  useEffect(() => {
    if (!isValidating && !isAuthenticated) {
      console.log('Not authenticated, redirecting to home')
      router.push('/')
    }
  }, [isAuthenticated, isValidating, router])

  if (isValidating || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-xl text-gray-600">인증 확인 중...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">대시보드 페이지 입니다.</h1>
        <p className="mt-4 text-gray-600">
          로그인된 사용자: {user?.email}
        </p>
      </div>
    </div>
  )
}