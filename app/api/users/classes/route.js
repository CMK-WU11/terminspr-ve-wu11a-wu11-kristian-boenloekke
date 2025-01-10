import { cookies } from "next/headers";
export async function POST(req) {
    const cookieStore = await cookies();
    const token = cookieStore.get('trainer_token')?.value
    const userId = cookieStore.get('user_id')?.value

    if (!token || !userId) {
        return new Response(JSON.stringify({ message: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        })
    }

    const { classId } = await req.json()

    try {
        const response = await fetch(`http://localhost:4000/api/v1/users/${userId}/classes/${classId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })

        if (response.ok) {
            return new Response('User successfully signed up for the class', { status: 200 })
        } else {
            const errorData = await response.json()
            return new Response(`Failed to sign up: ${errorData.message}`, { status: response.status })
        }
    } catch (error) {
        return new Response('Internal Server Error', { status: 500 })
    }
}

export async function DELETE(req) {
    const cookieStore = await cookies();
    const token = cookieStore.get('trainer_token')?.value
    const userId = cookieStore.get('user_id')?.value

    if (!token || !userId) {
        return new Response(JSON.stringify({ message: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        })
    }

    const { classId } = await req.json()

    try {
        const response = await fetch(`http://localhost:4000/api/v1/users/${userId}/classes/${classId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })

        if (response.ok) {
            return new Response('User successfully cancelled the class', { status: 200 })
        } else {
            const errorData = await response.json()
            return new Response(`Failed to delete class enrollment: ${errorData.message}`, { status: response.status })
        }
    } catch (error) {
        return new Response('Internal Server Error', { status: 500 })
    }
}