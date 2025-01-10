'use client'
import { useState } from "react"

export default function FormLogin({setShowMenu}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const response = await fetch('/api/auth',{
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            })

            if (!response.ok) {
                throw new Error("Login failed")
            } else {
                setShowMenu(false)
            }
        } catch (error) {
            console.error('Login error:', error)
        }

    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-black px-10">
            <label htmlFor="username" className="flex flex-col gap-1"> Username
                <input 
                    type="text"
                    id="username"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    className="border border-black text-black p-4" 
                />

            </label>
            <label htmlFor="password" className="flex flex-col gap-1"> Password
                <input 
                    type="password"
                    id="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-black text-black p-4" 
                />

            </label>

            <button type="submit" className="px-4 py-2 border border-black">
                Log in
            </button>

        </form>
    )

}