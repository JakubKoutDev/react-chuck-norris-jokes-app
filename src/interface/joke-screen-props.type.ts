import type {JokeApiResponse} from "./joke-api-response.interface.ts";

export type JokeScreenProps = {
    toggleFavoriteJoke: (joke: JokeApiResponse) => void;
    isFavoriteJoke: (id: string) => boolean;
};
