import Link from "next/link";
import BurgerMenu from "./BurgerMenu";

export default function Header() {
    return (
        <header className="flex justify-between items-center p-4">
            <Link href='/home'>backButton</Link>
            <BurgerMenu />
        </header>
    )
}