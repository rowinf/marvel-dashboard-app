
export interface MarvelCharacterResult {
    id: string;
    name: string;
    description: string;
    thumbnail: {
        path: string;
        extension: string;
    }
    comics: {
        returned: number;
        available: number;
        items: [{
            resourceURI: string;
            name: string;
        }]
    }
}

export interface MarvelCharacterData {
    data: {
        results: MarvelCharacterResult[];
        total: number;
    }
    attributionText: string;
}
