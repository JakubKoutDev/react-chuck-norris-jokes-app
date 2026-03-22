import { apiJokesRandom} from "../constants/api.ts";
import type {JokeApiResponse} from "../interface/joke-api-response.interface.ts";

export const getJoke = async (): Promise<JokeApiResponse> => {
    const r = await fetch(apiJokesRandom);
    return await r.json();
};


