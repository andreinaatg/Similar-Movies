document.getElementById('search-btn').addEventListener('click', similarMovies);

async function similarMovies() {
    try {
        const input = document.getElementById("input").value;
        const response = await fetch(`http://localhost:5000/search?movie=${input}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const movie = data.movie;
        const similarMovies = data.similarMovies;

        const similarMoviesDiv = document.getElementById("similarMovies");
        similarMoviesDiv.innerHTML = ""; // Clear previous results

        if (!movie) {
            similarMoviesDiv.innerHTML = `<p>Movie not found</p>`;
            return;
        }

        const movieDiv = document.createElement("div");
        movieDiv.classList.add("main-movie");

        const title = document.createElement("h2");
        title.textContent = movie.title;

        const poster = document.createElement("img");
        poster.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        poster.alt = movie.title;

        const header = document.createElement("h2")
        header.classList.add("similar-header");
        header.textContent = "Based on your search"

        movieDiv.appendChild(title);
        movieDiv.appendChild(poster);
        movieDiv.appendChild(header)
        similarMoviesDiv.appendChild(movieDiv);

        if (similarMovies.length === 0) {
            similarMoviesDiv.innerHTML += `<p>No similar movies found</p>`;
            return;
        }

        similarMovies.forEach(similarMovie => {
            const similarMovieDiv = document.createElement("div");
            similarMovieDiv.classList.add("movie");


            const similarTitle = document.createElement("h2");
            similarTitle.textContent = similarMovie.title;

            const similarPoster = document.createElement("img");
            similarPoster.src = `https://image.tmdb.org/t/p/w500/${similarMovie.poster_path}`;
            similarPoster.alt = similarMovie.title;

            similarMovieDiv.appendChild(similarTitle);
            similarMovieDiv.appendChild(similarPoster);
            similarMoviesDiv.appendChild(similarMovieDiv);
        });

    } catch (error) {
        console.error('Error:', error);
    }
}
similarMovies()