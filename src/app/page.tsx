'use client'

import { AuthForm } from '@/components/molecules/auth-form/AuthForm'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

export default function Home() {
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    sessionStorage.removeItem('had-user-data')
  }, [])

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      await login(email, password)
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="h-screen bg-[#000000] grid place-items-center">
      <AuthForm onSubmit={handleLogin} isLoading={isLoading} />
    </main>
  )
}
