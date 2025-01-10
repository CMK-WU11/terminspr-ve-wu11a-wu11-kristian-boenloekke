import Image from "next/image"

export default async function CardTrainer({id}) {
    const trainer = await fetch(`http://localhost:4000/api/v1/trainers/${id}`).then(r => r.json())
    return (
        <article className="flex gap-4">
            <Image src={trainer.asset.url} width={400} height={400} alt="trainer" className="w-40 h-40 rounded-lg" />
            <h2 className="text-base">{trainer.trainerName}</h2>
        </article>


    )
}