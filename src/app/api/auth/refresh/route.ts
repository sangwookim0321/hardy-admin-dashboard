import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/supabase'

export async function POST() {
  try {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get('sb-refresh-token')?.value

    if (!refreshToken) {
      return NextResponse.json({ success: false, error: '리프레시 토큰을 찾을 수 없습니다.' }, { status: 401 })
    }

    const { data: sessionData, error: refreshError } = await supabase.auth.refreshSession({
      refresh_token: refreshToken,
    })

    if (refreshError) {
      return NextResponse.json({ success: false, error: refreshError.message }, { status: 401 })
    }

    const { session } = sessionData
    if (session) {
      cookieStore.set('sb-access-token', session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 1000, // 1시간
        path: '/',
      })

      cookieStore.set('sb-refresh-token', session.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 1000, // 1시간
        path: '/',
      })
    }

    return NextResponse.json({ success: true, message: '토큰 갱신 성공!' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ success: false, error: '서버에 문제가 발생했습니다.' }, { status: 500 })
  }
}
