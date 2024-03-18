import { NextRequest, NextResponse } from 'next/server'


const isAuthPaths = (path: string) => ['/login'].some((e) => path.includes(e))

export async function middleware(request: NextRequest) {
  if (!request.cookies.get('token')?.value) {
    if (!isAuthPaths(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  } else {
    if (isAuthPaths(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    if (request.nextUrl.pathname === '/api/logout') {
      const res = NextResponse.redirect(new URL('/login', request.url), {
        status: 301,
      })
      res.cookies.delete('token')
      return res
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/login',"/dashboard"],
}
