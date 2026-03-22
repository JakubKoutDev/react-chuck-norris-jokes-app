import React, {createContext, type ReactNode, } from "react";
import {useFavorites} from "../hooks/useFavorites.ts";
import type {FavoritesContextType} from "../interface/favorites-context.type.ts";


export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const { favorites, toggleFavorite, isFavorite } = useFavorites();

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

