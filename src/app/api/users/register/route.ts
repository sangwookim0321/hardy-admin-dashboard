import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/supabase'
import { verifySession } from '@/app/api/_utils/auth'

export async function POST(request: NextRequest) {
  try {
    // 세션 검증
    const { success, error } = await verifySession()

    if (!success) {
      return NextResponse.json({ success: false, error }, { status: 401 })
    }

    // 요청 body 파싱
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'You Must Provide Both Email and Password.' }, { status: 400 })
    }

    // 회원가입
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
    })

    if (authError) {
      return NextResponse.json({ success: false, error: authError.message }, { status: 401 })
    }

    return NextResponse.json(
      {
        success: true,
        data: authData,
        message: 'User Registered Successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
