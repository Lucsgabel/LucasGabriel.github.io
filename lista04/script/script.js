document.addEventListener('DOMContentLoaded', async () => {
    const apiKey = '9a098271c54ed974dde2a1021f040055';
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json'
        }
    };

    try {
        const response = await fetch(apiUrl, options);
        const data = await response.json();
        const movies = data.results.slice(0, 10); // Obter os 10 filmes mais populares

        const moviesContainer = document.getElementById('movies-container');

        movies.forEach(async movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');

            const title = document.createElement('h2');
            title.textContent = movie.title;

            const posterUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
            const poster = document.createElement('img');
            poster.src = posterUrl;
            poster.alt = movie.title;

            const genres = document.createElement('p');

            // Nova chamada fetch para obter detalhes do filme específico
            const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=en-US`;
            const detailsResponse = await fetch(movieDetailsUrl, options);
            const movieDetails = await detailsResponse.json();

            genres.textContent = movieDetails.genres && movieDetails.genres.length > 0
                ? `Gênero: ${movieDetails.genres.map(genre => genre.name).join(', ')}`
                : 'Gênero indisponível';

            movieElement.appendChild(title);
            movieElement.appendChild(poster);
            movieElement.appendChild(genres);

            moviesContainer.appendChild(movieElement);
        });
    } catch (error) {
        console.error('Erro ao obter filmes:', error);
    }
});
