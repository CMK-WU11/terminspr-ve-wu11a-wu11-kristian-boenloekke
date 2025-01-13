import CardClass from "@/components/CardClass";
import Image from "next/image";

export default async function Home() {
    const classes = await fetch('http://localhost:4000/api/v1/classes').then(r => r.json())

    const randomIndex = Math.floor(Math.random() * classes.length)
    const randomItem = classes[randomIndex]

    return (
        <main className="w-full">
            
            <Image
                src={randomItem.asset.url}
                width={5500}
                height={3333}
                priority
                className="w-full h-[50vh] object-cover"
                alt="workout people"
            />
            <h1 className="text-lg">Classes for you</h1>
            <ul className="flex overflow-x-auto gap-4 w-full p-4 no-scrollbar">
                {classes.map((item) => (
                    <li key={item.id} className="flex-shrink-0">
                        <CardClass item={item} />
                    </li>
                ))}
            </ul>
        </main>
    )
}