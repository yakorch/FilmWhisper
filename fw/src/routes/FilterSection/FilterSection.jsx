import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {Autocomplete, Container, Rating, Switch, TextField, Typography} from "@mui/material";
import {
    genresMap,
    getMoviesByActorNames,
    getTopRatedMovies,
    getTopRatedMoviesByGenresIntersection,
    getTopRatedMoviesByGenresUnion
} from "../../TMDBAPI";
import {useTheme} from "@mui/material/styles";
import {RecommendedMovies} from "./RecommendedMovies/RecommendedMovies";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const getAllPossibleGenres = () => {
    return Object.keys(genresMap);
}

const basicActors = ["Robert Downey Jr.", "Chris Hemsworth", "Scarlett Johansson", "Chris Evans", "Tom Hiddleston", "Ryan Reynolds", "Ryan Gosling"];


export function FilterSection() {
    const theme = useTheme();
    const [initialRender, setInitialRender] = useState(true);
    const MOVIES_PER_RESPONSE = 10;

    const allMovieGenres = getAllPossibleGenres();
    const [selectedGenres, setSelectedGenres] = useState([]);

    const [toIntersectGenres, setToIntersectGenres] = useState(true);

    const toggleGenresAction = () => {
        setToIntersectGenres(!toIntersectGenres);
    };


    const [movieRating, setMovieRating] = useState(7);

    const [selectedActors, setSelectedActors] = useState([]);

    const [recommendedMovies, setRecommendedMovies] = useState([]);

    const [isGenreFilterVisible, setIsGenreFilterVisible] = useState(true);

    const [isAccordionOpen, setIsAccordionOpen] = useState(true);

    const handleAccordionToggle = () => {
        setIsAccordionOpen(!isAccordionOpen);
    };

    const handleAccordionClose = () => {
        setIsAccordionOpen(false);
    };

    const handleAccordionOpen = () => {
        setIsAccordionOpen(true);
    };

    const toggleFilterVisible = () => {
        setIsGenreFilterVisible(!isGenreFilterVisible);
    }

    const prepareQueryFunction = () => {
        if (!isGenreFilterVisible) {
            return () => {
                return getMoviesByActorNames(selectedActors, MOVIES_PER_RESPONSE)
            };
        } else {
            const APIFunc = toIntersectGenres ? getTopRatedMoviesByGenresIntersection : getTopRatedMoviesByGenresUnion;
            return () => {
                return APIFunc(MOVIES_PER_RESPONSE, selectedGenres)
            };
        }
    }

    const executeQuery = (queryFunc) => {
        queryFunc().then((movies) => {
            const uniqueMovies = Array.from(new Set(movies.map(movie => movie.id)))
                .map(movieId => movies.find(movie => movie.id === movieId));

            setRecommendedMovies(uniqueMovies.filter((movie) => movie.vote_average >= movieRating)
                .sort((a, b) => b.vote_average - a.vote_average));
        });

    }

    const executeQueryButton = () => {
        handleAccordionClose();
        executeQuery(prepareQueryFunction());
    }

    useEffect(() => {
        // prevents double initial rendering due to route "/" of Root and this Component
        if (initialRender) {
            setInitialRender(false);
            return;
        }
        const abortController = new AbortController();
        const {signal} = abortController;

        executeQuery(() => getTopRatedMovies(MOVIES_PER_RESPONSE, signal));

        return () => {
            abortController.abort();
        }
    }, [initialRender]);

    useEffect(() => {
        handleAccordionOpen();
    }, [isGenreFilterVisible])


    return (<>

        <Container>

            <FormControlLabel sx={{marginTop: "3vh", marginBottom: "1vh"}}
                              control={<Switch checked={!isGenreFilterVisible} onChange={toggleFilterVisible}/>}
                              label="Genres / Actors filter"
            />


            <Accordion expanded={isAccordionOpen} onChange={handleAccordionToggle}
                       sx={{marginTop: '20px', boxShadow: '2px 2px 5px rgba(0,0,0,0.1)'}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{backgroundColor: '#f5f5f5'}}
                >
                    <Typography>Filters</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="h3">
                        What {isGenreFilterVisible ? "genres" : "actors"} do you prefer?


                    </Typography>


                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={toIntersectGenres}
                                onChange={toggleGenresAction}
                            />
                        }
                        label={toIntersectGenres ? "Intersection" : "U for Union!"}
                        sx={{visibility: isGenreFilterVisible ? "visible" : "hidden"}}


                    />

                    {
                        isGenreFilterVisible ?
                            <Autocomplete
                                multiple
                                id="genres-input"
                                options={allMovieGenres}
                                value={selectedGenres}
                                onChange={(event, newGenres) => {
                                    setSelectedGenres(newGenres);
                                }}
                                renderInput={(params) => (<TextField
                                    {...params}
                                    label="Genres"
                                    placeholder="Type or select genres"
                                />)}
                            />
                            :
                            <Autocomplete
                                multiple freeSolo
                                id="actors-input"
                                options={basicActors}
                                value={selectedActors}
                                onChange={(event, newActors) => {
                                    setSelectedActors(newActors);
                                }}
                                renderInput={(params) => (<TextField
                                    {...params}
                                    label="Actors"
                                    placeholder="Type or select actors"
                                />)}
                            />
                    }

                    <Typography variant="h4" sx={{marginTop: "5vh"}}>Minimum Movie rating</Typography>
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

                </AccordionDetails>
            </Accordion>

            <Button variant="contained" color="primary" onClick={executeQueryButton}
                    sx={{fontSize: '1.2rem', padding: '1rem 1rem', my: "2vh"}}>Find movies</Button>

            <RecommendedMovies movies={recommendedMovies}/>

        </Container>
    </>)
}