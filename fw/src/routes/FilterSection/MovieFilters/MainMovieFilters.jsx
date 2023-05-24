import { Autocomplete, Switch, TextField, Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import React from "react";
import { genresMap } from "../../../TMDBAPI";

const getAllPossibleGenres = () => {
    return Object.keys(genresMap);
};
const allMovieGenres = getAllPossibleGenres();

const basicActors = ["Robert Downey Jr.", "Chris Hemsworth", "Scarlett Johansson", "Chris Evans", "Tom Hiddleston", "Ryan Reynolds", "Ryan Gosling"];


export function MainMovieFilters({
                                     isGenreFilterVisible,
                                     toggleFilterVisible,
                                     selectedGenres,
                                     setSelectedGenres,
                                     selectedActors,
                                     setSelectedActors,
                                     toIntersectOptions,
                                     toggleGenresAction
                                 }) {
    return (
        <>
            <Typography variant="h4">
                What {isGenreFilterVisible ? "genres" : "actors"} do you prefer?
            </Typography>


            <FormControlLabel sx={{ my: "2vh" }}
                              control={<Switch checked={!isGenreFilterVisible} onChange={toggleFilterVisible} />}
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
        </>
    );
}