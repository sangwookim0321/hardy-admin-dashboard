import { supabase } from './supabase'
import { useAuthStore } from '@/store/auth/auth-store'

export const signIn = async (email: string, password: string) => {
  try {
    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (response.error) {
      return { data: null, error: response.error }
    }

    if (response.data.user) {
      const authData = {
        id: response.data.user.id,
        email: response.data.user.email || '',
        role: response.data.user.role || 'authenticated',
      }
      console.log('로그인 성공:', response.data)
      console.log('저장할 인증 데이터:', { user: authData, accessToken: response.data.session.access_token })
      
      useAuthStore.getState().actions.setAuth(
        authData,
        response.data.session.access_token
      )

      // 상태 저장 후 확인
      const currentState = useAuthStore.getState()
      console.log('저장된 상태:', currentState)
    }

    return { data: response.data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw error
    }
    useAuthStore.getState().actions.clearAuth()
  } catch (error) {
    console.error('Error signing out:', error)
  }
}

export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      throw error;
    }
    return { user, error: null };
  } catch (error) {
    return { user: null, error };
  }
};
