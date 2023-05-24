import {React, useState} from "react";
import "./GroupBar.css";
import { Tab, Tabs } from "@mui/material";
import { Link } from "react-router-dom";
import { RecommendedMovies } from "../FilterSection/RecommendedMovies/RecommendedMovies";

export const GroupBar = ({user}) => {
    const [selectedTab, setSelectedTab] = useState(0);

    const [moviesToShow, setMoviesToShow]= useState([]);


    const groups = [
        { text: "My favs", name: "favs" },
        { text: "Watch Later", name: "watch_later" },
        { text: "Already Watched", name: "already_watched" }
    ];

    const whatToShow = [
        user.favourites,
        user.to_watch,
        user.watched,
    ]

    const handleTabChange = (_event, newValue) => {
        setSelectedTab(newValue);
        setMoviesToShow(whatToShow[newValue]);
    };

    return (
        <>
            <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                aria-label="nav tabs example"
                centered
                className="group-bar-tabs"
            >
                {groups.map((statGroup, index) => (
                    <Tab
                        key={index}
                        label={statGroup.text}
                        component={Link}
                        className="group-bar-tab"
                    />
                ))}
            </Tabs>

            <RecommendedMovies movies={moviesToShow}></RecommendedMovies>
        </>
    );
};
