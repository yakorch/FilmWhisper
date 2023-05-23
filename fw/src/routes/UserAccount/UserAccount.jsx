import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import MovieCard from '../FilterSection/RecommendedMovies/MovieCard';

export function UserAccount() {
    const user = {
        photo: 'userPhoto.png',
        username: 'Jim Carrey',
        likedFilms: [
            // replace these dummy movies with the actual liked movies data
            {id: 1, title: 'Movie 1'},
            {id: 2, title: 'Movie 2'}
        ],
    };

    const [likedFilmsVisible, setLikedFilmsVisible] = useState(false);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={12} md={12}>
                    <Paper
                        elevation={3}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: 2,
                        }}
                    >
                        <Avatar
                            alt={user.username}
                            src={user.photo}
                            sx={{width: 200, height: 200}}
                        />
                        <Typography variant="h5" component="h2" gutterBottom>
                            {user.username}
                        </Typography>
                        <Button variant="contained" color="primary" sx={{
                            fontSize: '1.2rem',
                            padding: '1rem 1rem',
                            my: "2vh"
                        }} onClick={() => setLikedFilmsVisible(!likedFilmsVisible)}>
                            {likedFilmsVisible ? 'Hide' : 'Show'} Liked Films
                        </Button>
                        {likedFilmsVisible && user.likedFilms.map(film => (
                            <MovieCard key={film.id} movie={film}/>
                        ))}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
