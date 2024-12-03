import { useEffect, useState, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/auth/auth-store'
import { supabase } from '@/lib/supabase/supabase'
import toast from 'react-hot-toast'

export function useAuth() {
  const router = useRouter()
  const pathname = usePathname()
  const { user, accessToken, refreshToken, expiresAt, actions } = useAuthStore()
  const [isValidating, setIsValidating] = useState(true)
  const [isValid, setIsValid] = useState(false)
  const hasShownError = useRef(false)
  const isInitialMount = useRef(true)

  const refreshSession = async () => {
    if (!refreshToken) return null

    try {
      const { data, error } = await supabase.auth.refreshSession({
        refresh_token: refreshToken,
      })

      if (error) {
        console.log('Failed to refresh session:', error)
        return null
      }

      const { session } = data
      if (session) {
        actions.setAuth(
          session.user,
          session.access_token,
          session.refresh_token,
          session.expires_at
        )
        return session
      }
    } catch (error) {
      console.log('Error refreshing session:', error)
    }
    return null
  }

  const validateSession = async () => {
    try {
      // 초기 마운트 시에는 에러 메시지를 표시하지 않음
      if (isInitialMount.current) {
        isInitialMount.current = false
        if (!user || !accessToken) {
          setIsValid(false)
          router.push('/')
          return
        }
      }

      if (!user || !accessToken) {
        setIsValid(false)
        if (!hasShownError.current && pathname !== '/') {
          hasShownError.current = true
          toast.error('로그인이 필요한 페이지입니다.')
          router.push('/')
        }
        return
      }

      // 토큰 만료 체크
      const now = Math.floor(Date.now() / 1000)
      if (expiresAt && now >= expiresAt - 60) { // 만료 1분 전에 리프레시
        console.log('Token expired or about to expire, attempting refresh')
        const session = await refreshSession()
        if (!session) {
          actions.clearAuth()
          setIsValid(false)
          if (!hasShownError.current && pathname !== '/') {
            hasShownError.current = true
            toast.error('세션이 만료되었습니다. 다시 로그인해 주세요.')
            router.push('/')
          }
          return
        }
        // 리프레시 성공, 검증 계속 진행
      }

      // 1. 기본적인 데이터 존재 여부 확인
      if (!user || !accessToken || !refreshToken || !expiresAt) {
        throw new Error('Invalid session data')
      }

      // 2. 토큰 만료 확인
      if (Date.now() >= expiresAt * 1000) {
        throw new Error('Session expired')
      }

      // 3. 서버에서 현재 세션 유효성 확인
      const { data: { user: sessionUser }, error } = await supabase.auth.getUser(accessToken)
      
      if (error || !sessionUser) {
        throw new Error('Invalid session')
      }

      // 4. 저장된 유저 정보와 서버의 유저 정보 비교
      if (sessionUser.id !== user.id || sessionUser.email !== user.email) {
        throw new Error('User data mismatch')
      }

      const { data: { user: currentUser }, error: sessionError } = await supabase.auth.getUser(accessToken)
      
      if (sessionError || !currentUser) {
        console.log('Session validation failed')
        actions.clearAuth()
        setIsValid(false)
        if (!hasShownError.current && pathname !== '/') {
          hasShownError.current = true
          toast.error('세션이 만료되었습니다. 다시 로그인해 주세요.')
          router.push('/')
        }
        return
      }

      setIsValid(true)
      hasShownError.current = false
    } catch (error) {
      console.log('Session validation error')
      actions.clearAuth()
      setIsValid(false)
      if (!hasShownError.current && pathname !== '/') {
        hasShownError.current = true
        toast.error('인증에 실패했습니다. 다시 로그인해 주세요.')
        router.push('/')
      }
    } finally {
      setIsValidating(false)
    }
  }

  useEffect(() => {
    validateSession()

    return () => {
      hasShownError.current = false
    }
  }, [user, accessToken, refreshToken, expiresAt, router, actions, pathname])

  return {
    user,
    accessToken,
    isAuthenticated: isValid,
    isValidating
  }
}
