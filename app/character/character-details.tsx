import { useLoaderData } from "react-router"
import type { MarvelCharacterData } from "~/types"


export const CharacterDetails = () => {
    let data = useLoaderData<MarvelCharacterData>();
    let result = data.data.results[0];

    return (
        <main className="flex flex-col pt-8 pb-4 max-w-prose md:mx-auto mx-4 gap-4">
            <h1 className="text-2xl border-b-4">Marvel Dashboard: {result.name}</h1>
            <section>
                <img className="py-4" src={`${result.thumbnail.path}.${result.thumbnail.extension}`}></img>
                <div className="border-2 p-4 border-violet-400 bg-violet-100 dark:bg-gray-800">
                    {result.description ? <p>{result.description}</p> : <em>No description</em>}
                </div>
            </section>
            <footer>
                <p className="text-sm">{data.attributionText}</p>
            </footer>
        </main>
    )
}