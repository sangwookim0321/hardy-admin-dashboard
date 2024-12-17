import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/supabase'
import { verifySession } from '@/app/api/_utils/auth'
import { validatePassword } from '@/app/api/_utils/validation'

// 비밀번호 변경
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  try {
    const { userId } = await params
    // 세션 검증
    const { success, errorType, error, cookieStore } = await verifySession()

    if (!success) {
      const statusCode = errorType === 'permission' ? 403 : 401
      return NextResponse.json({ success: false, error }, { status: statusCode })
    }

    if (!userId) {
      return NextResponse.json({ success: false, error: 'You Must Provide User ID.' }, { status: 400 })
    }

    // 요청 body 파싱
    const { currentPassword, newPassword, newPasswordConfirm, email } = await request.json()

    if (!currentPassword) {
      return NextResponse.json({ success: false, error: 'You Must Provide Current Password.' }, { status: 400 })
    }
    if (!newPassword) {
      return NextResponse.json({ success: false, error: 'You Must Provide New Password.' }, { status: 400 })
    } else if (!validatePassword(newPassword)) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Password must be at least 6 characters long and contain special characters, English letters, numbers, etc.',
        },
        { status: 400 }
      )
    } else if (newPassword !== newPasswordConfirm) {
      return NextResponse.json(
        { success: false, error: 'New Password And New Password Confirm Do Not Match.' },
        { status: 400 }
      )
    }

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password: currentPassword,
    })

    if (authError) {
      return NextResponse.json(
        { success: false, error: 'Your Current Password Is Incorrect Or Your Account Is Invalid' },
        { status: 401 }
      )
    }

    if (authData.user.id !== userId) {
      return NextResponse.json(
        { success: false, error: 'You Do Not Have Permission To Modify The Password Of The Other User.' },
        { status: 403 }
      )
    }

    const { data: userUpdateData, error: userUpdateError } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (userUpdateError) {
      return NextResponse.json({ success: false, error: userUpdateError.message }, { status: 400 })
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

    return NextResponse.json({ success: true, message: 'Password Changed Successfully' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
