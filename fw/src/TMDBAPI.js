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

function getTopRatedMovies(numMovies, signal) {
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;

    return fetch(url, {signal})
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                return data.results.slice(0, numMovies);
            } else {
                throw new Error("No top rated movies found.");
            }
        });
}

function getActorIdByName(apiKey, actorName) {
    return fetch(
        `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=${encodeURIComponent(
            actorName
        )}`
    )
        .then((response) => response.json())
        .then((data) => {
            if (data.results.length > 0) {
                return data.results[0];
            } else {
                throw new Error(`Actor with name ${actorName} not found.`);
            }
        });
}

class MovieQueryBuilder {
    constructor() {
        this.apiKey = API_KEY;
        this.genres = [];
        this.actors = [];
        this.numMovies = 100;
        this.minRating = 7;
        this.joiner = ",";
    }

    numberTopRatedMovies(numMovies) {
        this.numMovies = numMovies;
        return this;
    }

    minMovieRating(minRating) {
        this.minRating = minRating;
        return this;
    }

    byGenres(genres) {
        this.genres = genres;
        return this;
    }

    withActors(actors) {
        this.actors = actors;
        return this;
    }

    useJoiner(joiner) {
        this.joiner = joiner;
        return this;
    }

    async fetch(signal = {}) {
        const {apiKey, genres, actors, numMovies, minRating, joiner} = this;

        const totalPages = Math.ceil(numMovies / 20);

        // Create promise to fetch actor IDs
        const actorPromises = actors.map((name) =>
            getActorIdByName(apiKey, name).then((actor) => actor.id)
        );

        const genreIds = genres.map((genreName) => genresMap[genreName]).filter((id) => id !== undefined);

        const actorIds = await Promise.all(actorPromises);

        // Create an array to store fetch promises
        const fetchPromises = [];

        for (let page = 1; page <= totalPages; page++) {
            // ATTENTION: To fully unleash the power of the API, you would need to choose video=true and adult=true haha
            let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=vote_average.desc&vote_count.gte=100&include_adult=false&include_video=false&page=${page}`;

            if (genreIds.length) {
                url += `&with_genres=${genreIds.join(joiner)}`;
            }

            if (actorIds.length) {
                url += `&with_cast=${actorIds.join(joiner)}`;
            }

            url += `&vote_average.gte=${minRating}`;

            // Add fetch promise to the array
            fetchPromises.push(fetch(url, signal).then((response) => response.json()));
        }

        const results = await Promise.all(fetchPromises);

        const allResults = results.flatMap(data => data.results);
        return allResults.slice(0, numMovies);
    }
}

export {
    getTopRatedMovies,
    MovieQueryBuilder,
    genresMap
};
