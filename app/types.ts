
export interface MarvelCharacterResult {
    attributionText: string;
    data: {
        results: [{
            id: string;
            name: string;
            description: string;
            thumbnail: {
                path: string;
                extension: string;
            }
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
