import type {JokeApiResponse} from "./joke-api-response.interface.ts";

export type FavoritesContextType = {
    favorites: JokeApiResponse[];
    toggleFavorite: (joke: JokeApiResponse, onRemoveOldest?: () => void) => void;
    isFavorite: (id: string) => boolean;
    clearFavorites: () => void;
};
