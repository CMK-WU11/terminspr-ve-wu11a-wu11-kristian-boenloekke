'use client'
import { useState } from "react"
import { X } from "lucide-react"
import { useAuth } from "@/contexts/AuthProvider"

export default function RatingModal({ classId, ratings, className }) {
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

    if (user) {
        const isRatedByUser = ratings.find(entry => entry.userId === user.id)
        if (isRatedByUser) {
            return null
        }
    } else if (!user) {
        return null
    }




    return (
        <>

            <button onClick={toggleModal} className="text-white hover:text-customOrange">Rate this class</button>

            {showModal &&
                <div className="fixed inset-0 z-20 bg-white/70 h-screen flex flex-col">
                    <form onSubmit={handleSubmit} className="bg-white border flex flex-col h-[50vh]">
                        <button onClick={toggleModal} className="self-end"><X size={40} /></button>
                        <h2 className="text-base p-4">Rate <span className="font-bold">{className}</span> <br /> from 1 to 5:</h2>
                        <div className="flex gap-1 justify-center pt-6">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <div
                                    key={value}
                                    onClick={() => handleRating(value)}
                                    className={`w-10 h-10 border-2 border-customOrange rounded cursor-pointer 
                            ${value <= rating ? 'bg-customOrange' : 'bg-white'}`}
                                />
                            ))}
                        </div>

                        <button type="submit" disabled={!rating} className={`border-2 border-customOrange my-4 w-56 h-10 rounded self-center ${rating ? 'bg-customOrange text-white' : 'bg-white text-black'}`}>
                            Submit
                        </button>

                    </form>
                </div>
            }
        </>
    )

}