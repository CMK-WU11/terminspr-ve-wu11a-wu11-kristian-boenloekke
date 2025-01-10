'use client'
import Link from "next/link";

export default function Button({text, className }) {
    return (
        <button className={`bg-white rounded-l-lg text-[26px] p-4 ${className}`}>
            {text}
        </button>
        
    )
}