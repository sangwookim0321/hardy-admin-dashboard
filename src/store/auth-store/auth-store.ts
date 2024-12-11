import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface User {
  id: string
  email: string
  role: string
  [key: string]: any
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  setAuthenticated: (isAuthenticated: boolean) => void
  setUser: (user: User | null) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setUser: (user) => set({ user }),
    }),
    {
      name: 'had-user-data',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
