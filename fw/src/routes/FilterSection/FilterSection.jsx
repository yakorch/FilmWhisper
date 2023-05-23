import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {
    Autocomplete,
    Container,
    LinearProgress,
    Pagination,
    Rating,
    Switch,
    TextField,
    Typography
} from "@mui/material";
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

    const [toIntersectOptions, setToIntersectOptions] = useState(true);

    const toggleGenresAction = () => {
        setToIntersectOptions((oldValue) => !oldValue);
    };

    const [movieRating, setMovieRating] = useState(7);

    const [selectedActors, setSelectedActors] = useState([]);

    const [recommendedMovies, setRecommendedMovies] = useState([]);

    const [isGenreFilterVisible, setIsGenreFilterVisible] = useState(true);

    const [isAccordionOpen, setIsAccordionOpen] = useState(false);

    const [isFetching, setIsFetching] = useState(false);

    const [allFetchedMovies, setAllFetchedMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);


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
            .numberTopRatedMovies(MOVIES_PER_QUERY)
            .useJoiner(toIntersectOptions ? ',' : '|')
            .withActors(selectedActors)
            .byGenres(selectedGenres);

        return () => queryBuilder.fetch(signal);
    }

    const executeQuery = (queryFunc) => {
        setIsFetching(true);
        queryFunc().then((movies) => {
            setAllFetchedMovies(movies);
            setRecommendedMovies(movies.slice(0, MOVIES_PER_PAGE));
            setTotalPages(Math.ceil(movies.length / MOVIES_PER_PAGE));
            setIsFetching(false);
        });
    }

    const executeQueryButton = () => {
        handleAccordionClose();

        abortLastRequest();
        createAbortController();
        const {signal} = abortController;

        executeQuery(prepareQueryFunction(signal));
    }

    const handlePageChange = (event, value) => {
        setPage(value);
        const start = (value - 1) * MOVIES_PER_PAGE;
        const end = start + MOVIES_PER_PAGE;
        setRecommendedMovies(allFetchedMovies.slice(start, end));
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        // prevents double initial rendering due to route "/" of Root and this Component
        if (initialRender) {
            setInitialRender(false);
            return;
        }

        executeQueryButton();

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
            <Accordion expanded={isAccordionOpen} onChange={handleAccordionToggle}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{backgroundColor: "#f5f5f5", marginTop: "3vh"}}>
                    <Typography>Filters</Typography>
                </AccordionSummary>
                <AccordionDetails>


                    <Typography variant="h4">
                        What {isGenreFilterVisible ? "genres" : "actors"} do you prefer?
                    </Typography>


                    <FormControlLabel sx={{my: "2vh"}}
                                      control={<Switch checked={!isGenreFilterVisible} onChange={toggleFilterVisible}/>}
                                      label="Genres / Actors filter"
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
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={toIntersectOptions}
                                onChange={toggleGenresAction}
                            />
                        }
                        label={toIntersectOptions ? "Intersection" : "U for Union!"}
                    />

                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: "2vh"}}>
                        <Typography variant="h5">Minimum Movie rating</Typography>
                        <Box sx={{display: 'flex', alignItems: 'center', mt: 1}}>
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
                                    mx: 2, // Adding some horizontal margin
                                }}
                                onChange={(event, newValue) => {
                                    setMovieRating(newValue);
                                }}
                            />
                            <Typography variant="subtitle"><strong>{movieRating}</strong></Typography>
                        </Box>
                    </Box>

                    <Button variant="contained" color="primary" onClick={executeQueryButton}
                            sx={{fontSize: '1.2rem', padding: '1rem 1rem', my: "2vh"}}>Find movies</Button>


                </AccordionDetails>
            </Accordion>

            {isFetching ? (
                <LinearProgress sx={{my: "20vh"}}/>
            ) : <>
                <RecommendedMovies movies={recommendedMovies}/>
                <Box display="flex" justifyContent="center" sx={{marginBottom: "5vh"}}>
                    <Pagination count={totalPages} page={page} onChange={handlePageChange}/>
                </Box>
            </>
            }

        </Container>
    </>)
}