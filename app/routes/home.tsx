import { md5 } from "js-md5";
import { CharacterList } from "~/character/character-list";
import type { Route } from "./+types/home";
import type { MarvelCharacterData } from "~/types";
import { ScreenLoader } from "~/loader";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Marvel Dashboard" },
        { name: "description", content: "Welcome to the Marvel Character Dashboard!" },
    ];
}

export const fetchCharacterList = async (url: URL, query: URLSearchParams) => {
    const search = url.searchParams.get("search");
    const orderBy = url.searchParams.get("orderBy");
    const offset = url.searchParams.get("offset");
    const numericInput = Number(search);
    if (search != null && isNaN(numericInput)) {
        query.append("nameStartsWith", search);
    } else if (!isNaN(numericInput) && numericInput != 0) {
        query.append("comics", String(numericInput));
    }
    if (orderBy) query.append("orderBy", orderBy);
    if (offset) query.append("offset", offset);
    const result = await fetch(`https://gateway.marvel.com/v1/public/characters?${query}`).then(res => res.json());
    if (result.code != 200) throw new Error(`The Service returned an error [${result.code}]: ${result.message}`);
    return result as MarvelCharacterData;
}

// SSR only
export async function loader({ request }: Route.LoaderArgs) {
    const ts = String(Date.now());
    const hash = md5(`${ts}${import.meta.env.VITE_APP_PRIVATE_MARVEL_KEY}${import.meta.env.VITE_APP_PUBLIC_MARVEL_KEY}`);
    const query = new URLSearchParams([
        ['ts', ts],
        ['hash', hash],
        ['apikey', import.meta.env.VITE_APP_PUBLIC_MARVEL_KEY]
    ]);
    const url = new URL(request.url);
    return fetchCharacterList(url, query);
}

// client side data loading
export async function clientLoader({
    request
}: Route.ClientLoaderArgs) {
    const query = new URLSearchParams([['apikey', import.meta.env.VITE_APP_PUBLIC_MARVEL_KEY]]);
    const url = new URL(request.url);
    return fetchCharacterList(url, query);
}

// full screen loading state
export function HydrateFallback() {
    return <ScreenLoader />
}

export default function Home({ }: Route.ComponentProps) {
    return <CharacterList />;
}
