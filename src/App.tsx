import "./styles.css";
import {useEffect, useRef, useState} from "react";
import {Button} from "@mui/material";
import React from "react";
import {useOnlineStatus} from "./util/check-online-status.util.ts";
import {getJoke} from "./api/get-random-joke.api.ts";
import type {JokeApiResponse} from "./interface/joke-api-response.interface.ts";


export default function App() {
    const [joke, setJoke] = useState<JokeApiResponse | null>(null)
    const [isJokeIntervalRunning, setIsJokeIntervalRunning] = useState(false);

    useEffect(() => {
        if (!isJokeIntervalRunning) return;

        void fetchAndSetJoke();

        const id = setInterval(fetchAndSetJoke, 3000);

        return () => clearInterval(id);
    }, [isJokeIntervalRunning]);

    const isOnline = useOnlineStatus()

    let jokeSectionContent;

    const handleJokeIntervalDisplayClick = () => {
        setIsJokeIntervalRunning(prev => !prev);
    };

    const fetchAndSetJoke = async () => {
        try {
            const data = await getJoke();
            setJoke(data);
        } catch (e) {
            console.error(e);
        }
    };

    const handleGetRandomJokeClick = async () => {
        await fetchAndSetJoke()
    }

    if (!isOnline) {
        jokeSectionContent = <p>No connection</p>;
    } else if (!joke) {
        jokeSectionContent = <p>No joke yet...</p>;
    } else {
        jokeSectionContent = <p>{joke.value}</p>;
    }

    return (
        <div className="App">
            <Button variant="contained" onClick={handleGetRandomJokeClick} color="primary">Show a joke...</Button>
            <Button variant="contained" onClick={handleJokeIntervalDisplayClick} color="primary">Get jokes...</Button>
            {jokeSectionContent}
        </div>
    );
}


