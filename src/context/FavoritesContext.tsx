import type {JokeApiResponse} from "../interface/joke-api-response.interface.ts";
import React, {createContext, type ReactNode, } from "react";
import {useFavorites} from "../hooks/useFavorites.ts";

type FavoritesContextType = {
    favorites: JokeApiResponse[];
    toggleFavorite: (joke: JokeApiResponse) => void;
    isFavorite: (id: string) => boolean;
};

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const { favorites, toggleFavorite, isFavorite } = useFavorites();

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

