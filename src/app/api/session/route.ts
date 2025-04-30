import { NextResponse } from 'next/server'
import { decrypt, encrypt } from '@/app/lib/jwt'
import { cookies } from 'next/headers'

//HTTP Endpoint to store the user information in the cookie
export async function POST(req: Request) {   

    const { user } = await req.json()
 
    //encrypt the user information using JWT
    const token = await encrypt(user)

    const response = NextResponse.json({
      message: 'Session cookie set!',
      tokenCriado: token,
    })

    //set the cookie
    response.cookies.set('session', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60, //1 hour
      path: '/',
    })
    
    return response;
}

//HTTP Endpoint to retrieve the user information (decrypted) stored in the cookie
export async function GET() {   

  //get the cookie session
  const cookie = (await cookies()).get('session')?.value

  //decrypt the  user information using JWT
  const user = cookie ? await decrypt(cookie) : null

  const response = NextResponse.json({
    message: 'Session cookie returned!',
    session: user,
  })

  
  return response;
}