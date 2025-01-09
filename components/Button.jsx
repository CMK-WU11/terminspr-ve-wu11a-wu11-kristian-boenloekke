import Link from "next/link";

export default function Button({text, className, href}) {
    return (
        <Link href={href} className={`bg-white rounded-l-lg text-[26px] p-4 ${className}`}>
            {text}
        </Link>
        
    )
}