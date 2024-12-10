// src/hooks/useAuth.ts
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store/auth-store'
import { loginApi } from '@/lib/api/auth-api/login-api'
import { logoutApi } from '@/lib/api/auth-api/logout-api'
import { refreshApi } from '@/lib/api/auth-api/refresh-api'
import { verifyApi } from '@/lib/api/auth-api/verify-api'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useAuth = () => {
  const router = useRouter()
  const { setUser, setAuthenticated } = useAuthStore()

  // 리프레시 토큰이 실패했을 때 호출 함수
  const handleRefreshFailure = () => {
    setUser(null)
    setAuthenticated(false)
    router.replace('/')
  }

  // 로그인 mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: { email: string; password: string }) => loginApi.login(credentials),
    onSuccess: (response) => {
      if (response.success && response.data) {
        setUser(response.data)
        setAuthenticated(true)
        router.replace('/dashboard')
      }
    },
    onError: () => {
      setUser(null)
      setAuthenticated(false)
    },
  })

  // 로그아웃 mutation
  const { mutate: logout } = useMutation({
    mutationFn: () => logoutApi.logout(),
    onSuccess: (response) => {
      if (response.success) {
        setUser(null)
        setAuthenticated(false)
        sessionStorage.removeItem('had-user-data')
        router.replace('/')
      }
    },
    onError: () => {
      setUser(null)
      setAuthenticated(false)
      sessionStorage.removeItem('had-user-data')
      router.replace('/')
    },
  })

  // 리프레시 mutation
  const { mutate: refresh } = useMutation({
    mutationFn: () => refreshApi.refresh(),
    onError: handleRefreshFailure,
    onSuccess: (response) => {
      if (!response.success) {
        handleRefreshFailure()
      }
    },
  })

  // 인증 확인 query
  const verifyQuery = useQuery({
    queryKey: ['verify'],
    queryFn: () => verifyApi.verify(),
    enabled: false,
    retry: false,
  })

  const verify = async () => {
    try {
      const response = await verifyQuery.refetch()
      if (response.data?.success && response.data?.data) {
        setUser(response.data.data)
        setAuthenticated(true)
      } else {
        throw new Error(response.data?.error)
      }
    } catch (error) {
      setUser(null)
      setAuthenticated(false)
      throw error
    }
  }

  return {
    login: loginMutation.mutate,
    logout,
    refresh,
    verify,
    handleRefreshFailure,
    isLoading: loginMutation.isPending,
    isError: loginMutation.isError,
    error: loginMutation.error,
  }
}
