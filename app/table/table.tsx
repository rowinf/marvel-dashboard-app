import type { FormEvent, FormEventHandler } from "react";
import { Link } from "react-router";
import type { MarvelCharacterData } from "~/types";

interface TableProps {
    data: MarvelCharacterData;
    onSubmitSearch: FormEventHandler<HTMLFormElement>;
}

export const Table = ({ data, onSubmitSearch }: TableProps) => {
    const { results } = data;
    return (
        <section>
            <form onSubmit={onSubmitSearch} className="flex gap-2 mb-8">
                <div className="flex-col">
                    <label htmlFor="character-name" className="block text-sm/6 font-medium text-gray-900">First name</label>
                    <div className="mt-2">
                        <input type="text" name="character-name" id="character-name" placeholder="Character Name" className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 border rounded-md"></input>
                    </div>
                </div>
                <div className="flex-col">
                    <label htmlFor="comic-id" className="block text-sm/6 font-medium text-gray-900">Comics (comma separated)</label>
                    <div className="mt-2">
                        <input type="text" name="comic-id" id="comic-id" placeholder="Comics (comma separated)" className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 border rounded-md"></input>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm/6 font-semibold text-gray-900">Clear</button>
                    <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Search</button>
                </div>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Thumbnail</th>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result: MarvelCharacterResult) => (
                        <tr key={result.id}>
                            <td>
                                <img src={`${result.thumbnail.path}.${result.thumbnail.extension}`} width="150"></img>
                            </td>
                            <td><Link to={`/character/${result.id}`} className="text-blue-600 hover:underline">{result.name}</Link></td>
                            <td>{result.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}