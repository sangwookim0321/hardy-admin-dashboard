import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/supabase'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      return NextResponse.json({ success: false, error: authError.message }, { status: 401 })
    }

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single()

    if (userError) {
      return NextResponse.json({ success: false, error: '사용자를 찾을 수 없습니다.' }, { status: 404 })
    }

    const cookieStore = await cookies()
    const { session } = authData

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

    return NextResponse.json(
      {
        success: true,
        data: userData,
        message: '로그인 성공!',
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ success: false, error: '서버에 문제가 발생했습니다.' }, { status: 500 })
  }
}
