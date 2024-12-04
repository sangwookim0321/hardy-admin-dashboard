import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

export async function GET(request: NextRequest) {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return NextResponse.json({ users })
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: '사용자 목록을 가져오는데 실패했습니다.' }),
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role')
    
    if (userRole !== 'super') {
      return new NextResponse(
        JSON.stringify({ error: '권한이 없습니다.' }),
        { status: 403 }
      )
    }

    const body = await request.json()
    const { userId, role, status } = body

    const { error } = await supabase
      .from('users')
      .update({ 
        role,
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)

    if (error) {
      throw error
    }

    return NextResponse.json({ message: '업데이트 완료' })
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: '사용자 정보 업데이트에 실패했습니다.' }),
      { status: 500 }
    )
  }
}
