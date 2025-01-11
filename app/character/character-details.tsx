import { Link, useLoaderData } from "react-router"
import { Table } from "~/table/table";
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
            <Table hideControls headers={["Comic Book"]} results={result.comics.items} total={result.comics.available} renderRow={(result) => (
                <tr key={result.id} className="flex flex-col flex-1 gap-4 border-b md:gap-6 lg:gap-8 sm:table-row">
                    <td className="block sm:table-cell">
                        <Link to={`/?search=${result.resourceURI.slice(43)}`} className="text-blue-600 hover:underline font-medium text-lg" viewTransition>{result.name}</Link>
                    </td>
                </tr>
            )} renderHeader={(header) => <th className="p-2">{header}</th>} />
            <footer>
                <p className="italic">showing {result.comics.returned} / {result.comics.available} available comics</p>
                <p className="text-sm">{data.attributionText}</p>
            </footer>
        </main>
    )
}