import {Box, Button, Dialog, DialogContent, DialogTitle, List, Typography} from "@mui/material";
import React, { useState} from "react";
import {useFavoritesContext} from "../hooks/use-favorites-context.ts";
import FavoriteItem from "./FavoriteItem.tsx";
import type {JokeApiResponse} from "../interface/joke-api-response.interface.ts";

export default function FavoritesScreen() {
    const {favorites, toggleFavorite, clearFavorites} = useFavoritesContext();
    const [selectedJoke, setSelectedJoke] = useState<JokeApiResponse | null>(null);


    const containerSx = {
        width: "100%",
        maxWidth: 600,
        margin: "0 auto",
    };

    return (
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <Box sx={[containerSx, {display: "flex", justifyContent: "flex-end", mb: 1}]}>
                <Button variant="contained" size="small" color="error" onClick={clearFavorites}>
                    Clear All
                </Button>
            </Box>

            {favorites.length === 0 ? <Typography>No favorites yet.</Typography> : (
                <List dense sx={containerSx}>
                {favorites.map(joke => (
                    <FavoriteItem
                        key={joke.id}
                        joke={joke}
                        onOpen={setSelectedJoke}
                        onDelete={toggleFavorite}
                    />
                ))}
            </List>)
            }

            <Dialog open={!!selectedJoke} onClose={() => setSelectedJoke(null)}>
                <DialogTitle>Full Joke</DialogTitle>
                <DialogContent>
                    <Typography>{selectedJoke?.value}</Typography>
                </DialogContent>
            </Dialog>
        </Box>
    );
}