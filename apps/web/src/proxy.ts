import { validateBasicAuth } from '@/lib/auth/basic/validateBasicAuth'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if route should be protected
  const isProtectedRoute = pathname.startsWith('/admin')
  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  // Validate Basic Auth using the shared function
  try {
    await validateBasicAuth(request.headers.get('authorization'))
    return NextResponse.next()
  } catch (error) {
    console.error(error)
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area", charset="UTF-8"',
      },
    })
  }
}

export const config = {
  matcher: ['/admin/:path*'],
}
