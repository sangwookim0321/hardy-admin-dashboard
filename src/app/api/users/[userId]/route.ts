import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/supabase'
import { verifySession } from '@/app/api/_utils/auth'
import { validateEmail, validateName, validatePhone } from '../../_utils/validation'
import { formatPhoneNumber } from '../../_utils/format'

// 사용자 정보 수정
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  try {
    const { userId } = await params
    // 세션 검증
    const { success, user_id, errorType, error } = await verifySession()

    if (!success) {
      const statusCode = errorType === 'permission' ? 403 : 401
      return NextResponse.json({ success: false, error }, { status: statusCode })
    }

    if (!userId) {
      return NextResponse.json({ success: false, error: 'You Must Provide User ID.' }, { status: 400 })
    } else if (userId !== user_id) {
      return NextResponse.json(
        { success: false, error: 'You Do Not Have Permission To Modify The Information Of The Other User.' },
        { status: 403 }
      )
    }

    // 요청 body 파싱
    const { email, displayName: display_name, phone } = await request.json()

    if (!email && !display_name && !phone) {
      return NextResponse.json({ success: false, error: 'All Field Data Must Be Provided.' }, { status: 400 })
    } else if (email && !validateEmail(email)) {
      return NextResponse.json({ success: false, error: 'Invalid Email Format.' }, { status: 400 })
    } else if (display_name && !validateName(display_name)) {
      return NextResponse.json({ success: false, error: 'Invalid Display Name Format.' }, { status: 400 })
    } else if (phone && !validatePhone(phone)) {
      return NextResponse.json({ success: false, error: 'Invalid Phone Number Format.' }, { status: 400 })
    }

    // 현재 사용자 데이터 조회
    const { data: currentUser, error: currentUserError } = await supabase
      .from('hardy_admin_users')
      .select('raw_app_meta_data')
      .eq('id', userId)
      .single()

    if (currentUserError) {
      return NextResponse.json({ success: false, error: 'Failed to fetch current user data' }, { status: 500 })
    }

    // raw_app_meta_data 업데이트
    const updatedMetaData = {
      ...currentUser.raw_app_meta_data,
      displayName: display_name,
    }

    const { data: userData, error: userError } = await supabase
      .from('hardy_admin_users')
      .update({
        email,
        raw_app_meta_data: updatedMetaData,
        display_name,
        phone: formatPhoneNumber(phone),
      })
      .eq('id', userId)
      .single()

    if (userError) {
      return NextResponse.json({ success: false, error: userError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: userData, message: 'User Updated Successfully' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}

// 사용자 삭제
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  try {
    const { userId } = await params
    // 세션 검증
    const { success, errorType, error } = await verifySession('super_admin')

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

// 사용자 정보 조회
export async function GET(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  try {
    const { userId } = await params
    // 세션 검증
    const { success, errorType, error } = await verifySession()

    if (!success) {
      const statusCode = errorType === 'permission' ? 403 : 401
      return NextResponse.json({ success: false, error }, { status: statusCode })
    }

    if (!userId) {
      return NextResponse.json({ success: false, error: 'You Must Provide User ID.' }, { status: 400 })
    }

    const { data: userData, error: userError } = await supabase
      .from('hardy_admin_users')
      .select('*')
      .eq('id', userId)
      .single()

    if (userError) {
      return NextResponse.json({ success: false, error: 'User Not Found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: userData, message: '' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
