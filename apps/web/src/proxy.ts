import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if route should be protected
  const isProtectedRoute = pathname.startsWith('/admin')

  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  // Basic Auth Credentials (should be stored in environment variables)
  const validUsername = process.env.BASIC_AUTH_USERNAME! as string
  const validPassword = process.env.BASIC_AUTH_PASSWORD! as string

  // Get Authorization Header
  const authHeader = request.headers.get('authorization')

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area", charset="UTF-8"',
      },
    })
  }

  // Decode Basic Auth
  const authValue = authHeader.split(' ')[1]

  if (!authValue) {
    return new NextResponse('Invalid authorization header', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area", charset="UTF-8"',
      },
    })
  }

  try {
    const credentials = atob(authValue)
    const [username, password] = credentials.split(':')

    // Validate Credentials
    if (username === validUsername && password === validPassword) {
      return NextResponse.next()
    }
  } catch (error) {
    console.error(error)
    return new NextResponse('Invalid authorization format', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area", charset="UTF-8"',
      },
    })
  }

  // Invalid Credentials
  return new NextResponse('Invalid credentials', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area", charset="UTF-8"',
    },
  })
}

// Configure which routes the middleware runs on
export const config = {
  matcher: ['/admin/:path*'],
}
