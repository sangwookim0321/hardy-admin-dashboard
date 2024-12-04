import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase/supabase'

export async function GET(request: NextRequest) {
  try {
    // 1. 토큰 확인
    const token = request.headers.get('Authorization')?.split('Bearer ')[1]
    
    if (!token) {
      return new NextResponse(
        JSON.stringify({ error: '인증되지 않은 요청입니다.' }),
        { status: 401 }
      )
    }

    // 2. 인증된 Supabase 클라이언트 생성
    const supabase = createServerSupabase(token)

    // 3. 사용자 목록 조회
    const { data: users, error } = await supabase
      .from('users')
      .select('*')

    console.log('Users data:', users)

    if (error) {
      console.error('Database Error:', error)
      throw error
    }

    return NextResponse.json({ users })
    
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ 
        error: '서버 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : String(error)
      }),
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  console.log('API Route: PATCH /api/users started')
  
  try {
    const userRole = request.headers.get('x-user-role')
    console.log('User role:', userRole)
    
    if (userRole !== 'super') {
      return new NextResponse(
        JSON.stringify({ error: '권한이 없습니다.' }),
        { status: 403 }
      )
    }

    const body = await request.json()
    console.log('Request body:', body)
    
    const { userId, role } = body

    console.log('Updating user:', userId, 'with role:', role)
    
    // 먼저 현재 사용자 데이터를 가져옵니다
    const supabase = createServerSupabase(request.headers.get('Authorization')?.split('Bearer ')[1])

    const { data: userData, error: fetchError } = await supabase
      .from('users')
      .select('raw_app_meta_data')
      .eq('id', userId)
      .single()

    if (fetchError) {
      console.error('Fetch Error:', fetchError)
      throw fetchError
    }

    // raw_app_meta_data 업데이트
    const updatedMetadata = {
      ...(userData?.raw_app_meta_data || {}),
      role
    }

    const { error: updateError } = await supabase
      .from('users')
      .update({ 
        role,
        raw_app_meta_data: updatedMetadata,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)

    if (updateError) {
      console.error('Update Error:', updateError)
      throw updateError
    }

    console.log('User update completed successfully')
    return NextResponse.json({ message: '업데이트 완료' })
  } catch (error) {
    console.error('=== Detailed Error Information ===')
    console.error('Error type:', error instanceof Error ? error.constructor.name : typeof error)
    console.error('Error message:', error instanceof Error ? error.message : error)
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    console.error('================================')

    return new NextResponse(
      JSON.stringify({ 
        error: '사용자 정보 업데이트에 실패했습니다.',
        details: error instanceof Error ? error.message : String(error)
      }),
      { status: 500 }
    )
  }
}
