import {NavigationBar} from "./NavigationBar/NavigationBar";
import React from "react";
import "./header.css";
import {Typography} from "@mui/material";

export function Header() {
    return (
        <header>
            <Typography variant="h3" className="website_logo"
                        style={{fontSize: '2.5rem', letterSpacing: '0.2em'}}>
                Film Whisper
            </Typography>

            <NavigationBar/>
        </header>
    )
}