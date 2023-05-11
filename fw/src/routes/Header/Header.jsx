import {NavigationBar} from "./NavigationBar/NavigationBar";
import React from "react";
import "./header.css";

export function Header() {
    return (
        <header>
            <h1 className="header">
                Film Whisper</h1>
            <NavigationBar/>
        </header>
    )
}