import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { AuthState } from './types'

const initialState: Omit<AuthState, 'actions'> = {
  version: 1,
  user: null,
  accessToken: null,
  refreshToken: null,
  expiresAt: null,
}

const getStoredAuth = () => {
  if (typeof window === 'undefined') return initialState
  
  try {
    const stored = sessionStorage.getItem('auth-storage')
    if (!stored) return initialState

    const { state } = JSON.parse(stored)
    return {
      version: state.version || initialState.version,
      user: state.user || initialState.user,
      accessToken: state.accessToken || initialState.accessToken,
      refreshToken: state.refreshToken || initialState.refreshToken,
      expiresAt: state.expiresAt || initialState.expiresAt,
    }
  } catch (error) {
    console.error('Error reading from sessionStorage:', error)
    return initialState
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...getStoredAuth(),
      actions: {
        setAuth: (user, accessToken, refreshToken, expiresAt) => {
          console.log('Setting auth:', { user, accessToken, refreshToken, expiresAt })
          set({ user, accessToken, refreshToken, expiresAt })
        },
        clearAuth: () => {
          console.log('Clearing auth')
          set({ 
            user: null, 
            accessToken: null, 
            refreshToken: null, 
            expiresAt: null 
          })
        },
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        expiresAt: state.expiresAt,
        version: state.version,
      }),
    }
  )
)
