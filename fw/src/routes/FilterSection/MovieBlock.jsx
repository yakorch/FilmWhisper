import React from "react";
import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	Chip,
} from "@mui/material";
import {genresMap} from "../../TMDBAPI";

const movieIDToGenreName= {};
// reverse the genresMap
for (const [key, value] of Object.entries(genresMap)) {
    movieIDToGenreName[value] = key;
}


const MovieCard = ({ movie }) => {
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

	return (
		<Card sx={{ maxWidth: 345, p:"2vh", m:"5vh"}}>
			<CardMedia
				component="img"
				height="500"
				image={`${imageURL}${poster_path}`}
				alt={title}
			/>
			<CardContent sx={{ height: 480, overflowY: 'auto' }}>
				<Typography gutterBottom variant="h5" component="div">
					{title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{overview}
				</Typography>
				<Typography sx={{ mt: 1 }} variant="subtitle1">
					Release Date: {release_date}
				</Typography>
				<Typography sx={{ mt: 1 }} variant="subtitle1">
					Vote Average: {vote_average} ({vote_count} votes)
				</Typography>
				<Typography sx={{ mt: 1 }} variant="subtitle1">
					Original Title: {original_title}
				</Typography>
				<Typography sx={{ mt: 1 }} variant="subtitle1">
					Original Language: {original_language}
				</Typography>
				<Typography sx={{ mt: 1 }} variant="subtitle1">
					Popularity: {popularity}
				</Typography>
				<Typography sx={{ mt: 1 }} variant="subtitle1">
					Adult: {adult ? "Yes" : "No"}
				</Typography>
				<Typography sx={{ mt: 1 }} variant="subtitle1">
					Video: {video ? "Yes" : "No"}
				</Typography>
				<Typography sx={{ mt: 1 }} variant="subtitle1">
					Genres:
					{genre_ids.map((genre_id, index) => (
						<Chip key={index} label={movieIDToGenreName[genre_id]} sx={{ ml: 0.5, mt: 0.5 }} />
					))}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default MovieCard;
