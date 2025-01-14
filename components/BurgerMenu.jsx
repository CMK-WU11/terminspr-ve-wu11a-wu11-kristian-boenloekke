'use client'
import { useState } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import FormLogin from "./FormLogin"
import { useAuth } from "@/contexts/AuthProvider"
import { logout } from "@/lib/auth"

export default function BurgerMenu({className}) {
    const [showMenu, setShowMenu] = useState(false)
    const [showLoginForm, setShowLoginForm] = useState(false)
    const { user } = useAuth()
    // console.log(user);

    function toggleMenu() {
        setShowMenu(prev => !prev)
    }

    function handleShowLoginForm() {
        setShowLoginForm(true)
    }

    return (
        <>
            <button aria-label="Toggle navigation menu" onClick={toggleMenu}>
                <Menu size={40} className="text-customGray" />
            </button>

            {showMenu &&
                <div className="absolute inset-0 bg-white flex flex-col w-full h-[100vh] z-30">
                    <button className="self-end p-4" onClick={toggleMenu}><X size={40} /></button>
                    <nav className="mb-14">
                        <ul className="text-lg text-center flex flex-col gap-6">
                            <li><Link href="/home" onClick={toggleMenu}>Home</Link></li>
                            <li><Link href="/search" onClick={toggleMenu}>Search</Link></li>
                            {user ?
                                <ul className="text-lg text-center flex flex-col gap-6">
                                    <li><Link href="/my-schedule" onClick={toggleMenu}>My Schedule</Link></li>
                                    <li><button onClick={logout}>Log out</button></li>
                                </ul>

                                : <li><button onClick={handleShowLoginForm}>Log in</button></li>
                            }
                        </ul>
                    </nav>

                    {showLoginForm && !user && <FormLogin setShowMenu={setShowMenu} />}

                </div>
            }

        </>
    )
}