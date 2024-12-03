import { supabase } from './supabase'
import { useAuthStore } from '@/store/auth/auth-store'
import { AuthError, User, Session } from '@supabase/supabase-js'

export type AuthResponse = {
  data: {
    session?: Session;
    user?: User;
  } | null;
  error: AuthError | Error | null;
  message?: string;
}

const getErrorMessage = (error: AuthError | Error): string => {
  if ('message' in error) {
    if (error.message.includes('Invalid login credentials')) {
      return '이메일 또는 비밀번호가 올바르지 않습니다.'
    }
    if (error.message.includes('Email not confirmed')) {
      return '이메일 인증이 필요합니다.'
    }
    if (error.message.includes('Rate limit exceeded')) {
      return '너무 많은 시도가 있었습니다. 잠시 후 다시 시도해주세요.'
    }
  }
  return '로그인 중 오류가 발생했습니다.'
}

export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (response.error) {
      return { 
        data: null, 
        error: response.error,
        message: getErrorMessage(response.error)
      }
    }

    if (response.data.session) {
      const { session } = response.data
      
      useAuthStore.getState().actions.setAuth(
        session.user,
        session.access_token,
        session.refresh_token,
        session.expires_at
      )
    }

    return {
      data: {
        session: response.data.session,
        user: response.data.user
      },
      error: null
    }
  } catch (error) {
    const err = error as Error
    return { 
      data: null, 
      error: err,
      message: getErrorMessage(err)
    }
  }
}

export const signOut = async (): Promise<AuthResponse> => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      return { 
        data: null,
        error,
        message: '로그아웃 중 오류가 발생했습니다.'
      }
    }

    useAuthStore.getState().actions.clearAuth()
    return { data: null, error: null }
  } catch (error) {
    const err = error as Error
    return { 
      data: null, 
      error: err, 
      message: '로그아웃 중 오류가 발생했습니다.'
    }
  }
}

export const getCurrentUser = async (): Promise<AuthResponse> => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return { 
        data: null, 
        error,
        message: '사용자 정보를 가져올 수 없습니다.'
      }
    }

    return {
      data: { user },
      error: null
    }
  } catch (error) {
    const err = error as Error
    return { 
      data: null, 
      error: err,
      message: '사용자 정보를 가져올 수 없습니다.'
    }
  }
}
