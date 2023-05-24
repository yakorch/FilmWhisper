import { Alert, Box, Paper, Typography } from "@mui/material";
import MovieCard from "./MovieCard";
import React from "react";

const boxStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    "@media (max-width: 600px)": {
        flexDirection: "column",
        alignItems: "center"
    }
};

export function RecommendedMovies({ movies }) {
    return (
        <Paper elevation={0} sx={{ m: "5vh", p: "2vh" }}>
            {movies.length === 0 ? (
                <Alert sx={{ mx: "25vh" }} severity="error">
                    No movies were found!
                </Alert>
            ) : (
                <>
                    <Typography variant="h2" sx={{ my: "2vh", pb: "2vh" }}>
                        Our recommendations
                    </Typography>

                    <Box sx={boxStyle}>
                        {movies.map((movie, index) => (
                            <MovieCard key={index} movie={movie} />
                        ))}
                    </Box>
                </>
            )}
        </Paper>
    );
}
