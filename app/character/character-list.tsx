import { useLoaderData } from "react-router";
import { Table } from "../table/table";
import type { MarvelCharacterData } from "~/types";

export function CharacterList() {
  let data = useLoaderData<MarvelCharacterData>();

  return (
      <main className="flex flex-col max-w-[900px] w-full mx-auto content-center pt-8 pb-4 gap-4">
          <h1 className="text-2xl border-b-4">Marvel Dashboard</h1>
          <Table results={data.data.results} total={data.data.total} />
          <footer>
              <p className="text-sm">{data.attributionText}</p>
          </footer>
      </main>
  );
}
