import Image from "next/image";

export default function CardClass({item}) {
    return (
        <article>
            <Image src={item.asset.url} width={5000} height={3333} alt="people training" className="w-full h-auto rounded-2xl" />
            <h2 className="text-[16px]">{item.className}</h2>

        </article>
    )
    
}