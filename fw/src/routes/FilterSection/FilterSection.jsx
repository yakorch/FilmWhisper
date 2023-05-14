import React, {useState} from "react";
import Button from "@mui/material/Button";
import {Autocomplete, Box, Container, Paper, Rating, TextField, Typography} from "@mui/material";
import {MultipleOptionsList} from "./MultipleOptionsList";
import {genresMap, getTopRatedMoviesByGenresHardcoded} from "../../TMDBAPI";
import {useTheme} from "@mui/material/styles";

const getAllPossibleGenres = () => {
    return Object.keys(genresMap);
}

const basicActors =
    [
        "Robert Downey Jr.",
        "Chris Hemsworth",
        "Scarlett Johansson",
        "Chris Evans",
        "Tom Hiddleston",
        "Ryan Reynolds",
        "Ryan Gosling"
    ];


export function FilterSection() {
    const theme = useTheme();

    const movieGenres = getAllPossibleGenres();
    const [selectedGenres, setSelectedGenres] = useState(movieGenres.map(() => false));


    const [movieRating, setMovieRating] = useState(7);

    const [actors, setActors] = useState([]);

    const [recommendedMovies, setRecommendedMovies] = useState([]);

    const toggleOptionState = (index, optionsSelected, optionsSetter) => {
        let modifiedStates = [...optionsSelected];
        modifiedStates[index] = !modifiedStates[index];
        optionsSetter(modifiedStates);
    }

    const toggleGenreState = (index) => {
        toggleOptionState(index, selectedGenres, setSelectedGenres);
    }

    const createQuery = () => {
        const filters = {
            "genres": movieGenres.filter((genre, index) => selectedGenres[index] === true),
            "minMovieRating": movieRating,
            "actors": actors
        }
        console.log(filters);

        const promisedMovies = getTopRatedMoviesByGenresHardcoded(filters.genres);
    }

    return (<>
        <Container>

            <Paper elevation={15} sx={{m: "3vh", p: "2vh"}}>
                <Typography variant="h3" sx={{py: "2vh"}}>What genres do you prefer?</Typography>
                <MultipleOptionsList changeOptionState={toggleGenreState} options={movieGenres}/>
            </Paper>

            <Paper elevation={15} sx={{m: "3vh", p: "1vh"}}>
                <Typography variant="h3">Minimum Movie rating</Typography>
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
                    }}
                    onChange={(event, newValue) => {
                        setMovieRating(newValue);
                    }}
                />
            </Paper>

            <Paper elevation={15} sx={{m: "3vh", p: "2vh"}}>
                <Typography variant="h3" sx={{pb: "2vh"}}>
                    Select Actors
                </Typography>
                <Autocomplete
                    multiple freeSolo
                    id="actors-input"
                    options={basicActors}
                    value={actors}
                    onChange={(event, newActors) => {
                        setActors(newActors);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Actors"
                            placeholder="Type or select actors"
                        />
                    )}
                />
            </Paper>

            <Button variant="contained" color="primary" onClick={createQuery}
                    sx={{fontSize: '1.2rem', padding: '1rem 1rem'}}>Find movies</Button>


            <Paper elevation={20} sx={{m: "5vh", p: "2vh"}}>
                <Typography variant="h2" sx={{my: "2vh", pb: "2vh"}}>
                    Our recommendations
                </Typography>
                <Box>
                    {
                        recommendedMovies.map((movie, index) => {
                            <span>{movie}</span>
                        })
                    }
                </Box>
            </Paper>


        </Container>


    </>)
}