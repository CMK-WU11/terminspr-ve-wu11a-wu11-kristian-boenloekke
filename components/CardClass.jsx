import Image from "next/image";
import Link from "next/link";
import Ratings from "./Ratings";

export default function CardClass({item}) {
    return (
        <article className="w-[33vw]">
            <Link href={`/classes/${item.id}`}>
            <Image 
                src={item.asset.url} 
                width={5000} height={3333} 
                alt="people training" 
                className="w-[33vw] h-[120px] rounded-2xl"
                priority 
            />
            <h2 className="text-[16px]">{item.className}</h2>
            <Ratings classId={item.id} />
            </Link>
        </article>
    )
    
}