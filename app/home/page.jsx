import CardClass from "@/components/CardClass";

export default async function Home() {
    const classes = await fetch('http://localhost:4000/api/v1/classes').then(r => r.json())



    return (
        <>
            <h1 className="text-lg">Popular Classes</h1>
            <ul className="flex overflow-x-scroll">
                {classes.map((item) => (
                    <li key={item.id} className='w-full'>
                        <CardClass item={item} />   
                    </li>
                ))}
            </ul>
        </>
    )
}