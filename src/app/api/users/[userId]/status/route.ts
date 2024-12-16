import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/supabase'
import { verifySession } from '@/app/api/_utils/auth'

// 사용자 상태 변경
export async function PATCH(request: NextRequest, context: { params: { userId: string } }) {
  try {
    const userId = await Promise.resolve(context.params.userId)
    // 세션 검증
    const { success, user_id, user_role, errorType, error } = await verifySession('super_admin')

    if (!success) {
      const statusCode = errorType === 'permission' ? 403 : 401
      return NextResponse.json({ success: false, error }, { status: statusCode })
    }

    // 요청 body 파싱
    const { newStatus } = await request.json()
    let isActive = false

    if (!newStatus) {
      return NextResponse.json({ success: false, error: 'You Must Provide New Status.' }, { status: 400 })
    } else if (newStatus !== '활성화' && newStatus !== '비활성화') {
      return NextResponse.json({ success: false, error: 'Invalid New Status.' }, { status: 400 })
    }

    if (newStatus === '활성화') {
      isActive = true
    } else if (newStatus === '비활성화') {
      isActive = false
    }

    if (!userId) {
      return NextResponse.json({ success: false, error: 'You Must Provide User ID.' }, { status: 400 })
    }

    if (userId === process.env.PROJECT_OWNER_USER_ID) {
      return NextResponse.json(
        { success: false, error: 'You Do Not Have Permission To Modify The Status Of The Project Owner.' },
        { status: 403 }
      )
    }

    // 사용자 상태 변경
    const { data: userUpdateData, error: userUpdateError } = await supabase
      .from('hardy_admin_users')
      .update({ is_active: isActive })
      .eq('id', userId)

    if (userUpdateError) {
      return NextResponse.json({ success: false, error: userUpdateError }, { status: 404 })
    }

    return NextResponse.json(
      {
        success: true,
        data: userUpdateData,
        message: 'User Status Updated Successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
