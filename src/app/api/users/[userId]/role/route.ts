import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/supabase'
import { verifySession } from '@/app/api/_utils/auth'

// 사용자 role 변경
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
    const { newRole } = await request.json()

    if (!userId || !newRole) {
      return NextResponse.json(
        { success: false, error: 'You Must Provide Both User ID and New Role.' },
        { status: 400 }
      )
    }

    if (userId === process.env.PROJECT_OWNER_USER_ID) {
      return NextResponse.json(
        { success: false, error: 'You Do Not Have Permission To Modify The Role Of The Project Owner.' },
        { status: 403 }
      )
    }

    // role 값 검증
    if (!['super_admin', 'admin', 'guest'].includes(newRole)) {
      return NextResponse.json({ success: false, error: 'Invalid Role Value.' }, { status: 400 })
    }

    const { data: currentUserData, error: fetchError } = await supabase
      .from('hardy_admin_users')
      .select('raw_app_meta_data')
      .eq('id', userId)
      .single()

    if (fetchError || !currentUserData) {
      return NextResponse.json({ success: false, error: 'Target User Not Found.' }, { status: 404 })
    }

    // 기존 raw_app_meta_data 가져와 role 수정
    const updatedMetaData = {
      ...currentUserData.raw_app_meta_data,
      role: newRole,
    }

    const { data, error: updateError } = await supabase
      .from('hardy_admin_users')
      .update({
        raw_app_meta_data: updatedMetaData,
        user_role: newRole,
      })
      .eq('id', userId)

    if (updateError) {
      return NextResponse.json({ success: false, error: 'Failed to Update Role in Database.' }, { status: 500 })
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Role Updated Successfully',
        data,
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
