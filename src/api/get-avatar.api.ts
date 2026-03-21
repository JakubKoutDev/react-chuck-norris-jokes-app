import {apiJokesRandom} from "../constants/api.ts";
import type {JokeApiResponse} from "../interface/joke-api-response.interface.ts";

export const apiGetAvatar = async () => {
    const r = await fetch(apiJokesRandom)
    const json: JokeApiResponse = await r.json()
    return json.icon_url
}