import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function middleware(request: NextRequest) {
  const token = request.headers.get('Authorization')?.split('Bearer ')[1]

  if (!token) {
    return new NextResponse(
      JSON.stringify({ error: '유효하지 않은 토큰입니다.' }),
      { status: 401 }
    )
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    )

    const { data: { user }, error } = await supabase.auth.getUser(token)

    if (error || !user) {
      return new NextResponse(
        JSON.stringify({ error: '유효하지 않은 토큰입니다.' }),
        { status: 401 }
      )
    }

    // 요청 객체에 user 정보 추가
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-user-id', user.id)
    requestHeaders.set('x-user-role', user.app_metadata?.role || 'guest')

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: '서버 오류가 발생했습니다.' }),
      { status: 500 }
    )
  }
}

export const config = {
  matcher: '/api/:path*',
}
