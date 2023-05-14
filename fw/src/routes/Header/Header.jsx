import {NavigationBar} from "./NavigationBar/NavigationBar";
import React from "react";
import "./header.css";
import {Typography} from "@mui/material";

export function Header() {
    return (
        <header>
            <Typography variant="h1" className="header">
                Film Whisper
            </Typography>

            <NavigationBar/>
        </header>
    )
}