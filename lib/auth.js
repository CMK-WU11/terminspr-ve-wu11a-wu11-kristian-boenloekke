'use server'
import { cookies } from 'next/headers'

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete('user_id')
    cookieStore.delete('trainer_token')
}

export async function getCurrentUser() {
    const cookieStore = await cookies()
    const token = cookieStore.get('trainer_token')?.value
    const userId = cookieStore.get('user_id')?.value

    if (!token || !userId) {
        return null
      }
    const user = await fetch(`http://localhost:4000/api/v1/users/${userId}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(r => r.json())

    return user
}