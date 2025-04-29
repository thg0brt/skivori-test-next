
import { JWTPayload, SignJWT, jwtVerify } from 'jose'

// secret key
const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret-key');

//encrypt JWT
export async function encrypt(payload: JWTPayload) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1d')
    .sign(secret);

  return token;
}

//decrypt JWT
export async function decrypt(token: string) {
  const { payload } = await jwtVerify(token, secret);
  return payload;
}