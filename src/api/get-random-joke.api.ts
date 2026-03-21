import {apiJokesRandom} from "../constants/api.ts";
import type {JokeApiResponse} from "../App.tsx";

export const getJoke = async (): Promise<JokeApiResponse> => {
    const r = await fetch(apiJokesRandom);
    return await r.json();
};