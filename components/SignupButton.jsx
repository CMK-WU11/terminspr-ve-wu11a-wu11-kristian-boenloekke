'use client'

import { useAuth } from "@/contexts/AuthProvider"
import { useState, useEffect } from "react"

export default function SignupButton({ classId }) {
    const { user } = useAuth()
    const [userIsSignedUp, setUserIsSignedUp] = useState(false)

    useEffect(() => {
        if (user?.classes?.some((cls) => cls.id === classId)) {
            setUserIsSignedUp(true)
        }
    }, [user, classId])

    async function addClass() {
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ classId }),
            })

            if (!response.ok) {
                const error = await response.text()
                console.error('Sign-up failed:', error)
            } else {
                console.log(`Successfully signed up for class ${classId}`)
                setUserIsSignedUp(true)
            }
        } catch (error) {
            console.error('Error during sign-up:', error)
        }
    }

    async function removeClass() {
        try {
            const response = await fetch('/api/users/classes', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ classId }),
            })

            if (!response.ok) {
                const error = await response.text()
                console.error('cancellation failed:', error)
            } else {
                console.log('Successfully cancelled sign up for class')
                setUserIsSignedUp(false)
            }
        } catch (error) {
            console.error('Error during cancellation:', error)
        }
    }

    if (!user) {
        return null
    }


    return (
        <>
            {userIsSignedUp ?
                <button className={`bg-white rounded-l-xl text-[26px] p-4 w-1/2 self-end`}
                    onClick={() => removeClass()}>
                    Leave
                </button>

                :
                <button className={`bg-white rounded-l-xl text-[26px] p-4 w-1/2 self-end`}
                    onClick={() => addClass()}>
                    Sign up
                </button>

            }
        </>

    )
}