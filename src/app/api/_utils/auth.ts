import { cookies } from 'next/headers'
import { supabase } from '@/lib/supabase/supabase'

export async function verifySession() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('sb-access-token')?.value
  const refreshToken = cookieStore.get('sb-refresh-token')?.value

  if (!accessToken) {
    return { success: false, error: 'No Access Token Found' }
  }

  const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken || '',
  })

  if (sessionError || !sessionData.user) {
    return { success: false, error: sessionError?.message }
  }

  return { success: true, user_id: sessionData.user.id }
}
