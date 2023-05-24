import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {TextField} from "@mui/material";
import {FormControlLabel} from "@mui/material";
import {Switch} from "@mui/material";
import MovieCard from '../FilterSection/RecommendedMovies/MovieCard';
import {GroupBar} from "./GroupBar";


export function UserAccount() {
    const user = {
        photo: 'userPhoto.png',
        firstName: 'Jim',
        lastName: 'Carrey',
        email: "jimcarrey@little.flowers.u",
        likedFilms: [
            // replace these dummy movies with the actual liked movies data
            {id: 1, title: 'Movie 1'},
            {id: 2, title: 'Movie 2'}
        ],
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
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                height: '100vh',
                padding: '20px',
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    display: 'flex',
                    padding: '3%',
                }}
            >
                <Avatar
                    alt={user.firstName + ' ' + user.lastName}
                    src={user.photo}
                    sx={{ width: 200, height: 200 }}
                />
            </Paper>

            <Box
                sx={{
                    marginLeft: '20px',
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: 2,
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
                        sx={{ marginBottom: '10px' }}
                    />

                    <TextField
                        label="Last Name"
                        variant="outlined"
                        value={user.lastName}
                        onChange={handleLastNameChange}
                        sx={{ marginBottom: '10px' }}
                    />

                    <TextField
                        label="Email"
                        variant="outlined"
                        value={user.email}
                        onChange={handleEmailChange}
                        sx={{ marginBottom: '10px' }}
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

                    <GroupBar />

                    {likedFilmsVisible && user.likedFilms.map(film => (
                        <MovieCard key={film.id} movie={film} />
                    ))}
                </Paper>
            </Box>
        </Box>
    );
}
