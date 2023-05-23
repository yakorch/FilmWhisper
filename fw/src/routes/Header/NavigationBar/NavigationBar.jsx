import React, {useEffect, useContext} from "react";
import "./navigation.css";
import {Tab, Tabs} from "@mui/material";
import {Link, useLocation} from "react-router-dom";
import { AuthContext } from '../../Signing/AuthContext';

export const NavigationBar = () => {
    const location = useLocation();
    const [selectedTab, setSelectedTab] = React.useState(0);
    const { isAuthenticated } = useContext(AuthContext);

    const appPages = isAuthenticated
        ? [
            {text: "Whisper!", url: "/"},
            {text: "FAQ", url: "/faq"},
            {text: "User Account", url: "/user-account"},
            {text: "Log Out", url: "/logout"},
        ]
        : [
            {text: "Whisper!", url: "/"},
            {text: "FAQ", url: "/faq"},
            {text: "Sign In", url: "/sign-in"},
            {text: "Sign Up", url: "/sign-up"},
        ];

    useEffect(() => {
        const selectedPageIndex = appPages.findIndex(appPage => appPage.url === location.pathname);
        setSelectedTab(selectedPageIndex > -1 ? selectedPageIndex : 0);
    }, [location]);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <>
            <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                aria-label="nav tabs example"
                centered
                className="navigation-tabs"
            >
                {appPages.map((appPage, index) => (
                    <Tab
                        key={index}
                        label={appPage.text}
                        component={Link}
                        to={appPage.url}
                    />
                ))}
            </Tabs>
        </>
    );
};
