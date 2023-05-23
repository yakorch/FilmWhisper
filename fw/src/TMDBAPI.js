import fetch from 'node-fetch';

const API_KEY = "28bfad0281f3e0097699529a7f57474a";

function getTopRatedMovies(apiKey, numMovies) {
    return fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`)
        .then(response => response.json())
        .then(data => data.results.slice(0, numMovies));
}

function getTopRatedMoviesByGenres(apiKey, numMovies, genres) {
    const genreIds = genres.map(genreName => genresMap[genreName]).filter(id => id !== undefined);
    return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=vote_average.desc&vote_count.gte=100&with_genres=${genreIds.join(',')}`)
        .then(response => response.json())
        .then(data => data.results.slice(0, numMovies));
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
                return data.results[0].id;
            } else {
                throw new Error(`Actor with name ${actorName} not found.`);
            }
        });
}

function getMoviesByActorId(apiKey, actorId, numMovies) {
    return fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_cast=${actorId}`
    )
        .then((response) => response.json())
        .then((data) => data.results.slice(0, numMovies));
}

function getMoviesByActorNames(apiKey, actorNames, numMovies) {
    const promises = actorNames.map((actorName) =>
        getActorIdByName(apiKey, actorName).then((actorId) =>
            getMoviesByActorId(apiKey, actorId, numMovies)
        )
    );

    return Promise.all(promises).then((results) => results.flat());
}

export {
    getTopRatedMovies,
    getTopRatedMoviesByGenres,
    getMoviesByActorNames,
};


class MovieQueryBuilder {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.genres = [];
        this.actors = [];
        this.numMovies = 10;
    }

    topRatedMovies(numMovies) {
        this.numMovies = numMovies;
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

    fetch() {
        let fetchPromise = this.genres.length
            ? getTopRatedMoviesByGenres(this.apiKey, this.numMovies, this.genres)
            : getTopRatedMovies(this.apiKey, this.numMovies);

        if (this.actors.length) {
            fetchPromise = fetchPromise
                .then(movies => movies.map(movie => ({ ...movie, actors: [] })))
                .then(movies => {
                    const actorFetches = this.actors.map(actor =>
                        getMoviesByActorNames(this.apiKey, [actor], this.numMovies)
                            .then(actorMovies => {
                                movies.forEach(movie => {
                                    if (actorMovies.some(actorMovie => actorMovie.id === movie.id)) {
                                        movie.actors.push(actor);
                                    }
                                });
                            })
                    );

                    return Promise.all(actorFetches).then(() => movies);
                });
        }

        return fetchPromise;
    }
}
