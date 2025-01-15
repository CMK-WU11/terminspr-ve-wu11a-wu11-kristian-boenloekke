import CardClass from "@/components/CardClass";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
    const classes = await fetch('http://localhost:4000/api/v1/classes').then(r => r.json())

    const random = Math.floor(Math.random() * classes.length)
    const randomClass = classes[random]

    return (
        <main className="w-full">
            <h1 className="text-lg text-center">Popular classes</h1>
            <section className="p-4">
                <Link href={`/classes/${randomClass.id}`}>
                <div className="relative w-full h-[50vh]">
                    <Image
                        src={randomClass.asset.url}
                        width={5500}
                        height={3333}
                        priority
                        className="w-full h-full object-cover rounded-xl filter brightness-75"
                        alt="workout people"
                    />
                    <h2 className="absolute bottom-4 left-4 text-xl leading-[4rem] text-white font-bold">
                        {randomClass.className}
                    </h2>
                </div>
                </Link>
            </section>
            <section>
                <h2 className="text-lg px-4">Classes for you</h2>
                <ul className="flex overflow-x-auto gap-4 w-full p-4 no-scrollbar">
                    {classes.map((item) => (
                        <li key={item.id} className="flex-shrink-0 min-h-fit">
                            <CardClass item={item} />
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    )
}