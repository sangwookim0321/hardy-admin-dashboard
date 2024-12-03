import { StoreState } from '..'
import { User as SupabaseUser } from '@supabase/supabase-js'

export interface AuthState extends StoreState {
  version: number
  user: SupabaseUser | null
  accessToken: string | null
  refreshToken: string | null
  expiresAt: number | null
  actions: {
    setAuth: (
      user: SupabaseUser | null,
      accessToken: string | null,
      refreshToken?: string | null,
      expiresAt?: number | null
    ) => void
    clearAuth: () => void
  }
}
