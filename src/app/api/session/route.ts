import { NextResponse } from 'next/server'
import { decrypt, encrypt } from '@/app/lib/session'
import { cookies } from 'next/headers'

export async function POST(req: Request) {   

    const { user } = await req.json()
 
    const token = await encrypt(user)

    const response = NextResponse.json({
      message: 'Session cookie set!',
      tokenCriado: token,
    })

    response.cookies.set('session', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60,
      path: '/',
    })
    
    return response;
}

export async function GET(req: Request) {   

  const cookie = (await cookies()).get('session')?.value

  const user = cookie ? await decrypt(cookie) : null

  const response = NextResponse.json({
    message: 'Session cookie returned!',
    session: user,
  })

  
  return response;
}