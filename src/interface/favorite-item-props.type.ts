import type {JokeApiResponse} from "./joke-api-response.interface.ts";

export type FavoriteItemProps = {
    joke: JokeApiResponse;
    onOpen: (joke: JokeApiResponse) => void;
    onDelete: (joke: JokeApiResponse) => void;
};
