import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/supabase'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('sb-access-token')?.value
    const refreshToken = cookieStore.get('sb-refresh-token')?.value

    if (!accessToken) {
      return NextResponse.json({ success: false, error: '액세스 토큰을 찾을 수 없습니다.' }, { status: 401 })
    }

    // Supabase 세션 설정 및 토큰 검증
    const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken || '',
    })

    if (sessionError || !sessionData.user) {
      return NextResponse.json({ success: false, error: sessionError?.message }, { status: 401 })
    }

    // 사용자 정보 조회
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', sessionData.user.id)
      .single()

    if (userError) {
      return NextResponse.json({ success: false, error: '사용자를 찾을 수 없습니다.' }, { status: 404 })
    }

    return NextResponse.json(
      {
        success: true,
        data: userData,
        message: '인증에 성공하였습니다.',
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ success: false, error: '서버에 문제가 발생했습니다.' }, { status: 500 })
  }
}
