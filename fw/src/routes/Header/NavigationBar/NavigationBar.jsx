import React from "react";
import "./navigation.css";
import {Tab, Tabs} from "@mui/material";
import {Link} from "react-router-dom";


export const NavigationBar = () => {
    const [selectedTab, setSelectedTab] = React.useState(0);

    const appPages = [
        {text: "Whisper!", url: "/"},
        {text: "FAQ", url: "faq"},
        {text: "User Account", url: "user-account"}
    ]

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };


    return (
        <>
            <Tabs value={selectedTab} onChange={handleTabChange} aria-label="nav tabs example" centered
                  className="navigation-tabs">
                {
                    appPages.map((appPage, index) =>
                        <Tab key={index}
                             label={appPage.text}
                             component={Link}
                             to={appPage.url}/>)
                }
            </Tabs>
        </>
    )
}