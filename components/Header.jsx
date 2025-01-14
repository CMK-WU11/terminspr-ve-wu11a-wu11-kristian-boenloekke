'use client'
import Link from "next/link";
import BurgerMenu from "./BurgerMenu";
import { Triangle } from "lucide-react";
import { usePathname } from "next/navigation";


export default function Header() {
    const pathname = usePathname()

    return (
        <>
            {pathname !== '/' &&
                <header className="flex flex-row-reverse justify-between items-center p-4">
                    <BurgerMenu />
                    {pathname !== '/home' &&
                        <Link href='/home' className="text-customOrange flex gap-2 items-center">
                            <Triangle size={20} fill="#F4A88E" className=" rotate-[270deg]" />
                            Back
                        </Link>
                    }  
                </header>
            }
        </>
    )
}