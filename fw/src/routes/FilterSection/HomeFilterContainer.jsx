import React, { useEffect, useState } from "react";
import { Container, LinearProgress, Typography } from "@mui/material";
import { MovieQueryBuilder } from "../../TMDBAPI";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MovieRecommendationSection } from "./MovieRecommendationSection";
import { MainMovieFilters } from "./MovieFilters/MainMovieFilters";
import { MovieRatingChoice } from "./MovieFilters/MovieRatingChoice";
import { useSearchParams } from "react-router-dom";


const MOVIES_PER_PAGE = 10;
const MOVIES_PER_QUERY = 100;

export function HomeFilterContainer() {
    const [searchParams, setSearchParams] = useSearchParams();
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

    useEffect(() => {
        const rating = searchParams.get("movieRating");
        const genres = searchParams.get("selectedGenres")?.split(",");
        const actors = searchParams.get("selectedActors")?.split(",");
        const intersection = searchParams.get("toIntersectOptions");

        if (rating) setMovieRating(+rating);
        if (genres) setSelectedGenres(genres);
        if (actors) setSelectedActors(actors);
        if (intersection) setToIntersectOptions(intersection === "true");
    }, []);


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
    };

    const prepareQueryFunction = (signal = {}) => {
        const queryBuilder = new MovieQueryBuilder()
            .minMovieRating(movieRating)
            .numberTopRatedMovies(MOVIES_PER_QUERY)
            .useJoiner(toIntersectOptions ? "," : "|")
            .withActors(selectedActors)
            .byGenres(selectedGenres);

        return () => queryBuilder.fetch(signal);
    };

    const executeQuery = (queryFunc) => {
        setIsFetching(true);

        queryFunc().then((movies) => {
            setAllFetchedMovies(movies);
            setRecommendedMovies(movies.slice(0, MOVIES_PER_PAGE));
            setTotalPages(Math.ceil(movies.length / MOVIES_PER_PAGE));
        }).catch(() => {
            setRecommendedMovies([]);
        });

        setIsFetching(false);
    };

    const executeQueryButton = () => {
        handleAccordionClose();

        abortLastRequest();
        createAbortController();
        const { signal } = abortController;

        executeQuery(prepareQueryFunction(signal));

        setSearchParams({
            movieRating: movieRating || 7,
            selectedGenres: selectedGenres.join(",") || [],
            selectedActors: selectedActors.join(",") || [],
            toIntersectOptions: String(toIntersectOptions)
        });
    };

    const handlePageChange = (event, value) => {
        setPage(value);
        const start = (value - 1) * MOVIES_PER_PAGE;
        const end = start + MOVIES_PER_PAGE;
        setRecommendedMovies(allFetchedMovies.slice(start, end));
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        // prevents double initial rendering due to route "/" of Root and this Component
        if (initialRender) {
            setInitialRender(false);
            return;
        }

        executeQueryButton();

        return () => {
            abortLastRequest();
        };
    }, [initialRender]);

    useEffect(() => {
        handleAccordionOpen();
    }, [isGenreFilterVisible]);


    return (<>

        <Container>
            <Accordion expanded={isAccordionOpen} onChange={handleAccordionToggle}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ backgroundColor: "#f5f5f5", marginTop: "3vh" }}>
                    <Typography>Filters</Typography>
                </AccordionSummary>
                <AccordionDetails>

                    <MainMovieFilters isGenreFilterVisible={isGenreFilterVisible}
                                      toggleFilterVisible={toggleFilterVisible} selectedActors={selectedActors}
                                      setSelectedActors={setSelectedActors} selectedGenres={selectedGenres}
                                      setSelectedGenres={setSelectedGenres} toggleGenresAction={toggleGenresAction}
                                      toIntersectOptions={toIntersectOptions} />

                    <MovieRatingChoice movieRating={movieRating} setMovieRating={setMovieRating}
                                       executeQueryButton={executeQueryButton} />


                </AccordionDetails>
            </Accordion>


            {isFetching ? (
                <LinearProgress sx={{ my: "20vh" }} />
            ) : <MovieRecommendationSection recommendedMovies={recommendedMovies} totalPages={totalPages} page={page}
                                            handlePageChange={handlePageChange}></MovieRecommendationSection>

            }

        </Container>
    </>);
}