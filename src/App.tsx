// import React from "react";
import "./styles.css";
import {useState} from "react";
import {Button} from "@mui/material";
import React from "react";

export const apiUrl = "https://api.chucknorris.io/jokes/random"

export default function App() {
    const [joke, setJoke] = useState({
        value: undefined
    })
    const [jokesDisplay, toggleJokesDisplay] = useState(false)

    const setIntervalHandler = () => {
        setInterval(() => {
            console.log("dddddd")
            toggleJokesDisplay(!jokesDisplay)
        }, 3000)
    }
    const getJoke = () => {
        fetch(apiUrl)
            .then(r => r.json())
            .then(data => {
                setJoke(data);
            });
    };
    return (
        <div className="App">
            <h1>&lt;DAT /&gt;</h1>
            <h2>-----------</h2>
            <Button variant="contained" onClick={getJoke} color="primary">Show a joke...</Button>
            <Button variant="contained" onClick={setIntervalHandler} color="primary">Show a joke...</Button>
            {joke.value && <p>{joke.value}</p>}
        </div>
    );
}
