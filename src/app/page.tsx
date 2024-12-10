'use client'

import { AuthForm } from '@/components/molecules/auth-form/AuthForm'
import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'react-hot-toast'

export default function Home() {
  const { login, isLoading, isError, error } = useAuth()

  useEffect(() => {
    sessionStorage.removeItem('had-user-data')
  }, [])

  useEffect(() => {
    if (isError && error) {
      toast.error(error.message || '로그인에 실패했습니다.')
    }
  }, [isError, error])

  const handleLogin = async (email: string, password: string) => {
    login({ email, password })
  }

  return (
    <main className="h-screen bg-[#000000] grid place-items-center">
      <AuthForm onSubmit={handleLogin} isLoading={isLoading} />
    </main>
  )
}
