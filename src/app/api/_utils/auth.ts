import { cookies } from 'next/headers'
import { supabase } from '@/lib/supabase/supabase'

export async function verifySession() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('sb-access-token')?.value
  const refreshToken = cookieStore.get('sb-refresh-token')?.value

  // 액세스 토큰 확인
  if (!accessToken) {
    return { success: false, error: 'No Access Token Found' }
  }

  // Supabase 세션 설정 및 토큰 검증
  const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken || '',
  })

  if (sessionError || !sessionData.user) {
    return { success: false, error: 'Session Verification Failed' }
  }

  return { success: true, user_id: sessionData.user.id, user_role: sessionData.user.app_metadata.role, cookieStore }
}
