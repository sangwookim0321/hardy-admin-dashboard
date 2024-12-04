import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

function getAuthToken(): string {
  if (typeof window === 'undefined') return ''
  
  try {
    const authStorage = sessionStorage.getItem('auth-storage')
    if (!authStorage) return ''
    
    const { state } = JSON.parse(authStorage)
    return state.accessToken || ''
  } catch (error) {
    console.error('Error getting auth token:', error)
    return ''
  }
}

// 브라우저용 Supabase 클라이언트
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`
    }
  }
})

// API route용 Supabase 클라이언트 생성 함수
export function createServerSupabase(token?: string) {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: token ? {
        Authorization: `Bearer ${token}`
      } : {}
    }
  })
}
