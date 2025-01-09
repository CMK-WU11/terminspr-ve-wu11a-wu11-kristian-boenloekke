import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = await cookies()
    const tokenCookie = cookieStore.get('trainer_token')
    const userIdCookie = cookieStore.get('user_id')
    const token = tokenCookie ? tokenCookie.value : null
    const userId = userIdCookie ? userIdCookie.value : null

    if (!token || !userId) {
        return null
    }

    try {

        const response = await fetch(`http://localhost:4000/api/v1/users/${userId}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }

        })

        if (!response.ok) {
            return null
        }

        const user = await response.json()
        if (user) {
            return new Response(
                JSON.stringify({ authenticated: true, id: user.id, username: user.username }),
                {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                }
            )
        }
    } catch (error) {
        console.error('Error fetching current user:', error)
        return null
    }

}




