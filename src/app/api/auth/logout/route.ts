import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/supabase'

export async function POST() {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('sb-access-token')?.value
    const refreshToken = cookieStore.get('sb-refresh-token')?.value

    // 1. 액세스 토큰 확인
    if (!accessToken) {
      return NextResponse.json({ success: false, error: 'No Access Token Found' }, { status: 401 })
    }

    // 2. Supabase 세션 설정 및 토큰 검증
    const { data: session, error: sessionError } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken || '',
    })

    if (sessionError) {
      // 토큰 검증 실패 시 쿠키 삭제
      cookieStore.delete('sb-access-token')
      cookieStore.delete('sb-refresh-token')
      cookieStore.delete('had-user-data')
      return NextResponse.json({ success: false, error: 'Session Verification Failed' }, { status: 401 })
    }

    // 3. 유효한 세션으로 로그아웃 수행
    const { error: signOutError } = await supabase.auth.signOut()

    if (signOutError) {
      return NextResponse.json({ success: false, error: signOutError.message }, { status: 401 })
    }

    // 쿠키 삭제
    cookieStore.delete('sb-access-token')
    cookieStore.delete('sb-refresh-token')
    cookieStore.delete('had-user-data')

    return NextResponse.json({ success: true, message: 'Logout Successful' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
