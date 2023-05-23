import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {Autocomplete, Container, Rating, Switch, TextField, Typography} from "@mui/material";
import {genresMap, getTopRatedMovies, MovieQueryBuilder} from "../../TMDBAPI";
import {useTheme} from "@mui/material/styles";
import {RecommendedMovies} from "./RecommendedMovies/RecommendedMovies";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from "@mui/material/Box";


//TODO: make the links changed when the filter is changed for better UX


//TODO: Accordion moves for some reason when the filter is opened/closed


const getAllPossibleGenres = () => {
    return Object.keys(genresMap);
}
const allMovieGenres = getAllPossibleGenres();

const basicActors = ["Robert Downey Jr.", "Chris Hemsworth", "Scarlett Johansson", "Chris Evans", "Tom Hiddleston", "Ryan Reynolds", "Ryan Gosling"];

// TODO: pagination
const MOVIES_PER_PAGE = 10;
const MOVIES_PER_QUERY = 100;

export function FilterSection() {
    const theme = useTheme();
    const [initialRender, setInitialRender] = useState(true);

    const [selectedGenres, setSelectedGenres] = useState([]);

    const [toIntersectGenres, setToIntersectGenres] = useState(true);

    const toggleGenresAction = () => {
        setToIntersectGenres((oldValue) => !oldValue);
    };

    const [movieRating, setMovieRating] = useState(7);

    const [selectedActors, setSelectedActors] = useState([]);

    const [recommendedMovies, setRecommendedMovies] = useState([]);

    const [isGenreFilterVisible, setIsGenreFilterVisible] = useState(true);

    const [isAccordionOpen, setIsAccordionOpen] = useState(true);

    let abortController = null;
    const abortLastRequest = () => {
        if (abortController) abortController.abort();
    };
    const createAbortController = () => {
        abortController = new AbortController();
    };

    const handleAccordionToggle = () => {
        setIsAccordionOpen((oldValue) => !oldValue);
    };

    const handleAccordionClose = () => {
        setIsAccordionOpen(false);
    };

    const handleAccordionOpen = () => {
        setIsAccordionOpen(true);
    };

    const toggleFilterVisible = () => {
        setIsGenreFilterVisible((oldValue) => !oldValue);
    }

    const prepareQueryFunction = (signal = {}) => {
        const queryBuilder = new MovieQueryBuilder()
            .minMovieRating(movieRating)
            .numberTopRatedMovies(MOVIES_PER_PAGE)
            .useJoiner(toIntersectGenres ? ',' : '|')
            .withActors(selectedActors)
            .byGenres(selectedGenres)
        ;
        return () => queryBuilder.fetch(signal);
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

        abortLastRequest();
        createAbortController();
        const {signal} = abortController;

        executeQuery(prepareQueryFunction(signal));
    }


    useEffect(() => {
        // prevents double initial rendering due to route "/" of Root and this Component
        if (initialRender) {
            setInitialRender(false);
            return;
        }

        createAbortController();
        const {signal} = abortController;

        executeQuery(() => getTopRatedMovies(MOVIES_PER_PAGE, signal));

        return () => {
            abortLastRequest();
        }
    }, [initialRender]);

    useEffect(() => {
        handleAccordionOpen();
    }, [isGenreFilterVisible]);

    // TODO: separate by components, props connection
    return (<>

        <Container>

            <FormControlLabel sx={{marginTop: "3vh", marginBottom: "1vh"}}
                              control={<Switch checked={!isGenreFilterVisible} onChange={toggleFilterVisible}/>}
                              label="Genres / Actors filter"
            />

            {/*sx={{marginTop: '20px', boxShadow: '2px 2px 5px rgba(0,0,0,0.1)'}}*/}
            <Accordion expanded={isAccordionOpen} onChange={handleAccordionToggle}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{backgroundColor: '#f5f5f5'}}>
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

                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: "5vh"}}>
                        <Typography variant="h4">Minimum Movie rating</Typography>
                        <Box sx={{display: 'flex', alignItems: 'center', mt: 1}}>
                            <Rating
                                name="customized-10"
                                defaultValue={7}
                                max={10}
                                value={movieRating}
                                precision={0.25}
                                sx={{
                                    "& .MuiRating-iconFilled": {
                                        color: theme.palette.primary.main,
                                    },
                                    mx: 2, // Adding some horizontal margin
                                }}
                                onChange={(event, newValue) => {
                                    setMovieRating(newValue);
                                }}
                            />
                            <Typography variant="subtitle"><strong>{movieRating}</strong></Typography>
                        </Box>
                    </Box>


                </AccordionDetails>
            </Accordion>

            <Button variant="contained" color="primary" onClick={executeQueryButton}
                    sx={{fontSize: '1.2rem', padding: '1rem 1rem', my: "2vh"}}>Find movies</Button>

            <RecommendedMovies movies={recommendedMovies}/>

        </Container>
    </>)
}