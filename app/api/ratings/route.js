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

    const {classId, rating} = await req.json()

    try {
        const res = await fetch(`http://localhost:4000/api/v1/classes/${classId}/ratings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                "userId": `${userId}`,
                "rating": `${rating}`
            })
        })

        if (res.ok) {
            return new Response('Rating submitted succesfully', { status: 200 })

        } else if (res.status === 405) {
            return new Response('rating already submitted', { status: 405})

        } else {
            const errorData = await res.json()
            return new Response(`Rating submission failed: ${errorData.message}`, { status: res.status })
        }
    } catch (error) {
        return new Response('Internal Server Error', { status: 500 })
    }

}