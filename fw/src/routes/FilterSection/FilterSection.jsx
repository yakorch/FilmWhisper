import {MultipleOptionsList} from "./MultipleOptionsList";
import {useState} from "react";
import Button from '@mui/material/Button';
import {CardContent, Paper, Rating, Typography} from "@mui/material";
import {genresMap} from "../../TMDBAPI";


const getAllPossibleGenres = () => {
    return Object.keys(genresMap);
}

export function FilterSection() {
    const movieGenres = getAllPossibleGenres();
    const [selectedGenres, setSelectedGenres] = useState(movieGenres.map(() => false));


    const [movieRating, setMovieRating] = useState(2.5);

    const toggleOptionState = (index, optionsSelected, optionsSetter) => {
        let modifiedStates = [...optionsSelected];
        modifiedStates[index] = !modifiedStates[index];
        optionsSetter(modifiedStates);
    }

    const toggleGenreState = (index) => {
        toggleOptionState(index, selectedGenres, setSelectedGenres);
    }

    const createQuery = () => {
        console.log(selectedGenres);
    }
    // onClick={createQuery}
    return (<>
        <CardContent>

            <Paper elevation={5}>
                {/*<form>*/}

                <h2>What genres do you prefer?</h2>
                <MultipleOptionsList changeOptionState={toggleGenreState} options={movieGenres}/>

            </Paper>

            <Typography component="legend">Minimum Movie rating</Typography>
            <Rating
                name="customized-10"
                defaultValue={7}
                max={10}
                value={movieRating}
                onChange={(event, newValue) => {
                    setMovieRating(newValue);
                }}
            />


            <Button variant="contained" color="primary" onClick={createQuery}>Find movies</Button>

            {/*</form>*/}


        </CardContent>


    </>)
}