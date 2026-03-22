import "./styles.css";
import {Button,} from "@mui/material";
import React from "react";
import {Link, Route, Routes} from "react-router-dom";
import JokesScreen from "./components/jokes-screen.tsx";
import FavoritesScreen from "./components/favorites-screen.tsx";

export default function App() {

    return (
        <>
            <Button component={Link} to="/">Home</Button>
            <Button component={Link} to="/favorites">Favorites</Button>
            <Routes>
                <Route path="/" element={<JokesScreen></JokesScreen>}></Route>
                <Route path="/favorites" element={<FavoritesScreen></FavoritesScreen>}></Route>
            </Routes>
        </>
    );
}




