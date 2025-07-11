import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = ['/profile','tasks']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const accessToken = request.cookies.get('access_token')?.value
  console.log('ACCESSTOKEN MIDDLE WARE', accessToken);

  if (!protectedRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  if (accessToken) {
    return NextResponse.next()
  } 
  

  const loginUrl = new URL('/login', request.url)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/profile/:path*', '/tasks/:path*'],
}
