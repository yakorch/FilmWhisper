import Box from "@mui/material/Box";
import {Rating, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import {useTheme} from "@mui/material/styles";

const outerBoxStyle = {
    display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: "2vh"
};

const innerBoxStyle = {display: 'flex', alignItems: 'center', mt: 1};

const buttonStyle = {fontSize: '1.2rem', padding: '1rem 1rem', my: "2vh"};

export function MovieRatingChoice({movieRating, setMovieRating, executeQueryButton}) {
    const theme = useTheme();
    return (
        <>
            <Box sx={outerBoxStyle}>
                <Typography variant="h5">Minimum Movie rating</Typography>
                <Box sx={innerBoxStyle}>
                    <Rating
                        name="customized-10"
                        defaultValue={7}
                        max={10}
                        value={movieRating}
                        precision={0.5}
                        sx={{
                            "& .MuiRating-iconFilled": {
                                color: theme.palette.primary.main,
                            },
                            mx: 2,
                        }}
                        onChange={(event, newValue) => {
                            setMovieRating(newValue);
                        }}
                    />
                    <Typography variant="subtitle"><strong>{movieRating}</strong></Typography>
                </Box>
            </Box>

            <Button variant="contained" color="primary" onClick={executeQueryButton}
                    sx={buttonStyle}>Find movies</Button>
        </>
    )
}