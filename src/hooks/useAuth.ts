// src/hooks/useAuth.ts
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store/auth-store'
import { loginApi } from '@/lib/api/auth-api/login-api'
import { logoutApi } from '@/lib/api/auth-api/logout-api'
import { refreshApi } from '@/lib/api/auth-api/refresh-api'
import { verifyApi } from '@/lib/api/auth-api/verify-api'
import toast from 'react-hot-toast'

export const useAuth = () => {
  const router = useRouter()
  const { setUser, setAuthenticated } = useAuthStore()

  // 로그인
  const login = async (email: string, password: string) => {
    try {
      const response = await loginApi.login({ email, password })
      if (response.success && response.data) {
        setUser(response.data)
        setAuthenticated(true)
        router.push('/dashboard')
      }
    } catch (error: any) {
      setUser(null)
      setAuthenticated(false)
      throw error
    }
  }

  // 로그아웃
  const logout = async () => {
    try {
      const response = await logoutApi.logout()
      if (response.success) {
        router.push('/')
      }
    } catch (error: any) {
    } finally {
      setUser(null)
      setAuthenticated(false)
      sessionStorage.removeItem('had-user-data')
      router.replace('/')
    }
  }

  // 리프레시
  const refresh = async () => {
    try {
      const response = await refreshApi.refresh()
      return response.success
    } catch (error) {
      handleRefreshFailure()
      return false
    }
  }

  // 인증 확인
  const verify = async () => {
    try {
      const response = await verifyApi.verify()
      if (response.success && response.data) {
        setUser(response.data)
        setAuthenticated(true)
        return true
      } else {
        setUser(null)
        setAuthenticated(false)
        return false
      }
    } catch (error) {
      setUser(null)
      setAuthenticated(false)
      return false
    }
  }

  // 리프레시 토큰이 실패했을 때 호출 함수
  const handleRefreshFailure = () => {
    setUser(null)
    setAuthenticated(false)
    router.replace('/')
    throw new Error('세션이 만료되었습니다. 다시 로그인해주세요.')
  }

  return {
    login,
    logout,
    refresh,
    verify,
    handleRefreshFailure,
  }
}
