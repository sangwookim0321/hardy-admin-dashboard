import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/supabase'
import { verifySession } from '@/app/api/_utils/auth'

// 사용자 삭제
export async function DELETE(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const userId = await Promise.resolve(params.userId)
    // 세션 검증
    const { success, user_role, errorType, error } = await verifySession('super_admin')

    if (!success) {
      const statusCode = errorType === 'permission' ? 403 : 401
      return NextResponse.json({ success: false, error }, { status: statusCode })
    }

    if (userId === process.env.PROJECT_OWNER_USER_ID) {
      return NextResponse.json(
        { success: false, error: 'You Do Not Have Permission To Delete The Project Owner.' },
        { status: 403 }
      )
    }

    if (!userId) {
      return NextResponse.json({ success: false, error: 'You Must Provide User ID.' }, { status: 400 })
    }

    // 사용자 삭제
    const { data: userDeleteData, error: userDeleteError } = await supabase
      .from('hardy_admin_users')
      .delete()
      .eq('id', userId)

    if (userDeleteError) {
      return NextResponse.json({ success: false, error: userDeleteError.message }, { status: 500 })
    }

    const { data: authDeleteData, error: authDeleteError } = await supabase.auth.admin.deleteUser(userId)

    if (authDeleteError) {
      return NextResponse.json({ success: false, error: authDeleteError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'User Deleted Successfully' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
