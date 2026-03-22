import { useEffect, useState } from "react";
import type {JokeApiResponse} from "../interface/joke-api-response.interface.ts";

const STORAGE_KEY = "favorites";

export function useFavorites() {
    const [favorites, setFavorites] = useState<JokeApiResponse[]>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error("Failed to parse favorites:", error);
            return [];
        }
    });

    // save to localStorage
    useEffect(() => {
        try{
            localStorage.setItem("favorites", JSON.stringify(favorites))
        }catch (error){
            console.error("Failed to save favorites to localStorage: ", error);
        }
    }, [favorites]);

    const toggleFavorite = (joke: JokeApiResponse) => {
        const exists = favorites.some(j => j.id === joke.id);

        let removedOldest = false;

        if (!exists && favorites.length >= 10) {
            removedOldest = true;
        }

        setFavorites(prev => {
            if (exists) {
                return prev.filter(j => j.id !== joke.id);
            }

            const updated = [...prev, joke];

            if (updated.length > 10) {
                updated.shift();
            }

            return updated;
        });

        return { removedOldest };
    };

    // Syncs UI of the favorites list across browser tabs
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === STORAGE_KEY && e.newValue) {
                try {
                    setFavorites(JSON.parse(e.newValue));
                } catch (e) {
                    console.error("Failed to sync favorites", e);
                }
            }
        };

        window.addEventListener("storage", handleStorageChange);

        // cleanup
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const isFavorite = (id: string) => {
        return favorites.some(j => j.id === id);
    };

    return { favorites, toggleFavorite, isFavorite };
}