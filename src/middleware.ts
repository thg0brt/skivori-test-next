import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/app/lib/session'
 
// 1. Specify protected and public routes
const protectedRoutes = ['/', '/play', '/home']
const publicRoutes = ['/login', '/logout', '/register']

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
 
  // 3. get the cookie
  const cookie = req.cookies.get('session')?.value

  //4. redirect to login if the cookie is invalidate
  if(path == '/login' && cookie){
    return NextResponse.redirect(new URL('/home', req.url))
  }else if(isPublicRoute){
    return NextResponse.next();
  }else if(!cookie) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  
  // 5. Decrypt the session from the cookie
  const session = await decrypt(cookie)
 
  // 6.. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session.id) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  // 7. Redirect to /home if the user is authenticated
  if (session?.userId && !req.nextUrl.pathname.startsWith('/home')) {
    return NextResponse.redirect(new URL('/home', req.nextUrl))
  }
 
  return NextResponse.next();
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}