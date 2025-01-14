'use client'

import { useState } from "react"
import { X } from "lucide-react"
import { useAuth } from "@/contexts/AuthProvider"

export default function RatingModal({ classId, ratings }) {
    const [rating, setRating] = useState()
    const [showModal, setShowModal] = useState(false)
    const { user } = useAuth()

    async function rateClass() {
        try {
            const response = await fetch('/api/ratings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ classId, rating })
            })
            if (!response.ok) {
                const error = await response.text()
                console.error('Rating failed:', error)
            } else {
                console.log(`Successfully rated class ${classId}`)
            }
        } catch (error) {
            return error
        }

    }

    function toggleModal() {
        setShowModal(prev => !prev)
    }

    function handleSubmit(e) {
        e.preventDefault()
        rateClass()
    }

    function handleRating(value) {
        setRating(value)
    }

    // const isRatedByUser = ratings.find(entry => entry.userId === user.userId)

    return (
        <>
            
                <button onClick={toggleModal} className="text-white hover:text-customOrange">Rate this class</button>
            
            {showModal &&
                <div className="fixed inset-0 z-20 bg-white/70 h-screen flex flex-col justify-center items-center">
                    <button onClick={toggleModal}>close</button>
                    <form onSubmit={handleSubmit} className="bg-white rounded-lg border p-10 flex flex-col h-56">
                        <label htmlFor="rating">Rate the class:</label>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <div
                                    key={value}
                                    onClick={() => handleRating(value)}
                                    className={`w-10 h-10 border rounded cursor-pointer 
                            ${value <= rating ? 'bg-customOrange' : 'bg-white'}`}
                                />
                            ))}
                        </div>

                        <button type="submit" disabled={!rating} className={`border py-3 w-full m-4 rounded-lg self-center ${rating ? 'bg-customOrange text-white' : 'bg-white text-black'}`}>
                            Submit
                        </button>

                    </form>
                </div>
            }
        </>
    )

}