'use server'
import { cookies } from 'next/headers'

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete('user_id')
    cookieStore.delete('trainer_token')
    
}