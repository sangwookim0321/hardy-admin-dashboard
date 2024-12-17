import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/supabase'
import { verifySession } from '@/app/api/_utils/auth'
import { validateEmail, validatePassword } from '@/app/api/_utils/validation'

// 유저 목록 조회
export async function GET(request: NextRequest) {
  try {
    // 세션 검증
    const { success, error } = await verifySession()

    if (!success) {
      return NextResponse.json({ success: false, error }, { status: 401 })
    }

    // 사용자 목록 조회
    const { data: users, error: userError } = await supabase
      .from('hardy_admin_users')
      .select('*')
      .order('created_at', { ascending: false })

    if (userError) {
      return NextResponse.json({ success: false, error: userError }, { status: 404 })
    }

    return NextResponse.json(
      {
        success: true,
        data: users,
        message: '',
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Internal Server Error',
      },
      { status: 500 }
    )
  }
}

// 유저 생성
export async function POST(request: NextRequest) {
  try {
    // 세션 검증
    const { success, user_role, error, errorType } = await verifySession('super_admin')

    if (!success) {
      const statusCode = errorType === 'permission' ? 403 : 401
      return NextResponse.json({ success: false, error }, { status: statusCode })
    }

    // 요청 body 파싱
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'You Must Provide Both Email and Password.' }, { status: 400 })
    }

    // 이메일 유효성 검사
    if (!validateEmail(email)) {
      return NextResponse.json({ success: false, error: 'Invalid Email Format.' }, { status: 400 })
    }

    // 패스워드 길이 검사
    if (!validatePassword(password)) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Password must be at least 6 characters long and contain special characters, English letters, numbers, etc.',
        },
        { status: 400 }
      )
    }

    // 유저 생성
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
