import {useContext} from "react";
import {FavoritesContext} from "../context/FavoritesContext.tsx";

export function useFavoritesContext() {
    const context = useContext(FavoritesContext);

    if (!context) {
        throw new Error("useFavoritesContext must be used within FavoritesProvider");
    }

    return context;
}