import React, {useState} from "react";
import Button from "@mui/material/Button";
import {Autocomplete, Container, Paper, Rating, Switch, TextField, Typography} from "@mui/material";
import {MultipleOptionsList} from "./ChipsList/MultipleOptionsList";
import {
    genresMap,
    getMoviesByActorNames,
    getTopRatedMoviesByGenresIntersection,
    getTopRatedMoviesByGenresUnion
} from "../../TMDBAPI";
import {useTheme} from "@mui/material/styles";
import {RecommendedMovies} from "./RecommendedMovies/RecommendedMovies";
import FormControlLabel from "@mui/material/FormControlLabel";

const getAllPossibleGenres = () => {
    return Object.keys(genresMap);
}

const basicActors = ["Robert Downey Jr.", "Chris Hemsworth", "Scarlett Johansson", "Chris Evans", "Tom Hiddleston", "Ryan Reynolds", "Ryan Gosling"];


export function FilterSection() {
    const theme = useTheme();

    const movieGenres = getAllPossibleGenres();
    const [selectedGenres, setSelectedGenres] = useState(movieGenres.map(() => false));
    const MOVIES_PER_RESPONSE = 10;
    const toggleOptionState = (index, optionsSelected, optionsSetter) => {
        let modifiedStates = [...optionsSelected];
        modifiedStates[index] = !modifiedStates[index];
        optionsSetter(modifiedStates);
    }
    const toggleGenreState = (index) => {
        toggleOptionState(index, selectedGenres, setSelectedGenres);
    }

    const [toIntersectGenres, setToIntersectGenres] = useState(true);

    const toggleGenresAction = () => {
        setToIntersectGenres(!toIntersectGenres);
    };


    const [movieRating, setMovieRating] = useState(7);

    const [actors, setActors] = useState([]);

    const [recommendedMovies, setRecommendedMovies] = useState([]);


    const readFilters = () => {
        return {
            genres: movieGenres.filter((genre, index) => selectedGenres[index] === true),
            minMovieRating: movieRating,
            actors: actors
        };
    }
    const prepareQueryFunction = (filters) => {
        if (filters.actors.length > 0){
            return () => {
                return getMoviesByActorNames(filters.actors, MOVIES_PER_RESPONSE)
            };
        }
        else {
            const APIFunc = toIntersectGenres ? getTopRatedMoviesByGenresIntersection : getTopRatedMoviesByGenresUnion;
            return () => {
                return APIFunc(MOVIES_PER_RESPONSE, filters.genres)
            };
        }
    }

    const executeQuery = () => {
        const filters = readFilters();
        const executionQueryFunction = prepareQueryFunction(filters);

        executionQueryFunction().then((movies) => {
            setRecommendedMovies(movies.filter((movie) => (movie.vote_average >= filters.minMovieRating)));
        });
    }


    return (<>
        <Container>

            <Paper elevation={15} sx={{m: "3vh", p: "2vh"}}>
                <Typography variant="h3" sx={{py: "2vh"}}>What genres do you prefer?</Typography>
                <MultipleOptionsList changeOptionState={toggleGenreState} options={movieGenres}/>
            </Paper>

            <FormControlLabel control={<Switch checked={toIntersectGenres} onChange={toggleGenresAction}/>}
                              label={toIntersectGenres ? "Intersection" : "U for Union!"}/>

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
                    renderInput={(params) => (<TextField
                        {...params}
                        label="Actors"
                        placeholder="Type or select actors"
                    />)}
                />
            </Paper>

            <Button variant="contained" color="primary" onClick={executeQuery}
                    sx={{fontSize: '1.2rem', padding: '1rem 1rem'}}>Find movies</Button>


            <RecommendedMovies movies={recommendedMovies}/>

        </Container>


    </>)
}