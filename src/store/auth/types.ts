import { StoreState } from '..'

export interface User {
  id: string
  email: string
  role: string
}

export interface AuthState extends StoreState {
  user: User | null
  accessToken: string | null
  actions: {
    setAuth: (user: User | null, accessToken: string | null) => void
    clearAuth: () => void
  }
}
