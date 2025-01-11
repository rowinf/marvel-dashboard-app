import { Form, Link, useSearchParams, useSubmit } from "react-router";
import { ChevronDown, ChevronUp } from "~/icons";
import type { MarvelCharacterResult } from "~/types";

interface TableProps {
    results: MarvelCharacterResult[];
    total: number;
}

export const Table = ({ results, total }: TableProps) => {
    const [q] = useSearchParams();
    const limit = 20;
    const submit = useSubmit();
    const offset = Number(q.get("offset"))
    const isNextPage = total > offset + results.length

    return (
        <Form>
            <legend className="flex gap-2 mb-8">
                <div className="flex-col">
                    <label htmlFor="name" className="block text-sm/6 font-medium">First name</label>
                    <div className="mt-2">
                        <input
                            onChange={(event) => {
                                const form = event.currentTarget.form;
                                if (form) form.offset.value = "";
                            }}
                            type="text" name="nameStartsWith" id="name"
                            defaultValue={q.get("nameStartsWith") || ''}
                            placeholder="Character Name"
                            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base focus:outline focus:outline-0 sm:text-sm/6 border rounded-md"></input>
                    </div>
                </div>
                <div className="flex-col">
                    <label htmlFor="comics" className="block text-sm/6 font-medium">Comics</label>
                    <div className="mt-2">
                        <input
                            onChange={(event) => {
                                const form = event.currentTarget.form;
                                if (form) form.offset.value = "";
                            }}
                            defaultValue={q.get("comics") || ''}
                            type="text" name="comics" id="comics"
                            placeholder="Comma separated list"
                            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base focus:outline focus:outline-0 sm:text-sm/6 border rounded-md"></input>
                    </div>
                </div>
                <div className="flex-col invisible hidden">
                    <label htmlFor="offset" className="block text-sm/6 font-medium">Offset</label>
                    <div className="mt-2">
                        <input defaultValue={q.get("offset") || ''} type="text" name="offset" id="offset" placeholder="offset" className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base focus:outline focus:outline-0 sm:text-sm/6 border rounded-md"></input>
                    </div>
                </div>
                <div className="flex items-end justify-end gap-x-6">
                    <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Search</button>
                </div>
            </legend>
            {total === 0 ? <p className="text-xl"><strong className="font-semibold">No results</strong></p> :
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
                                        q.get('orderBy') === '-name' ? <ChevronDown /> : <ChevronUp />
                                    }
                                </label>
                            </th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result: MarvelCharacterResult) => (
                            <tr key={result.id}>
                                <td className="text-center max-w-96">
                                    <img src={`${result.thumbnail.path}.${result.thumbnail.extension}`} className="object-cover h-auto max-w-full"></img>
                                </td>
                                <td><Link to={`/character/${result.id}`} className="text-blue-600 hover:underline">{result.name}</Link></td>
                                <td>{result.description}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>
                                <button onClick={(event) => {
                                    const form = event.currentTarget.form;
                                    if (form) form.offset.value = offset - limit;
                                    submit(form, { replace: true });
                                }}
                                    className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-5" ${offset == 0 ? "invisible" : ""}`}>
                                    Previous
                                </button>
                            </td>
                            <td>
                                <button onClick={(event) => {
                                    const form = event.currentTarget.form;
                                    if (form) form.offset.value = offset + limit;
                                    submit(form, { replace: true });
                                }} className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${isNextPage ? "" : "invisible"}`}>
                                    Next
                                </button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            }
        </Form>
    )
}