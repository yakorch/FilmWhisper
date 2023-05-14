import {MultipleOptionsList} from "./MultipleOptionsList";
import {useState} from "react";
import Button from '@mui/material/Button';
import {Container, Paper, Rating, Typography} from "@mui/material";
import {genresMap} from "../../TMDBAPI";


const getAllPossibleGenres = () => {
    return Object.keys(genresMap);
}

export function FilterSection() {
    const movieGenres = getAllPossibleGenres();
    const [selectedGenres, setSelectedGenres] = useState(movieGenres.map(() => false));


    const [movieRating, setMovieRating] = useState(7);

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
        console.log(movieRating);
    }

    return (<>
        <Container>

            <Paper elevation={15} sx={{m: "3vh", p: "3vh"}}>
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
                    onChange={(event, newValue) => {
                        setMovieRating(newValue);
                    }}
                />
            </Paper>


            <Button variant="contained" color="primary" onClick={createQuery}>Find movies</Button>


        </Container>


    </>)
}