
export const fetcher = (args: RequestInfo) => fetch(args).then(res => res.json())
export const getCharactersUrl = () => {
    return `https://gateway.marvel.com/v1/public/characters?apikey=${import.meta.env.VITE_APP_PUBLIC_MARVEL_KEY}`
}
export const getCharacterDetailsUrl = (characterId: string) => {
    return `https://gateway.marvel.com/v1/public/characters/${characterId}?apikey=${import.meta.env.VITE_APP_PUBLIC_MARVEL_KEY}`
}

