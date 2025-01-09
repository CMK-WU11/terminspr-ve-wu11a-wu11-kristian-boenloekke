import BurgerMenu from "./BurgerMenu";

export default function Header() {
    return (
        <header className="flex justify-between p-4">
            <button>backButton</button>
            <BurgerMenu />
        </header>
    )
}