import { Form, Link, useLoaderData, useSearchParams, useSubmit } from "react-router";
import { Table } from "../table/table";
import type { MarvelCharacterData } from "~/types";
import { ChevronDown, ChevronUp } from "~/icons";

export function CharacterList() {
    let data = useLoaderData<MarvelCharacterData>();
    const [q] = useSearchParams();
    const submit = useSubmit();

    return (
        <main className="flex flex-col max-w-screen-lg lg:mx-auto mx-4 pt-8 pb-4 gap-4">
            <h1 className="text-2xl border-b-4">Marvel Dashboard</h1>
            <Form viewTransition>
                <Table headers={["Thumbnail", "Name", "Description"]} results={data.data.results} total={data.data.total} renderRow={(result) => {
                    return (
                        <tr key={result.id} className="flex flex-col flex-1 gap-4 border-b md:gap-6 lg:gap-8 sm:table-row">
                            <td className="text-center md:max-w-[6rem] lg:max-w-[12rem] block sm:table-cell">
                                <img src={`${result.thumbnail.path}.${result.thumbnail.extension}`} className="object-cover h-auto w-auto max-w-full"></img>
                            </td>
                            <td className="block sm:table-cell">
                                <Link to={`/character/${result.id}`} className="text-blue-600 hover:underline font-medium text-lg" viewTransition>{result.name}</Link>
                            </td>
                            <td className="block sm:table-cell text-sm col-span-2 w-fit max-w-96">{result.description}</td>
                        </tr>
                    )
                }} renderHeader={(name, i) => {
                    if (i === 1) {
                        return (
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
                        )
                    }

                    return <th className="hidden sm:table-cell p-2">{name}</th>
                }} />
            </Form>
            <footer>
                <p className="text-sm">{data.attributionText}</p>
            </footer>
        </main>
    );
}
