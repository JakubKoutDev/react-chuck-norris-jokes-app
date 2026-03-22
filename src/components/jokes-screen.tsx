import React, {useEffect, useState} from "react";
import type {JokeApiResponse} from "../interface/joke-api-response.interface.ts";
import {apiGetAvatar} from "../api/get-avatar.api.ts";
import {useOnlineStatus} from "../util/check-online-status.util.ts";
import {getJoke} from "../api/get-random-joke.api.ts";
import {Avatar, Box, Button, Card, IconButton} from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useFavoritesContext} from "../hooks/use-favorites-context.ts";

export default function JokesScreen() {
    const [joke, setJoke] = useState<JokeApiResponse | null>(null)
    const [isJokeIntervalRunning, setIsJokeIntervalRunning] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [favorites, setFavorites] = useState<JokeApiResponse[]>(() => {
        const stored = localStorage.getItem("favorites")
        return stored ? JSON.parse(stored) : []
    });

    useEffect(() => {
        if (!isJokeIntervalRunning) return;

        void fetchAndSetJoke();

        const id = setInterval(fetchAndSetJoke, 3000);

        return () => clearInterval(id);
    }, [isJokeIntervalRunning]);

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

    useEffect(() => {
        const stored = localStorage.getItem("favorites");
        if (stored) {
            setFavorites(JSON.parse(stored))
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const { toggleFavorite, isFavorite } = useFavoritesContext();

    const isOnline = useOnlineStatus()

    let jokeSectionContent;

    const handleJokeIntervalDisplayClick = () => {
        setIsJokeIntervalRunning(prev => !prev);
    };

    const fetchAndSetJoke = async () => {
        try {
            const data: JokeApiResponse = await getJoke();
            setJoke(data);

            console.log(data)
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
                {joke && <IconButton onClick={() => toggleFavorite(joke as JokeApiResponse)}>
                    {joke && isFavorite(joke.id) ? <FavoriteIcon></FavoriteIcon> : <FavoriteBorderIcon></FavoriteBorderIcon>}
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
                        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"} disabled={isJokeIntervalRunning} variant="contained"
                        onClick={handleGetRandomJokeClick}
                        color="primary">Show a joke...</Button>
                <Button style={{transition: "transform 0.2s"}}
                        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"} variant="contained" onClick={handleJokeIntervalDisplayClick}
                        color={isJokeIntervalRunning ? "error" : "primary"}>{isJokeIntervalRunning ? "⏹ Stop Chuck Mode" : "▶️ Start Chuck Mode"}</Button>
            </Box>
        </Box>
    );

}