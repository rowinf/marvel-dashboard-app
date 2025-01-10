import type { Route } from "./+types/home";
import { CharacterDetails } from "../character/character-details";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Marvel Dashboard | Character Details" },
    { name: "description", content: "Marvel Character Details" },
  ];
}

export default function Character() {
  return <CharacterDetails />;
}
