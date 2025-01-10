import { useParams } from "react-router"
import useSWR from "swr"
import { fetcher, getCharacterDetailsUrl } from "~/api"
import type { MarvelCharacterResult } from "~/types"


export const CharacterDetails = () => {
    const { characterId } = useParams();
    const { data, isLoading } = useSWR(getCharacterDetailsUrl(characterId as string), fetcher)

    if (isLoading) return null
    const result = (data.data.results as MarvelCharacterResult[])[0]
    return (
        <section>
            <h1>{result.name}</h1>
            <img src={`${result.thumbnail.path}.${result.thumbnail.extension}`}></img>
            <p>{result.description}</p>
        </section>
    )
}