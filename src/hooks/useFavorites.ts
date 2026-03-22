import { useEffect, useState } from "react";
import type { JokeApiResponse } from "../interface/joke-api-response.interface.ts";

export function useFavorites() {
    const [favorites, setFavorites] = useState<JokeApiResponse[]>([]);

    // load from localStorage
    useEffect(() => {
        const stored = localStorage.getItem("favorites");
        if (stored) {
            setFavorites(JSON.parse(stored));
        }
    }, []);

    // save to localStorage
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (joke: JokeApiResponse) => {
        const exists = favorites.some(f => f.id === joke.id);

        if (exists) {
            setFavorites(favorites.filter(f => f.id !== joke.id));
        } else {
            setFavorites([...favorites, joke]);
        }
    };

    const isFavorite = (id: string) => {
        return favorites.some(f => f.id === id);
    };

    return { favorites, toggleFavorite, isFavorite };
}