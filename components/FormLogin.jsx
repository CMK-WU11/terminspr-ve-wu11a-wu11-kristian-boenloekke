'use client'
import { useState } from "react"
import { useAuth } from "@/contexts/AuthProvider"

export default function FormLogin({setShowMenu, setShowLoginForm}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors ] = useState({})
    const { refreshUser } = useAuth()

    function validateForm () {
        const newErrors = {}
        if (!username || username.trim() === '') newErrors.username = 'Username is required'
        if (!password || password.trim() === '') newErrors.password = 'Password is required'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

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

            if (response.ok) {
                await refreshUser()
                setShowMenu(false)
                setShowLoginForm(false)

            }

            if (response.status === 401) {
                setErrors({notfound: 'Wrong username or password'})
                throw new Error('unauthorized')
            }

            if (!response.ok) {
                throw new Error("Login failed")
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
                    onChange={(e) => setUsername(e.target.value)}
                    className="border border-black text-black p-4" 
                />

            {errors.username && <p className="text-red-500">{errors.username}</p>}
            </label>
            <label htmlFor="password" className="flex flex-col gap-1"> Password
                <input 
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-black text-black p-4" 
                />

            {errors.password && <p className="text-red-500">{errors.password}</p>}
            </label>
            {errors.notfound && <p className="text-red-500">{errors.notfound}</p> }

            <button type="submit" className="px-4 py-2 border border-black">
                Log in
            </button>

        </form>
    )

}