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
            <Form onSubmit={(event) => {
                submit(event.currentTarget, { replace: true });
            }}>
                <legend className="flex gap-2 mb-8">
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
                </legend>
                <table>
                    <thead>
                        <tr>
                            <th>Thumbnail</th>
                            <th>
                                <label className="cursor-pointer flex justify-center">
                                    Name
                                    <input
                                        className="invisible"
                                        type="checkbox"
                                        name="orderBy"
                                        value="name"
                                        defaultChecked={q.get('orderBy') === '-name'}
                                        onChange={(event) => {
                                            const form = event.currentTarget.form
                                            if (form) form.orderBy.value = event.currentTarget.checked ? '-name' : 'name'
                                            submit(event.currentTarget.form, { replace: true });
                                        }}
                                    />
                                    {
                                        q.get('orderBy') === '-name' ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                        </svg>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                            </svg>
                                    }
                                </label>
                            </th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result: MarvelCharacterResult) => (
                            <tr key={result.id}>
                                <td className="text-center">
                                    <img src={`${result.thumbnail.path}.${result.thumbnail.extension}`} className="object-cover h-auto"></img>
                                </td>
                                <td><Link to={`/character/${result.id}`} className="text-blue-600 hover:underline">{result.name}</Link></td>
                                <td>{result.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Form>
        </section>
    )
}