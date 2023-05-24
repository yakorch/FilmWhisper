import React from "react";
import "./GroupBar.css";
import { Tab, Tabs } from "@mui/material";
import { Link } from "react-router-dom";

export const GroupBar = () => {
    const [selectedTab, setSelectedTab] = React.useState(0);

    const groups = [
        { text: "My favs", name: "favs" },
        { text: "Watch Later", name: "watch_later" },
        { text: "Already Watched", name: "already_watched" },
    ];

    const handleTabChange = (_event, newValue) => {
        setSelectedTab(newValue);
        // TODO: Spawn film cards...
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
        </>
    );
};
