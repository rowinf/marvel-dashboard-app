import { useLoaderData, useSubmit } from "react-router";
import { Table } from "../table/table";
import type { MarvelCharacterData } from "~/types";

export function CharacterList() {
  let data = useLoaderData<MarvelCharacterData>();
  
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          {data.data.attributionText}
        </header>
        <div className="max-w-[900px] w-full space-y-6 px-4">
          <Table results={data.data.results} />
        </div>
        <p>{data.data.attributionText}</p>
      </div>
    </main>
  );
}
