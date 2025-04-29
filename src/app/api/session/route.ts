import { NextResponse } from 'next/server'
import { encrypt } from '@/app/lib/session'

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