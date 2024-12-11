import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/supabase'
import { verifySession } from '@/app/api/_utils/auth'

export async function GET() {
  try {
    const { success, error, user_id } = await verifySession()

    if (!success) {
      return NextResponse.json({ success: false, error }, { status: 401 })
    }

    // 사용자 정보 조회
    const { data: userData, error: userError } = await supabase
      .from('hardy_admin_users')
      .select('*')
      .eq('id', user_id)
      .single()

    if (userError) {
      return NextResponse.json({ success: false, error: 'User Not Found' }, { status: 404 })
    }

    return NextResponse.json(
      {
        success: true,
        data: userData,
        message: 'Verified Successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
