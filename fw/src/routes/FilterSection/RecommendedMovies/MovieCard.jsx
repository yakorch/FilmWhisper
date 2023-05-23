import {React, useState} from "react";
import {Card, CardContent, CardMedia, Chip, Dialog, DialogContent, DialogTitle, Typography,} from "@mui/material";
import {genresMap} from "../../../TMDBAPI";
import Box from "@mui/material/Box";
import StarIcon from '@mui/icons-material/Star';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import VideocamIcon from '@mui/icons-material/Videocam';
import {useTheme} from "@mui/material/styles";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const movieIDToGenreName = {};
// reverse the genresMap
for (const [key, value] of Object.entries(genresMap)) {
    movieIDToGenreName[value] = key;
}

const maxDescriptionLength = 180;
const titleLength = 21;

const chipBoxStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    mt: 0.5,
    justifyContent: 'center'
}


const MovieCard = ({movie}) => {
    const theme = useTheme();

    const imageURL = "https://image.tmdb.org/t/p/w500";
    const {
        adult,
        backdrop_path,
        genre_ids,
        id,
        original_language,
        original_title,
        overview,
        popularity,
        poster_path,
        release_date,
        title,
        video,
        vote_average,
        vote_count,
    } = movie;

    const [isLiked, setIsLiked] = useState(false);
    const [isInList, setIsInList] = useState(false);
    const handleLikeDislike = () => setIsLiked(!isLiked);
    const handleAddRemoveFromList = () => setIsInList(!isInList);

    const iconStyle = {
        color: theme.palette.primary.main
    }

    const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);


    const toggleDescriptionExpanded = () => {
        setDescriptionExpanded(!isDescriptionExpanded);
    }

    const shortDescription = `${overview.slice(0, maxDescriptionLength)}...`;
    const descriptionToDisplay = isDescriptionExpanded ? overview : shortDescription;

    const shortenedTitle = (title.length > (titleLength + 2)) ? `${title.slice(0, titleLength)}...` : title;

    const [isDialogOpen, setDialogOpen] = useState(false);
    const openDialog = () => setDialogOpen(true);
    const closeDialog = () => setDialogOpen(false);


    return (
        <>
            <Card sx={{maxWidth: 360, p: "2vh", m: "5vh"}} onClick={openDialog}>
                <CardMedia
                    component="img"
                    height="500"
                    image={`${imageURL}${poster_path}`}
                    alt={title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {shortenedTitle}
                    </Typography>
                    <Typography variant="subtitle1">
                        Rating: <strong>{vote_average}</strong> <StarIcon sx={iconStyle}/> ({vote_count} votes)
                    </Typography>
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onClose={closeDialog} maxWidth="md" fullWidth>
                <DialogTitle variant="h4">{title}</DialogTitle>
                <DialogContent sx={{overflowY: 'auto'}}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Box sx={{flex: '1 1 0', marginRight: '16px'}}>
                            <CardMedia
                                component="img"
                                sx={{
                                    height: "480px",
                                    width: "auto",
                                    display: "block",
                                    margin: "0 auto",
                                }}
                                image={`${imageURL}${poster_path}`}
                                alt={title}
                            />

                        </Box>
                        <Box sx={{flex: '1 1 0'}}>
                            <Typography sx={{mt: 1}} variant="subtitle1">
                                Rating: <strong>{vote_average}</strong> <StarIcon sx={iconStyle}/> ({vote_count} votes)
                            </Typography>
                            <Typography sx={{mt: 1}} variant="subtitle1">
                                Release Date: {release_date}
                            </Typography>

                            <Typography sx={{mt: 1}} variant="subtitle1">
                                Original Language: {original_language}
                            </Typography>
                            <Typography sx={{mt: 1}} variant="subtitle1">
                                Popularity: {popularity}
                            </Typography>
                            <Typography sx={{mt: 1}} variant="subtitle1">
                                Adult: {adult ? <CheckCircleOutlineIcon sx={iconStyle}/> : <CancelIcon sx={iconStyle}/>}
                            </Typography>
                            <Typography sx={{mt: 1}} variant="subtitle1">
                                Video: {video ? <VideocamIcon sx={iconStyle}/> : <CancelIcon sx={iconStyle}/>}
                            </Typography>
                            <Typography sx={{mt: 1}} variant="subtitle1">
                                <strong>
                                    Genres:
                                </strong>
                            </Typography>
                            <Box sx={chipBoxStyle}>
                                {genre_ids.map((genre_id, index) => (
                                    <Chip key={index} label={movieIDToGenreName[genre_id]} sx={{ml: 0.5, mt: 0.5}}/>
                                ))}
                            </Box>

                            <Typography variant="body2" color="text.secondary" onClick={toggleDescriptionExpanded}
                                        sx={{py: "3vh"}}>
                                {descriptionToDisplay}
                                {!isDescriptionExpanded && '...'}
                            </Typography>

                        </Box>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 2}}>
                        <Fab color={isLiked ? "secondary" : "primary"} onClick={handleLikeDislike}>
                            {isLiked ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
                        </Fab>
                        <Fab variant="extended" color={isInList ? "secondary" : "primary"}
                             onClick={handleAddRemoveFromList}>
                            {isInList ? <RemoveIcon/> :
                                <AddIcon/>} {isInList ? "Remove from Watchlist": "Add to Watchlist"}
                        </Fab>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default MovieCard;
