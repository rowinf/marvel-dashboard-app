import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Marvel Dashboard" },
    { name: "description", content: "Welcome to the Marvel Character Dashboard!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
