import React, {useCallback, useEffect, useState} from "react";
import type {JokeApiResponse} from "../interface/joke-api-response.interface.ts";
import {apiGetAvatar} from "../api/get-avatar.api.ts";
import {useOnlineStatus} from "../util/check-online-status.util.ts";
import {getJoke} from "../api/get-random-joke.api.ts";
import {Avatar, Box, Button, Card, IconButton} from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useFavoritesContext} from "../hooks/use-favorites-context.ts";
import {InfoSnackbar} from "./info-snackbar.tsx";

export default function JokesScreen() {
    const [joke, setJoke] = useState<JokeApiResponse | null>(null)
    const [isJokeIntervalRunning, setIsJokeIntervalRunning] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const {toggleFavorite, isFavorite} = useFavoritesContext();


    useEffect(() => {
        if (!isJokeIntervalRunning) return;

        const fetch = async () => {
            try {
                const data = await getJoke();
                setJoke(data);
            } catch (e) {
                console.error(e);
            }
        };

        void fetch();
        const id = setInterval(fetch, 3000);

        return () => clearInterval(id);
    }, [isJokeIntervalRunning]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement;
            if (["INPUT", "TEXTAREA"].includes(target.tagName)) return;

            switch (e.key.toLowerCase()) {
                case "j":
                    if (!isJokeIntervalRunning) {
                        getJoke().then(setJoke).catch(console.error);
                    }
                    break;
                case "c":
                    setIsJokeIntervalRunning(prev => !prev);
                    break;
                case "f":
                    if (joke) {
                        toggleFavorite(joke, () => setSnackbarOpen(true));
                    }
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isJokeIntervalRunning, joke, toggleFavorite]);

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

    const fetchAndSetJoke = async () => {
        try {
            const data = await getJoke();
            setJoke(data);
        } catch (e) {
            console.error(e);
        }
    };

    const toggleFavoriteHandler = useCallback(() => {
        if (!joke) return;
        toggleFavorite(joke, () => setSnackbarOpen(true));
    }, [joke, toggleFavorite]);


    const handleGetRandomJokeClick = async () => {
        await fetchAndSetJoke();
    }

    const handleJokeIntervalDisplayClick = () => {
        setIsJokeIntervalRunning(prev => !prev);
    }

    const hoverStyle = {
        transition: "transform 0.2s",
        "&:hover": {transform: "scale(1.05)"},
    };

    const renderJokeSection = () => {
        if (!isOnline) return <span>No internet connection!</span>;
        if (!joke) return <span>No joke yet. Press the button...</span>;
        return <span>{joke.value}</span>;
    };

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
                <Avatar src={avatarUrl || ""} alt="Chuck Norris" sx={{fontSize: 40}}/>
                <Card sx={{borderRadius: "16px 0 16px 0", padding: 2}}>
                    {renderJokeSection()}
                </Card>
                {joke && (
                    <IconButton onClick={toggleFavoriteHandler}>
                        {isFavorite(joke.id) ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
                        <span style={{fontSize: "0.7rem", marginLeft: 2}}>(F)</span>
                    </IconButton>
                )}
                <div
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
                <Button sx={hoverStyle} variant="contained" disabled={isJokeIntervalRunning} onClick={handleGetRandomJokeClick} color="primary">
                    Show a joke... (J)
                </Button>
                <Button sx={hoverStyle} variant="contained" onClick={handleJokeIntervalDisplayClick}
                        color={isJokeIntervalRunning ? "error" : "primary"}>
                    {isJokeIntervalRunning ? "⏹ Stop Chuck Mode (C)" : "▶️ Start Chuck Mode (C)"}
                </Button>
            </Box>
            <InfoSnackbar open={snackbarOpen} onClose={() => setSnackbarOpen(false)}></InfoSnackbar> </Box>

    );

}