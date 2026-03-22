import type {JokeApiResponse} from "./joke-api-response.interface.ts";

export type FavoritesScreenProps = {
    favorites: JokeApiResponse[];
    toggleFavoriteJoke: (joke: JokeApiResponse) => void;
}
