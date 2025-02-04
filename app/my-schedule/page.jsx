import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";

export default async function MySchedule() {
    const user = await getCurrentUser()

    return (
        <main className="px-4">
            <h1 className="text-xl">My Schedule</h1>
            <ul>
                {user.classes.map(cls => (
                    <li key={cls.id} className="w-full border-b border-black border-dashed py-4">
                        <Link href={`/classes/${cls.id}`}>
                            <p className="flex justify-between text-sm pb-4">{cls.classDay} <span>{cls.classTime}</span></p>
                            <h2 className="text-lg/6">{cls.className}</h2>
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    )
}