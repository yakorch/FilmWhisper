const API_KEY = "28bfad0281f3e0097699529a7f57474a";

const genresMap = {
    "Action": 28,
    "Adventure": 12,
    "Animation": 16,
    "Comedy": 35,
    "Crime": 80,
    "Documentary": 99,
    "Drama": 18,
    "Family": 10751,
    "Fantasy": 14,
    "History": 36,
    "Horror": 27,
    "Music": 10402,
    "Mystery": 9648,
    "Romance": 10749,
    "Science Fiction": 878,
    "TV Movie": 10770,
    "Thriller": 53,
    "War": 10752,
    "Western": 37
};

function getTopRatedMovies(apiKey, numMovies) {
    return fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`)
        .then(response => response.json())
        .then(data => data.results.slice(0, numMovies));
}

function getTopRatedMoviesByGenres(apiKey, numMovies, genres) {
    // First, get the genre ids by name
    const genreIds = genres.map(genreName => genresMap[genreName]).filter(id => id !== undefined);

    // Then, get the top-rated movies for those genres
    return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=vote_average.desc&vote_count.gte=100&with_genres=${genreIds.join(',')}`)
        .then(response => response.json())
        .then(data => data.results.slice(0, numMovies));
}

function getTopRatedMoviesByGenresHardcoded(genres){
    return getTopRatedMoviesByGenresUnion(API_KEY, 10, genres)
}

function getTopRatedMoviesByGenresUnion(apiKey, numMovies, genres) {
    const promises = genres.map(genreName => {
        const genreId = genresMap[genreName];
        return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=vote_average.desc&vote_count.gte=100&with_genres=${genreId}`)
            .then(response => response.json())
            .then(data => data.results);
    });

    return Promise.all(promises)
        .then(results => results.flat())
        .then(movies => {
            // Sort the movies by vote average in descending order
            const sortedMovies = movies.sort((a, b) => b.vote_average - a.vote_average);
            return sortedMovies.slice(0, numMovies);
        });
}



export {getTopRatedMovies, getTopRatedMoviesByGenres, getTopRatedMoviesByGenresHardcoded, getTopRatedMoviesByGenresUnion, API_KEY, genresMap};