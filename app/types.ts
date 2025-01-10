
export interface MarvelCharacterResult {
    id: string;
    name: string;
    description: string;
    thumbnail: {
        path: string;
        extension: string;
    }
}

export interface MarvelCharacterData {
    results: MarvelCharacterResult[];
}
