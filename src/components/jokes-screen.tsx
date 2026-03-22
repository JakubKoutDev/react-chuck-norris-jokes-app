import React, {useCallback, useEffect, useState} from "react";
import type {JokeApiResponse} from "../interface/joke-api-response.interface.ts";
import {apiGetAvatar} from "../api/get-avatar.api.ts";
import {useOnlineStatus} from "../util/check-online-status.util.ts";
import {getJoke} from "../api/get-random-joke.api.ts";
import {Avatar, Box, Button, Card, IconButton} from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useFavoritesContext} from "../hooks/use-favorites-context.ts";
import { Snackbar, Alert } from "@mui/material";
export default function JokesScreen() {
    const [joke, setJoke] = useState<JokeApiResponse | null>(null)
    const [isJokeIntervalRunning, setIsJokeIntervalRunning] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const { toggleFavorite, isFavorite } = useFavoritesContext();
    const toggleFavoriteHandler = useCallback(() => {
        if (!joke) return;
        toggleFavorite(joke, () => setSnackbarOpen(true));
    }, [joke, toggleFavorite]);

    useEffect(() => {
        if (!isJokeIntervalRunning) return;

        void fetchAndSetJoke();

        const id = setInterval(fetchAndSetJoke, 3000);

        return () => clearInterval(id);
    }, [isJokeIntervalRunning]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

            const key = e.key.toLowerCase();

            if (key === 'j' && !isJokeIntervalRunning) {
                void handleGetRandomJokeClick();
            } else if (key === 'c') {
                handleJokeIntervalDisplayClick();
            } else if (key === 'f') {
                toggleFavoriteHandler();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [toggleFavoriteHandler, isJokeIntervalRunning]);

    useEffect(() => {
        const fetchAvatar = async () => {
            try {
                const url = await apiGetAvatar();
                setAvatarUrl(url);
            } catch (e) {
                console.error("Failed to fetch avatar", e);
            }
        };
        void fetchAvatar();
    }, []);


    const isOnline = useOnlineStatus()

    let jokeSectionContent;

    const handleJokeIntervalDisplayClick = () => {
        setIsJokeIntervalRunning(prev => !prev);
    };

    const fetchAndSetJoke = async () => {
        try {
            const data: JokeApiResponse = await getJoke();
            setJoke(data);
        } catch (e) {
            console.error(e);
        }
    };

    const handleGetRandomJokeClick = async () => {
        await fetchAndSetJoke()
    }


    if (!isOnline) {
        jokeSectionContent = <span>No internet connection!</span>;
    } else if (!joke) {
        jokeSectionContent = <span>No joke yet. Press the button...</span>;
    } else {
        jokeSectionContent = <span>{joke.value}</span>;
    }

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "40vw",
            gap: 6,
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            margin: "0 auto"
        }}>
            <Box sx={{display: "flex", gap: "10px", alignItems: "center", justifyContent: "start"}}>
                <div style={{fontSize: "40px"}}><Avatar src={avatarUrl ? avatarUrl : ""} alt="Chuck Norris"/></div>
                <Card sx={{borderRadius: "16px 0 16px 0", padding: 2}}>
                    {jokeSectionContent}
                </Card>
                {joke && <IconButton onClick={toggleFavoriteHandler}>
                    {joke && isFavorite(joke.id) ? <FavoriteIcon></FavoriteIcon> : <FavoriteBorderIcon></FavoriteBorderIcon>}
                    <span style={{fontSize: '0.7rem', marginLeft: 2}}>(F)</span>

                </IconButton>
                }                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 20,
                        width: 0,
                        height: 0,
                        borderLeft: "10px solid transparent",
                        borderRight: "10px solid transparent",
                        borderTop: "10px solid #fff",
                    }}
                />
            </Box>
            <Box sx={{display: "flex", flexDirection: "row", gap: 8}}>
                <Button style={{transition: "transform 0.2s"}}
                        title="Press J to show a random joke"
                        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"} disabled={isJokeIntervalRunning} variant="contained"
                        onClick={handleGetRandomJokeClick}
                        color="primary">Show a joke... (J)</Button>
                <Button style={{transition: "transform 0.2s"}}
                        title="Press C for Chuck Mode"
                        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"} variant="contained" onClick={handleJokeIntervalDisplayClick}
                        color={isJokeIntervalRunning ? "error" : "primary"}>{isJokeIntervalRunning ? "⏹ Stop Chuck Mode (C)" : "▶️ Start Chuck Mode (C)"}</Button>
            </Box>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert severity="info" onClose={() => setSnackbarOpen(false)}>
                    Maximum reached. Oldest joke was replaced.
                </Alert>
            </Snackbar>
        </Box>

    );

}