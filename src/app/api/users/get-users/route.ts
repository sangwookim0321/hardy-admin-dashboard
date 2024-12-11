import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/supabase'
import { verifySession } from '@/app/api/_utils/auth'

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
        message: 'Users Fetched Successfully',
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
