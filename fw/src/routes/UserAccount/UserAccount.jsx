import React, {useEffect, useState} from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {FormControlLabel, LinearProgress, Switch, TextField} from "@mui/material";
import MovieCard from "../FilterSection/RecommendedMovies/MovieCard";
import { GroupBar } from "./GroupBar";
import { useUserID } from "../Signing/UserContext";
import getUserInfo from "../../utilities/getUserInfo";
import {useSearchParams} from "react-router-dom";
import {MovieQueryBuilder} from "../../TMDBAPI";

export function UserAccount() {
    const { userID, setUserID } = useUserID();
    const [ userInfo, setUserInfo ] = useState({});
    const [ isFetching, setIsFetching ] = useState(false);
    const [ initialRender, setInitialRender ] = useState(true);
    const [likedFilmsVisible, setLikedFilmsVisible] = useState(false);
    const [toWatchVisible, setToWatchVisible] = useState(false);
    const [alreadyWatchedVisible, setAlreadyWatchedVisible] = useState(false);


    const executeQuery = () => {
        setIsFetching(true);
        getUserInfo(userID).then((newInfo) => {
            setUserInfo(newInfo[1][0]);
            setIsFetching(false);
        });};

    useEffect(() => {
        // prevents double initial rendering due to route "/" of Root and this Component
        if (initialRender) {
            setInitialRender(false);
            return;
        }
        executeQuery();

    }, [initialRender]);

    const [favIDs, watchedIDs, toWatchIDs]  = [userInfo.favourites, userInfo.watched, userInfo.toWatch];

    const handleFirstNameChange = (event) => {
        userInfo.firstName = event.target.value;
    };

    const handleLastNameChange = (event) => {
        userInfo.lastName = event.target.value;
    };

    const handleEmailChange = (event) => {
        userInfo.email = event.target.value;
    };

    const handleAdPreferenceChange = (event) => {
        userInfo.receiveAds = event.target.checked;
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "center",
                height: "100vh",
                padding: "20px"
            }}
        >

            <Box
                sx={{
                    marginLeft: "20px"
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        padding: 2
                    }}
                >
                    <Typography variant="h5" component="h2" gutterBottom>
                        User Profile
                    </Typography>
                    {isFetching ? <LinearProgress sx={{my: "20vh"}}/> :
                        <><TextField
                            label="First Name"
                            variant="outlined"
                            value={userInfo.firstName}
                            onChange={handleFirstNameChange}
                            sx={{marginBottom: "10px"}}
                        />
                        <TextField
                        label="Last Name"
                        variant="outlined"
                        value={userInfo.lastName}
                        onChange={handleLastNameChange}
                        sx={{marginBottom: "10px"}}
                        />

                        <TextField
                        label="Email"
                        variant="outlined"
                        value={userInfo.email}
                        onChange={handleEmailChange}
                        sx={{marginBottom: "10px"}}
                        />

                        <FormControlLabel
                        control={
                        <Switch
                        checked={userInfo.notifConsent}
                        onChange={handleAdPreferenceChange}
                        />
                    }
                        label="Receive Ads"
                        />

                        <GroupBar user={userInfo}/>

                            {likedFilmsVisible && userInfo.favourites.map(film => (
                                <MovieCard key={film.id} movie={film} />
                                ))}
                            {alreadyWatchedVisible && userInfo.watched.map(film => (
                                <MovieCard key={film.id} movie={film} />
                            ))}
                            {toWatchVisible && userInfo.to_watch.map(film => (
                                <MovieCard key={film.id} movie={film} />
                            ))}
                        </>
                    }
                </Paper>
            </Box>
        </Box>
    );
}
