import {Box, Paper, Typography} from "@mui/material";
import MovieCard from "./MovieBlock";
import React from "react";


export function RecommendedMovies({movies}) {
    return (
        <Paper elevation={0} sx={{m: '5vh', p: '2vh'}}>
            <Typography variant="h2" sx={{my: '2vh', pb: '2vh'}}>
                Our recommendations
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-evenly',
                    alignItems: 'flex-start',
                    '@media (max-width: 600px)': {
                        flexDirection: 'column',
                        alignItems: 'center',
                    },
                }}
            >
                {movies.map((movie, index) => (
                    <MovieCard key={index} movie={movie}/>
                ))}
            </Box>
        </Paper>
    );
}
