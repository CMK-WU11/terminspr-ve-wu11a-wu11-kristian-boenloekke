
import { cookies } from 'next/headers'

export async function POST(request) {
    try {
      const { username, password } = await request.json()
      const res = await fetch('http://localhost:4000/auth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password
        }),
      })
  
      const data = await res.json()
  
      if (!res.ok) {
        return new Response(
          JSON.stringify({ error: data.message || 'Authentication failed' }),
          { status: res.status, headers: { 'Content-Type': 'application/json' } }
        )
      }
  
      const cookieStore = await cookies()
  
      cookieStore.set('trainer_token', data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      })

      cookieStore.set('user_id', data.userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      })
  
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error) {
      // console.error('Login error:', error)
      return new Response(
        JSON.stringify({ error: 'Internal server error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }
  }