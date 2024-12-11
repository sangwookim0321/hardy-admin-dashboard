import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/supabase'
import { verifySession } from '@/app/api/_utils/auth'

export async function POST() {
  try {
    // 세션 검증
    const { success, error, cookieStore } = await verifySession()

    // 로그아웃 중 검증 실패 시 쿠키 삭제
    if (!success) {
      cookieStore?.delete('sb-access-token')
      cookieStore?.delete('sb-refresh-token')
      cookieStore?.delete('had-user-data')
      return NextResponse.json({ success: false, error }, { status: 401 })
    }

    // 유효한 세션으로 로그아웃 수행
    const { error: signOutError } = await supabase.auth.signOut()

    if (signOutError) {
      return NextResponse.json({ success: false, error: signOutError.message }, { status: 401 })
    }

    // 쿠키 삭제
    cookieStore?.delete('sb-access-token')
    cookieStore?.delete('sb-refresh-token')
    cookieStore?.delete('had-user-data')

    return NextResponse.json({ success: true, message: 'Logout Successful' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
