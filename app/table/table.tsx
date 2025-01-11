import { Link, useNavigation, useSearchParams, useSubmit } from "react-router";
import { ChevronDown, ChevronUp } from "~/icons";
import { Bars } from "~/loader";

interface TableProps<T> {
    results: T[];
    total: number;
    hideControls?: boolean;
    renderRow: (row: T, index: number, array: any[]) => React.ReactNode;
    renderHeader: (header: string, index: number, array: any[]) => React.ReactNode;
    headers: string[];
}

export const Table = ({ results, total, renderRow, hideControls, headers, renderHeader }: TableProps<any>) => {
    const navigation = useNavigation();
    const [q] = useSearchParams();
    const limit = 20;
    const submit = useSubmit();
    const offset = Number(q.get("offset"));
    const isNextPage = total > offset + results.length;
    const isLoading = navigation.state != 'idle';

    return (
        <>
            {
                hideControls ? null :
                    <legend className="flex gap-2 mb-2 flex-col sm:flex-row border-violet-400 border bg-violet-100 dark:bg-gray-800 p-4">
                        <div className="flex-col">
                            <input
                                onChange={(event) => {
                                    const form = event.currentTarget.form;
                                    if (form) form.offset.value = "";
                                }}
                                type="text" name="search" id="name"
                                defaultValue={q.get("search") || ''}
                                placeholder="Search"
                                className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base focus:outline focus:outline-0 sm:text-sm/6 border rounded-md"></input>
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
            }
            {total === 0
                ? <p className="text-xl"><strong className="font-semibold">No results</strong></p>
                : <table className="block sm:table w-full">
                    <thead>
                        <tr>
                            {headers.map(renderHeader)}
                        </tr>
                    </thead>
                    <tbody className="flex flex-col flex-1 w-full sm:table-row-group gap-4">
                        {results.map(renderRow)}
                    </tbody>
                    {hideControls ? null :
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
                    }
                </table>
            }
        </>
    )

}