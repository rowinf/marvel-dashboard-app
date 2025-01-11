import { Link, useLoaderData } from "react-router"
import type { MarvelCharacterResult } from "~/types"


export const CharacterDetails = () => {
    let data = useLoaderData<MarvelCharacterResult>();
    let result = data.data.results[0];

    return (
        <main className="flex flex-col content-center pt-8 pb-4 max-w-prose mx-auto gap-4">
            <h1 className="text-2xl border-b-4">Marvel Dashboard: {result.name}</h1>
            <section>
                <img className="py-4" src={`${result.thumbnail.path}.${result.thumbnail.extension}`}></img>
                <div className="border-2 p-4 bg-gray-100">
                    {result.description ? <p>{result.description}</p> : <em>No description</em>}
                </div>
            </section>
            <footer>
                <p className="text-sm">{data.attributionText}</p>
            </footer>
        </main>
    )
}