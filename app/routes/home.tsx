import { fetcher } from "~/api";
import { CharacterList } from "~/character/character-list";
import type { Route } from "./+types/home";
import type { MarvelCharacterData } from "~/types";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Marvel Dashboard" },
    { name: "description", content: "Welcome to the Marvel Character Dashboard!" },
  ];
}

export const fetchCharacterList = async (query: URLSearchParams) => {
  const result = await fetch(`https://gateway.marvel.com/v1/public/characters?${query}`).then(res => res.json());
  if (result.code != 200) throw new Error(`The Service returned an error [${result.code}]: ${result.message}`);
  return result as MarvelCharacterData;
}

// SSR only
// export async function loader({ params }: Route.LoaderArgs) {
//   return fetchCharacterList(params.nameInput, params.comicsInput)
// }

export async function clientLoader({
  request
}: Route.ClientLoaderArgs) {
  const query = new URLSearchParams([['apikey', import.meta.env.VITE_APP_PUBLIC_MARVEL_KEY]]);
  const url = new URL(request.url);
  const nameStartsWith = url.searchParams.get("nameStartsWith");
  const comics = url.searchParams.get("comics");
  const orderBy = url.searchParams.get("orderBy");  
  if (nameStartsWith) query.append("nameStartsWith", nameStartsWith);
  if (comics) query.append("comics", comics);
  if (orderBy) query.append("orderBy", orderBy);

  return fetchCharacterList(query);
}

export function HydrateFallback() {
  return <p>Loading Characters...</p>;
}

export default function Home({}: Route.ComponentProps) {
  return <CharacterList />;
}
