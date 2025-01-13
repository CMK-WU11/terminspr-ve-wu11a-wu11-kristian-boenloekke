'use client'
import { useAuth } from "@/contexts/AuthProvider";
import Link from "next/link";

export default function MySchedule() {
    const { user, loading } = useAuth()

    if (loading) {
        return <p>...loading</p>
    } else if (!user) {
        return <p>Log in to see your schedule</p>
    }

    return (
        <main>
            <h1 className="text-xl">My Schedule</h1>

            <ul>
                {user.classes.map(cls => (
                    <li key={cls.id} className="w-full border-b border-black border-dotted">
                        <Link href={`/classes/${cls.id}`}>
                            <p className="text-lg">{cls.className}</p>
                            <p className="flex justify-between">{cls.classDay} <span>{cls.classTime}</span></p>
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    )
}