import type {  FormEventHandler } from "react";
import { Form, Link, useSearchParams, useSubmit } from "react-router";
import type { MarvelCharacterResult } from "~/types";

interface TableProps {
    results: MarvelCharacterResult[];
}

export const Table = ({ results }: TableProps) => {
    const [q] = useSearchParams();
    let submit = useSubmit();
    return (
        <section>
            <Form className="flex gap-2 mb-8" onSubmit={(event) => {
              submit(event.currentTarget, {replace: true});
            }}>
                <div className="flex-col">
                    <label htmlFor="name" className="block text-sm/6 font-medium">First name</label>
                    <div className="mt-2">
                        <input defaultValue={q.get("nameStartsWith") || ''} type="text" name="nameStartsWith" id="name" placeholder="Character Name" className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base focus:outline focus:outline-0 sm:text-sm/6 border rounded-md"></input>
                    </div>
                </div>
                <div className="flex-col">
                    <label htmlFor="comics" className="block text-sm/6 font-medium">Comics</label>
                    <div className="mt-2">
                        <input type="text" name="comics" id="comics" placeholder="Comma separated list" className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base focus:outline focus:outline-0 sm:text-sm/6 border rounded-md"></input>
                    </div>
                </div>
                <div className="flex items-end justify-end gap-x-6">
                    <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Search</button>
                </div>
            </Form>
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