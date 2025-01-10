import CardClass from "@/components/CardClass"
import { SearchIcon } from 'lucide-react'
export default async function Search({ searchParams }) {
    const awaitedParams = await searchParams
    const query = awaitedParams.q?.toLowerCase() || ''
    const classes = await fetch('http://localhost:4000/api/v1/classes').then(r => r.json())
    
    const searchTerms = query.split(' ')
    const searchableFields = [
        "className",
        "classDescription",
        "classDay",
        "classTime",
        "trainer.trainerName",
    ]

    function getNestedValue(obj, key) {
        return key.split('.').reduce((acc, part) => acc && acc[part], obj);
    }

    const searchResults = classes.filter((item) =>
        searchTerms.some((term) =>
            searchableFields.some((field) => {
                const value = getNestedValue(item, field);
                return value?.toLowerCase().includes(term);
            })
        )
    )

    return (
        <main>
            <h1 className="text-lg">Search</h1>
            <form method="GET" action="/search" type="submit">
                <label htmlFor="q" className="flex gap-2 py-4 px-2 bg-customGray rounded-lg"> 
                    <SearchIcon className="text-gray-500"/>
                    <input
                        type="text"
                        id="q"
                        name="q"
                        placeholder="Search classes"
                        className="bg-transparent outline-none"
                    />
                </label>
            </form>
            {searchResults.length === 0 ? (
                <p>Your search did not give any results. Try to search for something else.</p>
            ) : (
                <section>
                    <h2>Popular classes</h2>
                    <ul className="flex overflow-x-auto gap-4 w-full p-4 no-scrollbar">
                        {searchResults.map((item) => (
                            <li key={item.id} className="flex-shrink-0">
                                <CardClass item={item} />
                            </li>
                        ))}
                    </ul>
                </section>
            )
            }
        </main>
    )
}