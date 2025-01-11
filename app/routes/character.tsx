import type { Route } from "./+types/home";
import { CharacterDetails } from "../character/character-details";
import type { MarvelCharacterResult } from "~/types";
import { ScreenLoader } from "~/loader";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Marvel Dashboard | Character Details" },
    { name: "description", content: "Marvel Character Details" },
  ];
}

export async function clientLoader({ params }: Route.LoaderArgs) {
  const {characterId} = params;
  const url = `https://gateway.marvel.com/v1/public/characters/${characterId}?apikey=${import.meta.env.VITE_APP_PUBLIC_MARVEL_KEY}`;
  const result = await fetch(url).then(res => res.json());
  return result as MarvelCharacterResult;
}

export function HydrateFallback() {
  return <ScreenLoader />
}

export default function Character() {
  return <CharacterDetails />;
}
