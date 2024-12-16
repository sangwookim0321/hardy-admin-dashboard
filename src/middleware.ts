import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  try {
    const response = await fetch(`${request.nextUrl.origin}/api/auth/verify`, {
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
    })

    const data = await response.json()

    // 로그인을 안한 상태이고 "/" 경로라면 현재 페이지 유지
    if (!data.success && request.nextUrl.pathname === '/') {
      return NextResponse.next()
    }

    // 로그인을 안한 상태이거나 계정이 비활성화 상태이고 "/" 외의 경로에 접근하면 "/"로 리다이렉트 및 쿠키 삭제
    if ((!data.success || data.data.is_active === false) && request.nextUrl.pathname !== '/') {
      const redirectResponse = NextResponse.redirect(new URL('/', request.url))
      redirectResponse.cookies.set('sb-access-token', '', { maxAge: 0 })
      redirectResponse.cookies.set('sb-refresh-token', '', { maxAge: 0 })
      redirectResponse.cookies.set('had-user-data', '', { maxAge: 0 })
      return redirectResponse
    }

    // 로그인을 한 상태라면 그냥 next()
    if (data.success) {
      const redirectResponse = NextResponse.next()
      const userData = JSON.stringify({
        id: data.data.id,
        name: data.data.name,
        email: data.data.email,
      })

      redirectResponse.cookies.set('had-user-data', userData, {
        httpOnly: false,
        maxAge: 60 * 60 * 24, // 1일
      })
      return redirectResponse
    }
  } catch (error) {
    // API 호출 실패 시 로그인 페이지로 리다이렉트
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - *.png, *.svg (image files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$).*)',
  ],
}
