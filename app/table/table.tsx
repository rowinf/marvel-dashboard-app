import { Form, Link, useLocation, useNavigation, useSearchParams, useSubmit, useViewTransitionState } from "react-router";
import { ChevronDown, ChevronUp } from "~/icons";
import { Bars } from "~/loader";
import type { MarvelCharacterResult } from "~/types";

interface TableProps {
    results: MarvelCharacterResult[];
    total: number;
}

export const Table = ({ results, total }: TableProps) => {
    const navigation = useNavigation();
    const [q] = useSearchParams();
    const limit = 20;
    const submit = useSubmit();
    const offset = Number(q.get("offset"))
    const isNextPage = total > offset + results.length;
    const isLoading = navigation.state != 'idle';

    return (
        <Form viewTransition>
            <legend className="flex gap-2 mb-8 flex-col sm:flex-row border-violet-400 border bg-violet-100 dark:bg-gray-800 p-4">
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
                        <input disabled={isLoading} defaultValue={q.get("offset") || ''} type="text" name="offset" id="offset" placeholder="offset" className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base focus:outline focus:outline-0 sm:text-sm/6 border rounded-md"></input>
                    </div>
                </div>
                <div className="flex items-end justify-end gap-x-6">
                    <button type="submit" className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Search
                        {isLoading ? <Bars /> : null}
                    </button>
                </div>
            </legend>
            {total === 0 ? <p className="text-xl"><strong className="font-semibold">No results</strong></p> :
                <table className="block sm:table w-full">
                    <thead>
                        <tr>
                            <th className="hidden sm:table-cell p-2">Thumbnail</th>
                            <th>
                                <label className="cursor-pointer flex justify-center p-2 hover:bg-gray-200 dark:hover:bg-gray-800">
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
                            <th className="hidden sm:table-cell p-2">Description</th>
                        </tr>
                    </thead>
                    <tbody className="flex flex-col flex-1 w-full sm:table-row-group gap-4">
                        {results.map((result: MarvelCharacterResult) => (
                            <tr key={result.id} className="flex flex-col flex-1 gap-4 border-b md:gap-6 lg:gap-8 sm:table-row">
                                <td className="text-center md:max-w-[6rem] lg:max-w-[12rem] block sm:table-cell">
                                    <img src={`${result.thumbnail.path}.${result.thumbnail.extension}`} className="object-cover h-auto w-auto max-w-full"></img>
                                </td>
                                <td className="block sm:table-cell">
                                    <Link to={`/character/${result.id}`} className="text-blue-600 hover:underline font-medium text-lg" viewTransition>{result.name}</Link>
                                </td>
                                <td className="block sm:table-cell text-sm col-span-2 w-fit max-w-96">{result.description}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="block pt-8">
                        <tr className="flex flex-1 w-full">
                            <td className="w-full">
                                <button
                                    type="button"
                                    onClick={(event) => {
                                        const form = event.currentTarget.form;
                                        if (form) form.offset.value = offset - limit;
                                        submit(form, { replace: true });
                                    }}
                                    disabled={offset == 0 || isLoading}
                                >
                                    Previous
                                </button>
                            </td>
                            <td className="w-full">
                                <button
                                    type="button"
                                    onClick={(event) => {
                                        const form = event.currentTarget.form;
                                        if (form) form.offset.value = offset + limit;
                                        submit(form, { replace: true });
                                    }}
                                    disabled={!isNextPage || isLoading}
                                >
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