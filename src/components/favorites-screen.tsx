import {Box, Button, Dialog, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemText, Typography} from "@mui/material";
import React, {useState} from "react";
import {useFavoritesContext} from "../hooks/use-favorites-context.ts";
import DeleteIcon from "@mui/icons-material/Delete";

export default function FavoritesScreen() {
    const {favorites, toggleFavorite, clearFavorites} = useFavoritesContext();
    const [openJoke, setOpenJoke] = useState<string | null>(null);

    return (
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <Box sx={{width: "100%", maxWidth: 600, margin: "0 auto", display: "flex", justifyContent: "flex-end", mb: 1}}>
                <Button variant="contained" size="small" color="error" onClick={clearFavorites}>
                    Clear All
                </Button>
            </Box>

            <List sx={{width: "100%", maxWidth: 600, margin: "0 auto"}}>
                {favorites.map((joke) => (
                    <ListItem
                        key={joke.id}
                        secondaryAction={
                            <IconButton edge="end" onClick={() => toggleFavorite(joke)}>
                                <DeleteIcon/>
                            </IconButton>
                        }
                        onClick={() => setOpenJoke(joke.value)}
                        sx={{cursor: 'pointer'}}
                    >
                        <ListItemText
                            primary={
                                <Typography
                                    sx={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                    }}
                                >
                                    {joke.value}
                                </Typography>
                            }
                        />
                    </ListItem>
                ))}
            </List>


            <Dialog open={!!openJoke} onClose={() => setOpenJoke(null)}>
                <DialogTitle>Full Joke</DialogTitle>
                <DialogContent>
                    <Typography>{openJoke}</Typography>
                </DialogContent>
            </Dialog>
        </Box>
    );
}