import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { FormControlLabel, Switch, TextField } from "@mui/material";
import MovieCard from "../FilterSection/RecommendedMovies/MovieCard";
import { GroupBar } from "./GroupBar";
import getUserInfo from "../../utilities/getUserInfo";
import { useUserInfo } from "../Signing/UserInfoContext";

export function UserAccount() {
    const { userInfo, setUserInfo } = useUserInfo();
    // TODO: fetch info about user from the database

    const [favIDs, watchedIDs, toWatchIDs]  = [userInfo.favourites, userInfo.watched, userInfo.toWatch];

    const user = {
        photo: "userPhoto.png",
        firstName: userInfo.firstName || "Jim",
        lastName: userInfo.lastName || "Carrey",
        email: userInfo.email || "jimcarrey@little.flowers.u",

        likedFilms: [
            // TODO: fetch info about user from the database
        ],
        watchedFilms: [],
        toWatchFilms: [],
    };

    const [likedFilmsVisible, setLikedFilmsVisible] = useState(false);

    const handleFirstNameChange = (event) => {
        user.firstName = event.target.value;
    };

    const handleLastNameChange = (event) => {
        user.lastName = event.target.value;
    };

    const handleEmailChange = (event) => {
        user.email = event.target.value;
    };

    const handleAdPreferenceChange = (event) => {
        user.receiveAds = event.target.checked;
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
            <Paper
                elevation={3}
                sx={{
                    display: "flex",
                    padding: "3%"
                }}
            >
                <Avatar
                    alt={user.firstName + " " + user.lastName}
                    src={user.photo}
                    sx={{ width: 200, height: 200 }}
                />
            </Paper>

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

                    <TextField
                        label="First Name"
                        variant="outlined"
                        value={user.firstName}
                        onChange={handleFirstNameChange}
                        sx={{ marginBottom: "10px" }}
                    />

                    <TextField
                        label="Last Name"
                        variant="outlined"
                        value={user.lastName}
                        onChange={handleLastNameChange}
                        sx={{ marginBottom: "10px" }}
                    />

                    <TextField
                        label="Email"
                        variant="outlined"
                        value={user.email}
                        onChange={handleEmailChange}
                        sx={{ marginBottom: "10px" }}
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={user.receiveAds}
                                onChange={handleAdPreferenceChange}
                            />
                        }
                        label="Receive Ads"
                    />

                    <GroupBar user={user}/>

                    {likedFilmsVisible && user.likedFilms.map(film => (
                        <MovieCard key={film.id} movie={film} />
                    ))}
                </Paper>
            </Box>
        </Box>
    );
}
