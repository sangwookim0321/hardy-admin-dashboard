import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/supabase'
import { verifySession } from '@/app/api/_utils/auth'

export async function PATCH(request: NextRequest) {
  try {
    // 세션 검증
    const { success, user_id, error } = await verifySession()

    if (!success) {
      return NextResponse.json({ success: false, error }, { status: 401 })
    }

    // 현재 사용자의 role 확인
    const {
      data: { session },
    } = await supabase.auth.getSession()
    const currentUser = session?.user

    if (!currentUser?.app_metadata?.role || currentUser.app_metadata.role !== 'super_admin') {
      return NextResponse.json({ success: false, error: 'You Do Not Have Permission.' }, { status: 403 })
    }

    // 요청 body 파싱
    const { targetUserId, newRole } = await request.json()

    if (!targetUserId || !newRole) {
      return NextResponse.json(
        { success: false, error: 'You Must Provide Both User ID and New Role.' },
        { status: 400 }
      )
    }

    // role 값 검증
    if (!['super_admin', 'admin', 'guest'].includes(newRole)) {
      return NextResponse.json({ success: false, error: 'Invalid Role Value.' }, { status: 400 })
    }

    const { data: currentUserData, error: fetchError } = await supabase
      .from('hardy_admin_users')
      .select('raw_app_meta_data')
      .eq('id', targetUserId)
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
      })
      .eq('id', targetUserId)

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
