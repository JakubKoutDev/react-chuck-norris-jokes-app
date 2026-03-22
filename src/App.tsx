import "./styles.css";
import {Button,} from "@mui/material";
import React from "react";
import {Link, Route, Routes} from "react-router-dom";
import JokesScreen from "./components/jokes-screen.tsx";
import FavoritesScreen from "./components/favorites-screen.tsx";
import {useFavorites} from "./hooks/useFavorites.ts";

export default function App() {
    const { favorites, toggleFavorite, isFavorite } = useFavorites();

    return (
        <>
            <Button component={Link} to="/">Home</Button>
            <Button component={Link} to="/favorites">Favorites</Button>
            <Routes>
                <Route path="/" element={<JokesScreen isFavoriteJoke={isFavorite} toggleFavoriteJoke={toggleFavorite}></JokesScreen>}></Route>
                <Route path="/favorites" element={<FavoritesScreen favorites={favorites} toggleFavoriteJoke={toggleFavorite}></FavoritesScreen>}></Route>
            </Routes>
        </>
    );
}


