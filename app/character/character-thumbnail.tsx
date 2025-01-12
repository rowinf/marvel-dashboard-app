import { useViewTransitionState } from "react-router";
import type { MarvelCharacterResult } from "~/types"

export const CharacterThumbnail = ({ thumbnail, href }: { thumbnail: MarvelCharacterResult['thumbnail'], href: string }) => {
    const isTransitioning = useViewTransitionState(href);
    return (
        <img
            src={`${thumbnail.path}.${thumbnail.extension}`}
            className="object-cover h-auto w-auto max-w-full min-h-40"
            style={{
                viewTransitionName: isTransitioning
                  ? "image-expand"
                  : "none",
              }}>
        </img>
    )
}