'use client'

import { AuthForm } from '@/components/molecules/auth-form/AuthForm'
import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'

export default function Home() {
  const { login, isLoading } = useAuth()

  useEffect(() => {
    sessionStorage.removeItem('had-user-data')
  }, [])

  const handleLogin = async (email: string, password: string) => {
    login({ email, password })
  }

  return (
    <main className="h-screen bg-[#000000] grid place-items-center">
      <AuthForm onSubmit={handleLogin} isLoading={isLoading} />
    </main>
  )
}
