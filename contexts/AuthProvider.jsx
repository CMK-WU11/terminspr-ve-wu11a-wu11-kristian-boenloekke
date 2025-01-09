'use client'
import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch('/api/users', { method: 'GET' })
                if (response.ok) {
                    const { authenticated, id, username } = await response.json()
                    if (authenticated) {
                        setUser({ id, username })
                    } else {
                        setUser(null)
                    }
                } else {
                    setUser(null)
                }
            } catch (error) {
                console.error('Error fetching user:', error)
                setUser(null)
            }
        }

        fetchUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser,}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}
